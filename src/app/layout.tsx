import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Yozakura",
  description: "Bem vindo ao blog Yozakura",
  keywords: ["blog", "yozakura", "nextjs"],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Blog Yozakura",
    description: "Bem vindo ao blog Yozakura",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
