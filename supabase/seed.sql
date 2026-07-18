-- Sample data for the public /demo route. Rows here are marked is_demo = true
-- and are readable by anyone via the tickets_demo_public_read and
-- currents_demo_public_read policies, but never collide with real user data.

insert into public.currents (name, is_active, assigned_tributary, is_demo) values
  ('Sales Current', true, 'whatsapp', true),
  ('Support Current', true, 'website', true),
  ('Ops Current', false, 'instagram', true);

insert into public.tickets (channel, contact_name, status, snippet, current_type, is_demo, created_at, settled_at) values
  ('whatsapp', 'Priya Nair', 'in_flow', 'Is the store open on Sunday evening', 'support', true, now() - interval '2 hours', null),
  ('instagram', 'Arjun Menon', 'settled', 'Do you ship to Pune by Friday', 'sales', true, now() - interval '4 hours', now() - interval '3 hours'),
  ('website', 'Kavya Iyer', 'in_flow', 'Can I reschedule my appointment to next week', 'ops', true, now() - interval '6 hours', null),
  ('whatsapp', 'Rohan Das', 'in_flow', 'Refund status on order 4821 please', 'support', true, now() - interval '8 hours', null),
  ('instagram', 'Meera Pillai', 'settled', 'Looking for a two bedroom in Indiranagar', 'sales', true, now() - interval '10 hours', now() - interval '9 hours'),
  ('website', 'Vikram Rao', 'in_flow', 'Any discount on the annual plan', 'sales', true, now() - interval '12 hours', null),
  ('whatsapp', 'Neha Shah', 'settled', 'Cancel my class booking for tomorrow', 'ops', true, now() - interval '14 hours', now() - interval '13 hours'),
  ('instagram', 'Anaya Kapoor', 'in_flow', 'Colour options available in size medium', 'sales', true, now() - interval '16 hours', null),
  ('website', 'Dev Malhotra', 'in_flow', 'Need invoice for GST filing', 'ops', true, now() - interval '18 hours', null),
  ('whatsapp', 'Ishaan Verma', 'settled', 'Booking confirmation not received', 'support', true, now() - interval '20 hours', now() - interval '19 hours'),
  ('website', 'Riya Bansal', 'in_flow', 'Waxing slot free at 6 pm today', 'ops', true, now() - interval '22 hours', null),
  ('instagram', 'Kabir Joshi', 'settled', 'Yoga trial class timings', 'sales', true, now() - interval '24 hours', now() - interval '23 hours');
