import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.blogs';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `블로그 관리`,
    url: `/admin/blogs`,
  });
}

export default function AdminBlogsPage({}: Route.ComponentProps) {
  return (
    <div>blogs page</div>
  );
}
