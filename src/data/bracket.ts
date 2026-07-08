export type BracketRound = 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'F';

export interface BracketMatch {
  id: number; // official FIFA match number
  round: BracketRound;
  homeLabel: string; // qualification slot, e.g. "1E", "2A", "3rd A/B/C/D/F"
  awayLabel: string;
  date: string;
  venue: string;
  city: string;
  homeTeamId?: string; // set once the team is known
  awayTeamId?: string;
  homeScore?: number;
  awayScore?: number;
  homePen?: number; // penalty shootout score, if the tie went to penalties
  awayPen?: number;
  winner?: 'home' | 'away'; // set after the match (decides who advances)
}

// Official FIFA World Cup 2026 knockout bracket.
// As teams qualify, fill homeTeamId/awayTeamId; after each match set scores and winner.
export const bracket: BracketMatch[] = [
  // Round of 32 — left half (feeds semifinal 101)
  { id: 74, round: 'R32', homeLabel: '1E', awayLabel: '3rd A/B/C/D/F', date: 'Jun 29', venue: 'Gillette Stadium', city: 'Boston', homeTeamId: 'GER', awayTeamId: 'PAR', homeScore: 1, awayScore: 1, homePen: 3, awayPen: 4, winner: 'away' },
  { id: 77, round: 'R32', homeLabel: '1I', awayLabel: '3rd C/D/F/G/H', date: 'Jun 30', venue: 'MetLife Stadium', city: 'New York / NJ', homeTeamId: 'FRA', awayTeamId: 'SWE', homeScore: 3, awayScore: 0, winner: 'home' },
  { id: 73, round: 'R32', homeLabel: '2A', awayLabel: '2B', date: 'Jun 28', venue: 'SoFi Stadium', city: 'Los Angeles', homeTeamId: 'RSA', awayTeamId: 'CAN', homeScore: 0, awayScore: 1, winner: 'away' },
  { id: 75, round: 'R32', homeLabel: '1F', awayLabel: '2C', date: 'Jun 29', venue: 'Estadio BBVA', city: 'Monterrey', homeTeamId: 'NED', awayTeamId: 'MAR', homeScore: 1, awayScore: 1, homePen: 2, awayPen: 3, winner: 'away' },
  { id: 83, round: 'R32', homeLabel: '2K', awayLabel: '2L', date: 'Jul 2', venue: 'BMO Field', city: 'Toronto', homeTeamId: 'POR', awayTeamId: 'CRO', homeScore: 2, awayScore: 1, winner: 'home' },
  { id: 84, round: 'R32', homeLabel: '1H', awayLabel: '2J', date: 'Jul 2', venue: 'SoFi Stadium', city: 'Los Angeles', homeTeamId: 'ESP', awayTeamId: 'AUT', homeScore: 3, awayScore: 0, winner: 'home' },
  { id: 81, round: 'R32', homeLabel: '1D', awayLabel: '3rd B/E/F/I/J', date: 'Jul 1', venue: "Levi's Stadium", city: 'SF Bay Area', homeTeamId: 'USA', awayTeamId: 'BIH', homeScore: 2, awayScore: 0, winner: 'home' },
  { id: 82, round: 'R32', homeLabel: '1G', awayLabel: '3rd A/E/H/I/J', date: 'Jul 1', venue: 'Lumen Field', city: 'Seattle', homeTeamId: 'BEL', awayTeamId: 'SEN', homeScore: 3, awayScore: 2, winner: 'home' },
  // Round of 32 — right half (feeds semifinal 102)
  { id: 76, round: 'R32', homeLabel: '1C', awayLabel: '2F', date: 'Jun 29', venue: 'NRG Stadium', city: 'Houston', homeTeamId: 'BRA', awayTeamId: 'JPN', homeScore: 2, awayScore: 1, winner: 'home' },
  { id: 78, round: 'R32', homeLabel: '2E', awayLabel: '2I', date: 'Jun 30', venue: 'AT&T Stadium', city: 'Dallas', homeTeamId: 'CIV', awayTeamId: 'NOR', homeScore: 1, awayScore: 2, winner: 'away' },
  { id: 79, round: 'R32', homeLabel: '1A', awayLabel: '3rd C/E/F/H/I', date: 'Jun 30', venue: 'Estadio Azteca', city: 'Mexico City', homeTeamId: 'MEX', awayTeamId: 'ECU', homeScore: 2, awayScore: 0, winner: 'home' },
  { id: 80, round: 'R32', homeLabel: '1L', awayLabel: '3rd E/H/I/J/K', date: 'Jul 1', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', homeTeamId: 'ENG', awayTeamId: 'COD', homeScore: 2, awayScore: 1, winner: 'home' },
  { id: 86, round: 'R32', homeLabel: '1J', awayLabel: '2H', date: 'Jul 3', venue: 'Hard Rock Stadium', city: 'Miami', homeTeamId: 'ARG', awayTeamId: 'CPV', homeScore: 3, awayScore: 2, winner: 'home' },
  { id: 88, round: 'R32', homeLabel: '2D', awayLabel: '2G', date: 'Jul 3', venue: 'AT&T Stadium', city: 'Dallas', homeTeamId: 'AUS', awayTeamId: 'EGY', homeScore: 1, awayScore: 1, homePen: 2, awayPen: 4, winner: 'away' },
  { id: 85, round: 'R32', homeLabel: '1B', awayLabel: '3rd E/F/G/I/J', date: 'Jul 2', venue: 'BC Place', city: 'Vancouver', homeTeamId: 'SUI', awayTeamId: 'ALG', homeScore: 2, awayScore: 0, winner: 'home' },
  { id: 87, round: 'R32', homeLabel: '1K', awayLabel: '3rd D/E/I/J/L', date: 'Jul 3', venue: 'Arrowhead Stadium', city: 'Kansas City', homeTeamId: 'COL', awayTeamId: 'GHA', homeScore: 1, awayScore: 0, winner: 'home' },
  // Round of 16
  { id: 89, round: 'R16', homeLabel: 'W74', awayLabel: 'W77', date: 'Jul 4', venue: 'Lincoln Financial Field', city: 'Philadelphia', homeTeamId: 'PAR', awayTeamId: 'FRA', homeScore: 0, awayScore: 1, winner: 'away' },
  { id: 90, round: 'R16', homeLabel: 'W73', awayLabel: 'W75', date: 'Jul 4', venue: 'NRG Stadium', city: 'Houston', homeTeamId: 'CAN', awayTeamId: 'MAR', homeScore: 0, awayScore: 3, winner: 'away' },
  { id: 93, round: 'R16', homeLabel: 'W83', awayLabel: 'W84', date: 'Jul 6', venue: 'AT&T Stadium', city: 'Dallas', homeTeamId: 'POR', awayTeamId: 'ESP', homeScore: 0, awayScore: 1, winner: 'away' },
  { id: 94, round: 'R16', homeLabel: 'W81', awayLabel: 'W82', date: 'Jul 6', venue: 'Lumen Field', city: 'Seattle', homeTeamId: 'USA', awayTeamId: 'BEL', homeScore: 1, awayScore: 4, winner: 'away' },
  { id: 91, round: 'R16', homeLabel: 'W76', awayLabel: 'W78', date: 'Jul 5', venue: 'MetLife Stadium', city: 'New York / NJ', homeTeamId: 'BRA', awayTeamId: 'NOR', homeScore: 1, awayScore: 2, winner: 'away' },
  { id: 92, round: 'R16', homeLabel: 'W79', awayLabel: 'W80', date: 'Jul 5', venue: 'Estadio Azteca', city: 'Mexico City', homeTeamId: 'MEX', awayTeamId: 'ENG', homeScore: 2, awayScore: 3, winner: 'away' },
  { id: 95, round: 'R16', homeLabel: 'W86', awayLabel: 'W88', date: 'Jul 7', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', homeTeamId: 'ARG', awayTeamId: 'EGY', homeScore: 3, awayScore: 2, winner: 'home' },
  { id: 96, round: 'R16', homeLabel: 'W85', awayLabel: 'W87', date: 'Jul 7', venue: 'BC Place', city: 'Vancouver', homeTeamId: 'SUI', awayTeamId: 'COL', homeScore: 0, awayScore: 0, homePen: 4, awayPen: 3, winner: 'home' },
  // Quarter-finals
  { id: 97, round: 'QF', homeLabel: 'W89', awayLabel: 'W90', date: 'Jul 9', venue: 'Gillette Stadium', city: 'Boston', homeTeamId: 'FRA', awayTeamId: 'MAR' },
  { id: 98, round: 'QF', homeLabel: 'W93', awayLabel: 'W94', date: 'Jul 10', venue: 'SoFi Stadium', city: 'Los Angeles', homeTeamId: 'ESP', awayTeamId: 'BEL' },
  { id: 99, round: 'QF', homeLabel: 'W91', awayLabel: 'W92', date: 'Jul 11', venue: 'Hard Rock Stadium', city: 'Miami', homeTeamId: 'NOR', awayTeamId: 'ENG' },
  { id: 100, round: 'QF', homeLabel: 'W95', awayLabel: 'W96', date: 'Jul 11', venue: 'Arrowhead Stadium', city: 'Kansas City', homeTeamId: 'ARG', awayTeamId: 'SUI' },
  // Semi-finals
  { id: 101, round: 'SF', homeLabel: 'W97', awayLabel: 'W98', date: 'Jul 14', venue: 'AT&T Stadium', city: 'Dallas' },
  { id: 102, round: 'SF', homeLabel: 'W99', awayLabel: 'W100', date: 'Jul 15', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  // Third place & Final
  { id: 103, round: '3RD', homeLabel: 'L101', awayLabel: 'L102', date: 'Jul 18', venue: 'Hard Rock Stadium', city: 'Miami' },
  { id: 104, round: 'F', homeLabel: 'W101', awayLabel: 'W102', date: 'Jul 19', venue: 'MetLife Stadium', city: 'New York / NJ' },
];

export const bracketById = (id: number): BracketMatch => bracket.find((m) => m.id === id)!;
