# Tino's Portfolio

**Live site:** [paste your Vercel URL here]

A personal portfolio site that shows my work to employers and freelance clients.

## Who it's for
Recruiters, hiring managers and freelance clients looking for a junior web developer.

## Role I'm aiming for
[Junior front-end / web developer, in your own words]

## Pages
- **Home:** introduction and featured work
- **Projects:** reads project entries from Supabase
- **Contact:** contact page (form coming in a later milestone)
- **Login:** Supabase Auth sign-in
- **Admin:** protected page where I add and delete projects (edit coming)

## Tech stack
Next.js (App Router), React, TypeScript, Tailwind CSS, Supabase (database + Auth), deployed on Vercel.

## Supabase setup
- **Table `projects`:** id, title, slug, summary, problem, role, stack, screenshots, live_url, repo_url, next_steps, featured, sort_order, created_at
- **Row Level Security is enabled** on the table, with two policies:
  - Anyone can **read** projects (public Projects page)
  - Only the owner (my signed-in user) can **insert, update and delete**
- **Public signups are disabled**, so nobody else can create an account.
- **How I proved it:** as the `anon` role in the Supabase Table Editor I tried to insert a row, and it was rejected with `42501: new row violates row-level security policy`.

## Environment variables
Create a `.env.local` file in the project root with these names (values come from Supabase → Project Settings → API):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No secrets are committed to this repo.

## Run it locally
1. Clone the repo and run `npm install`
2. Create `.env.local` as above
3. Run `npm run dev` and open http://localhost:3000

## AI use
I used Claude as a tutor while building this: it explained concepts and reviewed my code, and I wrote and tested the code myself, [edit this to match what really happened].