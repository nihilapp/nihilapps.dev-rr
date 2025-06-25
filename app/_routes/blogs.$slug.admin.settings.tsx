import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.settings';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 설정',
    url: '/blogs/:slug/admin/settings',
  });
}

export default function BlogAdminSettingsPage({}: Route.ComponentProps) {
  return <div>블로그 설정</div>;
}
