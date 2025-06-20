import { setMeta } from '@/_libs';

import type { Route } from './+types/SignInPage';

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

export default function SignInPage({}: Route.ComponentProps) {
  return (
    <div>로그인</div>
  );
}
