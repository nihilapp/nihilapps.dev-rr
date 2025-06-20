# 리액트 커스텀 훅 체크 리스트

본 문서는 블로그 매니지먼트 시스템(멀티 블로그) 프로젝트의 React Query 기반 커스텀 훅 구현 항목을 API와 1:1로 매칭하여 정리한 체크리스트입니다.

---

## 📌 플랫폼 관리 훅 (Platform Management)

### 1. 인증(Auth) 훅

- [ ] **useSignUp** - `POST /api/auth/signup` - 새로운 관리자 생성

> **참고**: NextAuth 사용으로 다음 기능들은 NextAuth 내장 함수 사용:
>
> - 로그인: `signIn()` 함수
> - 로그아웃: `signOut()` 함수
> - 세션 조회: `useSession()` 또는 `auth()` 함수

### 2. 사용자(User) 훅

- [ ] **useGetUsers** - `GET /api/users` - 관리자 목록 조회
- [ ] **useGetUserById** - `GET /api/users/[id]` - 특정 관리자 상세 조회
- [ ] **useGetUserByEmail** - `GET /api/users/email/[email]` - 이메일로 관리자 검색
- [ ] **useGetUserByUsername** - `GET /api/users/username/[username]` - 사용자명으로 관리자 검색
- [ ] **useCreateUser** - `POST /api/users` - 관리자 생성
- [ ] **useUpdateUser** - `PUT /api/users/[id]` - 관리자 기본 정보 수정
- [ ] **useUpdateUserPassword** - `PUT /api/users/[id]/password` - 관리자 비밀번호 변경
- [ ] **useUpdateUserImage** - `PUT /api/users/[id]/image` - 프로필 이미지 수정
- [ ] **useDeleteUser** - `DELETE /api/users/[id]` - 관리자 삭제
- [ ] **useDeleteUsers** - `DELETE /api/users` - 관리자 일괄 삭제

### 3. 블로그(Blog) 훅

- [ ] **useGetBlogs** - `GET /api/blogs` - 내 블로그 목록 조회
- [ ] **useGetBlogBySlug** - `GET /api/blogs/[slug]` - 특정 블로그 상세 조회
- [ ] **useCreateBlog** - `POST /api/blogs` - 새 블로그 생성
- [ ] **useUpdateBlog** - `PUT /api/blogs/[slug]` - 블로그 정보 수정
- [ ] **useDeleteBlog** - `DELETE /api/blogs/[slug]` - 블로그 삭제
- [ ] **useUpdateBlogStatus** - `PATCH /api/blogs/[slug]/status` - 블로그 활성화/비활성화
- [ ] **useUpdateBlogVisibility** - `PATCH /api/blogs/[slug]/visibility` - 블로그 공개/비공개

### 4. 플랫폼 전체 포스트 훅 (모든 블로그)

- [ ] **useGetPosts** - `GET /api/posts` - 모든 블로그의 포스트 목록 조회
- [ ] **useGetPostById** - `GET /api/posts/[id]` - 특정 포스트 상세 조회
- [ ] **useGetPostBySlug** - `GET /api/posts/slug/[slug]` - 슬러그로 포스트 조회
- [ ] **useCreatePost** - `POST /api/posts` - 새 포스트 작성
- [ ] **useUpdatePost** - `PUT /api/posts/[id]` - 포스트 수정
- [ ] **useDeletePost** - `DELETE /api/posts/[id]` - 포스트 삭제
- [ ] **useSearchPosts** - `GET /api/posts/search` - 포스트 검색
- [ ] **usePublishPost** - `PATCH /api/posts/[id]/publish` - 포스트 발행 상태 변경
- [ ] **useIncreasePostViews** - `PATCH /api/posts/[id]/views` - 조회수 증가
- [ ] **useIncreasePostLikes** - `PATCH /api/posts/[id]/likes` - 좋아요 수 증가
- [ ] **useCreatePostLike** - `POST /api/posts/[id]/like` - 좋아요 추가
- [ ] **useDeletePostLike** - `DELETE /api/posts/[id]/like` - 좋아요 취소
- [ ] **useGetPostViews** - `GET /api/posts/[id]/views` - 포스트 조회 이력 조회
- [ ] **useGetPostLikes** - `GET /api/posts/[id]/likes` - 포스트 좋아요 이력 조회
- [ ] **useCreatePostView** - `POST /api/posts/[id]/view` - 포스트 조회 기록 생성
- [ ] **useCreateDraftPost** - `POST /api/posts/draft` - 임시 저장 포스트 생성
- [ ] **useGetDraftPosts** - `GET /api/posts/drafts` - 임시 저장 포스트 목록 조회
- [ ] **useRestoreDraftPost** - `GET /api/posts/drafts/[id]/restore` - 임시 저장본 복구
- [ ] **useAutosavePost** - `PATCH /api/posts/[id]/autosave` - 자동 저장
- [ ] **useBatchUpdatePostStatus** - `PATCH /api/posts/batch-status` - 포스트 상태 일괄 변경
- [ ] **useBatchDeletePosts** - `DELETE /api/posts/batch` - 포스트 일괄 삭제
- [ ] **useGetRelatedPosts** - `GET /api/posts/[id]/related` - 관련 포스트 추천

### 5. 플랫폼 전체 카테고리 훅 (모든 블로그)

- [ ] **useGetCategories** - `GET /api/categories` - 모든 블로그의 카테고리 계층 구조 조회
- [ ] **useGetCategoriesFlat** - `GET /api/categories/flat` - 모든 블로그의 카테고리 평면 목록 조회
- [ ] **useGetCategoryById** - `GET /api/categories/[id]` - 특정 카테고리 상세 조회
- [ ] **useGetCategoryBySlug** - `GET /api/categories/slug/[slug]` - 슬러그로 카테고리 조회
- [ ] **useCreateCategory** - `POST /api/categories` - 카테고리 생성
- [ ] **useUpdateCategory** - `PUT /api/categories/[id]` - 카테고리 수정
- [ ] **useUpdateCategoryOrder** - `PATCH /api/categories/[id]/order` - 카테고리 순서 변경
- [ ] **useUpdateCategoryStatus** - `PATCH /api/categories/[id]/status` - 카테고리 활성화/비활성화
- [ ] **useDeleteCategory** - `DELETE /api/categories/[id]` - 카테고리 삭제
- [ ] **useGetCategoryPosts** - `GET /api/categories/[id]/posts` - 카테고리별 포스트 목록 조회
- [ ] **useGetCategoryChildren** - `GET /api/categories/[id]/children` - 하위 카테고리 조회

### 6. 플랫폼 전체 해시태그 훅 (모든 블로그)

- [ ] **useGetHashtags** - `GET /api/hashtags` - 모든 블로그의 해시태그 조회
- [ ] **useCreateHashtag** - `POST /api/hashtags` - 해시태그 생성
- [ ] **useUpdateHashtag** - `PUT /api/hashtags/[id]` - 해시태그 수정
- [ ] **useDeleteHashtag** - `DELETE /api/hashtags/[id]` - 해시태그 삭제
- [ ] **useGetHashtagPosts** - `GET /api/hashtags/[id]/posts` - 해시태그별 포스트 목록 조회
- [ ] **useHashtagAutocomplete** - `GET /api/hashtags/autocomplete` - 해시태그 자동완성

### 7. 플랫폼 전체 댓글 훅 (모든 블로그)

- [ ] **useGetComments** - `GET /api/comments` - 모든 블로그의 댓글 목록 조회
- [ ] **useGetCommentById** - `GET /api/comments/[id]` - 특정 댓글 상세 조회
- [ ] **useGetPostComments** - `GET /api/comments/post/[postId]` - 포스트별 댓글 목록 조회
- [ ] **useCreateComment** - `POST /api/comments` - 방문자 댓글 작성
- [ ] **useReplyComment** - `POST /api/comments/[id]/reply` - 관리자 답글 작성
- [ ] **useUpdateComment** - `PUT /api/comments/[id]` - 댓글 수정
- [ ] **useDeleteComment** - `DELETE /api/comments/[id]` - 댓글 삭제
- [ ] **useApproveComment** - `PATCH /api/comments/[id]/approve` - 댓글 승인/거부
- [ ] **useVerifyComment** - `POST /api/comments/verify` - 댓글 작성자 인증

### 8. 플랫폼 전체 이미지 업로드 훅 (모든 블로그)

- [ ] **useUploadImage** - `POST /api/upload/image` - 이미지 업로드
- [ ] **useGetImages** - `GET /api/upload/images` - 이미지 목록 조회
- [ ] **useGetImageById** - `GET /api/upload/images/[id]` - 특정 이미지 상세 조회
- [ ] **useUpdateImage** - `PUT /api/upload/images/[id]` - 이미지 메타데이터 수정
- [ ] **useDeleteImage** - `DELETE /api/upload/images/[id]` - 이미지 삭제
- [ ] **useBatchDeleteImages** - `POST /api/upload/images/batch-delete` - 이미지 일괄 삭제

---

## 📝 블로그별 관리 훅 (Blog-Specific Management)

### 9. 블로그별 포스트 훅

- [ ] **useGetBlogPosts** - `GET /api/blogs/[slug]/posts` - 블로그별 포스트 목록 조회
- [ ] **useGetBlogPostById** - `GET /api/blogs/[slug]/posts/[id]` - 블로그별 특정 포스트 조회
- [ ] **useGetBlogPostBySlug** - `GET /api/blogs/[slug]/posts/slug/[postSlug]` - 블로그별 포스트 슬러그 조회
- [ ] **useCreateBlogPost** - `POST /api/blogs/[slug]/posts` - 블로그별 포스트 작성
- [ ] **useUpdateBlogPost** - `PUT /api/blogs/[slug]/posts/[id]` - 블로그별 포스트 수정
- [ ] **useDeleteBlogPost** - `DELETE /api/blogs/[slug]/posts/[id]` - 블로그별 포스트 삭제
- [ ] **useSearchBlogPosts** - `GET /api/blogs/[slug]/posts/search` - 블로그별 포스트 검색
- [ ] **usePublishBlogPost** - `PATCH /api/blogs/[slug]/posts/[id]/publish` - 블로그별 포스트 발행 상태 변경
- [ ] **useIncreaseBlogPostViews** - `PATCH /api/blogs/[slug]/posts/[id]/views` - 블로그별 포스트 조회수 증가
- [ ] **useIncreaseBlogPostLikes** - `PATCH /api/blogs/[slug]/posts/[id]/likes` - 블로그별 포스트 좋아요 수 증가
- [ ] **useCreateBlogPostLike** - `POST /api/blogs/[slug]/posts/[id]/like` - 블로그별 포스트 좋아요 추가
- [ ] **useDeleteBlogPostLike** - `DELETE /api/blogs/[slug]/posts/[id]/like` - 블로그별 포스트 좋아요 취소
- [ ] **useGetBlogPostViews** - `GET /api/blogs/[slug]/posts/[id]/views` - 블로그별 포스트 조회 이력 조회
- [ ] **useGetBlogPostLikes** - `GET /api/blogs/[slug]/posts/[id]/likes` - 블로그별 포스트 좋아요 이력 조회
- [ ] **useCreateBlogPostView** - `POST /api/blogs/[slug]/posts/[id]/view` - 블로그별 포스트 조회 기록 생성
- [ ] **useGetBlogDraftPosts** - `GET /api/blogs/[slug]/posts/drafts` - 블로그별 임시저장 포스트 목록 조회
- [ ] **useCreateBlogDraftPost** - `POST /api/blogs/[slug]/posts/draft` - 블로그별 임시저장 포스트 생성
- [ ] **useRestoreBlogDraftPost** - `GET /api/blogs/[slug]/posts/drafts/[id]/restore` - 블로그별 임시 저장본 복구
- [ ] **useAutosaveBlogPost** - `PATCH /api/blogs/[slug]/posts/[id]/autosave` - 블로그별 포스트 자동 저장
- [ ] **useBatchUpdateBlogPostStatus** - `PATCH /api/blogs/[slug]/posts/batch-status` - 블로그별 포스트 상태 일괄 변경
- [ ] **useBatchDeleteBlogPosts** - `DELETE /api/blogs/[slug]/posts/batch` - 블로그별 포스트 일괄 삭제
- [ ] **useGetBlogRelatedPosts** - `GET /api/blogs/[slug]/posts/[id]/related` - 블로그별 관련 포스트 추천

### 10. 블로그별 카테고리 훅

- [ ] **useGetBlogCategories** - `GET /api/blogs/[slug]/categories` - 블로그별 카테고리 계층 구조 조회
- [ ] **useGetBlogCategoriesFlat** - `GET /api/blogs/[slug]/categories/flat` - 블로그별 카테고리 평면 목록 조회
- [ ] **useGetBlogCategoryById** - `GET /api/blogs/[slug]/categories/[id]` - 블로그별 특정 카테고리 조회
- [ ] **useGetBlogCategoryBySlug** - `GET /api/blogs/[slug]/categories/slug/[categorySlug]` - 블로그별 카테고리 슬러그 조회
- [ ] **useCreateBlogCategory** - `POST /api/blogs/[slug]/categories` - 블로그별 카테고리 생성
- [ ] **useUpdateBlogCategory** - `PUT /api/blogs/[slug]/categories/[id]` - 블로그별 카테고리 수정
- [ ] **useUpdateBlogCategoryOrder** - `PATCH /api/blogs/[slug]/categories/[id]/order` - 블로그별 카테고리 순서 변경
- [ ] **useUpdateBlogCategoryStatus** - `PATCH /api/blogs/[slug]/categories/[id]/status` - 블로그별 카테고리 활성화/비활성화
- [ ] **useDeleteBlogCategory** - `DELETE /api/blogs/[slug]/categories/[id]` - 블로그별 카테고리 삭제
- [ ] **useGetBlogCategoryPosts** - `GET /api/blogs/[slug]/categories/[id]/posts` - 블로그별 카테고리별 포스트 목록 조회
- [ ] **useGetBlogCategoryChildren** - `GET /api/blogs/[slug]/categories/[id]/children` - 블로그별 하위 카테고리 조회

### 11. 블로그별 해시태그 훅

- [ ] **useGetBlogHashtags** - `GET /api/blogs/[slug]/hashtags` - 블로그별 해시태그 목록 조회
- [ ] **useCreateBlogHashtag** - `POST /api/blogs/[slug]/hashtags` - 블로그별 해시태그 생성
- [ ] **useUpdateBlogHashtag** - `PUT /api/blogs/[slug]/hashtags/[id]` - 블로그별 해시태그 수정
- [ ] **useDeleteBlogHashtag** - `DELETE /api/blogs/[slug]/hashtags/[id]` - 블로그별 해시태그 삭제
- [ ] **useGetBlogHashtagPosts** - `GET /api/blogs/[slug]/hashtags/[id]/posts` - 블로그별 해시태그별 포스트 목록 조회
- [ ] **useBlogHashtagAutocomplete** - `GET /api/blogs/[slug]/hashtags/autocomplete` - 블로그별 해시태그 자동완성

### 12. 블로그별 댓글 훅

- [ ] **useGetBlogComments** - `GET /api/blogs/[slug]/comments` - 블로그별 댓글 목록 조회
- [ ] **useGetBlogCommentById** - `GET /api/blogs/[slug]/comments/[id]` - 블로그별 특정 댓글 조회
- [ ] **useGetBlogPostComments** - `GET /api/blogs/[slug]/comments/post/[postId]` - 블로그별 포스트별 댓글 목록 조회
- [ ] **useCreateBlogComment** - `POST /api/blogs/[slug]/comments` - 블로그별 댓글 작성
- [ ] **useReplyBlogComment** - `POST /api/blogs/[slug]/comments/[id]/reply` - 블로그별 댓글 답글 작성
- [ ] **useUpdateBlogComment** - `PUT /api/blogs/[slug]/comments/[id]` - 블로그별 댓글 수정
- [ ] **useDeleteBlogComment** - `DELETE /api/blogs/[slug]/comments/[id]` - 블로그별 댓글 삭제
- [ ] **useApproveBlogComment** - `PATCH /api/blogs/[slug]/comments/[id]/approve` - 블로그별 댓글 승인 상태 변경
- [ ] **useVerifyBlogComment** - `POST /api/blogs/[slug]/comments/verify` - 블로그별 댓글 작성자 인증

### 13. 블로그별 이미지 업로드 훅

- [ ] **useUploadBlogImage** - `POST /api/blogs/[slug]/upload/image` - 블로그별 이미지 업로드
- [ ] **useGetBlogImages** - `GET /api/blogs/[slug]/upload/images` - 블로그별 이미지 목록 조회
- [ ] **useGetBlogImageById** - `GET /api/blogs/[slug]/upload/images/[id]` - 블로그별 특정 이미지 조회
- [ ] **useUpdateBlogImage** - `PUT /api/blogs/[slug]/upload/images/[id]` - 블로그별 이미지 메타데이터 수정
- [ ] **useDeleteBlogImage** - `DELETE /api/blogs/[slug]/upload/images/[id]` - 블로그별 이미지 삭제
- [ ] **useBatchDeleteBlogImages** - `POST /api/blogs/[slug]/upload/images/batch-delete` - 블로그별 이미지 일괄 삭제

---

## 📊 요약 통계

### 전체 훅 현황

- **플랫폼 관리 훅**: 72개
- **블로그별 관리 훅**: 69개
- **전체**: **141개**

### 세부 분석

#### 플랫폼 관리 훅 - 72개 (모든 블로그 통합 관리)

- 인증 훅: 1개
- 사용자 훅: 10개
- 블로그 훅: 7개
- 플랫폼 전체 포스트 훅: 22개
- 플랫폼 전체 카테고리 훅: 11개
- 플랫폼 전체 해시태그 훅: 6개
- 플랫폼 전체 댓글 훅: 9개
- 플랫폼 전체 이미지 업로드 훅: 6개

#### 블로그별 관리 훅 - 69개 (개별 블로그 관리)

- 블로그별 포스트 훅: 22개
- 블로그별 카테고리 훅: 11개
- 블로그별 해시태그 훅: 6개
- 블로그별 댓글 훅: 9개
- 블로그별 이미지 업로드 훅: 6개

### 훅 사용 패턴

**useQuery 패턴 (GET 요청)** 📄

- 데이터 조회, 검색, 목록 가져오기
- `enabled`, `staleTime`, `cacheTime` 등 옵션 활용
- `loading`, `done` 상태 관리

**useMutation 패턴 (POST/PUT/PATCH/DELETE)** ⚡

- 데이터 생성, 수정, 삭제
- `onSuccess`에서 쿼리 무효화
- `onError`에서 에러 처리

### 우선순위 개발 권장사항

**Phase 1 (기반 훅)** 🔥

- 인증 훅
- 블로그 CRUD 훅
- 사용자 관리 훅

**Phase 2 (핵심 기능 훅)** ⭐

- 포스트 CRUD 훅 (플랫폼/블로그별)
- 카테고리 관리 훅
- 이미지 업로드 훅

**Phase 3 (고급 기능 훅)** 🚀

- 댓글 시스템 훅
- 해시태그 관리 훅
- 검색 및 필터링 훅

**Phase 4 (최적화 훅)** ✨

- 일괄 작업 훅
- 자동저장 훅
- 관련 콘텐츠 추천 훅

각 훅은 해당하는 API 엔드포인트와 정확히 1:1로 매칭되며, React Query의 `useQuery` (GET 요청) 또는 `useMutation` (POST/PUT/PATCH/DELETE 요청) 패턴을 따라 구현됩니다.
