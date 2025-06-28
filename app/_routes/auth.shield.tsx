import { redirect, useFetcher } from 'react-router';
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaDescriptor
} from 'react-router';
import { z } from 'zod';

import {
  EmailPasscodeForm,
  RequestPasscodeButton
} from '@/_components/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/_components/common/ui/card';
import { genPassCode, setMeta } from '@/_libs';
import { commitSession, destroySession, getSession } from '@/_libs/session';

import type { Route } from './+types/auth.shield';

export async function loader({ request, }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const passcodeSent = session.has('passcode');

  return { passcodeSent, };
}

export async function action({ request, }: ActionFunctionArgs) {
  const session = await getSession(request);

  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  const actionType = formData.get('_action');

  if (actionType === 'send-passcode') {
    const email = 'anikai7556@gmail.com';
    const newPasscode = genPassCode();

    // TODO: 생성된 패스코드를 실제 이메일로 전송해야 합니다.
    console.log(`[PASSCODE] ${email}으로 다음 패스코드를 전송합니다: ${newPasscode}`);

    session.set('passcode', newPasscode);

    return new Response(
      JSON.stringify({ passcodeSent: true, }),
      {
        headers: {
          'Set-Cookie': await commitSession(session),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  if (actionType === 'verify-passcode') {
    const passcodeSchema = z.object({
      email: z
        .string()
        .email('올바른 이메일 형식을 입력해주세요.'),
      passcode: z
        .string()
        .length(
          40,
          '40자리 패스코드를 입력해주세요.'
        ),
    });

    const result = passcodeSchema.safeParse(formPayload);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return new Response(
        JSON.stringify({
          passcodeSent: true,
          error: errors.email?.[0] || errors.passcode?.[0] || '유효하지 않은 요청입니다.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', },
        }
      );
    }

    const storedPasscode = session.get('passcode');

    const isEmailValid = result.data.email === 'anikai7556@gmail.com';
    const isPasscodeValid = result.data.passcode === storedPasscode;

    if (!isEmailValid || !isPasscodeValid) {
      return new Response(
        JSON.stringify({ passcodeSent: true, error: '이메일 또는 패스코드가 올바르지 않습니다.', }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', },
        }
      );
    }

    // TODO: 성공 시, 이메일 정보를 안전한 쿠키에 저장해야 합니다.
    return redirect(
      `/auth/otp?email=${result.data.email}`,
      {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ error: '잘못된 요청입니다.', }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json', },
    }
  );
}

export function meta(): MetaDescriptor[] {
  return setMeta({
    title: '1차 보호막',
    description: '이 페이지에 접근하려면 패스코드를 입력해야 합니다.',
    url: '/auth/shield',
  });
}

export default function ShieldPage({ loaderData, }: Route.ComponentProps) {
  const fetcher = useFetcher<{ passcodeSent?: boolean; error?: string }>();

  const initialPasscodeSent = (loaderData as { passcodeSent?: boolean })?.passcodeSent || false;

  const passcodeSent = fetcher.data?.passcodeSent ?? initialPasscodeSent;

  const error = (loaderData as { error?: string })?.error || fetcher.data?.error;

  const isSubmittingRequest
    = fetcher.state !== 'idle' && fetcher.formData?.get('_action') === 'send-passcode';

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>인증</CardTitle>
        <CardDescription>
          {passcodeSent
            ? '관리자 이메일과 전송된 패스코드를 입력하여 접근 권한을 확인하세요.'
            : '계속하려면 먼저 패스코드를 요청하세요.'}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RequestPasscodeButton
          passcodeSent={passcodeSent}
          isSubmitting={isSubmittingRequest}
          form={fetcher.Form}
        />
        {passcodeSent && (
          <>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            <EmailPasscodeForm error={error} fetcher={fetcher} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
