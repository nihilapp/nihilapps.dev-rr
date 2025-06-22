import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug';

export function loader({ request, params, }: Route.LoaderArgs) {
  const { slug, } = params;

  console.log(slug);

  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({ params, }: Route.MetaArgs) {
  const { slug, } = params;

  return setMeta({
    title: `블로그 ${slug}`,
    url: `/blogs/${slug}`,
  });
}

export default function BlogMainPage({}: Route.ComponentProps) {
  return (
    <div>blog main</div>
  );
}
