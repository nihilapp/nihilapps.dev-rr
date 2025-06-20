import { setMeta } from '@/_libs';

import type { Route } from './+types/TestPage';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `테스트`,
    url: `/test`,
  });
}

export default function TestPage({}: Route.ComponentProps) {
  return (
    <div>test</div>
  );
}
