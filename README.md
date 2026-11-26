# Tinotenda Mutenda | Portfolio

A personal portfolio site for an IT Programming student and aspiring software developer in Johannesburg, South Africa. It shows my projects (each with a full case study), my skills, and a contact form, and it has a login for the admin side. It also includes work I have built for real clients.

**Live site:** https://portfolio-tino-eight.vercel.app
**Video walkthrough:** https://youtu.be/uOuGggmuPk4

## Built with

- Next.js (App Router) and React
- Tailwind CSS
- Supabase (Postgres database and authentication)
- Vercel (hosting)
- A custom canvas starfield background (`components/Galaxy.tsx`)

## Pages

| Route | What it does |
| --- | --- |
| `/` | Home page with intro |
| `/about` | About me |
| `/projects` | Project list, loaded from Supabase, with a case study per project |
| `/skills` | Skills |
| `/contact` | Contact form, saved to the database |
| `/login` | Login for the admin area |
| `/admin` | Admin area (login required) |

## Run it locally

1. Clone the repo and open the project folder (the one that contains `package.json`).

   ```bash
   git clone https://github.com/tin0-0/[REPO-NAME].git
   cd [REPO-NAME]
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a file named `.env.local` in the project root (see the next section).

4. Start the dev server.

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000.

## Environment variables

Create `.env.local` with these names. Get the values from your own Supabase project (Project Settings, then API). Never commit this file; it is listed in `.gitignore`.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The anon key is designed to be public and is protected by Row Level Security. No service role key is used anywhere in this project.

## Supabase setup

1. Create a new project at https://supabase.com.
2. In the SQL editor, create the tables the site uses.

   create table public.contact_messages (
  id uuid not null default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone null default now(),
  constraint contact_messages_pkey primary key (id),
  constraint contact_messages_email_check check (char_length(email) >= 3 and char_length(email) <= 200),
  constraint contact_messages_message_check check (char_length(message) >= 1 and char_length(message) <= 2000),
  constraint contact_messages_name_check check (char_length(name) >= 1 and char_length(name) <= 100)
);

create table public.projects (
  id uuid not null default gen_random_uuid(),
  title text not null,
  slug text not null,
  summary text not null,
  problem text null,
  role text null,
  stack text[] null default '{}'::text[],
  screenshots text[] null default '{}'::text[],
  live_url text null,
  repo_url text null,
  next_steps text null,
  featured boolean null default false,
  created_at timestamp with time zone null default now(),
  sort_order integer null default 0,
  constraint projects_pkey primary key (id),
  constraint projects_slug_key unique (slug)
);

3. Turn on Row Level Security for every table.

   ```sql
   alter table projects enable row level security;
   alter table contact_messages enable row level security;
   ```

4. Add the policies.

   -- 3. Turn on Row Level Security
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

-- 4. Policies
-- Replace YOUR-ADMIN-USER-UUID with the ID of your admin user
-- (Supabase dashboard > Authentication > Users)

-- projects: anyone can read, only the owner can write
create policy "Public can read projects"
on public.projects for select
to public
using (true);

create policy "Owner can write projects"
on public.projects for all
to authenticated
using ((select auth.uid()) = 'YOUR-ADMIN-USER-UUID'::uuid)
with check ((select auth.uid()) = 'YOUR-ADMIN-USER-UUID'::uuid);

-- contact_messages: anyone can send, only the owner can read
create policy "Anyone can send a message"
on public.contact_messages for insert
to anon, authenticated
with check (true);

create policy "Owner can read messages"
on public.contact_messages for select
to authenticated
using ((select auth.uid()) = 'YOUR-ADMIN-USER-UUID'::uuid);

5. Create an admin user under Authentication, then Users, and use those details on the `/login` page.

## How Supabase is used

- **Auth:** Supabase Auth handles login. A logged-in user gets a session and a unique user ID.
- **Database:** project data and contact messages are stored in Postgres.
- **Row Level Security:** the database itself enforces who can read or write each row, so access control does not depend only on the front-end code.

## Secrets check

I checked that no keys, tokens or `.env` files are in the repo or its git history (searched for tracked env files, `service_role`, and key patterns). `.env.local` is ignored by git.

## How I used AI tools

I used Claude (Anthropic) as a coding coach during this project. It helped me with:

- For example, planning my weekly milestones and checking my work against the brief]
- Debugging errors (for example, an import path issue and the `next/image` error for screenshots)
- A starting version of the animated star background component, which I then adjusted
- Drafting my video script outline and the first version of this README, which I edited and checked

I reviewed the code I used and I am responsible for everything in this repo.
## Known gaps

- No automated tests yet.
- Some images are served with `unoptimized` [REMOVE IF NOT TRUE].
- Accessibility and mobile layout could use a full audit.
- Admin features are basic.

## With more time

- Add tests and a stronger accessibility pass
- Add more case study detail and metrics for each project
- Improve the admin area

## Author

Tinotenda Mutenda, IT Programming student at Unicollege, Johannesburg.
[GitHub](https://github.com/tin0-0) · [LinkedIn](https://www.linkedin.com/in/tinotenda-mutenda)