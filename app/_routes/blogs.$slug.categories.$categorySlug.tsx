import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.categories.$categorySlug';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '카테고리별 포스트',
    url: '/blogs/:slug/categories/:categorySlug',
  });
}

export default function BlogCategoryPostsPage({}: Route.ComponentProps) {
  return <div>카테고리별 포스트</div>;
}
