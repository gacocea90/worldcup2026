export type SquadPosition = 'GK' | 'DF' | 'MF' | 'FW';

export interface SquadPlayer {
  number: number;
  player: string;
  position: SquadPosition;
  captain?: boolean;
}

// Winner of the FIFA World Cup 2026.
export const champion = {
  teamId: 'ESP',
  finalMatchId: 104, // Spain 1–0 Argentina (a.e.t.) — MetLife Stadium, July 19
  coach: 'Luis de la Fuente',
};

// The 26-man squad that lifted the trophy, from the official FIFA match sheets.
// Goals and assists are joined in at render time from the live feed / assist
// data, so this list stays a pure roster.
export const championSquad: SquadPlayer[] = [
  // Goalkeepers
  { number: 1, player: 'David Raya', position: 'GK' },
  { number: 13, player: 'Joan García', position: 'GK' },
  { number: 23, player: 'Unai Simón', position: 'GK' },
  // Defenders
  { number: 2, player: 'Marc Pubill', position: 'DF' },
  { number: 3, player: 'Álex Grimaldo', position: 'DF' },
  { number: 4, player: 'Eric García', position: 'DF' },
  { number: 5, player: 'Marcos Llorente', position: 'DF' },
  { number: 12, player: 'Pedro Porro', position: 'DF' },
  { number: 14, player: 'Aymeric Laporte', position: 'DF' },
  { number: 22, player: 'Pau Cubarsí', position: 'DF' },
  { number: 24, player: 'Marc Cucurella', position: 'DF' },
  // Midfielders
  { number: 6, player: 'Mikel Merino', position: 'MF' },
  { number: 8, player: 'Fabián Ruiz', position: 'MF' },
  { number: 9, player: 'Gavi', position: 'MF' },
  { number: 15, player: 'Álex Baena', position: 'MF' },
  { number: 16, player: 'Rodri', position: 'MF', captain: true },
  { number: 18, player: 'Martín Zubimendi', position: 'MF' },
  { number: 20, player: 'Pedri', position: 'MF' },
  // Forwards
  { number: 7, player: 'Ferran Torres', position: 'FW' },
  { number: 10, player: 'Dani Olmo', position: 'FW' },
  { number: 11, player: 'Yeremy Pino', position: 'FW' },
  { number: 17, player: 'Nico Williams', position: 'FW' },
  { number: 19, player: 'Lamine Yamal', position: 'FW' },
  { number: 21, player: 'Mikel Oyarzabal', position: 'FW' },
  { number: 25, player: 'Víctor Muñoz', position: 'FW' },
  { number: 26, player: 'Borja Iglesias', position: 'FW' },
];

export const POSITION_LABELS: Record<SquadPosition, string> = {
  GK: 'Goalkeepers',
  DF: 'Defenders',
  MF: 'Midfielders',
  FW: 'Forwards',
};
