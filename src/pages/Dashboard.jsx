import { Link } from "react-router-dom";
import {
  Flame,
  ChevronRight,
  Shield,
  Trophy,
  Flag,
  Users,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons.jsx";
import LampStreak from "../components/LampStreak.jsx";
import { student, calendar, days } from "../data/mock.js";

const BADGE_ICONS = { flame: Flame, trophy: Trophy, shield: Shield, flag: Flag };

export default function Dashboard() {
  const todayTask = days[student.currentDay];
  const isFirstDay = student.currentDay === 1;
  const hasStreak = student.streak > 0;
  const earnedBadges = student.badges.filter((b) => b.earned);
  const hasBadges = earnedBadges.length > 0;

  // Most recent missed-and-saved day, if any — surfaces the Comeback Card story.
  const recentSave = [...calendar]
    .filter((d) => d.status === "missed-saved" && d.day < student.currentDay)
    .pop();

  return (
    <div className="min-h-screen bg-base text-ink font-body pb-10">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-base/90 backdrop-blur border-b border-line">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber" strokeWidth={2.2} />
            <span className="font-display font-semibold tracking-tight text-[17px]">ABTalks</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-3 border border-line flex items-center justify-center font-mono text-[11px] text-ink-muted">
            {student.name.charAt(0)}
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5">
        {/* Greeting + streak */}
        <section className="pt-6 pb-5">
          <p className="text-[13px] text-ink-muted mb-1">
            {isFirstDay ? "Welcome," : "Welcome back,"} {student.name} 👋
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight mb-4">
            {student.track} Track
          </h1>

          <div className="lamp-glow bg-surface border border-line rounded-2xl p-5">
            {hasStreak ? (
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-6 h-6 text-amber" />
                    <span className="font-display text-3xl font-bold">{student.streak}</span>
                  </div>
                  <p className="text-[12px] text-ink-muted mt-1">day streak</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-ink">
                    Day {student.currentDay}
                    <span className="text-ink-dim">/{student.totalDays}</span>
                  </p>
                  <p className="text-[11px] text-ink-dim mt-1">longest: {student.longestStreak}d</p>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="font-display text-xl font-semibold mb-1">Day 1 awaits.</p>
                <p className="text-[13px] text-ink-muted">
                  No streak yet — ship tonight's task to light your first lamp.
                </p>
              </div>
            )}

            <LampStreak calendar={calendar} size="sm" showLabel />

            {recentSave && (
              <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-ink-muted">
                <Shield className="w-3.5 h-3.5 text-amber shrink-0" />
                <span>
                  Day {recentSave.day} missed — covered with a Comeback Card. Streak stayed alive.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Today's task */}
        <section className="pb-5">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Today's task
          </h2>
          {todayTask ? (
            <Link
              to={`/day/${student.currentDay}`}
              className="block bg-surface border border-line rounded-2xl p-5 focus-ring hover:border-amber/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block text-[10.5px] font-mono text-amber bg-amber-dim/40 rounded-full px-2 py-0.5 mb-2">
                    Day {student.currentDay}
                  </span>
                  <h3 className="font-display font-semibold text-[16px] leading-snug mb-1.5">
                    {todayTask.title}
                  </h3>
                  <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2">
                    {todayTask.brief}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-dim shrink-0 mt-1" />
              </div>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-ink-dim">
                <span className="flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5" /> repo
                </span>
                <span className="flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5" /> post
                </span>
              </div>
            </Link>
          ) : (
            <div className="bg-surface border border-line rounded-2xl p-5 text-center">
              <p className="text-[13px] text-ink-muted">
                Nothing scheduled yet — check back tomorrow.
              </p>
            </div>
          )}
        </section>

        {/* Progress */}
        <section className="pb-5">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Progress
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface border border-line rounded-xl p-4">
              <p className="font-display text-2xl font-bold text-teal">{student.completionPercent}%</p>
              <p className="text-[11px] text-ink-muted mt-1">challenge complete</p>
            </div>
            <div className="bg-surface border border-line rounded-xl p-4">
              <p className="font-display text-2xl font-bold">
                {student.comebackCards.remaining}
                <span className="text-ink-dim text-base">/{student.comebackCards.total}</span>
              </p>
              <p className="text-[11px] text-ink-muted mt-1">comeback cards left</p>
            </div>
          </div>
        </section>

        {/* Standing */}
        <section className="pb-5">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Standing
          </h2>
          <div className="bg-surface border border-line rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-surface-3 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-ink-muted" />
            </div>
            <p className="text-[13px] text-ink-muted">
              Ranked <span className="text-ink font-semibold font-mono">#{student.rank}</span> of{" "}
              {student.totalStudents.toLocaleString()} in {student.track}
            </p>
          </div>
        </section>

        {/* Achievements */}
        <section className="pb-4">
          <h2 className="font-display text-sm font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Achievements
          </h2>
          {hasBadges ? (
            <div className="grid grid-cols-4 gap-2.5">
              {student.badges.map((b) => {
                const Icon = BADGE_ICONS[b.icon] || Trophy;
                return (
                  <div
                    key={b.id}
                    className={`flex flex-col items-center gap-1.5 rounded-xl p-3 border ${
                      b.earned
                        ? "bg-surface border-amber/30"
                        : "bg-surface/40 border-line opacity-40"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${b.earned ? "text-amber" : "text-ink-dim"}`} />
                    <span className="text-[9px] text-center text-ink-muted leading-tight">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface border border-dashed border-line rounded-xl p-5 text-center">
              <Trophy className="w-5 h-5 text-ink-dim mx-auto mb-2" />
              <p className="text-[12.5px] text-ink-muted">
                Your first badge is one commit away.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
