import { zodResolver } from '@hookform/resolvers/zod';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { getUserByEmail } from '@/_entities/users/api/getUserByEmail';
import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.otp-create';

// 개발 환경이 아니면 404를 반환하는 로더
export async function loader({ request, }: Route.LoaderArgs) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response('Not Found', { status: 404, });
  }
  return {};
}

// 이메일 제출, OTP 코드 검증을 처리하는 액션
export async function action({ request, }: Route.ActionArgs) {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  const actionType = formData.get('_action');

  // --- 1단계: 이메일 제출 및 QR 코드 생성 ---
  if (actionType === 'generate-qr') {
    const emailSchema = z.string().email('유효한 이메일을 입력해주세요.');
    const emailResult = emailSchema.safeParse(formPayload.email);
    if (!emailResult.success) {
      return { step: 1, error: emailResult.error.flatten().formErrors[0], };
    }
    const email = emailResult.data;

    const user = await getUserByEmail(email);
    if (user.status !== 200) {
      return { step: 1, error: '존재하지 않는 사용자입니다.', };
    }

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, 'Nihilncunia-dev', secret);
    const imageUrl = await qrcode.toDataURL(otpauth);

    return {
      step: 2,
      email,
      secret,
      imageUrl,
    };
  }

  // --- 2단계: OTP 코드 검증 및 비밀 키 저장 ---
  if (actionType === 'verify-otp') {
    const otpSchema = z.object({
      email: z.string().email(),
      secret: z.string(),
      token: z.string().length(6, '6자리 코드를 입력해주세요.'),
    });
    const otpResult = otpSchema.safeParse(formPayload);
    if (!otpResult.success) {
      // 이 경우는 일반적이지 않으므로, 기본 데이터 반환
      return { step: 2, ...formPayload, error: otpResult.error.flatten().fieldErrors.token?.[0], };
    }

    const { email, secret, token, } = otpResult.data;
    const isValid = authenticator.verify({ token, secret, });

    if (!isValid) {
      return {
        step: 2,
        email,
        secret,
        imageUrl: await qrcode.toDataURL(authenticator.keyuri(email, 'Nihilncunia-dev', secret)),
        error: '인증 코드가 올바르지 않습니다. 다시 시도해주세요.',
      };
    }

    // !! 중요: 실제 프로덕션에서는 이 부분에 DB 업데이트 로직을 구현해야 합니다.
    console.log(`[SUCCESS] User: ${email}, OTP Secret: ${secret} - DB에 저장해야 함`);

    return redirect('/auth/signin');
  }

  return { step: 1, error: '잘못된 요청입니다.', };
}

// 로봇의 접근을 막고, 제목을 설정하는 메타 함수
export function meta({ data, }: Route.MetaArgs) {
  return setMeta({
    title: '2단계 인증(OTP) 설정 (개발용)',
    url: '/auth/otp-create',
    robots: 'noindex, nofollow',
  });
}

// UI 컴포넌트
export default function OtpCreationPage({ actionData, }: Route.ComponentProps) {
  const isStep2 = actionData?.step === 2;

  return (
    <Card className='mx-auto w-full max-w-md pb-0'>
      <CardHeader>
        <CardTitle>2단계 인증(OTP) 설정</CardTitle>
        <CardDescription>
          {isStep2 ? '인증 앱으로 QR 코드를 스캔하고 6자리 코드를 입력하세요.' : 'OTP를 설정할 관리자 이메일을 입력하세요.'}
        </CardDescription>
      </CardHeader>
      {isStep2 ? (
        <OtpVerificationForm
          email={actionData.email!}
          secret={actionData.secret!}
          imageUrl={actionData.imageUrl!}
          error={actionData.error}
        />
      ) : (
        <EmailSubmitForm error={actionData?.error} />
      )}
    </Card>
  );
}

// --- UI 내부 컴포넌트 ---

function EmailSubmitForm({ error: serverError, }: { error?: string }) {
  const formModel = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.', }),
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: { email: '', },
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    fetcher.submit({ ...data, _action: 'generate-qr', }, { method: 'post', });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <CardContent className='p-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field, }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder='admin@example.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serverError && <p className='mt-2 text-sm text-red-500'>{serverError}</p>}
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full' disabled={fetcher.state !== 'idle'}>
            {fetcher.state !== 'idle' ? '생성 중...' : 'QR 코드 생성'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

function OtpVerificationForm({
  email,
  secret,
  imageUrl,
  error: serverError,
}: {
  email: string;
  secret: string;
  imageUrl: string;
  error?: string;
}) {
  const formModel = z.object({
    token: z.string().min(6, { message: '6자리 코드를 입력해주세요.', }).max(6, { message: '6자리 코드를 입력해주세요.', }),
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: { token: '', },
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    const formData = { ...data, _action: 'verify-otp', email, secret, };
    fetcher.submit(formData, { method: 'post', });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <CardContent className='flex flex-col items-center gap-4 p-6'>
          <img src={imageUrl} alt='OTP QR Code' />
          <p className='text-sm text-muted-foreground'>또는 아래 비밀 키를 직접 입력하세요.</p>
          <code className='rounded bg-muted px-2 py-1 font-mono text-sm'>{secret}</code>
          <div className='w-full space-y-2 pt-4'>
            <FormField
              control={form.control}
              name='token'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>인증 코드</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='6자리 숫자 코드' maxLength={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError && <p className='mt-2 text-sm text-red-500'>{serverError}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full' disabled={fetcher.state !== 'idle'}>
            {fetcher.state !== 'idle' ? '인증 중...' : '인증 및 설정 완료'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
