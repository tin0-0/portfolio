import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <article>
      <Link href="/projects" className="text-sm text-gray-500">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 text-gray-600">{project.summary}</p>

      <div className="mt-4 flex gap-4">
        {project.live_url && (
          <a href={project.live_url} className="underline" target="_blank" rel="noreferrer">
            Live site
          </a>
        )}
        {project.repo_url && (
          <a href={project.repo_url} className="underline" target="_blank" rel="noreferrer">
            Repository
          </a>
        )}
      </div>

      {project.problem && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">The problem</h2>
          <p className="mt-2">{project.problem}</p>
        </section>
      )}

      {project.role && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">My role</h2>
          <p className="mt-2">{project.role}</p>
        </section>
      )}

      {project.stack?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Stack</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <li key={tech} className="rounded border px-2 py-1 text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.screenshots?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Screenshots</h2>
          <div className="mt-2 flex flex-col gap-4">
            {project.screenshots.map((src: string) => (
              <Image
                key={src}
                src={src}
                alt={`Screenshot of ${project.title}`}
                width={1200}
                height={750}
                className="h-auto w-full rounded border"
              />
            ))}
          </div>
        </section>
      )}

      {project.next_steps && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">What I would do next</h2>
          <p className="mt-2">{project.next_steps}</p>
        </section>
      )}
    </article>
  );
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading project...</p>}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}