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
  { player: 'Folarin Balogun', teamId: 'USA', goals: 2, photo: '/players/folarin-balogun.jpg' },
  { player: 'Giovanni Reyna', teamId: 'USA', goals: 1, photo: '/players/giovanni-reyna.jpg' },
  { player: 'Breel Embolo', teamId: 'SUI', goals: 1, photo: '/players/breel-embolo.jpg' },
  { player: 'Vinícius Júnior', teamId: 'BRA', goals: 1, photo: '/players/vinicius-junior.jpg' },
  { player: 'Ismael Saibari', teamId: 'MAR', goals: 1, photo: '/players/ismael-saibari.jpg' },
  { player: 'John McGinn', teamId: 'SCO', goals: 1, photo: '/players/john-mcginn.jpg' },
  { player: 'Nestory Irankunda', teamId: 'AUS', goals: 1, photo: '/players/nestory-irankunda.jpg' },
  { player: 'Connor Metcalfe', teamId: 'AUS', goals: 1, photo: '/players/connor-metcalfe.jpg' },
  { player: 'Kai Havertz', teamId: 'GER', goals: 2, photo: '/players/kai-havertz.jpg' },
  { player: 'Felix Nmecha', teamId: 'GER', goals: 1, photo: '/players/felix-nmecha.jpg' },
  { player: 'Nico Schlotterbeck', teamId: 'GER', goals: 1, photo: '/players/nico-schlotterbeck.jpg' },
  { player: 'Jamal Musiala', teamId: 'GER', goals: 1, photo: '/players/jamal-musiala.jpg' },
  { player: 'Deniz Undav', teamId: 'GER', goals: 1, photo: '/players/deniz-undav.jpg' },
  { player: 'Virgil van Dijk', teamId: 'NED', goals: 1, photo: '/players/virgil-van-dijk.jpg' },
  { player: 'Crysencio Summerville', teamId: 'NED', goals: 1, photo: '/players/crysencio-summerville.jpeg' },
  { player: 'Keito Nakamura', teamId: 'JPN', goals: 1, photo: '/players/keito-nakamura.png' },
  { player: 'Daichi Kamada', teamId: 'JPN', goals: 1, photo: '/players/daichi-kamada.jpg' },
  // Sourced from Transfermarkt (not on Wikipedia / no nationality in bio)
  { player: 'Ibrahim Mbaye', teamId: 'SEN', goals: 1, photo: '/players/ibrahim-mbaye.jpg' },
  { player: 'Maxi Araújo', teamId: 'URU', goals: 1, photo: '/players/maxi-araujo.jpg' },
  { player: 'Maurício', teamId: 'PAR', goals: 1, photo: '/players/mauricio-par.jpg' },
  { player: 'Nathaniel Brown', teamId: 'GER', goals: 1, photo: '/players/nathaniel-brown.jpg' },
  { player: 'Livano Comenencia', teamId: 'CUW', goals: 1, photo: '/players/livano-comenencia.jpg' },
  { player: 'Omar Rekik', teamId: 'TUN', goals: 1, photo: '/players/omar-rekik.jpg' },
];

export interface Assister {
  player: string;
  teamId: string;
  assists: number;
}

// Tournament assist leaders (the FIFA feed carries no assist data, so this is
// curated from the official FIFA / Fox Sports stat pages). Matched onto the
// goalscorer table by player name + team; goals remain the primary ranking.
export const assists: Assister[] = [
  { player: 'Michael Olise', teamId: 'FRA', assists: 5 },
  { player: 'Bruno Guimarães', teamId: 'BRA', assists: 4 },
  { player: 'Brahim Díaz', teamId: 'MAR', assists: 4 },
  { player: 'Alexander Isak', teamId: 'SWE', assists: 3 },
  { player: 'Leandro Trossard', teamId: 'BEL', assists: 3 },
  { player: 'Martin Ødegaard', teamId: 'NOR', assists: 3 },
  { player: 'Bukayo Saka', teamId: 'ENG', assists: 3 },
  { player: 'Andreas Schjelderup', teamId: 'NOR', assists: 3 },
  { player: 'Florian Wirtz', teamId: 'GER', assists: 3 },
  { player: 'Roberto Alvarado', teamId: 'MEX', assists: 3 },
  { player: 'Hannibal Mejbri', teamId: 'TUN', assists: 2 },
  { player: 'Chris Wood', teamId: 'NZL', assists: 2 },
  { player: 'Julio Enciso', teamId: 'PAR', assists: 2 },
  { player: 'Crysencio Summerville', teamId: 'NED', assists: 2 },
  { player: 'Marc Cucurella', teamId: 'ESP', assists: 2 },
  { player: 'Anthony Gordon', teamId: 'ENG', assists: 2 },
  { player: 'Mohamed Salah', teamId: 'EGY', assists: 2 },
  { player: 'Ryan Gravenberch', teamId: 'NED', assists: 2 },
  { player: 'Iliman Ndiaye', teamId: 'SEN', assists: 2 },
  { player: 'Patrick Berg', teamId: 'NOR', assists: 2 },
  { player: 'Kylian Mbappé', teamId: 'FRA', assists: 2 },
  { player: 'Houssem Aouar', teamId: 'ALG', assists: 2 },
  { player: 'Breel Embolo', teamId: 'SUI', assists: 2 },
  { player: 'Johan Manzambi', teamId: 'SUI', assists: 2 },
  { player: 'Denzel Dumfries', teamId: 'NED', assists: 2 },
];
