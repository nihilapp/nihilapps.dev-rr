import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.posts._index';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 포스트 관리',
    url: '/blogs/:slug/admin/posts',
  });
}

export default function BlogAdminPostsIndexPage({}: Route.ComponentProps) {
  return <div>블로그 포스트 관리</div>;
}
