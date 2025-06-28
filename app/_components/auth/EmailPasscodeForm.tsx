import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { FetcherWithComponents } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';

const verifyFormModel = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해주세요.', }),
  passcode: z.string().min(1, { message: '패스코드를 입력해주세요.', }),
});

export function EmailPasscodeForm({
  error: parentError,
  fetcher,
}: {
  error?: string;
  fetcher: FetcherWithComponents<{ error?: string }>;
}) {
  const form = useForm<z.infer<typeof verifyFormModel>>({
    resolver: zodResolver(verifyFormModel),
    defaultValues: {
      email: '',
      passcode: '',
    },
  });

  const onSubmitForm = (data: z.infer<typeof verifyFormModel>) => {
    fetcher.submit({ ...data, _action: 'verify-passcode', }, { method: 'post', });
  };

  const error = parentError || fetcher.data?.error;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field, }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} placeholder='admin@example.com' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passcode'
          render={({ field, }) => (
            <FormItem>
              <FormLabel>패스코드</FormLabel>
              <FormControl>
                <Input {...field} placeholder='이메일로 받은 패스코드를 입력하세요.' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <Button type='submit' className='w-full' disabled={fetcher.state !== 'idle'}>
          {fetcher.state !== 'idle' ? '인증 중...' : '계속하기'}
        </Button>
      </form>
    </Form>
  );
}
