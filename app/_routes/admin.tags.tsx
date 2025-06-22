import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.tags';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `태그 관리`,
    url: `/admin/tags`,
  });
}

export default function AdminTagsPage({}: Route.ComponentProps) {
  return (
    <div>tags page</div>
  );
}
