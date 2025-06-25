import { Outlet } from 'react-router';

import { setMeta } from '@/_libs';

import type { Route } from './+types/blogs.$slug.admin';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '블로그 어드민',
    url: '/blogs/:slug/admin',
  });
}

export default function BlogAdminLayout({}: Route.ComponentProps) {
  return <Outlet />;
}
