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
  deploymentUrl: "https://my-first-web-red-chi.vercel.app",
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
          "마지막 점검은 배포와 모바일이다. 실제 배포 주소는 my-first-web-red-chi.vercel.app이며, 레이아웃은 작은 화면에서도 카드와 체크리스트가 한 줄로 무너지지 않도록 모바일 우선으로 구성했다.",
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
];
