export type MatchStatus = 'finished' | 'upcoming';

export interface MatchEvent {
  minute: string; // e.g. "9'", "90+2'"
  type: 'goal' | 'yellow' | 'red';
  side: 'home' | 'away';
  player: string;
  note?: string; // e.g. assist
}

export interface StatRow {
  label: string;
  home: number;
  away: number;
  unit?: string; // e.g. "%"
}

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
  events?: MatchEvent[]; // chronological timeline for finished matches
  stats?: StatRow[]; // Flashscore-style stat comparison for finished matches
}

// Group stage — all 72 matches, June 11–27, 2026.
// To record a result: set status to 'finished' and fill homeScore/awayScore.
export const matches: Match[] = [
  // Matchday 1 — Thursday, June 11
  {
    id: 1, date: '2026-06-11', time: '13:00 CST', group: 'A', home: 'MEX', away: 'RSA', venue: 'Estadio Azteca', city: 'Mexico City', status: 'finished', homeScore: 2, awayScore: 0,
    events: [
      { minute: "9'", type: 'goal', side: 'home', player: 'Julián Quiñones', note: 'assist: Erik Lira' },
      { minute: "17'", type: 'yellow', side: 'away', player: 'Teboho Mokoena' },
      { minute: "23'", type: 'yellow', side: 'home', player: 'Brian Gutiérrez' },
      { minute: "50'", type: 'red', side: 'away', player: 'Sphephelo Sithole', note: 'serious foul play' },
      { minute: "67'", type: 'goal', side: 'home', player: 'Raúl Jiménez', note: 'assist: Roberto Alvarado' },
      { minute: "74'", type: 'yellow', side: 'away', player: 'Nkosinathi Sibisi' },
      { minute: "84'", type: 'red', side: 'away', player: 'Themba Zwane', note: 'unsporting behavior' },
      { minute: "90+2'", type: 'red', side: 'home', player: 'César Montes', note: 'serious foul play' },
    ],
    stats: [
      { label: 'Ball possession', home: 60, away: 40, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.46, away: 0.07 },
      { label: 'Total shots', home: 16, away: 5 },
      { label: 'Shots on target', home: 4, away: 2 },
      { label: 'Saves', home: 2, away: 2 },
      { label: 'Fouls', home: 12, away: 11 },
      { label: 'Yellow cards', home: 1, away: 2 },
      { label: 'Red cards', home: 1, away: 2 },
    ],
  },
  {
    id: 2, date: '2026-06-11', time: '20:00 CST', group: 'A', home: 'KOR', away: 'CZE', venue: 'Estadio Akron', city: 'Guadalajara', status: 'finished', homeScore: 2, awayScore: 1,
    events: [
      { minute: "59'", type: 'goal', side: 'away', player: 'Ladislav Krejčí', note: 'assist: Vladimír Coufal' },
      { minute: "67'", type: 'goal', side: 'home', player: 'Hwang In-beom', note: 'assist: Lee Kang-in' },
      { minute: "80'", type: 'goal', side: 'home', player: 'Oh Hyeon-gyu', note: 'assist: Hwang In-beom' },
      { minute: "90+6'", type: 'yellow', side: 'home', player: 'Lee Gi-hyuk' },
    ],
    stats: [
      { label: 'Ball possession', home: 62, away: 38, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.30, away: 0.82 },
      { label: 'Shots on target', home: 6, away: 4 },
      { label: 'Saves', home: 3, away: 4 },
      { label: 'Fouls', home: 9, away: 16 },
      { label: 'Yellow cards', home: 1, away: 0 },
    ],
  },
  // Friday, June 12
  {
    id: 3, date: '2026-06-12', time: '15:00 ET', group: 'B', home: 'CAN', away: 'BIH', venue: 'BMO Field', city: 'Toronto', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "11'", type: 'yellow', side: 'home', player: 'Alistair Johnston' },
      { minute: "21'", type: 'goal', side: 'away', player: 'Jovo Lukić' },
      { minute: "44'", type: 'yellow', side: 'away', player: 'Ermedin Demirović' },
      { minute: "45+1'", type: 'yellow', side: 'away', player: 'Jovo Lukić' },
      { minute: "53'", type: 'yellow', side: 'home', player: 'Luc de Fougerolles' },
      { minute: "78'", type: 'goal', side: 'home', player: 'Cyle Larin' },
      { minute: "90+3'", type: 'yellow', side: 'away', player: 'Nikola Katić' },
    ],
    stats: [
      { label: 'Ball possession', home: 61, away: 39, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.23, away: 0.96 },
      { label: 'Total shots', home: 10, away: 3 },
      { label: 'Shots on target', home: 4, away: 3 },
      { label: 'Saves', home: 2, away: 1 },
      { label: 'Fouls', home: 10, away: 20 },
      { label: 'Yellow cards', home: 2, away: 3 },
    ],
  },
  {
    id: 4, date: '2026-06-12', time: '18:00 PT', group: 'D', home: 'USA', away: 'PAR', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'finished', homeScore: 4, awayScore: 1,
    events: [
      { minute: "7'", type: 'goal', side: 'home', player: 'Damián Bobadilla', note: 'own goal' },
      { minute: "9'", type: 'yellow', side: 'away', player: 'Juan José Cáceres' },
      { minute: "31'", type: 'goal', side: 'home', player: 'Folarin Balogun' },
      { minute: "45+5'", type: 'goal', side: 'home', player: 'Folarin Balogun' },
      { minute: "53'", type: 'yellow', side: 'away', player: 'Miguel Almirón' },
      { minute: "59'", type: 'yellow', side: 'home', player: 'Tyler Adams' },
      { minute: "73'", type: 'goal', side: 'away', player: 'Maurício' },
      { minute: "79'", type: 'yellow', side: 'away', player: 'Diego Gómez' },
      { minute: "88'", type: 'yellow', side: 'away', player: 'Alex Arce' },
      { minute: "90+3'", type: 'yellow', side: 'away', player: 'Junior Alonso' },
      { minute: "90+8'", type: 'goal', side: 'home', player: 'Giovanni Reyna' },
    ],
    stats: [
      { label: 'Ball possession', home: 65, away: 35, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.34, away: 0.47 },
      { label: 'Total shots', home: 17, away: 8 },
      { label: 'Shots on target', home: 6, away: 1 },
      { label: 'Saves', home: 1, away: 3 },
      { label: 'Fouls', home: 13, away: 17 },
      { label: 'Yellow cards', home: 1, away: 5 },
    ],
  },
  // Saturday, June 13
  {
    id: 5, date: '2026-06-13', time: '12:00 PT', group: 'B', home: 'QAT', away: 'SUI', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "13'", type: 'yellow', side: 'home', player: 'Mahmoud Abunada' },
      { minute: "17'", type: 'goal', side: 'away', player: 'Breel Embolo', note: 'penalty' },
      { minute: "23'", type: 'yellow', side: 'home', player: 'Jassem Gaber' },
      { minute: "42'", type: 'yellow', side: 'away', player: 'Denis Zakaria' },
      { minute: "90+4'", type: 'goal', side: 'home', player: 'Miro Muheim', note: 'own goal' },
    ],
    stats: [
      { label: 'Expected goals (xG)', home: 0.76, away: 3.24 },
      { label: 'Total shots', home: 8, away: 11 },
      { label: 'Shots on target', home: 2, away: 6 },
      { label: 'Saves', home: 5, away: 3 },
      { label: 'Yellow cards', home: 2, away: 1 },
    ],
  },
  {
    id: 6, date: '2026-06-13', time: '18:00 ET', group: 'C', home: 'BRA', away: 'MAR', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "21'", type: 'goal', side: 'away', player: 'Ismael Saibari' },
      { minute: "32'", type: 'goal', side: 'home', player: 'Vinícius Júnior' },
      { minute: "37'", type: 'yellow', side: 'home', player: 'Casemiro' },
      { minute: "43'", type: 'yellow', side: 'home', player: 'Roger Ibañez' },
    ],
    stats: [
      { label: 'Ball possession', home: 51, away: 49, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.26, away: 1.37 },
      { label: 'Total shots', home: 5, away: 3 },
      { label: 'Saves', home: 2, away: 4 },
      { label: 'Fouls', home: 16, away: 14 },
      { label: 'Yellow cards', home: 2, away: 0 },
    ],
  },
  {
    id: 7, date: '2026-06-13', time: '21:00 ET', group: 'C', home: 'HAI', away: 'SCO', venue: 'Gillette Stadium', city: 'Boston', status: 'finished', homeScore: 0, awayScore: 1,
    events: [
      { minute: "28'", type: 'goal', side: 'away', player: 'John McGinn' },
      { minute: "39'", type: 'yellow', side: 'home', player: 'Jean-Ricner Bellegarde' },
      { minute: "46'", type: 'yellow', side: 'away', player: 'Aaron Hickey' },
      { minute: "90+1'", type: 'yellow', side: 'away', player: 'Findlay Curtis' },
      { minute: "90+5'", type: 'yellow', side: 'away', player: 'Kenny McLean' },
    ],
    stats: [
      { label: 'Ball possession', home: 54, away: 46, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.05, away: 1.05 },
      { label: 'Total shots', home: 13, away: 9 },
      { label: 'Shots on target', home: 2, away: 2 },
      { label: 'Saves', home: 2, away: 1 },
      { label: 'Fouls', home: 23, away: 21 },
      { label: 'Yellow cards', home: 1, away: 3 },
    ],
  },
  {
    id: 8, date: '2026-06-13', time: '21:00 PT', group: 'D', home: 'AUS', away: 'TUR', venue: 'BC Place', city: 'Vancouver', status: 'finished', homeScore: 2, awayScore: 0,
    events: [
      { minute: "27'", type: 'goal', side: 'home', player: 'Nestory Irankunda' },
      { minute: "75'", type: 'goal', side: 'home', player: 'Connor Metcalfe' },
      { minute: "86'", type: 'yellow', side: 'away', player: 'Yunus Akgün' },
    ],
    stats: [
      { label: 'Ball possession', home: 28, away: 72, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.77, away: 1.33 },
      { label: 'Total shots', home: 9, away: 30 },
      { label: 'Yellow cards', home: 0, away: 1 },
    ],
  },
  // Sunday, June 14
  {
    id: 9, date: '2026-06-14', time: '12:00 CDT', group: 'E', home: 'GER', away: 'CUW', venue: 'NRG Stadium', city: 'Houston', status: 'finished', homeScore: 7, awayScore: 1,
    events: [
      { minute: "6'", type: 'goal', side: 'home', player: 'Felix Nmecha' },
      { minute: "21'", type: 'goal', side: 'away', player: 'Livano Comenencia' },
      { minute: "38'", type: 'goal', side: 'home', player: 'Nico Schlotterbeck' },
      { minute: "45+5'", type: 'goal', side: 'home', player: 'Kai Havertz', note: 'penalty' },
      { minute: "47'", type: 'goal', side: 'home', player: 'Jamal Musiala' },
      { minute: "68'", type: 'goal', side: 'home', player: 'Nathaniel Brown' },
      { minute: "78'", type: 'goal', side: 'home', player: 'Deniz Undav' },
      { minute: "88'", type: 'goal', side: 'home', player: 'Kai Havertz' },
    ],
    stats: [
      { label: 'Expected goals (xG)', home: 3.91, away: 0.40 },
      { label: 'Total shots', home: 34, away: 8 },
      { label: 'Shots on target', home: 7, away: 2 },
      { label: 'Saves', home: 1, away: 4 },
    ],
  },
  {
    id: 10, date: '2026-06-14', time: '15:00 CDT', group: 'F', home: 'NED', away: 'JPN', venue: 'AT&T Stadium', city: 'Dallas', status: 'finished', homeScore: 2, awayScore: 2,
    events: [
      { minute: "50'", type: 'goal', side: 'home', player: 'Virgil van Dijk' },
      { minute: "57'", type: 'goal', side: 'away', player: 'Keito Nakamura' },
      { minute: "61'", type: 'yellow', side: 'home', player: 'Crysencio Summerville' },
      { minute: "64'", type: 'goal', side: 'home', player: 'Crysencio Summerville' },
      { minute: "83'", type: 'yellow', side: 'home', player: 'Memphis Depay' },
      { minute: "88'", type: 'goal', side: 'away', player: 'Daichi Kamada' },
      { minute: "90+1'", type: 'yellow', side: 'home', player: 'Micky van de Ven' },
    ],
    stats: [
      { label: 'Ball possession', home: 60, away: 40, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.79, away: 0.54 },
      { label: 'Total shots', home: 10, away: 10 },
      { label: 'Shots on target', home: 6, away: 3 },
      { label: 'Saves', home: 1, away: 4 },
      { label: 'Fouls', home: 7, away: 7 },
      { label: 'Yellow cards', home: 3, away: 0 },
    ],
  },
  {
    id: 11, date: '2026-06-14', time: '19:00 ET', group: 'E', home: 'CIV', away: 'ECU', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'finished', homeScore: 1, awayScore: 0,
    events: [
      { minute: "28'", type: 'yellow', side: 'home', player: 'Seko Fofana' },
      { minute: "38'", type: 'yellow', side: 'home', player: 'Franck Kessié' },
      { minute: "40'", type: 'yellow', side: 'home', player: 'Guéla Doué' },
      { minute: "73'", type: 'yellow', side: 'away', player: 'Jackson Porozo' },
      { minute: "90'", type: 'goal', side: 'home', player: 'Amad Diallo' },
    ],
    stats: [
      { label: 'Ball possession', home: 48, away: 52, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.52, away: 1.01 },
      { label: 'Total shots', home: 15, away: 12 },
      { label: 'Shots on target', home: 4, away: 1 },
      { label: 'Saves', home: 1, away: 3 },
      { label: 'Fouls', home: 10, away: 13 },
      { label: 'Yellow cards', home: 3, away: 1 },
    ],
  },
  {
    id: 12, date: '2026-06-14', time: '20:00 CST', group: 'F', home: 'SWE', away: 'TUN', venue: 'Estadio BBVA', city: 'Monterrey', status: 'finished', homeScore: 5, awayScore: 1,
    events: [
      { minute: "7'", type: 'goal', side: 'home', player: 'Yasin Ayari' },
      { minute: "30'", type: 'goal', side: 'home', player: 'Alexander Isak' },
      { minute: "43'", type: 'goal', side: 'away', player: 'Omar Rekik' },
      { minute: "54'", type: 'yellow', side: 'away', player: 'Rani Khedira' },
      { minute: "59'", type: 'goal', side: 'home', player: 'Viktor Gyökeres' },
      { minute: "84'", type: 'goal', side: 'home', player: 'Mattias Svanberg' },
      { minute: "90+6'", type: 'goal', side: 'home', player: 'Yasin Ayari' },
    ],
    stats: [
      { label: 'Ball possession', home: 49, away: 51, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.33, away: 0.28 },
      { label: 'Total shots', home: 13, away: 6 },
      { label: 'Shots on target', home: 7, away: 2 },
      { label: 'Saves', home: 1, away: 1 },
      { label: 'Fouls', home: 10, away: 8 },
      { label: 'Yellow cards', home: 0, away: 1 },
    ],
  },
  // Monday, June 15
  {
    id: 13, date: '2026-06-15', time: '12:00 ET', group: 'H', home: 'ESP', away: 'CPV', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'finished', homeScore: 0, awayScore: 0,
    events: [
      { minute: "16'", type: 'yellow', side: 'away', player: 'Sidny Lopes Cabral' },
      { minute: "90+3'", type: 'yellow', side: 'home', player: 'Pedri' },
    ],
    stats: [
      { label: 'Ball possession', home: 74, away: 26, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.10, away: 0.20 },
      { label: 'Total shots', home: 27, away: 6 },
      { label: 'Shots on target', home: 7, away: 1 },
      { label: 'Saves', home: 1, away: 7 },
      { label: 'Fouls', home: 10, away: 1 },
      { label: 'Yellow cards', home: 1, away: 1 },
    ],
  },
  {
    id: 14, date: '2026-06-15', time: '12:00 PT', group: 'G', home: 'BEL', away: 'EGY', venue: 'BC Place', city: 'Vancouver', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "13'", type: 'yellow', side: 'away', player: 'Marawan Attia' },
      { minute: "14'", type: 'yellow', side: 'home', player: 'Timothy Castagne' },
      { minute: "19'", type: 'goal', side: 'away', player: 'Emam Ashour' },
      { minute: "34'", type: 'yellow', side: 'away', player: 'Ahmed Fatouh' },
      { minute: "66'", type: 'goal', side: 'home', player: 'Mohamed Hany', note: 'own goal' },
      { minute: "75'", type: 'yellow', side: 'home', player: 'Maxim De Cuyper' },
    ],
    stats: [
      { label: 'Ball possession', home: 54, away: 46, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.35, away: 1.08 },
      { label: 'Total shots', home: 15, away: 14 },
      { label: 'Shots on target', home: 3, away: 3 },
      { label: 'Saves', home: 2, away: 3 },
      { label: 'Fouls', home: 15, away: 15 },
      { label: 'Yellow cards', home: 2, away: 2 },
    ],
  },
  {
    id: 15, date: '2026-06-15', time: '18:00 ET', group: 'H', home: 'KSA', away: 'URU', venue: 'Hard Rock Stadium', city: 'Miami', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "41'", type: 'goal', side: 'home', player: 'Abdulelah Al-Amri' },
      { minute: "44'", type: 'yellow', side: 'home', player: 'Abdulelah Al-Amri' },
      { minute: "80'", type: 'goal', side: 'away', player: 'Maxi Araújo' },
    ],
    stats: [
      { label: 'Ball possession', home: 33, away: 67, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.66, away: 1.72 },
      { label: 'Total shots', home: 7, away: 27 },
      { label: 'Shots on target', home: 3, away: 10 },
      { label: 'Saves', home: 9, away: 2 },
      { label: 'Fouls', home: 11, away: 6 },
      { label: 'Yellow cards', home: 1, away: 0 },
    ],
  },
  {
    id: 16, date: '2026-06-15', time: '18:00 PT', group: 'G', home: 'IRN', away: 'NZL', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'finished', homeScore: 2, awayScore: 2,
    events: [
      { minute: "7'", type: 'goal', side: 'away', player: 'Elijah Just' },
      { minute: "32'", type: 'goal', side: 'home', player: 'Ramin Rezaeian' },
      { minute: "54'", type: 'goal', side: 'away', player: 'Elijah Just' },
      { minute: "64'", type: 'goal', side: 'home', player: 'Mohammad Mohebbi' },
      { minute: "89'", type: 'yellow', side: 'home', player: 'Ehsan Hajisafi' },
    ],
    stats: [
      { label: 'Ball possession', home: 48, away: 52, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.50, away: 1.24 },
      { label: 'Total shots', home: 17, away: 14 },
      { label: 'Shots on target', home: 4, away: 8 },
      { label: 'Saves', home: 6, away: 2 },
      { label: 'Fouls', home: 10, away: 8 },
      { label: 'Yellow cards', home: 1, away: 0 },
    ],
  },
  // Tuesday, June 16
  {
    id: 17, date: '2026-06-16', time: '15:00 ET', group: 'I', home: 'FRA', away: 'SEN', venue: 'MetLife Stadium', city: 'New York / New Jersey', status: 'finished', homeScore: 3, awayScore: 1,
    events: [
      { minute: "66'", type: 'goal', side: 'home', player: 'Kylian Mbappé' },
      { minute: "82'", type: 'goal', side: 'home', player: 'Bradley Barcola' },
      { minute: "90+5'", type: 'goal', side: 'away', player: 'Ibrahim Mbaye' },
      { minute: "90+6'", type: 'goal', side: 'home', player: 'Kylian Mbappé' },
    ],
    stats: [
      { label: 'Ball possession', home: 53, away: 47, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.79, away: 0.53 },
      { label: 'Total shots', home: 18, away: 3 },
      { label: 'Shots on target', home: 8, away: 2 },
      { label: 'Saves', home: 5, away: 2 },
      { label: 'Fouls', home: 5, away: 9 },
    ],
  },
  {
    id: 18, date: '2026-06-16', time: '18:00 ET', group: 'I', home: 'IRQ', away: 'NOR', venue: 'Gillette Stadium', city: 'Boston', status: 'finished', homeScore: 1, awayScore: 4,
    events: [
      { minute: "29'", type: 'goal', side: 'away', player: 'Erling Haaland' },
      { minute: "39'", type: 'goal', side: 'home', player: 'Aymen Hussein' },
      { minute: "43'", type: 'goal', side: 'away', player: 'Erling Haaland' },
      { minute: "76'", type: 'goal', side: 'away', player: 'Leo Østigård' },
      { minute: "86'", type: 'yellow', side: 'home', player: 'Zaid Tahseen' },
      { minute: "90+6'", type: 'goal', side: 'away', player: 'Aymen Hussein', note: 'own goal' },
    ],
    stats: [
      { label: 'Ball possession', home: 39, away: 61, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.80, away: 2.52 },
      { label: 'Total shots', home: 11, away: 12 },
      { label: 'Shots on target', home: 1, away: 5 },
      { label: 'Saves', home: 2, away: 0 },
      { label: 'Fouls', home: 12, away: 13 },
      { label: 'Yellow cards', home: 1, away: 0 },
    ],
  },
  {
    id: 19, date: '2026-06-16', time: '20:00 CDT', group: 'J', home: 'ARG', away: 'ALG', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'finished', homeScore: 3, awayScore: 0,
    events: [
      { minute: "17'", type: 'goal', side: 'home', player: 'Lionel Messi' },
      { minute: "60'", type: 'goal', side: 'home', player: 'Lionel Messi' },
      { minute: "76'", type: 'goal', side: 'home', player: 'Lionel Messi' },
    ],
    stats: [
      { label: 'Ball possession', home: 48, away: 52, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.26, away: 0.32 },
      { label: 'Total shots', home: 10, away: 7 },
      { label: 'Shots on target', home: 6, away: 1 },
      { label: 'Saves', home: 0, away: 3 },
      { label: 'Fouls', home: 13, away: 8 },
    ],
  },
  {
    id: 20, date: '2026-06-16', time: '21:00 PT', group: 'J', home: 'AUT', away: 'JOR', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'finished', homeScore: 3, awayScore: 1,
    events: [
      { minute: "20'", type: 'goal', side: 'home', player: 'Romano Schmid' },
      { minute: "50'", type: 'goal', side: 'away', player: 'Ali Olwan' },
      { minute: "76'", type: 'goal', side: 'home', player: 'Yazan Al-Arab', note: 'own goal' },
      { minute: "77'", type: 'yellow', side: 'home', player: 'Marcel Sabitzer' },
      { minute: "90+12'", type: 'goal', side: 'home', player: 'Marko Arnautović', note: 'penalty' },
    ],
    stats: [
      { label: 'Ball possession', home: 63, away: 37, unit: '%' },
      { label: 'Total shots', home: 11, away: 11 },
      { label: 'Shots on target', home: 4, away: 4 },
      { label: 'Saves', home: 3, away: 1 },
      { label: 'Fouls', home: 12, away: 7 },
      { label: 'Yellow cards', home: 1, away: 0 },
    ],
  },
  // Wednesday, June 17
  {
    id: 21, date: '2026-06-17', time: '12:00 CDT', group: 'K', home: 'POR', away: 'COD', venue: 'NRG Stadium', city: 'Houston', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "6'", type: 'goal', side: 'home', player: 'João Neves' },
      { minute: "13'", type: 'yellow', side: 'home', player: 'Bernardo Silva' },
      { minute: "32'", type: 'yellow', side: 'away', player: 'Chancel Mbemba' },
      { minute: "45+5'", type: 'goal', side: 'away', player: 'Yoane Wissa' },
      { minute: "88'", type: 'yellow', side: 'home', player: 'Nélson Semedo' },
      { minute: "90+2'", type: 'yellow', side: 'home', player: 'Tomás Araújo' },
    ],
    stats: [
      { label: 'Ball possession', home: 75, away: 25, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.64, away: 0.82 },
      { label: 'Total shots', home: 7, away: 8 },
      { label: 'Shots on target', home: 1, away: 2 },
      { label: 'Saves', home: 1, away: 0 },
      { label: 'Fouls', home: 9, away: 10 },
      { label: 'Yellow cards', home: 3, away: 1 },
    ],
  },
  {
    id: 22, date: '2026-06-17', time: '15:00 CDT', group: 'L', home: 'ENG', away: 'CRO', venue: 'AT&T Stadium', city: 'Dallas', status: 'finished', homeScore: 4, awayScore: 2,
    events: [
      { minute: "12'", type: 'goal', side: 'home', player: 'Harry Kane', note: 'penalty' },
      { minute: "36'", type: 'goal', side: 'away', player: 'Martin Baturina' },
      { minute: "42'", type: 'goal', side: 'home', player: 'Harry Kane' },
      { minute: "45+5'", type: 'goal', side: 'away', player: 'Petar Musa' },
      { minute: "47'", type: 'goal', side: 'home', player: 'Jude Bellingham' },
      { minute: "85'", type: 'goal', side: 'home', player: 'Marcus Rashford' },
    ],
    stats: [
      { label: 'Ball possession', home: 52, away: 48, unit: '%' },
      { label: 'Expected goals (xG)', home: 3.20, away: 0.70 },
      { label: 'Total shots', home: 22, away: 10 },
      { label: 'Shots on target', home: 11, away: 5 },
      { label: 'Saves', home: 3, away: 7 },
      { label: 'Fouls', home: 10, away: 12 },
    ],
  },
  {
    id: 23, date: '2026-06-17', time: '19:00 ET', group: 'L', home: 'GHA', away: 'PAN', venue: 'BMO Field', city: 'Toronto', status: 'finished', homeScore: 1, awayScore: 0,
    events: [
      { minute: "16'", type: 'yellow', side: 'home', player: 'Caleb Yirenkyi' },
      { minute: "72'", type: 'yellow', side: 'away', player: 'César Blackman' },
      { minute: "90+5'", type: 'goal', side: 'home', player: 'Caleb Yirenkyi' },
      { minute: "90+9'", type: 'yellow', side: 'away', player: 'Carlos Harvey' },
    ],
    stats: [
      { label: 'Ball possession', home: 38, away: 62, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.31, away: 0.73 },
      { label: 'Total shots', home: 8, away: 11 },
      { label: 'Shots on target', home: 2, away: 4 },
      { label: 'Saves', home: 4, away: 2 },
      { label: 'Fouls', home: 9, away: 11 },
      { label: 'Yellow cards', home: 1, away: 2 },
    ],
  },
  {
    id: 24, date: '2026-06-17', time: '20:00 CST', group: 'K', home: 'UZB', away: 'COL', venue: 'Estadio Azteca', city: 'Mexico City', status: 'finished', homeScore: 1, awayScore: 3,
    events: [
      { minute: "7'", type: 'yellow', side: 'away', player: 'Johan Mojica' },
      { minute: "34'", type: 'yellow', side: 'home', player: 'Abdukodir Khusanov' },
      { minute: "40'", type: 'goal', side: 'away', player: 'Daniel Muñoz' },
      { minute: "60'", type: 'goal', side: 'home', player: 'Abbosbek Fayzullaev' },
      { minute: "65'", type: 'goal', side: 'away', player: 'Luis Díaz' },
      { minute: "90+9'", type: 'goal', side: 'away', player: 'Jaminton Campaz' },
    ],
    stats: [
      { label: 'Ball possession', home: 39, away: 61, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.16, away: 1.61 },
      { label: 'Total shots', home: 8, away: 15 },
      { label: 'Shots on target', home: 2, away: 4 },
      { label: 'Saves', home: 1, away: 1 },
      { label: 'Fouls', home: 14, away: 11 },
      { label: 'Yellow cards', home: 1, away: 1 },
    ],
  },
  // Thursday, June 18
  {
    id: 25, date: '2026-06-18', time: '12:00 ET', group: 'A', home: 'CZE', away: 'RSA', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'finished', homeScore: 1, awayScore: 1,
    events: [
      { minute: "6'", type: 'goal', side: 'home', player: 'Michal Sadílek' },
      { minute: "33'", type: 'yellow', side: 'away', player: 'Teboho Mokoena' },
      { minute: "40'", type: 'yellow', side: 'away', player: 'Thalente Mbatha' },
      { minute: "75'", type: 'yellow', side: 'home', player: 'Ladislav Krejčí' },
      { minute: "83'", type: 'goal', side: 'away', player: 'Teboho Mokoena', note: 'penalty' },
    ],
    stats: [
      { label: 'Ball possession', home: 38, away: 62, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.02, away: 1.38 },
      { label: 'Total shots', home: 14, away: 17 },
      { label: 'Shots on target', home: 3, away: 4 },
      { label: 'Saves', home: 3, away: 2 },
      { label: 'Fouls', home: 12, away: 10 },
      { label: 'Yellow cards', home: 1, away: 2 },
    ],
  },
  {
    id: 26, date: '2026-06-18', time: '12:00 PT', group: 'B', home: 'SUI', away: 'BIH', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'finished', homeScore: 4, awayScore: 1,
    events: [
      { minute: "59'", type: 'yellow', side: 'away', player: 'Amar Dedić' },
      { minute: "61'", type: 'yellow', side: 'away', player: 'Edin Džeko' },
      { minute: "65'", type: 'yellow', side: 'home', player: 'Nico Elvedi' },
      { minute: "74'", type: 'goal', side: 'home', player: 'Johan Manzambi' },
      { minute: "80'", type: 'red', side: 'away', player: 'Tarik Muharemović' },
      { minute: "84'", type: 'goal', side: 'home', player: 'Ruben Vargas' },
      { minute: "90'", type: 'goal', side: 'home', player: 'Johan Manzambi' },
      { minute: "90+3'", type: 'goal', side: 'away', player: 'Ermin Mahmić' },
      { minute: "90+7'", type: 'goal', side: 'home', player: 'Granit Xhaka', note: 'penalty' },
    ],
    stats: [
      { label: 'Ball possession', home: 62, away: 38, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.06, away: 0.23 },
      { label: 'Total shots', home: 13, away: 5 },
      { label: 'Shots on target', home: 7, away: 3 },
      { label: 'Saves', home: 2, away: 3 },
      { label: 'Fouls', home: 7, away: 18 },
      { label: 'Yellow cards', home: 1, away: 2 },
      { label: 'Red cards', home: 0, away: 1 },
    ],
  },
  {
    id: 27, date: '2026-06-18', time: '15:00 PT', group: 'B', home: 'CAN', away: 'QAT', venue: 'BC Place', city: 'Vancouver', status: 'finished', homeScore: 6, awayScore: 0,
    events: [
      { minute: "9'", type: 'yellow', side: 'home', player: 'Derek Cornelius' },
      { minute: "16'", type: 'goal', side: 'home', player: 'Cyle Larin' },
      { minute: "29'", type: 'goal', side: 'home', player: 'Jonathan David' },
      { minute: "33'", type: 'red', side: 'away', player: 'Homam Ahmed' },
      { minute: "45+3'", type: 'goal', side: 'home', player: 'Jonathan David' },
      { minute: "51'", type: 'red', side: 'away', player: 'Assim Madibo' },
      { minute: "62'", type: 'yellow', side: 'away', player: 'Ahmed Fathy' },
      { minute: "64'", type: 'goal', side: 'home', player: 'Nathan Saliba' },
      { minute: "75'", type: 'goal', side: 'home', player: 'Mohamed Manai', note: 'own goal' },
      { minute: "90+2'", type: 'goal', side: 'home', player: 'Jonathan David' },
    ],
    stats: [
      { label: 'Ball possession', home: 79, away: 21, unit: '%' },
      { label: 'Expected goals (xG)', home: 4.60, away: 0.22 },
      { label: 'Total shots', home: 32, away: 2 },
      { label: 'Shots on target', home: 10, away: 0 },
      { label: 'Saves', home: 0, away: 4 },
      { label: 'Fouls', home: 9, away: 10 },
      { label: 'Yellow cards', home: 1, away: 1 },
      { label: 'Red cards', home: 0, away: 2 },
    ],
  },
  {
    id: 28, date: '2026-06-18', time: '19:00 CST', group: 'A', home: 'MEX', away: 'KOR', venue: 'Estadio Akron', city: 'Guadalajara', status: 'finished', homeScore: 1, awayScore: 0,
    events: [
      { minute: "4'", type: 'yellow', side: 'away', player: 'Lee Kang-in' },
      { minute: "50'", type: 'goal', side: 'home', player: 'Luis Romo' },
      { minute: "58'", type: 'yellow', side: 'away', player: 'Paik Seung-ho' },
    ],
    stats: [
      { label: 'Ball possession', home: 42, away: 58, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.53, away: 0.91 },
      { label: 'Total shots', home: 8, away: 9 },
      { label: 'Shots on target', home: 4, away: 2 },
      { label: 'Saves', home: 2, away: 3 },
      { label: 'Fouls', home: 9, away: 7 },
      { label: 'Yellow cards', home: 0, away: 2 },
    ],
  },
  // Friday, June 19
  {
    id: 29, date: '2026-06-19', time: '12:00 PT', group: 'D', home: 'USA', away: 'AUS', venue: 'Lumen Field', city: 'Seattle', status: 'finished', homeScore: 2, awayScore: 0,
    events: [
      { minute: "11'", type: 'goal', side: 'home', player: 'Cameron Burgess', note: 'own goal' },
      { minute: "16'", type: 'yellow', side: 'away', player: 'Jordan Bos' },
      { minute: "32'", type: 'yellow', side: 'away', player: 'Alessandro Circati' },
      { minute: "43'", type: 'goal', side: 'home', player: 'Alex Freeman' },
      { minute: "56'", type: 'yellow', side: 'home', player: 'Antonee Robinson' },
      { minute: "89'", type: 'yellow', side: 'home', player: 'Folarin Balogun' },
      { minute: "89'", type: 'yellow', side: 'away', player: 'Harry Souttar' },
      { minute: "90+3'", type: 'yellow', side: 'home', player: 'Chris Richards' },
    ],
    stats: [
      { label: 'Ball possession', home: 62, away: 38, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.08, away: 0.35 },
      { label: 'Total shots', home: 10, away: 5 },
      { label: 'Shots on target', home: 2, away: 2 },
      { label: 'Saves', home: 2, away: 1 },
      { label: 'Fouls', home: 12, away: 16 },
      { label: 'Yellow cards', home: 3, away: 4 },
    ],
  },
  {
    id: 30, date: '2026-06-19', time: '18:00 ET', group: 'C', home: 'SCO', away: 'MAR', venue: 'Gillette Stadium', city: 'Boston', status: 'finished', homeScore: 0, awayScore: 1,
    events: [
      { minute: "2'", type: 'goal', side: 'away', player: 'Ismael Saibari' },
      { minute: "22'", type: 'yellow', side: 'away', player: 'Issa Diop' },
      { minute: "65'", type: 'yellow', side: 'home', player: 'Andy Robertson' },
    ],
    stats: [
      { label: 'Ball possession', home: 41, away: 59, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.52, away: 0.99 },
      { label: 'Total shots', home: 6, away: 12 },
      { label: 'Shots on target', home: 0, away: 2 },
      { label: 'Saves', home: 1, away: 0 },
      { label: 'Fouls', home: 11, away: 8 },
      { label: 'Yellow cards', home: 1, away: 1 },
    ],
  },
  {
    id: 31, date: '2026-06-19', time: '20:30 ET', group: 'C', home: 'BRA', away: 'HAI', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'finished', homeScore: 3, awayScore: 0,
    events: [
      { minute: "4'", type: 'yellow', side: 'away', player: 'Carlens Arcus' },
      { minute: "23'", type: 'goal', side: 'home', player: 'Matheus Cunha' },
      { minute: "36'", type: 'goal', side: 'home', player: 'Matheus Cunha' },
      { minute: "45+3'", type: 'goal', side: 'home', player: 'Vinícius Júnior' },
      { minute: "45+4'", type: 'yellow', side: 'away', player: 'Frantzdy Pierrot' },
      { minute: "65'", type: 'yellow', side: 'home', player: 'Douglas Santos' },
      { minute: "72'", type: 'yellow', side: 'away', player: 'Danley Jean Jacques' },
    ],
    stats: [
      { label: 'Ball possession', home: 57, away: 43, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.75, away: 0.23 },
      { label: 'Total shots', home: 8, away: 7 },
      { label: 'Shots on target', home: 5, away: 3 },
      { label: 'Saves', home: 3, away: 2 },
      { label: 'Fouls', home: 13, away: 14 },
      { label: 'Yellow cards', home: 1, away: 3 },
    ],
  },
  {
    id: 32, date: '2026-06-19', time: '20:00 PT', group: 'D', home: 'TUR', away: 'PAR', venue: "Levi's Stadium", city: 'San Francisco Bay Area', status: 'finished', homeScore: 0, awayScore: 1,
    events: [
      { minute: "2'", type: 'goal', side: 'away', player: 'Matías Galarza' },
      { minute: "4'", type: 'yellow', side: 'away', player: 'Matías Galarza' },
      { minute: "45+3'", type: 'red', side: 'away', player: 'Miguel Almirón' },
      { minute: "71'", type: 'yellow', side: 'home', player: 'Eren Elmalı' },
    ],
    stats: [
      { label: 'Ball possession', home: 78, away: 22, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.12, away: 0.32 },
      { label: 'Total shots', home: 32, away: 7 },
      { label: 'Shots on target', home: 5, away: 2 },
      { label: 'Saves', home: 1, away: 5 },
      { label: 'Fouls', home: 14, away: 15 },
      { label: 'Yellow cards', home: 1, away: 1 },
      { label: 'Red cards', home: 0, away: 1 },
    ],
  },
  // Saturday, June 20
  {
    id: 33, date: '2026-06-20', time: '12:00 CDT', group: 'F', home: 'NED', away: 'SWE', venue: 'NRG Stadium', city: 'Houston', status: 'finished', homeScore: 5, awayScore: 1,
    events: [
      { minute: "5'", type: 'goal', side: 'home', player: 'Brian Brobbey' },
      { minute: "17'", type: 'goal', side: 'home', player: 'Brian Brobbey' },
      { minute: "47'", type: 'goal', side: 'home', player: 'Cody Gakpo' },
      { minute: "53'", type: 'yellow', side: 'away', player: 'Gabriel Gudmundsson' },
      { minute: "54'", type: 'goal', side: 'home', player: 'Cody Gakpo' },
      { minute: "59'", type: 'goal', side: 'away', player: 'Anthony Elanga' },
      { minute: "75'", type: 'yellow', side: 'away', player: 'Yasin Ayari' },
      { minute: "80'", type: 'yellow', side: 'away', player: 'Lucas Bergvall' },
      { minute: "89'", type: 'goal', side: 'home', player: 'Crysencio Summerville' },
    ],
    stats: [
      { label: 'Ball possession', home: 51, away: 49, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.47, away: 0.99 },
      { label: 'Total shots', home: 10, away: 16 },
      { label: 'Shots on target', home: 7, away: 8 },
      { label: 'Saves', home: 7, away: 2 },
      { label: 'Fouls', home: 9, away: 12 },
      { label: 'Yellow cards', home: 0, away: 3 },
    ],
  },
  {
    id: 34, date: '2026-06-20', time: '16:00 ET', group: 'E', home: 'GER', away: 'CIV', venue: 'BMO Field', city: 'Toronto', status: 'finished', homeScore: 2, awayScore: 1,
    events: [
      { minute: "30'", type: 'goal', side: 'away', player: 'Franck Kessié' },
      { minute: "68'", type: 'goal', side: 'home', player: 'Deniz Undav' },
      { minute: "90+4'", type: 'goal', side: 'home', player: 'Deniz Undav' },
    ],
    stats: [
      { label: 'Ball possession', home: 60, away: 40, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.89, away: 1.22 },
      { label: 'Total shots', home: 16, away: 9 },
      { label: 'Shots on target', home: 7, away: 2 },
      { label: 'Saves', home: 1, away: 5 },
      { label: 'Fouls', home: 5, away: 7 },
    ],
  },
  {
    id: 35, date: '2026-06-20', time: '19:00 CDT', group: 'E', home: 'ECU', away: 'CUW', venue: 'Arrowhead Stadium', city: 'Kansas City', status: 'finished', homeScore: 0, awayScore: 0,
    events: [
      { minute: "38'", type: 'yellow', side: 'home', player: 'Jordy Alcívar' },
      { minute: "39'", type: 'yellow', side: 'away', player: 'Leandro Bacuna' },
      { minute: "53'", type: 'yellow', side: 'away', player: 'Juninho Bacuna' },
      { minute: "56'", type: 'yellow', side: 'away', player: 'Livano Comenencia' },
      { minute: "75'", type: 'yellow', side: 'away', player: 'Jurien Gaari' },
      { minute: "90+1'", type: 'yellow', side: 'away', player: 'Gervane Kastaneer' },
    ],
    stats: [
      { label: 'Ball possession', home: 75, away: 25, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.84, away: 0.50 },
      { label: 'Total shots', home: 27, away: 10 },
      { label: 'Shots on target', home: 15, away: 3 },
      { label: 'Saves', home: 3, away: 15 },
      { label: 'Fouls', home: 7, away: 10 },
      { label: 'Yellow cards', home: 1, away: 5 },
    ],
  },
  {
    id: 36, date: '2026-06-20', time: '22:00 CST', group: 'F', home: 'TUN', away: 'JPN', venue: 'Estadio BBVA', city: 'Monterrey', status: 'finished', homeScore: 0, awayScore: 4,
    events: [
      { minute: "4'", type: 'goal', side: 'away', player: 'Daichi Kamada' },
      { minute: "31'", type: 'goal', side: 'away', player: 'Ayase Ueda' },
      { minute: "69'", type: 'goal', side: 'away', player: 'Junya Ito' },
      { minute: "83'", type: 'goal', side: 'away', player: 'Ayase Ueda' },
    ],
    stats: [
      { label: 'Ball possession', home: 38, away: 62, unit: '%' },
      { label: 'Expected goals (xG)', home: 0.05, away: 2.13 },
      { label: 'Total shots', home: 2, away: 11 },
      { label: 'Shots on target', home: 0, away: 5 },
      { label: 'Saves', home: 1, away: 0 },
      { label: 'Fouls', home: 8, away: 15 },
    ],
  },
  // Sunday, June 21
  {
    id: 37, date: '2026-06-21', time: '12:00 ET', group: 'H', home: 'ESP', away: 'KSA', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', status: 'finished', homeScore: 4, awayScore: 0,
    events: [
      { minute: "10'", type: 'goal', side: 'home', player: 'Lamine Yamal' },
      { minute: "21'", type: 'goal', side: 'home', player: 'Mikel Oyarzabal' },
      { minute: "24'", type: 'goal', side: 'home', player: 'Mikel Oyarzabal' },
      { minute: "30'", type: 'yellow', side: 'away', player: 'Salem Al-Dawsari' },
      { minute: "49'", type: 'goal', side: 'home', player: 'Hassan Al-Tambakti', note: 'own goal' },
      { minute: "60'", type: 'yellow', side: 'away', player: 'Mohamed Kanno' },
    ],
    stats: [
      { label: 'Ball possession', home: 67, away: 33, unit: '%' },
      { label: 'Expected goals (xG)', home: 2.30, away: 0.14 },
      { label: 'Total shots', home: 22, away: 3 },
      { label: 'Shots on target', home: 8, away: 1 },
      { label: 'Saves', home: 1, away: 5 },
      { label: 'Fouls', home: 10, away: 2 },
      { label: 'Yellow cards', home: 0, away: 2 },
    ],
  },
  {
    id: 38, date: '2026-06-21', time: '12:00 PT', group: 'G', home: 'BEL', away: 'IRN', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'finished', homeScore: 0, awayScore: 0,
    events: [
      { minute: "3'", type: 'yellow', side: 'home', player: 'Romelu Lukaku' },
      { minute: "33'", type: 'yellow', side: 'away', player: 'Saeid Ezatolahi' },
      { minute: "66'", type: 'red', side: 'home', player: 'Nathan Ngoy' },
    ],
    stats: [
      { label: 'Ball possession', home: 70, away: 30, unit: '%' },
      { label: 'Expected goals (xG)', home: 1.82, away: 0.63 },
      { label: 'Total shots', home: 23, away: 7 },
      { label: 'Shots on target', home: 7, away: 3 },
      { label: 'Saves', home: 3, away: 7 },
      { label: 'Fouls', home: 7, away: 9 },
      { label: 'Yellow cards', home: 1, away: 1 },
      { label: 'Red cards', home: 1, away: 0 },
    ],
  },
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
