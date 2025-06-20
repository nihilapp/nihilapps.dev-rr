// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/_libs';

const commonHeaderCva = cva(
  [ ``, ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CommonHeaderProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof commonHeaderCva> {
  className?: string;
}

export function CommonHeader({
  className,
  ...props
}: CommonHeaderProps) {
  return (
    <header
      className={cn(
        commonHeaderCva(),
        className
      )}
      {...props}
    >
      header
    </header>
  );
}
