import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.comments';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '댓글 관리',
    url: '/blogs/:slug/admin/comments',
  });
}

export default function BlogAdminCommentsPage({}: Route.ComponentProps) {
  return <div>댓글 관리</div>;
}
