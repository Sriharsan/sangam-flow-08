import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/sangam/marketing-nav";
import { MarketingFooter } from "@/components/sangam/marketing-footer";
import { RevealHeadline } from "@/components/sangam/reveal-headline";
import { Copy, Check, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact. Sangam" },
      { name: "description", content: "Reach the Sangam team by email." },
      { property: "og:title", content: "Contact. Sangam" },
      { property: "og:description", content: "Reach the Sangam team by email." },
    ],
  }),
  component: Contact,
});

const SUPPORT_EMAIL = "hello@sangam.example";

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyEmail = async () => {
    if (typeof navigator === "undefined") return;
    try {
      if (!navigator.clipboard) throw new Error("no clipboard api");
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = SUPPORT_EMAIL;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      if (!ok) {
        setCopyFailed(true);
        setTimeout(() => setCopyFailed(false), 2500);
        return;
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <MarketingNav />
      <main className="max-w-2xl mx-auto px-5 md:px-8 py-16">
        <div className="mono uppercase text-xs tracking-widest text-teal mb-3">Contact</div>
        <RevealHeadline as="h1" className="text-4xl md:text-5xl">Reach the team.</RevealHeadline>
        <p className="mt-3 text-muted-foreground">Send us a note and we will get back to you.</p>

        <div className="mt-10 bg-card border border-border rounded-xl p-6">
          <div className="mono uppercase text-xs text-muted-foreground mb-2">Support email</div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display font-black text-2xl select-all">{SUPPORT_EMAIL}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 bg-teal text-silt px-5 py-2.5 rounded-full text-sm hover:opacity-90"
              data-cursor
              data-cursor-label="COPY"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-full text-sm hover:bg-muted"
              data-cursor
              data-cursor-label="OPEN"
            >
              <Mail size={14} /> Open in email app
            </a>
          </div>
          {copyFailed && (
            <p className="mt-3 text-xs text-clay">Could not copy automatically. Select the email above and copy it manually.</p>
          )}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
