// Nationality stems used to verify an auto-resolved Wikipedia photo really
// belongs to the right player (avoids showing the wrong person for common names).
// Stems are matched as case-insensitive substrings against the page's intro,
// alongside the country name, so "argentin" covers Argentine/Argentinian, etc.
export const demonyms: Record<string, string> = {
  MEX: 'mexican', RSA: 'south african', KOR: 'korean', CZE: 'czech',
  CAN: 'canadian', BIH: 'bosnian', QAT: 'qatari', SUI: 'swiss',
  BRA: 'brazilian', MAR: 'moroccan', HAI: 'haitian', SCO: 'scottish',
  USA: 'american', PAR: 'paraguayan', AUS: 'australian', TUR: 'turkish',
  GER: 'german', CUW: 'curaçao', CIV: 'ivorian', ECU: 'ecuadorian',
  NED: 'dutch', JPN: 'japanese', SWE: 'swedish', TUN: 'tunisian',
  BEL: 'belgian', EGY: 'egyptian', IRN: 'iranian', NZL: 'new zealand',
  ESP: 'spanish', CPV: 'cape verdean', KSA: 'saudi', URU: 'uruguayan',
  FRA: 'french', SEN: 'senegalese', IRQ: 'iraqi', NOR: 'norwegian',
  ARG: 'argentin', ALG: 'algerian', AUT: 'austrian', JOR: 'jordanian',
  POR: 'portuguese', COL: 'colombian', UZB: 'uzbek', COD: 'congolese',
  ENG: 'english', CRO: 'croatian', GHA: 'ghanaian', PAN: 'panamanian',
};

export const demonym = (id: string): string => demonyms[id] ?? '';
