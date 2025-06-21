import type { Menu } from '@/_entities/common';

// 블러그 매니지먼트 시스템의 메뉴
export const adminMenu: Menu[] = [
  {
    name: '대시보드',
    path: '/admin',
  },
  {
    name: '블로그 관리',
    path: '/admin/blogs',
  },
  {
    name: '포스트 관리',
    path: '/admin/posts',
  },
  {
    name: '덧글 관리',
    path: '/admin/comments',
  },
  {
    name: '카테고리 관리',
    path: '/admin/categories',
  },
  {
    name: '태그 관리',
    path: '/admin/tags',
  },
];

// 각각의 블로그 개별 메뉴 동적으로 주소에 동적인 데이터가 들어가기 때문에 메소드로 구현.
export const blogMenu: Menu[] = [
  {
    get name(blog) {
      return '';
    },
    get path() {
      return '';
    },
  },
];
