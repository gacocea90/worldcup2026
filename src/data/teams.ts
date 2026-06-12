export interface Team {
  id: string;
  name: string;
  flag: string; // path to SVG under public/flags
  group: string;
  confederation: string;
  keyPlayers: string[];
}

export const teams: Team[] = [
  // Group A
  { id: 'MEX', name: 'Mexico', flag: '/flags/mx.svg', group: 'A', confederation: 'CONCACAF', keyPlayers: ['Raúl Jiménez', 'Edson Álvarez', 'Julián Quiñones'] },
  { id: 'RSA', name: 'South Africa', flag: '/flags/za.svg', group: 'A', confederation: 'CAF', keyPlayers: ['Percy Tau', 'Ronwen Williams', 'Themba Zwane'] },
  { id: 'KOR', name: 'South Korea', flag: '/flags/kr.svg', group: 'A', confederation: 'AFC', keyPlayers: ['Son Heung-min', 'Lee Kang-in', 'Kim Min-jae'] },
  { id: 'CZE', name: 'Czechia', flag: '/flags/cz.svg', group: 'A', confederation: 'UEFA', keyPlayers: ['Patrik Schick', 'Ladislav Krejčí', 'Tomáš Souček'] },
  // Group B
  { id: 'CAN', name: 'Canada', flag: '/flags/ca.svg', group: 'B', confederation: 'CONCACAF', keyPlayers: ['Alphonso Davies', 'Jonathan David', 'Stephen Eustáquio'] },
  { id: 'BIH', name: 'Bosnia & Herzegovina', flag: '/flags/ba.svg', group: 'B', confederation: 'UEFA', keyPlayers: ['Edin Džeko', 'Ermedin Demirović', 'Sead Kolašinac'] },
  { id: 'QAT', name: 'Qatar', flag: '/flags/qa.svg', group: 'B', confederation: 'AFC', keyPlayers: ['Akram Afif', 'Almoez Ali', 'Mohammed Muntari'] },
  { id: 'SUI', name: 'Switzerland', flag: '/flags/ch.svg', group: 'B', confederation: 'UEFA', keyPlayers: ['Granit Xhaka', 'Breel Embolo', 'Manuel Akanji'] },
  // Group C
  { id: 'BRA', name: 'Brazil', flag: '/flags/br.svg', group: 'C', confederation: 'CONMEBOL', keyPlayers: ['Vinícius Júnior', 'Rodrygo', 'Raphinha'] },
  { id: 'MAR', name: 'Morocco', flag: '/flags/ma.svg', group: 'C', confederation: 'CAF', keyPlayers: ['Achraf Hakimi', 'Brahim Díaz', 'Yassine Bounou'] },
  { id: 'HAI', name: 'Haiti', flag: '/flags/ht.svg', group: 'C', confederation: 'CONCACAF', keyPlayers: ['Duckens Nazon', 'Danley Jean Jacques', 'Frantzdy Pierrot'] },
  { id: 'SCO', name: 'Scotland', flag: '/flags/gb-sct.svg', group: 'C', confederation: 'UEFA', keyPlayers: ['Scott McTominay', 'Andy Robertson', 'John McGinn'] },
  // Group D
  { id: 'USA', name: 'United States', flag: '/flags/us.svg', group: 'D', confederation: 'CONCACAF', keyPlayers: ['Christian Pulisic', 'Weston McKennie', 'Folarin Balogun'] },
  { id: 'PAR', name: 'Paraguay', flag: '/flags/py.svg', group: 'D', confederation: 'CONMEBOL', keyPlayers: ['Miguel Almirón', 'Julio Enciso', 'Antonio Sanabria'] },
  { id: 'AUS', name: 'Australia', flag: '/flags/au.svg', group: 'D', confederation: 'AFC', keyPlayers: ['Mathew Ryan', 'Jackson Irvine', 'Craig Goodwin'] },
  { id: 'TUR', name: 'Türkiye', flag: '/flags/tr.svg', group: 'D', confederation: 'UEFA', keyPlayers: ['Arda Güler', 'Hakan Çalhanoğlu', 'Kenan Yıldız'] },
  // Group E
  { id: 'GER', name: 'Germany', flag: '/flags/de.svg', group: 'E', confederation: 'UEFA', keyPlayers: ['Jamal Musiala', 'Florian Wirtz', 'Joshua Kimmich'] },
  { id: 'CUW', name: 'Curaçao', flag: '/flags/cw.svg', group: 'E', confederation: 'CONCACAF', keyPlayers: ['Leandro Bacuna', 'Juninho Bacuna', 'Tahith Chong'] },
  { id: 'CIV', name: 'Ivory Coast', flag: '/flags/ci.svg', group: 'E', confederation: 'CAF', keyPlayers: ['Franck Kessié', 'Sébastien Haller', 'Simon Adingra'] },
  { id: 'ECU', name: 'Ecuador', flag: '/flags/ec.svg', group: 'E', confederation: 'CONMEBOL', keyPlayers: ['Moisés Caicedo', 'Piero Hincapié', 'Kendry Páez'] },
  // Group F
  { id: 'NED', name: 'Netherlands', flag: '/flags/nl.svg', group: 'F', confederation: 'UEFA', keyPlayers: ['Virgil van Dijk', 'Frenkie de Jong', 'Cody Gakpo'] },
  { id: 'JPN', name: 'Japan', flag: '/flags/jp.svg', group: 'F', confederation: 'AFC', keyPlayers: ['Takefusa Kubo', 'Kaoru Mitoma', 'Wataru Endo'] },
  { id: 'SWE', name: 'Sweden', flag: '/flags/se.svg', group: 'F', confederation: 'UEFA', keyPlayers: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski'] },
  { id: 'TUN', name: 'Tunisia', flag: '/flags/tn.svg', group: 'F', confederation: 'CAF', keyPlayers: ['Hannibal Mejbri', 'Aïssa Laïdouni', 'Youssef Msakni'] },
  // Group G
  { id: 'BEL', name: 'Belgium', flag: '/flags/be.svg', group: 'G', confederation: 'UEFA', keyPlayers: ['Kevin De Bruyne', 'Jérémy Doku', 'Romelu Lukaku'] },
  { id: 'EGY', name: 'Egypt', flag: '/flags/eg.svg', group: 'G', confederation: 'CAF', keyPlayers: ['Mohamed Salah', 'Omar Marmoush', 'Zizo'] },
  { id: 'IRN', name: 'Iran', flag: '/flags/ir.svg', group: 'G', confederation: 'AFC', keyPlayers: ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh'] },
  { id: 'NZL', name: 'New Zealand', flag: '/flags/nz.svg', group: 'G', confederation: 'OFC', keyPlayers: ['Chris Wood', 'Liberato Cacace', 'Marko Stamenić'] },
  // Group H
  { id: 'ESP', name: 'Spain', flag: '/flags/es.svg', group: 'H', confederation: 'UEFA', keyPlayers: ['Lamine Yamal', 'Pedri', 'Rodri'] },
  { id: 'CPV', name: 'Cape Verde', flag: '/flags/cv.svg', group: 'H', confederation: 'CAF', keyPlayers: ['Ryan Mendes', 'Jamiro Monteiro', 'Bebé'] },
  { id: 'KSA', name: 'Saudi Arabia', flag: '/flags/sa.svg', group: 'H', confederation: 'AFC', keyPlayers: ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Mohammed Kanno'] },
  { id: 'URU', name: 'Uruguay', flag: '/flags/uy.svg', group: 'H', confederation: 'CONMEBOL', keyPlayers: ['Federico Valverde', 'Darwin Núñez', 'Ronald Araújo'] },
  // Group I
  { id: 'FRA', name: 'France', flag: '/flags/fr.svg', group: 'I', confederation: 'UEFA', keyPlayers: ['Kylian Mbappé', 'Ousmane Dembélé', 'Aurélien Tchouaméni'] },
  { id: 'SEN', name: 'Senegal', flag: '/flags/sn.svg', group: 'I', confederation: 'CAF', keyPlayers: ['Sadio Mané', 'Nicolas Jackson', 'Pape Matar Sarr'] },
  { id: 'IRQ', name: 'Iraq', flag: '/flags/iq.svg', group: 'I', confederation: 'AFC', keyPlayers: ['Aymen Hussein', 'Ali Jasim', 'Zidane Iqbal'] },
  { id: 'NOR', name: 'Norway', flag: '/flags/no.svg', group: 'I', confederation: 'UEFA', keyPlayers: ['Erling Haaland', 'Martin Ødegaard', 'Antonio Nusa'] },
  // Group J
  { id: 'ARG', name: 'Argentina', flag: '/flags/ar.svg', group: 'J', confederation: 'CONMEBOL', keyPlayers: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez'] },
  { id: 'ALG', name: 'Algeria', flag: '/flags/dz.svg', group: 'J', confederation: 'CAF', keyPlayers: ['Riyad Mahrez', 'Amine Gouiri', 'Houssem Aouar'] },
  { id: 'AUT', name: 'Austria', flag: '/flags/at.svg', group: 'J', confederation: 'UEFA', keyPlayers: ['David Alaba', 'Marcel Sabitzer', 'Christoph Baumgartner'] },
  { id: 'JOR', name: 'Jordan', flag: '/flags/jo.svg', group: 'J', confederation: 'AFC', keyPlayers: ['Mousa Tamari', 'Yazan Al-Naimat', 'Ali Olwan'] },
  // Group K
  { id: 'POR', name: 'Portugal', flag: '/flags/pt.svg', group: 'K', confederation: 'UEFA', keyPlayers: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão'] },
  { id: 'COL', name: 'Colombia', flag: '/flags/co.svg', group: 'K', confederation: 'CONMEBOL', keyPlayers: ['Luis Díaz', 'James Rodríguez', 'Jhon Durán'] },
  { id: 'UZB', name: 'Uzbekistan', flag: '/flags/uz.svg', group: 'K', confederation: 'AFC', keyPlayers: ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Abdukodir Khusanov'] },
  { id: 'COD', name: 'DR Congo', flag: '/flags/cd.svg', group: 'K', confederation: 'CAF', keyPlayers: ['Cédric Bakambu', 'Yoane Wissa', 'Chancel Mbemba'] },
  // Group L
  { id: 'ENG', name: 'England', flag: '/flags/gb-eng.svg', group: 'L', confederation: 'UEFA', keyPlayers: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka'] },
  { id: 'CRO', name: 'Croatia', flag: '/flags/hr.svg', group: 'L', confederation: 'UEFA', keyPlayers: ['Luka Modrić', 'Joško Gvardiol', 'Andrej Kramarić'] },
  { id: 'GHA', name: 'Ghana', flag: '/flags/gh.svg', group: 'L', confederation: 'CAF', keyPlayers: ['Mohammed Kudus', 'Thomas Partey', 'Antoine Semenyo'] },
  { id: 'PAN', name: 'Panama', flag: '/flags/pa.svg', group: 'L', confederation: 'CONCACAF', keyPlayers: ['Adalberto Carrasquilla', 'José Fajardo', 'Michael Murillo'] },
];

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const teamById = (id: string): Team => teams.find((t) => t.id === id)!;
