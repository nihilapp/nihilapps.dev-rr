import { Outlet } from 'react-router';

import { AuthLayout } from '@/_components/auth';

import type { Route } from './+types/auth';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export default function AuthLayoutRoute({}: Route.ComponentProps) {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
