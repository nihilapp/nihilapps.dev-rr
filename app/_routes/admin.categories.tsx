import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.categories';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `카테고리 관리`,
    url: `/admin/categories`,
  });
}

export default function AdminCategoriesPage({}: Route.ComponentProps) {
  return (
    <div>categories page</div>
  );
}
