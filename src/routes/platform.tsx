import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { WaveGlyph } from "@/components/sangam/droplet";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform. Tributaries, Currents, and The Delta. Sangam" },
      { name: "description", content: "How Sangam works end to end. Channels in, agents at work, analytics out." },
      { property: "og:title", content: "Platform. Sangam" },
      { property: "og:description", content: "Tributaries in, Currents at work, Delta in view." },
    ],
  }),
  component: Platform,
});

const groups = [
  {
    title: "Tributaries",
    body: "Every incoming channel becomes a Tributary. Sangam reads context, contact history, and channel norms so replies feel native.",
    items: [
      { name: "WhatsApp Tributary", note: "Business number, templates, media." },
      { name: "Instagram Tributary", note: "DMs, story replies, comments." },
      { name: "Website Tributary", note: "Chat widget, embedded forms, email fallback." },
    ],
  },
  {
    title: "Currents",
    body: "Currents are the working agents. Sales moves pipeline. Support answers questions. Ops runs the back office.",
    items: [
      { name: "Sales Current", note: "Qualifies, quotes, books, follows up." },
      { name: "Support Current", note: "Answers, resolves, escalates." },
      { name: "Ops Current", note: "Tasks, reminders, internal follow ups." },
    ],
  },
  {
    title: "The Delta",
    body: "Real numbers, computed against your live tickets. Nothing hardcoded, nothing vanity.",
    items: [
      { name: "By status", note: "In flow vs settled." },
      { name: "By channel", note: "Where volume lands." },
      { name: "Settled per day", note: "Rolling seven day trend." },
    ],
  },
];

function Platform() {
  return (
    <div>
      <MarketingNav />
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="mono uppercase text-xs tracking-widest text-teal mb-3">Platform</div>
        <RevealHeadline as="h1" className="text-4xl md:text-6xl">One system, three parts.</RevealHeadline>
        <p className="mt-4 max-w-2xl text-muted-foreground">The full picture of what happens between a customer message and a settled outcome.</p>

        <div className="mt-14 space-y-10">
          {groups.map((g) => (
            <div key={g.title} className="grid md:grid-cols-3 gap-8 border-t border-border pt-10">
              <div>
                <WaveGlyph className="text-teal w-14 h-6 mb-3" />
                <h2 className="font-display font-black text-3xl">{g.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{g.body}</p>
              </div>
              <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
                {g.items.map((it) => (
                  <div key={it.name} className="bg-card border border-border rounded-xl p-4 hover:border-teal transition-colors">
                    <div className="font-medium">{it.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{it.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}