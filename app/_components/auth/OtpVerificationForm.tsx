import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { CardContent, CardFooter } from '@/_components/common/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';

export function OtpVerificationForm({
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
    token: z
      .string()
      .min(6, { message: '6자리 코드를 입력해주세요.', })
      .max(6, { message: '6자리 코드를 입력해주세요.', }),
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
