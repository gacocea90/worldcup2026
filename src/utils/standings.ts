import { matches as staticMatches, type Match } from '../data/matches';
import { teams, type Team } from '../data/teams';

export type FormResult = 'W' | 'D' | 'L';

export interface StandingRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: FormResult[]; // chronological, oldest → newest
}

export function groupStandings(group: string, matches: Match[] = staticMatches): StandingRow[] {
  const rows = new Map<string, StandingRow>();
  for (const team of teams.filter((t) => t.group === group)) {
    rows.set(team.id, { team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, form: [] });
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
    if (hs > as) { home.won++; away.lost++; home.points += 3; home.form.push('W'); away.form.push('L'); }
    else if (hs < as) { away.won++; home.lost++; away.points += 3; away.form.push('W'); home.form.push('L'); }
    else { home.drawn++; away.drawn++; home.points++; away.points++; home.form.push('D'); away.form.push('D'); }
  }
  return [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
      b.goalsFor - a.goalsFor ||
      a.team.name.localeCompare(b.team.name),
  );
}
