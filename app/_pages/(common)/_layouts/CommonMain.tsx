// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/_libs';

const cssVariants = cva(
  [ ``, ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface Props extends HTMLAttributes<HTMLElement>, VariantProps<typeof cssVariants> {
  className?: string;
}

export function CommonMain({
  className,
  children,
  ...props
}: Props) {
  return (
    <main
      className={cn(
        cssVariants(),
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
