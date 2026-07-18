import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, Globe, ListTodo, Users, Calendar } from "lucide-react";

const leftIcons = [MessageCircle, Instagram, Globe];
const rightIcons = [ListTodo, Users, Calendar];

function MiniTicket({ Icon, tint }: { Icon: any; tint: string }) {
  return (
    <div className="w-24 h-14 bg-card border border-border ticket-clip rounded-t-md shadow-sm flex items-center gap-2 px-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tint}`}>
        <Icon size={13} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="h-1.5 rounded-full bg-muted" />
        <div className="h-1.5 rounded-full bg-muted/60 w-3/4" />
      </div>
    </div>
  );
}

export function ConfluenceHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], [-160, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const centerScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  return (
    <div ref={ref} className="relative h-[520px] md:h-[560px] w-full overflow-hidden">
      {/* Left stream */}
      <motion.div style={{ x: leftX }} className="absolute inset-0 pointer-events-none">
        {leftIcons.map((Icon, i) => (
          <div
            key={"L" + i}
            className="absolute animate-[travel-in-left_6s_ease-in-out_infinite]"
            style={{ top: `${20 + i * 12}%`, left: "6%", animationDelay: `${i * 1.6}s` }}
          >
            <MiniTicket Icon={Icon} tint="bg-teal/15 text-teal" />
          </div>
        ))}
      </motion.div>

      {/* Right stream */}
      <motion.div style={{ x: rightX }} className="absolute inset-0 pointer-events-none hidden md:block">
        {rightIcons.map((Icon, i) => (
          <div
            key={"R" + i}
            className="absolute animate-[travel-in-right_6s_ease-in-out_infinite]"
            style={{ top: `${20 + i * 12}%`, right: "6%", animationDelay: `${0.8 + i * 1.6}s` }}
          >
            <MiniTicket Icon={Icon} tint="bg-clay/15 text-clay" />
          </div>
        ))}
      </motion.div>

      {/* Center Confluence */}
      <motion.div
        style={{ scale: centerScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="relative">
          {[0, 0.8, 1.6, 2.4, 3.2, 4].map((d) => (
            <div
              key={d}
              className="absolute inset-0 -m-6 rounded-full border border-teal/40 animate-[merge-pulse_1.6s_ease-out_infinite]"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
          <div className="relative w-40 h-40 rounded-full bg-teal/10 border border-teal/40 flex items-center justify-center">
            <div className="text-center">
              <div className="mono uppercase text-[10px] tracking-widest text-teal">The</div>
              <div className="font-display font-black text-2xl text-foreground">Confluence</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}