import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "大连数论与算术几何研讨会",
  description:
    "Dalian Number Theory and Arithmetic Geometry Conference, Aug 16-21, 2026.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
