// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

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
}

export function AdminHeader({
  className,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        cssVariants(),
        className
      )}
      {...props}
    >
      header
    </header>
  );
}
