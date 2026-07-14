import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { TicketCard } from "@/components/sangam/ticket-card";

export const Route = createFileRoute("/currents")({
  head: () => ({
    meta: [
      { title: "Currents. Sales, Support, Ops. Sangam" },
      { name: "description", content: "Three working agents and one analytics view." },
      { property: "og:title", content: "Currents. Sangam" },
      { property: "og:description", content: "Sales, Support, Ops, and The Delta." },
    ],
  }),
  component: Currents,
});

const cards = [
  { title: "Sales Current", body: "Qualifies leads, sends quotes, books calls, follows up with the ones that go quiet.", ticket: { id: "s1", channel: "whatsapp", contact_name: "Meera Pillai", status: "in_flow", snippet: "Any discount on the annual plan", current_type: "sales" } },
  { title: "Support Current", body: "Answers routine questions, resolves refunds and status checks, hands off to a human when it should.", ticket: { id: "s2", channel: "website", contact_name: "Rohan Das", status: "settled", snippet: "Refund status on order 4821 please", current_type: "support" } },
  { title: "Ops Current", body: "Runs the back office. Creates tasks, chases owners, updates the pipeline as things move.", ticket: { id: "s3", channel: "instagram", contact_name: "Kavya Iyer", status: "in_flow", snippet: "Can I reschedule my appointment to next week", current_type: "ops" } },
  { title: "The Delta", body: "The analytics view. Volume, response time, and settled per day, drawn from your real tickets.", ticket: { id: "s4", channel: "whatsapp", contact_name: "Delta Snapshot", status: "settled", snippet: "247 settled this week, 92% first reply under 60s", current_type: "delta" } },
];

function Currents() {
  return (
    <div>
      <MarketingNav />
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="mono uppercase text-xs tracking-widest text-teal mb-3">Currents</div>
        <RevealHeadline as="h1" className="text-4xl md:text-6xl">Four ways the work flows.</RevealHeadline>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-6 hover:border-teal hover:-translate-y-1 transition-all shadow-sm hover:shadow-md">
              <h2 className="font-display font-black text-2xl">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <div className="mt-4">
                <TicketCard ticket={c.ticket} />
              </div>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}