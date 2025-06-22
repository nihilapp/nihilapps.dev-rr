# 블로그 매니지먼트 시스템 - 라우트 구조 체크리스트 (React Router v7)

본 문서는 멀티 블로그 매니지먼트 시스템의 React Router v7 파일 기반 라우팅 구조 개발 체크리스트입니다.

---

## 🏗️ 레이아웃 구조 개요

프로젝트는 4가지 독립적인 레이아웃으로 구성됩니다:

| 레이아웃          | 파일 패턴             | 설명                            |
| ----------------- | --------------------- | ------------------------------- |
| **메인 플랫폼**   | `_index`              | 레이아웃 없음 - 플랫폼 홈페이지 |
| **시스템 어드민** | `admin.*`             | 전체 블로그 통합 관리           |
| **개별 블로그**   | `blogs.$slug.*`       | 각 블로그의 공개 페이지         |
| **블로그 어드민** | `blogs.$slug.admin.*` | 각 블로그의 관리 페이지         |

---

## 🏠 메인 플랫폼 (레이아웃 없음)

**플랫폼 홈페이지 - 전체 블로그 목록 및 소개**

### 플랫폼 페이지

- [ ] `_index.tsx` - 플랫폼 홈 (전체 블로그 목록, 최신 포스트)

### 인증 페이지

- [ ] `auth/signin.tsx` - 시스템 로그인
- [ ] `auth/signup.tsx` - 시스템 회원가입(개발 환경에서만 노출/버튼도 마찬가지)

---

## ⚙️ 시스템 어드민 레이아웃 (`admin.*`)

**전체 블로그 통합 관리 (슈퍼 어드민)**

### 레이아웃 파일

- [ ] `admin.tsx` - 시스템 어드민 레이아웃 컴포넌트

### 대시보드

- [ ] `admin._index.tsx` - 전체 시스템 대시보드
- [ ] `admin.analytics.tsx` - 전체 통계 및 분석

### 블로그 관리

- [ ] `admin.blogs._index.tsx` - 내 블로그 목록 관리
- [ ] `admin.blogs.new.tsx` - 새 블로그 생성
- [ ] `admin.blogs.$id.edit.tsx` - 블로그 설정 수정

### 통합 컨텐츠 관리

- [ ] `admin.posts._index.tsx` - 전체 블로그 포스트 통합 관리
- [ ] `admin.posts.$id.edit.tsx` - 포스트 수정 (어느 블로그든)
- [ ] `admin.categories.tsx` - 전체 블로그 카테고리 통합 관리
- [ ] `admin.hashtags.tsx` - 전체 블로그 해시태그 통합 관리
- [ ] `admin.comments.tsx` - 전체 블로그 댓글 통합 관리

### 시스템 관리

- [ ] `admin.users.tsx` - 사용자 관리
- [ ] `admin.images.tsx` - 전체 이미지 갤러리
- [ ] `admin.email-logs.tsx` - 이메일 발송 로그
- [ ] `admin.settings.tsx` - 시스템 설정
- [ ] `admin.backup.tsx` - 백업 및 복원

---

## 📝 개별 블로그 레이아웃 (`blogs.$slug.*`)

**각 블로그의 공개 페이지**

### 레이아웃 파일

- [ ] `blogs.$slug.tsx` - 개별 블로그 레이아웃 컴포넌트

### 블로그 공개 페이지

- [ ] `blogs.$slug._index.tsx` - 개별 블로그 홈
- [ ] `blogs.$slug.posts._index.tsx` - 해당 블로그 포스트 목록
- [ ] `blogs.$slug.posts.$postSlug.tsx` - 해당 블로그 포스트 상세
- [ ] `blogs.$slug.categories._index.tsx` - 해당 블로그 카테고리 목록
- [ ] `blogs.$slug.categories.$categorySlug.tsx` - 해당 블로그 카테고리별 포스트
- [ ] `blogs.$slug.hashtags._index.tsx` - 해당 블로그 해시태그 목록
- [ ] `blogs.$slug.hashtags.$hashtagName.tsx` - 해당 블로그 해시태그별 포스트
- [ ] `blogs.$slug.search.tsx` - 해당 블로그 검색
- [ ] `blogs.$slug.about.tsx` - 해당 블로그 소개

---

## 🔧 개별 블로그 어드민 레이아웃 (`blogs.$slug.admin.*`)

**각 블로그의 관리 페이지**

### 레이아웃 파일

- [ ] `blogs.$slug.admin.tsx` - 개별 블로그 어드민 레이아웃 컴포넌트

### 블로그 대시보드

- [ ] `blogs.$slug.admin._index.tsx` - 해당 블로그 대시보드
- [ ] `blogs.$slug.admin.analytics.tsx` - 해당 블로그 통계

### 포스트 관리

- [ ] `blogs.$slug.admin.posts._index.tsx` - 해당 블로그 포스트 관리
- [ ] `blogs.$slug.admin.posts.new.tsx` - 해당 블로그 새 포스트 작성
- [ ] `blogs.$slug.admin.posts.$id.edit.tsx` - 해당 블로그 포스트 수정
- [ ] `blogs.$slug.admin.posts.drafts.tsx` - 해당 블로그 임시저장 목록

### 컨텐츠 관리

- [ ] `blogs.$slug.admin.categories.tsx` - 해당 블로그 카테고리 관리
- [ ] `blogs.$slug.admin.hashtags.tsx` - 해당 블로그 해시태그 관리
- [ ] `blogs.$slug.admin.comments.tsx` - 해당 블로그 댓글 관리

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
