import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.posts._index';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 포스트 목록',
    url: '/blogs/:slug/posts',
  });
}

export default function BlogPostsIndexPage({}: Route.ComponentProps) {
  return <div>블로그 포스트 목록</div>;
}
