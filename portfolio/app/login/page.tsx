"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Signing in...");

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login failed. Check your email and password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="mt-6 flex max-w-sm flex-col gap-4">
        <label className="flex flex-col gap-1">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border p-2"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border p-2"
            required
          />
        </label>
        <button type="submit" className="rounded bg-black p-2 text-white">
          Sign in
        </button>
        <p>{message}</p>
      </form>
    </section>
  );
}