# Next.js Basic Check

- App Router(`app/`) 구조를 기준으로 작업하고 `pages/` 또는 Pages Router 문법은 사용하지 않는다.
- 기본은 Server Component이며 `useState`, `useEffect`, 이벤트 핸들러가 필요할 때만 `use client`를 추가한다.
- 라우팅과 내비게이션이 필요하면 `next/router` 대신 `next/navigation`을 사용한다.
- JSX에서는 `className`을 사용하고, 스타일은 Tailwind 유틸리티 클래스 중심으로 작성한다.
- 작업 후 import 경로, 불필요한 클라이언트 전환, 현재 버전 문법 사용 여부를 다시 확인한다.
