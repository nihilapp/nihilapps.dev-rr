// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Link, Outlet } from 'react-router';

import { cn } from '@/_libs';

const cssVariants = cva(
  [
    `flex flex-row gap-5 flex-1`,
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

export function AdminContent({
  className,
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
      <aside className='bg-black-600'>
        <nav>
          <ul>
            <li>
              <Link to='/admin'>대시보드</Link>
            </li>
            <li>
              <Link to='/admin/blogs'>블로그 관리</Link>
            </li>
            <li>
              <Link to='/admin/posts'>게시글 관리</Link>
            </li>
            <li>
              <Link to='/admin/categories'>카테고리 관리</Link>
            </li>
            <li>
              <Link to='/admin/tags'>태그 관리</Link>
            </li>
            <li>
              <Link to='/admin/comments'>댓글 관리</Link>
            </li>
          </ul>
        </nav>

        <footer>
          footer
        </footer>
      </aside>

      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
