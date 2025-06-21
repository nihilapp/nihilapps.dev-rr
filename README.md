# 📘 블로그 매니지먼트 시스템 스키마 (개선 반영 버전)

---

## 1. `users`

- `id`: 사용자 고유 ID (UUID, PK, 자동 생성)
- `email`: 로그인용 이메일 (UNIQUE, NOT NULL)
- `username`: 사용자 이름 (NOT NULL)
- `image`: 프로필 이미지 URL
- `bio`: 관리자 소개글
- `social_links`: 소셜 미디어 프로필 링크 (JSON)
- `role`: 사용자 권한 (`SUPER_ADMIN`, `ADMIN`, `USER` 중 하나, 기본값 'USER')
- `is_active`: 계정 활성화 여부 (기본값 `true`)
- `last_signed_at`: 마지막 로그인 시각
- `created_at`: 생성일 (자동 생성)
- `updated_at`: 수정일 (자동 업데이트)
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 2. `user_auths`

- `id`: 인증 정보 ID (UUID, PK, 자동 생성)
- `user_id`: `users.id` 참조 (FK, UNIQUE, NOT NULL, ON DELETE CASCADE)
- `hashed_password`: 해시된 비밀번호
- `refresh_token`: 리프레시 토큰
- `created_at`: 생성일 (자동 생성)
- `updated_at`: 수정일 (자동 업데이트)
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 3. `blogs`

- `id`: 블로그 고유 ID (UUID, PK)
- `user_id`: 블로그 주인 ID (FK, users.id)
- `name`: 블로그 이름
- `slug`: URL용 고유 슬러그
- `description`: 블로그 설명
- `visibility`: `PUBLIC` 또는 `PRIVATE`
- `settings`: JSON 형태의 커스텀 설정
- `created_at`: 생성일
- `updated_at`: 수정일
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 4. `posts`

- `id`: 포스트 ID (UUID, PK)
- `blog_id`: 소속 블로그 ID (FK)
- `category_id`: 소속 카테고리 ID (Nullable, FK)
- `title`: 포스트 제목
- `slug`: 블로그 내 고유 슬러그 (`blog_id`와 함께 UNIQUE)
- `content`: 본문 내용 (MD or HTML)
- `excerpt`: 요약문
- `thumbnail_url`: 썸네일 이미지 주소
- `status`: `DRAFT`, `PUBLISHED`, `ARCHIVED`
- `visibility`: `PUBLIC`, `PRIVATE`, `PROTECTED`
- `password`: 보호 상태일 경우 해시된 비밀번호
- `is_featured`: 추천 포스트 여부
- `is_pinned`: 상단 고정 여부
- `view_count`: 조회수 (캐시용)
- `like_count`: 좋아요 수 (캐시용)
- `locale`: 언어 정보 (`ko-KR` 등)
- `published_at`: 발행일
- `created_at`: 생성일
- `updated_at`: 수정일
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 5. `post_revisions`

- `id`: 리비전 ID (UUID, PK)
- `post_id`: 대상 포스트 ID (FK)
- `title`: 수정 당시 제목
- `content`: 수정 당시 내용
- `updated_at`: 이력 생성 시각

---

## 6. `categories`

- `id`: 카테고리 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `parent_id`: 상위 카테고리 ID (Nullable, 자기참조 FK)
- `name`: 카테고리 이름 (`blog_id`, `parent_id`와 함께 UNIQUE)
- `slug`: 카테고리 슬러그 (`blog_id`와 함께 UNIQUE)
- `created_at`: 생성일
- `updated_at`: 수정일
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 7. `tags`

- `id`: 태그 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `name`: 태그 이름 (`blog_id`와 함께 UNIQUE)
- `is_featured`: 대표 태그 여부
- `created_at`: 생성일
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 8. `post_tags`

- `post_id`: 포스트 ID (FK)
- `tag_id`: 태그 ID (FK)
- 복합 PK: (`post_id`, `tag_id`)

---

## 9. `comments`

- `id`: 댓글 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `post_id`: 포스트 ID (FK)
- `parent_id`: 부모 댓글 ID (Nullable, FK)
- `author_type`: `ADMIN`, `VISITOR`
- `status`: 댓글 상태 (`PENDING`, `APPROVED`, `SPAM`)
- `content`: 댓글 내용
- `visitor_name`: 방문자 이름
- `visitor_email`: 방문자 이메일
- `visitor_hashed_password`: 비밀번호 (해시 처리)
- `created_at`: 작성일
- `updated_at`: 수정일
- `deleted_at`: 삭제된 시각 (Soft Delete용)

---

## 10. `post_views`

- `id`: 조회 기록 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `post_id`: 포스트 ID (FK)
- `visitor_id`: 고유 방문자 식별자 (e.g., UUID)
- `user_agent`: 브라우저 정보
- `viewed_at`: 조회 시각

---

## 11. `post_likes`

- `id`: 좋아요 기록 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `post_id`: 포스트 ID (FK)
- `visitor_id`: 고유 방문자 식별자
- `liked_at`: 좋아요 시각

---

## 12. `blog_settings` (선택적)

- `id`: 설정 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `key`: 설정 키
- `value`: 설정 값
- `updated_at`: 마지막 수정일

---

## 13. `announcements`

- `id`: 공지 ID (UUID, PK)
- `blog_id`: 블로그 ID (FK)
- `title`: 공지 제목
- `content`: 공지 내용
- `is_pinned`: 상단 고정 여부
- `created_at`: 생성일
- `updated_at`: 수정일
- `deleted_at`: 삭제된 시각 (Soft Delete용)
