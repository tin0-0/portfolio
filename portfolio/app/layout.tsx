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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-white focus:p-2 focus:underline"
        >
          Skip to content
        </a>
        <nav
          aria-label="Main"
          className="flex flex-wrap gap-x-6 gap-y-1 border-b px-4 py-2"
        >
          <Link href="/" className="py-2 font-semibold">Home</Link>
          <Link href="/about" className="py-2">About</Link>
          <Link href="/projects" className="py-2">Projects</Link>
          <Link href="/skills" className="py-2">Skills</Link>
          <Link href="/contact" className="py-2">Contact</Link>
          <Link href="/login" className="py-2">Login</Link>
        </nav>
        <main id="main" className="mx-auto max-w-3xl p-4 sm:p-6">
          {children}
        </main>
      </body>
    </html>
  );
}