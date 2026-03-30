# Ch2 과제 제출 정리

## 학생 정보
- 이름: 전영준
- 학과: 공공인재빅데이터융합학
- 취미: 런닝

## 제출 항목
1. 배포 URL
   - Vercel 배포 후 여기에 최종 URL을 입력
   - 예시: `https://your-project.vercel.app`
2. AI가 틀린 부분 1개 또는 확인한 점
   - Copilot이 생성한 페이지 구조를 검토했고, `className` 사용과 App Router 규칙이 올바른지 확인했다.
   - 불필요한 `use client` 없이 서버 컴포넌트로 작성해도 충분한 페이지임을 검증했다.

## 과제 완료 체크리스트
- [x] `.github/copilot-instructions.md` 작성
- [x] `.vscode/mcp.json` 생성
- [x] `.github/skills/nextjs-basic-check/SKILL.md` 생성
- [x] `.github/skills/secret-guard/SKILL.md` 생성
- [x] `.gitignore` 작성
- [x] `app/page.js` 자기소개 페이지 완성
- [x] AI 사용 로그 작성
- [x] 로컬 프로덕션 빌드 확인
- [ ] Vercel 배포 후 URL 입력

## GitHub 업로드 명령
이미 Git 저장소가 있으면 `git init`과 `git branch -M main`은 건너뛴다.

```bash
cd practice/chapter2/starter
git init
git add .
git commit -m "Ch2: 블로그 소개 페이지 + copilot-instructions.md"
git branch -M main
git remote add origin 본인_깃허브_저장소_URL
git push -u origin main
```

## Vercel 배포 순서
1. GitHub에 위 프로젝트를 푸시한다.
2. `https://vercel.com` 에 로그인한다.
3. `Add New Project`를 눌러 방금 올린 GitHub 저장소를 선택한다.
4. Framework Preset이 `Next.js`로 잡히는지 확인한다.
5. Environment Variables는 비워두고 `Deploy`를 누른다.
6. 배포가 끝나면 배포 URL을 위 제출 항목 1번에 입력한다.

## Google Classroom 제출용 문구
아래 문구에서 배포 URL만 바꿔서 제출하면 된다.
같은 내용이 [CLASSROOM_SUBMISSION.txt](c:\web\practice\chapter2\starter\CLASSROOM_SUBMISSION.txt) 에도 저장되어 있다.

```text
① 배포 URL
https://여기에-배포-후-발급된-vercel-url 입력

② AI가 틀린 부분 1개 또는 확인한 점
Copilot이 생성한 코드에서 className 사용과 App Router 규칙이 올바른지 확인했다.
이 페이지는 정적 자기소개 페이지이므로 불필요한 "use client" 없이 서버 컴포넌트로 유지했다.
```
