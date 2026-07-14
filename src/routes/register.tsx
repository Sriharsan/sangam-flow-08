import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Droplet, WaveGlyph } from "@/components/sangam/droplet";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your Sangam account" },
      { name: "description", content: "Sign up free. 150 drops a month, no card." },
      { property: "og:title", content: "Create your Sangam account" },
      { property: "og:description", content: "Get started free." },
    ],
  }),
  component: Register,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
});

function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ full_name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(f);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: f.email,
      password: f.password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: { full_name: f.full_name },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created. Check your inbox to confirm, then sign in.");
    nav({ to: "/app" });
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/app" });
    if (r.error) toast.error(String(r.error.message ?? "Google sign in failed"));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-10 bg-indigo text-silt grain">
        <Link to="/" className="flex items-center gap-2"><Droplet size={28} /><span className="font-display font-black text-xl">Sangam</span></Link>
        <div>
          <h1 className="font-display font-black text-4xl leading-tight">Two streams,<br />one current.</h1>
          <ul className="mt-6 space-y-3 text-silt/80 text-sm">
            <li>· Free forever, 150 drops a month.</li>
            <li>· Sample workspace ready in one click.</li>
            <li>· No card, no lock in.</li>
          </ul>
        </div>
        <WaveGlyph className="text-teal w-24 h-8" />
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Droplet size={56} className="mx-auto" />
            <div className="mt-3 mono uppercase text-xs tracking-widest text-teal">Create your account</div>
            <h2 className="font-display font-black text-3xl mt-1">Start free</h2>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-teal/10 blur-2xl -z-10" />
            <div className="bg-card border border-border rounded-2xl p-6">
              <button onClick={google} className="w-full py-2.5 rounded-full border border-border hover:border-teal transition-colors" data-cursor>Continue with Google</button>
              <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" /></div>
              <form className="space-y-3" onSubmit={submit}>
                <input placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} />
                <input placeholder="Email" type="email" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                <input placeholder="Password" type="password" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                <button disabled={busy} className="w-full py-2.5 rounded-full bg-teal text-silt hover:opacity-90 disabled:opacity-50">{busy ? "Creating account..." : "Create account"}</button>
              </form>
            </div>
          </div>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-teal">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}