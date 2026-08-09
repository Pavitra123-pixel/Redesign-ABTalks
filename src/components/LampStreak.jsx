// The signature element: 60 small "lamps", one per challenge day.
// Lit amber = done, dim red flicker = missed-but-saved, muted red = missed,
// pulsing amber ring = today, unlit grey = upcoming.
// Ties the whole product together: students build late at night under a lamp.

const STATUS_STYLES = {
  done: "bg-amber shadow-[0_0_8px_2px_rgba(242,169,59,0.55)]",
  "missed-saved": "bg-red-dim border border-red/60",
  missed: "bg-surface-3 border border-red/40",
  today: "bg-amber shadow-[0_0_10px_3px_rgba(242,169,59,0.7)] animate-pulse",
  upcoming: "bg-surface-3",
};

export default function LampStreak({ calendar, size = "sm", showLabel = false }) {
  const dot = size === "sm" ? "w-1.5 h-1.5" : "w-2.5 h-2.5";
  const gap = size === "sm" ? "gap-[3px]" : "gap-1";

  return (
    <div className={`flex flex-wrap ${gap}`} role="img" aria-label="60-day streak progress">
      {calendar.map((d) => (
        <span
          key={d.day}
          title={`Day ${d.day}: ${d.status.replace("-", " ")}`}
          className={`rounded-full ${dot} ${STATUS_STYLES[d.status] || STATUS_STYLES.upcoming} transition-colors`}
        />
      ))}
      {showLabel && (
        <span className="text-[10px] text-ink-dim font-mono ml-1 self-center">/60</span>
      )}
    </div>
  );
}
