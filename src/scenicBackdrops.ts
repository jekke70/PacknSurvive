/**
 * Scenic SVG Backdrops for Crazy Camper: Packa & Överlev
 * 100% offline, deterministic vector illustrations for all 60 destinations.
 * Includes dynamic weather mood transitions (rain, storm, sun, snow, fire, night).
 */

export interface ScenicMeta {
  themeId: string;
  label: string;
  icon: string;
  defaultMood: string;
  palette: {
    skyTop: string;
    skyBottom: string;
    accent: string;
    terrain: string;
  };
}

export interface WeatherMoodInfo {
  mood: 'default' | 'rain' | 'storm' | 'sun' | 'snow' | 'fire' | 'night';
  label: string;
  icon: string;
}

// Map every destination ID to its bespoke theme identifier
const DESTINATION_THEME_MAP: Record<string, string> = {
  // 10 Lätta banor (Sverige & Danmark)
  oland: 'oland',
  gotland: 'gotland',
  skane: 'skane',
  bohuslan: 'bohuslan',
  halland: 'halland',
  smaland: 'smaland',
  siljan: 'siljan',
  bornholm: 'bornholm',
  skagen: 'skagen',
  vattern: 'vattern',

  // 10 Medelsvåra banor (Norden & Nordeuropa)
  dalsland: 'dalsland',
  hogakusten: 'hogakusten',
  jamtland: 'jamtland',
  fulufjallet: 'fulufjallet',
  hardangervidda: 'hardangervidda',
  saimen: 'saimen',
  ostsee: 'ostsee',
  rugen: 'rugen',
  harz: 'harz',
  ardennes: 'ardennes',

  // 20 Svåra / Expert Pro-banor (Europa & Extremväder)
  lofoten: 'lofoten',
  alps: 'alps',
  highlands: 'highlands',
  iceland: 'iceland',
  pyrenees: 'pyrenees',
  dolomites: 'dolomites',
  lappland: 'lappland',
  nordkap: 'nordkap',
  transylvania: 'transylvania',
  corsica: 'corsica',
  faroe: 'faroe',
  tatras: 'tatras',
  swissalps: 'swissalps',
  picos: 'picos',
  julianalps: 'julianalps',
  durmitor: 'durmitor',
  senja: 'senja',
  wildatlantic: 'wildatlantic',
  sardinia: 'sardinia',
  inari: 'inari',

  // 20 Legendariska & Påhittade Resmål (Hemlig 4:e nivå)
  high_chaparral: 'high_chaparral',
  hogwarts: 'hogwarts',
  jurassic_park: 'jurassic_park',
  mordor: 'mordor',
  north_pole: 'north_pole',
  area_51: 'area_51',
  sherwood: 'sherwood',
  atlantis: 'atlantis',
  moon_base: 'moon_base',
  wild_west_town: 'wild_west_town',
  narnia: 'narnia',
  neverland: 'neverland',
  el_dorado: 'el_dorado',
  bermuda_triangle: 'bermuda_triangle',
  dracula_castle: 'dracula_castle',
  nangijala: 'nangijala',
  mars_colony: 'mars_colony',
  pirate_cove: 'pirate_cove',
  mount_olympus: 'mount_olympus',
  cyberpunk_2099: 'cyberpunk_2099',
};

// Helper to wrap SVG with standard viewBox and attributes
function wrapSvg(id: string, defs: string, content: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" class="scenic-svg scenic-${id}" aria-hidden="true"><defs>${defs}</defs>${content}</svg>`;
}

/**
 * Returns metadata for a given destination (labels, icon, base mood)
 */
export function getScenicMeta(dest: { id: string; name?: string; tier?: string }): ScenicMeta {
  const theme = DESTINATION_THEME_MAP[dest.id] || 'smaland';

  // Specific bespoke metadata
  const METAS: Record<string, ScenicMeta> = {
    // Legendary destinations
    high_chaparral: {
      themeId: 'high_chaparral',
      label: 'High Chaparral · Vilda Västern',
      icon: '🤠',
      defaultMood: 'sunset',
      palette: { skyTop: '#993d14', skyBottom: '#f59e0b', accent: '#fbbf24', terrain: '#78350f' },
    },
    hogwarts: {
      themeId: 'hogwarts',
      label: 'Hogwarts & Förbjudna skogen',
      icon: '🪄',
      defaultMood: 'night',
      palette: { skyTop: '#0c0e23', skyBottom: '#271f49', accent: '#a78bfa', terrain: '#141724' },
    },
    jurassic_park: {
      themeId: 'jurassic_park',
      label: 'Jurassic Park · Isla Nublar',
      icon: '🦖',
      defaultMood: 'sunset',
      palette: { skyTop: '#064e3b', skyBottom: '#d97706', accent: '#10b981', terrain: '#062c1d' },
    },
    mordor: {
      themeId: 'mordor',
      label: 'Mordor & Domedagsberget',
      icon: '🌋',
      defaultMood: 'fire',
      palette: { skyTop: '#1a0505', skyBottom: '#7f1d1d', accent: '#ef4444', terrain: '#120b0b' },
    },
    north_pole: {
      themeId: 'north_pole',
      label: 'Tomtens verkstad · Nordpolen',
      icon: '🎅',
      defaultMood: 'snow',
      palette: { skyTop: '#071626', skyBottom: '#13354c', accent: '#34d399', terrain: '#dbeafe' },
    },
    area_51: {
      themeId: 'area_51',
      label: 'Area 51 · Nevadaöknen',
      icon: '🛸',
      defaultMood: 'night',
      palette: { skyTop: '#05111a', skyBottom: '#102e3b', accent: '#10b981', terrain: '#1e293b' },
    },
    sherwood: {
      themeId: 'sherwood',
      label: 'Sherwoodskogen · Major Oak',
      icon: '🏹',
      defaultMood: 'day',
      palette: { skyTop: '#164e63', skyBottom: '#a7f3d0', accent: '#10b981', terrain: '#14532d' },
    },
    atlantis: {
      themeId: 'atlantis',
      label: 'Sjunkna Atlantis · Kristallkupolen',
      icon: '🔱',
      defaultMood: 'ocean',
      palette: { skyTop: '#082f49', skyBottom: '#0e7490', accent: '#38bdf8', terrain: '#042f2e' },
    },
    moon_base: {
      themeId: 'moon_base',
      label: 'Månbasen Tranquility · Earthrise',
      icon: '🚀',
      defaultMood: 'night',
      palette: { skyTop: '#020617', skyBottom: '#0f172a', accent: '#60a5fa', terrain: '#334155' },
    },
    wild_west_town: {
      themeId: 'wild_west_town',
      label: 'Wild West Town · Guldrush-dalen',
      icon: '⛏️',
      defaultMood: 'sunset',
      palette: { skyTop: '#854d0e', skyBottom: '#f59e0b', accent: '#fde047', terrain: '#451a03' },
    },
    narnia: {
      themeId: 'narnia',
      label: 'Narnia · Lyktstolpen i skogen',
      icon: '🧥',
      defaultMood: 'snow',
      palette: { skyTop: '#1e1b4b', skyBottom: '#4338ca', accent: '#fef08a', terrain: '#e0e7ff' },
    },
    neverland: {
      themeId: 'neverland',
      label: 'Landet Ingenstans · Dödskalleklippan',
      icon: '🧚',
      defaultMood: 'sunset',
      palette: { skyTop: '#311042', skyBottom: '#c026d3', accent: '#fef08a', terrain: '#0f172a' },
    },
    el_dorado: {
      themeId: 'el_dorado',
      label: 'El Dorado · Guldpyramiden',
      icon: '🏺',
      defaultMood: 'sun',
      palette: { skyTop: '#713f12', skyBottom: '#eab308', accent: '#facc15', terrain: '#14532d' },
    },
    bermuda_triangle: {
      themeId: 'bermuda_triangle',
      label: 'Bermudatriangeln · Spökskeppets vik',
      icon: '🚢',
      defaultMood: 'storm',
      palette: { skyTop: '#022c22', skyBottom: '#064e3b', accent: '#34d399', terrain: '#021814' },
    },
    dracula_castle: {
      themeId: 'dracula_castle',
      label: 'Draculas slott · Karpaterna',
      icon: '🦇',
      defaultMood: 'night',
      palette: { skyTop: '#180e29', skyBottom: '#3b1d5c', accent: '#e879f9', terrain: '#0f0a17' },
    },
    nangijala: {
      themeId: 'nangijala',
      label: 'Körsbärsdalen · Nangijala',
      icon: '🌸',
      defaultMood: 'day',
      palette: { skyTop: '#4338ca', skyBottom: '#fbcfe8', accent: '#f472b6', terrain: '#15803d' },
    },
    mars_colony: {
      themeId: 'mars_colony',
      label: 'Marskolonin · Olympus Mons',
      icon: '🔴',
      defaultMood: 'desert',
      palette: { skyTop: '#451a03', skyBottom: '#9a3412', accent: '#f97316', terrain: '#7c2d12' },
    },
    pirate_cove: {
      themeId: 'pirate_cove',
      label: 'Tortuga & Skattkammarön',
      icon: '🏝️',
      defaultMood: 'sunset',
      palette: { skyTop: '#1e3a8a', skyBottom: '#fb923c', accent: '#fde047', terrain: '#042f2e' },
    },
    mount_olympus: {
      themeId: 'mount_olympus',
      label: 'Gudarnas berg · Olympen',
      icon: '⚡',
      defaultMood: 'sun',
      palette: { skyTop: '#1e3a8a', skyBottom: '#93c5fd', accent: '#facc15', terrain: '#ffffff' },
    },
    cyberpunk_2099: {
      themeId: 'cyberpunk_2099',
      label: 'Neon City 2099 · Takställplatsen',
      icon: '🌆',
      defaultMood: 'night',
      palette: { skyTop: '#09090b', skyBottom: '#18181b', accent: '#f43f5e', terrain: '#020617' },
    },

    // Selected iconic Scandinavian & European destinations
    oland: {
      themeId: 'oland',
      label: 'Helg på Öland · Alvar & Fyr',
      icon: '🌊',
      defaultMood: 'day',
      palette: { skyTop: '#1e3a8a', skyBottom: '#bfdbfe', accent: '#f59e0b', terrain: '#2e4f3a' },
    },
    gotland: {
      themeId: 'gotland',
      label: 'Gotland · Kust & Raukar',
      icon: '🪨',
      defaultMood: 'day',
      palette: { skyTop: '#1e40af', skyBottom: '#bae6fd', accent: '#e0f2fe', terrain: '#374151' },
    },
    bohuslan: {
      themeId: 'bohuslan',
      label: 'Bohuslän · Granit & Sjöbodar',
      icon: '🦀',
      defaultMood: 'day',
      palette: { skyTop: '#0369a1', skyBottom: '#e0f2fe', accent: '#ef4444', terrain: '#9a3412' },
    },
    skane: {
      themeId: 'skane',
      label: 'Österlen · Böljande fält & hav',
      icon: '🌾',
      defaultMood: 'day',
      palette: { skyTop: '#1d4ed8', skyBottom: '#fef08a', accent: '#ca8a04', terrain: '#4d7c0f' },
    },
    smaland: {
      themeId: 'smaland',
      label: 'Småland · Djupa skogar & sjö',
      icon: '🌲',
      defaultMood: 'day',
      palette: { skyTop: '#1e3a5f', skyBottom: '#d1fae5', accent: '#ef4444', terrain: '#14532d' },
    },
    siljan: {
      themeId: 'siljan',
      label: 'Siljan i Dalarna · Kyrkspira & sjö',
      icon: '⛵',
      defaultMood: 'day',
      palette: { skyTop: '#1e3a5f', skyBottom: '#e0f2fe', accent: '#b91c1c', terrain: '#166534' },
    },
    skagen: {
      themeId: 'skagen',
      label: 'Skagen · Grenen & Sanddyner',
      icon: '🏖️',
      defaultMood: 'day',
      palette: { skyTop: '#0284c7', skyBottom: '#fef3c7', accent: '#f59e0b', terrain: '#d97706' },
    },
    alps: {
      themeId: 'alps',
      label: 'Alperna · Snöklädda bergstoppar',
      icon: '🏔️',
      defaultMood: 'winter',
      palette: { skyTop: '#0369a1', skyBottom: '#e0f2fe', accent: '#38bdf8', terrain: '#f8fafc' },
    },
    lofoten: {
      themeId: 'lofoten',
      label: 'Lofoten · Fjord & Röda rorbuer',
      icon: '⛰️',
      defaultMood: 'day',
      palette: { skyTop: '#0f172a', skyBottom: '#38bdf8', accent: '#ef4444', terrain: '#1e293b' },
    },
    highlands: {
      themeId: 'highlands',
      label: 'Skotska högländerna · Loch & hed',
      icon: '🏰',
      defaultMood: 'day',
      palette: { skyTop: '#334155', skyBottom: '#94a3b8', accent: '#10b981', terrain: '#1e3a2f' },
    },
    iceland: {
      themeId: 'iceland',
      label: 'Island · Gejser & Svart lavasand',
      icon: '🧊',
      defaultMood: 'winter',
      palette: { skyTop: '#0f172a', skyBottom: '#475569', accent: '#38bdf8', terrain: '#09090b' },
    },
    sardinia: {
      themeId: 'sardinia',
      label: 'Sardinien · Vikar & Medelhavssol',
      icon: '☀️',
      defaultMood: 'sun',
      palette: { skyTop: '#0284c7', skyBottom: '#fef08a', accent: '#06b6d4', terrain: '#78350f' },
    },
    lappland: {
      themeId: 'lappland',
      label: 'Lappland · Norrsken & Snötaiga',
      icon: '🌌',
      defaultMood: 'night',
      palette: { skyTop: '#020617', skyBottom: '#064e3b', accent: '#34d399', terrain: '#e2e8f0' },
    },
  };

  if (METAS[theme]) return METAS[theme];

  // Fallback archetypes based on region or tier
  const reg = (dest.name || '') + ' ' + (dest.tier || '');
  if (reg.includes('fjäll') || reg.includes('alper') || reg.includes('berg')) {
    return {
      themeId: 'alps',
      label: `${dest.name || 'Fjäll'} · Snö & Berg`,
      icon: '🏔️',
      defaultMood: 'day',
      palette: { skyTop: '#0284c7', skyBottom: '#bae6fd', accent: '#38bdf8', terrain: '#334155' },
    };
  }
  if (reg.includes('kust') || reg.includes('ö') || reg.includes('hav')) {
    return {
      themeId: 'oland',
      label: `${dest.name || 'Kust'} · Klippor & Hav`,
      icon: '🌊',
      defaultMood: 'day',
      palette: { skyTop: '#1e40af', skyBottom: '#e0f2fe', accent: '#f59e0b', terrain: '#1e3a2f' },
    };
  }
  return {
    themeId: 'smaland',
    label: `${dest.name || 'Natur'} · Skog & Sjö`,
    icon: '🌲',
    defaultMood: 'day',
    palette: { skyTop: '#1e3a5f', skyBottom: '#d1fae5', accent: '#ef4444', terrain: '#14532d' },
  };
}

/**
 * Analyzes event description / title / icon to detect real-time weather mood shifts
 */
export function getEventWeatherMood(event: { icon?: string; title?: string; desc?: string }): WeatherMoodInfo {
  const text = `${event.icon || ''} ${event.title || ''} ${event.desc || ''}`.toLowerCase();

  if (
    text.includes('storm') ||
    text.includes('kuling') ||
    text.includes('orkan') ||
    text.includes('tyfon') ||
    text.includes('cyklon') ||
    text.includes('åska') ||
    text.includes('blixt') ||
    text.includes('💨') ||
    text.includes('⛈️') ||
    text.includes('🌪️') ||
    text.includes('🌀')
  ) {
    return { mood: 'storm', label: 'Hård storm & piskande vindbyar', icon: '⛈️' };
  }

  if (
    text.includes('regn') ||
    text.includes('skur') ||
    text.includes('ösregn') ||
    text.includes('sidoregn') ||
    text.includes('monsun') ||
    text.includes('fukt') ||
    text.includes('blöt') ||
    text.includes('🌧️') ||
    text.includes('🌦️') ||
    text.includes('☔')
  ) {
    return { mood: 'rain', label: 'Ihållande regnväder & rusk', icon: '🌧️' };
  }

  if (
    text.includes('snö') ||
    text.includes('kyla') ||
    text.includes('is') ||
    text.includes('frost') ||
    text.includes('polarkyla') ||
    text.includes('-40') ||
    text.includes('-70') ||
    text.includes('-130') ||
    text.includes('glaciär') ||
    text.includes('vinter') ||
    text.includes('blizzard') ||
    text.includes('❄️') ||
    text.includes('🥶') ||
    text.includes('🧊') ||
    text.includes('🌨️')
  ) {
    return { mood: 'snow', label: 'Isande polarkyla & snödrev', icon: '❄️' };
  }

  if (
    text.includes('sol') ||
    text.includes('hetta') ||
    text.includes('torka') ||
    text.includes('stekande') ||
    text.includes('45 grader') ||
    text.includes('öken') ||
    text.includes('värmebölja') ||
    text.includes('☀️') ||
    text.includes('🌵') ||
    text.includes('🌅') ||
    text.includes('🏜️')
  ) {
    return { mood: 'sun', label: 'Stekande sol & värmebölja', icon: '☀️' };
  }

  if (
    text.includes('vulkan') ||
    text.includes('lava') ||
    text.includes('aska') ||
    text.includes('eld') ||
    text.includes('brand') ||
    text.includes('glöd') ||
    text.includes('katla') ||
    text.includes('domedagsberget') ||
    text.includes('krutrök') ||
    text.includes('🌋') ||
    text.includes('🔥')
  ) {
    return { mood: 'fire', label: 'Vulkanisk glöd & svavelrök', icon: '🌋' };
  }

  if (
    text.includes('natt') ||
    text.includes('mörker') ||
    text.includes('dementor') ||
    text.includes('spöke') ||
    text.includes('dracula') ||
    text.includes('fladdermus') ||
    text.includes('dimma') ||
    text.includes('ufo') ||
    text.includes('alien') ||
    text.includes('krypta') ||
    text.includes('månsken') ||
    text.includes('bäckmörk') ||
    text.includes('👻') ||
    text.includes('🦇') ||
    text.includes('🌙') ||
    text.includes('🌑') ||
    text.includes('🌌') ||
    text.includes('🛸')
  ) {
    return { mood: 'night', label: 'Mörk natt & spöklik dimma', icon: '🌙' };
  }

  return { mood: 'default', label: 'Klart väder & god sikt', icon: '🌤️' };
}

// ==========================================
// BESPOKE SVG LANDSCAPE GENERATOR FUNCTIONS
// ==========================================

function drawHighChaparral(): string {
  const defs = `
    <linearGradient id="hc-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="35%" stop-color="#9a3412"/>
      <stop offset="65%" stop-color="#ea580c"/>
      <stop offset="90%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </linearGradient>
    <linearGradient id="hc-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#271105"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#hc-sky)"/>
    <!-- Blazing Desert Sun -->
    <circle cx="480" cy="150" r="75" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 30px #f59e0b)"/>
    <!-- Distant Red Mesa Plateaus -->
    <polygon points="0,240 70,200 170,200 240,240 340,210 460,210 520,245 680,210 780,210 800,225 800,450 0,450" fill="#782305"/>
    <polygon points="0,270 120,240 260,240 380,275 520,245 660,245 800,275 800,450 0,450" fill="#521703"/>
    <!-- Desert Floor -->
    <path d="M0 310 Q400 280 800 310 L800 450 L0 450 Z" fill="url(#hc-sand)"/>
    <!-- Vintage Steam Train Puffing Smoke on horizon -->
    <rect x="440" y="270" width="85" height="24" fill="#0f0f0f"/>
    <rect x="500" y="255" width="20" height="15" fill="#0f0f0f"/>
    <rect x="450" y="250" width="12" height="20" fill="#0f0f0f"/>
    <circle cx="456" cy="240" r="10" fill="#ffffff" opacity="0.8"/>
    <circle cx="445" cy="225" r="16" fill="#ffffff" opacity="0.6"/>
    <circle cx="430" cy="208" r="22" fill="#ffffff" opacity="0.4"/>
    <!-- Western Town Saloon Building on Left -->
    <rect x="10" y="150" width="165" height="210" fill="#2e1408" stroke="#170802" stroke-width="2"/>
    <polygon points="0,150 92,105 185,150" fill="#1f0b03"/>
    <rect x="22" y="160" width="140" height="34" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="92" y="184" font-size="16" font-weight="900" fill="#fde047" text-anchor="middle" font-family="serif" letter-spacing="2">★ SALOON ★</text>
    <rect x="25" y="210" width="30" height="40" rx="3" fill="#fde047" opacity="0.95"/>
    <rect x="120" y="210" width="30" height="40" rx="3" fill="#fde047" opacity="0.95"/>
    <rect x="68" y="270" width="38" height="90" fill="#170802"/>
    <line x1="87" y1="270" x2="87" y2="360" stroke="#451a03" stroke-width="2"/>
    <rect x="10" y="280" width="165" height="8" fill="#451a03"/>
    <!-- Giant Saguaro Cactus on Right Flank -->
    <path d="
      M710 450 L710 140 A16 16 0 0 1 742 140 L742 450 Z
      M670 260 L670 210 A12 12 0 0 1 694 210 L694 280 L710 280 L710 304 L690 304 A12 12 0 0 1 670 280 Z
      M742 250 L762 250 A12 12 0 0 1 784 270 L784 200 A12 12 0 0 1 800 200 L800 290 A16 16 0 0 1 768 290 L742 290 Z
    " fill="#064e3b" stroke="#022c22" stroke-width="2"/>
    <!-- Medium Cactus on Left -->
    <path d="M190 410 L190 290 A10 10 0 0 1 210 290 L210 410 Z M175 350 L175 320 A8 8 0 0 1 190 320 L190 365 Z" fill="#064e3b" stroke="#022c22" stroke-width="1.5"/>
    <!-- Rolling Tumbleweeds -->
    <circle cx="620" cy="385" r="16" fill="none" stroke="#78350f" stroke-width="2.5" stroke-dasharray="5,3"/>
    <circle cx="270" cy="405" r="12" fill="none" stroke="#78350f" stroke-width="2" stroke-dasharray="4,3"/>
  `;
  return wrapSvg('high_chaparral', defs, content);
}

function drawHogwarts(): string {
  const defs = `
    <linearGradient id="hw-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020410"/>
      <stop offset="40%" stop-color="#0f0c29"/>
      <stop offset="80%" stop-color="#241442"/>
      <stop offset="100%" stop-color="#110726"/>
    </linearGradient>
    <radialGradient id="hw-moon" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#ede9fe"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </radialGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#hw-sky)"/>
    <!-- Brilliant Starfield -->
    <g fill="#ffffff">
      <circle cx="60" cy="50" r="1.5"/><circle cx="120" cy="80" r="1"/><circle cx="180" cy="35" r="2"/>
      <circle cx="260" cy="90" r="1.2"/><circle cx="340" cy="40" r="1.5"/><circle cx="430" cy="70" r="1.8"/>
      <circle cx="510" cy="30" r="1.5"/><circle cx="730" cy="50" r="2"/><circle cx="770" cy="110" r="1.2"/>
      <circle cx="150" cy="130" r="1"/><circle cx="700" cy="90" r="1.5"/>
    </g>
    <!-- Giant Glowing Full Moon with Magic Lavender Aura -->
    <circle cx="630" cy="110" r="68" fill="url(#hw-moon)" filter="drop-shadow(0 0 35px #a78bfa)"/>
    <circle cx="612" cy="95" r="11" fill="#ddd6fe" opacity="0.45"/>
    <circle cx="645" cy="125" r="16" fill="#ddd6fe" opacity="0.4"/>
    <circle cx="620" cy="135" r="8" fill="#ddd6fe" opacity="0.35"/>
    <!-- Flying Hedwig the Owl across the sky -->
    <path d="M530 100 Q545 88 560 98 Q550 108 530 100 Q515 88 500 98 Q515 108 530 100 Z" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)"/>
    <!-- Mountain Ridges behind Castle -->
    <path d="M0 240 Q200 170 400 220 T800 200 L800 450 L0 450 Z" fill="#090514"/>
    <!-- Towering Hogwarts Gothic Castle Silhouette -->
    <path d="
      M180 340 L180 200 L195 120 L210 200 L230 200 L230 160 L245 80 L260 160 L280 160 L280 230
      L310 230 L310 140 L325 50 L340 140 L370 140 L370 240 L400 240 L400 180 L415 110 L430 180
      L450 180 L450 250 L480 250 L480 190 L492 130 L505 190 L530 190 L530 340 Z
    " fill="#04020a" stroke="#4c1d95" stroke-width="1"/>
    <!-- Spire Turret Cones & Flagpole -->
    <line x1="325" y1="50" x2="325" y2="28" stroke="#fde047" stroke-width="2"/>
    <polygon points="325,28 340,34 325,40" fill="#fde047"/>
    <!-- Glowing Castle Windows & Great Hall Lights -->
    <rect x="200" y="210" width="8" height="16" rx="4" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)"/>
    <rect x="245" y="180" width="8" height="18" rx="4" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)"/>
    <rect x="325" y="160" width="10" height="22" rx="5" fill="#fde047" filter="drop-shadow(0 0 8px #fde047)"/>
    <rect x="415" y="200" width="8" height="16" rx="4" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)"/>
    <rect x="490" y="220" width="8" height="16" rx="4" fill="#fde047" filter="drop-shadow(0 0 6px #fde047)"/>
    <!-- Great Hall Stained-Glass Arches -->
    <g fill="#fde047" opacity="0.9">
      <rect x="355" y="255" width="6" height="18" rx="3"/>
      <rect x="368" y="255" width="6" height="18" rx="3"/>
      <rect x="381" y="255" width="6" height="18" rx="3"/>
      <rect x="394" y="255" width="6" height="18" rx="3"/>
    </g>
    <!-- Black Lake (Svarta sjön) -->
    <rect y="330" width="800" height="120" fill="#030208"/>
    <!-- Moon & Castle Reflections on Water -->
    <ellipse cx="630" cy="370" rx="45" ry="8" fill="#a78bfa" opacity="0.4"/>
    <ellipse cx="630" cy="395" rx="30" ry="5" fill="#c4b5fd" opacity="0.3"/>
    <ellipse cx="330" cy="375" rx="40" ry="4" fill="#fde047" opacity="0.3"/>
    <!-- Forbidden Forest Ancient Pines on Left & Right Flanks -->
    <path d="M0 450 L0 240 L30 280 L30 200 L65 260 L65 140 L100 230 L100 80 L140 210 L140 450 Z" fill="#020105"/>
    <path d="M660 450 L660 220 L700 130 L700 230 L740 170 L740 260 L770 190 L770 280 L800 210 L800 450 Z" fill="#020105"/>
  `;
  return wrapSvg('hogwarts', defs, content);
}

function drawJurassicPark(): string {
  const defs = `
    <linearGradient id="jp-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="40%" stop-color="#047857"/>
      <stop offset="75%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#jp-sky)"/>
    <circle cx="400" cy="240" r="65" fill="#fef08a" opacity="0.6"/>
    <!-- Isla Nublar Volcanic Peak -->
    <polygon points="120,320 280,140 340,190 420,120 560,320" fill="#062e21" opacity="0.85"/>
    <path d="M0 320 Q400 260 800 320 L800 450 L0 450 Z" fill="#022116"/>
    <!-- Pteranodon in sky -->
    <path d="M480 90 L510 75 L500 95 L530 90 L495 102 Z" fill="#021a11" opacity="0.8"/>
    <!-- Jurassic Park Iconic Gate on Left -->
    <rect x="50" y="210" width="22" height="150" fill="#1c1917"/>
    <rect x="140" y="210" width="22" height="150" fill="#1c1917"/>
    <path d="M40 210 L106 170 L172 210 Z" fill="#292524"/>
    <circle cx="61" cy="200" r="5" fill="#ea580c"/>
    <circle cx="151" cy="200" r="5" fill="#ea580c"/>
    <!-- T-Rex Silhouette on Right -->
    <path d="
      M640 280 C630 250 650 230 670 230 C690 230 710 240 730 235 C745 230 755 240 755 250
      C755 260 740 265 725 265 C720 285 700 310 690 340 L705 380 L685 385 L675 350
      C665 355 650 360 635 360 C610 360 590 340 560 325 C540 315 520 310 500 310
      C530 325 560 345 590 355 C615 365 635 375 640 280 Z
    " fill="#02140d"/>
    <!-- Prehistoric Jungle Palm Fronds -->
    <path d="M0 450 Q80 340 180 320 Q120 380 0 450 Z" fill="#064e3b"/>
    <path d="M800 450 Q700 320 580 300 Q660 370 800 450 Z" fill="#064e3b"/>
    <!-- Electric fence lines -->
    <line x1="172" y1="280" x2="480" y2="280" stroke="#facc15" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.7"/>
    <line x1="172" y1="305" x2="480" y2="305" stroke="#facc15" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.7"/>
  `;
  return wrapSvg('jurassic_park', defs, content);
}

function drawMordor(): string {
  const defs = `
    <linearGradient id="md-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c0404"/>
      <stop offset="45%" stop-color="#450a0a"/>
      <stop offset="85%" stop-color="#991b1b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <radialGradient id="md-eye" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="35%" stop-color="#f97316"/>
      <stop offset="70%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#md-sky)"/>
    <!-- Swirling Ash Clouds -->
    <path d="M0 120 Q200 40 400 100 T800 80 L800 220 Q600 160 400 210 T0 180 Z" fill="#1c0707" opacity="0.65"/>
    <!-- Eye of Sauron atop Barad-dur on right -->
    <polygon points="680,290 695,130 705,90 715,130 730,290" fill="#0a0303"/>
    <circle cx="705" cy="80" r="28" fill="url(#md-eye)"/>
    <ellipse cx="705" cy="80" rx="3.5" ry="16" fill="#000000"/>
    <!-- Mount Doom (Domedagsberget) Volcano in center-left -->
    <polygon points="120,340 280,160 320,160 480,340" fill="#140606"/>
    <!-- Molten Crater and Lava River -->
    <ellipse cx="300" cy="160" rx="22" ry="7" fill="#f97316"/>
    <path d="M300 165 Q315 220 290 260 Q270 300 280 340 Q290 390 260 450" stroke="#f97316" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M300 165 Q315 220 290 260 Q270 300 280 340 Q290 390 260 450" stroke="#fef08a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Sharp Jagged Ash Crags in Foreground -->
    <polygon points="0,450 60,330 110,400 160,320 230,450" fill="#0a0303"/>
    <polygon points="560,450 620,340 680,410 740,310 800,450" fill="#0a0303"/>
    <!-- Volcanic Sparks -->
    <circle cx="280" cy="130" r="2" fill="#fef08a"/>
    <circle cx="310" cy="115" r="2.5" fill="#f97316"/>
    <circle cx="335" cy="135" r="1.5" fill="#ef4444"/>
    <circle cx="295" cy="100" r="2" fill="#fef08a"/>
  `;
  return wrapSvg('mordor', defs, content);
}

function drawNorthPole(): string {
  const defs = `
    <linearGradient id="np-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="40%" stop-color="#082f49"/>
      <stop offset="85%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#np-sky)"/>
    <!-- Aurora Borealis Ribbon -->
    <path d="M-50 160 Q200 60 400 130 T850 90 L850 160 Q600 210 400 170 T-50 210 Z" fill="#34d399" opacity="0.45" filter="blur(6px)"/>
    <path d="M-50 140 Q250 80 450 150 T850 110 L850 150 Q650 190 450 160 T-50 180 Z" fill="#a855f7" opacity="0.3" filter="blur(8px)"/>
    <!-- Deep Snowbanks -->
    <path d="M0 310 Q250 270 500 300 T800 290 L800 450 L0 450 Z" fill="#cbd5e1" opacity="0.6"/>
    <path d="M0 340 Q400 305 800 335 L800 450 L0 450 Z" fill="#e2e8f0"/>
    <!-- Santa's Workshop on left -->
    <rect x="120" y="260" width="160" height="90" fill="#7f1d1d"/>
    <polygon points="100,260 200,195 300,260" fill="#f8fafc"/>
    <rect x="235" y="185" width="22" height="45" fill="#450a0a"/>
    <circle cx="246" cy="175" r="7" fill="#f8fafc"/>
    <!-- Glowing Windows -->
    <rect x="145" y="280" width="30" height="35" rx="4" fill="#fde047"/>
    <rect x="215" y="280" width="30" height="35" rx="4" fill="#fde047"/>
    <rect x="180" y="310" width="24" height="40" fill="#450a0a"/>
    <!-- Candy cane pole -->
    <rect x="90" y="270" width="8" height="75" fill="#f8fafc"/>
    <line x1="90" y1="280" x2="98" y2="288" stroke="#dc2626" stroke-width="4"/>
    <line x1="90" y1="300" x2="98" y2="308" stroke="#dc2626" stroke-width="4"/>
    <line x1="90" y1="320" x2="98" y2="328" stroke="#dc2626" stroke-width="4"/>
    <!-- Snowy fir trees on right -->
    <g fill="#0f172a">
      <polygon points="620,380 575,380 620,290 665,380"/>
      <polygon points="620,330 585,330 620,260 655,330"/>
      <polygon points="690,390 655,390 690,320 725,390"/>
    </g>
    <!-- Silhouette of Reindeer Sleigh in the aurora -->
    <path d="M480 120 Q500 118 515 125 L505 130 Z M525 118 L535 116 M545 115 L555 113" stroke="#f8fafc" stroke-width="1.8" opacity="0.8"/>
  `;
  return wrapSvg('north_pole', defs, content);
}

function drawMoonBase(): string {
  const defs = `
    <radialGradient id="mb-earth" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#93c5fd"/>
      <stop offset="45%" stop-color="#2563eb"/>
      <stop offset="85%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="#020617"/>
    <!-- Cosmic Stars -->
    <g fill="#ffffff">
      <circle cx="50" cy="40" r="1.2"/><circle cx="120" cy="80" r="1"/><circle cx="190" cy="30" r="1.5"/>
      <circle cx="280" cy="110" r="1"/><circle cx="620" cy="60" r="1.5"/><circle cx="710" cy="95" r="1"/>
      <circle cx="760" cy="40" r="1.4"/><circle cx="380" cy="70" r="1.2"/><circle cx="460" cy="45" r="1.6"/>
    </g>
    <!-- Earthrise (Jordklotet) -->
    <circle cx="420" cy="130" r="62" fill="url(#mb-earth)" filter="drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))"/>
    <path d="M385 115 Q410 100 440 120 Q425 140 400 145 Z" fill="#86efac" opacity="0.6"/>
    <path d="M430 140 Q455 130 465 155 Q445 165 425 155 Z" fill="#86efac" opacity="0.5"/>
    <path d="M390 105 Q430 95 450 115" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    <!-- Lunar Crater Terrain Horizon -->
    <path d="M0 280 Q150 250 300 270 T600 260 T800 275 L800 450 L0 450 Z" fill="#1e293b"/>
    <path d="M0 320 Q200 290 450 315 T800 310 L800 450 L0 450 Z" fill="#334155"/>
    <!-- Craters -->
    <ellipse cx="220" cy="360" rx="45" ry="12" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <ellipse cx="680" cy="380" rx="60" ry="15" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <!-- Moon Base Habitats (Kupoler) -->
    <ellipse cx="480" cy="325" rx="50" ry="32" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <ellipse cx="560" cy="332" rx="35" ry="22" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
    <!-- Connecting tunnel -->
    <rect x="520" y="325" width="25" height="12" fill="#64748b"/>
    <!-- Solar Panels -->
    <rect x="360" y="315" width="40" height="20" fill="#1e40af" stroke="#93c5fd" stroke-width="1.5" transform="skewX(-15)"/>
    <line x1="380" y1="335" x2="380" y2="350" stroke="#94a3b8" stroke-width="3"/>
    <!-- Communication Dish -->
    <path d="M590 315 A15 15 0 0 1 615 295" stroke="#f8fafc" stroke-width="3" fill="none"/>
    <line x1="602" y1="305" x2="602" y2="325" stroke="#94a3b8" stroke-width="2.5"/>
  `;
  return wrapSvg('moon_base', defs, content);
}

function drawSwedishForestLake(): string {
  const defs = `
    <linearGradient id="sfl-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="45%" stop-color="#38bdf8"/>
      <stop offset="80%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#f0fdf4"/>
    </linearGradient>
    <linearGradient id="sfl-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0369a1"/>
      <stop offset="60%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#075985"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#sfl-sky)"/>
    <!-- Golden Swedish Summer Sun -->
    <circle cx="380" cy="95" r="48" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 24px #fde047)"/>
    <!-- Cumulus Clouds -->
    <ellipse cx="200" cy="90" rx="80" ry="24" fill="#ffffff" opacity="0.8"/>
    <ellipse cx="240" cy="80" rx="55" ry="22" fill="#ffffff" opacity="0.9"/>
    <ellipse cx="580" cy="85" rx="90" ry="26" fill="#ffffff" opacity="0.8"/>
    <ellipse cx="620" cy="75" rx="60" ry="24" fill="#ffffff" opacity="0.9"/>
    <!-- Distant Forest Ridges -->
    <path d="M0 220 Q200 170 400 205 T800 190 L800 450 L0 450 Z" fill="#14532d"/>
    <path d="M0 250 Q250 205 500 235 T800 220 L800 450 L0 450 Z" fill="#0f3d23"/>
    <!-- Mirror-clear Swedish Lake (Sjö) -->
    <rect y="270" width="800" height="180" fill="url(#sfl-water)"/>
    <!-- Water reflections -->
    <ellipse cx="380" cy="310" rx="80" ry="5" fill="#fef08a" opacity="0.5"/>
    <ellipse cx="380" cy="335" rx="60" ry="4" fill="#fef08a" opacity="0.4"/>
    <ellipse cx="200" cy="350" rx="100" ry="5" fill="#bae6fd" opacity="0.4"/>
    <ellipse cx="580" cy="360" rx="120" ry="6" fill="#bae6fd" opacity="0.4"/>
    <!-- Red Swedish Timber Cottage (Röd stuga med vita knutar) on Lake Shore -->
    <rect x="490" y="240" width="75" height="45" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1.5"/>
    <polygon points="480,240 527,212 575,240" fill="#0f172a"/>
    <!-- White Knuts & Window Trim -->
    <rect x="490" y="240" width="5" height="45" fill="#ffffff"/>
    <rect x="560" y="240" width="5" height="45" fill="#ffffff"/>
    <rect x="502" y="252" width="14" height="16" fill="#fef08a" stroke="#ffffff" stroke-width="2"/>
    <rect x="536" y="254" width="14" height="31" fill="#450a0a" stroke="#ffffff" stroke-width="2"/>
    <!-- Chimney & Smoke -->
    <rect x="540" y="215" width="8" height="15" fill="#475569"/>
    <circle cx="544" cy="205" r="4" fill="#f8fafc" opacity="0.6"/>
    <circle cx="548" cy="195" r="6" fill="#f8fafc" opacity="0.4"/>
    <!-- Wooden Pier & Rowboat -->
    <rect x="450" y="275" width="55" height="8" fill="#78350f"/>
    <line x1="470" y1="283" x2="470" y2="305" stroke="#451a03" stroke-width="3"/>
    <line x1="495" y1="283" x2="495" y2="305" stroke="#451a03" stroke-width="3"/>
    <ellipse cx="435" cy="295" rx="18" ry="7" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
    <!-- TALL Swedish Spruce Trees (Höga granar) framing the Left Flank -->
    <polygon points="40,450 0,450 40,180 80,450" fill="#052e16"/>
    <polygon points="40,240 10,240 40,110 70,240" fill="#064e3b"/>
    <polygon points="40,160 20,160 40,40 60,160" fill="#052e16"/>
    <polygon points="110,450 70,450 110,210 150,450" fill="#022c19"/>
    <polygon points="110,270 80,270 110,130 140,270" fill="#064e3b"/>
    <!-- TALL Swedish Spruce Trees framing the Right Flank -->
    <polygon points="730,450 690,450 730,190 770,450" fill="#052e16"/>
    <polygon points="730,250 700,250 730,100 760,250" fill="#064e3b"/>
    <polygon points="730,150 710,150 730,50 750,150" fill="#052e16"/>
    <polygon points="670,450 630,450 670,240 710,450" fill="#022c19"/>
    <polygon points="670,300 640,300 670,160 700,300" fill="#064e3b"/>
  `;
  return wrapSvg('smaland', defs, content);
}

function drawCoastalCliffs(): string {
  const defs = `
    <linearGradient id="cc-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="45%" stop-color="#38bdf8"/>
      <stop offset="80%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <linearGradient id="cc-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0369a1"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#cc-sky)"/>
    <!-- Bright Coastal Sun -->
    <circle cx="360" cy="110" r="50" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 25px #facc15)"/>
    <!-- Soaring Seagulls -->
    <path d="M220 90 Q232 78 244 90 Q256 78 268 90" stroke="#ffffff" stroke-width="2.5" fill="none"/>
    <path d="M170 120 Q180 110 190 120 Q200 110 210 120" stroke="#ffffff" stroke-width="2.2" fill="none"/>
    <path d="M480 80 Q490 70 500 80 Q510 70 520 80" stroke="#ffffff" stroke-width="2.2" fill="none"/>
    <!-- Ocean Sea with Turquoise & Deep Sapphire Waves -->
    <rect y="230" width="800" height="220" fill="url(#cc-sea)"/>
    <!-- White Wave Foam Crests -->
    <path d="M40 270 Q120 255 200 270 T360 270 T520 270 T680 270 T800 270" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.85"/>
    <path d="M0 310 Q100 295 220 310 T460 310 T700 310 T800 310" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.85"/>
    <path d="M60 350 Q160 335 300 350 T580 350 T800 350" stroke="#ffffff" stroke-width="3.5" fill="none" opacity="0.85"/>
    <!-- Right Coastal Bluff with Majestic Lighthouse (Fyren Långe Jan / Kullen) -->
    <polygon points="620,450 640,240 800,220 800,450" fill="#334155"/>
    <!-- Lighthouse Tower with Red & White Bands -->
    <rect x="685" y="100" width="26" height="140" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="685" y="125" width="26" height="24" fill="#dc2626"/>
    <rect x="685" y="175" width="26" height="24" fill="#dc2626"/>
    <!-- Lantern Room & Dome -->
    <rect x="681" y="85" width="34" height="15" fill="#1e293b"/>
    <circle cx="698" cy="85" r="14" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 16px #fef08a)"/>
    <polygon points="685,75 698,58 711,75" fill="#dc2626"/>
    <!-- Lighthouse Golden Light Beams -->
    <polygon points="698,85 0,30 0,160" fill="#fef08a" opacity="0.32"/>
    <!-- Left Flank: Limestone Raukar & Craggy Granite Cliffs (Gotland / Öland / Bohuslän) -->
    <path d="M0 450 L0 260 Q60 250 120 290 Q180 340 220 450 Z" fill="#475569"/>
    <!-- Massive Raukar Rock Pillar -->
    <path d="M120 450 C110 320 130 250 160 210 C185 170 215 170 230 220 C245 270 220 330 240 450 Z" fill="#64748b" stroke="#334155" stroke-width="2"/>
    <path d="M50 450 C45 360 60 300 80 270 C95 240 115 240 125 280 C135 320 120 370 130 450 Z" fill="#475569"/>
    <!-- Crashing White Surf Spray at Base of Rocks -->
    <ellipse cx="170" cy="425" rx="45" ry="12" fill="#ffffff" opacity="0.8"/>
    <ellipse cx="80" cy="430" rx="35" ry="10" fill="#ffffff" opacity="0.8"/>
  `;
  return wrapSvg('oland', defs, content);
}

function drawAlpineSnow(): string {
  const defs = `
    <linearGradient id="alp-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#082f49"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="80%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#alp-sky)"/>
    <!-- Alpine Sun -->
    <circle cx="210" cy="90" r="48" fill="#fef08a" opacity="0.95" filter="drop-shadow(0 0 24px #facc15)"/>
    <!-- Majestic Matterhorn Alpine Peaks piercing high into the sky -->
    <polygon points="40,320 220,50 380,320" fill="#334155"/>
    <polygon points="220,50 160,160 220,180 260,140" fill="#ffffff"/>
    <polygon points="240,340 430,30 620,340" fill="#1e293b"/>
    <polygon points="430,30 370,150 430,170 480,130" fill="#ffffff"/>
    <polygon points="520,340 680,70 820,340" fill="#334155"/>
    <polygon points="680,70 630,170 680,190 720,150" fill="#ffffff"/>
    <!-- Cable Car Wire running across the mountain sky -->
    <line x1="260" y1="90" x2="780" y2="240" stroke="#94a3b8" stroke-width="2"/>
    <!-- Red Swiss Gondola Cable Car -->
    <line x1="560" y1="175" x2="560" y2="195" stroke="#475569" stroke-width="2.5"/>
    <rect x="545" y="195" width="30" height="22" rx="4" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="549" y="200" width="8" height="8" rx="1" fill="#bae6fd"/>
    <rect x="561" y="200" width="8" height="8" rx="1" fill="#bae6fd"/>
    <!-- Snow Covered Valley Floor -->
    <path d="M0 310 Q400 260 800 300 L800 450 L0 450 Z" fill="#f1f5f9"/>
    <!-- Cozy Swiss Chalet on the Slope -->
    <rect x="360" y="300" width="70" height="42" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
    <polygon points="345,300 395,270 445,300" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
    <rect x="370" y="312" width="14" height="14" fill="#fef08a"/>
    <rect x="405" y="312" width="14" height="28" fill="#451a03"/>
    <!-- Alpine Evergreen Forest Slopes framing Left & Right -->
    <polygon points="50,450 10,450 50,220 90,450" fill="#064e3b"/>
    <polygon points="50,270 20,270 50,150 80,270" fill="#052e16"/>
    <polygon points="120,450 80,450 120,250 160,450" fill="#064e3b"/>
    <polygon points="730,450 690,450 730,230 770,450" fill="#064e3b"/>
    <polygon points="730,280 700,280 730,160 760,280" fill="#052e16"/>
  `;
  return wrapSvg('alps', defs, content);
}

function drawMediterraneanSun(): string {
  const defs = `
    <linearGradient id="med-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="45%" stop-color="#38bdf8"/>
      <stop offset="75%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
    <linearGradient id="med-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="60%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#med-sky)"/>
    <circle cx="480" cy="210" r="65" fill="#fef08a" opacity="0.9"/>
    <!-- Turquoise Mediterranean Sea -->
    <rect y="260" width="800" height="190" fill="url(#med-sea)"/>
    <!-- Coastal Limestone Cliffs -->
    <path d="M0 450 L0 260 Q180 240 260 310 Q320 370 380 450 Z" fill="#78350f"/>
    <!-- Sea Arch / Cala Cliff -->
    <path d="M260 310 Q290 280 320 310 L310 370 Q285 340 260 370 Z" fill="#9a3412"/>
    <!-- Slender Italian Cypresses -->
    <ellipse cx="140" cy="280" rx="10" ry="55" fill="#064e3b"/>
    <line x1="140" y1="335" x2="140" y2="360" stroke="#451a03" stroke-width="4"/>
    <ellipse cx="170" cy="295" rx="8" ry="45" fill="#064e3b"/>
    <line x1="170" y1="340" x2="170" y2="365" stroke="#451a03" stroke-width="3"/>
    <!-- Right headland -->
    <path d="M600 450 Q680 320 800 300 L800 450 Z" fill="#78350f"/>
    <ellipse cx="690" cy="320" rx="11" ry="50" fill="#064e3b"/>
    <line x1="690" y1="370" x2="690" y2="395" stroke="#451a03" stroke-width="4"/>
  `;
  return wrapSvg('sardinia', defs, content);
}

// Additional unique legendary builders
function drawArea51(): string {
  const defs = `
    <linearGradient id="a51-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="ufo-beam" cx="50%" cy="0%" r="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="60%" stop-color="rgba(16, 185, 129, 0.35)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#a51-sky)"/>
    <!-- Stars -->
    <g fill="#ffffff">
      <circle cx="90" cy="40" r="1.2"/><circle cx="210" cy="70" r="1"/><circle cx="340" cy="30" r="1.5"/>
      <circle cx="680" cy="60" r="1.2"/><circle cx="740" cy="110" r="1.5"/><circle cx="160" cy="120" r="1"/>
    </g>
    <!-- Desert Mountain Horizon -->
    <polygon points="0,310 160,240 320,310 480,250 640,320 800,260 800,450 0,450" fill="#0f172a"/>
    <!-- Desert Floor -->
    <path d="M0 330 Q400 300 800 330 L800 450 L0 450 Z" fill="#1e293b"/>
    <!-- Secret Hangar on Right -->
    <rect x="560" y="290" width="160" height="55" fill="#334155" rx="4"/>
    <polygon points="560,290 640,265 720,290" fill="#1e293b"/>
    <circle cx="640" cy="260" r="4" fill="#ef4444"/>
    <!-- UFO Saucer Hovering in Center-Left -->
    <ellipse cx="280" cy="110" rx="60" ry="16" fill="#94a3b8" filter="drop-shadow(0 0 16px rgba(52, 211, 153, 0.7))"/>
    <ellipse cx="280" cy="104" rx="28" ry="14" fill="#38bdf8" opacity="0.85"/>
    <circle cx="250" cy="112" r="3" fill="#facc15"/>
    <circle cx="280" cy="114" r="3" fill="#facc15"/>
    <circle cx="310" cy="112" r="3" fill="#facc15"/>
    <!-- Green Tractor Beam -->
    <polygon points="265,118 295,118 360,340 200,340" fill="url(#ufo-beam)"/>
    <!-- Joshua Trees -->
    <path d="M110 390 L110 330 L95 315 L105 310 L110 325 L125 310 L135 315 L118 335 L118 390 Z" fill="#064e3b"/>
    <path d="M460 395 L460 345 L445 330 L455 325 L460 338 L475 325 L485 330 L468 348 L468 395 Z" fill="#064e3b"/>
  `;
  return wrapSvg('area_51', defs, content);
}

function drawCyberpunk2099(): string {
  const defs = `
    <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#180e29"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#cb-sky)"/>
    <!-- Futuristic Megatowers -->
    <rect x="40" y="80" width="90" height="370" fill="#09090b" stroke="#f43f5e" stroke-width="1.5" opacity="0.9"/>
    <rect x="150" y="140" width="70" height="310" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" opacity="0.9"/>
    <rect x="250" y="40" width="110" height="410" fill="#09090b" stroke="#a855f7" stroke-width="1.5" opacity="0.9"/>
    <rect x="520" y="70" width="95" height="380" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" opacity="0.9"/>
    <rect x="640" y="120" width="120" height="330" fill="#09090b" stroke="#f43f5e" stroke-width="1.5" opacity="0.9"/>
    <!-- Antennae and Spire Beacons -->
    <line x1="305" y1="40" x2="305" y2="10" stroke="#f43f5e" stroke-width="3"/>
    <circle cx="305" cy="8" r="4" fill="#f43f5e" filter="drop-shadow(0 0 6px #f43f5e)"/>
    <!-- Neon Billboards & Holograms -->
    <rect x="60" y="120" width="50" height="24" fill="#f43f5e" opacity="0.8" rx="3"/>
    <rect x="270" y="80" width="70" height="35" fill="#06b6d4" opacity="0.8" rx="3"/>
    <rect x="540" y="110" width="55" height="25" fill="#a855f7" opacity="0.8" rx="3"/>
    <!-- Flying Spinner Car Light Trail -->
    <path d="M120 180 Q400 160 700 130" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.75"/>
    <circle cx="680" cy="132" r="5" fill="#06b6d4" filter="drop-shadow(0 0 8px #06b6d4)"/>
    <!-- Rooftop Campervan Platform 140 floors up -->
    <rect x="0" y="340" width="800" height="110" fill="#0a0a0f"/>
    <line x1="0" y1="340" x2="800" y2="340" stroke="#06b6d4" stroke-width="3" filter="drop-shadow(0 0 8px #06b6d4)"/>
  `;
  return wrapSvg('cyberpunk_2099', defs, content);
}

function drawNarnia(): string {
  const defs = `
    <linearGradient id="nar-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="rgba(254, 240, 138, 0.6)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#nar-sky)"/>
    <!-- Falling Snowflakes -->
    <g fill="#ffffff" opacity="0.8">
      <circle cx="100" cy="80" r="2"/><circle cx="180" cy="140" r="1.5"/><circle cx="250" cy="60" r="2.5"/>
      <circle cx="340" cy="110" r="1.5"/><circle cx="450" cy="70" r="2"/><circle cx="560" cy="130" r="2.5"/>
      <circle cx="670" cy="90" r="1.5"/><circle cx="750" cy="150" r="2"/><circle cx="700" cy="40" r="2.5"/>
    </g>
    <!-- Deep Winter Forest Silhouettes -->
    <path d="M0 310 Q250 260 500 290 T800 280 L800 450 L0 450 Z" fill="#1e1b4b"/>
    <path d="M0 340 Q400 310 800 335 L800 450 L0 450 Z" fill="#e0e7ff"/>
    <!-- Snow-covered pine trees -->
    <polygon points="120,400 80,400 120,290 160,400" fill="#0f172a"/>
    <polygon points="120,330 90,330 120,250 150,330" fill="#0f172a"/>
    <polygon points="680,410 640,410 680,300 720,410" fill="#0f172a"/>
    <polygon points="680,340 650,340 680,260 710,340" fill="#0f172a"/>
    <!-- The Iconic Victorian Streetlamp in the Snow -->
    <circle cx="400" cy="235" r="48" fill="url(#lamp-glow)"/>
    <line x1="400" y1="360" x2="400" y2="230" stroke="#09090b" stroke-width="5"/>
    <polygon points="392,230 408,230 404,210 396,210" fill="#fde047" stroke="#09090b" stroke-width="2"/>
    <circle cx="400" cy="208" r="4" fill="#09090b"/>
    <!-- Golden snow reflection under the lamp -->
    <ellipse cx="400" cy="365" rx="50" ry="12" fill="#fef08a" opacity="0.45"/>
  `;
  return wrapSvg('narnia', defs, content);
}

function drawNeverland(): string {
  const defs = `
    <linearGradient id="nl-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2e1065"/>
      <stop offset="45%" stop-color="#701a75"/>
      <stop offset="80%" stop-color="#c026d3"/>
      <stop offset="100%" stop-color="#fbcfe8"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#nl-sky)"/>
    <!-- Skull Rock (Dödskalleklippan) on right -->
    <path d="M580 340 C570 240 620 180 680 180 C740 180 790 240 780 340 Z" fill="#1e1b4b"/>
    <circle cx="660" cy="235" r="14" fill="#09090b"/>
    <circle cx="700" cy="235" r="14" fill="#09090b"/>
    <polygon points="680,260 674,275 686,275" fill="#09090b"/>
    <!-- Lagoon Waters -->
    <path d="M0 320 Q400 295 800 320 L800 450 L0 450 Z" fill="#065f46"/>
    <!-- Jolly Roger pirate ship silhouette on left -->
    <path d="M120 310 L230 310 L210 335 L140 335 Z" fill="#09090b"/>
    <line x1="175" y1="310" x2="175" y2="230" stroke="#09090b" stroke-width="3"/>
    <rect x="155" y="240" width="40" height="28" fill="#18181b"/>
    <rect x="160" y="275" width="30" height="22" fill="#18181b"/>
    <!-- Pixie dust golden sparkling trail -->
    <path d="M220 160 Q350 120 480 200 T720 160" stroke="#fef08a" stroke-width="3" stroke-dasharray="3,8" fill="none" opacity="0.85"/>
  `;
  return wrapSvg('neverland', defs, content);
}

function drawNangijala(): string {
  const defs = `
    <linearGradient id="nj-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="55%" stop-color="#bae6fd"/>
      <stop offset="85%" stop-color="#fbcfe8"/>
      <stop offset="100%" stop-color="#fdf2f8"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#nj-sky)"/>
    <!-- Distant Dark Mountains of Karmanjaka -->
    <polygon points="450,280 560,140 680,280" fill="#1e293b"/>
    <polygon points="620,290 710,160 800,290" fill="#0f172a"/>
    <!-- Cherry Blossom Valley green hills -->
    <path d="M0 290 Q250 240 500 270 T800 260 L800 450 L0 450 Z" fill="#15803d"/>
    <path d="M0 330 Q400 300 800 325 L800 450 L0 450 Z" fill="#166534"/>
    <!-- Flowing River -->
    <path d="M180 450 Q300 340 450 320 L510 320 Q360 350 240 450 Z" fill="#0284c7"/>
    <!-- White Timbered Farmhouse with thatched roof -->
    <rect x="120" y="295" width="60" height="32" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/>
    <polygon points="112,295 150,272 188,295" fill="#78350f"/>
    <!-- Blooming Cherry Trees (Rosa körsbärsträd) -->
    <circle cx="240" cy="285" r="32" fill="#f472b6" opacity="0.9"/>
    <line x1="240" y1="285" x2="240" y2="330" stroke="#78350f" stroke-width="4"/>
    <circle cx="310" cy="275" r="38" fill="#fbcfe8" opacity="0.95"/>
    <line x1="310" y1="275" x2="310" y2="328" stroke="#78350f" stroke-width="4.5"/>
    <circle cx="70" cy="290" r="28" fill="#f472b6" opacity="0.9"/>
    <line x1="70" y1="290" x2="70" y2="332" stroke="#78350f" stroke-width="3.5"/>
  `;
  return wrapSvg('nangijala', defs, content);
}

function drawAtlantis(): string {
  const defs = `
    <linearGradient id="atl-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#082f49"/>
      <stop offset="50%" stop-color="#0369a1"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#atl-sky)"/>
    <!-- Sunbeams underwater -->
    <polygon points="180,0 240,0 360,450 220,450" fill="#38bdf8" opacity="0.12"/>
    <polygon points="480,0 540,0 660,450 520,450" fill="#38bdf8" opacity="0.12"/>
    <!-- Giant Crystal Dome Arch -->
    <path d="M80 450 C80 180 720 180 720 450" stroke="#38bdf8" stroke-width="5" fill="none" opacity="0.6"/>
    <!-- Classical Sunken Temple & Pillars -->
    <rect x="220" y="270" width="16" height="90" fill="#e2e8f0"/>
    <rect x="270" y="270" width="16" height="90" fill="#e2e8f0"/>
    <rect x="320" y="270" width="16" height="90" fill="#e2e8f0"/>
    <rect x="200" y="255" width="155" height="15" fill="#f8fafc"/>
    <polygon points="190,255 277,215 365,255" fill="#e2e8f0"/>
    <!-- Sea Floor & Corals -->
    <path d="M0 360 Q400 320 800 350 L800 450 L0 450 Z" fill="#042f2e"/>
    <!-- Air Bubbles -->
    <circle cx="210" cy="220" r="6" fill="#38bdf8" opacity="0.7"/>
    <circle cx="218" cy="180" r="4" fill="#38bdf8" opacity="0.6"/>
    <circle cx="580" cy="260" r="7" fill="#38bdf8" opacity="0.7"/>
    <circle cx="588" cy="210" r="5" fill="#38bdf8" opacity="0.6"/>
    <!-- Gliding Manta Ray -->
    <path d="M520 160 Q560 145 600 160 Q560 180 520 160 Z M560 160 L630 162" stroke="#042f2e" stroke-width="2" fill="#0f172a" opacity="0.75"/>
  `;
  return wrapSvg('atlantis', defs, content);
}

function drawMarsColony(): string {
  const defs = `
    <linearGradient id="mars-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#9a3412"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#mars-sky)"/>
    <!-- Two Moons: Phobos & Deimos -->
    <circle cx="620" cy="80" r="9" fill="#fef08a" opacity="0.8"/>
    <circle cx="670" cy="120" r="5" fill="#fdba74" opacity="0.7"/>
    <!-- Olympus Mons Volcano Shield -->
    <polygon points="40,310 320,160 480,160 760,310" fill="#7c2d12"/>
    <ellipse cx="400" cy="160" rx="60" ry="10" fill="#451a03"/>
    <!-- Red Martian Canyon Floor -->
    <path d="M0 310 Q400 270 800 300 L800 450 L0 450 Z" fill="#9a3412"/>
    <path d="M0 350 Q400 320 800 345 L800 450 L0 450 Z" fill="#7c2d12"/>
    <!-- Pressurized Habitat Domes & Greenhouse -->
    <ellipse cx="280" cy="340" rx="46" ry="26" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
    <ellipse cx="360" cy="345" rx="36" ry="20" fill="#10b981" opacity="0.85" stroke="#f8fafc" stroke-width="2"/>
    <rect x="315" y="340" width="20" height="10" fill="#cbd5e1"/>
    <!-- Solar array -->
    <rect x="420" y="335" width="45" height="18" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" transform="skewX(-15)"/>
    <line x1="440" y1="353" x2="440" y2="368" stroke="#cbd5e1" stroke-width="2.5"/>
  `;
  return wrapSvg('mars_colony', defs, content);
}

function drawMountOlympus(): string {
  const defs = `
    <linearGradient id="oly-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="45%" stop-color="#3b82f6"/>
      <stop offset="80%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  `;
  const content = `
    <rect width="800" height="450" fill="url(#oly-sky)"/>
    <!-- Golden Divine Sun -->
    <circle cx="400" cy="180" r="70" fill="#fef08a" opacity="0.9" filter="drop-shadow(0 0 30px #facc15)"/>
    <!-- Cloud Sea Horizon (Molnhav ovanför världen) -->
    <ellipse cx="120" cy="310" rx="140" ry="40" fill="#f8fafc"/>
    <ellipse cx="350" cy="300" rx="160" ry="45" fill="#f8fafc"/>
    <ellipse cx="600" cy="310" rx="150" ry="40" fill="#f8fafc"/>
    <ellipse cx="800" cy="320" rx="120" ry="35" fill="#f8fafc"/>
    <rect y="315" width="800" height="135" fill="#f8fafc"/>
    <!-- Classical Greek Temple of the Gods -->
    <rect x="300" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="340" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="380" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="420" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="460" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="500" y="270" width="14" height="65" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <rect x="280" y="255" width="255" height="15" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <polygon points="270,255 407,210 545,255" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <!-- Golden Lightning of Zeus in far clouds -->
    <path d="M680 200 L660 250 L685 245 L650 310" stroke="#facc15" stroke-width="3" fill="none" filter="drop-shadow(0 0 8px #facc15)"/>
  `;
  return wrapSvg('mount_olympus', defs, content);
}

/**
 * Returns the customized SVG vector illustration markup for any destination
 */
export function getScenicSVG(dest: { id: string; tier?: string }): string {
  const theme = DESTINATION_THEME_MAP[dest.id] || 'smaland';

  switch (theme) {
    case 'high_chaparral':
    case 'wild_west_town':
      return drawHighChaparral();
    case 'hogwarts':
    case 'dracula_castle':
    case 'transylvania':
      return drawHogwarts();
    case 'jurassic_park':
      return drawJurassicPark();
    case 'mordor':
      return drawMordor();
    case 'north_pole':
      return drawNorthPole();
    case 'moon_base':
      return drawMoonBase();
    case 'area_51':
      return drawArea51();
    case 'cyberpunk_2099':
      return drawCyberpunk2099();
    case 'narnia':
      return drawNarnia();
    case 'neverland':
    case 'pirate_cove':
    case 'bermuda_triangle':
      return drawNeverland();
    case 'nangijala':
      return drawNangijala();
    case 'atlantis':
      return drawAtlantis();
    case 'mars_colony':
      return drawMarsColony();
    case 'mount_olympus':
    case 'el_dorado':
    case 'sherwood':
      return drawMountOlympus();

    // Regular Destinations
    case 'alps':
    case 'swissalps':
    case 'dolomites':
    case 'tatras':
    case 'pyrenees':
    case 'picos':
    case 'julianalps':
    case 'durmitor':
    case 'harz':
    case 'ardennes':
      return drawAlpineSnow();

    case 'sardinia':
    case 'corsica':
      return drawMediterraneanSun();

    case 'oland':
    case 'gotland':
    case 'bohuslan':
    case 'halland':
    case 'skane':
    case 'skagen':
    case 'bornholm':
    case 'ostsee':
    case 'rugen':
    case 'lofoten':
    case 'senja':
    case 'nordkap':
    case 'faroe':
    case 'wildatlantic':
      return drawCoastalCliffs();

    case 'smaland':
    case 'dalsland':
    case 'siljan':
    case 'vattern':
    case 'saimen':
    case 'hogakusten':
    case 'jamtland':
    case 'fulufjallet':
    case 'hardangervidda':
    case 'lappland':
    case 'inari':
    case 'highlands':
    case 'iceland':
    default:
      return drawSwedishForestLake();
  }
}

/**
 * 4x2 Theme Grid Sprite mapping (/backgrounds/themes-grid.jpg)
 * background-size: 400% 200%
 */
export interface ThemeGridTile {
  index: number;
  id: string;
  name: string;
  x: string;
  y: string;
  bgPosition: string;
}

export const THEME_GRID_TILES: Record<number, ThemeGridTile> = {
  1: {
    index: 1,
    id: 'castle',
    name: 'Mystiskt slott i fullmåne',
    x: '0%',
    y: '0%',
    bgPosition: '0% 0%',
  },
  2: {
    index: 2,
    id: 'western',
    name: 'Vilda västern & öken',
    x: '33.333%',
    y: '0%',
    bgPosition: '33.333% 0%',
  },
  3: {
    index: 3,
    id: 'jungle',
    name: 'Förhistorisk djungel & vattenfall',
    x: '66.667%',
    y: '0%',
    bgPosition: '66.667% 0%',
  },
  4: {
    index: 4,
    id: 'volcano',
    name: 'Vulkan & glödande lava',
    x: '100%',
    y: '0%',
    bgPosition: '100% 0%',
  },
  5: {
    index: 5,
    id: 'nordic_forest',
    name: 'Svensk barrskog & spegelblank sjö',
    x: '0%',
    y: '100%',
    bgPosition: '0% 100%',
  },
  6: {
    index: 6,
    id: 'winter_aurora',
    name: 'Snöiga berg, stuga & norrsken',
    x: '33.333%',
    y: '100%',
    bgPosition: '33.333% 100%',
  },
  7: {
    index: 7,
    id: 'sunny_coast',
    name: 'Solig kust, hav & gröna kullar',
    x: '66.667%',
    y: '100%',
    bgPosition: '66.667% 100%',
  },
  8: {
    index: 8,
    id: 'moon_space',
    name: 'Månyta, rymdbas & framtidsmiljö',
    x: '100%',
    y: '100%',
    bgPosition: '100% 100%',
  },
};

/**
 * Exact mapping of all 40 ordinary + 20 legendary bonus destinations to the 8 tiles
 */
const DEST_TO_GRID_INDEX: Record<string, number> = {
  // --- RUTA 1 · Mystiskt slott i fullmåne (0% 0%) ---
  hogwarts: 1,
  dracula_castle: 1,
  mount_olympus: 1,
  highlands: 1,
  transylvania: 1,
  ardennes: 1,

  // --- RUTA 2 · Vilda västern & öken (33.33% 0%) ---
  high_chaparral: 2,
  wild_west_town: 2,
  area_51: 2,

  // --- RUTA 3 · Förhistorisk djungel & vattenfall (66.66% 0%) ---
  jurassic_park: 3,
  el_dorado: 3,
  neverland: 3,

  // --- RUTA 4 · Vulkan & glödande lava (100% 0%) ---
  mordor: 4,
  iceland: 4,

  // --- RUTA 5 · Svensk barrskog & spegelblank sjö (0% 100%) ---
  sherwood: 5,
  nangijala: 5,
  smaland: 5,
  siljan: 5,
  vattern: 5,
  dalsland: 5,
  fulufjallet: 5,
  saimen: 5,
  harz: 5,

  // --- RUTA 6 · Snöiga berg, stuga & norrsken (33.33% 100%) ---
  north_pole: 6,
  narnia: 6,
  jamtland: 6,
  hardangervidda: 6,
  lofoten: 6,
  alps: 6,
  dolomites: 6,
  lappland: 6,
  nordkap: 6,
  tatras: 6,
  swissalps: 6,
  julianalps: 6,
  durmitor: 6,
  senja: 6,
  inari: 6,

  // --- RUTA 7 · Solig kust, hav & gröna kullar (66.66% 100%) ---
  atlantis: 7,
  bermuda_triangle: 7,
  pirate_cove: 7,
  oland: 7,
  gotland: 7,
  skane: 7,
  bohuslan: 7,
  halland: 7,
  bornholm: 7,
  skagen: 7,
  hogakusten: 7,
  ostsee: 7,
  rugen: 7,
  pyrenees: 7,
  corsica: 7,
  faroe: 7,
  picos: 7,
  wildatlantic: 7,
  sardinia: 7,

  // --- RUTA 8 · Månyta, rymdbas & framtidsmiljö (100% 100%) ---
  moon_base: 8,
  mars_colony: 8,
  cyberpunk_2099: 8,
};

export function getThemeGridTile(destOrId: string | { id: string } | null | undefined): ThemeGridTile {
  const id = typeof destOrId === 'string' ? destOrId : destOrId?.id || 'oland';
  const tileIndex = DEST_TO_GRID_INDEX[id] || 5;
  return THEME_GRID_TILES[tileIndex];
}

