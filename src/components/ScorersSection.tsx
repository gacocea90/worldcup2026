import { useMemo, useState } from 'react';
import { teamById } from '../data/teams';
import { useLiveData } from '../context/LiveData';
import Flag from './Flag';

function PlayerAvatar({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  if (!photo || failed) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-slate-300">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={photo}
      alt={name}
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-full border border-slate-600 object-cover object-top"
    />
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
        <h2 className="text-xl font-bold">
          🏆 Golden Boot race
        </h2>
        <span className="text-sm text-slate-400">
          {scorers.reduce((sum, s) => sum + s.goals, 0)} goals scored so far
        </span>
      </div>

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
