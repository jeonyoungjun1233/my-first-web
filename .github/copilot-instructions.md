# Project Context

## Tech Stack
- Next.js 14.2.21 (App Router ONLY)
- React 18.3.1
- Tailwind CSS 3.4.17
- Vercel 배포

## Project Structure
- `app/layout.js` - 공통 레이아웃과 metadata 관리
- `app/page.js` - Chapter 2 자기소개 메인 페이지
- `.github/copilot-instructions.md` - Copilot이 항상 참고해야 하는 프로젝트 규칙

## Coding Conventions
- Server Component 기본, `use client`는 `useState`, `onClick` 등 브라우저 기능이 필요할 때만 사용
- `async/await` 패턴을 사용하고 `then` 체이닝은 사용하지 않음
- JSX에서는 `class` 대신 `className`만 사용
- Tailwind CSS 유틸리티 클래스만 사용하고 CSS Modules, styled-components는 사용하지 않음
- 자기소개 정보는 전영준 / 공공인재빅데이터융합학 / 런닝 기준으로 유지

## Known AI Mistakes (DO NOT)
- `next/router` 사용 금지 -> `next/navigation` 사용
- `getServerSideProps` 사용 금지 -> App Router 서버 컴포넌트와 라우트 핸들러 사용
- 불필요한 `use client` 추가 금지 -> 정적 페이지는 서버 컴포넌트로 유지
- 존재하지 않는 패키지 추천 금지 -> `package.json`에 있는 의존성만 사용
- JSX에서 `class="..."` 사용 금지 -> `className="..."` 사용
- 실제 버전을 추측하지 말 것 -> `package.json` 기준으로 먼저 확인
