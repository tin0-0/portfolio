import type { MetadataRoute } from "next";

const base = "https://portfolio-tino-eight.vercel.app";
const pages = ["", "/about", "/projects", "/skills", "/contact"];
// Add a slug here whenever you add a new project
const projectSlugs = [
  "medi-clinic",
  "impact-international-learning",
  "bk-autospares",
  "off-script-tko",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...projectSlugs.map((s) => `/projects/${s}`)].map(
    (path) => ({ url: `${base}${path}` })
  );
}