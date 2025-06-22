import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { Form, data } from 'react-router';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { setMeta } from '@/_libs';

import type { Route } from './+types/test.otp';

// 1. Loader: 페이지 로드 시 서버에서 비밀 키와 QR코드를 생성합니다.
export async function loader({ request, }: Route.LoaderArgs) {
  // const { origin, } = new URL(request.url);
  const accountName = 'test@example.com';
  const issuer = 'Nihilncunia-dev';

  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(accountName, issuer, secret);
  const imageUrl = await qrcode.toDataURL(otpauth);

  return {
    secret,
    imageUrl,
  };
}

// 2. Action: 사용자가 입력한 토큰을 서버에서 검증합니다.
export async function action({ request, }: Route.ActionArgs) {
  const formData = await request.formData();
  const token = formData.get('token') as string;
  const secret = formData.get('secret') as string;

  if (!token || !secret) {
    return data({ error: '토큰과 비밀 키를 모두 입력해야 합니다.', }, { status: 400, });
  }

  try {
    const isValid = authenticator.verify({ token, secret, });

    if (isValid) {
      return { message: '인증에 성공했습니다!', status: 'success' as const, };
    }
    else {
      return { message: '인증에 실패했습니다. 코드를 다시 확인해주세요.', status: 'error' as const, };
    }
  }
  catch (err) {
    console.error(err);
    return data({ message: '인증 과정에서 오류가 발생했습니다.', status: 'error' as const, }, { status: 500, });
  }
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '2단계 인증(OTP) 테스트',
    url: '/test/otp',
  });
}

// 3. Component: QR코드와 인증 폼을 화면에 렌더링합니다.
export default function TestOtpPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto my-12'>
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle>2단계 인증(OTP) 설정</CardTitle>
          <CardDescription>Google Authenticator 앱으로 QR 코드를 스캔하세요.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-4'>
          <img src={loaderData.imageUrl} alt='OTP QR Code' />
          <p className='text-sm text-muted-foreground'>또는 아래 비밀 키를 직접 입력하세요.</p>
          <code className='rounded bg-muted px-2 py-1 font-mono text-sm'>{loaderData.secret}</code>
        </CardContent>
        <CardFooter>
          <Form method='post' className='w-full'>
            <div className='flex w-full flex-col gap-4'>
              <input type='hidden' name='secret' value={loaderData.secret} />
              <div className='flex flex-col space-y-1.5'>
                <label htmlFor='token'>인증 코드 입력</label>
                <input
                  id='token'
                  name='token'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  placeholder='앱에 표시된 6자리 코드'
                  required
                />
              </div>

              <Button type='submit' className='w-full'>
                인증 확인
              </Button>

              {actionData && 'message' in actionData && (
                <div
                  className={`mt-4 rounded border p-4 text-center ${
                    actionData.status === 'success'
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : 'border-red-500 bg-red-100 text-red-700'
                  }`}
                >
                  <p>{actionData.message}</p>
                </div>
              )}
              {actionData && 'error' in actionData && (
                <div className='mt-4 rounded border p-4 text-center border-red-500 bg-red-100 text-red-700'>
                  <p>{actionData.error}</p>
                </div>
              )}
            </div>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
