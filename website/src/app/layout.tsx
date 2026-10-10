import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b11",
};

export const metadata: Metadata = {
  title: "CODE MATRIX 代码矩阵 | 用代码 · 爱上Linux",
  description: "CODE MATRIX 代码矩阵 (zttz.eu.org) - 用代码 · 爱上Linux。管理 Linux 服务器、网络调优、建站、Docker 容器与 160+ 现代化应用市场及 [GitHub乐园]，100% 开源兼容。",
  keywords: ["Linux生态", "Github乐园", "Linux脚本", "应用市场", "Docker管理", "BBRv3", "手风琴菜单", "1Panel", "Deepseek"],
  authors: [{ name: "CODE MATRIX 代码矩阵", url: "https://zttz.eu.org" }],
  metadataBase: new URL("https://zttz.eu.org"),
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
  // 首屏防闪烁脚本：优先读取 localStorage 用户手动偏好；若无手动偏好则计算北京时间 (06:00-17:59 白天，其余黑夜)
  const themeInitScript = `
    (function() {
      try {
        var preference = localStorage.getItem('theme_preference');
        var isLight = false;
        if (preference === 'light') {
          isLight = true;
        } else if (preference === 'dark') {
          isLight = false;
        } else {
          // 默认自动 (auto)：计算北京时间 UTC+8
          var now = new Date();
          var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          var bjHour = new Date(utc + (8 * 3600000)).getHours();
          isLight = (bjHour >= 6 && bjHour < 18);
        }
        if (isLight) {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="zh-CN" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-[#080b11] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
