import { setMeta } from '@/_libs';

import type { Route } from './+types/SignUpPage';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `회원가입`,
    url: `/auth/signup`,
  });
}

export default function SignUpPage({}: Route.ComponentProps) {
  return (
    <div>회원가입</div>
  );
}
