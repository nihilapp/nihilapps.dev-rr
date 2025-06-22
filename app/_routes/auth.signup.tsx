import { setMeta } from '@/_libs';

import type { Route } from './+types/auth.signup';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `계정 생성`,
    url: `/auth/signup`,
  });
}

export default function AuthSignUpPage({}: Route.ComponentProps) {
  return (
    <div>content</div>
  );
}
