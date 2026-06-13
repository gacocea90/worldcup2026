export default function HeaderBanner() {
  return (
    <svg
      viewBox="0 0 1200 300"
      className="block h-auto w-full"
      role="img"
      aria-label="World Cup 2026 — hosted in Canada, Mexico & USA"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#06122e" />
          <stop offset="0.45" stopColor="#0b327a" />
          <stop offset="0.78" stopColor="#0c5aa6" />
          <stop offset="1" stopColor="#0b7a5e" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4c0" />
          <stop offset="0.45" stopColor="#f4ca45" />
          <stop offset="1" stopColor="#bd8112" />
        </linearGradient>
        <linearGradient id="goldBar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7d774" />
          <stop offset="1" stopColor="#b9810f" />
        </linearGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#03101f" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* base */}
      <rect width="1200" height="300" fill="url(#bg)" />

      {/* diagonal light streaks */}
      <g opacity="0.12" fill="#ffffff">
        <polygon points="820,0 880,0 560,300 500,300" />
        <polygon points="900,0 930,0 640,300 610,300" />
        <polygon points="980,0 1000,0 720,300 700,300" />
      </g>

      {/* skyline silhouette */}
      <g fill="#040d22" opacity="0.55">
        <path d="M0,300 L0,232 L40,232 L40,210 L70,210 L70,246 L96,246 L96,196
                 L104,196 L100,168 L108,196 L116,196 L116,246 L150,246 L150,224
                 L182,224 L182,300 Z" />
        <path d="M250,300 L250,238 L300,206 L350,238 L350,260 L372,260 L372,236
                 L420,236 L420,300 Z" />
        <path d="M470,300 L470,250 L500,250 L500,228 L520,214 L540,228 L540,250
                 L590,250 L590,300 Z" />
        <path d="M900,300 L900,244 L944,244 L944,210 L956,196 L968,210 L968,244
                 L1020,244 L1020,224 L1060,224 L1060,300 Z" />
        <path d="M1090,300 L1090,236 L1130,236 L1130,212 L1160,212 L1160,250 L1200,250 L1200,300 Z" />
      </g>

      {/* gold geometric accents — top left */}
      <g>
        <polygon points="0,0 150,0 70,80 0,80" fill="url(#goldBar)" />
        <polygon points="0,96 120,96 64,150 0,150" fill="url(#goldBar)" opacity="0.85" />
        <rect x="0" y="166" width="86" height="10" fill="url(#goldBar)" opacity="0.7" />
        <rect x="0" y="184" width="56" height="8" fill="url(#goldBar)" opacity="0.5" />
      </g>
      {/* gold accents — top right */}
      <g>
        <polygon points="1200,0 1200,86 1120,86 1186,0" fill="url(#goldBar)" />
        <rect x="1150" y="104" width="50" height="9" fill="url(#goldBar)" opacity="0.7" />
      </g>

      {/* soccer motion arcs + ball, right side */}
      <g opacity="0.85">
        <circle cx="1058" cy="150" r="26" fill="#ffffff" />
        <path
          d="M1058 128 l9 7 -3 11 -12 0 -3 -11 z M1037 145 l8 6 M1079 145 l-8 6 M1047 168 l4 -9 M1069 168 l-4 -9"
          fill="none"
          stroke="#0b327a"
          strokeWidth="2.4"
        />
        <path d="M1010,196 q60,-46 120,-12" fill="none" stroke="url(#gold)" strokeWidth="3" opacity="0.7" />
      </g>

      {/* center vignette to lift the text */}
      <rect width="1200" height="300" fill="url(#vignette)" />

      {/* centered text */}
      <text
        x="600"
        y="150"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
        fontWeight="800"
        fontSize="92"
        letterSpacing="2"
        fill="url(#gold)"
        stroke="#7a5210"
        strokeWidth="1"
        filter="url(#ds)"
      >
        WORLD CUP 2026
      </text>
      <text
        x="600"
        y="200"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
        fontWeight="600"
        fontSize="26"
        letterSpacing="6"
        fill="#eaf2ff"
      >
        HOSTED IN CANADA · MEXICO &amp; USA
      </text>
      <rect x="500" y="218" width="200" height="3" rx="1.5" fill="url(#gold)" />
    </svg>
  );
}
