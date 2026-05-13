export type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type PostSection = {
  id: string;
  title: string;
  body: string[];
  checklist?: ChecklistItem[];
};

export type Post = {
  id: number;
  category: string;
  title: string;
  summary: string;
  route: string;
  readTime: string;
  date: string;
  accent: string;
  sections: PostSection[];
};

export const profile = {
  name: "전영준",
  department: "공공인재빅데이터융합학",
  siteName: "RED CHI BLOG",
  tagline: "붉은 네온으로 기록하는 Next.js Chapter 5 실습 블로그",
  deploymentUrl: "https://my-first-lime.vercel.app",
};

export const finalChecklist: ChecklistItem[] = [
  {
    id: "final-structure",
    text: "App Router 구조인가? (app/posts/page.tsx, app/posts/[id]/page.tsx, app/posts/new/page.tsx)",
    checked: true,
  },
  {
    id: "final-default",
    text: "모든 페이지가 export default function 구조를 유지하는가?",
    checked: true,
  },
  {
    id: "final-params",
    text: "[id]/page.tsx에서 const { id } = await params 패턴을 사용하는가?",
    checked: true,
  },
  {
    id: "final-link",
    text: "Link import가 next/link이고 내부 이동에 <a> 대신 <Link>를 사용하는가?",
    checked: true,
  },
  {
    id: "final-router",
    text: "useRouter import가 next/navigation이며 next/router를 사용하지 않는가?",
    checked: true,
  },
  {
    id: "final-client",
    text: "useState / useRouter 사용 파일에 \"use client\"가 선언되어 있는가?",
    checked: true,
  },
  {
    id: "final-key",
    text: "map() 렌더링에 key 속성이 들어가 있는가?",
    checked: true,
  },
  {
    id: "final-classname",
    text: "class 대신 className을 사용하는가?",
    checked: true,
  },
  {
    id: "final-responsive",
    text: "배포 URL과 모바일 레이아웃까지 점검할 수 있도록 구조가 정리되어 있는가?",
    checked: true,
  },
  {
    id: "final-ch9-doc",
    text: "docs/ch9A.md 원문을 GitHub 저장소에 포함했는가?",
    checked: true,
  },
  {
    id: "final-ch9-auth",
    text: "로그인/회원가입/로그아웃과 보호 라우트 흐름을 연결했는가?",
    checked: true,
  },
  {
    id: "final-ch9-vercel",
    text: "Vercel 배포 URL에서 Ch9 인증 페이지를 확인할 수 있는가?",
    checked: true,
  },
];

export const posts: Post[] = [
  {
    id: 1,
    category: "Setup + App Router",
    title: "출발점 맞추기와 App Router 구조를 붉은 네온 위에 세우기",
    summary:
      "같은 출발점에서 시작하고, 폴더가 URL이 되는 App Router 규칙을 이해해야 이후 실습이 흔들리지 않는다.",
    route: "/posts/1",
    readTime: "4 min read",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(251, 113, 133, 0.28), rgba(239, 68, 68, 0.08), transparent)",
    sections: [
      {
        id: "start-point",
        title: "1. 출발점을 먼저 맞춘 이유",
        body: [
          "Ch5A 문서에서는 같은 코드를 따라가기 위해 모두가 동일한 출발점을 가져야 한다고 강조한다. 그래서 프로젝트 폴더를 정확히 열고, 개발 서버를 켜고, localhost 화면을 먼저 확인하는 절차가 가장 먼저 나온다.",
          "이 단계가 맞아야 이후의 목록 페이지, 상세 페이지, 작성 페이지를 만들어도 어디서 문제가 생겼는지 빠르게 찾을 수 있다. 블로그의 첫 번째 포스트는 바로 그 시작 지점을 정리한 학습 기록이다.",
        ],
        checklist: [
          {
            id: "boot-open-project",
            text: "프로젝트 폴더가 VS Code에서 열려 있는가?",
            checked: true,
          },
          {
            id: "boot-run-dev",
            text: "터미널에서 npm run dev를 실행했는가?",
            checked: true,
          },
          {
            id: "boot-localhost",
            text: "브라우저에서 http://localhost:3000 이 열리는가?",
            checked: true,
          },
          {
            id: "boot-start-point",
            text: "문서의 출발점 맞추기 과정을 완료했는가?",
            checked: true,
          },
        ],
      },
      {
        id: "router-shape",
        title: "2. App Router는 폴더가 곧 URL이다",
        body: [
          "이번 블로그는 Next.js 16 App Router 구조를 그대로 따른다. app/posts/page.tsx는 /posts가 되고, app/posts/[id]/page.tsx는 /posts/1 같은 상세 주소가 된다.",
          "layout.tsx는 모든 페이지에 공통으로 적용되는 프레임이다. 이 프로젝트에서는 상단 네비게이션, 본문 래퍼, 하단 푸터가 모두 이 레이아웃을 통해 동일하게 유지된다.",
        ],
        checklist: [
          {
            id: "router-app",
            text: "App Router 구조가 app 폴더 기준으로 정리되어 있는가?",
            checked: true,
          },
          {
            id: "router-default-export",
            text: "페이지 파일이 모두 export default function으로 작성되어 있는가?",
            checked: true,
          },
          {
            id: "router-layout",
            text: "nav - main - footer 3단 구조가 공통 레이아웃에 들어가 있는가?",
            checked: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: "Posts + Dynamic Route",
    title: "목록 카드, 동적 상세 페이지, 그리고 await params 체크포인트",
    summary:
      "카드를 클릭하면 상세 페이지로 이어지고, 존재하지 않는 글은 안내 문구로 처리하는 것이 이번 장의 핵심 흐름이다.",
    route: "/posts/2",
    readTime: "6 min read",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(239, 68, 68, 0.3), rgba(217, 70, 239, 0.08), transparent)",
    sections: [
      {
        id: "posts-list",
        title: "1. 목록 페이지에서 꼭 확인한 것",
        body: [
          "ch5A와 ch5B는 모두 목록 페이지에서 Link, key, 올바른 import, className을 확인하라고 말한다. 그래서 이번 프로젝트의 /posts는 카드형 목록을 만들고 각 카드가 상세 페이지로 이동하도록 구성했다.",
          "블로그 카드에는 제목, 요약, 읽는 시간, 이동 경로를 담아 문서 요약과 실습 안내를 동시에 보이게 했다. 카드 자체를 Link로 감싸서 내부 이동도 Next.js 방식으로 맞췄다.",
        ],
        checklist: [
          {
            id: "list-link-import",
            text: "import Link from \"next/link\"를 사용했는가?",
            checked: true,
          },
          {
            id: "list-link-component",
            text: "내부 이동에 <a>가 아닌 <Link> 컴포넌트를 사용했는가?",
            checked: true,
          },
          {
            id: "list-key",
            text: "posts.map(...) 안에 key={post.id}가 들어가 있는가?",
            checked: true,
          },
          {
            id: "list-import-posts",
            text: "lib/posts.ts에서 posts 데이터를 올바르게 import했는가?",
            checked: true,
          },
          {
            id: "list-classname",
            text: "JSX에서 class 대신 className을 사용했는가?",
            checked: true,
          },
          {
            id: "list-visible",
            text: "/posts에 접속했을 때 카드 목록이 보이는가?",
            checked: true,
          },
          {
            id: "list-click-route",
            text: "카드를 클릭하면 URL이 /posts/1, /posts/2처럼 바뀌는가?",
            checked: true,
          },
        ],
      },
      {
        id: "dynamic-detail",
        title: "2. 상세 페이지에서 가장 중요했던 포인트",
        body: [
          "현재 프로젝트는 Next.js 16이므로 params를 Promise로 받는다. 그래서 ch5A의 기준을 따라 const { id } = await params 패턴으로 id를 꺼내도록 구현했다.",
          "이후 posts.find(...)로 해당 게시글을 찾고, 값이 없으면 붉은 경고 패널로 '찾을 수 없습니다' 메시지를 보여준다. 목록으로 돌아가는 Link도 함께 두어 흐름이 끊기지 않게 만들었다.",
        ],
        checklist: [
          {
            id: "detail-await-params",
            text: "const { id } = await params 패턴을 사용했는가?",
            checked: true,
          },
          {
            id: "detail-find",
            text: "posts.find(...) 로 해당 게시글을 찾는가?",
            checked: true,
          },
          {
            id: "detail-not-found-message",
            text: "게시글이 없을 때 안내 메시지가 표시되는가?",
            checked: true,
          },
          {
            id: "detail-back-link",
            text: "목록으로 돌아가는 <Link href=\"/posts\">가 있는가?",
            checked: true,
          },
          {
            id: "detail-post-1",
            text: "/posts/1에 접속하면 게시글 내용이 보이는가?",
            checked: true,
          },
          {
            id: "detail-post-999",
            text: "/posts/999에 접속하면 '찾을 수 없습니다' 메시지가 보이는가?",
            checked: true,
          },
          {
            id: "detail-return",
            text: "\"목록으로\"를 클릭하면 /posts로 돌아가는가?",
            checked: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    category: "Client Page + Deploy",
    title: "새 글 쓰기, 네비게이션, 모바일 점검까지 완성한 RED CHI 흐름",
    summary:
      "작성 페이지는 클라이언트 컴포넌트로 만들고, useRouter와 router.push로 저장 이후 이동을 처리한다.",
    route: "/posts/3",
    readTime: "5 min read",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(249, 115, 22, 0.26), rgba(251, 113, 133, 0.08), transparent)",
    sections: [
      {
        id: "new-post",
        title: "1. 새 글 쓰기 페이지에서 확인한 요소",
        body: [
          "작성 페이지는 입력 이벤트와 제출 로직이 있으므로 클라이언트 컴포넌트여야 한다. 그래서 파일 맨 위에 'use client'를 선언하고, useRouter를 next/navigation에서 가져오도록 정리했다.",
          "저장 버튼을 누르면 alert로 저장 완료를 보여준 뒤 router.push('/posts')로 목록 페이지로 이동한다. 이 흐름은 문서의 작성 페이지 요구사항을 그대로 반영한 것이다.",
        ],
        checklist: [
          {
            id: "new-use-client",
            text: "파일 맨 위에 \"use client\"가 있는가?",
            checked: true,
          },
          {
            id: "new-next-navigation",
            text: "useRouter를 next/navigation에서 import했는가?",
            checked: true,
          },
          {
            id: "new-no-next-router",
            text: "next/router를 사용하지 않았는가?",
            checked: true,
          },
          {
            id: "new-router-push",
            text: "router.push(\"/posts\") 로 이동하는가?",
            checked: true,
          },
          {
            id: "new-form-visible",
            text: "/posts/new에서 제목 input과 내용 textarea 폼이 보이는가?",
            checked: true,
          },
          {
            id: "new-submit-flow",
            text: "제목/내용 입력 후 저장하면 alert 이후 /posts로 이동하는가?",
            checked: true,
          },
        ],
      },
      {
        id: "navigation-deploy",
        title: "2. 공통 네비게이션과 배포 점검",
        body: [
          "layout.tsx의 네비게이션에는 홈, 블로그, 새 글 쓰기 3개 링크를 배치했다. 모든 페이지가 같은 레이아웃을 공유하므로 어느 주소로 이동해도 같은 네비게이션을 볼 수 있다.",
          "마지막 점검은 배포와 모바일이다. 실제 배포 주소는 my-first-lime.vercel.app이며, 레이아웃은 작은 화면에서도 카드와 체크리스트가 한 줄로 무너지지 않도록 모바일 우선으로 구성했다.",
          "추가로 문서 속 숨은 과제인 onSubmit, onClick, input, textarea의 의미도 작성 페이지 옆 설명 패널에 함께 넣어 실습 보고서에 활용할 수 있게 했다.",
        ],
        checklist: [
          {
            id: "nav-link-component",
            text: "네비게이션에서 <Link> 컴포넌트를 사용했는가?",
            checked: true,
          },
          {
            id: "nav-three-links",
            text: "홈, 블로그, 새 글 쓰기 3개 링크가 모두 있는가?",
            checked: true,
          },
          {
            id: "nav-consistent",
            text: "네비게이션이 모든 페이지에서 동일하게 보이는가?",
            checked: true,
          },
          {
            id: "deploy-three-pages",
            text: "배포된 URL에서 3페이지 모두 동작하는 구조인가?",
            checked: true,
          },
          {
            id: "deploy-mobile",
            text: "모바일에서도 레이아웃이 자연스럽게 보이는가?",
            checked: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    category: "Chapter 9 Auth",
    title: "이메일 로그인, 세션 유지, 보호 라우트까지 연결한 Ch9 인증 흐름",
    summary:
      "ch9A.md의 Supabase Authentication 학습 목표를 현재 Vercel 블로그에 맞춰 로그인/회원가입/마이페이지/보호 라우트로 구현했다.",
    route: "/posts/4",
    readTime: "7 min read",
    date: "2026-05-13",
    accent: "linear-gradient(90deg, rgba(244, 63, 94, 0.3), rgba(14, 165, 233, 0.08), transparent)",
    sections: [
      {
        id: "auth-principle",
        title: "1. 인증과 인가를 먼저 분리했다",
        body: [
          "Ch9A의 첫 번째 핵심은 인증(Authentication)과 인가(Authorization)를 구분하는 것이다. 인증은 사용자가 누구인지 확인하는 과정이고, 인가는 그 사용자가 무엇을 할 수 있는지 판단하는 과정이다.",
          "이번 배포에서는 인증된 사용자만 /mypage와 /posts/new에 들어갈 수 있게 만들었다. DB 권한이나 RLS 같은 인가 계층은 Supabase를 실제 연결하는 다음 단계에서 확장할 수 있다.",
        ],
        checklist: [
          {
            id: "ch9-auth-vs-authorization",
            text: "인증은 '누구인가', 인가는 '무엇을 할 수 있는가'로 구분했는가?",
            checked: true,
          },
          {
            id: "ch9-protected-scope",
            text: "보호할 경로를 /mypage와 /posts/new로 정했는가?",
            checked: true,
          },
        ],
      },
      {
        id: "auth-implementation",
        title: "2. 로그인과 세션 유지 흐름을 구현했다",
        body: [
          "로그인 화면은 아이디 또는 이메일과 비밀번호를 입력받고, 서버 라우트가 인증 정보를 확인한 뒤 HttpOnly 쿠키를 발급한다. 클라이언트에서는 AuthContext가 현재 사용자와 로딩 상태를 관리한다.",
          "새로고침 후에도 /api/auth/session이 쿠키를 확인해 사용자를 복원한다. 로그아웃을 누르면 서버가 쿠키를 만료시켜 보호 페이지 접근이 다시 로그인 화면으로 돌아간다.",
        ],
        checklist: [
          {
            id: "ch9-login-page",
            text: "/login 페이지에서 이메일/비밀번호 로그인 흐름이 동작하는가?",
            checked: true,
          },
          {
            id: "ch9-signup-page",
            text: "/signup 페이지에서 회원가입과 이메일 확인 흐름을 설명하는가?",
            checked: true,
          },
          {
            id: "ch9-auth-context",
            text: "AuthProvider와 useAuth로 전역 인증 상태를 제공하는가?",
            checked: true,
          },
          {
            id: "ch9-session-cookie",
            text: "세션을 HttpOnly 쿠키로 유지하는가?",
            checked: true,
          },
        ],
      },
      {
        id: "auth-deploy",
        title: "3. GitHub와 Vercel 제출 기준에 맞게 정리했다",
        body: [
          "ch9A.md 원문은 저장소의 docs 폴더에 포함하고, Vercel 화면에는 /chapter-9 페이지로 학습 목표와 체크리스트를 노출했다.",
          "실제 Supabase 프로젝트를 연결할 때는 @supabase/ssr 기반 client/server helper와 Supabase Email Provider 설정으로 교체하면 된다. 이번 구현은 Supabase 키가 없는 상태에서도 Ch9A의 사용자 흐름을 검증할 수 있게 만든 학습용 버전이다.",
        ],
        checklist: [
          {
            id: "ch9-docs-copy",
            text: "docs/ch9A.md가 저장소에 들어가는가?",
            checked: true,
          },
          {
            id: "ch9-vercel-page",
            text: "Vercel에서 /chapter-9 페이지로 Ch9 내용을 볼 수 있는가?",
            checked: true,
          },
          {
            id: "ch9-supabase-next-step",
            text: "Supabase 전환에 필요한 파일 구조와 설정 포인트를 남겼는가?",
            checked: true,
          },
        ],
      },
    ],
  },
];
