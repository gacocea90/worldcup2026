# ⚽ World Cup 2026 Tracker

A fast single-page site for following the FIFA World Cup 2026 (June 11 – July 19, USA · Canada · Mexico).

Built with **Vite 8 + React 19 + TypeScript + Tailwind CSS 4**.

## Run it

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build into dist/
```

## Sections

- **Matches** — all 72 group-stage fixtures grouped by day, with filters for today / finished / upcoming and by group, plus the knockout-round calendar.
- **Teams & Players** — all 12 groups with live standings tables (computed automatically from recorded results) and key players for each of the 48 qualified teams, searchable by team or player name.
- **Top Scorers** — the Golden Boot race, ranked automatically from [`src/data/scorers.ts`](src/data/scorers.ts) with ties sharing the same rank.

## Updating scores

Edit [`src/data/matches.ts`](src/data/matches.ts): for a played match set

```ts
status: 'finished', homeScore: 2, awayScore: 1
```

Group standings, goal difference, and points recalculate automatically.
