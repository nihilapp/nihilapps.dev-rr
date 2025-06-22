import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.comments';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `댓글 관리`,
    url: `/admin/comments`,
  });
}

export default function AdminCommentsPage({}: Route.ComponentProps) {
  return (
    <div>comments page</div>
  );
}
