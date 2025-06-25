import { setMeta } from '@/_libs';
// import type { Route } from './+types/admin.blogs.trash';

export function loader({ request, }: any) {
  // soft delete된 블로그만 조회
  return {};
}

export function action({ request, }: any) {
  // 복원/영구삭제 액션 처리
  return {};
}

export function meta({}: any) {
  return setMeta({
    title: '블로그 휴지통',
    url: '/admin/blogs/trash',
  });
}

export default function AdminBlogsTrashPage({}: any) {
  return <div>블로그 휴지통 페이지</div>;
}
