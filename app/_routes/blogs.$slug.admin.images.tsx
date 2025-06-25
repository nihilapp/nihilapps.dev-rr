import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin.images';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '이미지 갤러리',
    url: '/blogs/:slug/admin/images',
  });
}

export default function BlogAdminImagesPage({}: Route.ComponentProps) {
  return <div>이미지 갤러리</div>;
}
