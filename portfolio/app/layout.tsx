import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import Galaxy from "../components/Galaxy";

const body = Space_Grotesk({ subsets: ["latin"], variable: "--f-body" });
const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-display",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-tino-eight.vercel.app"),
  title: {
    default: "Tinotenda Mutenda | Junior Web Developer",
    template: "%s | Tinotenda Mutenda",
  },
  description:
    "Portfolio of Tinotenda Mutenda, a junior web developer in Johannesburg building with Next.js, Tailwind and Supabase.",
  openGraph: {
    title: "Tinotenda Mutenda | Junior Web Developer",
    description:
      "Projects, skills and a contact form from a junior web developer in Johannesburg.",
    url: "/",
    siteName: "Tinotenda Mutenda",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <Galaxy />

        <div className="relative z-10">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2 focus:text-black focus:underline"
          >
            Skip to content
          </a>

          <header className="site-header">
            <nav
              aria-label="Main"
              className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2 sm:px-6"
            >
              <Link href="/" className="brand mr-auto">
                TINO<span>.</span>
              </Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/skills" className="nav-link">Skills</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/login" className="nav-link">Login</Link>
            </nav>
          </header>

          <main
            id="main"
            className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"
          >
            {children}
          </main>

          <footer className="site-footer">
            <div className="mx-auto flex max-w-4xl flex-wrap gap-x-6 gap-y-2 px-4 py-8 text-sm sm:px-6">
              <p className="muted mr-auto">© 2026 Tinotenda Mutenda</p>
              <a
                href="https://github.com/tin0-0"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tinotenda-mutenda"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}