import { useState } from 'react';
import BracketSection from './components/BracketSection';
import ChampionSection from './components/ChampionSection';
import HeaderBanner from './components/HeaderBanner';
import LiveNow from './components/LiveNow';
import MatchesSection from './components/MatchesSection';
import OverviewSection from './components/OverviewSection';
import ScorersSection from './components/ScorersSection';
import TeamsSection from './components/TeamsSection';
import { LiveDataProvider } from './context/LiveData';

type Tab = 'overview' | 'matches' | 'teams' | 'scorers' | 'bracket' | 'champion';

export default function App() {
  const [tab, setTab] = useState<Tab>('overview');

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
        <nav className="no-scrollbar mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 sm:justify-center">
          {(
            [
              ['overview', 'Overview'],
              ['matches', 'Matches'],
              ['teams', 'Groups'],
              ['scorers', 'Top Scorers'],
              ['bracket', 'Bracket'],
              ['champion', '🏆 Champions'],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`shrink-0 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-bold transition sm:px-5 ${
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

      <main key={tab} className="animate-fade-in mx-auto max-w-5xl px-4 py-8">
        <LiveNow />
        {tab === 'overview' && <OverviewSection />}
        {tab === 'matches' && <MatchesSection />}
        {tab === 'teams' && <TeamsSection />}
        {tab === 'scorers' && <ScorersSection />}
        {tab === 'bracket' && <BracketSection />}
        {tab === 'champion' && <ChampionSection />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FIFA World Cup 2026 — scores, standings & scorers update live from the official FIFA feed.
      </footer>
    </div>
    </LiveDataProvider>
  );
}
