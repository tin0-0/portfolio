import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-gray-700">
        Have a project or a role in mind? Send me a message.
      </p>

      <a
        href="/tinotenda-mutenda-cv.pdf"
        download
        className="mt-4 inline-block min-h-11 rounded border border-black px-4 py-2 underline"
      >
        Download my CV (PDF)
      </a>

      <ContactForm />
    </section>
  );
}