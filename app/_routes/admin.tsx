import { Outlet } from 'react-router';

import { AdminContent, AdminHeader } from '@/_components/admin';

import type { Route } from './+types/admin';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export default function AdminLayout({}: Route.ComponentProps) {
  return (
    <>
      <AdminHeader />
      <AdminContent>
        <Outlet />
      </AdminContent>
    </>
  );
}
