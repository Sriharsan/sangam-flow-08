import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    let raf = 0;
    let tx = -100, ty = -100;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest?.("a,button,[role=button],input,select,textarea,[data-cursor]");
      setHovering(!!interactive);
      const l = (interactive as HTMLElement | null)?.dataset?.cursorLabel ?? null;
      setLabel(l);
    };
    const tick = () => {
      tx += (window.__cx - tx) * 0.18;
      ty += (window.__cy - ty) * 0.18;
      setTrail({ x: tx, y: ty });
      raf = requestAnimationFrame(tick);
    };
    // stash coords for the trail loop
    (window as any).__cx = -100; (window as any).__cy = -100;
    const stash = (e: MouseEvent) => { (window as any).__cx = e.clientX; (window as any).__cy = e.clientY; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", stash);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", stash);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`html, body, a, button { cursor: none !important; }`}</style>
      <div
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          width: 8, height: 8, borderRadius: 999,
          background: "var(--teal)",
          pointerEvents: "none", zIndex: 9999,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          transform: `translate(${trail.x - (hovering ? 26 : 16)}px, ${trail.y - (hovering ? 26 : 16)}px)`,
          width: hovering ? 52 : 32, height: hovering ? 52 : 32,
          borderRadius: 999,
          border: `1.5px solid ${hovering ? "var(--teal)" : "var(--muted-foreground)"}`,
          background: hovering ? "color-mix(in oklab, var(--teal) 12%, transparent)" : "transparent",
          pointerEvents: "none", zIndex: 9998,
          transition: "width .18s ease, height .18s ease, border-color .18s ease, background .18s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em",
          color: "var(--teal)",
        }}
      >
        {hovering && label ? label : null}
      </div>
    </>
  );
}

declare global {
  interface Window { __cx: number; __cy: number }
}