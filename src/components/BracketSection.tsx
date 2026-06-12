import { bracketById, type BracketMatch } from '../data/bracket';
import { teamById } from '../data/teams';
import Flag from './Flag';

function Slot({ teamId, label, score, won }: { teamId?: string; label: string; score?: number; won?: boolean }) {
  const team = teamId ? teamById(teamId) : undefined;
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs ${won ? 'font-bold text-emerald-300' : 'text-slate-300'}`}>
      {team ? (
        <>
          <Flag team={team} className="w-4" />
          <span className="truncate">{team.name}</span>
        </>
      ) : (
        <span className="italic text-slate-500">{label}</span>
      )}
      {score !== undefined && <span className="ml-auto font-bold text-slate-100">{score}</span>}
    </div>
  );
}

function BracketCard({ match, highlight = false }: { match: BracketMatch; highlight?: boolean }) {
  return (
    <div className={`w-44 shrink-0 rounded-lg border bg-slate-800/70 ${highlight ? 'border-amber-400/60 shadow-[0_0_18px_rgba(251,191,36,0.15)]' : 'border-slate-700/70'}`}>
      <div className="flex items-center justify-between border-b border-slate-700/60 px-2.5 py-1 text-[10px] text-slate-500">
        <span>M{match.id} · {match.date}</span>
        <span className="truncate pl-1 text-right">{match.city}</span>
      </div>
      <Slot teamId={match.homeTeamId} label={match.homeLabel} score={match.homeScore} won={match.winner === 'home'} />
      <div className="mx-2.5 border-t border-slate-700/40" />
      <Slot teamId={match.awayTeamId} label={match.awayLabel} score={match.awayScore} won={match.winner === 'away'} />
    </div>
  );
}

function Column({ title, ids, highlight = false }: { title: string; ids: number[]; highlight?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col">
      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">{title}</p>
      <div className="flex flex-1 flex-col justify-around gap-3">
        {ids.map((id) => (
          <BracketCard key={id} match={bracketById(id)} highlight={highlight} />
        ))}
      </div>
    </div>
  );
}

export default function BracketSection() {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold">🏆 Knockout bracket</h2>
        <span className="text-xs text-slate-500">
          Slots fill in as the group stage ends (top two per group + 8 best third-placed teams) · scroll sideways ↔
        </span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[1700px] items-stretch gap-4">
          <Column title="Round of 32" ids={[74, 77, 73, 75, 83, 84, 81, 82]} />
          <Column title="Round of 16" ids={[89, 90, 93, 94]} />
          <Column title="Quarter-finals" ids={[97, 98]} />
          <Column title="Semi-finals" ids={[101]} />
          <div className="flex shrink-0 flex-col">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-amber-400">Final · Jul 19</p>
            <div className="flex flex-1 flex-col justify-center gap-6">
              <BracketCard match={bracketById(104)} highlight />
              <div>
                <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">Third place · Jul 18</p>
                <BracketCard match={bracketById(103)} />
              </div>
            </div>
          </div>
          <Column title="Semi-finals" ids={[102]} />
          <Column title="Quarter-finals" ids={[99, 100]} />
          <Column title="Round of 16" ids={[91, 92, 95, 96]} />
          <Column title="Round of 32" ids={[76, 78, 79, 80, 86, 88, 85, 87]} />
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Slot codes: <span className="text-slate-400">1A</span> = Group A winner · <span className="text-slate-400">2A</span> = runner-up ·{' '}
        <span className="text-slate-400">3rd A/B/C…</span> = a best third-placed team from those groups ·{' '}
        <span className="text-slate-400">W73</span>/<span className="text-slate-400">L101</span> = winner/loser of that match number.
      </p>
    </section>
  );
}
