import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Circle,
  Shield,
  Flame,
  BookOpen,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons.jsx";
import LampStreak from "../components/LampStreak.jsx";
import { days, calendar, student } from "../data/mock.js";

export default function DayChallenge() {
  const { dayId } = useParams();
  const dayNum = Number(dayId);
  const task = days[dayNum];
  const calDay = calendar.find((d) => d.day === dayNum);

  const [status, setStatus] = useState(task?.status || "upcoming");
  const [repoUrl, setRepoUrl] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [submitted, setSubmitted] = useState(status === "done");
  const [checked, setChecked] = useState({});

  const toggleCheck = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));

  const canSubmit = repoUrl.trim().length > 3 && postUrl.trim().length > 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setStatus("done");
  };

  const useComeback = () => {
    setStatus("missed-saved");
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-base text-ink font-body flex flex-col items-center justify-center px-6 text-center">
        <Circle className="w-8 h-8 text-ink-dim mb-3" />
        <p className="font-display text-lg font-semibold mb-1">Day {dayNum || "?"} isn't live yet</p>
        <p className="text-[13px] text-ink-muted mb-5">This task unlocks when its day arrives.</p>
        <Link to="/dashboard" className="text-amber text-sm underline underline-offset-4">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-ink font-body pb-12">
      <header className="sticky top-0 z-20 bg-base/90 backdrop-blur border-b border-line">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-3">
          <Link to="/dashboard" className="focus-ring rounded p-0.5 -ml-0.5">
            <ArrowLeft className="w-5 h-5 text-ink-muted" />
          </Link>
          <span className="font-display font-semibold text-[15px]">
            Day {task.day} <span className="text-ink-dim font-normal">/ {student.totalDays}</span>
          </span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5">
        {/* Task header */}
        <section className="pt-6 pb-5">
          <span className="inline-block text-[10.5px] font-mono text-amber bg-amber-dim/40 rounded-full px-2 py-0.5 mb-3">
            {task.track}
          </span>
          <h1 className="font-display text-2xl font-semibold tracking-tight leading-snug mb-2">
            {task.title}
          </h1>
          <p className="text-[14px] text-ink-muted leading-relaxed">{task.brief}</p>
        </section>

        {/* Missed, unsaved — offer Comeback Card */}
        {status === "missed" && (
          <section className="pb-5">
            <div className="bg-red-dim/40 border border-red/40 rounded-2xl p-5">
              <p className="font-display font-semibold text-[14px] mb-1">You missed this day.</p>
              <p className="text-[13px] text-ink-muted mb-4">
                {student.comebackCards.remaining > 0
                  ? `Use a Comeback Card to keep your streak alive. ${student.comebackCards.remaining} left.`
                  : "You're out of Comeback Cards for now — this one breaks the streak."}
              </p>
              {student.comebackCards.remaining > 0 && (
                <button
                  onClick={useComeback}
                  className="flex items-center justify-center gap-2 w-full bg-amber text-[#16130a] font-display font-semibold text-[14px] rounded-xl px-4 py-3 focus-ring"
                >
                  <Shield className="w-4 h-4" /> Use a Comeback Card
                </button>
              )}
            </div>
          </section>
        )}

        {status === "missed-saved" && (
          <section className="pb-5">
            <div className="bg-surface-2 border border-amber/30 rounded-2xl p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-amber shrink-0" />
              <p className="text-[13px] text-ink-muted">
                Saved with a Comeback Card. Your streak wasn't broken — but push a late commit
                when you can.
              </p>
            </div>
          </section>
        )}

        {/* What to build */}
        <section className="pb-5">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-3">
            What to build
          </h2>
          <div className="bg-surface border border-line rounded-2xl p-4 flex flex-col gap-3">
            {task.checklist.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className="flex items-start gap-3 text-left focus-ring rounded-lg -m-0.5 p-0.5"
              >
                <span
                  className={`w-4.5 h-4.5 rounded-md border shrink-0 mt-0.5 flex items-center justify-center ${
                    checked[i] ? "bg-teal border-teal" : "border-line"
                  }`}
                  style={{ width: 18, height: 18 }}
                >
                  {checked[i] && <Check className="w-3 h-3 text-base" strokeWidth={3} />}
                </span>
                <span
                  className={`text-[13.5px] leading-relaxed ${
                    checked[i] ? "text-ink-muted line-through" : "text-ink"
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Resources */}
        {task.resources?.length > 0 && (
          <section className="pb-5">
            <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-3">
              Helpful resources
            </h2>
            <div className="flex flex-col gap-2">
              {task.resources.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-2.5 bg-surface border border-line rounded-xl px-4 py-3"
                >
                  <BookOpen className="w-3.5 h-3.5 text-ink-dim shrink-0" />
                  <span className="text-[12.5px] text-ink-muted">{r}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Submission */}
        <section className="pb-5">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-3">
            Submit proof of work
          </h2>

          {submitted ? (
            <div className="bg-teal-dim/40 border border-teal/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-amber" />
                <p className="font-display font-semibold text-[14px]">
                  Day {task.day} lamp lit. Streak's alive.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-[12.5px]">
                <a
                  href={repoUrl || "#"}
                  className="flex items-center gap-2 text-ink-muted truncate hover:text-ink"
                >
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{repoUrl || "github.com/…"}</span>
                </a>
                <a
                  href={postUrl || "#"}
                  className="flex items-center gap-2 text-ink-muted truncate hover:text-ink"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{postUrl || "linkedin.com/…"}</span>
                </a>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-[12px] text-ink-dim underline underline-offset-4 focus-ring rounded"
              >
                Edit submission
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-line rounded-2xl p-5 flex flex-col gap-4"
            >
              <label className="block">
                <span className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-1.5">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub repo or commit URL
                </span>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/you/day-12"
                  className="w-full bg-surface-2 border border-line rounded-lg px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-dim focus-ring font-mono"
                />
              </label>
              <label className="block">
                <span className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn post URL
                </span>
                <input
                  type="url"
                  required
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/…"
                  className="w-full bg-surface-2 border border-line rounded-lg px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-dim focus-ring font-mono"
                />
              </label>
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-1 flex items-center justify-center gap-2 bg-amber disabled:bg-surface-3 disabled:text-ink-dim text-[#16130a] font-display font-semibold text-[14.5px] rounded-xl px-4 py-3.5 focus-ring transition-colors"
              >
                <Flame className="w-4 h-4" /> Light today's lamp
              </button>
              <p className="text-[11px] text-ink-dim text-center leading-relaxed">
                We check that both links are reachable — no manual review needed to keep your streak.
              </p>
            </form>
          )}
        </section>

        {/* Streak context */}
        <section>
          <div className="bg-surface-2 border border-line rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-ink-dim">this run</span>
              <span className="text-[11px] font-mono text-ink-dim">
                day {task.day}/{student.totalDays}
              </span>
            </div>
            <LampStreak calendar={calendar} size="sm" />
          </div>
        </section>
      </div>
    </div>
  );
}
