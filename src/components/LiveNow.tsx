import { liveStatusLabel, useLiveMatches, type LiveMatch } from '../hooks/useLiveMatches';
import { teams } from '../data/teams';
import Flag from './Flag';

function TeamSide({ teamId, name, align }: { teamId?: string; name: string; align: 'left' | 'right' }) {
  const team = teams.find((t) => t.id === teamId);
  return (
    <div className={`flex flex-1 items-center gap-2 ${align === 'left' ? 'justify-end text-right' : ''}`}>
      {align === 'right' && team && <Flag team={team} className="w-7" />}
      <span className="font-semibold">{team?.name ?? name}</span>
      {align === 'left' && team && <Flag team={team} className="w-7" />}
    </div>
  );
}

function LiveCard({ match }: { match: LiveMatch }) {
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-950/20 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex w-20 shrink-0 items-center gap-1.5 text-xs font-bold text-red-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          {liveStatusLabel(match)}
        </span>
        <TeamSide teamId={match.homeId} name={match.homeName} align="left" />
        <span className="shrink-0 rounded-lg bg-red-500/15 px-3 py-1 text-lg font-bold text-red-300">
          {match.homeScore} – {match.awayScore}
        </span>
        <TeamSide teamId={match.awayId} name={match.awayName} align="right" />
        <span className="w-20 shrink-0" />
      </div>
      {match.goals.length > 0 && (
        <div className="mt-2 flex items-start gap-3 border-t border-red-500/20 pt-2 text-xs text-slate-400">
          <div className="flex-1 text-right">
            {match.goals.filter((g) => g.side === 'home').map((g, i) => (
              <div key={i}>⚽ {g.player} {g.minute}</div>
            ))}
          </div>
          <span className="shrink-0 text-slate-600">goals</span>
          <div className="flex-1">
            {match.goals.filter((g) => g.side === 'away').map((g, i) => (
              <div key={i}>⚽ {g.player} {g.minute}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LiveNow() {
  const { matches, updatedAt } = useLiveMatches();
  if (matches.length === 0) return null;
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
      {matches.map((m) => (
        <LiveCard key={m.id} match={m} />
      ))}
    </div>
  );
}
