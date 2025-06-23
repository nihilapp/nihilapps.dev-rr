-- users
INSERT INTO users (id, email, username, image, bio, social_links, role, is_active, last_signed_at, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@example.com', 'admin', NULL, '최고관리자', '{}', 'SUPER_ADMIN', true, NOW(), NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'user1@example.com', 'user1', NULL, '첫번째 유저', '{}', 'USER', true, NOW(), NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'user2@example.com', 'user2', NULL, '두번째 유저', '{}', 'USER', true, NOW(), NOW(), NOW());

-- user_auths
INSERT INTO user_auths (id, user_id, passcode, otp_secret, hashed_password, refresh_token, created_at, updated_at)
VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'passcode1', 'otpsecret1', 'hashedpw1', 'refresh1', NOW(), NOW()),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '22222222-2222-2222-2222-222222222222', 'passcode2', 'otpsecret2', 'hashedpw2', 'refresh2', NOW(), NOW()),
  ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '33333333-3333-3333-3333-333333333333', 'passcode3', 'otpsecret3', 'hashedpw3', 'refresh3', NOW(), NOW());

-- blogs
INSERT INTO blogs (id, user_id, name, slug, description, visibility, settings, created_at, updated_at)
VALUES
  ('a2111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '관리자 블로그', 'admin-blog', '관리자의 블로그입니다.', 'PUBLIC', '{}', NOW(), NOW()),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '유저1 블로그', 'user1-blog', '유저1의 블로그입니다.', 'PRIVATE', '{}', NOW(), NOW()),
  ('a2333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', '유저2 블로그', 'user2-blog', '유저2의 블로그입니다.', 'PUBLIC', '{}', NOW(), NOW());

-- blog_settings
INSERT INTO blog_settings (id, blog_id, key, value, updated_at)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'theme', 'light', NOW()),
  ('a1222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'theme', 'dark', NOW()),
  ('a1333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'theme', 'auto', NOW());

-- categories
INSERT INTO categories (id, blog_id, parent_id, name, slug, created_at, updated_at)
VALUES
  ('a3111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', NULL, '공지', 'notice', NOW(), NOW()),
  ('a3222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', NULL, '일상', 'daily', NOW(), NOW()),
  ('a3333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', NULL, '기술', 'tech', NOW(), NOW());

-- tags
INSERT INTO tags (id, blog_id, name, is_featured, created_at)
VALUES
  ('a4111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'React', true, NOW()),
  ('a4222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', '일상', false, NOW()),
  ('a4333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'AI', true, NOW());

-- posts
INSERT INTO posts (id, blog_id, category_id, title, slug, content, excerpt, thumbnail_url, status, visibility, password, is_featured, is_pinned, view_count, like_count, locale, published_at, created_at, updated_at)
VALUES
  ('a5111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'a3111111-1111-1111-1111-111111111111', '첫 번째 포스트', 'first-post', '# 첫 번째 포스트\n\n이것은 **마크다운** 예시입니다.\n\n- 항목1\n- 항목2', '마크다운 예시', NULL, 'PUBLISHED', 'PUBLIC', NULL, true, false, 10, 2, 'ko-KR', NOW(), NOW(), NOW()),
  ('a5222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'a3222222-2222-2222-2222-222222222222', '두 번째 포스트', 'second-post', '## 두 번째 포스트\n\n- 리스트\n- 예시', '리스트 예시', NULL, 'DRAFT', 'PRIVATE', NULL, false, false, 0, 0, 'ko-KR', NULL, NOW(), NOW()),
  ('a5333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', '세 번째 포스트', 'third-post', '### 세 번째 포스트\n\n> 인용문\n\n코드: `console.log(1);`', '인용문과 코드', NULL, 'PUBLISHED', 'PUBLIC', NULL, false, true, 5, 1, 'ko-KR', NOW(), NOW(), NOW());

-- post_revisions
INSERT INTO post_revisions (id, post_id, title, content, updated_at)
VALUES
  ('a6111111-1111-1111-1111-111111111111', 'a5111111-1111-1111-1111-111111111111', '첫 번째 포스트(수정)', '수정된 내용', NOW()),
  ('a6222222-2222-2222-2222-222222222222', 'a5222222-2222-2222-2222-222222222222', '두 번째 포스트(수정)', '수정된 내용2', NOW()),
  ('a6333333-3333-3333-3333-333333333333', 'a5333333-3333-3333-3333-333333333333', '세 번째 포스트(수정)', '수정된 내용3', NOW());

-- post_tags
INSERT INTO post_tags (post_id, tag_id)
VALUES
  ('a5111111-1111-1111-1111-111111111111', 'a4111111-1111-1111-1111-111111111111'),
  ('a5222222-2222-2222-2222-222222222222', 'a4222222-2222-2222-2222-222222222222'),
  ('a5333333-3333-3333-3333-333333333333', 'a4333333-3333-3333-3333-333333333333');

-- comments
INSERT INTO comments (id, blog_id, post_id, parent_id, author_type, status, content, visitor_name, visitor_email, visitor_hashed_password, created_at, updated_at)
VALUES
  ('a7111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'a5111111-1111-1111-1111-111111111111', NULL, 'VISITOR', 'APPROVED', '좋은 글이네요!', '홍길동', 'hong@example.com', 'hashedpw', NOW(), NOW()),
  ('a7222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'a5222222-2222-2222-2222-222222222222', NULL, 'ADMIN', 'PENDING', '관리자 댓글', NULL, NULL, NULL, NOW(), NOW()),
  ('a7333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'a5333333-3333-3333-3333-333333333333', NULL, 'VISITOR', 'SPAM', '스팸 댓글', '스패머', 'spam@example.com', 'hashedpw2', NOW(), NOW());

-- post_likes
INSERT INTO post_likes (id, blog_id, post_id, visitor_id, liked_at)
VALUES
  ('a8111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'a5111111-1111-1111-1111-111111111111', 'a9111111-1111-1111-1111-111111111111', NOW()),
  ('a8222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'a5222222-2222-2222-2222-222222222222', 'a9222222-2222-2222-2222-222222222222', NOW()),
  ('a8333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'a5333333-3333-3333-3333-333333333333', 'a9333333-3333-3333-3333-333333333333', NOW());

-- post_views
INSERT INTO post_views (id, blog_id, post_id, visitor_id, user_agent, viewed_at)
VALUES
  ('a9111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', 'a5111111-1111-1111-1111-111111111111', 'a9111111-1111-1111-1111-111111111111', 'Mozilla/5.0', NOW()),
  ('a9222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'a5222222-2222-2222-2222-222222222222', 'a9222222-2222-2222-2222-222222222222', 'Chrome/120.0', NOW()),
  ('a9333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', 'a5333333-3333-3333-3333-333333333333', 'a9333333-3333-3333-3333-333333333333', 'Safari/16.0', NOW());

-- announcements
INSERT INTO announcements (id, blog_id, title, content, is_pinned, created_at, updated_at)
VALUES
  ('aa111111-1111-1111-1111-111111111111', 'a2111111-1111-1111-1111-111111111111', '공지사항1', '첫 번째 공지입니다.', true, NOW(), NOW()),
  ('aa222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', '공지사항2', '두 번째 공지입니다.', false, NOW(), NOW()),
  ('aa333333-3333-3333-3333-333333333333', 'a2333333-3333-3333-3333-333333333333', '공지사항3', '세 번째 공지입니다.', false, NOW(), NOW()); 