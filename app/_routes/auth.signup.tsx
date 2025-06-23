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

import type { Route } from './+types/auth.signup';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export async function action({ request, }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // TODO: 데이터베이스에 사용자 생성 로직 추가
  console.log('Action received data:', data);

  return { success: true, };
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `계정 생성`,
    url: `/auth/signup`,
  });
}

export default function AuthSignUpPage({}: Route.ComponentProps) {
  const formModel = z.object({
    username: z.string().min(2, { message: '사용자 이름은 2자 이상이어야 합니다.', }),
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.', }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.', }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'confirmPassword', ],
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    fetcher.submit(data, { method: 'post', });
  };

  return (
    <Card className='w-full max-w-md pb-0'>
      <CardHeader>
        <CardTitle>계정 생성</CardTitle>
        <CardDescription>
          새 계정을 만들어 서비스를 시작하세요.
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
              name='username'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>사용자 이름</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='사용자 이름을 입력하세요.'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder='비밀번호'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      autoComplete='off'
                      placeholder='비밀번호 확인'
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
              {fetcher.state !== 'idle' ? '생성 중...' : '계정 생성'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='justify-center p-6 pt-0 text-sm'>
        이미 계정이 있으신가요?
        {' '}
        <Link to='/auth/signin' className='font-semibold text-primary underline-offset-2 hover:underline'>
          로그인하기
        </Link>
      </CardFooter>
    </Card>
  );
}
