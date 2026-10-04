import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b11",
};

export const metadata: Metadata = {
  title: "Linux生态圈 · 现代化运维与开源应用中心 | x.zttz.eu.org",
  description: "Linux生态圈 (x.zttz.eu.org) - 一键脚本管理 Linux 服务器、网络调优、建站、Docker 容器与 128+ 现代化应用市场及 [Github乐园]，100% 开源兼容。",
  keywords: ["Linux生态圈", "Github乐园", "Linux脚本", "应用市场", "Docker管理", "BBRv3", "手风琴菜单", "1Panel", "Deepseek"],
  authors: [{ name: "Linux生态圈", url: "https://x.zttz.eu.org" }],
  metadataBase: new URL("https://x.zttz.eu.org"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth dark">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-[#080b11] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
