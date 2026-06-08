export type PostSection = {
  id: string;
  title: string;
  body: string[];
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
  siteName: "전영준의 네온 블로그",
  tagline: "AI, 웹 개발, 대학 생활을 기록하는 개인 블로그",
  introduction: "AI와 웹 개발을 공부하며 직접 만든 프로젝트와 배운 내용을 기록합니다.",
  deploymentUrl: "https://my-first-lime.vercel.app",
};

export const posts: Post[] = [
  {
    id: 1,
    category: "개발 기록",
    title: "블로그 프로젝트를 시작하며 배운 것",
    summary: "처음 블로그 화면을 구성하면서 개인 기록에 어울리는 구조와 문구를 다듬은 과정을 남겼습니다.",
    route: "/posts/1",
    readTime: "4분",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(251, 113, 133, 0.28), rgba(239, 68, 68, 0.08), transparent)",
    sections: [
      {
        id: "start",
        title: "처음 정한 방향",
        body: [
          "개인 블로그는 첫 화면에서 어떤 사람의 기록인지 바로 보여주는 것이 중요하다고 느꼈습니다.",
          "붉은 네온 분위기는 유지하되 글을 읽기 편하도록 여백과 카드 구성을 정리했습니다.",
        ],
      },
      {
        id: "structure",
        title: "기록하기 좋은 구조",
        body: [
          "홈에서는 블로그의 방향을 소개하고, 목록에서는 글을 빠르게 찾을 수 있게 구성했습니다.",
          "제목과 요약이 자연스럽게 보이도록 학습용 표현을 줄이고 개인 기록에 가까운 문장으로 바꿨습니다.",
        ],
      },
    ],
  },
  {
    id: 2,
    category: "프로젝트 기록",
    title: "게시글 목록과 상세 페이지 만들기",
    summary: "글 목록에서 원하는 글을 고르고 상세 페이지에서 내용을 읽는 기본 흐름을 정리했습니다.",
    route: "/posts/2",
    readTime: "6분",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(239, 68, 68, 0.3), rgba(217, 70, 239, 0.08), transparent)",
    sections: [
      {
        id: "list",
        title: "읽기 쉬운 글 목록",
        body: [
          "게시글 카드는 제목, 요약, 작성일이 한눈에 들어오도록 단순하게 만들었습니다.",
          "카테고리도 개발 기록, 프로젝트 기록, 학습 노트처럼 실제 블로그에서 볼 수 있는 이름으로 정리했습니다.",
        ],
      },
      {
        id: "detail",
        title: "상세 페이지에서 중요한 것",
        body: [
          "상세 페이지에서는 글 내용에 집중할 수 있도록 불필요한 설명을 덜어냈습니다.",
          "목록으로 돌아가기, 수정하기, 삭제하기 버튼은 필요한 사람에게만 보이도록 구성했습니다.",
        ],
      },
    ],
  },
  {
    id: 3,
    category: "학습 노트",
    title: "글 작성 기능과 모바일 화면 점검",
    summary: "새 글을 작성하고 저장한 뒤 작은 화면에서도 블로그가 자연스럽게 보이는지 확인했습니다.",
    route: "/posts/3",
    readTime: "5분",
    date: "2026-04-09",
    accent: "linear-gradient(90deg, rgba(249, 115, 22, 0.26), rgba(251, 113, 133, 0.08), transparent)",
    sections: [
      {
        id: "writing",
        title: "글을 남기는 경험",
        body: [
          "새 글 쓰기 화면은 제목과 내용 입력에 집중할 수 있도록 단순하게 정리했습니다.",
          "저장 후에는 작성한 글을 바로 확인할 수 있어 기록을 이어가는 흐름이 끊기지 않습니다.",
        ],
      },
      {
        id: "mobile",
        title: "모바일에서의 화면",
        body: [
          "모바일에서는 카드가 너무 복잡해 보이지 않도록 문구와 여백을 조정했습니다.",
          "버튼과 입력창은 손가락으로 누르기 편한 크기를 유지하도록 확인했습니다.",
        ],
      },
    ],
  },
  {
    id: 4,
    category: "개발 기록",
    title: "로그인 기능을 블로그에 연결하기",
    summary: "회원만 글을 작성하고 자신의 글을 관리할 수 있도록 로그인 흐름을 블로그 화면에 연결했습니다.",
    route: "/posts/4",
    readTime: "7분",
    date: "2026-05-13",
    accent: "linear-gradient(90deg, rgba(244, 63, 94, 0.3), rgba(14, 165, 233, 0.08), transparent)",
    sections: [
      {
        id: "login",
        title: "회원 전용 글쓰기",
        body: [
          "개인 블로그라도 글을 쓰고 관리하는 화면은 로그인한 사용자에게만 열려야 합니다.",
          "로그인하면 새 글 작성, 내 글 수정, 삭제 기능을 사용할 수 있도록 기본 관리 흐름을 연결했습니다.",
        ],
      },
      {
        id: "manage",
        title: "내 글 관리하기",
        body: [
          "게시글 상세 페이지에서는 작성자에게만 수정과 삭제 버튼이 보입니다.",
          "읽는 사람에게는 조용한 글 화면을, 작성자에게는 필요한 관리 도구를 보여주는 방향으로 정리했습니다.",
        ],
      },
    ],
  },
];
