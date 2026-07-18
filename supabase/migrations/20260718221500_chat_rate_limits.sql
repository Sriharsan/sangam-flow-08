
-- Dedicated rate limit table for the public demo chat. Deliberately not on
-- ticket_messages: that table has a public read policy for demo tickets, and
-- session/IP identifiers should never be selectable by the anon key. This
-- table has no anon/authenticated grants or policies at all, only service_role
-- (used exclusively by the server side chat handler).
CREATE TABLE public.chat_rate_limits (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rate_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX chat_rate_limits_key_time_idx ON public.chat_rate_limits (rate_key, created_at);
GRANT ALL ON public.chat_rate_limits TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.chat_rate_limits_id_seq TO service_role;
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;
-- No policies: default deny for anon/authenticated, service_role bypasses RLS.
