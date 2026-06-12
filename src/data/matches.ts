export type MatchStatus = 'finished' | 'upcoming';

export interface Match {
  id: number;
  date: string; // ISO date (local venue date)
  time: string; // local kickoff time at the venue
  group: string;
  home: string; // team id
  away: string; // team id
  venue: string;
  city: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
}

// Group stage — all 72 matches, June 11–27, 2026.
// To record a result: set status to 'finished' and fill homeScore/awayScore.
export const matches: Match[] = [
  // Matchday 1 — Thursday, June 11
  { id: 1, date: '2026-06-11', time: '13:00 CST', group: 'A', home: 'MEX', away: 'RSA', venue: 'Estadio Azteca', city: 'Mexico City', status: 'finished', homeScore: 2, awayScore: 0 },
  { id: 2, date: '2026-06-11', time: '20:00 CST', group: 'A', home: 'KOR', away: 'CZE', venue: 'Estadio Akron', city: 'Guadalajara', status: 'finished', homeScore: 2, awayScore: 1 },
  // Friday, June 12
  { id: 3, date: '2026-06-12', time: '15:00 ET', group: 'B', home: 'CAN', away: 'BIH', venue: 'BMO Field', city: 'Toronto', status: 'upcoming' },
  { id: 4, date: '2026-06-12', time: '18:00 PT', group: 'D', home: 'USA', away: 'PAR', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  // Saturday, June 13
  { id: 5, date: '2026-06-13', time: '12:00 PT', group: 'B', home: 'QAT', away: 'SUI', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'upcoming' },
  { id: 6, date: '2026-06-13', time: '18:00 ET', group: 'C', home: 'BRA', away: 'MAR', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'upcoming' },
  { id: 7, date: '2026-06-13', time: '21:00 ET', group: 'C', home: 'HAI', away: 'SCO', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 8, date: '2026-06-13', time: '18:00 PT', group: 'D', home: 'AUS', away: 'TUR', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  // Sunday, June 14
  { id: 9, date: '2026-06-14', time: '12:00 CDT', group: 'E', home: 'GER', away: 'CUW', venue: 'NRG Stadium', city: 'Houston', status: 'upcoming' },
  { id: 10, date: '2026-06-14', time: '15:00 CDT', group: 'F', home: 'NED', away: 'JPN', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 11, date: '2026-06-14', time: '19:00 ET', group: 'E', home: 'CIV', away: 'ECU', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'upcoming' },
  { id: 12, date: '2026-06-14', time: '20:00 CST', group: 'F', home: 'SWE', away: 'TUN', venue: 'Estadio BBVA', city: 'Monterrey', status: 'upcoming' },
  // Monday, June 15
  { id: 13, date: '2026-06-15', time: '12:00 ET', group: 'H', home: 'ESP', away: 'CPV', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'upcoming' },
  { id: 14, date: '2026-06-15', time: '12:00 PT', group: 'G', home: 'BEL', away: 'EGY', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 15, date: '2026-06-15', time: '18:00 ET', group: 'H', home: 'KSA', away: 'URU', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  { id: 16, date: '2026-06-15', time: '18:00 PT', group: 'G', home: 'IRN', away: 'NZL', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  // Tuesday, June 16
  { id: 17, date: '2026-06-16', time: '15:00 ET', group: 'I', home: 'FRA', away: 'SEN', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'upcoming' },
  { id: 18, date: '2026-06-16', time: '18:00 ET', group: 'I', home: 'IRQ', away: 'NOR', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 19, date: '2026-06-16', time: '20:00 CDT', group: 'J', home: 'ARG', away: 'ALG', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'upcoming' },
  { id: 20, date: '2026-06-16', time: '21:00 PT', group: 'J', home: 'AUT', away: 'JOR', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'upcoming' },
  // Wednesday, June 17
  { id: 21, date: '2026-06-17', time: '12:00 CDT', group: 'K', home: 'POR', away: 'COD', venue: 'NRG Stadium', city: 'Houston', status: 'upcoming' },
  { id: 22, date: '2026-06-17', time: '15:00 CDT', group: 'L', home: 'ENG', away: 'CRO', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 23, date: '2026-06-17', time: '19:00 ET', group: 'L', home: 'GHA', away: 'PAN', venue: 'BMO Field', city: 'Toronto', status: 'upcoming' },
  { id: 24, date: '2026-06-17', time: '20:00 CST', group: 'K', home: 'UZB', away: 'COL', venue: 'Estadio Azteca', city: 'Mexico City', status: 'upcoming' },
  // Thursday, June 18
  { id: 25, date: '2026-06-18', time: '12:00 ET', group: 'A', home: 'CZE', away: 'RSA', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'upcoming' },
  { id: 26, date: '2026-06-18', time: '12:00 PT', group: 'B', home: 'SUI', away: 'BIH', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 27, date: '2026-06-18', time: '15:00 PT', group: 'B', home: 'CAN', away: 'QAT', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 28, date: '2026-06-18', time: '19:00 CST', group: 'A', home: 'MEX', away: 'KOR', venue: 'Estadio Akron', city: 'Guadalajara', status: 'upcoming' },
  // Friday, June 19
  { id: 29, date: '2026-06-19', time: '12:00 PT', group: 'D', home: 'USA', away: 'AUS', venue: 'Lumen Field', city: 'Seattle', status: 'upcoming' },
  { id: 30, date: '2026-06-19', time: '18:00 ET', group: 'C', home: 'SCO', away: 'MAR', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 31, date: '2026-06-19', time: '20:30 ET', group: 'C', home: 'BRA', away: 'HAI', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'upcoming' },
  { id: 32, date: '2026-06-19', time: '21:00 PT', group: 'D', home: 'TUR', away: 'PAR', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'upcoming' },
  // Saturday, June 20
  { id: 33, date: '2026-06-20', time: '12:00 CDT', group: 'F', home: 'NED', away: 'SWE', venue: 'NRG Stadium', city: 'Houston', status: 'upcoming' },
  { id: 34, date: '2026-06-20', time: '16:00 ET', group: 'E', home: 'GER', away: 'CIV', venue: 'BMO Field', city: 'Toronto', status: 'upcoming' },
  { id: 35, date: '2026-06-20', time: '19:00 CDT', group: 'E', home: 'ECU', away: 'CUW', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'upcoming' },
  { id: 36, date: '2026-06-20', time: '22:00 CST', group: 'F', home: 'TUN', away: 'JPN', venue: 'Estadio BBVA', city: 'Monterrey', status: 'upcoming' },
  // Sunday, June 21
  { id: 37, date: '2026-06-21', time: '12:00 ET', group: 'H', home: 'ESP', away: 'KSA', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'upcoming' },
  { id: 38, date: '2026-06-21', time: '12:00 PT', group: 'G', home: 'BEL', away: 'IRN', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 39, date: '2026-06-21', time: '18:00 ET', group: 'H', home: 'URU', away: 'CPV', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  { id: 40, date: '2026-06-21', time: '18:00 PT', group: 'G', home: 'NZL', away: 'EGY', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  // Monday, June 22
  { id: 41, date: '2026-06-22', time: '12:00 CDT', group: 'J', home: 'ARG', away: 'AUT', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 42, date: '2026-06-22', time: '17:00 ET', group: 'I', home: 'FRA', away: 'IRQ', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'upcoming' },
  { id: 43, date: '2026-06-22', time: '20:00 ET', group: 'I', home: 'NOR', away: 'SEN', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'upcoming' },
  { id: 44, date: '2026-06-22', time: '20:00 PT', group: 'J', home: 'JOR', away: 'ALG', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'upcoming' },
  // Tuesday, June 23
  { id: 45, date: '2026-06-23', time: '12:00 CDT', group: 'K', home: 'POR', away: 'UZB', venue: 'NRG Stadium', city: 'Houston', status: 'upcoming' },
  { id: 46, date: '2026-06-23', time: '16:00 ET', group: 'L', home: 'ENG', away: 'GHA', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 47, date: '2026-06-23', time: '19:00 ET', group: 'L', home: 'PAN', away: 'CRO', venue: 'BMO Field', city: 'Toronto', status: 'upcoming' },
  { id: 48, date: '2026-06-23', time: '20:00 CST', group: 'K', home: 'COL', away: 'COD', venue: 'Estadio Akron', city: 'Guadalajara', status: 'upcoming' },
  // Wednesday, June 24
  { id: 49, date: '2026-06-24', time: '12:00 PT', group: 'B', home: 'SUI', away: 'CAN', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 50, date: '2026-06-24', time: '12:00 PT', group: 'B', home: 'BIH', away: 'QAT', venue: 'Lumen Field', city: 'Seattle', status: 'upcoming' },
  { id: 51, date: '2026-06-24', time: '18:00 ET', group: 'C', home: 'SCO', away: 'BRA', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  { id: 52, date: '2026-06-24', time: '18:00 ET', group: 'C', home: 'MAR', away: 'HAI', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'upcoming' },
  { id: 53, date: '2026-06-24', time: '19:00 CST', group: 'A', home: 'CZE', away: 'MEX', venue: 'Estadio Azteca', city: 'Mexico City', status: 'upcoming' },
  { id: 54, date: '2026-06-24', time: '19:00 CST', group: 'A', home: 'RSA', away: 'KOR', venue: 'Estadio BBVA', city: 'Monterrey', status: 'upcoming' },
  // Thursday, June 25
  { id: 55, date: '2026-06-25', time: '16:00 ET', group: 'E', home: 'ECU', away: 'GER', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'upcoming' },
  { id: 56, date: '2026-06-25', time: '16:00 ET', group: 'E', home: 'CUW', away: 'CIV', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'upcoming' },
  { id: 57, date: '2026-06-25', time: '18:00 CDT', group: 'F', home: 'JPN', away: 'SWE', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 58, date: '2026-06-25', time: '18:00 CDT', group: 'F', home: 'TUN', away: 'NED', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'upcoming' },
  { id: 59, date: '2026-06-25', time: '19:00 PT', group: 'D', home: 'TUR', away: 'USA', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 60, date: '2026-06-25', time: '19:00 PT', group: 'D', home: 'PAR', away: 'AUS', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'upcoming' },
  // Friday, June 26
  { id: 61, date: '2026-06-26', time: '15:00 ET', group: 'I', home: 'NOR', away: 'FRA', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 62, date: '2026-06-26', time: '15:00 ET', group: 'I', home: 'SEN', away: 'IRQ', venue: 'BMO Field', city: 'Toronto', status: 'upcoming' },
  { id: 63, date: '2026-06-26', time: '19:00 CDT', group: 'H', home: 'CPV', away: 'KSA', venue: 'NRG Stadium', city: 'Houston', status: 'upcoming' },
  { id: 64, date: '2026-06-26', time: '18:00 CST', group: 'H', home: 'URU', away: 'ESP', venue: 'Estadio Akron', city: 'Guadalajara', status: 'upcoming' },
  { id: 65, date: '2026-06-26', time: '20:00 PT', group: 'G', home: 'EGY', away: 'IRN', venue: 'Lumen Field', city: 'Seattle', status: 'upcoming' },
  { id: 66, date: '2026-06-26', time: '20:00 PT', group: 'G', home: 'NZL', away: 'BEL', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  // Saturday, June 27
  { id: 67, date: '2026-06-27', time: '17:00 ET', group: 'L', home: 'PAN', away: 'ENG', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'upcoming' },
  { id: 68, date: '2026-06-27', time: '17:00 ET', group: 'L', home: 'CRO', away: 'GHA', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'upcoming' },
  { id: 69, date: '2026-06-27', time: '19:30 ET', group: 'K', home: 'COL', away: 'POR', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  { id: 70, date: '2026-06-27', time: '19:30 ET', group: 'K', home: 'COD', away: 'UZB', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'upcoming' },
  { id: 71, date: '2026-06-27', time: '21:00 CDT', group: 'J', home: 'ALG', away: 'AUT', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'upcoming' },
  { id: 72, date: '2026-06-27', time: '21:00 CDT', group: 'J', home: 'JOR', away: 'ARG', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
];

export const knockoutRounds = [
  { round: 'Round of 32', dates: 'June 28 – July 3' },
  { round: 'Round of 16', dates: 'July 4 – 7' },
  { round: 'Quarter-finals', dates: 'July 9 – 11' },
  { round: 'Semi-finals', dates: 'July 14 – 15' },
  { round: 'Third place match', dates: 'July 18' },
  { round: 'Final — MetLife Stadium, New York / New Jersey', dates: 'July 19' },
];
