import { Outlet } from 'react-router';

import type { Route } from './+types/AuthLayout';

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <main>
      <Outlet />
    </main>
  );
}
