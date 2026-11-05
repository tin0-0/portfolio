"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  ProjectFields,
  emptyValues,
  toDbRow,
  type ProjectValues,
} from "./project-fields";

export default function ProjectForm() {
  const router = useRouter();
  const [values, setValues] = useState<ProjectValues>(emptyValues);
  const [message, setMessage] = useState("");

  function handleChange(name: keyof ProjectValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Saving...");

    const { error } = await supabaseBrowser
      .from("projects")
      .insert(toDbRow(values));

    if (error) {
      setMessage(`Could not save: ${error.message}`);
      return;
    }

    setValues(emptyValues);
    setMessage("Project added!");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-4">
      <h2 className="text-xl font-semibold">Add a project</h2>
      <ProjectFields values={values} onChange={handleChange} />
      <button type="submit" className="rounded bg-black p-2 text-white">
        Add project
      </button>
      <p>{message}</p>
    </form>
  );
}