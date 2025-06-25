import { setMeta } from '@/_libs';

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
    title: '블로그 댓글 휴지통',
    url: '/blogs/:slug/admin/comments/trash',
  });
}

export default function BlogAdminCommentsTrashPage({}: any) {
  return <div>블로그 댓글 휴지통 페이지</div>;
}
