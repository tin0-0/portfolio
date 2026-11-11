# Tino's Portfolio

**Live site:** https://portfolio-tino-eight.vercel.app

A personal portfolio site that shows my work to employers and freelance clients. It is also a working full-stack app: project entries live in Supabase and are managed from a protected admin page.

## Who it's for
Recruiters, hiring managers and freelance clients looking for a junior web developer.

## Role I'm aiming for
Junior front-end or full-stack developer.

## Pages
- **Home:** introduction
- **About:** who I am and the role I want
- **Projects:** project entries read from Supabase
- **Case study** (`/projects/[slug]`): the full case study for each project, covering the problem, my role, the stack, screenshots, links and what I would do next
- **Skills:** every skill links to evidence
- **Contact:** a contact form that saves to Supabase, and a CV download
- **Login** and **Admin:** Supabase Auth sign-in and a protected page where I add, edit and delete projects

## Tech stack
Next.js (App Router), React, TypeScript, Tailwind CSS, Supabase (database and Auth), deployed on Vercel.

## Supabase setup

### Table `projects`
Columns: id, title, slug, summary, problem, role, stack, screenshots, live_url, repo_url, next_steps, featured, sort_order, created_at.

- Row Level Security (RLS) is on.
- Anyone can **read** projects (the public Projects page).
- Only the owner (my signed-in user) can **insert, update and delete**.
- Public signups are turned off, so nobody else can create an account.

### Table `contact_messages`
Columns: id, name, email, message, created_at.

- RLS is on.
- Visitors can **insert** a message but cannot read any.
- Only the owner can **read** messages.
- Length limits are enforced in the database (name up to 100 characters, email up to 200, message up to 2000).

### How I proved it
In the Supabase Table Editor, using the `anon` role: inserting into `projects` fails with error 42501 ("new row violates row-level security policy"). Inserting into `contact_messages` works, but the table looks empty to `anon`, so a visitor cannot read other people's messages.

## Spam protection
I used a **honeypot field**: a hidden form field that real people never see, so a bot that fills in every field gets caught. When it is filled, the form pretends to succeed and saves nothing. The database length limits are a second layer.

## Accessibility and responsive design
- Mobile-first layout, checked at phone, tablet and desktop widths.
- The nav wraps on small screens, and links and buttons have comfortable tap sizes.
- A "Skip to content" link, and a visible focus outline on links, buttons and form fields for keyboard users.
- Dark mode text and form fields adjusted for readable contrast.

## Environment variables
Create a `.env.local` file in the app folder with these names. The values come from Supabase, under Project Settings, API.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No secrets are committed to this repo.

## Run it locally
1. Clone the repo and open the `portfolio/` subfolder, which holds the Next.js app.
2. Run `npm install`.
3. Create `.env.local` as above.
4. Run `npm run dev` and open http://localhost:3000.

## AI use
I used Claude as a tutor and reviewer while building this site. It explained concepts such as RLS, server and client components and dynamic routes, reviewed my code, helped me debug errors, and gave me example code and full file versions that I pasted in, tested and adapted. I wrote my own About text, and Claude helped tighten my case study wording. My CV was drafted with Claude's help from details I gave it. [Edit this so it is exactly true for you.]

The Medi-Clinic project was built with help from AI, starting from the Next.js Learn dashboard tutorial. I built the login and most of the styling myself.

## Reflections

### Milestone 4
I chose a honeypot field for spam protection, because it needs no third-party service and a bot that fills in every field gets caught, and I added length limits in the database as a second layer. Visitors can only add messages and only I can read them, which I proved by testing as the `anon` role in Supabase. The worst layout bug I fixed was in dark mode: the project descriptions were dark grey on a near-black background and nearly unreadable on my phone, so I lightened the greys and gave the form fields dark backgrounds.