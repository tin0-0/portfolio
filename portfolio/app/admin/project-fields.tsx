"use client";

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem?: string | null;
  role?: string | null;
  stack?: string[] | null;
  live_url?: string | null;
  repo_url?: string | null;
  next_steps?: string | null;
  screenshots?: string[] | null;
  sort_order?: number | null;
};

export type ProjectValues = {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  role: string;
  stack: string;
  live_url: string;
  repo_url: string;
  next_steps: string;
  screenshots: string;
  sort_order: string;
};

export const emptyValues: ProjectValues = {
  title: "",
  slug: "",
  summary: "",
  problem: "",
  role: "",
  stack: "",
  live_url: "",
  repo_url: "",
  next_steps: "",
  screenshots: "",
  sort_order: "0",
};

function toList(text: string) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toDbRow(v: ProjectValues) {
  return {
    title: v.title,
    slug: v.slug,
    summary: v.summary,
    problem: v.problem || null,
    role: v.role || null,
    stack: toList(v.stack),
    live_url: v.live_url || null,
    repo_url: v.repo_url || null,
    next_steps: v.next_steps || null,
    screenshots: toList(v.screenshots),
    sort_order: Number(v.sort_order) || 0,
  };
}

export function fromProject(p: Project): ProjectValues {
  return {
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    problem: p.problem ?? "",
    role: p.role ?? "",
    stack: (p.stack ?? []).join(", "),
    live_url: p.live_url ?? "",
    repo_url: p.repo_url ?? "",
    next_steps: p.next_steps ?? "",
    screenshots: (p.screenshots ?? []).join(", "),
    sort_order: String(p.sort_order ?? 0),
  };
}

const fields: {
  name: keyof ProjectValues;
  label: string;
  multiline?: boolean;
  required?: boolean;
  type?: string;
}[] = [
  { name: "title", label: "Title", required: true },
  { name: "slug", label: "Slug (lowercase, hyphens)", required: true },
  { name: "summary", label: "Summary", multiline: true, required: true },
  { name: "problem", label: "Problem", multiline: true },
  { name: "role", label: "My role", multiline: true },
  { name: "stack", label: "Stack (separate with commas)" },
  { name: "live_url", label: "Live URL" },
  { name: "repo_url", label: "Repo URL" },
  { name: "next_steps", label: "What I would do next", multiline: true },
  { name: "screenshots", label: "Screenshots (paths, separated with commas)" },
  { name: "sort_order", label: "Sort order (0 shows first)", type: "number" },
];

export function ProjectFields({
  values,
  onChange,
}: {
  values: ProjectValues;
  onChange: (name: keyof ProjectValues, value: string) => void;
}) {
  return (
    <>
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1">
          {f.label}
          {f.multiline ? (
            <textarea
              value={values[f.name]}
              onChange={(e) => onChange(f.name, e.target.value)}
              className="rounded border p-2"
              rows={3}
              required={f.required}
            />
          ) : (
            <input
              type={f.type ?? "text"}
              value={values[f.name]}
              onChange={(e) => onChange(f.name, e.target.value)}
              className="rounded border p-2"
              required={f.required}
            />
          )}
        </label>
      ))}
    </>
  );
}