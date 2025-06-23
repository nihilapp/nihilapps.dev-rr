# 페이지별 기능 개발 체크리스트 (React Router v7)

본 문서는 각 페이지(라우트)가 어떤 데이터 로딩(`loader`)과 상태 변경(`action`) 기능을 책임져야 하는지 정의하는 체크리스트입니다. API를 위한 별도 라우트 대신, 페이지 중심의 데이터 흐름을 따릅니다.

---

## 🔑 인증 (Auth)

### `app/_routes/auth.signin.tsx`

- **`action`**
  - [ ] **POST** `_action: 'signInWithEmail'` - 이메일/비밀번호 검증. 성공 시, 바로 어드민 페이지로 보내는 것이 아니라, **`/auth/shield`로 리다이렉트**하여 1단계 보안 절차를 시작.
  - [ ] **POST** `_action: 'signInWithProvider'` - 소셜 로그인 처리. 성공 시 마찬가지로 `/auth/shield`로 리다이렉트.

### `app/_routes/auth.shield.tsx` (1단계: 패스코드)

- **`loader`**

  - [ ] 페이지 접근 시, 40자리의 암호학적으로 안전한 패스코드를 생성.
  - [ ] 생성된 패스코드의 해시(hash) 값과 1분의 만료 시간을 세션에 저장.
  - [ ] 원본 패스코드를 관리자 이메일로 발송.

- **`action`**
  - [ ] **POST** - 사용자가 제출한 패스코드가 세션의 해시 값과 일치하는지, 그리고 1분 안에 제출되었는지 검증.
  - [ ] 성공 시: 세션에 `shieldPassedAt` 타임스탬프를 기록하고, 다음 단계인 **`/auth/otp`로 리다이렉트**.
  - [ ] 실패 시: 세션의 패스코드 정보를 파기하고, **메인 페이지(`/`)로 리다이렉트**.

### `app/_routes/auth.otp.tsx` (2단계: 2FA/OTP)

- **`loader`**

  - [ ] `shield`를 통과했는지 확인. 통과하지 않았다면 `/auth/shield`로 리다이렉트.

- **`action`**
  - [ ] **POST** - 사용자가 제출한 OTP 코드가 유효한지 검증.
  - [ ] 성공 시: 세션에 `otpPassedAt` 타임스탬프를 기록하고, 원래 목적지였던 **어드민 페이지 또는 `/admin`으로 리다이렉트**.
  - [ ] 실패 시: 에러 메시지를 표시.

### `app/_routes/auth.signup.tsx`

- **`loader`**

  - [ ] **(중요)** `admin.tsx`의 `loader`와 동일하게, `shield`와 `otp` 인증을 모두 통과했는지 확인. 하나라도 통과하지 못했다면 해당 인증 단계로 리다이렉트.

- **`action`**
  - [ ] **POST** `_action: 'signUp'` - 이메일, 사용자명, 비밀번호로 새 계정을 생성합니다.

### `app/_routes/auth.logout.tsx` (Action 전용 라우트)

- **`action`**
  - [ ] **POST** - 세션을 파기하고 사용자를 로그아웃시킨 후 홈페이지로 리다이렉트합니다.

---

## ⚙️ 시스템 어드민 (`/admin/*`)

### `app/_routes/admin.tsx` (시스템 어드민 레이아웃 - 보안 게이트웨이)

- **`loader`**
  - [ ] **(중요)** 모든 `/admin/*` 경로에 대한 접근을 통제하는 중앙 관문.
  - [ ] **1. 로그인 확인**: 세션에 `userId`가 없으면 `/auth/signin`으로 리다이렉트.
  - [ ] **2. 패스코드(Shield) 확인**: 세션에 유효한 `shieldPassedAt` 타임스탬프(예: 24시간 이내)가 없으면 `/auth/shield`로 리다이렉트.
  - [ ] **3. OTP 확인**: 세션에 유효한 `otpPassedAt` 타임스탬프가 없으면 `/auth/otp`로 리다이렉트.
  - [ ] **4. 권한 확인**: 모든 인증 통과 후, 사용자가 어드민 권한(SUPER_ADMIN, ADMIN)을 가졌는지 최종 확인. 권한 없으면 에러 페이지 표시.
  - [ ] 모든 관문을 통과하면, 레이아웃에 필요한 기본 데이터(사이드바 메뉴 등)를 조회하여 반환.

### `app/_routes/admin._index.tsx` (대시보드)

- **`loader`**
  - [ ] 플랫폼 전체 현황을 볼 수 있는 통계 데이터를 조회합니다. (총 블로그, 포스트, 사용자, 댓글 수 등)
  - [ ] 최근 활동 로그를 조회합니다.

### `app/_routes/admin.users.tsx` (사용자 관리)

- **`loader`**
  - [ ] 전체 사용자 목록을 페이지네이션과 함께 조회합니다.
  - [ ] 검색 쿼리(이름, 이메일) 및 역할(Role)에 따른 필터링 기능을 제공합니다.
- **`action`**
  - [ ] **POST** `_action: 'createUser'` - 새 사용자를 생성합니다.
  - [ ] **PATCH** `_action: 'updateUser'` - 특정 사용자 정보를 수정합니다.
  - [ ] **PATCH** `_action: 'updateUserPassword'` - 특정 사용자 비밀번호를 강제로 변경합니다.
  - [ ] **PATCH** `_action: 'updateUserRole'` - 특정 사용자 역할을 변경합니다.
  - [ ] **DELETE** `_action: 'deleteUser'` - 특정 사용자를 삭제합니다.
  - [ ] **POST** `_action: 'deleteMultipleUsers'` - 여러 사용자를 일괄 삭제합니다.

### `app/_routes/admin.blogs._index.tsx` (블로그 관리)

- **`loader`**
  - [ ] 전체 블로그 목록을 페이지네이션 및 검색 기능과 함께 조회합니다.
- **`action`**
  - [ ] **DELETE** `_action: 'deleteBlog'` - 특정 블로그를 삭제합니다.
  - [ ] **PATCH** `_action: 'updateBlogStatus'` - 블로그 활성화/비활성화 상태를 변경합니다.
  - [ ] **PATCH** `_action: 'updateBlogVisibility'` - 블로그 공개/비공개 상태를 변경합니다.

### `app/_routes/admin.blogs.new.tsx` (새 블로그 생성)

- **`action`**
  - [ ] **POST** - 새 블로그를 생성합니다. (요청: `name`, `title`, `description`, `slug`, `theme`, `settings`)

### `app/_routes/admin.blogs.$id.edit.tsx` (블로그 설정 수정)

- **`loader`**
  - [ ] 수정할 특정 블로그의 상세 정보를 조회합니다.
- **`action`**
  - [ ] **PUT** `_action: 'updateBlog'` - 블로그 기본 정보를 수정합니다.

### `app/_routes/admin.posts._index.tsx` (통합 포스트 관리)

- **`loader`**
  - [ ] 모든 블로그의 포스트 목록을 페이지네이션, 검색, 필터링(블로그별, 카테고리별) 기능과 함께 조회합니다.
- **`action`**
  - [ ] **DELETE** `_action: 'deletePost'` - 특정 포스트를 삭제합니다.
  - [ ] **PATCH** `_action: 'updatePostStatus'` - 특정 포스트의 공개 상태를 변경합니다.
  - [ ] **POST** `_action: 'batchDeletePosts'` - 여러 포스트를 일괄 삭제합니다.
  - [ ] **POST** `_action: 'batchUpdateStatus'` - 여러 포스트의 상태를 일괄 변경합니다.

### `app/_routes/admin.categories.tsx` (통합 카테고리 관리)

- **`loader`**
  - [ ] 모든 블로그의 카테고리를 계층 구조 또는 평면 목록으로 조회합니다.
- **`action`**
  - [ ] **POST** `_action: 'createCategory'` - 새 카테고리를 생성합니다.
  - [ ] **PUT** `_action: 'updateCategory'` - 카테고리 정보를 수정합니다.
  - [ ] **PATCH** `_action: 'updateCategoryOrder'` - 카테고리 순서를 변경합니다.
  - [ ] **DELETE** `_action: 'deleteCategory'` - 카테고리를 삭제합니다.

### `app/_routes/admin.hashtags.tsx` (통합 해시태그 관리)

- **`loader`**
  - [ ] 모든 블로그의 해시태그 목록과 각 태그가 사용된 횟수를 조회합니다.
- **`action`**
  - [ ] **POST** `_action: 'createHashtag'` - 새 해시태그를 생성합니다.
  - [ ] **PUT** `_action: 'updateHashtag'` - 해시태그 이름을 수정합니다.
  - [ ] **DELETE** `_action: 'deleteHashtag'` - 해시태그를 삭제합니다.

### `app/_routes/admin.comments.tsx` (통합 댓글 관리)

- **`loader`**
  - [ ] 모든 블로그의 댓글 목록을 페이지네이션 및 검색 기능과 함께 조회합니다.
- **`action`**
  - [ ] **PATCH** `_action: 'approveComment'` - 댓글을 승인/비승인 처리합니다.
  - [ ] **DELETE** `_action: 'deleteComment'` - 댓글을 삭제합니다.

---

## 📝 개별 블로그 공개 페이지 (`/blogs/$slug/*`)

### `app/_routes/blogs.$slug.tsx` (블로그 레이아웃)

- **`loader`**
  - [ ] `slug`에 해당하는 블로그의 기본 정보(이름, 테마, 설정) 및 네비게이션(카테고리 목록 등)을 조회합니다.
  - [ ] 블로그가 없거나 비공개/비활성 상태이고 권한이 없으면 404를 반환합니다.

### `app/_routes/blogs.$slug._index.tsx` (블로그 홈)

- **`loader`**
  - [ ] 해당 블로그의 최신 포스트 목록을 조회합니다.
  - [ ] 공지사항이나 대표 포스트가 있다면 함께 조회합니다.

### `app/_routes/blogs.$slug.posts.$postSlug.tsx` (포스트 상세 페이지)

- **`loader`**
  - [ ] `postSlug`에 해당하는 포스트의 상세 내용을 조회합니다.
  - [ ] 포스트 조회수를 1 증가시킵니다. (중복 방지 로직 포함)
  - [ ] 해당 포스트의 댓글 목록을 조회합니다.
  - [ ] 현재 사용자의 좋아요 여부를 확인합니다.
- **`action`**
  - [ ] **POST** `_action: 'createComment'` - 방문자가 댓글을 작성합니다.
  - [ ] **POST** `_action: 'deleteComment'` - 방문자가 비밀번호 검증 후 자신의 댓글을 삭제합니다.
  - [ ] **POST** `_action: 'toggleLike'` - 사용자가 포스트에 좋아요를 누르거나 취소합니다.

### `app/_routes/blogs.$slug.categories.$categorySlug.tsx` (카테고리별 포스트 목록)

- **`loader`**
  - [ ] `categorySlug`에 해당하는 카테고리 정보와 해당 카테고리에 속한 포스트 목록을 조회합니다.

---

## 🔧 개별 블로그 어드민 (`/blogs/$slug/admin/*`)

### `app/_routes/blogs.$slug.admin.tsx` (블로그 어드민 레이아웃)

- **`loader`**
  - [ ] 현재 사용자가 해당 블로그(`$slug`)의 관리자(소유자 또는 편집자)인지 확인합니다.
  - [ ] 권한이 없으면 404 또는 403 페이지를 표시합니다.
  - [ ] 블로그 어드민용 사이드바 메뉴 정보를 조회합니다.

### `app/_routes/blogs.$slug.admin._index.tsx` (블로그 대시보드)

- **`loader`**
  - [ ] 해당 블로그의 통계 데이터(조회수, 방문자 수, 인기 포스트 등)를 조회합니다.

### `app/_routes/blogs.$slug.admin.posts._index.tsx` (포스트 관리)

- **`loader`**
  - [ ] 해당 블로그의 포스트 목록을 페이지네이션 및 검색 기능과 함께 조회합니다.
- **`action`**
  - [ ] **PATCH** `_action: 'updatePostStatus'` - 포스트의 공개/비공개 상태를 변경합니다.
  - [ ] **DELETE** `_action: 'deletePost'` - 포스트를 삭제합니다.

### `app/_routes/blogs.$slug.admin.posts.new.tsx` (새 포스트 작성)

- **`loader`**
  - [ ] 포스트 작성에 필요한 기본 데이터(카테고리, 해시태그 목록 등)를 조회합니다.
- **`action`**
  - [ ] **POST** `_action: 'createPost'` - 새 포스트를 생성합니다.
  - [ ] **PUT** `_action: 'saveDraft'` - 포스트를 임시 저장합니다.
  - [ ] **PUT** `_action: 'autosave'` - 포스트를 주기적으로 자동 저장합니다.

### `app/_routes/blogs.$slug.admin.posts.$id.edit.tsx` (포스트 수정)

- **`loader`**
  - [ ] 수정할 포스트의 상세 정보와 포스트 작성에 필요한 기본 데이터를 조회합니다.
- **`action`**
  - [ ] **PUT** `_action: 'updatePost'` - 포스트 내용을 수정합니다.
  - [ ] **PUT** `_action: 'saveDraft'` - 수정 중인 포스트를 임시 저장합니다.
  - [ ] **PUT** `_action: 'autosave'` - 수정 중인 포스트를 자동 저장합니다.

### `app/_routes/blogs.$slug.admin.categories.tsx` (카테고리 관리)

- **`loader`**
  - [ ] 해당 블로그의 카테고리 목록을 계층 구조로 조회합니다.
- **`action`**
  - [ ] **POST** `_action: 'createCategory'` - 새 카테고리를 생성합니다.
  - [ ] **PUT** `_action: 'updateCategory'` - 카테고리 정보를 수정합니다.
  - [ ] **PATCH** `_action: 'updateCategoryOrder'` - 카테고리 순서를 변경합니다.
  - [ ] **DELETE** `_action: 'deleteCategory'` - 카테고리를 삭제합니다.

### `app/_routes/blogs.$slug.admin.images.tsx` (이미지 갤러리)

- **`loader`**
  - [ ] 해당 블로그에 업로드된 이미지 목록을 조회합니다.
- **`action`**
  - [ ] **POST** `_action: 'uploadImage'` - 새 이미지를 업로드합니다.
  - [ ] **PATCH** `_action: 'updateImageMeta'` - 이미지 메타데이터(alt 태그 등)를 수정합니다.
  - [ ] **DELETE** `_action: 'deleteImage'` - 이미지를 삭제합니다.
  - [ ] **POST** `_action: 'batchDeleteImages'` - 여러 이미지를 일괄 삭제합니다.
