import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Droplet, WaveGlyph } from "@/components/sangam/droplet";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in. Sangam" },
      { name: "description", content: "Sign in to your Sangam workspace." },
      { property: "og:title", content: "Sign in. Sangam" },
      { property: "og:description", content: "Back to your Confluence." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(f);
    setBusy(false);
    if (error) return toast.error(error.message);
    nav({ to: "/app" });
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error(String(r.error.message ?? "Google sign in failed"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-full h-full text-teal/20">
          <path d="M0 50 C 200 10, 400 90, 600 50 S 1000 10, 1200 50" stroke="currentColor" fill="none" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Droplet size={64} className="mx-auto" />
          <div className="mt-3 mono uppercase text-xs tracking-widest text-teal">Welcome back</div>
          <h2 className="font-display font-black text-3xl mt-1">Sign in to Sangam</h2>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-teal/15 blur-3xl -z-10" />
          <div className="bg-card border border-border rounded-2xl p-6">
            <button onClick={google} className="w-full py-2.5 rounded-full border border-border hover:border-teal transition-colors" data-cursor>Continue with Google</button>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" /></div>
            <form className="space-y-3" onSubmit={submit}>
              <input placeholder="Email" type="email" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              <input placeholder="Password" type="password" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
              <button disabled={busy} className="w-full py-2.5 rounded-full bg-teal text-silt hover:opacity-90 disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button>
            </form>
          </div>
        </div>
        <div className="mt-4 text-sm text-center text-muted-foreground space-y-1">
          <div>No account? <Link to="/register" className="text-teal">Create one</Link></div>
          <div><Link to="/demo" className="text-teal">Explore the live demo without signing up</Link></div>
        </div>
        <div className="mt-8 flex justify-center"><WaveGlyph className="w-16 h-6 text-teal/60" /></div>
      </div>
    </div>
  );
}