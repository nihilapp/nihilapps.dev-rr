# UI 개발 체크 리스트 (Remix 버전 - 5개 레이아웃)

본 문서는 블로그 매니지먼트 시스템(멀티 블로그) 프로젝트의 UI 구현 항목을 자원(도메인)별로 분류하여 정리한 체크리스트입니다. 5가지 독립적인 레이아웃을 사용합니다.

---

## 🏗️ 레이아웃 구조 개요

| 경로 패턴              | 레이아웃                    | 설명                    |
| ---------------------- | --------------------------- | ----------------------- |
| `/`                    | 레이아웃 없음               | 멀티 블로그 플랫폼 홈   |
| `/auth/*`              | 인증 레이아웃               | 로그인/회원가입 페이지  |
| `/admin/*`             | 플랫폼 어드민 레이아웃      | 멀티 블로그 시스템 관리 |
| `/blog/<slug>/*`       | 개별 블로그 레이아웃        | 각 블로그의 공개 페이지 |
| `/blog/<slug>/admin/*` | 개별 블로그 어드민 레이아웃 | 각 블로그의 관리 페이지 |

---

## 🌐 플랫폼 홈 UI (No Layout)

### 1. 플랫폼 홈 페이지

- [ ] 플랫폼 홈페이지 (`app/routes/_index.tsx`) - 레이아웃 없음
- [ ] 전체 블로그 목록 컴포넌트 (내부 컴포넌트)
- [ ] 최신 포스트 피드 컴포넌트 (모든 블로그, 내부 컴포넌트)
- [ ] 블로그 검색 컴포넌트 (내부 컴포넌트)
- [ ] 플랫폼 통계 위젯 (블로그 수, 총 포스트 수, 내부 컴포넌트)
- [ ] 인기 블로그 위젯 (조회수, 포스트 수 기준, 내부 컴포넌트)
- [ ] 카테고리별 블로그 필터 (내부 컴포넌트)
- [ ] 전체 포스트 목록 페이지 (`app/routes/posts._index.tsx`)
- [ ] 전체 포스트 검색 페이지 (`app/routes/search.tsx`)
- [ ] 플랫폼 소개 페이지 (`app/routes/about.tsx`)

---

## 🔐 인증 UI (Auth Layout)

### 2. 인증 페이지

- [ ] 회원가입 페이지 (`app/routes/_auth.auth.signup.tsx`) - **(보안)** 접근 제어 필요
- [ ] 로그인 페이지 (`app/routes/_auth.auth.signin.tsx`)
- [ ] **(신규)** 보안 쉴드 페이지 (`app/routes/_auth.auth.shield.tsx`)
  - [ ] "이메일로 전송된 40자리 패스코드를 입력해주세요." 안내 문구
  - [ ] 패스코드 입력 필드 (단일 `<Input />`)
  - [ ] 1분 카운트다운 타이머 UI
  - [ ] 타임아웃 시 자동으로 홈페이지로 이동하는 로직
- [ ] **(신규)** 2단계 인증(OTP) 페이지 (`app/routes/_auth.auth.otp.tsx`)
  - [ ] "인증 앱에 표시된 6자리 코드를 입력해주세요." 안내 문구
  - [ ] OTP 코드 입력 필드 (6자리)
- [ ] 비밀번호 재설정 요청 페이지 (`app/routes/_auth.auth.forgot-password.tsx`)
- [ ] 비밀번호 재설정 페이지 (`app/routes/_auth.auth.reset-password.tsx`)
- [ ] 이메일 인증 페이지 (`app/routes/_auth.auth.verify-email.tsx`)
- [ ] 인증 폼 컴포넌트 (내부 컴포넌트)
- [ ] 소셜 로그인 버튼 (Google, GitHub 등, 내부 컴포넌트)
- [ ] 비밀번호 강도 표시기 (내부 컴포넌트)

---

## 📝 플랫폼 어드민 UI (Platform Admin Layout)

### 3. 플랫폼 어드민 대시보드

- [ ] 플랫폼 어드민 대시보드 (`app/routes/_platform-admin._index.tsx`)
- [ ] 전체 통계 위젯 (블로그 수, 사용자 수, 포스트 수, 내부 컴포넌트)
- [ ] 최근 활동 위젯 (새 블로그, 새 포스트, 내부 컴포넌트)
- [ ] 시스템 상태 위젯 (서버 상태, 내부 컴포넌트)
- [ ] 인기 블로그 차트 (내부 컴포넌트)

### 4. 플랫폼 사용자 관리

- [ ] 관리자 목록 페이지 (`app/routes/_platform-admin.users._index.tsx`)
- [ ] 관리자 상세 페이지 (`app/routes/_platform-admin.users.$id.tsx`)
- [ ] 관리자 생성 페이지 (`app/routes/_platform-admin.users.new.tsx`)
- [ ] 관리자 수정 페이지 (`app/routes/_platform-admin.users.$id.edit.tsx`)
- [ ] 관리자 생성 모달 (내부 컴포넌트)
- [ ] 관리자 수정 모달 (내부 컴포넌트)
- [ ] 관리자 삭제 확인 모달 (내부 컴포넌트)
- [ ] 관리자 일괄 삭제 UI (내부 컴포넌트)
- [ ] 관리자 검색 및 필터 (이메일, 사용자명, 권한별, 내부 컴포넌트)
- [ ] 관리자 권한 관리 UI (내부 컴포넌트)
- [ ] 관리자 상태 표시 UI (활성/비활성, 내부 컴포넌트)
- [ ] 관리자 프로필 이미지 업로드 UI (내부 컴포넌트)
- [ ] 비밀번호 변경 모달 (내부 컴포넌트)

### 5. 플랫폼 블로그 관리

- [ ] 플랫폼 블로그 목록 페이지 (`app/routes/_platform-admin.blogs._index.tsx`)
- [ ] 플랫폼 블로그 생성 페이지 (`app/routes/_platform-admin.blogs.new.tsx`)
- [ ] 플랫폼 블로그 상세 페이지 (`app/routes/_platform-admin.blogs.$slug._index.tsx`)
- [ ] 플랫폼 블로그 수정 페이지 (`app/routes/_platform-admin.blogs.$slug.edit.tsx`)
- [ ] 블로그 상태 관리 UI (활성화/비활성화, 내부 컴포넌트)
- [ ] 블로그 소유자 변경 UI (내부 컴포넌트)
- [ ] 블로그 통계 위젯 (포스트 수, 조회수, 내부 컴포넌트)
- [ ] 블로그 검색 및 필터링 (소유자, 상태별, 내부 컴포넌트)
- [ ] 블로그 테마 관리 UI (내부 컴포넌트)
- [ ] 블로그 카드 컴포넌트 (관리자용, 내부 컴포넌트)

### 6. 플랫폼 전체 포스트 관리

- [ ] 플랫폼 전체 포스트 목록 (`app/routes/_platform-admin.posts._index.tsx`)
- [ ] 플랫폼 전체 포스트 상세 (`app/routes/_platform-admin.posts.$id.tsx`)
- [ ] 포스트 검색 컴포넌트 (제목, 내용, 블로그별, 내부 컴포넌트)
- [ ] 포스트 필터링 UI (블로그별, 상태별, 카테고리별, 내부 컴포넌트)
- [ ] 포스트 일괄 관리 UI (승인, 거부, 삭제, 내부 컴포넌트)
- [ ] 포스트 상태 변경 UI (내부 컴포넌트)
- [ ] 신고된 포스트 관리 UI (내부 컴포넌트)

### 7. 플랫폼 전체 댓글 관리

- [ ] 플랫폼 댓글 관리 페이지 (`app/routes/_platform-admin.comments._index.tsx`)
- [ ] 댓글 목록 컴포넌트 (블로그별 그룹, 내부 컴포넌트)
- [ ] 댓글 검색 및 필터링 (블로그별, 상태별, 내부 컴포넌트)
- [ ] 댓글 승인/거부 UI (일괄 처리 포함, 내부 컴포넌트)
- [ ] 스팸 댓글 관리 UI (내부 컴포넌트)
- [ ] 신고된 댓글 관리 UI (내부 컴포넌트)

### 8. 플랫폼 시스템 설정

- [ ] 시스템 설정 페이지 (`app/routes/_platform-admin.settings._index.tsx`)
- [ ] 이메일 설정 페이지 (`app/routes/_platform-admin.settings.email.tsx`)
- [ ] 보안 설정 페이지 (`app/routes/_platform-admin.settings.security.tsx`)
- [ ] 백업 관리 페이지 (`app/routes/_platform-admin.settings.backup.tsx`)

---

## 🎨 개별 블로그 공개 UI (Blog Layout)

### 9. 개별 블로그 홈

- [ ] 개별 블로그 홈페이지 (`app/routes/blog.$slug._index.tsx`)
- [ ] 블로그 소개 섹션 (내부 컴포넌트)
- [ ] 최신 포스트 목록 (내부 컴포넌트)
- [ ] 카테고리 네비게이션 (내부 컴포넌트)
- [ ] 블로그 사이드바 (내부 컴포넌트)
- [ ] 블로그 검색 위젯 (내부 컴포넌트)

### 10. 개별 블로그 포스트

- [ ] 블로그 포스트 목록 페이지 (`app/routes/blog.$slug.posts._index.tsx`)
- [ ] 블로그 포스트 상세 페이지 (`app/routes/blog.$slug.posts.$postSlug.tsx`)
- [ ] 포스트 카드 컴포넌트 (공개용, 내부 컴포넌트)
- [ ] 포스트 네비게이션 (이전/다음, 내부 컴포넌트)
- [ ] 관련 포스트 추천 (내부 컴포넌트)
- [ ] 포스트 공유 버튼 (내부 컴포넌트)
- [ ] 조회수 표시 (내부 컴포넌트)

### 11. 개별 블로그 카테고리

- [ ] 블로그 카테고리 목록 페이지 (`app/routes/blog.$slug.categories._index.tsx`)
- [ ] 블로그 카테고리별 포스트 목록 (`app/routes/blog.$slug.categories.$categorySlug.tsx`)
- [ ] 카테고리 네비게이션 컴포넌트 (내부 컴포넌트)
- [ ] 하위 카테고리 표시 (내부 컴포넌트)

### 12. 개별 블로그 기타 페이지

- [ ] 블로그 해시태그별 포스트 목록 (`app/routes/blog.$slug.hashtags.$hashtagName.tsx`)
- [ ] 블로그 검색 페이지 (`app/routes/blog.$slug.search.tsx`)
- [ ] 블로그 소개 페이지 (`app/routes/blog.$slug.about.tsx`)
- [ ] 블로그 아카이브 페이지 (`app/routes/blog.$slug.archive.tsx`)

### 13. 개별 블로그 댓글 시스템

- [ ] 댓글 목록 컴포넌트 (공개 페이지용, 내부 컴포넌트)
- [ ] 댓글 작성 폼 (이메일, 닉네임, 비밀번호, 내용, 내부 컴포넌트)
- [ ] 댓글 답글 컴포넌트 (2단계 구조, 내부 컴포넌트)
- [ ] 댓글 수정/삭제 인증 모달 (내부 컴포넌트)
- [ ] 댓글 신고 기능 (내부 컴포넌트)

---

## 🛠️ 개별 블로그 어드민 UI (Blog Admin Layout)

### 14. 개별 블로그 어드민 대시보드

- [ ] 블로그 어드민 대시보드 (`app/routes/blog.$slug._blog-admin._index.tsx`)
- [ ] 블로그 통계 위젯 (포스트 수, 댓글 수, 조회수, 내부 컴포넌트)
- [ ] 최근 활동 위젯 (최신 포스트, 최신 댓글, 내부 컴포넌트)
- [ ] 인기 포스트 위젯 (내부 컴포넌트)
- [ ] 방문자 통계 차트 (내부 컴포넌트)

### 15. 개별 블로그 포스트 관리

- [ ] 블로그 포스트 목록 페이지 (`app/routes/blog.$slug._blog-admin.posts._index.tsx`)
- [ ] 블로그 포스트 작성 페이지 (`app/routes/blog.$slug._blog-admin.posts.new.tsx`)
- [ ] 블로그 포스트 수정 페이지 (`app/routes/blog.$slug._blog-admin.posts.$id.edit.tsx`)
- [ ] 블로그 포스트 상세 페이지 (`app/routes/blog.$slug._blog-admin.posts.$id._index.tsx`)
- [ ] 임시 저장 목록 페이지 (`app/routes/blog.$slug._blog-admin.posts.drafts.tsx`)
- [ ] 포스트 검색 컴포넌트 (블로그 내, 내부 컴포넌트)
- [ ] 포스트 필터링 UI (카테고리별, 상태별, 내부 컴포넌트)
- [ ] 포스트 상태 변경 UI (발행/임시저장/보관, 내부 컴포넌트)
- [ ] 일괄 작업 UI (체크박스, 툴바, 상태 변경, 삭제)
- [ ] 포스트 미리보기 모달 (내부 컴포넌트)
- [ ] 자동 저장 상태 표시 (내부 컴포넌트)

### 16. 개별 블로그 카테고리 관리

- [ ] 블로그 카테고리 관리 페이지 (`app/routes/blog.$slug._blog-admin.categories._index.tsx`)
- [ ] 카테고리 생성/수정 모달 (내부 컴포넌트)
- [ ] 계층형 카테고리 목록 컴포넌트 (트리 구조, 내부 컴포넌트)
- [ ] 카테고리 선택 드롭다운 (계층 표시, 내부 컴포넌트)
- [ ] 카테고리 순서 변경 UI (드래그 앤 드롭, 내부 컴포넌트)
- [ ] 카테고리 활성화/비활성화 토글 (내부 컴포넌트)
- [ ] 상위 카테고리 선택 UI (내부 컴포넌트)

### 17. 개별 블로그 해시태그 관리

- [ ] 블로그 해시태그 관리 페이지 (`app/routes/blog.$slug._blog-admin.hashtags._index.tsx`)
- [ ] 해시태그 입력 필드 (자동완성, 내부 컴포넌트)
- [ ] 해시태그 목록 컴포넌트 (사용 횟수 표시, 내부 컴포넌트)
- [ ] 해시태그 통계 UI (인기 태그, 내부 컴포넌트)
- [ ] 미사용 해시태그 정리 UI (내부 컴포넌트)

### 18. 개별 블로그 댓글 관리

- [ ] 블로그 댓글 관리 페이지 (`app/routes/blog.$slug._blog-admin.comments._index.tsx`)
- [ ] 댓글 목록 컴포넌트 (포스트별 그룹, 내부 컴포넌트)
- [ ] 댓글 승인/거부 UI (내부 컴포넌트)
- [ ] 댓글 답글 작성 UI (관리자 답글, 내부 컴포넌트)
- [ ] 댓글 일괄 작업 UI (승인, 거부, 삭제, 내부 컴포넌트)
- [ ] 스팸 댓글 필터링 UI (내부 컴포넌트)

### 19. 개별 블로그 미디어 관리

- [ ] 블로그 이미지 갤러리 페이지 (`app/routes/blog.$slug._blog-admin.media._index.tsx`)
- [ ] 이미지 업로드 모달 (내부 컴포넌트)
- [ ] 이미지 미리보기 컴포넌트 (내부 컴포넌트)
- [ ] 이미지 메타데이터 수정 UI (alt text, 제목, 내부 컴포넌트)
- [ ] 이미지 검색/필터링 (날짜, 크기별, 내부 컴포넌트)
- [ ] 이미지 일괄 삭제 UI (내부 컴포넌트)

### 20. 개별 블로그 설정

- [ ] 블로그 기본 설정 페이지 (`app/routes/blog.$slug._blog-admin.settings._index.tsx`)
- [ ] 블로그 테마 설정 페이지 (`app/routes/blog.$slug._blog-admin.settings.theme.tsx`)
- [ ] 블로그 SEO 설정 페이지 (`app/routes/blog.$slug._blog-admin.settings.seo.tsx`)
- [ ] 블로그 댓글 설정 페이지 (`app/routes/blog.$slug._blog-admin.settings.comments.tsx`)
- [ ] 테마 선택기 UI (내부 컴포넌트)
- [ ] 커스텀 CSS 에디터 (내부 컴포넌트)
- [ ] SEO 메타데이터 폼 (내부 컴포넌트)

---

## 🛠 공통 UI 컴포넌트

### 21. 마크다운 에디터 UI

- [ ] 마크다운 에디터 컴포넌트 (shadcn/ui 기반, 내부 컴포넌트)
- [ ] 실시간 프리뷰 기능 (분할 화면, 내부 컴포넌트)
- [ ] 미리보기 토글 버튼 (내부 컴포넌트)
- [ ] 탭 키 들여쓰기 기능 (스페이스 2칸, 내부 컴포넌트)
- [ ] 이미지 업로드 UI (드래그 앤 드롭, 내부 컴포넌트)
- [ ] 이미지 갤러리 모달 (내부 컴포넌트)
- [ ] 에디터 툴바 (볼드, 이탤릭, 링크 등, 내부 컴포넌트)
- [ ] 마크다운 렌더링 최적화 (내부 컴포넌트)
- [ ] 단축키 지원 (Ctrl+B, Ctrl+I 등, 내부 컴포넌트)

### 22. 공통 레이아웃 UI

- [ ] 인증 레이아웃 컴포넌트 (공통) - `app/components/layouts/AuthLayout.tsx`
- [ ] 플랫폼 어드민 레이아웃 컴포넌트 (공통) - `app/components/layouts/PlatformAdminLayout.tsx`
- [ ] 개별 블로그 레이아웃 컴포넌트 (테마별) - `app/components/layouts/BlogLayout.tsx`
- [ ] 개별 블로그 어드민 레이아웃 컴포넌트 (공통) - `app/components/layouts/BlogAdminLayout.tsx`
- [ ] 플랫폼 어드민 사이드바 컴포넌트 - `app/components/admin/PlatformSidebar.tsx`
- [ ] 블로그 어드민 사이드바 컴포넌트 - `app/components/admin/BlogSidebar.tsx`
- [ ] 브레드크럼 컴포넌트 (공통) - `app/components/common/Breadcrumb.tsx`
- [ ] 로딩 스켈레톤 UI (공통) - `app/components/common/LoadingSkeleton.tsx`

### 23. 공통 기능 UI

- [ ] 블로그 컨텍스트 프로바이더 - `app/contexts/BlogContext.tsx`
- [ ] 테마 컨텍스트 프로바이더 - `app/contexts/ThemeContext.tsx`
- [ ] 블로그 선택 모달 - `app/components/blog/BlogSelector.tsx`
- [ ] 블로그 스위처 컴포넌트 - `app/components/blog/BlogSwitcher.tsx`
- [ ] 페이지네이션 컴포넌트 (공통) - `app/components/common/Pagination.tsx`
- [ ] 검색 입력 컴포넌트 (공통) - `app/components/common/SearchInput.tsx`
- [ ] 필터 드롭다운 컴포넌트 (공통) - `app/components/common/FilterDropdown.tsx`
- [ ] 확인 모달 컴포넌트 (공통) - `app/components/common/ConfirmModal.tsx`
- [ ] 토스트 알림 컴포넌트 (공통) - `app/components/common/Toast.tsx`
- [ ] 데이터 테이블 컴포넌트 (정렬, 필터링 지원) - `app/components/common/DataTable.tsx`

### 24. 테마 시스템 UI

- [ ] 블로그 테마 적용 컴포넌트 (동적 CSS 로딩, 내부 컴포넌트)
- [ ] 테마 선택기 UI (관리자용, 내부 컴포넌트)
- [ ] 테마 프리뷰 컴포넌트 (내부 컴포넌트)
- [ ] 커스텀 CSS 에디터 (Monaco Editor, 내부 컴포넌트)
- [ ] 테마 변수 설정 UI (색상, 폰트 등, 내부 컴포넌트)

---

## 📊 요약 통계

### 전체 UI 현황

- **플랫폼 홈 UI**: 10개
- **인증 UI**: 8개
- **플랫폼 어드민 UI**: 45개
- **개별 블로그 공개 UI**: 35개
- **개별 블로그 어드민 UI**: 60개
- **공통 UI 컴포넌트**: 32개
- **전체**: **190개**

### 세부 분석

#### 플랫폼 홈 UI - 10개

- 홈페이지 및 전체 포스트/검색 페이지

#### 인증 UI - 8개

- 로그인, 회원가입, 비밀번호 재설정 등

#### 플랫폼 어드민 UI - 45개

- 대시보드: 5개
- 사용자 관리: 13개
- 블로그 관리: 10개
- 포스트 관리: 7개
- 댓글 관리: 6개
- 시스템 설정: 4개

#### 개별 블로그 공개 UI - 35개

- 블로그 홈: 6개
- 포스트: 7개
- 카테고리: 4개
- 기타 페이지: 4개
- 댓글 시스템: 5개

#### 개별 블로그 어드민 UI - 60개

- 대시보드: 5개
- 포스트 관리: 11개
- 카테고리 관리: 7개
- 해시태그 관리: 5개
- 댓글 관리: 6개
- 미디어 관리: 6개
- 설정: 7개

#### 공통 UI 컴포넌트 - 32개

- 마크다운 에디터: 9개
- 레이아웃: 8개
- 공통 기능: 10개
- 테마 시스템: 5개

### 우선순위 개발 권장사항

**Phase 1 (기반 구축)** 🔥

- 공통 UI 컴포넌트
- 레이아웃 시스템 구축
- 인증 시스템 UI

**Phase 2 (플랫폼 관리)** ⭐

- 플랫폼 어드민 UI
- 블로그 CRUD 관리
- 사용자 관리

**Phase 3 (블로그 기능)** 🚀

- 개별 블로그 공개 UI
- 블로그 어드민 UI
- 포스트 관리 시스템

**Phase 4 (고급 기능)** ✨

- 테마 시스템
- 고급 관리 기능
- 통계 및 분석

---

## 🔧 Remix Pathless Layout 구조

### 1. 파일 구조 예시

```
app/
├── routes/
│   ├── _index.tsx                                    # / (레이아웃 없음)
│   ├── posts._index.tsx                              # /posts
│   ├── search.tsx                                    # /search
│   ├── about.tsx                                     # /about
│   │
│   ├── _auth.tsx                                     # 인증 레이아웃 (pathless)
│   ├── _auth.signin.tsx                              # /auth/signin
│   ├── _auth.signup.tsx                              # /auth/signup
│   ├── _auth.forgot-password.tsx                     # /auth/forgot-password
│   │
│   ├── _platform-admin.tsx                          # 플랫폼 어드민 레이아웃 (pathless)
│   ├── _platform-admin._index.tsx                   # /admin
│   ├── _platform-admin.users._index.tsx             # /admin/users
│   ├── _platform-admin.users.$id.tsx                # /admin/users/123
│   ├── _platform-admin.blogs._index.tsx             # /admin/blogs
│   ├── _platform-admin.blogs.$slug._index.tsx       # /admin/blogs/my-blog
│   │
│   ├── blog.$slug.tsx                                # 개별 블로그 레이아웃 (nested)
│   ├── blog.$slug._index.tsx                         # /blog/my-blog
│   ├── blog.$slug.posts._index.tsx                   # /blog/my-blog/posts
│   ├── blog.$slug.posts.$postSlug.tsx                # /blog/my-blog/posts/hello
│   ├── blog.$slug.categories.$categorySlug.tsx       # /blog/my-blog/categories/tech
│   │
│   ├── blog.$slug._blog-admin.tsx                    # 개별 블로그 어드민 레이아웃 (pathless)
│   ├── blog.$slug._blog-admin._index.tsx             # /blog/my-blog/admin
│   ├── blog.$slug._blog-admin.posts._index.tsx       # /blog/my-blog/admin/posts
│   ├── blog.$slug._blog-admin.posts.new.tsx          # /blog/my-blog/admin/posts/new
│   ├── blog.$slug._blog-admin.posts.$id.edit.tsx     # /blog/my-blog/admin/posts/123/edit
│   ├── blog.$slug._blog-admin.categories._index.tsx  # /blog/my-blog/admin/categories
│   ├── blog.$slug._blog-admin.settings._index.tsx    # /blog/my-blog/admin/settings
│   │
│   └── api.auth.logout.tsx                           # API 라우트
├── components/
│   ├── layouts/
│   │   ├── AuthLayout.tsx                            # 인증 레이아웃
│   │   ├── PlatformAdminLayout.tsx                   # 플랫폼 어드민 레이아웃
│   │   ├── BlogLayout.tsx                            # 개별 블로그 레이아웃
│   │   └── BlogAdminLayout.tsx                       # 개별 블로그 어드민 레이아웃
│   ├── admin/
│   │   ├── PlatformSidebar.tsx
│   │   └── BlogSidebar.tsx
│   ├── blog/
│   │   ├── BlogHeader.tsx
│   │   ├── BlogNavigation.tsx
│   │   └── BlogFooter.tsx
│   └── common/
│       ├── Breadcrumb.tsx
│       ├── Pagination.tsx
│       └── Toast.tsx
└── contexts/
    ├── BlogContext.tsx
    └── ThemeContext.tsx
```

### 2. 레이아웃 파일 구현

```typescript
// app/routes/_auth.tsx - 인증 레이아웃
import { Outlet } from "@remix-run/react";
import { AuthLayout } from "~/components/layouts/AuthLayout";

export default function AuthLayoutRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

// app/routes/_platform-admin.tsx - 플랫폼 어드민 레이아웃
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { PlatformAdminLayout } from "~/components/layouts/PlatformAdminLayout";
import { requirePlatformAdmin } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requirePlatformAdmin(request);
  return json({ user });
};

export default function PlatformAdminLayoutRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <PlatformAdminLayout user={user}>
      <Outlet />
    </PlatformAdminLayout>
  );
}

// app/routes/blog.$slug.tsx - 개별 블로그 레이아웃 (nested)
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { BlogLayout } from "~/components/layouts/BlogLayout";
import { getBlogBySlug } from "~/models/blog.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const blog = await getBlogBySlug(params.slug!);
  if (!blog) {
    throw new Response("Blog not found", { status: 404 });
  }
  return json({ blog });
};

export default function BlogLayoutRoute() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <BlogLayout blog={blog}>
      <Outlet />
    </BlogLayout>
  );
}

// app/routes/blog.$slug._blog-admin.tsx - 개별 블로그 어드민 레이아웃 (pathless)
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { BlogAdminLayout } from "~/components/layouts/BlogAdminLayout";
import { requireBlogAdmin } from "~/utils/auth.server";
import { getBlogBySlug } from "~/models/blog.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const blog = await getBlogBySlug(params.slug!);
  if (!blog) {
    throw new Response("Blog not found", { status: 404 });
  }

  const user = await requireBlogAdmin(request, blog.id);
  return json({ user, blog });
};

export default function BlogAdminLayoutRoute() {
  const { user, blog } = useLoaderData<typeof loader>();

  return (
    <BlogAdminLayout user={user} blog={blog}>
      <Outlet />
    </BlogAdminLayout>
  );
}
```

### 3. URL 매핑 테이블

| URL                         | 파일                                      | 레이아웃                    |
| --------------------------- | ----------------------------------------- | --------------------------- |
| `/`                         | `_index.tsx`                              | 레이아웃 없음               |
| `/posts`                    | `posts._index.tsx`                        | 레이아웃 없음               |
| `/auth/signin`              | `_auth.signin.tsx`                        | 인증 레이아웃               |
| `/auth/signup`              | `_auth.signup.tsx`                        | 인증 레이아웃               |
| `/admin`                    | `_platform-admin._index.tsx`              | 플랫폼 어드민 레이아웃      |
| `/admin/users`              | `_platform-admin.users._index.tsx`        | 플랫폼 어드민 레이아웃      |
| `/admin/blogs`              | `_platform-admin.blogs._index.tsx`        | 플랫폼 어드민 레이아웃      |
| `/blog/my-blog`             | `blog.$slug._index.tsx`                   | 개별 블로그 레이아웃        |
| `/blog/my-blog/posts`       | `blog.$slug.posts._index.tsx`             | 개별 블로그 레이아웃        |
| `/blog/my-blog/admin`       | `blog.$slug._blog-admin._index.tsx`       | 개별 블로그 어드민 레이아웃 |
| `/blog/my-blog/admin/posts` | `blog.$slug._blog-admin.posts._index.tsx` | 개별 블로그 어드민 레이아웃 |

### 4. 레이아웃 컴포넌트 구현 예시

```typescript
// app/components/layouts/AuthLayout.tsx
import type { ReactNode } from "react";
import { Link } from "@remix-run/react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-indigo-600">
            BlogPlatform
          </Link>
          <p className="mt-2 text-gray-600">멀티 블로그 플랫폼</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {children}
        </div>

        <div className="text-center text-sm text-gray-500">
          <Link to="/" className="hover:text-indigo-600">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

// app/components/layouts/PlatformAdminLayout.tsx
import type { ReactNode } from "react";
import { Link, Form } from "@remix-run/react";
import { PlatformSidebar } from "~/components/admin/PlatformSidebar";

interface PlatformAdminLayoutProps {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function PlatformAdminLayout({
  children,
  user,
}: PlatformAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="text-xl font-bold text-indigo-600">
                Platform Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.name} ({user.role})
              </span>
              <Form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </Form>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <PlatformSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

// app/components/layouts/BlogLayout.tsx
import type { ReactNode } from "react";
import { BlogHeader } from "~/components/blog/BlogHeader";
import { BlogNavigation } from "~/components/blog/BlogNavigation";
import { BlogFooter } from "~/components/blog/BlogFooter";

interface BlogLayoutProps {
  children: ReactNode;
  blog: {
    id: string;
    name: string;
    slug: string;
    description: string;
    theme: string;
  };
}

export function BlogLayout({ children, blog }: BlogLayoutProps) {
  return (
    <div className={`min-h-screen blog-theme-${blog.theme}`}>
      <BlogHeader blog={blog} />
      <BlogNavigation blog={blog} />

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      <BlogFooter blog={blog} />
    </div>
  );
}

// app/components/layouts/BlogAdminLayout.tsx
import type { ReactNode } from "react";
import { Link, Form } from "@remix-run/react";
import { BlogSidebar } from "~/components/admin/BlogSidebar";

interface BlogAdminLayoutProps {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
  };
  blog: {
    id: string;
    name: string;
    slug: string;
  };
}

export function BlogAdminLayout({
  children,
  user,
  blog,
}: BlogAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to={`/blog/${blog.slug}/admin`}
                className="text-xl font-bold text-green-600"
              >
                {blog.name} Admin
              </Link>
              <Link
                to={`/blog/${blog.slug}`}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                블로그 보기
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.name}</span>
              <Form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </Form>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <BlogSidebar blog={blog} />

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
```

### 5. 인증 처리 유틸리티

```typescript
// app/utils/auth.server.ts
import { redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

export async function requirePlatformAdmin(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/auth/signin");
  }

  const user = await getUserById(userId);
  if (!user || user.role !== "platform_admin") {
    throw redirect("/auth/signin");
  }

  return user;
}

export async function requireBlogAdmin(request: Request, blogId: string) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/auth/signin");
  }

  const user = await getUserById(userId);
  if (!user) {
    throw redirect("/auth/signin");
  }

  // 플랫폼 어드민이거나 해당 블로그의 소유자/편집자인지 확인
  const hasAccess =
    user.role === "platform_admin" || (await checkBlogAccess(userId, blogId));

  if (!hasAccess) {
    throw new Response("Forbidden", { status: 403 });
  }

  return user;
}
```

이제 5가지 독립적인 레이아웃을 가진 완전한 UI 체크리스트가 완성되었습니다!

## 🎯 핵심 특징

1. **완전한 레이아웃 분리**: 5가지 서로 다른 UI/UX
2. **계층적 인증**: 플랫폼 어드민 > 블로그 어드민 > 일반 사용자
3. **독립적인 블로그 관리**: 각 블로그마다 독립적인 어드민 페이지
4. **유연한 테마 시스템**: 각 블로그마다 다른 테마 적용 가능
5. **확장 가능한 구조**: 새로운 블로그나 기능 추가가 용이

이제 이 체크리스트를 기반으로 멀티 블로그 플랫폼을 체계적으로 개발할 수 있습니다! 🚀
