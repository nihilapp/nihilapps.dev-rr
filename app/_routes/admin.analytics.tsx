import { setMeta } from '@/_libs';

import type { Route } from './+types/admin.analytics';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '통계 및 분석',
    url: '/admin/analytics',
  });
}

export default function AdminAnalyticsPage({}: Route.ComponentProps) {
  return <div>통계 및 분석</div>;
}
