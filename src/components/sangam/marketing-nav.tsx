import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MagneticButton } from "./magnetic-button";
import { Droplet } from "./droplet";

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/platform", label: "Platform" },
    { to: "/currents", label: "Currents" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
    { to: "/demo", label: "Live demo" },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur transition-colors ${scrolled ? "bg-background/85 border-b border-border" : "bg-background/40"}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-cursor data-cursor-label="HOME">
          <Droplet size={26} />
          <span className="font-display font-black text-xl tracking-tight">Sangam</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "text-sm text-foreground" }}
                  data-cursor data-cursor-label="VIEW">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground" data-cursor>Sign in</Link>
          <MagneticButton to="/register" label="GO" className="px-4 py-2 text-sm">Get started</MagneticButton>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2">{l.label}</Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <ThemeToggle />
              <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="ml-auto bg-teal text-silt px-4 py-2 rounded-full text-sm">Get started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}