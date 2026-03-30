import "./globals.css";

export const metadata = {
  title: "전영준 소개 페이지",
  description: "공공인재빅데이터융합학 전공 전영준의 Chapter 2 자기소개 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
