export function Marquee() {
  const items = ["WhatsApp Tributary", "Instagram Tributary", "Website Tributary", "Internal Tasks"];
  const line = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-indigo text-teal border-y border-indigo/40 overflow-hidden grain">
      <div className="flex whitespace-nowrap mono text-sm py-3 hover:[animation-play-state:paused]"
           style={{ animation: "marquee 45s linear infinite" }}>
        {line.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal/70" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}