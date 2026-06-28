import { bracketById, type BracketMatch } from '../data/bracket';
import { teamById } from '../data/teams';
import { useLiveData } from '../context/LiveData';
import Flag from './Flag';

type Dir = 'right' | 'left';
const LINE = 'bg-slate-600/70';

function Slot({
  teamId,
  label,
  score,
  pen,
  won,
}: {
  teamId?: string;
  label: string;
  score?: number;
  pen?: number;
  won?: boolean;
}) {
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
      {score !== undefined && (
        <span className="ml-auto flex items-baseline gap-0.5">
          {pen !== undefined && <span className="text-[9px] text-slate-500">({pen})</span>}
          <span className="font-display font-bold text-slate-100">{score}</span>
        </span>
      )}
    </div>
  );
}

function BracketCard({ match, highlight = false }: { match: BracketMatch; highlight?: boolean }) {
  const { knockout } = useLiveData();
  const live = knockout.get(match.id);

  // Live FIFA data takes precedence over the static seed; teams, scores and
  // winners fill in automatically as each round is played.
  const homeTeamId = live?.homeId ?? match.homeTeamId;
  const awayTeamId = live?.awayId ?? match.awayTeamId;
  const isLive = live?.status === 'live';
  const played = live?.status === 'finished' || isLive;
  const homeScore = played ? live?.homeScore : match.homeScore;
  const awayScore = played ? live?.awayScore : match.awayScore;
  const winner = live?.status === 'finished' ? live?.winner : match.winner;
  // Penalty scores only shown when the match was level after normal/extra time.
  const showPens = live?.status === 'finished' && live?.homePen != null && live?.awayPen != null && live?.homeScore === live?.awayScore;

  return (
    <div className={`w-44 shrink-0 rounded-lg border bg-slate-800/70 ${highlight ? 'border-amber-400/60 shadow-[0_0_18px_rgba(251,191,36,0.18)]' : 'border-slate-700/70'}`}>
      <div className="flex items-center justify-between border-b border-slate-700/60 px-2.5 py-1 text-[10px] text-slate-500">
        <span className={isLive ? 'font-bold text-red-400' : ''}>{isLive ? '● LIVE' : `M${match.id} · ${match.date}`}</span>
        <span className="truncate pl-1 text-right">{match.city}</span>
      </div>
      <Slot teamId={homeTeamId} label={match.homeLabel} score={homeScore} pen={showPens ? live?.homePen : undefined} won={winner === 'home'} />
      <div className="mx-2.5 border-t border-slate-700/40" />
      <Slot teamId={awayTeamId} label={match.awayLabel} score={awayScore} pen={showPens ? live?.awayPen : undefined} won={winner === 'away'} />
    </div>
  );
}

// One card plus a short stub pointing toward the next round.
function CardWithStub({ id, dir, highlight }: { id: number; dir: Dir; highlight?: boolean }) {
  const stub = dir === 'right' ? 'right-[-14px]' : 'left-[-14px]';
  return (
    <div className="relative flex flex-1 items-center">
      <BracketCard match={bracketById(id)} highlight={highlight} />
      <span className={`absolute top-1/2 h-px w-3.5 -translate-y-1/2 ${stub} ${LINE}`} />
    </div>
  );
}

// A pair of cards joined by a bracket connector that outputs toward the next round.
function Pair({ ids, dir, highlight }: { ids: number[]; dir: Dir; highlight?: boolean }) {
  const join = dir === 'right' ? 'right-[-14px]' : 'left-[-14px]';
  const out = dir === 'right' ? 'right-[-28px]' : 'left-[-28px]';
  return (
    <div className="relative flex flex-1 flex-col justify-around">
      {ids.map((id) => (
        <CardWithStub key={id} id={id} dir={dir} highlight={highlight} />
      ))}
      {/* vertical joiner between the two card centers (at 1/4 and 3/4) */}
      <span className={`absolute top-1/4 bottom-1/4 w-px ${join} ${LINE}`} />
      {/* output toward the next round */}
      <span className={`absolute top-1/2 h-px w-3.5 -translate-y-1/2 ${out} ${LINE}`} />
    </div>
  );
}

function Column({ title, ids, dir, highlight = false }: { title: string; ids: number[]; dir: Dir; highlight?: boolean }) {
  const pairs: number[][] = [];
  for (let i = 0; i < ids.length; i += 2) pairs.push(ids.slice(i, i + 2));
  return (
    <div className="flex shrink-0 flex-col">
      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">{title}</p>
      <div className="flex flex-1 flex-col justify-around">
        {pairs.map((pair, idx) =>
          pair.length === 2 ? (
            <Pair key={idx} ids={pair} dir={dir} highlight={highlight} />
          ) : (
            <CardWithStub key={idx} id={pair[0]} dir={dir} highlight={highlight} />
          ),
        )}
      </div>
    </div>
  );
}

export default function BracketSection() {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">🏆 Knockout bracket</h2>
        <span className="text-xs text-slate-500">
          Slots fill in as the group stage ends (top two per group + 8 best third-placed teams) · scroll sideways ↔
        </span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[1760px] items-stretch gap-6">
          <Column title="Round of 32" ids={[74, 77, 73, 75, 83, 84, 81, 82]} dir="right" />
          <Column title="Round of 16" ids={[89, 90, 93, 94]} dir="right" />
          <Column title="Quarter-finals" ids={[97, 98]} dir="right" />
          <Column title="Semi-finals" ids={[101]} dir="right" />

          {/* Center: final + trophy + third place */}
          <div className="flex shrink-0 flex-col">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-amber-400">Final · Jul 19</p>
            <div className="flex flex-1 flex-col justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">🏆</span>
                <BracketCard match={bracketById(104)} highlight />
              </div>
              <div>
                <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">Third place · Jul 18</p>
                <BracketCard match={bracketById(103)} />
              </div>
            </div>
          </div>

          <Column title="Semi-finals" ids={[102]} dir="left" />
          <Column title="Quarter-finals" ids={[99, 100]} dir="left" />
          <Column title="Round of 16" ids={[91, 92, 95, 96]} dir="left" />
          <Column title="Round of 32" ids={[76, 78, 79, 80, 86, 88, 85, 87]} dir="left" />
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
