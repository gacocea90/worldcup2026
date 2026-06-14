import { useMemo, useState } from 'react';
import { groups, teams } from '../data/teams';
import { groupStandings, type FormResult } from '../utils/standings';
import { finishedMerged, useLiveData } from '../context/LiveData';
import Flag from './Flag';

const FORM_COLOR: Record<FormResult, string> = { W: 'bg-emerald-500', D: 'bg-slate-500', L: 'bg-red-500' };

function FormPills({ form }: { form: FormResult[] }) {
  if (form.length === 0) return <span className="text-xs text-slate-600">–</span>;
  return (
    <span className="flex items-center justify-center gap-0.5">
      {form.slice(-3).map((r, i) => (
        <span
          key={i}
          className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${FORM_COLOR[r]}`}
        >
          {r}
        </span>
      ))}
    </span>
  );
}

export default function TeamsSection() {
  const [search, setSearch] = useState('');
  const { overlay } = useLiveData();
  const mergedMatches = useMemo(() => finishedMerged(overlay), [overlay]);

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
      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team or player…"
          className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        />
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-1 rounded-full bg-emerald-500" /> Top 2 advance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-1 rounded-full bg-amber-500" /> Best 3rd may advance
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleGroups.map((g) => {
          const standings = groupStandings(g, mergedMatches);
          return (
            <div key={g} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5">
              <h3 className="font-display mb-4 text-2xl font-semibold uppercase tracking-wide">
                Group <span className="text-emerald-400">{g}</span>
              </h3>

              <table className="mb-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="pb-2 pl-1">#</th>
                    <th className="pb-2">Team</th>
                    <th className="pb-2 text-center">P</th>
                    <th className="hidden pb-2 text-center sm:table-cell">W</th>
                    <th className="hidden pb-2 text-center sm:table-cell">D</th>
                    <th className="hidden pb-2 text-center sm:table-cell">L</th>
                    <th className="pb-2 text-center">GD</th>
                    <th className="pb-2 text-center">Pts</th>
                    <th className="hidden pb-2 text-center md:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => {
                    const band = i < 2 ? 'border-emerald-500' : i === 2 ? 'border-amber-500' : 'border-transparent';
                    return (
                      <tr key={row.team.id} className={`border-t border-slate-700/50 ${i < 2 ? 'text-slate-100' : 'text-slate-400'}`}>
                        <td className={`border-l-[3px] py-2 pl-2 text-xs font-semibold text-slate-500 ${band}`}>{i + 1}</td>
                        <td className="py-2">
                          <span className="flex items-center gap-2">
                            <Flag team={row.team} className="w-5" />
                            <span className="truncate">{row.team.name}</span>
                          </span>
                        </td>
                        <td className="text-center">{row.played}</td>
                        <td className="hidden text-center sm:table-cell">{row.won}</td>
                        <td className="hidden text-center sm:table-cell">{row.drawn}</td>
                        <td className="hidden text-center sm:table-cell">{row.lost}</td>
                        <td className="text-center">{row.goalsFor - row.goalsAgainst}</td>
                        <td className="font-display text-center text-base font-bold text-emerald-400">{row.points}</td>
                        <td className="hidden py-2 text-center md:table-cell">
                          <FormPills form={row.form} />
                        </td>
                      </tr>
                    );
                  })}
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
