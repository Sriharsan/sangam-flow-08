
-- profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- tickets
CREATE TABLE public.tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  channel text NOT NULL,
  contact_name text NOT NULL,
  status text NOT NULL DEFAULT 'in_flow',
  snippet text NOT NULL,
  current_type text NOT NULL DEFAULT 'support',
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  settled_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tickets TO authenticated;
GRANT SELECT ON public.tickets TO anon;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tickets_owner_all" ON public.tickets FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tickets_demo_public_read" ON public.tickets FOR SELECT TO anon, authenticated USING (is_demo = true);

-- currents
CREATE TABLE public.currents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  assigned_tributary text,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.currents TO authenticated;
GRANT SELECT ON public.currents TO anon;
GRANT ALL ON public.currents TO service_role;
ALTER TABLE public.currents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "currents_owner_all" ON public.currents FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "currents_demo_public_read" ON public.currents FOR SELECT TO anon, authenticated USING (is_demo = true);

-- signup trigger: creates profile, currents, and seeds tickets
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  channels text[] := ARRAY['whatsapp','instagram','website','whatsapp','instagram','website','whatsapp','website','instagram','whatsapp','website','instagram'];
  names text[] := ARRAY['Priya Nair','Arjun Menon','Kavya Iyer','Rohan Das','Meera Pillai','Vikram Rao','Neha Shah','Anaya Kapoor','Dev Malhotra','Ishaan Verma','Riya Bansal','Kabir Joshi'];
  snippets text[] := ARRAY[
    'Is the store open on Sunday evening',
    'Do you ship to Pune by Friday',
    'Can I reschedule my appointment to next week',
    'Refund status on order 4821 please',
    'Looking for a two bedroom in Indiranagar',
    'Any discount on the annual plan',
    'Cancel my class booking for tomorrow',
    'Colour options available in size medium',
    'Need invoice for GST filing',
    'Booking confirmation not received',
    'Waxing slot free at 6 pm today',
    'Yoga trial class timings'
  ];
  statuses text[] := ARRAY['in_flow','settled','in_flow','in_flow','settled','in_flow','settled','in_flow','in_flow','settled','in_flow','in_flow'];
  currs text[] := ARRAY['support','sales','ops','support','sales','sales','ops','sales','ops','support','ops','sales'];
  i int;
BEGIN
  INSERT INTO public.profiles (id, full_name, plan)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)), 'free');

  INSERT INTO public.currents (user_id, name, is_active, assigned_tributary) VALUES
    (NEW.id, 'Sales Current', true, 'whatsapp'),
    (NEW.id, 'Support Current', true, 'website'),
    (NEW.id, 'Ops Current', false, 'instagram');

  FOR i IN 1..12 LOOP
    INSERT INTO public.tickets (user_id, channel, contact_name, status, snippet, current_type, created_at, settled_at)
    VALUES (
      NEW.id, channels[i], names[i], statuses[i], snippets[i], currs[i],
      now() - (i * interval '5 hours'),
      CASE WHEN statuses[i] = 'settled' THEN now() - (i * interval '4 hours') ELSE NULL END
    );
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
