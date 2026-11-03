import { Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
    <>
      {data?.map((project) => (
        <div key={project.id} className="mt-6">
          <h2 className="text-xl font-semibold">
            <Link href={`/projects/${project.slug}`} className="underline">
              {project.title}
            </Link>
          </h2>
          <p className="mt-2 text-gray-600">{project.summary}</p>
        </div>
      ))}
    </>
  );
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Projects</h1>
      <Suspense fallback={<p className="mt-6">Loading projects...</p>}>
        <ProjectList />
      </Suspense>
    </section>
  );
}