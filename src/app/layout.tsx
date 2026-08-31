import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Souhail Ziani", template: "%s — Souhail Ziani" },
  description: "Portfolio of Souhail Ziani — developer, graphic designer, typographer and author.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yqy8lqf.css" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
