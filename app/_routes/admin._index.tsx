import { setMeta } from '@/_libs';

import type { Route } from './+types/admin._index';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `대시보드`,
    url: `/admin`,
  });
}

export default function AdminDashboardPage({}: Route.ComponentProps) {
  return (
    <div>dashboard page</div>
  );
}
