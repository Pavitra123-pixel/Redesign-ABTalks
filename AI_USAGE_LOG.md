# AI Usage Log — ABTalks Redesign

This project was built with Claude (Anthropic) as an AI pair-programmer. Below is a
summary of how AI was used at each stage.

## 1. Design direction
Prompted Claude to design a mobile-first (390px) redesign of ABTalks — a 60-day daily
build-streak platform for Indian college students. Discussed the target user (students
building late at night, after class) and asked Claude to propose a visual identity that
reflected that context rather than a generic dashboard look.

**AI contribution:** Proposed the "desk lamp at night" visual concept — a dark charcoal
base with a warm amber accent — and the signature "Lamp Streak" component (60 small
lamp icons representing each challenge day) that ties the Landing, Dashboard, and Day
Challenge screens together visually.

## 2. Feature/UX ideation
Asked Claude to introduce at least one thoughtful idea that improves the student
experience, per the brief.

**AI contribution:** Proposed "Comeback Cards" — a mechanic where each student gets 3
cards over the 60-day run to cover a missed day without breaking their streak, instead
of the typical all-or-nothing streak reset. This was implemented in the mock data,
Dashboard (shows cards remaining + past saves), and the Day Challenge page (lets a
student spend a card on a missed day).

## 3. Code generation
Claude scaffolded the full project (Vite + React + React Router + Tailwind CSS v4) and
wrote all component code:
- `src/pages/Landing.jsx` — landing page
- `src/pages/Dashboard.jsx` — student dashboard
- `src/pages/DayChallenge.jsx` — day 12 challenge + submission form
- `src/components/LampStreak.jsx` — the signature streak visualization
- `src/components/BrandIcons.jsx` — inline GitHub/LinkedIn icons
- `src/data/mock.js` — mocked student, calendar, and challenge-day data

**Edge cases** (no streak / Day 1, a missed day, empty achievements) were explicitly
requested and implemented with conditional rendering, verified by reasoning through
each state rather than only the default demo state.

## 4. Debugging
Used Claude to diagnose and fix build errors during development, including:
- A `lucide-react` version mismatch where brand icons (GitHub/LinkedIn) were no longer
  exported — resolved by writing small inline SVG replacements.
- A Netlify deploy failure (`Could not read package.json`) caused by uploading files
  through a nested folder instead of the repository root — diagnosed from the Netlify
  deploy log and corrected by re-uploading the folder contents directly to the repo root.

## 5. Deployment support
Claude guided the GitHub repository setup and the Netlify-to-GitHub continuous
deployment linking (build command `npm run build`, publish directory `dist`).

## What was NOT AI-generated
Final review of the deployed site (screenshots, click-through testing), the decision on
which track/data to feature, and all submission steps (GitHub upload, Netlify
configuration, judging this AI Usage Log itself) were done manually by the student.
