// Primary accent color per team — used for subtle identity accents on cards.
// National-team federation crests are trademarked with no clean public source,
// so we use each side's primary kit/flag color instead.
export const teamColors: Record<string, string> = {
  MEX: '#006847', RSA: '#007a4d', KOR: '#cd2e3a', CZE: '#11457e',
  CAN: '#d52b1e', BIH: '#002395', QAT: '#8d1b3d', SUI: '#d52b1e',
  BRA: '#009c3b', MAR: '#c1272d', HAI: '#00209f', SCO: '#0065bf',
  USA: '#0a3161', PAR: '#d52b1e', AUS: '#00843d', TUR: '#e30a17',
  GER: '#000000', CUW: '#00257d', CIV: '#f77f00', ECU: '#ffd100',
  NED: '#ae1c28', JPN: '#bc002d', SWE: '#005293', TUN: '#e70013',
  BEL: '#c8102e', EGY: '#ce1126', IRN: '#239f40', NZL: '#00247d',
  ESP: '#aa151b', CPV: '#003893', KSA: '#006c35', URU: '#0038a8',
  FRA: '#0055a4', SEN: '#00853f', IRQ: '#ce1126', NOR: '#ba0c2f',
  ARG: '#75aadb', ALG: '#006233', AUT: '#ed2939', JOR: '#007a3d',
  POR: '#c8102e', COL: '#fcd116', UZB: '#1eb53a', COD: '#007fff',
  ENG: '#cf081f', CRO: '#ff0000', GHA: '#006b3f', PAN: '#d21034',
};

export const teamColor = (id: string): string => teamColors[id] ?? '#64748b';
