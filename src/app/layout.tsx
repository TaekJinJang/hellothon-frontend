import "./globals.css";

import AlertWrapper from "@/components/AlertWrapper";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});
export const metadata: Metadata = {
  title: "insense",
  description: "인센스 : 인스타그램의 댓글을 센스있게 추천해주는 플랫폼",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "AI HelloThon 6조",
      url: "https://github.com/ai-hellothon-2024-6th",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://xaekxtkwpxqaaqyh.tunnel-pt.elice.io",
    title: "insense",
    description: "인센스 : 인스타그램의 댓글을 센스있게 추천해주는 플랫폼",
    siteName: "insense",
    images: "../../public/imgs/logo.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <AlertWrapper />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};
export default RootLayout;
