import { setMeta } from '@/_libs';

import type { Route } from './+types/terms';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '이용약관',
    url: '/terms',
  });
}

export default function TermsPage({}: Route.ComponentProps) {
  return <div>이용약관</div>;
}
