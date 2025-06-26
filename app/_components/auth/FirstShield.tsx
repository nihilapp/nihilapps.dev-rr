// import { Outlet } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { z } from 'zod';

import { Button } from '@/_components/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { cn } from '@/_libs';

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cssVariants> {
  className?: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function FirstShield({
  className,
  setIsOpen,
  ...props
}: Props) {
  const formModel = z.object({
    email: z.string({
      message: '이메일은 필수 입력값입니다.',
    })
      .email({
        message: '이메일 형식이 올바르지 않습니다.',
      }),
  });

  const form = useForm<z.infer<typeof formModel>>({
    mode: 'all',
    resolver: zodResolver(formModel),
    defaultValues: {
      email: '',
    },
  });

  const sendEmailFetcher = useFetcher();

  const onSubmitForm = (data: z.infer<typeof formModel>) => {
    sendEmailFetcher.submit(data, {
      method: 'post',
      action: '/auth/shield',
    });
  };

  return (
    <Form
      {...form}
    >
      <form
        className={cn(
          cssVariants(),
          className
        )}
        onSubmit={form.handleSubmit(onSubmitForm)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field, }) => (
            <FormItem
              className='flex flex-col gap-2'
            >
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full'
        >
          메일로 패스코드 받기
        </Button>
      </form>
    </Form>
  );
}
