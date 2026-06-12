import { useEffect, useState } from 'react';

// FIFA's public match API (CORS-enabled, no key required).
const API = 'https://api.fifa.com/api/v3';
const COMPETITION = '17'; // FIFA World Cup
const SEASON = '285023'; // 2026 edition

export interface LiveGoal {
  minute: string;
  player: string;
  side: 'home' | 'away';
}

export interface LiveMatch {
  id: string;
  homeId?: string; // FIFA abbreviation, matches our Team.id
  awayId?: string;
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
  matchTime: string; // e.g. "67'" — empty between periods
  period: number;
  goals: LiveGoal[];
}

const PERIOD_LABELS: Record<number, string> = {
  3: '1st half',
  4: 'Half-time',
  5: '2nd half',
  7: 'Extra time',
  10: 'Extra time',
  11: 'Penalties',
};

export function liveStatusLabel(m: LiveMatch): string {
  return m.matchTime || PERIOD_LABELS[m.period] || 'LIVE';
}

function isoDay(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function teamName(t: any): string {
  return t?.TeamName?.[0]?.Description ?? '';
}

async function fetchLiveMatches(): Promise<LiveMatch[]> {
  const cal = await fetch(
    `${API}/calendar/matches?idCompetition=${COMPETITION}&idSeason=${SEASON}&from=${isoDay(-1)}T00:00:00Z&to=${isoDay(1)}T23:59:59Z&count=30&language=en`,
  ).then((r) => r.json());
  const live = ((cal.Results ?? []) as any[]).filter((m) => m.MatchStatus === 3);

  return Promise.all(
    live.map(async (m): Promise<LiveMatch> => {
      const d = await fetch(
        `${API}/live/football/${COMPETITION}/${SEASON}/${m.IdStage}/${m.IdMatch}?language=en`,
      ).then((r) => r.json());

      const playerNames = new Map<string, string>();
      for (const team of [d.HomeTeam, d.AwayTeam]) {
        for (const p of team?.Players ?? []) {
          playerNames.set(p.IdPlayer, p.PlayerName?.[0]?.Description ?? 'Unknown');
        }
      }

      const goals: LiveGoal[] = [];
      for (const [key, side] of [['HomeTeam', 'home'], ['AwayTeam', 'away']] as const) {
        for (const g of d[key]?.Goals ?? []) {
          goals.push({
            minute: g.Minute ?? '',
            player: playerNames.get(g.IdPlayer) ?? 'Unknown',
            side,
          });
        }
      }
      goals.sort((a, b) => parseInt(a.minute) - parseInt(b.minute));

      return {
        id: m.IdMatch,
        homeId: d.HomeTeam?.Abbreviation,
        awayId: d.AwayTeam?.Abbreviation,
        homeName: teamName(d.HomeTeam),
        awayName: teamName(d.AwayTeam),
        homeScore: d.HomeTeam?.Score ?? 0,
        awayScore: d.AwayTeam?.Score ?? 0,
        matchTime: d.MatchTime ?? '',
        period: d.Period ?? 0,
        goals,
      };
    }),
  );
}

export function useLiveMatches(pollMs = 60_000) {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const result = await fetchLiveMatches();
        if (!cancelled) {
          setMatches(result);
          setUpdatedAt(new Date());
        }
      } catch {
        // network hiccup — keep showing the last known state
      }
    };
    tick();
    const timer = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [pollMs]);

  return { matches, updatedAt };
}
