import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { ConfluenceHero } from "@/components/sangam/confluence-hero";
import { Marquee } from "@/components/sangam/marquee";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { MagneticButton } from "@/components/sangam/magnetic-button";
import { CountUp } from "@/components/sangam/count-up";
import { TicketCard } from "@/components/sangam/ticket-card";
import { WaveGlyph } from "@/components/sangam/droplet";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <MarketingNav />
      <main>
        <section className="relative">
          <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 text-center">
            <div className="mono uppercase text-xs tracking-widest text-teal mb-4">Two streams, one current</div>
            <RevealHeadline as="h1" className="text-5xl md:text-7xl">
              One agent for customer chat and internal work.
            </RevealHeadline>
            <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
              Sangam runs Sales, Support, and Ops Currents. Tributaries flow in from WhatsApp, Instagram, and your website. They meet at the Confluence, one place to work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton to="/register" label="START">Get started free</MagneticButton>
              <MagneticButton to="/demo" variant="secondary" label="VIEW">View live demo</MagneticButton>
            </div>
          </div>
          <ConfluenceHero />
        </section>

        <Marquee />

        {/* 3 column overview */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <RevealHeadline className="text-3xl md:text-5xl">Three parts, one system.</RevealHeadline>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Tributaries", body: "WhatsApp, Instagram, website chat. Every message becomes a ticket, tagged by channel and contact." },
              { title: "Currents", body: "Sales, Support, and Ops. Each Current is a working agent with its own tone, tools, and hand off rules." },
              { title: "The Delta", body: "See volume, response time, and settled per day. Real numbers pulled from your live tickets." },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-xl p-6 hover:border-teal hover:-translate-y-1 transition-all shadow-sm hover:shadow-md">
                <WaveGlyph className="text-teal w-14 h-6 mb-3" />
                <h3 className="font-display font-black text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Currents detail with live preview */}
        <section className="bg-indigo text-silt grain">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mono uppercase text-xs tracking-widest text-teal mb-3">The Confluence</div>
              <RevealHeadline className="text-3xl md:text-5xl text-silt">
                Every conversation lands in one feed.
              </RevealHeadline>
              <p className="mt-4 text-silt/75 max-w-md">
                Tickets from every Tributary and every Current merge here. Reply, reassign, or hand off to a human without switching apps.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { id: "p1", channel: "whatsapp", contact_name: "Priya Nair", status: "in_flow", snippet: "Is the store open on Sunday evening", current_type: "support" },
                { id: "p2", channel: "instagram", contact_name: "Meera Pillai", status: "settled", snippet: "Looking for a two bedroom in Indiranagar", current_type: "sales" },
                { id: "p3", channel: "website", contact_name: "Rohan Das", status: "in_flow", snippet: "Refund status on order 4821 please", current_type: "ops" },
              ].map((t) => <TicketCard key={t.id} ticket={t} />)}
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: 24000, label: "tickets settled" },
              { n: 92, label: "% first reply under 60s", suffix: "%" },
              { n: 4, label: "tributaries wired in" },
              { n: 3, label: "currents per workspace" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-black text-teal">
                  <CountUp to={s.n} />
                </div>
                <div className="mt-1 text-xs mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
          <div className="mono uppercase text-xs tracking-widest text-muted-foreground text-center mb-4">Built for</div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Retail","Real Estate","Healthcare","Education","Salon","Fitness","Travel","Ecommerce"].map((i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-border bg-card text-sm">{i}</span>
            ))}
          </div>
        </section>

        <FAQPreview />
      </main>
      <MarketingFooter />
    </div>
  );
}

function FAQPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const qs = [
    { q: "What is Sangam?", a: "One agent that handles your customer chat across channels and your internal work like tasks, follow ups, and pipeline." },
    { q: "Which channels are supported?", a: "WhatsApp, Instagram, and website chat today. Each channel is a Tributary that flows into the Confluence." },
    { q: "Is there a free trial?", a: "Yes. The Free plan includes 150 drops per month, enough to run a small pilot." },
  ];
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
      <RevealHeadline className="text-3xl md:text-4xl text-center">Common questions.</RevealHeadline>
      <div className="mt-8 divide-y divide-border border border-border rounded-xl bg-card">
        {qs.map((item, i) => (
          <div key={i}>
            <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? null : i)} data-cursor>
              <span className="font-medium">{item.q}</span>
              <ChevronDown className={`transition-transform ${open === i ? "rotate-180 text-teal" : ""}`} size={18} />
            </button>
            {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
