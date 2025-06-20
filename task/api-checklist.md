# API 개발 체크 리스트 (Remix 버전)

본 문서는 블로그 매니지먼트 시스템 프로젝트에서 사용될 주요 API들과 그 기능을 정리한 것입니다. Remix의 리소스 라우트(Resource Route) 시스템을 사용하여 구현됩니다.

---

## 📌 플랫폼 관리 API (Platform Management)

### 1. 인증(Auth) API

- [x] **POST** `app/routes/api.auth.signup.tsx` - 새로운 관리자를 생성합니다. (요청 데이터: `email`, `username`, `password`)

> **참고**: Remix Auth 사용으로 다음 기능들은 구성 필요:
>
> - 로그인: `app/routes/api.auth.login.tsx` - 로그인 처리
> - 로그아웃: `app/routes/api.auth.logout.tsx` - 로그아웃 처리
> - 세션 조회: `app/utils/auth.server.ts`에서 세션 관리
> - 토큰 갱신: 세션 스토리지에서 자동 처리

### 2. 사용자(User) API

- [x] **GET** `app/routes/api.users._index.tsx` - 관리자 목록을 조회합니다.
- [x] **GET** `app/routes/api.users.$id.tsx` - 특정 관리자의 상세 정보를 가져옵니다.
- [x] **GET** `app/routes/api.users.email.$email.tsx` - 이메일로 관리자를 검색합니다.
- [x] **GET** `app/routes/api.users.username.$username.tsx` - 사용자명으로 관리자를 검색합니다.
- [x] **POST** `app/routes/api.users._index.tsx` - 관리자를 새로 생성합니다. (요청 데이터: `email`, `name`, `role`, `password`)
- [x] **PUT** `app/routes/api.users.$id.tsx` - 관리자 기본 정보를 수정합니다.
- [x] **PUT** `app/routes/api.users.$id.password.tsx` - 관리자 비밀번호를 변경합니다.
- [x] **PUT** `app/routes/api.users.$id.image.tsx` - 프로필 이미지를 수정합니다.
- [x] **DELETE** `app/routes/api.users.$id.tsx` - 관리자를 삭제합니다.
- [x] **DELETE** `app/routes/api.users._index.tsx` - 여러 관리자를 한 번에 삭제합니다. (요청 데이터: `ids` 배열)

### 3. 블로그(Blog) API

- [ ] **GET** `app/routes/api.blogs._index.tsx` - 내 블로그 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.tsx` - 특정 블로그 상세 정보를 조회합니다.
- [ ] **POST** `app/routes/api.blogs._index.tsx` - 새 블로그를 생성합니다. (요청 데이터: `name`, `title`, `description`, `slug`, `theme`, `settings`)
- [ ] **PUT** `app/routes/api.blogs.$slug.tsx` - 블로그 정보를 수정합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.tsx` - 블로그를 삭제합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.status.tsx` - 블로그 활성화/비활성화를 변경합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.visibility.tsx` - 블로그 공개/비공개를 변경합니다.

### 4. 플랫폼 전체 포스트 API (모든 블로그)

- [ ] **GET** `app/routes/api.posts._index.tsx` - 모든 블로그의 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.posts.$id.tsx` - 특정 포스트의 상세 정보를 조회합니다.
- [ ] **GET** `app/routes/api.posts.slug.$slug.tsx` - 슬러그로 포스트를 조회합니다.
- [ ] **POST** `app/routes/api.posts._index.tsx` - 새 포스트를 작성합니다. (카테고리, 해시태그 등 포함)
- [ ] **PUT** `app/routes/api.posts.$id.tsx` - 기존 포스트를 수정합니다.
- [ ] **DELETE** `app/routes/api.posts.$id.tsx` - 포스트를 삭제합니다.
- [ ] **GET** `app/routes/api.posts.search.tsx` - 키워드로 포스트를 검색합니다.
- [ ] **PATCH** `app/routes/api.posts.$id.publish.tsx` - 포스트의 공개 상태를 변경합니다.
- [ ] **PATCH** `app/routes/api.posts.$id.views.tsx` - 조회수를 증가시키고 조회 이력을 저장합니다.
- [ ] **PATCH** `app/routes/api.posts.$id.likes.tsx` - 좋아요 수를 증가시킵니다.
- [ ] **POST** `app/routes/api.posts.$id.like.tsx` - 사용자의 좋아요 추가를 처리합니다.
- [ ] **DELETE** `app/routes/api.posts.$id.like.tsx` - 사용자의 좋아요 취소를 처리합니다.
- [ ] **GET** `app/routes/api.posts.$id.views.tsx` - 특정 포스트의 조회 이력을 조회합니다.
- [ ] **GET** `app/routes/api.posts.$id.likes.tsx` - 특정 포스트의 좋아요 이력을 조회합니다.
- [ ] **POST** `app/routes/api.posts.$id.view.tsx` - 포스트 조회수를 증가시키고 조회 기록을 저장합니다.
- [ ] **POST** `app/routes/api.posts.draft.tsx` - 임시 저장용 포스트를 생성합니다.
- [ ] **GET** `app/routes/api.posts.drafts.tsx` - 임시 저장된 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.posts.drafts.$id.restore.tsx` - 임시 저장본을 불러와 복구합니다.
- [ ] **PATCH** `app/routes/api.posts.$id.autosave.tsx` - 작성 중인 포스트를 자동 저장합니다.
- [ ] **PATCH** `app/routes/api.posts.batch-status.tsx` - 여러 포스트의 상태를 일괄 변경합니다.
- [ ] **DELETE** `app/routes/api.posts.batch.tsx` - 선택한 포스트들을 한꺼번에 삭제합니다.
- [ ] **GET** `app/routes/api.posts.$id.related.tsx` - 해당 포스트와 관련된 글을 추천합니다.

### 5. 플랫폼 전체 카테고리 API (모든 블로그)

- [ ] **GET** `app/routes/api.categories._index.tsx` - 모든 블로그의 카테고리를 계층 구조로 조회합니다.
- [ ] **GET** `app/routes/api.categories.flat.tsx` - 모든 블로그의 카테고리를 평면 목록으로 조회합니다.
- [ ] **GET** `app/routes/api.categories.$id.tsx` - 특정 카테고리 상세 정보를 조회합니다.
- [ ] **GET** `app/routes/api.categories.slug.$slug.tsx` - 슬러그로 카테고리를 조회합니다.
- [ ] **POST** `app/routes/api.categories._index.tsx` - 카테고리를 생성합니다. (요청 데이터: `name`, `slug`, `description`, `parent_id`, `order`)
- [ ] **PUT** `app/routes/api.categories.$id.tsx` - 카테고리 정보를 수정합니다.
- [ ] **PATCH** `app/routes/api.categories.$id.order.tsx` - 카테고리 순서를 변경합니다.
- [ ] **PATCH** `app/routes/api.categories.$id.status.tsx` - 카테고리 활성화/비활성화를 변경합니다.
- [ ] **DELETE** `app/routes/api.categories.$id.tsx` - 카테고리를 삭제합니다.
- [ ] **GET** `app/routes/api.categories.$id.posts.tsx` - 특정 카테고리에 속한 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.categories.$id.children.tsx` - 특정 카테고리의 하위 카테고리를 조회합니다.

### 6. 플랫폼 전체 해시태그 API (모든 블로그)

- [ ] **GET** `app/routes/api.hashtags._index.tsx` - 모든 블로그의 해시태그를 조회합니다.
- [ ] **POST** `app/routes/api.hashtags._index.tsx` - 해시태그를 생성합니다.
- [ ] **PUT** `app/routes/api.hashtags.$id.tsx` - 해시태그 이름을 수정합니다.
- [ ] **DELETE** `app/routes/api.hashtags.$id.tsx` - 해시태그를 삭제합니다.
- [ ] **GET** `app/routes/api.hashtags.$id.posts.tsx` - 해당 해시태그가 달린 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.hashtags.autocomplete.tsx` - 키워드로 해시태그 자동완성 목록을 가져옵니다.

### 7. 플랫폼 전체 댓글 API (모든 블로그)

- [ ] **GET** `app/routes/api.comments._index.tsx` - 모든 블로그의 댓글 목록을 조회합니다.
- [ ] **GET** `app/routes/api.comments.$id.tsx` - 특정 댓글의 상세 정보를 조회합니다.
- [ ] **GET** `app/routes/api.comments.post.$postId.tsx` - 포스트별 댓글 목록을 가져옵니다.
- [ ] **POST** `app/routes/api.comments._index.tsx` - 방문자가 댓글을 작성합니다.
- [ ] **POST** `app/routes/api.comments.$id.reply.tsx` - 관리자가 댓글에 답변을 달 때 사용합니다.
- [ ] **PUT** `app/routes/api.comments.$id.tsx` - 댓글 내용을 수정합니다.
- [ ] **DELETE** `app/routes/api.comments.$id.tsx` - 댓글을 삭제합니다.
- [ ] **PATCH** `app/routes/api.comments.$id.approve.tsx` - 댓글 승인 또는 거부 상태를 변경합니다.
- [ ] **POST** `app/routes/api.comments.verify.tsx` - 비밀번호 검증을 통해 댓글 작성자를 확인합니다.

### 8. 플랫폼 전체 이미지 업로드 API (모든 블로그)

- [ ] **POST** `app/routes/api.upload.image.tsx` - 이미지를 업로드합니다.
- [ ] **GET** `app/routes/api.upload.images.tsx` - 업로드된 이미지 목록을 조회합니다.
- [ ] **GET** `app/routes/api.upload.images.$id.tsx` - 특정 이미지 상세 정보를 조회합니다.
- [ ] **PUT** `app/routes/api.upload.images.$id.tsx` - 이미지 메타데이터를 수정합니다. (alt_text 등)
- [ ] **DELETE** `app/routes/api.upload.images.$id.tsx` - 업로드된 이미지를 삭제합니다.
- [ ] **POST** `app/routes/api.upload.images.batch-delete.tsx` - 여러 이미지를 일괄 삭제합니다.

---

## 📝 블로그별 관리 API (Blog-Specific Management)

### 9. 블로그별 포스트 API

- [ ] **GET** `app/routes/api.blogs.$slug.posts._index.tsx` - 해당 블로그의 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.$id.tsx` - 해당 블로그의 특정 포스트를 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.slug.$postSlug.tsx` - 해당 블로그의 포스트를 슬러그로 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.posts._index.tsx` - 해당 블로그에 새 포스트를 작성합니다.
- [ ] **PUT** `app/routes/api.blogs.$slug.posts.$id.tsx` - 해당 블로그의 포스트를 수정합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.posts.$id.tsx` - 해당 블로그의 포스트를 삭제합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.search.tsx` - 해당 블로그에서 포스트를 검색합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.posts.$id.publish.tsx` - 해당 블로그 포스트의 공개 상태를 변경합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.posts.$id.views.tsx` - 해당 블로그 포스트의 조회수를 증가시킵니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.posts.$id.likes.tsx` - 해당 블로그 포스트의 좋아요 수를 증가시킵니다.
- [ ] **POST** `app/routes/api.blogs.$slug.posts.$id.like.tsx` - 해당 블로그 포스트의 좋아요를 추가합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.posts.$id.like.tsx` - 해당 블로그 포스트의 좋아요를 취소합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.$id.views.tsx` - 해당 블로그 포스트의 조회 이력을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.$id.likes.tsx` - 해당 블로그 포스트의 좋아요 이력을 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.posts.$id.view.tsx` - 해당 블로그 포스트의 조회 기록을 생성합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.drafts.tsx` - 해당 블로그의 임시저장 포스트 목록을 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.posts.draft.tsx` - 해당 블로그에 임시저장 포스트를 생성합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.drafts.$id.restore.tsx` - 해당 블로그의 임시 저장본을 복구합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.posts.$id.autosave.tsx` - 해당 블로그 포스트를 자동 저장합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.posts.batch-status.tsx` - 해당 블로그 포스트 상태를 일괄 변경합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.posts.batch.tsx` - 해당 블로그 포스트를 일괄 삭제합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.posts.$id.related.tsx` - 해당 블로그의 관련 포스트를 추천합니다.

### 10. 블로그별 카테고리 API

- [ ] **GET** `app/routes/api.blogs.$slug.categories._index.tsx` - 해당 블로그의 카테고리를 계층 구조로 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.categories.flat.tsx` - 해당 블로그의 카테고리를 평면 목록으로 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.categories.$id.tsx` - 해당 블로그의 특정 카테고리를 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.categories.slug.$categorySlug.tsx` - 해당 블로그의 카테고리를 슬러그로 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.categories._index.tsx` - 해당 블로그에 카테고리를 생성합니다.
- [ ] **PUT** `app/routes/api.blogs.$slug.categories.$id.tsx` - 해당 블로그의 카테고리를 수정합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.categories.$id.order.tsx` - 해당 블로그 카테고리의 순서를 변경합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.categories.$id.status.tsx` - 해당 블로그 카테고리의 활성화/비활성화를 변경합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.categories.$id.tsx` - 해당 블로그의 카테고리를 삭제합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.categories.$id.posts.tsx` - 해당 블로그 카테고리의 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.categories.$id.children.tsx` - 해당 블로그 카테고리의 하위 카테고리를 조회합니다.

### 11. 블로그별 해시태그 API

- [ ] **GET** `app/routes/api.blogs.$slug.hashtags._index.tsx` - 해당 블로그의 해시태그를 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.hashtags._index.tsx` - 해당 블로그에 해시태그를 생성합니다.
- [ ] **PUT** `app/routes/api.blogs.$slug.hashtags.$id.tsx` - 해당 블로그의 해시태그를 수정합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.hashtags.$id.tsx` - 해당 블로그의 해시태그를 삭제합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.hashtags.$id.posts.tsx` - 해당 블로그 해시태그의 포스트 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.hashtags.autocomplete.tsx` - 해당 블로그의 해시태그 자동완성을 제공합니다.

### 12. 블로그별 댓글 API

- [ ] **GET** `app/routes/api.blogs.$slug.comments._index.tsx` - 해당 블로그의 댓글 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.comments.$id.tsx` - 해당 블로그의 특정 댓글을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.comments.post.$postId.tsx` - 해당 블로그 포스트의 댓글 목록을 조회합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.comments._index.tsx` - 해당 블로그에 댓글을 작성합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.comments.$id.reply.tsx` - 해당 블로그 댓글에 답글을 작성합니다.
- [ ] **PUT** `app/routes/api.blogs.$slug.comments.$id.tsx` - 해당 블로그의 댓글을 수정합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.comments.$id.tsx` - 해당 블로그의 댓글을 삭제합니다.
- [ ] **PATCH** `app/routes/api.blogs.$slug.comments.$id.approve.tsx` - 해당 블로그 댓글의 승인 상태를 변경합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.comments.verify.tsx` - 해당 블로그 댓글 작성자를 인증합니다.

### 13. 블로그별 이미지 업로드 API

- [ ] **POST** `app/routes/api.blogs.$slug.upload.image.tsx` - 해당 블로그에 이미지를 업로드합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.upload.images.tsx` - 해당 블로그의 업로드된 이미지 목록을 조회합니다.
- [ ] **GET** `app/routes/api.blogs.$slug.upload.images.$id.tsx` - 해당 블로그의 특정 이미지를 조회합니다.
- [ ] **PUT** `app/routes/api.blogs.$slug.upload.images.$id.tsx` - 해당 블로그의 이미지 메타데이터를 수정합니다.
- [ ] **DELETE** `app/routes/api.blogs.$slug.upload.images.$id.tsx` - 해당 블로그의 이미지를 삭제합니다.
- [ ] **POST** `app/routes/api.blogs.$slug.upload.images.batch-delete.tsx` - 해당 블로그의 이미지를 일괄 삭제합니다.

---

## 🔒 기타/보안/SEO 관련 API

- [ ] **보안 미들웨어**: CORS, CSRF, XSS, Rate Limiting, 파일 업로드 보안, 에러 로깅, 댓글 스팸 방지, 이메일 발송 보안 등 보안 관련 API/미들웨어 구현 필요

---

## 📊 요약 통계

### 전체 API 현황

- **플랫폼 관리 API**: 72개 (5개 완료 ✅)
- **블로그별 관리 API**: 69개 (0개 완료)
- **보안/기타**: 1개 (0개 완료)
- **전체**: **142개** (5개 완료, 137개 미완료)

### 세부 분석

#### 플랫폼 관리 API - 72개 (모든 블로그 통합 관리)

- 인증 API: 1개 ✅
- 사용자 API: 10개 (5개 완료 ✅)
- 블로그 API: 7개
- 플랫폼 전체 포스트 API: 22개
- 플랫폼 전체 카테고리 API: 11개
- 플랫폼 전체 해시태그 API: 6개
- 플랫폼 전체 댓글 API: 9개
- 플랫폼 전체 이미지 업로드 API: 6개

#### 블로그별 관리 API - 69개 (개별 블로그 관리)

- 블로그별 포스트 API: 22개
- 블로그별 카테고리 API: 11개
- 블로그별 해시태그 API: 6개
- 블로그별 댓글 API: 9개
- 블로그별 이미지 업로드 API: 6개

### 관리 방식의 차이점

**플랫폼 어드민** 🌐

- 모든 블로그의 콘텐츠를 통합 관리
- 블로그 생성/삭제/설정 권한
- 플랫폼 전체 데이터 조회 및 관리
- 사용자 관리 권한

**블로그별 어드민** 📝

- 해당 블로그의 콘텐츠만 관리
- 블로그 생성/삭제 권한 없음
- 해당 블로그 데이터만 조회 및 관리
- 블로그 소유자/편집자 권한

### 우선순위 개발 권장사항

**Phase 1 (플랫폼 기반)** 🔥

- 블로그 CRUD API
- 사용자 관리 API 완성
- 플랫폼 포스트 기본 API

**Phase 2 (핵심 기능)** ⭐

- 블로그별 포스트 CRUD API
- 카테고리 관리 API (플랫폼/블로그별)
- 파일 업로드 API

**Phase 3 (고급 기능)** 🚀

- 댓글 시스템 API
- 해시태그 API
- 이메일 알림 시스템

**Phase 4 (최적화)** ✨

- 보안 강화 API
- 성능 최적화

---

## 🔧 Remix 구현 특징

### 리소스 라우트 구현 방법

```typescript
// app/routes/api.users._index.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // GET 요청 처리
  const users = await getUserList();
  return json(users);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;

  switch (method) {
    case "POST":
      // POST 요청 처리
      const formData = await request.formData();
      const result = await createUser(formData);
      return json(result);

    case "DELETE":
      // DELETE 요청 처리 (일괄 삭제)
      const { ids } = await request.json();
      const deleteResult = await deleteUsers(ids);
      return json(deleteResult);

    default:
      return json({ error: "Method not allowed" }, { status: 405 });
  }
};
```

### 인증 미들웨어

```typescript
// app/utils/auth.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return userId;
}
```
