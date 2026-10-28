"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function ProjectForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Saving...");

    const { error } = await supabaseBrowser
      .from("projects")
      .insert({ title, slug, summary });

    if (error) {
      setMessage(`Could not save: ${error.message}`);
      return;
    }

    setTitle("");
    setSlug("");
    setSummary("");
    setMessage("Project added!");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-4">
      <h2 className="text-xl font-semibold">Add a project</h2>
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
        Slug (lowercase, hyphens)
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
      <button type="submit" className="rounded bg-black p-2 text-white">
        Add project
      </button>
      <p>{message}</p>
    </form>
  );
}