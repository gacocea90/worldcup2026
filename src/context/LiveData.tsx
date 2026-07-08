import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { matches as staticMatches, type Match, type MatchEvent } from '../data/matches';
import { scorers as curatedScorers, assists as curatedAssists } from '../data/scorers';
import { teamById } from '../data/teams';
import { demonym } from '../data/demonyms';

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
  assists: number;
  photo?: string;
}

// Live knockout match state from FIFA, keyed by official match number (= bracket id).
export interface KnockoutInfo {
  homeId?: string;
  awayId?: string;
  homeScore?: number;
  awayScore?: number;
  homePen?: number;
  awayPen?: number;
  status: ResultStatus;
  winner?: 'home' | 'away';
  kickoff?: string; // authoritative UTC kickoff (ISO) from FIFA
  matchTime?: string; // live clock
}

interface LiveData {
  overlay: Map<string, Overlay>; // keyed by `${homeId}-${awayId}`
  knockout: Map<number, KnockoutInfo>; // keyed by FIFA match number
  scorers: ScorerRow[];
  updatedAt: Date | null;
}

const Ctx = createContext<LiveData>({
  overlay: new Map(),
  knockout: new Map(),
  scorers: curatedScorers.map((s) => ({ ...s, assists: 0 })),
  updatedAt: null,
});

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

function computeWinner(hs?: number, as?: number, hp?: number, ap?: number): 'home' | 'away' | undefined {
  if (hs == null || as == null) return undefined;
  if (hs > as) return 'home';
  if (hs < as) return 'away';
  if (hp != null && ap != null) return hp > ap ? 'home' : ap > hp ? 'away' : undefined;
  return undefined;
}

async function loadOverlay(): Promise<{ overlay: Map<string, Overlay>; knockout: Map<number, KnockoutInfo> }> {
  const cal = await fetch(
    `${API}/calendar/matches?idCompetition=${COMPETITION}&idSeason=${SEASON}&count=120&language=en`,
  ).then((r) => r.json());

  const rows = (cal.Results ?? []) as any[];
  const map = new Map<string, Overlay>();
  const knockout = new Map<number, KnockoutInfo>();
  const needGoals: { key: string; idStage: string; idMatch: string; homeId: string; awayId: string; live: boolean }[] = [];

  for (const m of rows) {
    // Knockout matches (number 73+) — capture by match number for the bracket,
    // even before teams are assigned.
    const mn = m.MatchNumber;
    if (typeof mn === 'number' && mn >= 73) {
      const status = statusOf(m.MatchStatus);
      const hs = m.Home?.Score ?? undefined;
      const as = m.Away?.Score ?? undefined;
      const hp = m.HomeTeamPenaltyScore ?? undefined;
      const ap = m.AwayTeamPenaltyScore ?? undefined;
      knockout.set(mn, {
        homeId: m.Home?.Abbreviation ?? undefined,
        awayId: m.Away?.Abbreviation ?? undefined,
        homeScore: hs,
        awayScore: as,
        homePen: hp,
        awayPen: ap,
        status,
        winner: status === 'finished' ? computeWinner(hs, as, hp, ap) : undefined,
      });
    }

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

  return { overlay: map, knockout };
}

// Assist totals keyed by normalized player name + team (the feed carries no
// assist data, so these come from the curated list in data/scorers.ts).
const assistMap = new Map(curatedAssists.map((a) => [normalize(a.player) + a.teamId, a.assists]));
const assistsFor = (player: string, teamId: string) => assistMap.get(normalize(player) + teamId) ?? 0;

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
      else {
        const player = nice?.player ?? titleCase(g.player);
        tally.set(key, {
          player,
          teamId: g.teamId,
          goals: 1,
          assists: assistsFor(player, g.teamId),
          photo: nice?.photo,
        });
      }
    }
  }
  // Fall back to the curated list until the API has reported any goals.
  if (tally.size === 0) return curatedScorers.map((s) => ({ ...s, assists: assistsFor(s.player, s.teamId) }));
  return [...tally.values()];
}

// --- Auto photos: resolve a player image from Wikipedia for any scorer
// without a curated photo. Cached in localStorage so each lookup runs once.
const PHOTO_CACHE_KEY = 'wc-autophotos-v4';

function loadPhotoCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(PHOTO_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}
function savePhotoCache(cache: Record<string, string>) {
  try {
    localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* storage full / unavailable — ignore */
  }
}

async function fetchWikiPhoto(player: string, teamId: string): Promise<string> {
  const country = teamById(teamId).name;
  // Country in the query strongly disambiguates footballers with common names.
  const search = encodeURIComponent(`${player} ${country} footballer`);
  const url =
    `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*` +
    `&generator=search&gsrsearch=${search}&gsrlimit=6` +
    `&prop=pageimages|extracts|description&piprop=thumbnail&pithumbsize=200&exintro=1&explaintext=1&exsentences=1`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`wiki ${r.status}`); // transient (e.g. rate limit) — let caller retry
  const d = await r.json();
  // The top hit isn't always the right player (e.g. a coach or namesake ranks first),
  // so scan results in rank order for the first with a photo whose intro or Wikidata
  // description confirms the player's nationality.
  const pages: any[] = Object.values(d?.query?.pages ?? {}).sort((a: any, b: any) => (a.index ?? 0) - (b.index ?? 0));
  const c = country.toLowerCase();
  const dem = demonym(teamId);
  for (const p of pages) {
    const photo: string = p?.thumbnail?.source ?? '';
    if (!photo) continue;
    const text = `${p?.extract ?? ''} ${p?.description ?? ''}`.toLowerCase();
    if (text.includes(c) || (dem !== '' && text.includes(dem))) return photo;
  }
  return '';
}

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Map<string, Overlay>>(new Map());
  const [knockout, setKnockout] = useState<Map<number, KnockoutInfo>>(new Map());
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [autoPhotos, setAutoPhotos] = useState<Record<string, string>>(() => loadPhotoCache());

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await loadOverlay();
        if (!cancelled) {
          setOverlay(next.overlay);
          setKnockout(next.knockout);
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

  const baseScorers = useMemo(() => buildScorers(overlay), [overlay]);

  // Resolve photos for scorers that have no curated image yet.
  useEffect(() => {
    const missing = baseScorers.filter((s) => !s.photo && !(normalize(s.player) in autoPhotos));
    if (missing.length === 0) return;
    let cancelled = false;
    (async () => {
      const updates: Record<string, string> = {};
      await mapLimit(missing, 3, async (s) => {
        try {
          // A successful query caches its result — a URL, or '' when no verified
          // match exists (those players are filled from curated data instead).
          updates[normalize(s.player)] = await fetchWikiPhoto(s.player, s.teamId);
        } catch {
          // Transient failure (network/rate limit): don't cache, so it retries
          // on the next poll instead of sticking as a permanent blank.
        }
      });
      if (!cancelled && Object.keys(updates).length) {
        setAutoPhotos((prev) => {
          const next = { ...prev, ...updates };
          savePhotoCache(next);
          return next;
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [baseScorers, autoPhotos]);

  const scorers = useMemo(
    () => baseScorers.map((s) => (s.photo ? s : { ...s, photo: autoPhotos[normalize(s.player)] || undefined })),
    [baseScorers, autoPhotos],
  );

  return <Ctx.Provider value={{ overlay, knockout, scorers, updatedAt }}>{children}</Ctx.Provider>;
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
