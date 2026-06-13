import { useState } from 'react';
import BracketSection from './components/BracketSection';
import HeaderBanner from './components/HeaderBanner';
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
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <HeaderBanner />
          <p className="px-4 pb-3 text-center text-sm text-slate-400">
            48 teams · 104 matches · June 11 – July 19, 2026
          </p>
        </div>
        <nav className="mx-auto flex max-w-5xl justify-center gap-1 px-4">
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
