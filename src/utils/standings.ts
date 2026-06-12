import { matches } from '../data/matches';
import { teams, type Team } from '../data/teams';

export interface StandingRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export function groupStandings(group: string): StandingRow[] {
  const rows = new Map<string, StandingRow>();
  for (const team of teams.filter((t) => t.group === group)) {
    rows.set(team.id, { team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 });
  }
  for (const m of matches) {
    if (m.group !== group || m.status !== 'finished') continue;
    const home = rows.get(m.home)!;
    const away = rows.get(m.away)!;
    const hs = m.homeScore!;
    const as = m.awayScore!;
    home.played++; away.played++;
    home.goalsFor += hs; home.goalsAgainst += as;
    away.goalsFor += as; away.goalsAgainst += hs;
    if (hs > as) { home.won++; away.lost++; home.points += 3; }
    else if (hs < as) { away.won++; home.lost++; away.points += 3; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }
  return [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
      b.goalsFor - a.goalsFor ||
      a.team.name.localeCompare(b.team.name),
  );
}
