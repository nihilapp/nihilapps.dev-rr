import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.images';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '이미지 갤러리',
    url: '/admin/images',
  });
}

export default function AdminImagesPage({}: Route.ComponentProps) {
  return <div>이미지 갤러리</div>;
}
