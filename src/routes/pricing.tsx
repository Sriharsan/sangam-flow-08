import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { Check, X, MessageCircle, Users, BarChart3, Shield, Zap, Headphones, LayoutList } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing. Drop based, no surprises. Sangam" },
      { name: "description", content: "Free, Pro, Growth, and Custom. Every action costs one drop." },
      { property: "og:title", content: "Pricing. Sangam" },
      { property: "og:description", content: "One drop equals one AI action. Pay only for work done." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  { name: "Free", price: "₹0", period: "per month", drops: 150, fill: 0.12, tag: "Try it", cta: "Start free" },
  { name: "Pro", price: "₹4,500", period: "per month", drops: 6000, fill: 0.4, tag: "Popular", cta: "Choose Pro" },
  { name: "Growth", price: "₹13,500", period: "per month", drops: 18000, fill: 0.75, tag: "Scale", cta: "Choose Growth" },
  { name: "Custom", price: "Contact", period: "unlimited drops", drops: null, fill: 1, tag: "Talk to us", cta: "Contact us" },
];

function Vessel({ fill }: { fill: number }) {
  return (
    <svg viewBox="0 0 60 80" className="w-14 h-20">
      <defs>
        <clipPath id={"vc" + fill}>
          <rect x="0" y={80 - fill * 60} width="60" height={fill * 60} />
        </clipPath>
      </defs>
      <path d="M12 10 L48 10 L44 70 Q44 76 38 76 L22 76 Q16 76 16 70 Z"
            fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10 L48 10 L44 70 Q44 76 38 76 L22 76 Q16 76 16 70 Z"
            fill="var(--teal)" fillOpacity="0.7" clipPath={`url(#vc${fill})`} />
    </svg>
  );
}

const features = [
  { icon: MessageCircle, label: "WhatsApp Tributary" },
  { icon: MessageCircle, label: "Instagram Tributary" },
  { icon: MessageCircle, label: "Website Tributary" },
  { icon: Users, label: "Sales Current" },
  { icon: Headphones, label: "Support Current" },
  { icon: LayoutList, label: "Ops Current" },
  { icon: BarChart3, label: "The Delta analytics" },
  { icon: Shield, label: "Human hand off" },
  { icon: Zap, label: "Priority routing" },
];
const matrix = [
  [true, true, true, true],
  [false, true, true, true],
  [false, true, true, true],
  [true, true, true, true],
  [true, true, true, true],
  [false, false, true, true],
  [true, true, true, true],
  [false, true, true, true],
  [false, false, true, true],
];

function Pricing() {
  return (
    <div>
      <MarketingNav />
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="mono uppercase text-xs tracking-widest text-teal mb-3">Pricing</div>
        <RevealHeadline as="h1" className="text-4xl md:text-6xl">Pay only for the work done.</RevealHeadline>
        <p className="mt-3 text-muted-foreground">One drop equals one AI action. A reply is a drop. A follow up is a drop. A task update is a drop.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-xl p-6 flex flex-col hover:border-teal transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mono uppercase text-xs text-muted-foreground">{t.tag}</div>
                  <div className="font-display font-black text-2xl mt-1">{t.name}</div>
                </div>
                <Vessel fill={t.fill} />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-display font-black">{t.price}</div>
                <div className="text-xs text-muted-foreground">{t.period}</div>
              </div>
              <div className="mt-3 text-sm mono">{t.drops === null ? "unlimited drops" : `${t.drops.toLocaleString()} drops per month`}</div>
              <Link to="/register" className="mt-6 inline-flex justify-center bg-teal text-silt py-2.5 rounded-full text-sm hover:opacity-90" data-cursor data-cursor-label="GO">
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-muted rounded-lg px-4 py-3 mono text-xs text-muted-foreground">
          Legend: 1 drop = 1 AI action. Replies, follow ups, task updates each cost 1 drop. Human hand offs cost 0 drops.
        </div>

        {/* Comparison table */}
        <div className="mt-12 max-h-[420px] overflow-auto border border-border rounded-xl bg-card">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_var(--border)]">
              <tr className="border-b border-border">
                <th className="text-left font-display font-black text-lg px-5 py-4">Features</th>
                {tiers.map((t) => (
                  <th key={t.name} className="text-left font-medium px-5 py-4">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.label} className={i % 2 ? "bg-muted/50" : ""}>
                  <td className="px-5 py-3 flex items-center gap-2"><f.icon size={14} className="text-teal" /> {f.label}</td>
                  {matrix[i].map((v, j) => (
                    <td key={j} className="px-5 py-3">
                      {v ? <Check size={16} className="text-teal" /> : <X size={14} className="text-muted-foreground/50" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}