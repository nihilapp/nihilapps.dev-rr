import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/_components/common/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/_components/common/ui/input-otp';
import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.otp';

export function loader({ request, }: Route.LoaderArgs) {
  // TODO: 세션에서 shield 단계 통과 여부 확인
  // const session = await getSession(request.headers.get('Cookie'));
  // if (!session.get('shieldPassedAt')) {
  //   return redirect('/auth/shield');
  // }
  return {};
}

export async function action({ request, }: Route.ActionArgs) {
  const formData = await request.formData();
  const otp = formData.get('otp') as string;

  // TODO: 실제 OTP 검증 로직 추가
  console.log('Verifying OTP:', otp);
  const isValid = otp === '123456'; // 임시 검증 로직

  if (!isValid) {
    return { error: '인증 코드가 올바르지 않습니다.', };
  }

  // TODO: 세션에 otpPassedAt 타임스탬프 기록
  // const session = await getSession(request.headers.get('Cookie'));
  // session.set('otpPassedAt', new Date());
  // return redirect('/admin', {
  //   headers: { 'Set-Cookie': await commitSession(session), },
  // });

  return redirect('/admin');
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `2단계 인증(OTP)`,
    url: `/auth/otp`,
  });
}

const formSchema = z.object({
  otp: z.string().min(6, {
    message: '6자리 코드를 모두 입력해주세요.',
  }).regex(/^\d{6}$/, {
    message: '숫자만 입력해야 합니다.',
  }),
});

export default function AuthOtpPage({ actionData, }: Route.ComponentProps) {
  const numberArray = Array.from(
    { length: 6, },
    (_, index) => index
  );

  const fetcher = useFetcher<typeof action>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    fetcher.submit(data, { method: 'post', });
  };

  return (
    <Card className='w-full max-w-md pb-0'>
      <CardHeader>
        <CardTitle>2단계 인증</CardTitle>
        <CardDescription>
          인증 앱에 표시된 6자리 코드를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field, }) => (
                <FormItem className='flex flex-col items-center'>
                  <FormControl className='w-full'>
                    <InputOTP
                      containerClassName='w-full'
                      maxLength={6}
                      {...field}
                      onChange={(value) => {
                        const numericValue = value.replace(/[^0-9]/g, '');
                        field.onChange(numericValue);
                      }}
                      inputMode='numeric'
                    >
                      <InputOTPGroup className='w-full justify-between'>
                        {numberArray.map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className='w-12 h-15 rounded-md border text-h2!'
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {actionData?.error && (
              <p className='text-center text-sm font-medium text-destructive'>
                {actionData.error}
              </p>
            )}
            <Button type='submit' className='w-full' disabled={fetcher.state !== 'idle'}>
              {fetcher.state !== 'idle' ? '확인 중...' : '확인'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
