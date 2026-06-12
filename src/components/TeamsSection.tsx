import { useMemo, useState } from 'react';
import { groups, teams } from '../data/teams';
import { groupStandings } from '../utils/standings';
import Flag from './Flag';

export default function TeamsSection() {
  const [search, setSearch] = useState('');

  const visibleGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) =>
      teams.some(
        (t) =>
          t.group === g &&
          (t.name.toLowerCase().includes(q) || t.keyPlayers.some((p) => p.toLowerCase().includes(q))),
      ),
    );
  }, [search]);

  const q = search.trim().toLowerCase();

  return (
    <section>
      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team or player…"
          className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleGroups.map((g) => {
          const standings = groupStandings(g);
          return (
            <div key={g} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5">
              <h3 className="mb-4 text-xl font-bold">
                Group <span className="text-emerald-400">{g}</span>
              </h3>

              <table className="mb-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="pb-2">Team</th>
                    <th className="pb-2 text-center">P</th>
                    <th className="pb-2 text-center">W</th>
                    <th className="pb-2 text-center">D</th>
                    <th className="pb-2 text-center">L</th>
                    <th className="pb-2 text-center">GD</th>
                    <th className="pb-2 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => (
                    <tr key={row.team.id} className={`border-t border-slate-700/50 ${i < 2 ? 'text-slate-100' : 'text-slate-400'}`}>
                      <td className="py-1.5">
                        <span className="flex items-center gap-2">
                          <Flag team={row.team} className="w-5" />
                          {row.team.name}
                        </span>
                      </td>
                      <td className="text-center">{row.played}</td>
                      <td className="text-center">{row.won}</td>
                      <td className="text-center">{row.drawn}</td>
                      <td className="text-center">{row.lost}</td>
                      <td className="text-center">{row.goalsFor - row.goalsAgainst}</td>
                      <td className="text-center font-bold text-emerald-400">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid gap-3 sm:grid-cols-2">
                {teams
                  .filter((t) => t.group === g)
                  .filter(
                    (t) =>
                      !q ||
                      t.name.toLowerCase().includes(q) ||
                      t.keyPlayers.some((p) => p.toLowerCase().includes(q)),
                  )
                  .map((t) => (
                    <div key={t.id} className="rounded-xl bg-slate-800/80 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Flag team={t} className="w-6" />
                        <span className="font-semibold">{t.name}</span>
                        <span className="ml-auto rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
                          {t.confederation}
                        </span>
                      </div>
                      <ul className="text-xs text-slate-400">
                        {t.keyPlayers.map((p) => (
                          <li key={p} className="py-0.5">
                            ⭐ {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
