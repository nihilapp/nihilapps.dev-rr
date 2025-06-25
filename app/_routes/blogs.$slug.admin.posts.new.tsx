import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.posts.new';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '새 포스트 작성',
    url: '/blogs/:slug/admin/posts/new',
  });
}

export default function BlogAdminNewPostPage({}: Route.ComponentProps) {
  return <div>새 포스트 작성</div>;
}
