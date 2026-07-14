import { useEffect, useState } from "react";

export function LiveTimestamp() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 15000);
    return () => clearInterval(id);
  }, []);
  const label = n === 0 ? "updated just now" : n < 4 ? `updated ${n * 15}s ago` : `updated ${Math.floor((n * 15) / 60)}m ago`;
  return <span className="mono text-xs text-muted-foreground">{label}</span>;
}