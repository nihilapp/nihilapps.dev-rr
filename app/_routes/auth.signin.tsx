import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.signin';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `로그인`,
    url: `/auth/signin`,
  });
}

export default function AuthSignInPage({}: Route.ComponentProps) {
  return (
    <div>content</div>
  );
}
