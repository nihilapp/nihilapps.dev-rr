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

export function CommonAside({
  className,
  ...props
}: Props) {
  return (
    <aside
      className={cn(
        cssVariants(),
        className
      )}
      {...props}
    >
      aside
    </aside>
  );
}
