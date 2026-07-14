import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function RevealHeadline({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = children.split(" ");
  const MotionTag = motion(Tag as any);
  return (
    <div ref={ref}>
      <MotionTag className={`font-display font-black leading-[1.02] tracking-tight ${className}`}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.28em]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </MotionTag>
    </div>
  );
}

export function BodyText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base md:text-lg text-muted-foreground max-w-2xl ${className}`}>{children}</p>;
}