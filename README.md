# ABTalks — Redesign

A mobile-first (390px) redesign of ABTalks, the 60-day daily-build challenge
for Indian college students. Built with React, React Router, and Tailwind CSS v4.

## Route Map

```
/
/dashboard
/day/12
```

## Run locally

```bash
npm install
npm run dev
```

## Design concept

Students use this at night, after class, alone with a laptop. The whole UI
is built around that: a dark "desk lamp" palette (deep charcoal base, warm
amber glow), and one signature element — **the Lamp Streak** — a strip of
60 small lamps, one per challenge day. Unlit = upcoming, glowing amber =
done, pulsing = today, dim red = missed. It appears on all three screens as
the same visual thread: unlit and aspirational on the landing page, lit up
with real progress on the dashboard, and providing local context on the day
page.

Typography: Space Grotesk (display), Inter (body), JetBrains Mono (streak
counters, code-flavoured labels) — chosen to feel like a builder's tool, not
a generic SaaS dashboard.

## The one thoughtful idea: Comeback Cards

Daily-streak products usually go all-or-nothing: miss one day and the whole
60-day streak resets to zero. For students juggling exams, placements, and
sleep, that's punishing rather than motivating — one bad night undoes three
weeks of consistency, so many just give up after the first miss.

Every student gets **3 Comeback Cards** for the 60-day run. Missing a day
doesn't break the streak automatically — the student can spend a Comeback
Card to cover it (visible on `/day/12`'s missed-day state), and the
dashboard is transparent about when one was used ("Day 7 missed — covered
with a Comeback Card"). It keeps the honesty of a real streak (you can still
run out of cards and break it) while making the mechanic forgiving enough to
survive a real semester.

## Edge cases handled

- **No streak yet (Day 1):** dashboard swaps the streak counter for
  "Day 1 awaits" messaging instead of showing "0 days."
- **Missed day:** `/day/:id` detects a `missed` status and offers to spend a
  Comeback Card instead of silently failing or hiding the day.
- **Empty achievements:** the badge grid falls back to an encouraging empty
  state ("Your first badge is one commit away") rather than an empty grid.

## Data

All data is mocked in `src/data/mock.js` — no backend, no auth, no database,
per the brief.
