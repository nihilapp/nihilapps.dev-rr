# 블로그 매니지먼트 시스템 - 라우트 구조 체크리스트 (React Router v7)

본 문서는 멀티 블로그 매니지먼트 시스템의 React Router v7 파일 기반 라우팅 구조 개발 체크리스트입니다.

---

## 🏗️ 레이아웃 구조 개요

프로젝트는 4가지 독립적인 레이아웃으로 구성되며, 강력한 인증 계층이 존재합니다.

| 레이아웃          | 파일 패턴             | 설명                               |
| ----------------- | --------------------- | ---------------------------------- |
| **메인 플랫폼**   | `_index`              | 레이아웃 없음 - 플랫폼 홈페이지    |
| **인증**          | `_auth.*`             | 로그인, 회원가입, 보안 인증 페이지 |
| **시스템 어드민** | `admin.*`             | **(보안)** 전체 블로그 통합 관리   |
| **개별 블로그**   | `blogs.$slug.*`       | 각 블로그의 공개 페이지            |
| **블로그 어드민** | `blogs.$slug.admin.*` | **(보안)** 각 블로그의 관리 페이지 |

---

## 🏠 메인 플랫폼 (레이아웃 없음)

**플랫폼 홈페이지 - 전체 블로그 목록 및 소개**

- [ ] `_index.tsx` - 플랫폼 홈 (전체 블로그 목록, 최신 포스트)
- [ ] `privacy.tsx` - 개인정보처리방침
- [ ] `terms.tsx` - 이용약관

---

## 🔐 인증 레이아웃 (`_auth.*`)

**로그인, 회원가입, 비밀번호 재설정 등은 Supabase Auth로 처리**
**패스코드/OTP 단계는 직접 구현(웹 접근 보안용)**

### 레이아웃 파일

- [ ] `auth.tsx` - 인증 관련 페이지들의 공통 레이아웃

### 인증 페이지

- [ ] `auth.signin.tsx` - Supabase Auth로 로그인, 성공 시 `/auth/shield`로 이동
- [ ] `auth.shield.tsx` - (직접 구현) 1단계 보안: 패스코드 인증
- [ ] `auth.otp.tsx` - (직접 구현) 2단계 보안: 2FA/OTP 인증
- [ ] `auth.signup.tsx` - Supabase Auth로 회원가입
- [ ] `auth.signout.tsx` - Supabase Auth로 로그아웃
- [ ] `auth.otp-create.tsx` - (직접 구현) OTP 생성/설정
- [ ] `auth.forgot-password.tsx` - Supabase Auth로 비밀번호 재설정 요청
- [ ] `auth.reset-password.tsx` - Supabase Auth로 비밀번호 재설정

---

## ⚙️ 시스템 어드민 레이아웃 (`admin.*`)

**전체 블로그 통합 관리 (슈퍼 어드민)**

### 레이아웃 파일

- [x] `admin.tsx` - **(중요)** 시스템 어드민의 **보안 게이트웨이**. 모든 `/admin/*` 접근 시도 시, 로그인 여부, 패스코드, OTP 인증 상태를 중앙에서 확인하고, 미통과 시 적절한 인증 페이지로 리다이렉트.

### 대시보드

- [x] `admin._index.tsx` - 전체 시스템 대시보드
- [ ] `admin.analytics.tsx` - 전체 통계 및 분석

### 통합 컨텐츠 관리

- [x] `admin.posts.tsx` - 전체 블로그 포스트 통합 관리
- [ ] `admin.posts.trash.tsx` - 포스트 휴지통
- [x] `admin.categories.tsx` - 전체 블로그 카테고리 통합 관리
- [x] `admin.tags.tsx` - 전체 블로그 해시태그 통합 관리
- [x] `admin.comments.tsx` - 전체 블로그 댓글 통합 관리
- [ ] `admin.comments.trash.tsx` - 댓글 휴지통

### 시스템 관리

- [x] `admin.blogs.tsx` - 블로그 관리 (기본 구조만)
- [ ] `admin.blogs.trash.tsx` - 블로그 휴지통
- [ ] `admin.users.tsx` - 사용자 관리
- [ ] `admin.images.tsx` - 전체 이미지 갤러리
- [ ] `admin.settings.tsx` - 시스템 설정

---

## 📝 개별 블로그 레이아웃 (`blogs.$slug.*`)

**각 블로그의 공개 페이지**

### 레이아웃 파일

- [ ] `blogs.$slug.tsx` - 개별 블로그 레이아웃 컴포넌트

### 블로그 공개 페이지

- [ ] `blogs.$slug._index.tsx` - 개별 블로그 홈
- [ ] `blogs.$slug.posts._index.tsx` - 해당 블로그 포스트 목록
- [ ] `blogs.$slug.posts.$postSlug.tsx` - 해당 블로그 포스트 상세
- [ ] `blogs.$slug.categories.$categorySlug.tsx` - 해당 블로그 카테고리별 포스트
- [ ] `blogs.$slug.search.tsx` - 해당 블로그 검색

---

## 🔧 개별 블로그 어드민 레이아웃 (`blogs.$slug.admin.*`)

**각 블로그의 관리 페이지**

### 레이아웃 파일

- [ ] `blogs.$slug.admin.tsx` - **(중요)** 개별 블로그 어드민의 **보안 게이트웨이**. 모든 `/blogs/$slug/admin/*` 접근 시도 시, 해당 블로그에 대한 관리자 권한을 확인.

### 블로그 대시보드

- [ ] `blogs.$slug.admin._index.tsx` - 해당 블로그 대시보드

### 포스트 관리

- [ ] `blogs.$slug.admin.posts._index.tsx` - 해당 블로그 포스트 관리
- [ ] `blogs.$slug.admin.posts.trash.tsx` - 해당 블로그 포스트 휴지통
- [ ] `blogs.$slug.admin.posts.new.tsx` - 해당 블로그 새 포스트 작성
- [ ] `blogs.$slug.admin.posts.$id.edit.tsx` - 해당 블로그 포스트 수정

### 컨텐츠 관리

- [ ] `blogs.$slug.admin.categories.tsx` - 해당 블로그 카테고리 관리
- [ ] `blogs.$slug.admin.hashtags.tsx` - 해당 블로그 해시태그 관리
- [ ] `blogs.$slug.admin.comments.tsx` - 해당 블로그 댓글 관리
- [ ] `blogs.$slug.admin.comments.trash.tsx` - 해당 블로그 댓글 휴지통

### 블로그 설정

- [ ] `blogs.$slug.admin.settings.tsx` - 해당 블로그 설정
- [ ] `blogs.$slug.admin.images.tsx` - 해당 블로그 이미지 갤러리

---

## 🔄 레이아웃 구조 시각화

```
app/routes/
├── _index.tsx (플랫폼 홈 - 레이아웃 없음)
├── signin.tsx, signup.tsx (인증 - 레이아웃 없음)
├── admin.tsx (시스템 어드민 레이아웃)
│   ├── admin._index.tsx
│   ├── admin.blogs._index.tsx, admin.posts._index.tsx
│   └── admin.settings.tsx, admin.backup.tsx
├── blogs.$slug.tsx (개별 블로그 레이아웃)
│   ├── blogs.$slug._index.tsx
│   ├── blogs.$slug.posts.$postSlug.tsx
│   └── blogs.$slug.categories.$categorySlug.tsx
└── blogs.$slug.admin.tsx (개별 블로그 어드민 레이아웃)
    ├── blogs.$slug.admin._index.tsx
    ├── blogs.$slug.admin.posts.new.tsx
    └── blogs.$slug.admin.settings.tsx
```

---

## 📌 React Router v7 레이아웃 규칙

### 레이아웃 파일

각 레이아웃은 해당 패턴의 최상위 파일이 레이아웃을 담당합니다:

- `admin.tsx` → `/admin/*` 모든 하위 라우트의 레이아웃
- `blogs.$slug.tsx` → `/blogs/[slug]/*` 하위 라우트의 레이아웃
- `blogs.$slug.admin.tsx` → `/blogs/[slug]/admin/*` 하위 라우트의 레이아웃

### 인덱스 라우트

각 레이아웃 내의 기본 페이지는 `_index.tsx`로 명명:

- `admin._index.tsx` → `/admin` (어드민 대시보드)
- `blogs.$slug._index.tsx` → `/blogs/[slug]` (블로그 홈)
- `blogs.$slug.admin._index.tsx` → `/blogs/[slug]/admin` (블로그 어드민 대시보드)

### 중첩 구조

점(.) 구분자로 중첩 라우트를 생성:

- `admin.posts._index.tsx` → `/admin/posts`
- `blogs.$slug.posts.$postSlug.tsx` → `/blogs/[slug]/posts/[postSlug]`
- `blogs.$slug.admin.posts.new.tsx` → `/blogs/[slug]/admin/posts/new`

---

## 📊 구현 현황

### 완료된 라우트 ✅

- [x] `admin._index.tsx` - 어드민 대시보드 (기본 구조만)
- [x] `admin.blogs.tsx` - 블로그 관리 (기본 구조만)
- [x] `admin.posts.tsx` - 포스트 관리 (기본 구조만)
- [x] `admin.categories.tsx` - 카테고리 관리 (기본 구조만)
- [x] `admin.tags.tsx` - 태그 관리 (기본 구조만)
- [x] `admin.comments.tsx` - 댓글 관리 (기본 구조만)
- [x] `blogs.$slug._index.tsx` - 개별 블로그 홈 (기본 구조만)

### 우선 개발 필요 🎯

**레이아웃 파일 생성:**

- [ ] `admin.tsx` - 시스템 어드민 레이아웃
- [ ] `blogs.$slug.tsx` - 개별 블로그 레이아웃
- [ ] `blogs.$slug.admin.tsx` - 블로그 어드민 레이아웃

**핵심 페이지:**

- [ ] `_index.tsx` - 플랫폼 메인 홈페이지
- [ ] `signin.tsx`, `signup.tsx` - 인증 페이지
- [ ] `blogs.$slug.posts.$postSlug.tsx` - 포스트 상세 페이지
- [ ] `blogs.$slug.admin.posts.new.tsx` - 포스트 작성 페이지

### 총 라우트 개수

- **레이아웃 파일**: 4개 (0개 완료)
- **페이지 라우트**: 47개 (7개 완료)
- **전체**: 51개 (7개 완료, 13.7%)
