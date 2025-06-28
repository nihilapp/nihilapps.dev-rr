# 프로젝트 테이블 구조 및 관계 설명 (@/\_entities 기준)

---

## 1. users (auth.users) 타입스크립트를 위해서만 만들어둔 가 테이블 변경해서는 안됨.

- **id** (PK, UUID): 유저 고유 ID
- Supabase 인증 시스템 테이블 (auth 스키마)

## 2. authors

- **author_id** (PK, UUID, FK → users.id): 유저 고유 ID, authors의 PK이자 users의 FK
- name: 이름
- username: 사용자 이름
- image: 프로필 이미지
- short_bio: 짧은 소개
- bio: 소개
- role: 권한 (USER/ADMIN/SUPER_ADMIN)
- otp_string: 2FA OTP에 필요한 문자열
- created_at, updated_at: 생성/수정일

> **관계:** authors.author_id → users.id (1:1)

---

## 3. blogs

- **blog_id** (PK, UUID): 블로그 고유 ID
- author_id (FK → authors.author_id): 블로그 주인
- name: 블로그 이름
- slug: URL용 고유 슬러그
- description: 블로그 설명
- visibility: 공개/비공개
- settings: JSON 설정
- created_at, updated_at, deleted_at: 생성/수정/삭제일

> **관계:** blogs.author_id → authors.author_id (N:1)

---

## 4. categories

- **category_id** (PK, UUID): 카테고리 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- parent_id (FK → categories.category_id, nullable): 상위 카테고리 (자기참조)
- name: 카테고리 이름
- slug: 카테고리 슬러그
- created_at, updated_at: 생성/수정일

> **관계:** categories.blog_id → blogs.blog_id (N:1)
> categories.parent_id → categories.category_id (N:1, 자기참조)

---

## 5. tags

- **tag_id** (PK, UUID): 태그 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- name: 태그 이름
- is_featured: 대표 태그 여부
- created_at: 생성일

> **관계:** tags.blog_id → blogs.blog_id (N:1)

---

## 6. posts

- **post_id** (PK, UUID): 포스트 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- category_id (FK → categories.category_id, nullable): 소속 카테고리
- title, slug, content, excerpt, thumbnail_url: 포스트 정보
- status, visibility, password: 상태/공개/보호
- is_featured, is_pinned: 추천/고정 여부
- view_count, like_count: 조회/좋아요 수
- locale: 언어
- published_at, created_at, updated_at, deleted_at: 발행/생성/수정/삭제일

> **관계:** posts.blog_id → blogs.blog_id (N:1)
> posts.category_id → categories.category_id (N:1)

---

## 7. post_comments

- **post_comment_id** (PK, UUID): 댓글 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- post_id (FK → posts.post_id): 소속 포스트
- author_id (FK → authors.author_id, nullable): 작성자(회원)
- author_type: ADMIN/USER/방문자
- status: 상태
- content, visitor_name, visitor_email, visitor_hashed_password: 내용/방문자 정보
- created_at, updated_at: 생성/수정일

> **관계:** post_comments.blog_id → blogs.blog_id (N:1)
> post_comments.post_id → posts.post_id (N:1)
> post_comments.author_id → authors.author_id (N:1, nullable)

---

## 8. post_comments_replies

- **id** (PK, UUID): 답글 고유 ID
- comment_id (FK → post_comments.post_comment_id): 부모 댓글
- author_id (FK → authors.author_id, nullable): 작성자(회원)
- author_type: ADMIN/USER/방문자
- author_name, author_email, content, author_hashed_password: 답글 정보
- created_at, updated_at: 생성/수정일

> **관계:** post_comments_replies.comment_id → post_comments.post_comment_id (N:1)
> post_comments_replies.author_id → authors.author_id (N:1, nullable)

---

## 9. post_tags

- post_id (FK → posts.post_id): 포스트
- tag_id (FK → tags.tag_id): 태그
- 복합 PK (post_id, tag_id)

> **관계:** post_tags.post_id → posts.post_id (N:1)
> post_tags.tag_id → tags.tag_id (N:1)

---

## 10. post_likes

- blog_id (FK → blogs.blog_id): 소속 블로그
- post_id (FK → posts.post_id): 소속 포스트
- visitor_id: 고유 방문자 식별자
- liked_at: 좋아요 시각
- 복합 PK (visitor_id, post_id)

> **관계:** post_likes.blog_id → blogs.blog_id (N:1)
> post_likes.post_id → posts.post_id (N:1)

---

## 11. post_views

- blog_id (FK → blogs.blog_id): 소속 블로그
- post_id (FK → posts.post_id): 소속 포스트
- visitor_id: 고유 방문자 식별자
- user_agent: 브라우저 정보
- viewed_at: 조회 시각
- 복합 PK (visitor_id, post_id)

> **관계:** post_views.blog_id → blogs.blog_id (N:1)
> post_views.post_id → posts.post_id (N:1)

---

## 12. post_revisions

- **post_revision_id** (PK, UUID): 리비전 고유 ID
- post_id (FK → posts.post_id): 대상 포스트
- title, content: 수정 당시 정보
- updated_at: 이력 생성 시각

> **관계:** post_revisions.post_id → posts.post_id (N:1)

---

## 13. announcements

- **announcement_id** (PK, UUID): 공지 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- title, content, is_pinned: 공지 정보
- created_at, updated_at: 생성/수정일

> **관계:** announcements.blog_id → blogs.blog_id (N:1)

---

## 14. blog_settings

- **blog_setting_id** (PK, UUID): 블로그 설정 고유 ID
- blog_id (FK → blogs.blog_id): 소속 블로그
- key, value: 설정 정보
- updated_at: 마지막 수정일

> **관계:** blog_settings.blog_id → blogs.blog_id (N:1)

---

# 주요 조인 예시

- 블로그의 모든 포스트: `SELECT * FROM posts WHERE blog_id = ...`
- 포스트의 모든 태그: `SELECT * FROM post_tags JOIN tags USING(tag_id) WHERE post_id = ...`
- 댓글의 답글: `SELECT * FROM post_comments_replies WHERE comment_id = ...`
- 블로그의 모든 카테고리: `SELECT * FROM categories WHERE blog_id = ...`

---

# 참고

- 모든 PK는 "자원단수\_id" 형태로 통일
- 모든 FK는 참조 테이블의 PK명과 동일하게 통일
- join 시 USING(컬럼명) 구문 사용이 용이함
