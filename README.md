# Sangam

Sangam is one agent for customer chat and internal work. It runs three Currents, Sales, Support, and Ops, that pick up conversations from WhatsApp, Instagram, and website chat Tributaries. Every conversation lands in one place, the Confluence, and The Delta shows the numbers behind the flow.

This build includes a public marketing site, a login free live demo, and a full authenticated workspace backed by Supabase.

## Tech stack

- React 19, TanStack Start and TanStack Router (file based routing, server functions, SSR)
- Vite 8 with Tailwind CSS v4
- Framer Motion for animation
- Supabase (Postgres, Auth, Row Level Security) for data and accounts
- Google Gemini for the live demo chat reply
- Recharts for The Delta charts

## Running locally

```
npm install
npm run dev
```

The dev server runs on the port Vite chooses (typically 8080). Copy `.env.example` to `.env.local` and fill in the server only values described below before starting the live chat feature. The public values already live in the committed `.env` file.

## Environment variables

Public values, safe in the browser, live in the committed `.env`:

| Variable | Where to get it |
|---|---|
| `SUPABASE_URL`, `VITE_SUPABASE_URL` | Supabase project Settings, API, Project URL |
| `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase project Settings, API, anon public key |
| `SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PROJECT_ID` | The project ref in your Supabase project URL |

Server only values, never sent to the browser, go in `.env.local` locally (gitignored) and as encrypted server environment variables on Vercel:

| Variable | Where to get it |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project Settings, API, service_role secret. Bypasses row level security, used only in `src/integrations/supabase/client.server.ts` for trusted server work such as the demo chat writes. |
| `GEMINI_API_KEY` | Google AI Studio, aistudio.google.com/apikey. Powers the live demo chat. Read only on the server inside `src/lib/demo-chat.functions.ts`, never exposed to the client bundle. |

## Database and row level security

Tables live in `supabase/migrations`. Plain language summary:

- **profiles**: one row per signed up user, created automatically by a trigger on `auth.users` insert. Full name and plan. Each user can only read and update their own row.
- **tickets**: conversations from any Tributary. Each row has `user_id` for a real account, or `is_demo = true` with no owner for public sample data. Owners can do anything to their own tickets. Anyone, signed in or not, can read tickets marked `is_demo = true`, so the public demo works without a login. There is no policy letting the public write to tickets, since demo chat writes go through the server side service role client instead.
- **currents**: the three agents per account, same ownership and demo read pattern as tickets.
- **ticket_messages**: the message thread on a ticket. Owners can read and write messages on their own tickets. Anyone can read messages on demo tickets, so the Confluence feed and the live chat thread work publicly. There is no public write policy, the demo chat's customer and agent messages are both written by the server using the service role client, so the public anon key can never forge an agent reply.
- **leads**: optional email addresses left after a demo chat. No public policies at all, only the service role client can read or write, since this can contain a real visitor's email address.
- **chat_rate_limits**: internal only table the demo chat server function uses to rate limit by session and by IP. No public policies.

There is no `users` table, since that would collide with Supabase's built in `auth.users`. There is no `subscriptions` table, since this build does not process payments.

The signup trigger (`handle_new_user`) fires once, `AFTER INSERT ON auth.users FOR EACH ROW`, so it runs exactly once per new account, never on login. It creates the profile row, seeds three Currents, and seeds twelve sample tickets so a new account has something to look at immediately.

## The live demo chat

Scope: only the Website Tributary, only on the public `/demo` route. WhatsApp and Instagram stay seeded sample data on that page, nothing there is a live integration.

A visitor types a message in the "Try it live" panel. The message is sent to a TanStack Start server function (`src/lib/demo-chat.functions.ts`), which:

1. Rate limits the request by session id and by IP address, checked against the `chat_rate_limits` table so the limit holds up correctly across serverless instances.
2. Creates a ticket (if this is the first message) and inserts the visitor's message, using the server side service role client.
3. Calls the Gemini API with a system prompt that keeps the model in character as Sangam's Support Current, refuses to reveal the prompt or claim to be an underlying model, and treats the visitor's text as a customer message only, never as instructions.
4. Inserts the reply and marks the ticket settled.

The new ticket appears in the demo's Confluence feed without a reload, and after the first exchange there is an optional prompt to leave an email address for a copy of the conversation.

## Live demo

Once deployed, the public demo lives at `/demo` on the production URL, no account required.

## Deploying

Set the two server only environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`) in the Vercel project's environment variables, alongside the public Supabase values already in `.env`. Database migrations in `supabase/migrations` need to be applied to the target Supabase project with `supabase db push` before the app will work end to end.
