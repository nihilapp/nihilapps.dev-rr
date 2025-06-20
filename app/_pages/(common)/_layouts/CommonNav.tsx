// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Link } from 'react-router';

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

export function CommonNav({
  className,
  ...props
}: Props) {
  return (
    <nav
      className={cn(
        cssVariants(),
        className
      )}
      {...props}
    >
      <ul>
        <li>
          <Link to='/'>
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to='/test'>
            <span>테스트</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
