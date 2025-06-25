import { setMeta } from '@/_libs';

import type { Route } from './+types/privacy';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '개인정보처리방침',
    url: '/privacy',
  });
}

export default function PrivacyPage({}: Route.ComponentProps) {
  return <div>개인정보처리방침</div>;
}
