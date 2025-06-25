import { setMeta } from '@/_libs';

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
    title: '블로그 포스트 휴지통',
    url: '/blogs/:slug/admin/posts/trash',
  });
}

export default function BlogAdminPostsTrashPage({}: any) {
  return <div>블로그 포스트 휴지통 페이지</div>;
}
