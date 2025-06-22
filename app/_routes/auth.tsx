import { Outlet } from 'react-router';

import type { Route } from './+types/auth';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <main>
      여기는 로그인 / 회원가입 레이아웃
      <Outlet />
    </main>
  );
}
