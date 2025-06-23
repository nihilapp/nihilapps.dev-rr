import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.signin';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `로그인`,
    url: `/auth/signin`,
  });
}

export default function AuthSignInPage({}: Route.ComponentProps) {
  const formModel = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.', }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.', }),
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    fetcher.submit(data, { method: 'post', });
    console.log(data);
  };

  return (
    <Card className='w-full max-w-md pb-0'>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          계정에 로그인하여 계속 진행하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='email@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      autoComplete='off'
                      placeholder='비밀번호를 입력해주세요.'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full'
              disabled={fetcher.state !== 'idle'}
            >
              {fetcher.state !== 'idle' ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='justify-center p-6 pt-0 text-sm'>
        계정이 없으신가요?
        {' '}
        <Link to='/auth/signup' className='font-semibold text-primary underline-offset-2 hover:underline'>
          계정 생성하기
        </Link>
      </CardFooter>
    </Card>
  );
}
