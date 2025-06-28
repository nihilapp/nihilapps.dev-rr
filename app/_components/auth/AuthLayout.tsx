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
      <div className='mb-5'>
        <Link to='/' className='flex items-center gap-2'>
          <img
            src={siteConfig.logo}
            alt='Nihilncunia Logo'
            className='h-10 w-auto block'
          />
          <span className='text-h2 font-900 mt-2'>NIHILBLOG</span>
        </Link>
      </div>
      {children}
    </main>
  );
}
