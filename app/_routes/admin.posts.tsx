import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.posts';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `게시글 관리`,
    url: `/admin/posts`,
  });
}

export default function AdminPostsPage({}: Route.ComponentProps) {
  return (
    <div>posts page</div>
  );
}
