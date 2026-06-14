import { useLiveData, type Overlay } from '../context/LiveData';
import { teamById, teams } from '../data/teams';
import Flag from './Flag';

interface LiveEntry extends Overlay {
  homeId: string;
  awayId: string;
}

function LiveTick({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-bold text-red-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      {label}
    </span>
  );
}

function GoalList({ match }: { match: LiveEntry }) {
  if (match.goals.length === 0) return null;
  return (
    <div className="mt-2 space-y-0.5 border-t border-red-500/20 pt-2 text-xs text-slate-400">
      {match.goals.map((g, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <Flag team={teamById(g.teamId)} className="w-4" />
          <span className="truncate">
            ⚽ {g.player} {g.minute}
            {g.ownGoal ? ' (o.g.)' : ''}
          </span>
        </div>
      ))}
    </div>
  );
}

function TeamSide({ teamId, align }: { teamId: string; align: 'left' | 'right' }) {
  const team = teams.find((t) => t.id === teamId);
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2 ${align === 'left' ? 'justify-end text-right' : ''}`}>
      {align === 'right' && team && <Flag team={team} className="w-7" />}
      <span className="truncate font-semibold">{team?.name ?? teamId}</span>
      {align === 'left' && team && <Flag team={team} className="w-7" />}
    </div>
  );
}

function LiveCard({ match }: { match: LiveEntry }) {
  const home = teamById(match.homeId);
  const away = teamById(match.awayId);
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-950/20 px-3 py-2.5 sm:px-4 sm:py-3">
      {/* Mobile: stacked */}
      <div className="sm:hidden">
        <div className="mb-1.5">
          <LiveTick label={match.matchTime || 'LIVE'} />
        </div>
        <div className="space-y-1.5">
          {([['home', home, match.homeScore], ['away', away, match.awayScore]] as const).map(([side, team, score]) => (
            <div key={side} className="flex items-center gap-2">
              <Flag team={team} className="w-6" />
              <span className="min-w-0 flex-1 truncate font-semibold">{team.name}</span>
              <span className="shrink-0 text-lg font-bold text-red-300">{score ?? 0}</span>
            </div>
          ))}
        </div>
        <GoalList match={match} />
      </div>

      {/* Desktop: flanking */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-3">
          <span className="w-20 shrink-0">
            <LiveTick label={match.matchTime || 'LIVE'} />
          </span>
          <TeamSide teamId={match.homeId} align="left" />
          <span className="shrink-0 rounded-lg bg-red-500/15 px-3 py-1 text-lg font-bold text-red-300">
            {match.homeScore ?? 0} – {match.awayScore ?? 0}
          </span>
          <TeamSide teamId={match.awayId} align="right" />
          <span className="w-20 shrink-0" />
        </div>
        {match.goals.length > 0 && (
          <div className="mt-2 flex items-start gap-3 border-t border-red-500/20 pt-2 text-xs text-slate-400">
            <div className="flex-1 text-right">
              {match.goals.filter((g) => g.side === 'home').map((g, i) => (
                <div key={i}>⚽ {g.player} {g.minute}{g.ownGoal ? ' (o.g.)' : ''}</div>
              ))}
            </div>
            <span className="shrink-0 text-slate-600">goals</span>
            <div className="flex-1">
              {match.goals.filter((g) => g.side === 'away').map((g, i) => (
                <div key={i}>⚽ {g.player} {g.minute}{g.ownGoal ? ' (o.g.)' : ''}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveNow() {
  const { overlay, updatedAt } = useLiveData();
  const live: LiveEntry[] = [...overlay.entries()]
    .filter(([, o]) => o.status === 'live')
    .map(([key, o]) => {
      const [homeId, awayId] = key.split('-');
      return { ...o, homeId, awayId };
    });

  if (live.length === 0) return null;
  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-red-400">Live now</h2>
        {updatedAt && (
          <span className="text-[10px] text-slate-500">
            auto-refreshes · updated {updatedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
      {live.map((m) => (
        <LiveCard key={`${m.homeId}-${m.awayId}`} match={m} />
      ))}
    </div>
  );
}
