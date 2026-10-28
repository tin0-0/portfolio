import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tino's Portfolio",
  description: "Junior web developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 border-b p-4">
          <Link href="/" className="font-semibold">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link> 
        </nav>
        <main className="mx-auto max-w-3xl p-6">{children}</main>
      </body>
    </html>
  );
}