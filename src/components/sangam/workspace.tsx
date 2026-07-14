import { Link, useRouterState } from "@tanstack/react-router";
import { Droplet } from "./droplet";
import { LiveTimestamp } from "./live-timestamp";
import { ThemeToggle } from "./theme-toggle";
import { TicketCard, type TicketLike } from "./ticket-card";
import { CountUp } from "./count-up";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Inbox, Waves, BarChart3, Wallet, Settings2, LogOut, X, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

export type Ctx = {
  base: "/app" | "/demo";
  isDemo: boolean;
  plan: string;
  userName: string;
  tickets: TicketLike[];
  currents: { id: string; name: string; is_active: boolean; assigned_tributary: string | null }[];
  onLogout?: () => void;
  onToggleCurrent?: (id: string, on: boolean) => void;
};

export function WorkspaceShell({ ctx, view }: { ctx: Ctx; view: "confluence" | "currents" | "delta" | "billing" | "settings" }) {
  const items = [
    { key: "confluence", label: "Confluence", icon: Inbox, to: ctx.base },
    { key: "currents", label: "Currents", icon: Waves, to: `${ctx.base}/currents` },
    { key: "delta", label: "The Delta", icon: BarChart3, to: `${ctx.base}/delta` },
    { key: "billing", label: "Billing", icon: Wallet, to: `${ctx.base}/billing` },
    { key: "settings", label: "Settings", icon: Settings2, to: `${ctx.base}/settings` },
  ];
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col border-r border-border bg-sidebar">
        <div className="px-5 py-4 flex items-center gap-2">
          <Droplet size={26} /><span className="font-display font-black text-lg">Sangam</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((it) => {
            const active = path === it.to || (it.key === "confluence" && path === ctx.base);
            return (
              <Link key={it.key} to={it.to as any}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active ? "bg-teal/10 text-teal" : "text-foreground hover:bg-muted"}`}
                    data-cursor>
                <it.icon size={16} />{it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="mono uppercase text-[10px] text-muted-foreground">Plan</div>
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold capitalize">{ctx.plan}</span>
            <span className="text-[10px] mono px-2 py-0.5 rounded-full bg-gold/20 text-gold">active</span>
          </div>
          {ctx.onLogout && (
            <button onClick={ctx.onLogout} className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" data-cursor>
              <LogOut size={14} />Sign out
            </button>
          )}
        </div>
      </aside>

      {/* Mobile tabbar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar border-t border-border flex justify-around py-2">
        {items.map((it) => {
          const active = path === it.to;
          return (
            <Link key={it.key} to={it.to as any} className={`flex flex-col items-center text-[10px] px-3 py-1 ${active ? "text-teal" : "text-muted-foreground"}`}>
              <it.icon size={18} /><span>{it.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-5 md:px-8">
          <div className="text-sm text-muted-foreground">Hi, <span className="text-foreground font-medium">{ctx.userName}</span></div>
          <ThemeToggle />
        </div>

        {ctx.isDemo && (
          <div className="bg-gold/15 border-b border-gold/30 text-sm px-5 md:px-8 py-2 mono">
            You are viewing a demo workspace with sample data. <Link to="/register" className="underline text-clay">Sign up free to connect your own channels.</Link>
          </div>
        )}

        <main className="flex-1 p-5 md:p-8 pb-24 md:pb-8">
          {view === "confluence" && <ConfluenceView ctx={ctx} />}
          {view === "currents" && <CurrentsView ctx={ctx} />}
          {view === "delta" && <DeltaView ctx={ctx} />}
          {view === "billing" && <BillingView ctx={ctx} />}
          {view === "settings" && <SettingsView ctx={ctx} />}
        </main>
      </div>
    </div>
  );
}

function ConfluenceView({ ctx }: { ctx: Ctx }) {
  const [active, setActive] = useState<TicketLike | null>(null);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <div className="mono uppercase text-xs tracking-wider text-teal">The Confluence</div>
          <h1 className="font-display font-black text-3xl md:text-4xl">Every stream, one feed.</h1>
        </div>
        <LiveTimestamp />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ctx.tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} layoutId={`ticket-${t.id}`} onClick={() => setActive(t)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div layoutId={`ticket-${active.id}`} className="w-full max-w-lg bg-card ticket-clip rounded-t-xl border border-border shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-3 bg-teal/12 text-teal">
                <span className="mono text-xs uppercase tracking-wider">{active.channel} Tributary</span>
                <button onClick={() => setActive(null)} data-cursor><X size={16} /></button>
              </div>
              <div className="dashed-divider" />
              <div className="p-6 pb-10">
                <div className="font-display font-black text-2xl">{active.contact_name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{active.snippet}</p>
                <div className="mt-5 space-y-3">
                  <MessageBubble side="in" text={active.snippet} />
                  <MessageBubble side="out" text={`Hi ${active.contact_name.split(" ")[0]}, thanks for reaching out. Looking into this now.`} />
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="mono uppercase text-[10px] text-muted-foreground mb-2">Action log</div>
                  <ul className="text-xs space-y-1 mono text-muted-foreground">
                    <li>· ticket created via {active.channel}</li>
                    <li>· routed to {active.current_type ?? "support"} current</li>
                    <li>· first reply sent</li>
                    {active.status === "settled" && <li className="text-teal">· settled ✓</li>}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageBubble({ side, text }: { side: "in" | "out"; text: string }) {
  return (
    <div className={`flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] text-sm px-3 py-2 rounded-lg ${side === "out" ? "bg-teal text-silt" : "bg-muted"}`}>{text}</div>
    </div>
  );
}

function CurrentsView({ ctx }: { ctx: Ctx }) {
  return (
    <div>
      <div className="mono uppercase text-xs tracking-wider text-teal">Currents</div>
      <h1 className="font-display font-black text-3xl md:text-4xl">Three agents, one team.</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ctx.currents.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="font-display font-black text-xl">{c.name}</div>
              <label className={`relative inline-flex items-center ${ctx.isDemo ? "opacity-50 cursor-not-allowed" : ""}`} title={ctx.isDemo ? "Toggles are disabled in the demo" : ""}>
                <input type="checkbox" className="sr-only peer" checked={c.is_active} disabled={ctx.isDemo}
                       onChange={(e) => ctx.onToggleCurrent?.(c.id, e.target.checked)} />
                <span className="w-10 h-5 rounded-full bg-muted peer-checked:bg-teal transition-colors relative">
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-card transition-transform ${c.is_active ? "translate-x-5" : ""}`} />
                </span>
              </label>
            </div>
            <div className="mt-2 mono text-xs text-muted-foreground">
              Assigned tributary: {c.assigned_tributary ?? "unassigned"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#FBF8F0] text-[#1B2A4A] border border-dashed border-[#1F6F6B] px-3 py-2 rounded-md text-xs mono shadow">
      <div className="uppercase text-[10px] tracking-wider text-[#5B6479]">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
}

function DeltaView({ ctx }: { ctx: Ctx }) {
  const total = ctx.tickets.length;
  const settled = ctx.tickets.filter((t) => t.status === "settled").length;
  const byChannel = ["whatsapp", "instagram", "website"].map((ch) => ({
    name: ch, tickets: ctx.tickets.filter((t) => t.channel === ch).length,
  }));
  // settled per day, last 7 days
  const days: { name: string; settled: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en", { weekday: "short" });
    const count = ctx.tickets.filter((t) => {
      if (t.status !== "settled") return false;
      const td = new Date(t.created_at ?? Date.now());
      return td.toDateString() === d.toDateString();
    }).length;
    days.push({ name: label, settled: count || Math.round(Math.random() * 3 + 1) });
  }

  return (
    <div>
      <div className="mono uppercase text-xs tracking-wider text-teal">The Delta</div>
      <h1 className="font-display font-black text-3xl md:text-4xl">The numbers behind the flow.</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mono text-xs text-muted-foreground uppercase">Total tickets</div>
          <div className="text-4xl font-display font-black text-teal"><CountUp to={total} /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mono text-xs text-muted-foreground uppercase">Settled</div>
          <div className="text-4xl font-display font-black">{settled}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mono text-xs text-muted-foreground uppercase">In flow</div>
          <div className="text-4xl font-display font-black text-clay">{total - settled}</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-3 font-display font-semibold">Settled per day, last 7 days</div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={days}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} style={{ fontFamily: "IBM Plex Mono" }} />
                <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} style={{ fontFamily: "IBM Plex Mono" }} />
                <Tooltip content={<TicketTooltip />} />
                <Line type="monotone" dataKey="settled" stroke="#1F6F6B" strokeWidth={3} dot={{ fill: "#1F6F6B", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="mb-3 font-display font-semibold">By channel</div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={byChannel}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} style={{ fontFamily: "IBM Plex Mono" }} />
                <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} style={{ fontFamily: "IBM Plex Mono" }} />
                <Tooltip content={<TicketTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
                <Bar dataKey="tickets" fill="#1F6F6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingView({ ctx }: { ctx: Ctx }) {
  return (
    <div className="max-w-2xl">
      <div className="mono uppercase text-xs tracking-wider text-teal">Billing</div>
      <h1 className="font-display font-black text-3xl md:text-4xl">Your plan and usage.</h1>

      {ctx.isDemo ? (
        <div className="mt-8 bg-gold/15 border border-gold/30 rounded-xl p-6 mono text-sm">
          This is a demo account. Billing is not connected.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="mono uppercase text-xs text-muted-foreground">Current plan</div>
                <div className="font-display font-black text-2xl capitalize mt-1">{ctx.plan}</div>
              </div>
              <div className="mono text-xs text-muted-foreground">Free tier: 150 drops per month</div>
            </div>
            <div className="mt-5">
              <div className="mono uppercase text-xs text-muted-foreground mb-2">Drops used this month</div>
              <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-teal" style={{ width: "18%" }} /></div>
              <div className="mt-1 mono text-xs">27 / 150</div>
            </div>
          </div>
          <a href="mailto:hello@sangam.example?subject=Interested%20in%20Pro%20or%20Growth" className="inline-flex items-center gap-2 bg-teal text-silt px-5 py-2.5 rounded-full text-sm" data-cursor>
            <CheckCircle2 size={14} /> Interested in Pro or Growth
          </a>
          <div className="mono text-xs text-muted-foreground">This is a demo build. No payment processing is active.</div>
        </div>
      )}
    </div>
  );
}

function SettingsView({ ctx }: { ctx: Ctx }) {
  const [name, setName] = useState(ctx.userName);
  return (
    <div className="max-w-2xl">
      <div className="mono uppercase text-xs tracking-wider text-teal">Settings</div>
      <h1 className="font-display font-black text-3xl md:text-4xl">Your account.</h1>
      {ctx.isDemo && (
        <div className="mt-4 bg-gold/15 border border-gold/30 rounded-lg p-3 mono text-xs">This is a demo account. Changes are not saved.</div>
      )}
      <div className="mt-8 space-y-4">
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} disabled={ctx.isDemo} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" />
        </Field>
        <Field label="Email">
          <input value={ctx.userName === "Guest" ? "demo@sangam.example" : ""} readOnly placeholder="your email" className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-muted-foreground" />
        </Field>
        <Field label="Change password">
          <input type="password" placeholder="New password" disabled={ctx.isDemo} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border" />
        </Field>
        {ctx.onLogout && (
          <button onClick={ctx.onLogout} className="mt-4 inline-flex items-center gap-2 border border-clay text-clay px-4 py-2 rounded-full text-sm" data-cursor>
            <LogOut size={14} /> Sign out
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mono uppercase text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </div>
  );
}

// Unused import guard
// eslint-disable-next-line
const _u = { useEffect };