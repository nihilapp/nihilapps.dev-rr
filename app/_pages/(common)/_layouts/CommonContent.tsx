// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/_libs';
import { CommonAside } from '@/_pages/(common)/_layouts/CommonAside';
import { CommonMain } from '@/_pages/(common)/_layouts/CommonMain';

const cssVariants = cva(
  [ ``, ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cssVariants> {
  className?: string;
}

export function CommonContent({
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        cssVariants(),
        className
      )}
      {...props}
    >
      <CommonAside />
      <CommonMain>
        {children}
      </CommonMain>
    </div>
  );
}
