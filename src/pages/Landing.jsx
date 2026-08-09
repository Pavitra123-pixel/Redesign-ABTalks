import { Link } from "react-router-dom";
import { Flame, ArrowRight, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons.jsx";
import LampStreak from "../components/LampStreak.jsx";

const previewCalendar = Array.from({ length: 60 }, (_, i) => ({
  day: i + 1,
  status: "upcoming",
}));

const tracks = [
  { name: "Web Development", desc: "Ship a real feature a day — from forms to full apps." },
  { name: "Data Science", desc: "Clean data, build models, explain what they find." },
  { name: "App Development", desc: "One mobile screen at a time, to a shipped app." },
  { name: "AI / ML", desc: "From your first classifier to a deployed model." },
];

const steps = [
  {
    n: "01",
    title: "Pick a track",
    body: "Web dev, data science, app dev, or AI. One focus, 60 days.",
  },
  {
    n: "02",
    title: "Build every day",
    body: "A new task each morning. Small enough to finish after class.",
  },
  {
    n: "03",
    title: "Prove it, publicly",
    body: "Push a GitHub commit and post it on LinkedIn. That's your streak.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-base text-ink font-body">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-base/90 backdrop-blur border-b border-line">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber" strokeWidth={2.2} />
            <span className="font-display font-semibold tracking-tight text-[17px]">ABTalks</span>
          </div>
          <Link
            to="/dashboard"
            className="text-xs font-medium text-ink-muted hover:text-ink transition-colors focus-ring rounded"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="lamp-glow px-5 pt-10 pb-8 max-w-md mx-auto">
        <p className="font-mono text-[11px] text-amber tracking-wide mb-4">
          $ streak --init --days=60
        </p>
        <h1 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight mb-4">
          Build one thing a day.
          <br />
          Prove it for <span className="text-amber">60 days</span>.
        </h1>
        <p className="text-[15px] text-ink-muted leading-relaxed mb-7">
          ABTalks is a daily build challenge for Indian college students. Pick
          a track, ship something small every night, and back it up with a
          GitHub commit and a LinkedIn post — so recruiters see the work, not
          just the resume.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="group flex items-center justify-center gap-2 bg-amber text-[#16130a] font-display font-semibold text-[15px] rounded-xl px-5 py-3.5 focus-ring"
          >
            Start Day 1
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="text-center text-[13px] text-ink-muted underline underline-offset-4 decoration-line hover:text-ink transition-colors py-1 focus-ring rounded"
          >
            See how it works
          </a>
        </div>

        {/* Signature: the lamp strip, unlit — the 60 nights ahead */}
        <div className="mt-9 bg-surface border border-line rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-ink-dim">your next 60 nights</span>
            <span className="text-[11px] font-mono text-ink-dim">0/60</span>
          </div>
          <LampStreak calendar={previewCalendar} size="sm" />
        </div>
      </section>

      {/* Trust stats */}
      <section className="px-5 py-6 max-w-md mx-auto grid grid-cols-3 gap-3">
        {[
          ["2,840+", "students building"],
          ["61k+", "commits pushed"],
          ["4", "tracks to choose"],
        ].map(([n, label]) => (
          <div key={label} className="bg-surface border border-line rounded-xl px-3 py-4 text-center">
            <p className="font-display text-lg font-semibold text-ink">{n}</p>
            <p className="text-[10.5px] text-ink-muted mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-5 py-8 max-w-md mx-auto">
        <h2 className="font-display text-xl font-semibold mb-5">How it works</h2>
        <div className="flex flex-col gap-4">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 bg-surface border border-line rounded-xl p-4">
              <span className="font-mono text-amber text-sm font-semibold shrink-0">{s.n}</span>
              <div>
                <h3 className="font-display font-semibold text-[15px] mb-1">{s.title}</h3>
                <p className="text-[13px] text-ink-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 bg-surface-2 border border-line rounded-xl p-4">
          <div className="flex -space-x-1">
            <span className="w-7 h-7 rounded-full bg-surface-3 border border-line flex items-center justify-center">
              <GithubIcon className="w-3.5 h-3.5 text-ink-muted" />
            </span>
            <span className="w-7 h-7 rounded-full bg-surface-3 border border-line flex items-center justify-center">
              <LinkedinIcon className="w-3.5 h-3.5 text-ink-muted" />
            </span>
          </div>
          <p className="text-[12px] text-ink-muted leading-snug">
            Every day's proof is a commit + a post. That's the whole streak
            mechanic — no quizzes, no gatekeeping.
          </p>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-5 py-8 max-w-md mx-auto">
        <h2 className="font-display text-xl font-semibold mb-5">Choose your track</h2>
        <div className="flex flex-col gap-3">
          {tracks.map((t) => (
            <div key={t.name} className="bg-surface border border-line rounded-xl p-4">
              <h3 className="font-display font-semibold text-[14px] mb-1">{t.name}</h3>
              <p className="text-[12.5px] text-ink-muted leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Missed day honesty — sets expectations before they commit */}
      <section className="px-5 py-8 max-w-md mx-auto">
        <div className="bg-surface-2 border border-line rounded-2xl p-5">
          <h2 className="font-display font-semibold text-[15px] mb-2">
            Life happens. Your streak survives it.
          </h2>
          <p className="text-[13px] text-ink-muted leading-relaxed mb-3">
            Miss a day — an exam, a bad night's sleep — and you're not out.
            Every student gets 3 <span className="text-amber font-medium">Comeback Cards</span> to
            cover a missed day without losing their streak.
          </p>
          <div className="flex items-center gap-1.5 text-[12px] text-teal">
            <Check className="w-3.5 h-3.5" />
            <span>No all-or-nothing pressure. Just consistency.</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-10 max-w-md mx-auto">
        <div className="lamp-glow bg-surface border border-line rounded-2xl p-6 text-center">
          <h2 className="font-display text-xl font-semibold mb-2">
            Day 1 is waiting.
          </h2>
          <p className="text-[13px] text-ink-muted mb-5">
            Free to join. No résumé needed — just a GitHub account.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-amber text-[#16130a] font-display font-semibold text-[15px] rounded-xl px-6 py-3.5 focus-ring w-full"
          >
            Start Day 1
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="px-5 py-6 text-center text-[11px] text-ink-dim border-t border-line">
        ABTalks · a 60-day build streak for Indian college students
      </footer>
    </div>
  );
}
