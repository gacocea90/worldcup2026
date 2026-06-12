import { useMemo, useState } from 'react';
import { knockoutRounds, matches, type Match } from '../data/matches';
import { groups, teamById } from '../data/teams';

const TODAY = new Date().toISOString().slice(0, 10);

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function MatchCard({ match }: { match: Match }) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  const finished = match.status === 'finished';
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-3 transition hover:border-emerald-500/50 hover:bg-slate-800">
      <span className="w-16 shrink-0 rounded-md bg-slate-700/60 px-2 py-1 text-center text-xs font-semibold text-slate-300">
        Grp {match.group}
      </span>
      <div className="flex flex-1 items-center justify-end gap-2 text-right">
        <span className="font-medium">{home.name}</span>
        <span className="text-2xl">{home.flag}</span>
      </div>
      <div className="w-20 shrink-0 text-center">
        {finished ? (
          <span className="rounded-lg bg-emerald-500/15 px-3 py-1 text-lg font-bold text-emerald-400">
            {match.homeScore} – {match.awayScore}
          </span>
        ) : (
          <span className="text-sm font-semibold text-slate-400">{match.time}</span>
        )}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <span className="text-2xl">{away.flag}</span>
        <span className="font-medium">{away.name}</span>
      </div>
      <span className="hidden w-44 shrink-0 text-right text-xs text-slate-400 md:block">
        {match.venue}
        <br />
        {match.city}
      </span>
    </div>
  );
}

export default function MatchesSection() {
  const [groupFilter, setGroupFilter] = useState('all');
  const [view, setView] = useState<'all' | 'today' | 'finished' | 'upcoming'>('all');

  const filtered = useMemo(
    () =>
      matches.filter((m) => {
        if (groupFilter !== 'all' && m.group !== groupFilter) return false;
        if (view === 'today') return m.date === TODAY;
        if (view === 'finished') return m.status === 'finished';
        if (view === 'upcoming') return m.status === 'upcoming' && m.date >= TODAY;
        return true;
      }),
    [groupFilter, view],
  );

  const byDate = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const m of filtered) {
      (map.get(m.date) ?? map.set(m.date, []).get(m.date)!).push(m);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-slate-700">
          {(['all', 'today', 'finished', 'upcoming'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-semibold capitalize transition ${
                view === v ? 'bg-emerald-600 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {v === 'all' ? 'All matches' : v}
            </button>
          ))}
        </div>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200"
        >
          <option value="all">All groups</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              Group {g}
            </option>
          ))}
        </select>
      </div>

      {byDate.length === 0 && (
        <p className="rounded-xl border border-slate-700 bg-slate-800/60 p-6 text-center text-slate-400">
          No matches for this filter.
        </p>
      )}

      <div className="space-y-8">
        {byDate.map(([date, dayMatches]) => (
          <div key={date}>
            <h3 className="mb-3 flex items-center gap-3 text-lg font-bold">
              {formatDate(date)}
              {date === TODAY && (
                <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-400">
                  Today
                </span>
              )}
            </h3>
            <div className="space-y-2">
              {dayMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {view === 'all' && groupFilter === 'all' && (
        <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800/40 p-5">
          <h3 className="mb-3 text-lg font-bold">Knockout stage</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {knockoutRounds.map((r) => (
              <li key={r.round} className="flex justify-between gap-4 rounded-lg bg-slate-800/70 px-4 py-2 text-sm">
                <span className="font-medium text-slate-200">{r.round}</span>
                <span className="text-slate-400">{r.dates}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
