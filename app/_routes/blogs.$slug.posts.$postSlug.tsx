import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.posts.$postSlug';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '포스트 상세',
    url: '/blogs/:slug/posts/:postSlug',
  });
}

export default function BlogPostDetailPage({}: Route.ComponentProps) {
  return <div>포스트 상세</div>;
}
