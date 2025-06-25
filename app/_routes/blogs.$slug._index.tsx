import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug._index';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 홈',
    url: '/blogs/:slug',
  });
}

export default function BlogIndexPage({}: Route.ComponentProps) {
  return <div>블로그 홈</div>;
}
