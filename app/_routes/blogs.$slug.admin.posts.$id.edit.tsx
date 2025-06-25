import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.posts.$id.edit';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '포스트 수정',
    url: '/blogs/:slug/admin/posts/:id/edit',
  });
}

export default function BlogAdminEditPostPage({}: Route.ComponentProps) {
  return <div>포스트 수정</div>;
}
