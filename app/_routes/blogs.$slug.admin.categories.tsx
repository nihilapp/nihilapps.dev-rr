import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.categories';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '카테고리 관리',
    url: '/blogs/:slug/admin/categories',
  });
}

export default function BlogAdminCategoriesPage({}: Route.ComponentProps) {
  return <div>카테고리 관리</div>;
}
