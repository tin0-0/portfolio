import Link from "next/link";

const skills = [
  { name: "Next.js", proof: "/projects/medi-clinic", label: "Medi-Clinic" },
  { name: "Tailwind CSS", proof: "/projects/medi-clinic", label: "Medi-Clinic" },
  { name: "Supabase (Auth, RLS)", proof: "https://github.com/tin0-0/portfolio", label: "This portfolio's repo" },
  { name: "HTML, CSS, JavaScript", proof: "/projects/bk-autospares", label: "BK Autospares" },
  { name: "Deploying on Vercel", proof: "/projects/impact-international-learning", label: "Impact International Learning" },
];

export default function SkillsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Skills</h1>
      <p className="mt-2 text-gray-600">Each skill links to something that proves it.</p>
      <ul className="mt-6 flex flex-col gap-4">
        {skills.map((skill) => (
          <li key={skill.name} className="border-b pb-4">
            <p className="font-medium">{skill.name}</p>
            <p className="text-sm">
              Evidence:{" "}
              {skill.proof.startsWith("/") ? (
                <Link href={skill.proof} className="underline">
                  {skill.label}
                </Link>
              ) : (
                <a href={skill.proof} className="underline" target="_blank" rel="noreferrer">
                  {skill.label}
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}