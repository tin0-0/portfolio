"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: real people never see this field, so only bots fill it in.
    if (trap !== "") {
      setStatus("Thanks! Your message was sent.");
      return;
    }

    setSending(true);
    setStatus("");

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    setSending(false);

    if (error) {
      setStatus("Sorry, something went wrong. Please try again.");
      return;
    }

    setName("");
    setEmail("");
    setMessage("");
    setStatus("Thanks! Your message was sent.");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
          className="rounded border border-gray-500 p-2 text-base"
        />
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={200}
          required
          className="rounded border border-gray-500 p-2 text-base"
        />
      </label>

      <label className="flex flex-col gap-1">
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          rows={5}
          required
          className="rounded border border-gray-500 p-2 text-base"
        />
      </label>

      {/* Honeypot field: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Leave this field empty
          <input
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="min-h-11 rounded bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send message"}
      </button>

      <p role="status">{status}</p>
    </form>
  );
}
