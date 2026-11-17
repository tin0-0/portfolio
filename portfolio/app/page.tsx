import Link from "next/link";

export default function Home() {
  return (
    <section className="py-8 sm:py-16">
      <p className="eyebrow">Junior web developer · Johannesburg</p>

      <h1 className="display mt-4 text-6xl sm:text-8xl">
        I build websites that work for <span className="gold">real businesses</span>.
      </h1>

      <p className="muted mt-6 max-w-xl text-lg">
        I&apos;m Tinotenda, an IT Programming student at Unicollege. I build with
        Next.js, Tailwind and Supabase, and I&apos;m looking for a junior
        front-end or full-stack role.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className="btn btn-primary">
          See my projects
        </Link>
        <a href="/tinotenda-mutenda-cv.pdf" download className="btn btn-ghost">
          Download CV
        </a>
        <Link href="/contact" className="btn btn-ghost">
          Get in touch
        </Link>
      </div>
    </section>
  );
}