import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.hashtags';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '해시태그 관리',
    url: '/blogs/:slug/admin/hashtags',
  });
}

export default function BlogAdminHashtagsPage({}: Route.ComponentProps) {
  return <div>해시태그 관리</div>;
}
