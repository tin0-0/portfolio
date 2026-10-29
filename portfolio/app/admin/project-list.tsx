"use client";

import { useState } from "react";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");

  function startEdit(project: Project) {
    setEditingId(project.id);
    setTitle(project.title);
    setSlug(project.slug);
    setSummary(project.summary);
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
      .update({ title, slug, summary })
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
            <label className="flex flex-col gap-1">
              Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded border p-2"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              Slug
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="rounded border p-2"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              Summary
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="rounded border p-2"
                rows={3}
                required
              />
            </label>
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