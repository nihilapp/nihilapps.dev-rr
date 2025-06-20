import { setMeta } from '@/_libs';

import type { Route } from './+types/IndexPage';

export async function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `홈`,
    url: `/`,
  });
}

export default function IndexPage({}: Route.ComponentProps) {
  return (
    <div className='text-red-500'>
      content
    </div>
  );
}
