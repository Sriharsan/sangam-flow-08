
-- ticket_messages
CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  sender text NOT NULL CHECK (sender IN ('customer', 'agent')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ticket_messages TO authenticated;
GRANT SELECT ON public.ticket_messages TO anon;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

-- Owners can read/write messages on tickets they own.
CREATE POLICY "ticket_messages_owner_all" ON public.ticket_messages FOR ALL
  USING (EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND t.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND t.user_id = auth.uid()));

-- Anyone can read messages on demo tickets (Confluence feed preview, live demo chat thread).
CREATE POLICY "ticket_messages_demo_public_read" ON public.ticket_messages FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND t.is_demo = true));

-- No anon/authenticated insert or update policy: writes to demo ticket messages
-- (the customer message and the Gemini agent reply) go through the server-side
-- admin client (service role), which bypasses RLS. This keeps the public anon
-- key from being able to forge "agent" replies or write into arbitrary tickets.

-- leads
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ticket_id uuid REFERENCES public.tickets(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: leads may contain real visitor emails and
-- are only ever written and read by the server-side admin client.
