import { Link, Outlet } from 'react-router';

import { siteConfig } from '@/_config';

import type { Route } from './+types/auth';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <main className='flex flex-col items-center justify-center dvh-100 dvw-100 bg-gray-50 dark:bg-gray-950'>
      <div className='mb-8'>
        <Link to='/'>
          <img
            src={siteConfig.logo}
            alt='Nihilncunia Logo'
            className='h-10 w-auto'
          />
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
