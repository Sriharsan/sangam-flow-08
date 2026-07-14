import { motion } from "framer-motion";
import { MessageCircle, Instagram, Globe, CheckCircle2, Clock } from "lucide-react";
import type { ReactNode } from "react";

export type TicketLike = {
  id: string;
  channel: string;
  contact_name: string;
  status: string;
  snippet: string;
  current_type?: string;
  created_at?: string;
};

function channelBits(channel: string) {
  switch (channel) {
    case "whatsapp":
      return { Icon: MessageCircle, label: "WhatsApp", tint: "bg-teal/12 text-teal" };
    case "instagram":
      return { Icon: Instagram, label: "Instagram", tint: "bg-clay/12 text-clay" };
    default:
      return { Icon: Globe, label: "Website", tint: "bg-indigo/10 text-indigo dark:text-silt" };
  }
}

export function TicketCard({
  ticket,
  onClick,
  layoutId,
  compact = false,
  children,
}: {
  ticket: TicketLike;
  onClick?: () => void;
  layoutId?: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  const { Icon, label, tint } = channelBits(ticket.channel);
  const settled = ticket.status === "settled";
  return (
    <motion.button
      layoutId={layoutId}
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group text-left w-full bg-card ticket-clip rounded-t-xl shadow-[0_4px_16px_-8px_rgba(27,42,74,0.25)] hover:shadow-[0_10px_28px_-12px_rgba(27,42,74,0.4)] border border-border hover:border-teal transition-colors"
      data-cursor
      data-cursor-label="OPEN"
    >
      <div className={`flex items-center justify-between px-4 py-2 rounded-t-xl ${tint}`}>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium mono">
          <Icon size={13} /> {label} Tributary
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] mono uppercase tracking-wider">
          {settled ? <><CheckCircle2 size={12} /> settled</> : <><Clock size={12} /> in flow</>}
        </span>
      </div>
      <div className="dashed-divider" />
      <div className="px-4 py-3 pb-6">
        <div className="flex items-baseline justify-between gap-2">
          <div className="font-display font-semibold text-foreground">{ticket.contact_name}</div>
          {ticket.current_type && (
            <span className="text-[10px] mono uppercase tracking-wider text-muted-foreground">{ticket.current_type}</span>
          )}
        </div>
        <p className={`text-sm text-muted-foreground mt-1 ${compact ? "line-clamp-1" : "line-clamp-2"}`}>{ticket.snippet}</p>
        {children}
      </div>
    </motion.button>
  );
}