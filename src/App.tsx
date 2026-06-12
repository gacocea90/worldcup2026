import { useState } from 'react';
import BracketSection from './components/BracketSection';
import LiveNow from './components/LiveNow';
import MatchesSection from './components/MatchesSection';
import ScorersSection from './components/ScorersSection';
import TeamsSection from './components/TeamsSection';
import { LiveDataProvider } from './context/LiveData';

type Tab = 'matches' | 'teams' | 'scorers' | 'bracket';

export default function App() {
  const [tab, setTab] = useState<Tab>('matches');

  return (
    <LiveDataProvider>
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Canada · Mexico · United States
          </p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
            ⚽ World Cup 2026 Tracker
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            48 teams · 104 matches · June 11 – July 19, 2026
          </p>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-4">
          {(
            [
              ['matches', 'Matches'],
              ['teams', 'Teams & Players'],
              ['scorers', 'Top Scorers'],
              ['bracket', 'Bracket'],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-t-lg px-5 py-3 text-sm font-bold transition ${
                tab === id
                  ? 'bg-slate-900 text-emerald-400 shadow-[inset_0_2px_0_theme(colors.emerald.500)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <LiveNow />
        {tab === 'matches' && <MatchesSection />}
        {tab === 'teams' && <TeamsSection />}
        {tab === 'scorers' && <ScorersSection />}
        {tab === 'bracket' && <BracketSection />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FIFA World Cup 2026 — scores, standings & scorers update live from the official FIFA feed.
      </footer>
    </div>
    </LiveDataProvider>
  );
}
