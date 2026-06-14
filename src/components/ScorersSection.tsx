import { useMemo, useState } from 'react';
import { teamById } from '../data/teams';
import { useLiveData } from '../context/LiveData';
import Flag from './Flag';

function PlayerAvatar({ name, photo, size = 'h-12 w-12 text-sm' }: { name: string; photo?: string; size?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  if (!photo || failed) {
    return (
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-slate-700 font-bold text-slate-300 ${size}`}>
        {initials}
      </span>
    );
  }
  return (
    <img
      src={photo}
      alt={name}
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full border border-slate-600 object-cover object-top ${size}`}
    />
  );
}

interface RankedScorer {
  player: string;
  teamId: string;
  goals: number;
  photo?: string;
  rank: number;
}

function PodiumSpot({ s, place }: { s: RankedScorer; place: 1 | 2 | 3 }) {
  const team = teamById(s.teamId);
  const medal = place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉';
  const height = place === 1 ? 'h-24' : place === 2 ? 'h-16' : 'h-12';
  const ring = place === 1 ? 'ring-2 ring-amber-400' : 'ring-1 ring-slate-600';
  const order = place === 1 ? 'order-2' : place === 2 ? 'order-1' : 'order-3';
  return (
    <div className={`flex flex-1 flex-col items-center ${order}`}>
      <span className="mb-1 text-lg">{medal}</span>
      <div className={`rounded-full ${ring}`}>
        <PlayerAvatar name={s.player} photo={s.photo} size={place === 1 ? 'h-20 w-20 text-lg' : 'h-14 w-14 text-sm'} />
      </div>
      <span className="mt-2 flex items-center gap-1.5 text-center text-xs font-semibold sm:text-sm">
        <Flag team={team} className="w-4" />
        <span className="max-w-[7rem] truncate">{s.player}</span>
      </span>
      <div className={`mt-1 flex w-full ${height} items-start justify-center rounded-t-lg bg-gradient-to-b from-slate-700/80 to-slate-800/40 pt-1.5`}>
        <span className="font-display text-2xl font-bold text-emerald-400">{s.goals}</span>
      </div>
    </div>
  );
}

function Podium({ top }: { top: RankedScorer[] }) {
  if (top.length < 3) return null;
  return (
    <div className="mb-8 rounded-2xl border border-slate-700/60 bg-slate-800/30 p-5">
      <div className="mx-auto flex max-w-md items-end gap-3">
        <PodiumSpot s={top[1]} place={2} />
        <PodiumSpot s={top[0]} place={1} />
        <PodiumSpot s={top[2]} place={3} />
      </div>
    </div>
  );
}

export default function ScorersSection() {
  const { scorers, updatedAt } = useLiveData();
  const ranked = useMemo(() => {
    const sorted = [...scorers].sort(
      (a, b) => b.goals - a.goals || a.player.localeCompare(b.player),
    );
    let rank = 0;
    let prevGoals = -1;
    return sorted.map((s, i) => {
      if (s.goals !== prevGoals) {
        rank = i + 1;
        prevGoals = s.goals;
      }
      return { ...s, rank };
    });
  }, [scorers]);

  return (
    <section>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
          🏆 Golden Boot race
        </h2>
        <span className="text-sm text-slate-400">
          {scorers.reduce((sum, s) => sum + s.goals, 0)} goals scored so far
        </span>
      </div>

      <Podium top={ranked} />

      <div className="overflow-hidden rounded-2xl border border-slate-700/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3 text-center">Goals</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => {
              const team = teamById(s.teamId);
              const top = s.rank === 1;
              return (
                <tr
                  key={`${s.teamId}-${s.player}`}
                  className={`border-t border-slate-700/50 ${
                    top ? 'bg-emerald-500/5' : 'bg-slate-800/40'
                  }`}
                >
                  <td className="px-4 py-3 text-center font-bold text-slate-400">
                    {top ? '🥇' : s.rank}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${top ? 'text-emerald-300' : ''}`}>
                    <span className="flex items-center gap-3">
                      <PlayerAvatar name={s.player} photo={s.photo} />
                      {s.player}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    <span className="flex items-center gap-2">
                      <Flag team={team} className="w-5" />
                      {team.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-lg font-bold text-emerald-400">
                    {s.goals}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Updated live from the official FIFA feed{updatedAt && ` · ${updatedAt.toLocaleTimeString()}`}. New scorers
        appear automatically; curated photos are shown when available.
      </p>
    </section>
  );
}
