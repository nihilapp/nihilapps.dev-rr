import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.search';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 검색',
    url: '/blogs/:slug/search',
  });
}

export default function BlogSearchPage({}: Route.ComponentProps) {
  return <div>블로그 검색</div>;
}
