import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin._index';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 어드민 대시보드',
    url: '/blogs/:slug/admin',
  });
}

export default function BlogAdminDashboardPage({}: Route.ComponentProps) {
  return <div>블로그 어드민 대시보드</div>;
}
