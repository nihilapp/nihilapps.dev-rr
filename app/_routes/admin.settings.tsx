import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.settings';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '시스템 설정',
    url: '/admin/settings',
  });
}

export default function AdminSettingsPage({}: Route.ComponentProps) {
  return <div>시스템 설정</div>;
}
