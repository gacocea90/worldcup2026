export interface Team {
  id: string;
  name: string;
  flag: string;
  group: string;
  confederation: string;
  keyPlayers: string[];
}

export const teams: Team[] = [
  // Group A
  { id: 'MEX', name: 'Mexico', flag: '🇲🇽', group: 'A', confederation: 'CONCACAF', keyPlayers: ['Raúl Jiménez', 'Edson Álvarez', 'Julián Quiñones'] },
  { id: 'RSA', name: 'South Africa', flag: '🇿🇦', group: 'A', confederation: 'CAF', keyPlayers: ['Percy Tau', 'Ronwen Williams', 'Themba Zwane'] },
  { id: 'KOR', name: 'South Korea', flag: '🇰🇷', group: 'A', confederation: 'AFC', keyPlayers: ['Son Heung-min', 'Lee Kang-in', 'Kim Min-jae'] },
  { id: 'CZE', name: 'Czechia', flag: '🇨🇿', group: 'A', confederation: 'UEFA', keyPlayers: ['Patrik Schick', 'Ladislav Krejčí', 'Tomáš Souček'] },
  // Group B
  { id: 'CAN', name: 'Canada', flag: '🇨🇦', group: 'B', confederation: 'CONCACAF', keyPlayers: ['Alphonso Davies', 'Jonathan David', 'Stephen Eustáquio'] },
  { id: 'BIH', name: 'Bosnia & Herzegovina', flag: '🇧🇦', group: 'B', confederation: 'UEFA', keyPlayers: ['Edin Džeko', 'Ermedin Demirović', 'Sead Kolašinac'] },
  { id: 'QAT', name: 'Qatar', flag: '🇶🇦', group: 'B', confederation: 'AFC', keyPlayers: ['Akram Afif', 'Almoez Ali', 'Mohammed Muntari'] },
  { id: 'SUI', name: 'Switzerland', flag: '🇨🇭', group: 'B', confederation: 'UEFA', keyPlayers: ['Granit Xhaka', 'Breel Embolo', 'Manuel Akanji'] },
  // Group C
  { id: 'BRA', name: 'Brazil', flag: '🇧🇷', group: 'C', confederation: 'CONMEBOL', keyPlayers: ['Vinícius Júnior', 'Rodrygo', 'Raphinha'] },
  { id: 'MAR', name: 'Morocco', flag: '🇲🇦', group: 'C', confederation: 'CAF', keyPlayers: ['Achraf Hakimi', 'Brahim Díaz', 'Yassine Bounou'] },
  { id: 'HAI', name: 'Haiti', flag: '🇭🇹', group: 'C', confederation: 'CONCACAF', keyPlayers: ['Duckens Nazon', 'Danley Jean Jacques', 'Frantzdy Pierrot'] },
  { id: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', confederation: 'UEFA', keyPlayers: ['Scott McTominay', 'Andy Robertson', 'John McGinn'] },
  // Group D
  { id: 'USA', name: 'United States', flag: '🇺🇸', group: 'D', confederation: 'CONCACAF', keyPlayers: ['Christian Pulisic', 'Weston McKennie', 'Folarin Balogun'] },
  { id: 'PAR', name: 'Paraguay', flag: '🇵🇾', group: 'D', confederation: 'CONMEBOL', keyPlayers: ['Miguel Almirón', 'Julio Enciso', 'Antonio Sanabria'] },
  { id: 'AUS', name: 'Australia', flag: '🇦🇺', group: 'D', confederation: 'AFC', keyPlayers: ['Mathew Ryan', 'Jackson Irvine', 'Craig Goodwin'] },
  { id: 'TUR', name: 'Türkiye', flag: '🇹🇷', group: 'D', confederation: 'UEFA', keyPlayers: ['Arda Güler', 'Hakan Çalhanoğlu', 'Kenan Yıldız'] },
  // Group E
  { id: 'GER', name: 'Germany', flag: '🇩🇪', group: 'E', confederation: 'UEFA', keyPlayers: ['Jamal Musiala', 'Florian Wirtz', 'Joshua Kimmich'] },
  { id: 'CUW', name: 'Curaçao', flag: '🇨🇼', group: 'E', confederation: 'CONCACAF', keyPlayers: ['Leandro Bacuna', 'Juninho Bacuna', 'Tahith Chong'] },
  { id: 'CIV', name: 'Ivory Coast', flag: '🇨🇮', group: 'E', confederation: 'CAF', keyPlayers: ['Franck Kessié', 'Sébastien Haller', 'Simon Adingra'] },
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨', group: 'E', confederation: 'CONMEBOL', keyPlayers: ['Moisés Caicedo', 'Piero Hincapié', 'Kendry Páez'] },
  // Group F
  { id: 'NED', name: 'Netherlands', flag: '🇳🇱', group: 'F', confederation: 'UEFA', keyPlayers: ['Virgil van Dijk', 'Frenkie de Jong', 'Cody Gakpo'] },
  { id: 'JPN', name: 'Japan', flag: '🇯🇵', group: 'F', confederation: 'AFC', keyPlayers: ['Takefusa Kubo', 'Kaoru Mitoma', 'Wataru Endo'] },
  { id: 'SWE', name: 'Sweden', flag: '🇸🇪', group: 'F', confederation: 'UEFA', keyPlayers: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski'] },
  { id: 'TUN', name: 'Tunisia', flag: '🇹🇳', group: 'F', confederation: 'CAF', keyPlayers: ['Hannibal Mejbri', 'Aïssa Laïdouni', 'Youssef Msakni'] },
  // Group G
  { id: 'BEL', name: 'Belgium', flag: '🇧🇪', group: 'G', confederation: 'UEFA', keyPlayers: ['Kevin De Bruyne', 'Jérémy Doku', 'Romelu Lukaku'] },
  { id: 'EGY', name: 'Egypt', flag: '🇪🇬', group: 'G', confederation: 'CAF', keyPlayers: ['Mohamed Salah', 'Omar Marmoush', 'Zizo'] },
  { id: 'IRN', name: 'Iran', flag: '🇮🇷', group: 'G', confederation: 'AFC', keyPlayers: ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh'] },
  { id: 'NZL', name: 'New Zealand', flag: '🇳🇿', group: 'G', confederation: 'OFC', keyPlayers: ['Chris Wood', 'Liberato Cacace', 'Marko Stamenić'] },
  // Group H
  { id: 'ESP', name: 'Spain', flag: '🇪🇸', group: 'H', confederation: 'UEFA', keyPlayers: ['Lamine Yamal', 'Pedri', 'Rodri'] },
  { id: 'CPV', name: 'Cape Verde', flag: '🇨🇻', group: 'H', confederation: 'CAF', keyPlayers: ['Ryan Mendes', 'Jamiro Monteiro', 'Bebé'] },
  { id: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦', group: 'H', confederation: 'AFC', keyPlayers: ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Mohammed Kanno'] },
  { id: 'URU', name: 'Uruguay', flag: '🇺🇾', group: 'H', confederation: 'CONMEBOL', keyPlayers: ['Federico Valverde', 'Darwin Núñez', 'Ronald Araújo'] },
  // Group I
  { id: 'FRA', name: 'France', flag: '🇫🇷', group: 'I', confederation: 'UEFA', keyPlayers: ['Kylian Mbappé', 'Ousmane Dembélé', 'Aurélien Tchouaméni'] },
  { id: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'I', confederation: 'CAF', keyPlayers: ['Sadio Mané', 'Nicolas Jackson', 'Pape Matar Sarr'] },
  { id: 'IRQ', name: 'Iraq', flag: '🇮🇶', group: 'I', confederation: 'AFC', keyPlayers: ['Aymen Hussein', 'Ali Jasim', 'Zidane Iqbal'] },
  { id: 'NOR', name: 'Norway', flag: '🇳🇴', group: 'I', confederation: 'UEFA', keyPlayers: ['Erling Haaland', 'Martin Ødegaard', 'Antonio Nusa'] },
  // Group J
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷', group: 'J', confederation: 'CONMEBOL', keyPlayers: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez'] },
  { id: 'ALG', name: 'Algeria', flag: '🇩🇿', group: 'J', confederation: 'CAF', keyPlayers: ['Riyad Mahrez', 'Amine Gouiri', 'Houssem Aouar'] },
  { id: 'AUT', name: 'Austria', flag: '🇦🇹', group: 'J', confederation: 'UEFA', keyPlayers: ['David Alaba', 'Marcel Sabitzer', 'Christoph Baumgartner'] },
  { id: 'JOR', name: 'Jordan', flag: '🇯🇴', group: 'J', confederation: 'AFC', keyPlayers: ['Mousa Tamari', 'Yazan Al-Naimat', 'Ali Olwan'] },
  // Group K
  { id: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'K', confederation: 'UEFA', keyPlayers: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão'] },
  { id: 'COL', name: 'Colombia', flag: '🇨🇴', group: 'K', confederation: 'CONMEBOL', keyPlayers: ['Luis Díaz', 'James Rodríguez', 'Jhon Durán'] },
  { id: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', group: 'K', confederation: 'AFC', keyPlayers: ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Abdukodir Khusanov'] },
  { id: 'COD', name: 'DR Congo', flag: '🇨🇩', group: 'K', confederation: 'CAF', keyPlayers: ['Cédric Bakambu', 'Yoane Wissa', 'Chancel Mbemba'] },
  // Group L
  { id: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', confederation: 'UEFA', keyPlayers: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka'] },
  { id: 'CRO', name: 'Croatia', flag: '🇭🇷', group: 'L', confederation: 'UEFA', keyPlayers: ['Luka Modrić', 'Joško Gvardiol', 'Andrej Kramarić'] },
  { id: 'GHA', name: 'Ghana', flag: '🇬🇭', group: 'L', confederation: 'CAF', keyPlayers: ['Mohammed Kudus', 'Thomas Partey', 'Antoine Semenyo'] },
  { id: 'PAN', name: 'Panama', flag: '🇵🇦', group: 'L', confederation: 'CONCACAF', keyPlayers: ['Adalberto Carrasquilla', 'José Fajardo', 'Michael Murillo'] },
];

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const teamById = (id: string): Team => teams.find((t) => t.id === id)!;
