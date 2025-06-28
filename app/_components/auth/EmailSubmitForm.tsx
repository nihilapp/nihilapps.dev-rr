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

export function EmailSubmitForm({ error: serverError, }: { error?: string }) {
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
