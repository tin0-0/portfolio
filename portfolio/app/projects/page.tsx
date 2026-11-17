import { Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Projects",
  description:
    "Websites and apps I have built, with a full case study for each one.",
};

async function ProjectList() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p>Could not load projects.</p>;
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {data?.map((project) => (
        <article key={project.id} className="card">
          <h2 className="display text-3xl">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0"
            >
              {project.title}
            </Link>
          </h2>
          <p className="muted mt-2">{project.summary}</p>

          {project.stack?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech: string) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <p className="accent mt-4 text-sm">Read the case study →</p>
        </article>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <section>
      <p className="eyebrow">Selected work</p>
      <h1 className="display mt-2 text-5xl sm:text-6xl">Projects</h1>
      <Suspense fallback={<p className="mt-8">Loading projects...</p>}>
        <ProjectList />
      </Suspense>
    </section>
  );
}