import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ. Sangam" },
      { name: "description", content: "Answers about channels, pricing, hand off, security, and the live demo." },
      { property: "og:title", content: "FAQ. Sangam" },
      { property: "og:description", content: "The common questions in plain language." },
    ],
  }),
  component: Faq,
});

const qa = [
  { q: "What is Sangam?", a: "A single agent that handles your customer conversations across WhatsApp, Instagram, and website chat, plus your internal work like tasks, follow ups, and pipeline." },
  { q: "Which channels are supported?", a: "WhatsApp, Instagram, and website chat are live. Each channel is a Tributary that feeds The Confluence, one unified feed." },
  { q: "Is there a free trial?", a: "Yes. The Free plan gives 150 drops per month with no time limit. That is enough for a small pilot on a single channel." },
  { q: "How does drop based pricing work?", a: "One drop equals one AI action. A reply is a drop. A follow up is a drop. A task update is a drop. Human hand offs cost nothing." },
  { q: "Can conversations hand off to a human?", a: "Yes. Any Current can escalate to a person on your team. The full context stays on the ticket so pickup is instant." },
  { q: "Does the Ops Current integrate with real tools?", a: "Yes. Ops Current works with common task and calendar tools. In the demo, task updates stay inside Sangam so you can see the pattern end to end." },
  { q: "How long does setup take?", a: "Under an hour for a single channel. Wire in your WhatsApp business number or paste the website chat snippet, tune the Currents, and go." },
  { q: "How is my data handled?", a: "Your workspace data is isolated per account with row level security. Only you and your team see your tickets. Demo data is separate and clearly marked." },
  { q: "What does the live demo show?", a: "A fully working workspace with sample tickets, live charts, and the real Confluence feed. Toggles for Currents are visible but disabled in the demo." },
  { q: "How does billing and cancellation work?", a: "Honest answer: this is a demo build and billing is not active yet. Sign up is free and there is no charge. When billing goes live we will let you know before anything changes." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <MarketingNav />
      <main className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <div className="mono uppercase text-xs tracking-widest text-teal mb-3">FAQ</div>
        <RevealHeadline as="h1" className="text-4xl md:text-5xl">Questions, answered plainly.</RevealHeadline>

        <div className="mt-10 divide-y divide-border border border-border rounded-xl bg-card">
          {qa.map((item, i) => (
            <div key={i}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? null : i)} data-cursor>
                <span className="font-medium">{item.q}</span>
                <ChevronDown className={`transition-transform ${open === i ? "rotate-180 text-teal" : ""}`} size={18} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>}
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}