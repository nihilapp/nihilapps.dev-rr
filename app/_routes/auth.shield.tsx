import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/_components/common/ui/form';
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

export default function AuthShieldPage({ }: Route.ComponentProps) {
  const formModel = z.object({
    passcode: z.string()
      .min(40, { message: '40자리 이상의 비밀번호를 입력해주세요.', })
      .max(40, { message: '40자리 이하의 비밀번호를 입력해주세요.', }),
  });

  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      passcode: '',
    },
  });

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <FormField
          control={form.control}
          name='passcode'
          render={({ field, }) => (
            <FormItem
              className='space-y-3'
            >
              <FormLabel>패스코드</FormLabel>
              <FormControl
                className='mt-2'
              >
                <Input
                  {...field}
                  placeholder='패스코드를 입력해주세요.'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full mt-4'
        >
          패스코드 검증
        </Button>
      </form>
    </Form>
  );
}
