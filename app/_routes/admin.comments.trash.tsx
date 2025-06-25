import { setMeta } from '@/_libs';
// import type { Route } from './+types/admin.comments.trash';

export function loader({ request, }: any) {
  // soft delete된 댓글만 조회
  return {};
}

export function action({ request, }: any) {
  // 복원/영구삭제 액션 처리
  return {};
}

export function meta({}: any) {
  return setMeta({
    title: '댓글 휴지통',
    url: '/admin/comments/trash',
  });
}

export default function AdminCommentsTrashPage({}: any) {
  return <div>댓글 휴지통 페이지</div>;
}
