import { useMemo } from 'react';
import { matches, type Match } from '../data/matches';
import { teamById } from '../data/teams';
import { assists as curatedAssists } from '../data/scorers';
import { champion, championSquad, POSITION_LABELS, type SquadPosition } from '../data/champion';
import { applyOverlay, useLiveData } from '../context/LiveData';
import { teamColor } from '../data/colors';
import Flag from './Flag';

// Same normalization the scorer feed uses, so squad names join onto goal/assist
// tallies regardless of accents or capitalisation.
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');

type Played = {
  m: Match;
  gf: number;
  ga: number;
  opponent: string;
  result: 'W' | 'D' | 'L';
  note?: string; // "a.e.t." / "pens 4–3"
};

function Stat({ value, label, accent = 'text-emerald-400' }: { value: string | number; label: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-3 text-center">
      <div className={`font-display text-2xl font-bold ${accent}`}>{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

const RESULT_STYLE: Record<'W' | 'D' | 'L', string> = {
  W: 'bg-emerald-500/20 text-emerald-300',
  D: 'bg-slate-600/40 text-slate-300',
  L: 'bg-red-500/20 text-red-300',
};

export default function ChampionSection() {
  const { overlay, scorers } = useLiveData();
  const team = teamById(champion.teamId);

  const played: Played[] = useMemo(() => {
    return matches
      .filter((m) => m.home === champion.teamId || m.away === champion.teamId)
      .map((m) => applyOverlay(m, overlay))
      .filter((m) => m.status === 'finished' && m.homeScore != null && m.awayScore != null)
      .sort((a, b) => a.id - b.id)
      .map((m) => {
        const isHome = m.home === champion.teamId;
        const gf = (isHome ? m.homeScore : m.awayScore) ?? 0;
        const ga = (isHome ? m.awayScore : m.homeScore) ?? 0;
        const ownPen = isHome ? m.homePen : m.awayPen;
        const oppPen = isHome ? m.awayPen : m.homePen;
        // A level knockout tie is settled by the shootout, not the score line.
        const result: 'W' | 'D' | 'L' =
          gf > ga ? 'W' : gf < ga ? 'L' : ownPen != null && oppPen != null ? (ownPen > oppPen ? 'W' : 'L') : 'D';
        const note =
          ownPen != null && oppPen != null ? `pens ${ownPen}–${oppPen}` : m.aet ? 'a.e.t.' : undefined;
        return { m, gf, ga, opponent: isHome ? m.away : m.home, result, note };
      });
  }, [overlay]);

  const totals = useMemo(() => {
    const t = { p: played.length, w: 0, d: 0, l: 0, gf: 0, ga: 0, cs: 0 };
    for (const r of played) {
      t[r.result === 'W' ? 'w' : r.result === 'D' ? 'd' : 'l']++;
      t.gf += r.gf;
      t.ga += r.ga;
      if (r.ga === 0) t.cs++;
    }
    return t;
  }, [played]);

  // Join per-player goals (live feed) and assists (curated) onto the roster.
  const goalsBy = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of scorers) if (s.teamId === champion.teamId) map.set(normalize(s.player), s.goals);
    return map;
  }, [scorers]);

  const assistsBy = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of curatedAssists) if (a.teamId === champion.teamId) map.set(normalize(a.player), a.assists);
    return map;
  }, []);

  const squad = championSquad.map((p) => ({
    ...p,
    goals: goalsBy.get(normalize(p.player)) ?? 0,
    assists: assistsBy.get(normalize(p.player)) ?? 0,
  }));

  const final = played.find((r) => r.m.id === champion.finalMatchId);
  const topScorer = [...squad].sort((a, b) => b.goals - a.goals)[0];

  return (
    <section className="space-y-6">
      {/* Trophy hero */}
      <div
        className="relative overflow-hidden rounded-2xl border border-amber-400/40 p-6 text-center"
        style={{ background: `linear-gradient(135deg, ${teamColor(champion.teamId)}22, transparent 60%)` }}
      >
        <div className="mb-2 text-5xl drop-shadow-[0_0_18px_rgba(251,191,36,0.55)]">🏆</div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">World Champions</p>
        <h2 className="font-display mt-1 flex items-center justify-center gap-3 text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          <Flag team={team} className="w-10" />
          {team.name}
        </h2>
        {final && (
          <p className="mt-3 text-sm text-slate-300">
            Beat {teamById(final.opponent).name}{' '}
            <span className="font-display font-bold text-emerald-400">
              {final.gf}–{final.ga}
            </span>
            {final.note && <span className="font-bold text-amber-300"> ({final.note})</span>} in the final ·{' '}
            {final.m.venue}, {final.m.city}
          </p>
        )}
        <p className="mt-1 text-xs text-slate-500">Coach: {champion.coach} · Captain: Rodri</p>
      </div>

      {/* Tournament stats */}
      <div>
        <h3 className="font-display mb-3 text-lg font-semibold uppercase tracking-wide text-emerald-400">
          Tournament run
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
          <Stat value={totals.p} label="Played" />
          <Stat value={totals.w} label="Won" />
          <Stat value={totals.d} label="Drawn" accent="text-slate-300" />
          <Stat value={totals.l} label="Lost" accent="text-slate-300" />
          <Stat value={totals.gf} label="Scored" />
          <Stat value={totals.ga} label="Conceded" accent="text-amber-300" />
          <Stat value={totals.cs} label="Clean sheets" accent="text-sky-300" />
        </div>
      </div>

      {/* Road to the title */}
      <div>
        <h3 className="font-display mb-3 text-lg font-semibold uppercase tracking-wide text-emerald-400">
          Road to the title
        </h3>
        <div className="space-y-2">
          {played.map((r) => {
            const opp = teamById(r.opponent);
            return (
              <div
                key={r.m.id}
                className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-2 text-sm"
              >
                <span className={`w-6 shrink-0 rounded text-center text-xs font-bold ${RESULT_STYLE[r.result]}`}>
                  {r.result}
                </span>
                <span className="w-28 shrink-0 truncate text-xs text-slate-400">
                  {r.m.round ?? `Group ${r.m.group}`}
                </span>
                <Flag team={opp} className="w-6 shrink-0" />
                <span className="min-w-0 flex-1 truncate font-medium">{opp.name}</span>
                <span className="font-display shrink-0 font-bold tabular-nums text-emerald-400">
                  {r.gf}–{r.ga}
                </span>
                {r.note && <span className="shrink-0 text-xs font-bold text-amber-300">{r.note}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Squad */}
      <div>
        <h3 className="font-display mb-1 text-lg font-semibold uppercase tracking-wide text-emerald-400">
          The squad
        </h3>
        <p className="mb-3 text-xs text-slate-500">
          All {championSquad.length} players · {topScorer && topScorer.goals > 0 && (
            <>top scorer {topScorer.player} ({topScorer.goals} goals)</>
          )}
        </p>
        <div className="space-y-4">
          {(['GK', 'DF', 'MF', 'FW'] as SquadPosition[]).map((pos) => (
            <div key={pos} className="overflow-hidden rounded-xl border border-slate-700/60">
              <div className="bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                {POSITION_LABELS[pos]}
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {squad
                    .filter((p) => p.position === pos)
                    .map((p) => (
                      <tr key={p.number} className="border-t border-slate-700/50 bg-slate-800/40">
                        <td className="w-12 px-4 py-2 text-center font-bold tabular-nums text-slate-500">
                          {p.number}
                        </td>
                        <td className="px-2 py-2 font-medium">
                          {p.player}
                          {p.captain && (
                            <span className="ml-2 rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                              C
                            </span>
                          )}
                        </td>
                        <td className="w-20 px-4 py-2 text-right text-xs text-slate-400">
                          {p.goals > 0 && <span className="font-bold text-emerald-400">{p.goals} G</span>}
                        </td>
                        <td className="w-20 px-4 py-2 text-right text-xs text-slate-400">
                          {p.assists > 0 && <span className="font-bold text-sky-300">{p.assists} A</span>}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
