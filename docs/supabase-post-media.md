# Supabase 미디어 업로드 설정

게시글 이미지와 동영상 업로드는 `post-media` Storage bucket을 사용합니다.

필요한 설정:

1. `supabase/migrations/202606080002_add_post_media.sql` 실행
2. Supabase Storage에 `post-media` bucket이 public read인지 확인
3. 로그인 사용자가 `user_id/timestamp_filename` 경로로 업로드할 수 있는지 확인

게시글 테이블 컬럼:

- `media_url text`
- `media_type text`, 값은 `image` 또는 `video`

Storage 정책:

- 읽기: 누구나 가능
- 업로드: 로그인 사용자만 가능
- 업로드 경로 첫 폴더가 본인 사용자 id와 같아야 함
