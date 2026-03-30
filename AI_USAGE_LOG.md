# AI Usage Log

## 학생 정보
- 이름: 전영준
- 학과: 공공인재빅데이터융합학
- 취미: 런닝

## 사용 기록
```text
[프롬프트] [버전 고정] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17 기준으로 작성해줘.
[프롬프트] [규칙] App Router만 사용하고 next/router, Pages Router, getServerSideProps는 사용하지 마.
[프롬프트] [요구사항] app/page.js에 이름, 학과, 취미, 관심 분야가 보이는 블로그 소개 페이지를 만들어줘.
[프롬프트] [디자인] 배경은 bg-gray-50, 내용은 흰색 카드로 구성하고 className을 사용해줘.
[AI 실수] 없음
[분류] 없음
[해결] package.json 기준 실제 버전을 copilot-instructions.md에 반영하고, className/App Router 규칙을 다시 확인했다.
[조치] Known AI Mistakes에 next/navigation, className, 실제 버전 확인 규칙을 추가했다.
```

## 검증 메모
- `app/page.js`는 Server Component로 유지했다.
- `class` 대신 `className`만 사용했다.
- 환경변수와 민감한 키를 하드코딩하지 않았다.
- 현재 프로젝트의 실제 버전은 `package.json` 기준으로 맞췄다.
- `npm.cmd run build` 기준으로 프로덕션 빌드가 성공했다.
