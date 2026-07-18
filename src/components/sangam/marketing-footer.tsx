import { Link } from "@tanstack/react-router";
import { Droplet } from "./droplet";

export function MarketingFooter() {
  return (
    <footer className="bg-indigo text-silt grain">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplet size={28} />
            <span className="font-display font-black text-xl">Sangam</span>
          </div>
          <p className="mt-3 text-sm text-silt/70 max-w-xs">Two streams, one current. Customer chat and internal work in a single agent.</p>
        </div>
        <div>
          <div className="mono uppercase text-xs text-silt/60 tracking-wider mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/platform">Platform</Link></li>
            <li><Link to="/currents">Currents</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/demo">Live demo</Link></li>
          </ul>
        </div>
        <div>
          <div className="mono uppercase text-xs text-silt/60 tracking-wider mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mono uppercase text-xs text-silt/60 tracking-wider mb-3">Get started</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/register">Create account</Link></li>
            <li><Link to="/login">Sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-silt/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 text-xs text-silt/60 mono flex justify-between">
          <span>© {new Date().getFullYear()} Sangam</span>
          <span>Made with two streams</span>
        </div>
      </div>
    </footer>
  );
}