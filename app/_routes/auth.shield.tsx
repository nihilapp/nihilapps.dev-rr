import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.shield';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `패스코드 검증`,
    url: `/auth/shield`,
  });
}

export default function AuthShieldPage({}: Route.ComponentProps) {
  const formModel = z.object({
    passcode: z.string()
      .min(40, {
        message: '40자리의 패스코드를 입력하세요.',
      })
      .max(40, {
        message: '40자리의 패스코드를 입력하세요.',
      })
      .regex(
        /^[a-zA-Z0-9-]+$/,
        {
          message: '패스코드는 영문자, 숫자, - 기호만 허용합니다.',
        }
      ),
  });

  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      passcode: '',
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
        <CardTitle>패스코드 검증</CardTitle>
        <CardDescription>
          계속하려면 패스코드를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className='flex flex-col gap-5'
          >
            <FormField
              control={form.control}
              name='passcode'
              render={({ field, }) => (
                <FormItem>
                  <FormLabel>패스코드</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='패스코드를 입력해주세요.'
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
              {fetcher.state !== 'idle' ? '검증 중...' : '계속하기'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
