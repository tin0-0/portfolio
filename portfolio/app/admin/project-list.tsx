"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;

    const { error } = await supabaseBrowser
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(`Could not delete: ${error.message}`);
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Your projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mt-4 flex items-center gap-4 border-b pb-4">
          <div className="flex-1">
            <p className="font-medium">{project.title}</p>
            <p className="text-sm text-gray-500">{project.slug}</p>
          </div>
          <button
            onClick={() => handleDelete(project.id)}
            className="rounded border border-red-600 px-3 py-1 text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}