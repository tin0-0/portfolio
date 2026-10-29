import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import ProjectForm from "./project-form";
import ProjectList from "./project-list";

async function AdminContent() {
  await connection();

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at");

  return (
    <>
      <p className="mt-4">You are logged in as {user.email}.</p>
      <ProjectForm />
      <ProjectList projects={projects ?? []} />
    </>
  );
}

export default function AdminPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Admin</h1>
      <Suspense fallback={<p className="mt-4">Checking login...</p>}>
        <AdminContent />
      </Suspense>
    </section>
  );
}