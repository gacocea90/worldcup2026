import { useMemo } from 'react';
import { matches, type Match } from '../data/matches';
import { teamById } from '../data/teams';
import { applyOverlay, useLiveData } from '../context/LiveData';
import { kickoffUtc, localDateKey, localTime } from '../utils/time';
import { teamColor } from '../data/colors';
import Flag from './Flag';

type Row = { m: Match & { live?: boolean }; kickoff: Date };

// "Sun, Jun 14" from a Romania-local date key (YYYY-MM-DD).
function dayLabel(key: string): string {
  return new Date(`${key}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function MiniMatch({ row, mode }: { row: Row; mode: 'result' | 'fixture' }) {
  const { m } = row;
  const home = teamById(m.home);
  const away = teamById(m.away);
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-2 transition hover:border-emerald-500/40">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: `linear-gradient(180deg, ${teamColor(m.home)}, ${teamColor(m.away)})` }}
      />
      <div className="flex items-center gap-2 text-sm">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="flex items-center gap-2">
            <Flag team={home} className="w-5" />
            <span className="truncate">{home.name}</span>
          </span>
          <span className="flex items-center gap-2">
            <Flag team={away} className="w-5" />
            <span className="truncate">{away.name}</span>
          </span>
        </div>
        {mode === 'result' ? (
          <div className={`font-display flex flex-col items-end text-lg font-bold tabular-nums ${m.live ? 'text-red-300' : 'text-emerald-400'}`}>
            <span>{m.homeScore}</span>
            <span>{m.awayScore}</span>
          </div>
        ) : (
          <span className="font-display shrink-0 text-sm font-semibold text-slate-400">{localTime(row.kickoff)}</span>
        )}
      </div>
    </div>
  );
}

function Panel({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4">
      <h3 className={`font-display mb-3 text-lg font-semibold uppercase tracking-wide ${accent}`}>{title}</h3>
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-center">
      <div className="font-display text-3xl font-bold text-emerald-400">{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

export default function OverviewSection() {
  const { overlay, scorers } = useLiveData();

  const rows: Row[] = useMemo(
    () =>
      matches.map((m) => {
        const merged = applyOverlay(m, overlay);
        const k = overlay.get(`${m.home}-${m.away}`)?.kickoff;
        return { m: merged, kickoff: k ? new Date(k) : kickoffUtc(merged) };
      }),
    [overlay],
  );

  // `status === 'finished'` covers both completed and in-progress games (live
  // games carry a `live` flag so their score shows) — only completed ones count
  // as "played".
  const withScores = rows.filter((r) => r.m.status === 'finished');
  const played = withScores.filter((r) => !r.m.live);
  const latest = [...played].sort((a, b) => b.kickoff.getTime() - a.kickoff.getTime()).slice(0, 5);
  const upcoming = rows
    .filter((r) => r.m.status === 'upcoming')
    .sort((a, b) => a.kickoff.getTime() - b.kickoff.getTime())
    .slice(0, 5);

  const goals = withScores.reduce((sum, r) => sum + (r.m.homeScore ?? 0) + (r.m.awayScore ?? 0), 0);
  const leader = [...scorers].sort((a, b) => b.goals - a.goals || a.player.localeCompare(b.player))[0];
  const leaderTeam = leader ? teamById(leader.teamId) : undefined;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <Stat value={played.length} label="Matches played" />
        <Stat value={goals} label="Total goals" />
        <Stat value={`${played.length}/104`} label="Of the tournament" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Latest results" accent="text-emerald-400">
          <div className="space-y-2">
            {latest.length ? latest.map((r) => <MiniMatch key={r.m.id} row={r} mode="result" />) : (
              <p className="text-sm text-slate-400">No matches played yet.</p>
            )}
          </div>
        </Panel>

        <Panel title="Coming up" accent="text-sky-400">
          <div className="space-y-2">
            {upcoming.map((r, i) => {
              const key = localDateKey(r.kickoff);
              const newDay = i === 0 || key !== localDateKey(upcoming[i - 1].kickoff);
              return (
                <div key={r.m.id}>
                  {newDay && (
                    <div className="mb-2 mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span>{dayLabel(key)}</span>
                      <span className="h-px flex-1 bg-slate-700/60" />
                    </div>
                  )}
                  <MiniMatch row={r} mode="fixture" />
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      {leader && leaderTeam && (
        <div className="flex items-center gap-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-transparent p-5">
          <span className="text-3xl">🏆</span>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">Golden Boot leader</div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Flag team={leaderTeam} className="w-5" />
              {leader.player}
              <span className="text-sm font-normal text-slate-400">· {leaderTeam.name}</span>
            </div>
          </div>
          <div className="font-display text-right">
            <span className="text-3xl font-bold text-emerald-400">{leader.goals}</span>
            <div className="text-xs uppercase tracking-wide text-slate-500">goals</div>
          </div>
        </div>
      )}
    </section>
  );
}
