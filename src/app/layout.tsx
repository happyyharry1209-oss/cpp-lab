import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: {
    default: "C++ Lab｜從基礎到二分搜尋",
    template: "%s｜C++ Lab",
  },
  description:
    "一個為 C++ 初學者設計的互動學習網站，從語法、陣列到二分搜尋，透過提示與即時批改逐步建立程式能力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" data-scroll-behavior="smooth">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
