import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Send, Globe, Mail } from "lucide-react";
import { sendDemoChatMessage, submitDemoLead } from "@/lib/demo-chat.functions";

const MAX_LEN = 500;

type ChatMessage = { sender: "customer" | "agent"; content: string };

function newSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function DemoChat() {
  const queryClient = useQueryClient();
  const [sessionId] = useState(newSessionId);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadPromptShown, setLeadPromptShown] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadState, setLeadState] = useState<"idle" | "sent" | "declined">("idle");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, sending]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setError(null);
    setSending(true);
    setMessages((m) => [...m, { sender: "customer", content: trimmed }]);
    setInput("");

    const result = await sendDemoChatMessage({ data: { message: trimmed, ticketId: ticketId ?? undefined, sessionId } });

    if (!result.ok) {
      if (result.reason === "rate_limited") {
        setError("You have sent a lot of messages in a short time. Please wait a minute and try again.");
      } else {
        setError("Something went wrong sending that message. Please try again.");
      }
      setSending(false);
      return;
    }

    setTicketId(result.ticketId);
    setMessages((m) => [...m, { sender: "agent", content: result.reply }]);
    setSending(false);
    queryClient.invalidateQueries({ queryKey: ["demo", "tickets"] });

    if (!leadPromptShown) setLeadPromptShown(true);
  };

  const submitLead = async () => {
    if (!ticketId) return;
    const email = leadEmail.trim();
    if (!email) return;
    const res = await submitDemoLead({ data: { email, ticketId } });
    setLeadState(res.ok ? "sent" : "idle");
  };

  return (
    <div className="bg-card ticket-clip rounded-t-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-indigo/10 dark:text-silt text-indigo">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium mono">
          <Globe size={13} /> Website Tributary
        </span>
        <span className="text-[11px] mono uppercase tracking-wider text-teal">Try it live</span>
      </div>
      <div className="dashed-divider" />

      <div className="px-4 py-3 max-h-72 overflow-y-auto space-y-2">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Send a message as a customer would on the website chat. Sangam's Support Current will reply for real.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "customer" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] text-sm px-3 py-2 rounded-lg ${m.sender === "customer" ? "bg-teal text-silt" : "bg-muted"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="max-w-[80%] text-sm px-3 py-2 rounded-lg bg-muted text-muted-foreground mono">Support Current is typing...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <div className="mx-4 mb-2 text-xs text-clay">{error}</div>}

      {leadPromptShown && leadState === "idle" && (
        <div className="mx-4 mb-3 bg-muted/50 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-2">Leave your email if you would like a copy of this conversation. Not required to continue.</div>
          <div className="flex gap-2">
            <input
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
            />
            <button onClick={submitLead} className="inline-flex items-center gap-1.5 bg-teal text-silt px-3 py-1.5 rounded-full text-xs" data-cursor>
              <Mail size={12} /> Send copy
            </button>
            <button onClick={() => setLeadState("declined")} className="px-3 py-1.5 rounded-full text-xs border border-border" data-cursor>
              No thanks
            </button>
          </div>
        </div>
      )}
      {leadState === "sent" && <div className="mx-4 mb-3 text-xs text-teal">Thanks, we will send a copy to that address.</div>}

      <div className="px-4 pb-4 pt-1 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          maxLength={MAX_LEN}
          placeholder="Type a message as a visitor..."
          className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-background border border-border text-sm"
          disabled={sending}
        />
        <button
          onClick={send}
          disabled={sending || !input.trim()}
          className="inline-flex items-center gap-1.5 bg-teal text-silt px-4 py-2.5 rounded-full text-sm disabled:opacity-50"
          data-cursor
          data-cursor-label="SEND"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
