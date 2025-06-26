import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { Select, SelectItem } from '@/_components/common/ui/select';
import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.signup';

export async function loader({ request, }: Route.LoaderArgs) {
  // 로그인이 되어있는 경우에는 체크 패스.
  // 쿠키에 passCode라는 쿠키가 존재하지 않으면 절차대로 접근하지 않은 것이므로 메인 페이지로 보내버리고, passCode가 존재하면 그냥 둠.

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
    email: z.string({ message: '이메일은 필수입력값입니다.', })
      .email({ message: '유효한 이메일을 입력해주세요.', }),
    name: z.string({ message: '이름은 필수입력값입니다.', }),
    username: z.string({ message: '닉네임은 필수입력값입니다.', })
      .min(2, { message: '닉네임은 2자 이상이어야 합니다.', })
      .max(20, { message: '닉네임은 10자 이하여야 합니다.', }),
    role: z.enum([ 'USER', 'ADMIN', 'SUPER_ADMIN', ], { message: '권한은 필수입력값입니다.', }),
    password: z.string({ message: '비밀번호는 필수입력값입니다.', })
      .regex(/[A-Z]/, { message: '대문자를 포함해주세요.', })
      .regex(/[a-z]/, { message: '소문자를 포함해주세요.', })
      .regex(/[0-9]/, { message: '숫자를 포함해주세요.', })
      .regex(/[!@#$%^&*]/, { message: '특수문자를 포함해주세요.', }),
    confirmPassword: z.string({ message: '비밀번호 확인은 필수입력값입니다.', })
      .regex(/[A-Z]/, { message: '대문자를 포함해주세요.', })
      .regex(/[a-z]/, { message: '소문자를 포함해주세요.', })
      .regex(/[0-9]/, { message: '숫자를 포함해주세요.', }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'confirmPassword', ],
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      role: 'USER' as const,
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
              name='name'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='이름을 입력하세요.'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name='role'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>권한</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectItem value='USER'>사용자</SelectItem>
                      <SelectItem value='ADMIN'>관리자</SelectItem>
                      <SelectItem value='SUPER_ADMIN'>슈퍼 관리자</SelectItem>
                    </Select>
                  </FormControl>
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
