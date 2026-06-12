export interface Scorer {
  player: string;
  teamId: string;
  goals: number;
  photo?: string; // path under public/ — omit to show an initials avatar
}

// Tournament goalscorers — bump `goals` (or add a new entry) after each match.
// The Top Scorers section ranks this list automatically.
export const scorers: Scorer[] = [
  { player: 'Julián Quiñones', teamId: 'MEX', goals: 1, photo: '/players/julian-quinones.png' },
  { player: 'Raúl Jiménez', teamId: 'MEX', goals: 1, photo: '/players/raul-jimenez.jpg' },
  { player: 'Hwang In-beom', teamId: 'KOR', goals: 1, photo: '/players/hwang-in-beom.jpg' },
  { player: 'Oh Hyeon-gyu', teamId: 'KOR', goals: 1, photo: '/players/oh-hyeon-gyu.jpg' },
  { player: 'Ladislav Krejčí', teamId: 'CZE', goals: 1, photo: '/players/ladislav-krejci.jpg' },
  { player: 'Cyle Larin', teamId: 'CAN', goals: 1, photo: '/players/cyle-larin.png' },
  { player: 'Jovo Lukić', teamId: 'BIH', goals: 1, photo: '/players/jovo-lukic.jpg' },
];
