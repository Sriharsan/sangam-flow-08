import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  to?: string;
  label?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function MagneticButton({ children, variant = "primary", to, label, className = "", ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 90) {
        const pull = 1 - dist / 90;
        el.style.transform = `translate(${dx * 0.45 * pull}px, ${dy * 0.45 * pull}px) scale(1.04)`;
      } else {
        el.style.transform = "translate(0,0) scale(1)";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.style.transform = "";
    };
  }, []);

  const base = "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-out will-change-transform";
  const styles = {
    primary: "bg-teal text-silt hover:opacity-90 shadow-sm",
    secondary: "border border-current text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  }[variant];

  const cls = `${base} ${styles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} ref={ref as any} data-cursor data-cursor-label={label ?? "OPEN"}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref as any} className={cls} data-cursor data-cursor-label={label ?? "GO"} {...rest}>
      {children}
    </button>
  );
}