import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { matches as staticMatches, type Match, type MatchEvent } from '../data/matches';
import { scorers as curatedScorers } from '../data/scorers';

// FIFA's public match API (CORS-enabled, no key required).
const API = 'https://api.fifa.com/api/v3';
const COMPETITION = '17';
const SEASON = '285023';

export type ResultStatus = 'finished' | 'live' | 'upcoming';

export interface Overlay {
  status: ResultStatus;
  homeScore?: number;
  awayScore?: number;
  matchTime: string; // live clock, e.g. "67'"
  kickoff?: string; // authoritative UTC kickoff (ISO) from FIFA
  goals: { side: 'home' | 'away'; teamId: string; player: string; minute: string; ownGoal?: boolean }[];
}

export interface ScorerRow {
  player: string;
  teamId: string;
  goals: number;
  photo?: string;
}

interface LiveData {
  overlay: Map<string, Overlay>; // keyed by `${homeId}-${awayId}`
  scorers: ScorerRow[];
  updatedAt: Date | null;
}

const Ctx = createContext<LiveData>({ overlay: new Map(), scorers: curatedScorers, updatedAt: null });

const pairKey = (home: string, away: string) => `${home}-${away}`;

// "HWANG Inbeom" / "Hwang In-beom" → "hwanginbeom" for cross-matching API & curated names.
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/* eslint-disable @typescript-eslint/no-explicit-any */
function statusOf(code: number): ResultStatus {
  if (code === 3) return 'live';
  if (code === 0) return 'finished';
  return 'upcoming';
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  });
  await Promise.all(workers);
  return out;
}

async function fetchGoals(idStage: string, idMatch: string, homeId: string, awayId: string) {
  const d = await fetch(`${API}/live/football/${COMPETITION}/${SEASON}/${idStage}/${idMatch}?language=en`).then((r) => r.json());
  const names = new Map<string, string>();
  for (const t of [d.HomeTeam, d.AwayTeam]) {
    for (const p of t?.Players ?? []) names.set(p.IdPlayer, p.PlayerName?.[0]?.Description ?? '');
  }
  const goals: Overlay['goals'] = [];
  for (const [key, side, teamId] of [['HomeTeam', 'home', homeId], ['AwayTeam', 'away', awayId]] as const) {
    for (const g of d[key]?.Goals ?? []) {
      goals.push({ side, teamId, player: names.get(g.IdPlayer) ?? 'Unknown', minute: g.Minute ?? '', ownGoal: g.Type === 3 });
    }
  }
  return goals.sort((a, b) => parseInt(a.minute) - parseInt(b.minute));
}

async function loadOverlay(): Promise<Map<string, Overlay>> {
  const cal = await fetch(
    `${API}/calendar/matches?idCompetition=${COMPETITION}&idSeason=${SEASON}&count=120&language=en`,
  ).then((r) => r.json());

  const rows = (cal.Results ?? []) as any[];
  const map = new Map<string, Overlay>();
  const needGoals: { key: string; idStage: string; idMatch: string; homeId: string; awayId: string; live: boolean }[] = [];

  for (const m of rows) {
    const homeId = m.Home?.Abbreviation;
    const awayId = m.Away?.Abbreviation;
    if (!homeId || !awayId) continue;
    const status = statusOf(m.MatchStatus);
    const key = pairKey(homeId, awayId);
    map.set(key, {
      status,
      homeScore: m.Home?.Score ?? undefined,
      awayScore: m.Away?.Score ?? undefined,
      matchTime: m.MatchTime ?? '',
      kickoff: m.Date ?? undefined,
      goals: [],
    });
    if (status === 'finished' || status === 'live') {
      needGoals.push({ key, idStage: m.IdStage, idMatch: m.IdMatch, homeId, awayId, live: status === 'live' });
    }
  }

  // Fetch goal timelines for finished/live games; cache finished ones for the session.
  await mapLimit(needGoals, 6, async (g) => {
    const cacheKey = `wc-goals-v2-${g.idMatch}`;
    try {
      if (!g.live) {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          map.get(g.key)!.goals = JSON.parse(cached);
          return;
        }
      }
      const goals = await fetchGoals(g.idStage, g.idMatch, g.homeId, g.awayId);
      map.get(g.key)!.goals = goals;
      if (!g.live) sessionStorage.setItem(cacheKey, JSON.stringify(goals));
    } catch {
      /* leave goals empty on failure */
    }
  });

  return map;
}

function buildScorers(overlay: Map<string, Overlay>): ScorerRow[] {
  // Photo + nicely-formatted name from the curated list, matched by normalized name.
  const curated = new Map(curatedScorers.map((s) => [normalize(s.player), s]));
  const tally = new Map<string, ScorerRow>();
  for (const o of overlay.values()) {
    for (const g of o.goals) {
      if (g.ownGoal) continue; // own goals don't count toward the Golden Boot
      const norm = normalize(g.player);
      const nice = curated.get(norm);
      const key = norm + g.teamId;
      const existing = tally.get(key);
      if (existing) existing.goals += 1;
      else
        tally.set(key, {
          player: nice?.player ?? titleCase(g.player),
          teamId: g.teamId,
          goals: 1,
          photo: nice?.photo,
        });
    }
  }
  // Fall back to the curated list until the API has reported any goals.
  if (tally.size === 0) return curatedScorers;
  return [...tally.values()];
}

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Map<string, Overlay>>(new Map());
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await loadOverlay();
        if (!cancelled) {
          setOverlay(next);
          setUpdatedAt(new Date());
        }
      } catch {
        /* keep last known data on network failure */
      }
    };
    tick();
    const timer = setInterval(tick, 60_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const scorers = useMemo(() => buildScorers(overlay), [overlay]);

  return <Ctx.Provider value={{ overlay, scorers, updatedAt }}>{children}</Ctx.Provider>;
}

export const useLiveData = () => useContext(Ctx);

// Apply live/finished scores from the API on top of a static match.
export function applyOverlay(m: Match, overlay: Map<string, Overlay>): Match & { live?: boolean; matchTime?: string } {
  const o = overlay.get(pairKey(m.home, m.away));
  if (!o || o.status === 'upcoming') return m;
  const events: MatchEvent[] | undefined =
    m.events ??
    (o.goals.length
      ? o.goals.map((g) => ({
          minute: g.minute,
          type: 'goal' as const,
          side: g.side,
          player: g.player,
          note: g.ownGoal ? 'own goal' : undefined,
        }))
      : undefined);
  return {
    ...m,
    status: 'finished',
    live: o.status === 'live',
    homeScore: o.homeScore ?? m.homeScore,
    awayScore: o.awayScore ?? m.awayScore,
    matchTime: o.matchTime,
    events,
  };
}

// Matches with finished results applied — used to compute live standings.
export function finishedMerged(overlay: Map<string, Overlay>): Match[] {
  return staticMatches.map((m) => {
    const o = overlay.get(pairKey(m.home, m.away));
    if (o && o.status === 'finished') {
      return { ...m, status: 'finished', homeScore: o.homeScore ?? m.homeScore, awayScore: o.awayScore ?? m.awayScore };
    }
    return m;
  });
}
