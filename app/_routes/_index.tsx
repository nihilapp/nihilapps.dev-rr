import { Link } from 'react-router';

import { Button } from '@/_components/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/_components/common/ui/card';
import { siteConfig } from '@/_config';
import { setMeta } from '@/_libs';

import type { Route } from './+types/_index';

// --- 목업 데이터 ---
const mockBlogs = [
  {
    id: '1',
    name: 'Nihilncunia의 기술 블로그',
    slug: 'nihil-tech',
    description: '웹 개발, 시스템 아키텍처, 그리고 다양한 프로그래밍 이야기를 다룹니다.',
    post_count: 28,
  },
  {
    id: '2',
    name: '일상과 생각의 조각들',
    slug: 'daily-thoughts',
    description: '코딩 밖의 세상, 그리고 스쳐 지나간 생각들을 기록합니다.',
    post_count: 15,
  },
];

const mockPosts = [
  {
    id: '101',
    title: 'React Router v7 파일 기반 라우팅 완전 정복',
    slug: 'react-router-v7-fs-routing',
    excerpt: '새롭게 등장한 파일 기반 라우팅 시스템의 개념부터 실제 적용까지 깊이 있게 살펴봅니다.',
    blog_name: 'Nihilncunia의 기술 블로그',
    blog_slug: 'nihil-tech',
    created_at: '2024-07-28',
  },
  {
    id: '102',
    title: 'Drizzle ORM과 함께하는 타입-세이프 데이터베이스',
    slug: 'type-safe-db-with-drizzle',
    excerpt: 'TypeScript 환경에서 Drizzle ORM을 사용하여 어떻게 데이터베이스 스키마와 쿼리의 타입 안정성을 확보하는지 알아봅니다.',
    blog_name: 'Nihilncunia의 기술 블로그',
    blog_slug: 'nihil-tech',
    created_at: '2024-07-25',
  },
];

export function loader({ request, }: Route.LoaderArgs) {
  // 실제 구현에서는 여기서 DB 쿼리를 통해 데이터를 가져옵니다.
  return { blogs: mockBlogs, posts: mockPosts, };
}

export function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: '홈',
    url: '/',
  });
}

export default function HomePage({ loaderData, }: Route.ComponentProps) {
  const { blogs, posts, } = loaderData;

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='flex items-center justify-between mb-12'>
        <Link to='/' className='flex items-center gap-3'>
          <img src={siteConfig.logo} alt={siteConfig.title} className='w-12 h-12' />
          <span className='text-2xl font-bold'>{siteConfig.title}</span>
        </Link>
        <nav className='flex items-center gap-4'>
          <Button variant='ghost' asChild>
            <Link to='/signin'>로그인</Link>
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <Button asChild>
              <Link to='/signup'>회원가입</Link>
            </Button>
          )}
        </nav>
      </header>

      <main className='space-y-16'>
        <section>
          <h2 className='text-3xl font-bold mb-6'>운영중인 블로그</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {blogs.map((blog) => (
              <Card key={blog.id} className='flex flex-col'>
                <CardHeader>
                  <CardTitle>{blog.name}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='text-sm text-muted-foreground'>
                    총
                    {' '}
                    {blog.post_count}
                    개의 포스트
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to={`/blogs/${blog.slug}`}>블로그 방문하기</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-3xl font-bold mb-6'>최신 포스트</h2>
          <div className='space-y-4'>
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    <Link to={`/blogs/${post.blog_slug}`} className='hover:underline'>
                      {post.blog_name}
                    </Link>
                    ・
                    {' '}
                    {post.created_at}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' asChild>
                    <Link to={`/blogs/${post.blog_slug}/posts/${post.slug}`}>
                      더 읽어보기
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className='mt-16 pt-8 border-t'>
        <div className='text-center text-sm text-muted-foreground'>
          <p>
            &copy;
            {new Date().getFullYear()}
            {' '}
            {siteConfig.title}
            . All Rights Reserved.
          </p>
          <p className='mt-2'>
            <Link to='/privacy' className='hover:underline'>개인정보처리방침</Link>
            <span className='mx-2'>|</span>
            <Link to='/terms' className='hover:underline'>이용약관</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
