import { useMemo, useState } from 'react';
import { knockoutRounds, matches, type Match, type MatchEvent } from '../data/matches';
import { groups, teamById } from '../data/teams';
import { kickoffUtc, localDateKey, localTime, todayKey } from '../utils/time';
import Flag from './Flag';

const EVENT_ICONS: Record<MatchEvent['type'], string> = {
  goal: '⚽',
  yellow: '🟨',
  red: '🟥',
};

function EventRow({ event }: { event: MatchEvent }) {
  const detail = (
    <span>
      <span className="font-medium text-slate-200">
        {EVENT_ICONS[event.type]} {event.player}
      </span>
      {event.note && <span className="ml-1.5 text-xs text-slate-500">({event.note})</span>}
    </span>
  );
  return (
    <div className="flex items-center gap-2 py-1 text-sm">
      <div className="flex-1 text-right">{event.side === 'home' && detail}</div>
      <span className="w-14 shrink-0 text-center text-xs font-bold text-slate-400">{event.minute}</span>
      <div className="flex-1 text-left">{event.side === 'away' && detail}</div>
    </div>
  );
}

function StatBars({ match }: { match: Match }) {
  return (
    <div className="space-y-3">
      {match.stats!.map((s) => {
        const total = s.home + s.away;
        const homePct = total === 0 ? 50 : (s.home / total) * 100;
        const homeLeads = s.home > s.away;
        const awayLeads = s.away > s.home;
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className={`font-bold ${homeLeads ? 'text-emerald-400' : 'text-slate-300'}`}>
                {s.home}{s.unit}
              </span>
              <span className="text-xs uppercase tracking-wide text-slate-500">{s.label}</span>
              <span className={`font-bold ${awayLeads ? 'text-emerald-400' : 'text-slate-300'}`}>
                {s.away}{s.unit}
              </span>
            </div>
            <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
              <div className="bg-emerald-500/80" style={{ width: `${homePct}%` }} />
              <div className="bg-sky-500/80" style={{ width: `${100 - homePct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MatchDetails({ match }: { match: Match }) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  return (
    <div className="space-y-5 border-t border-slate-700/60 px-4 py-4">
      {match.events && match.events.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span className="flex items-center gap-1.5"><Flag team={home} className="w-5" /> {home.name}</span>
            <span>Timeline</span>
            <span className="flex items-center gap-1.5">{away.name} <Flag team={away} className="w-5" /></span>
          </div>
          {match.events.map((event, i) => (
            <EventRow key={i} event={event} />
          ))}
        </div>
      )}
      {match.stats && match.stats.length > 0 && (
        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Match stats
          </p>
          <StatBars match={match} />
        </div>
      )}
    </div>
  );
}

const TODAY = todayKey();

// Format a Romania-local date key (YYYY-MM-DD) as a readable heading.
function formatDate(key: string): string {
  return new Date(`${key}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false);
  const home = teamById(match.home);
  const away = teamById(match.away);
  const finished = match.status === 'finished';
  const hasDetails = finished && Boolean(match.events?.length || match.stats?.length);
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 transition hover:border-emerald-500/50">
      <div
        role={hasDetails ? 'button' : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        onClick={hasDetails ? () => setExpanded((e) => !e) : undefined}
        onKeyDown={hasDetails ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded((x) => !x); } } : undefined}
        className={`flex items-center gap-3 px-4 py-3 ${hasDetails ? 'cursor-pointer select-none hover:bg-slate-800 rounded-xl' : ''}`}
      >
        <span className="w-16 shrink-0 rounded-md bg-slate-700/60 px-2 py-1 text-center text-xs font-semibold text-slate-300">
          Grp {match.group}
        </span>
        <div className="flex flex-1 items-center justify-end gap-2 text-right">
          <span className="font-medium">{home.name}</span>
          <Flag team={home} className="w-7" />
        </div>
        <div className="w-20 shrink-0 text-center">
          {finished ? (
            <span className="rounded-lg bg-emerald-500/15 px-3 py-1 text-lg font-bold text-emerald-400">
              {match.homeScore} – {match.awayScore}
            </span>
          ) : (
            <span className="text-sm font-semibold text-slate-400">{localTime(kickoffUtc(match))}</span>
          )}
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Flag team={away} className="w-7" />
          <span className="font-medium">{away.name}</span>
        </div>
        <span className="hidden w-44 shrink-0 text-right text-xs text-slate-400 md:block">
          {match.venue}
          <br />
          {match.city}
        </span>
        {hasDetails && (
          <span className={`shrink-0 text-xs text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        )}
      </div>
      {expanded && hasDetails && <MatchDetails match={match} />}
    </div>
  );
}

export default function MatchesSection() {
  const [groupFilter, setGroupFilter] = useState('all');
  const [view, setView] = useState<'all' | 'today' | 'finished' | 'upcoming'>('all');
  const [teamQuery, setTeamQuery] = useState('');

  // Each match tagged with its Romania-local date key and kickoff instant.
  const dated = useMemo(
    () =>
      matches
        .map((m) => {
          const kickoff = kickoffUtc(m);
          return { m, kickoff, dateKey: localDateKey(kickoff) };
        })
        .sort((a, b) => a.kickoff.getTime() - b.kickoff.getTime()),
    [],
  );

  const filtered = useMemo(
    () =>
      dated.filter(({ m, dateKey }) => {
        if (groupFilter !== 'all' && m.group !== groupFilter) return false;
        const q = teamQuery.trim().toLowerCase();
        if (q) {
          const home = teamById(m.home);
          const away = teamById(m.away);
          const hit = [home.name, away.name, home.id, away.id].some((s) => s.toLowerCase().includes(q));
          if (!hit) return false;
        }
        if (view === 'today') return dateKey === TODAY;
        if (view === 'finished') return m.status === 'finished';
        if (view === 'upcoming') return m.status === 'upcoming' && dateKey >= TODAY;
        return true;
      }),
    [dated, groupFilter, view, teamQuery],
  );

  const byDate = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const { m, dateKey } of filtered) {
      (map.get(dateKey) ?? map.set(dateKey, []).get(dateKey)!).push(m);
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
        <input
          type="search"
          value={teamQuery}
          onChange={(e) => setTeamQuery(e.target.value)}
          placeholder="Search team…"
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        />
        <span className="ml-auto text-xs text-slate-500">🇷🇴 Times in Romania (EEST)</span>
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
