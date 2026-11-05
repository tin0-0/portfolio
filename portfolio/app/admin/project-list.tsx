"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  ProjectFields,
  emptyValues,
  fromProject,
  toDbRow,
  type Project,
  type ProjectValues,
} from "./project-fields";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<ProjectValues>(emptyValues);
  const [message, setMessage] = useState("");

  function handleChange(name: keyof ProjectValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setValues(fromProject(project));
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setMessage("");
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Saving...");

    const { error } = await supabaseBrowser
      .from("projects")
      .update(toDbRow(values))
      .eq("id", editingId);

    if (error) {
      setMessage(`Could not save: ${error.message}`);
      return;
    }

    setEditingId(null);
    setMessage("");
    router.refresh();
  }

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
      {projects.map((project) =>
        project.id === editingId ? (
          <form
            key={project.id}
            onSubmit={handleSave}
            className="mt-4 flex max-w-md flex-col gap-3 border-b pb-4"
          >
            <ProjectFields values={values} onChange={handleChange} />
            <div className="flex gap-3">
              <button type="submit" className="rounded bg-black px-3 py-1 text-white">
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded border px-3 py-1"
              >
                Cancel
              </button>
            </div>
            <p>{message}</p>
          </form>
        ) : (
          <div
            key={project.id}
            className="mt-4 flex items-center gap-4 border-b pb-4"
          >
            <div className="flex-1">
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-gray-500">{project.slug}</p>
            </div>
            <button
              onClick={() => startEdit(project)}
              className="rounded border px-3 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              className="rounded border border-red-600 px-3 py-1 text-red-600"
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}