# From Setup to Habit

A Senior Growth PM take-home proposal for Surfe, by Levente Dudás.

**Live:** [surfe-case-levente.vercel.app](https://surfe-case-levente.vercel.app)

An 11-slide interactive deck that proposes redesigning Surfe's self-serve onboarding around a "guided first prospecting session", replacing today's blank-slate dashboard with a value-first flow that teaches the daily workflow across both the Surfe web app and the LinkedIn extension.

## Deck structure

| # | Slide | Part |
|---|---|---|
| 1 | Title | Intro |
| 2 | Metrics & tradeoffs | Part 1 · Discovery |
| 3 | Why Add to CRM, and how I'd stress-test it | Part 1 · Discovery |
| 4 | Opportunity sizing | Part 1 · Discovery |
| 5 | Today's onboarding problem | Part 2 · Feature Design |
| 6 | The redesign (interactive demo) | Part 2 · Feature Design |
| 7 | MVP scope | Part 2 · Feature Design |
| 8 | How we'd ship it | Part 3 · Execution |
| 9 | Measurement & experiment design | Part 4 · Measurement |
| 10 | Beyond this feature | Closing |
| 11 | A parallel bet: AI agents | Closing |

## Stack

- Hand-rolled HTML / CSS / JS, no build step
- Real Surfe brand tokens extracted from surfe.com (the "Wave" design system)
- Inter (Google Fonts)
- Canvas scales to fit any viewport while preserving 16:9 aspect

## Navigation

- Arrow keys `←` `→` / `Space` / `PageDown` / `PageUp` to navigate
- On slide 6 (interactive demo), arrows first advance through the 5 states, then move to the next slide
- Hash routing: `#/1` through `#/11`

## Local development

No dependencies. Just serve the folder:

```
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Deployment

Deployed on Vercel. Any push to `main` redeploys automatically.
