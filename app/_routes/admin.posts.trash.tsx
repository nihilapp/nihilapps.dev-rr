import { setMeta } from '@/_libs';
// import type { Route } from './+types/admin.posts.trash';

export function loader({ request, }: any) {
  // soft delete된 포스트만 조회
  return {};
}

export function action({ request, }: any) {
  // 복원/영구삭제 액션 처리
  return {};
}

export function meta({}: any) {
  return setMeta({
    title: '포스트 휴지통',
    url: '/admin/posts/trash',
  });
}

export default function AdminPostsTrashPage({}: any) {
  return <div>포스트 휴지통 페이지</div>;
}
