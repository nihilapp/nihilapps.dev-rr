import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.users';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '사용자 관리',
    url: '/admin/users',
  });
}

export default function AdminUsersPage({}: Route.ComponentProps) {
  return <div>사용자 관리</div>;
}
