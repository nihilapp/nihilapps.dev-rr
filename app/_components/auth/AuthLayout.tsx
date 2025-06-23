import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

import { siteConfig } from '@/_config';
import { cn } from '@/_libs';

const cssVariants = cva(
  [
    'flex flex-col items-center justify-center dvh-100 dvw-100 bg-gray-50 dark:bg-gray-950',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cssVariants> {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({
  children,
  className,
  ...props
}: Props) {
  return (
    <main
      className={cn(cssVariants(), className)}
      {...props}
    >
      <div className='mb-8'>
        <Link to='/'>
          <img
            src={siteConfig.logo}
            alt='Nihilncunia Logo'
            className='h-10 w-auto'
          />
        </Link>
      </div>
      {children}
    </main>
  );
}
