// scripts/generate-themes-grid.js
// Generates /public/backgrounds/themes-grid.jpg as a 4x2 sprite grid (2400x1200)
// Tiles:
// Row 1 (y: 0%):
//   Col 1 (0% 0%): Mystiskt slott i fullmåne (Hogwarts, Dracula, Olympen, m.fl.)
//   Col 2 (33.33% 0%): Vilda västern & öken (High Chaparral, Wild West Town, Area 51)
//   Col 3 (66.66% 0%): Förhistorisk djungel & vattenfall (Jurassic Park, El Dorado, Neverland)
//   Col 4 (100% 0%): Vulkan & glödande lava (Mordor, Island)
// Row 2 (y: 100%):
//   Col 1 (0% 100%): Svensk barrskog & spegelblank sjö (Sherwood, Nangijala, Dalsland, m.fl.)
//   Col 2 (33.33% 100%): Snöiga berg, stuga & norrsken (Nordpolen, Narnia, Lappland, Alperna)
//   Col 3 (66.66% 100%): Solig kust, hav & gröna kullar (Atlantis, Bermuda, Tortuga, Öland, Bohuslän)
//   Col 4 (100% 100%): Månyta, rymdbas & framtidsmiljö (Månbasen, Marskolonin, Neon City 2099)

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const WIDTH = 2400;
const HEIGHT = 1200;
const CELL_W = 600;
const CELL_H = 600;

function generateSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" style="background:#0b0f19;">
  <defs>
    <!-- Filter for soft glow -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="auroraGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Cell 1: Castle Gradients -->
    <linearGradient id="c1_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070a1a" />
      <stop offset="45%" stop-color="#111638" />
      <stop offset="85%" stop-color="#1e1845" />
      <stop offset="100%" stop-color="#0f1124" />
    </linearGradient>
    <radialGradient id="c1_moon" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#fef3c7" />
      <stop offset="85%" stop-color="#fde68a" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="c1_moon_halo" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="c1_water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="60%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>

    <!-- Cell 2: Western Desert Gradients -->
    <linearGradient id="c2_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3b0764" />
      <stop offset="35%" stop-color="#701a75" />
      <stop offset="65%" stop-color="#c2410c" />
      <stop offset="85%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <radialGradient id="c2_sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="35%" stop-color="#fef08a" />
      <stop offset="70%" stop-color="#f97316" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
    </radialGradient>

    <!-- Cell 3: Jungle Gradients -->
    <linearGradient id="c3_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="40%" stop-color="#047857" />
      <stop offset="75%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
    <linearGradient id="c3_waterfall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5eead4" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#ccfbf1" />
    </linearGradient>

    <!-- Cell 4: Volcano Gradients -->
    <linearGradient id="c4_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="40%" stop-color="#27272a" />
      <stop offset="75%" stop-color="#7f1d1d" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="c4_lava" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#f97316" />
      <stop offset="80%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>

    <!-- Cell 5: Swedish Forest Gradients -->
    <linearGradient id="c5_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="35%" stop-color="#3730a3" />
      <stop offset="65%" stop-color="#818cf8" />
      <stop offset="85%" stop-color="#f472b6" />
      <stop offset="100%" stop-color="#fde047" />
    </linearGradient>
    <linearGradient id="c5_lake" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.6" />
      <stop offset="30%" stop-color="#4338ca" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- Cell 6: Winter Aurora Gradients -->
    <linearGradient id="c6_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <linearGradient id="c6_aurora1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0" />
      <stop offset="25%" stop-color="#10b981" stop-opacity="0.75" />
      <stop offset="50%" stop-color="#34d399" stop-opacity="0.9" />
      <stop offset="75%" stop-color="#06b6d4" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="c6_aurora2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0" />
      <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="65%" stop-color="#34d399" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </linearGradient>

    <!-- Cell 7: Coast Sea Gradients -->
    <linearGradient id="c7_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="45%" stop-color="#38bdf8" />
      <stop offset="85%" stop-color="#7dd3fc" />
      <stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>
    <linearGradient id="c7_sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="30%" stop-color="#0369a1" />
      <stop offset="70%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#14b8a6" />
    </linearGradient>

    <!-- Cell 8: Moon Base Gradients -->
    <linearGradient id="c8_sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" />
      <stop offset="50%" stop-color="#05070e" />
      <stop offset="85%" stop-color="#090d1a" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <radialGradient id="c8_earth" cx="0.4" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="40%" stop-color="#0284c7" />
      <stop offset="75%" stop-color="#1e3a8a" />
      <stop offset="100%" stop-color="#0f172a" />
    </radialGradient>
    <linearGradient id="c8_lunar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#64748b" />
      <stop offset="40%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- =============================================================== -->
  <!-- ROW 1, COL 1 (0, 0): RUTA 1 · MYSTISKT SLOTT I FULLMÅNE (0% 0%) -->
  <!-- =============================================================== -->
  <g transform="translate(0, 0)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c1_sky)" />

    <!-- Stars -->
    <g fill="#ffffff" opacity="0.8">
      <circle cx="50" cy="40" r="1.5" />
      <circle cx="120" cy="90" r="1.2" opacity="0.6" />
      <circle cx="180" cy="45" r="2" />
      <circle cx="230" cy="110" r="1" opacity="0.5" />
      <circle cx="270" cy="60" r="1.6" />
      <circle cx="480" cy="50" r="1.8" />
      <circle cx="530" cy="95" r="1.3" />
      <circle cx="570" cy="40" r="2" />
      <circle cx="430" cy="130" r="1.2" opacity="0.7" />
      <circle cx="80" cy="160" r="1" opacity="0.6" />
      <circle cx="520" cy="170" r="1.4" opacity="0.7" />
    </g>

    <!-- Full Moon with Halos -->
    <circle cx="360" cy="150" r="110" fill="url(#c1_moon_halo)" />
    <circle cx="360" cy="150" r="70" fill="url(#c1_moon_halo)" />
    <circle cx="360" cy="150" r="48" fill="url(#c1_moon)" />
    <!-- Subtle moon craters -->
    <circle cx="345" cy="140" r="8" fill="#e2e8f0" opacity="0.25" />
    <circle cx="370" cy="165" r="12" fill="#cbd5e1" opacity="0.2" />
    <circle cx="380" cy="135" r="6" fill="#e2e8f0" opacity="0.22" />

    <!-- Floating Mist / Clouds across moon -->
    <path d="M 240 180 Q 320 160 400 175 Q 460 185 500 170 Q 420 195 310 190 Z" fill="#6d28d9" opacity="0.25" />
    <path d="M 180 145 Q 270 135 340 150 Q 390 140 430 155 Q 350 165 240 160 Z" fill="#4c1d95" opacity="0.2" />

    <!-- Distant Mountain Crags -->
    <polygon points="0,380 90,310 200,360 320,290 440,350 540,300 600,340 600,600 0,600" fill="#13172e" />

    <!-- Massive Gothic Fantasy Castle Silhouette -->
    <!-- Base Cliff -->
    <polygon points="120,600 150,380 230,360 380,365 480,410 520,600" fill="#0d1124" />

    <!-- Castle walls, towers, and spires -->
    <!-- Left Great Tower -->
    <rect x="170" y="270" width="46" height="110" fill="#0a0d1d" />
    <polygon points="160,270 193,170 226,270" fill="#070914" />
    <!-- Turret pin flags -->
    <line x1="193" y1="170" x2="193" y2="155" stroke="#fcd34d" stroke-width="1.5" />
    <polygon points="193,155 205,160 193,165" fill="#f59e0b" />

    <!-- Central Grand Keep -->
    <rect x="235" y="240" width="80" height="140" fill="#0a0d1d" />
    <!-- Battlements -->
    <rect x="230" y="235" width="90" height="10" fill="#070914" />
    <rect x="240" y="230" width="10" height="6" fill="#070914" />
    <rect x="260" y="230" width="10" height="6" fill="#070914" />
    <rect x="280" y="230" width="10" height="6" fill="#070914" />
    <rect x="300" y="230" width="10" height="6" fill="#070914" />

    <!-- Tall Central Spires (Hogwarts Style) -->
    <polygon points="260,230 275,120 290,230" fill="#060812" />
    <line x1="275" y1="120" x2="275" y2="105" stroke="#fcd34d" stroke-width="1.5" />
    <polygon points="275,105 290,110 275,115" fill="#f59e0b" />

    <!-- Secondary slender spires -->
    <polygon points="238,240 248,160 258,240" fill="#070914" />
    <polygon points="295,240 305,175 315,240" fill="#070914" />

    <!-- Right Wing & Astronomy Tower -->
    <rect x="330" y="280" width="55" height="100" fill="#0a0d1d" />
    <polygon points="325,280 357,190 390,280" fill="#060812" />
    <rect x="395" y="320" width="40" height="70" fill="#0a0d1d" />
    <polygon points="390,320 415,250 440,320" fill="#060812" />

    <!-- Bridge / Viaduct arches -->
    <path d="M 120 420 L 170 420 L 170 470 Q 145 440 120 470 Z" fill="#0a0d1d" />

    <!-- Glowing Gothic Windows (Warm Amber Light) -->
    <g fill="#fbbf24" opacity="0.95">
      <!-- Main keep arched windows -->
      <path d="M 255 260 Q 260 252 265 260 L 265 285 L 255 285 Z" />
      <path d="M 285 260 Q 290 252 295 260 L 295 285 L 285 285 Z" />
      <path d="M 270 305 Q 275 298 280 305 L 280 325 L 270 325 Z" />
      <!-- Left tower window -->
      <path d="M 188 290 Q 193 284 198 290 L 198 310 L 188 310 Z" />
      <!-- Right tower windows -->
      <path d="M 352 300 Q 357 294 362 300 L 362 320 L 352 320 Z" />
      <path d="M 410 335 Q 415 330 420 335 L 420 355 L 410 355 Z" />
    </g>

    <!-- Mysterious Pine Forest Silhouettes at bottom & sides -->
    <g fill="#070913">
      <!-- Left pines -->
      <polygon points="20,600 35,460 50,600" />
      <polygon points="45,600 65,440 85,600" />
      <polygon points="75,600 95,470 115,600" />
      <polygon points="0,600 20,490 40,600" />
      <!-- Right pines -->
      <polygon points="500,600 525,450 550,600" />
      <polygon points="535,600 560,430 585,600" />
      <polygon points="565,600 585,470 605,600" />
    </g>

    <!-- Dark reflective mountain loch / water at base -->
    <rect x="0" y="520" width="${CELL_W}" height="80" fill="url(#c1_water)" />
    <!-- Water ripples catching moonlight -->
    <ellipse cx="360" cy="535" rx="90" ry="3" fill="#fef08a" opacity="0.3" />
    <ellipse cx="350" cy="550" rx="140" ry="4" fill="#fef08a" opacity="0.2" />
    <ellipse cx="370" cy="570" rx="180" ry="5" fill="#fef08a" opacity="0.15" />
    <ellipse cx="340" cy="588" rx="220" ry="5" fill="#fef08a" opacity="0.1" />

    <!-- Atmospheric mist in valley -->
    <path d="M 0 510 Q 150 495 300 515 Q 450 500 600 510 L 600 540 Q 380 520 0 540 Z" fill="#6366f1" opacity="0.18" />
  </g>

  <!-- =============================================================== -->
  <!-- ROW 1, COL 2 (600, 0): RUTA 2 · VILDA VÄSTERN & ÖKEN (33.33% 0%) -->
  <!-- =============================================================== -->
  <g transform="translate(600, 0)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c2_sky)" />

    <!-- Blazing Desert Sun -->
    <circle cx="300" cy="240" r="130" fill="url(#c2_sun)" opacity="0.5" />
    <circle cx="300" cy="240" r="70" fill="url(#c2_sun)" />
    <circle cx="300" cy="240" r="42" fill="#fffbeb" />

    <!-- Distant Desert Red Rock Mesas -->
    <polygon points="0,320 80,310 140,325 220,290 280,290 320,315 420,280 490,280 540,310 600,300 600,600 0,600" fill="#9a3412" opacity="0.75" />
    <!-- Midground Mesas & Canyon Bluffs -->
    <polygon points="0,360 60,360 90,380 180,340 270,340 310,375 410,345 500,345 550,380 600,355 600,600 0,600" fill="#7c2d12" />

    <!-- Desert Ground Plane -->
    <polygon points="0,440 600,420 600,600 0,600" fill="#431407" />

    <!-- Western Frontier Town Silhouettes (Saloon, Windmill, Buildings) -->
    <!-- Left building: 2-story Saloon -->
    <rect x="50" y="360" width="130" height="110" fill="#2d0c04" />
    <!-- False front peak -->
    <polygon points="50,360 115,330 180,360" fill="#2d0c04" />
    <!-- Porch roof -->
    <polygon points="40,410 190,410 180,420 50,420" fill="#1b0702" />
    <!-- Porch posts -->
    <line x1="55" y1="420" x2="55" y2="470" stroke="#1b0702" stroke-width="4" />
    <line x1="115" y1="420" x2="115" y2="470" stroke="#1b0702" stroke-width="4" />
    <line x1="175" y1="420" x2="175" y2="470" stroke="#1b0702" stroke-width="4" />
    <!-- Saloon Sign Silhouette -->
    <rect x="80" y="348" width="70" height="16" fill="#1b0702" rx="2" />
    <text x="115" y="360" font-family="serif" font-weight="900" font-size="10" fill="#fde047" text-anchor="middle" letter-spacing="1">SALOON</text>

    <!-- Western Wooden Windmill (Water Pump) -->
    <polygon points="215,460 225,350 235,350 245,460" fill="none" stroke="#2d0c04" stroke-width="3" />
    <line x1="220" y1="410" x2="240" y2="410" stroke="#2d0c04" stroke-width="2" />
    <line x1="223" y1="380" x2="237" y2="380" stroke="#2d0c04" stroke-width="2" />
    <!-- Windmill Blades -->
    <circle cx="230" cy="350" r="28" fill="none" stroke="#2d0c04" stroke-width="3" stroke-dasharray="6 6" />
    <circle cx="230" cy="350" r="5" fill="#fde047" />

    <!-- Hitching post with horse wagon wheel -->
    <line x1="190" y1="455" x2="215" y2="455" stroke="#1b0702" stroke-width="3" />
    <line x1="192" y1="455" x2="192" y2="475" stroke="#1b0702" stroke-width="3" />
    <line x1="213" y1="455" x2="213" y2="475" stroke="#1b0702" stroke-width="3" />
    <circle cx="160" cy="460" r="14" fill="none" stroke="#1b0702" stroke-width="2" />
    <line x1="146" y1="460" x2="174" y2="460" stroke="#1b0702" stroke-width="1.5" />
    <line x1="160" y1="446" x2="160" y2="474" stroke="#1b0702" stroke-width="1.5" />

    <!-- Iconic Saguaro Cacti (Right side and foreground) -->
    <!-- Large Saguaro Cactus Right -->
    <g fill="#1b0702">
      <!-- Main trunk -->
      <rect x="470" y="320" width="22" height="180" rx="11" />
      <!-- Left arm -->
      <path d="M 470 380 L 440 380 L 440 340 L 452 340 L 452 370 L 470 370 Z" />
      <!-- Right arm -->
      <path d="M 492 400 L 522 400 L 522 355 L 510 355 L 510 390 L 492 390 Z" />

      <!-- Medium Saguaro Cactus -->
      <rect x="545" y="390" width="16" height="110" rx="8" />
      <path d="M 545 435 L 530 435 L 530 410 L 538 410 L 538 427 L 545 427 Z" />
      <path d="M 561 445 L 575 445 L 575 425 L 568 425 L 568 438 L 561 438 Z" />

      <!-- Small Saguaro Foreground Left -->
      <rect x="25" y="440" width="14" height="90" rx="7" />
      <path d="M 39 475 L 50 475 L 50 455 L 45 455 L 45 470 L 39 470 Z" />
    </g>

    <!-- Prickly Pear Cactus & Desert Rocks -->
    <ellipse cx="380" cy="485" rx="16" ry="12" fill="#2d0c04" />
    <ellipse cx="392" cy="475" rx="14" ry="10" fill="#2d0c04" transform="rotate(25 392 475)" />
    <ellipse cx="368" cy="478" rx="13" ry="9" fill="#2d0c04" transform="rotate(-20 368 478)" />

    <!-- Tumbleweed -->
    <circle cx="330" cy="510" r="14" fill="none" stroke="#78350f" stroke-width="2.5" stroke-dasharray="4 3" />
    <circle cx="330" cy="510" r="9" fill="none" stroke="#92400e" stroke-width="2" stroke-dasharray="3 3" />

    <!-- Warm desert dust haze -->
    <rect x="0" y="470" width="${CELL_W}" height="130" fill="#f59e0b" opacity="0.12" />
  </g>

  <!-- ============================================================================== -->
  <!-- ROW 1, COL 3 (1200, 0): RUTA 3 · FÖRHISTORISK DJUNGEL & VATTENFALL (66.66% 0%) -->
  <!-- ============================================================================== -->
  <g transform="translate(1200, 0)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c3_sky)" />

    <!-- Tropical Sun / Mist Glow -->
    <circle cx="320" cy="180" r="80" fill="#fef08a" opacity="0.6" filter="url(#glow)" />

    <!-- Soaring Pterodactyl Silhouette in sky -->
    <g fill="#064e3b">
      <path d="M 170 120 Q 185 105 205 112 Q 195 125 185 123 Q 175 130 170 120 Z" />
      <path d="M 185 123 Q 170 108 150 115 Q 162 125 172 124 Z" />
      <!-- Crest & Beak -->
      <path d="M 178 116 L 190 100 L 180 114 L 165 118 Z" />
    </g>

    <!-- Prehistoric Volcanic Karst / Sugarloaf Mountains -->
    <path d="M 0 350 Q 70 200 130 180 Q 190 200 240 340 Q 300 160 360 140 Q 430 165 480 320 Q 540 220 600 240 L 600 600 L 0 600 Z" fill="#064e3b" opacity="0.8" />
    <path d="M 80 380 Q 160 240 220 220 Q 280 250 340 400 Q 400 260 470 240 Q 530 270 600 370 L 600 600 L 0 600 Z" fill="#022c22" />

    <!-- Aztec / El Dorado Golden Temple Ruins in distance -->
    <polygon points="120,340 140,310 180,310 200,340" fill="#78350f" />
    <polygon points="135,310 145,290 175,290 185,310" fill="#b45309" />
    <rect x="155" y="295" width="10" height="15" fill="#fde047" opacity="0.85" />

    <!-- Majestic Tiered Waterfall -->
    <!-- Cliff edge -->
    <polygon points="270,300 380,290 410,600 240,600" fill="#022c22" />
    <!-- Falling Water Stream -->
    <path d="M 310 290 Q 312 360 305 440 Q 300 500 295 600 L 355 600 Q 350 490 345 430 Q 348 350 340 290 Z" fill="url(#c3_waterfall)" />
    <!-- Water streaks -->
    <line x1="322" y1="300" x2="318" y2="580" stroke="#ffffff" stroke-width="2" opacity="0.8" />
    <line x1="335" y1="305" x2="332" y2="580" stroke="#ffffff" stroke-width="2.5" opacity="0.85" />
    <!-- Waterfall spray mist at bottom -->
    <ellipse cx="325" cy="560" rx="75" ry="35" fill="#ccfbf1" opacity="0.45" filter="url(#glow)" />
    <ellipse cx="325" cy="575" rx="100" ry="25" fill="#5eead4" opacity="0.35" />

    <!-- Turquoise Jungle River / Lagoon Pool -->
    <rect x="0" y="520" width="${CELL_W}" height="80" fill="#0f766e" />
    <ellipse cx="300" cy="560" rx="280" ry="25" fill="#14b8a6" opacity="0.5" />

    <!-- Giant Prehistoric Foliage & Palm Fronds (Left & Right framing) -->
    <!-- Left giant ferns & Monstera leaves -->
    <g fill="#065f46" stroke="#022c22" stroke-width="1.5">
      <path d="M 0 450 Q 80 430 110 390 Q 70 470 0 490 Z" fill="#047857" />
      <path d="M 0 480 Q 90 460 140 430 Q 80 500 0 530 Z" fill="#059669" />
      <path d="M 0 520 Q 110 510 160 480 Q 100 550 0 580 Z" fill="#10b981" />
      <!-- Palm trunk left -->
      <path d="M 20 600 Q 40 450 15 320" stroke="#451a03" stroke-width="12" fill="none" />
      <!-- Palm fronds spreading -->
      <path d="M 15 320 Q 60 280 110 300 Q 70 330 15 320 Z" fill="#059669" />
      <path d="M 15 320 Q -20 260 -60 280 Q -30 320 15 320 Z" fill="#047857" />
      <path d="M 15 320 Q 30 250 50 220 Q 10 270 15 320 Z" fill="#10b981" />
    </g>

    <!-- Right giant ferns & palms -->
    <g fill="#065f46">
      <path d="M 600 440 Q 510 420 470 380 Q 520 460 600 480 Z" fill="#047857" />
      <path d="M 600 490 Q 490 470 440 440 Q 510 520 600 540 Z" fill="#059669" />
      <!-- Palm trunk right -->
      <path d="M 580 600 Q 560 460 585 330" stroke="#451a03" stroke-width="12" fill="none" />
      <path d="M 585 330 Q 530 290 480 310 Q 525 340 585 330 Z" fill="#059669" />
      <path d="M 585 330 Q 630 270 670 290 Q 640 330 585 330 Z" fill="#047857" />
    </g>

    <!-- Tropical vines & jungle flowers -->
    <circle cx="130" cy="445" r="7" fill="#f43f5e" />
    <circle cx="475" cy="460" r="8" fill="#eab308" />
    <circle cx="160" cy="500" r="6" fill="#ec4899" />
  </g>

  <!-- =============================================================== -->
  <!-- ROW 1, COL 4 (1800, 0): RUTA 4 · VULKAN & GLÖDANDE LAVA (100% 0%) -->
  <!-- =============================================================== -->
  <g transform="translate(1800, 0)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c4_sky)" />

    <!-- Billowing Volcanic Smoke & Ash Plumes -->
    <circle cx="300" cy="140" r="95" fill="#27272a" opacity="0.9" />
    <circle cx="230" cy="170" r="75" fill="#3f3f46" opacity="0.85" />
    <circle cx="370" cy="160" r="80" fill="#18181b" opacity="0.9" />
    <circle cx="280" cy="80" r="85" fill="#18181b" opacity="0.8" />
    <circle cx="340" cy="70" r="75" fill="#27272a" opacity="0.75" />

    <!-- Fiery Crater Glow -->
    <ellipse cx="300" cy="220" rx="90" ry="30" fill="#f97316" filter="url(#glow)" />
    <ellipse cx="300" cy="220" rx="55" ry="16" fill="#fef08a" />

    <!-- Massive Volcano Cone (Mordor / Mount Doom style) -->
    <!-- Background mountain crags -->
    <polygon points="0,380 120,310 210,340 300,280 400,330 510,290 600,370 600,600 0,600" fill="#262626" />

    <!-- Main Active Volcano Mountain -->
    <polygon points="40,560 215,220 385,220 560,560 600,600 0,600" fill="#09090b" />

    <!-- Crater Rim & Throat -->
    <ellipse cx="300" cy="220" rx="85" ry="20" fill="#450a0a" stroke="#dc2626" stroke-width="3" />
    <ellipse cx="300" cy="222" rx="60" ry="12" fill="#ef4444" />
    <ellipse cx="300" cy="223" rx="35" ry="7" fill="#fef08a" />

    <!-- Braided Molten Lava Rivers cascading down the slopes -->
    <!-- Main Center Lava Flow -->
    <path d="M 300 230 Q 285 290 310 350 Q 290 410 325 470 Q 295 530 330 600 L 290 600 Q 260 530 285 470 Q 255 410 275 350 Q 265 290 280 230 Z" fill="url(#c4_lava)" filter="url(#glow)" />
    <!-- Left Lava Branch -->
    <path d="M 270 270 Q 220 330 200 400 Q 180 460 140 520 Q 120 560 90 600 L 115 600 Q 145 560 165 520 Q 200 460 220 400 Q 240 340 280 280 Z" fill="url(#c4_lava)" />
    <!-- Right Lava Branch -->
    <path d="M 330 260 Q 380 320 410 390 Q 430 450 470 520 Q 490 560 520 600 L 495 600 Q 465 560 440 520 Q 405 450 385 390 Q 360 330 320 270 Z" fill="url(#c4_lava)" />

    <!-- Cracks & Fissures Glowing with Magma -->
    <line x1="240" y1="370" x2="210" y2="390" stroke="#fbbf24" stroke-width="2.5" />
    <line x1="360" y1="380" x2="390" y2="400" stroke="#fbbf24" stroke-width="2.5" />
    <line x1="310" y1="440" x2="350" y2="460" stroke="#f97316" stroke-width="3" />
    <line x1="250" y1="490" x2="220" y2="520" stroke="#ef4444" stroke-width="3" />

    <!-- Floating Embers and Burning Sparks -->
    <g fill="#fbbf24" opacity="0.9">
      <circle cx="280" cy="180" r="3.5" filter="url(#glow)" />
      <circle cx="340" cy="160" r="4" filter="url(#glow)" />
      <circle cx="220" cy="140" r="2.5" />
      <circle cx="380" cy="120" r="3" />
      <circle cx="260" cy="110" r="2" />
      <circle cx="320" cy="90" r="2.5" />
      <circle cx="180" cy="210" r="3" />
      <circle cx="430" cy="190" r="3" />
      <circle cx="150" cy="350" r="2" />
      <circle cx="460" cy="370" r="2.5" />
    </g>

    <!-- Foreground Obsidian Rock Crags -->
    <polygon points="0,520 60,480 120,530 180,490 220,550 220,600 0,600" fill="#09090b" />
    <polygon points="400,550 450,490 510,540 560,470 600,510 600,600 400,600" fill="#09090b" />

    <!-- Hot Lava Lake at base -->
    <rect x="0" y="570" width="${CELL_W}" height="30" fill="#b91c1c" />
    <ellipse cx="300" cy="585" rx="260" ry="12" fill="#f97316" />
    <ellipse cx="300" cy="585" rx="140" ry="6" fill="#fef08a" />
  </g>

  <!-- ============================================================================== -->
  <!-- ROW 2, COL 1 (0, 600): RUTA 5 · SVENSK BARRSKOG & SPEGELBLANK SJÖ (0% 100%)    -->
  <!-- ============================================================================== -->
  <g transform="translate(0, 600)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c5_sky)" />

    <!-- Soft Golden Sunset Sun -->
    <circle cx="340" cy="240" r="50" fill="#fef08a" opacity="0.85" filter="url(#glow)" />

    <!-- Distant Blue Ridge Hills -->
    <path d="M 0 320 Q 90 290 180 305 Q 280 280 380 310 Q 480 290 600 315 L 600 600 L 0 600 Z" fill="#312e81" opacity="0.6" />
    <path d="M 0 350 Q 120 320 240 340 Q 360 325 480 345 Q 540 330 600 345 L 600 600 L 0 600 Z" fill="#1e1b4b" opacity="0.75" />

    <!-- Dense Layers of Nordic Pine & Spruce Trees -->
    <!-- Midground Forest Silhouette -->
    <g fill="#14532d">
      <polygon points="30,370 45,280 60,370" />
      <polygon points="55,370 70,265 85,370" />
      <polygon points="80,370 95,290 110,370" />
      <polygon points="105,370 120,270 135,370" />
      <polygon points="130,370 145,300 160,370" />
      <polygon points="170,370 185,260 200,370" />
      <polygon points="195,370 210,295 225,370" />
      <polygon points="220,370 235,275 250,370" />
      <!-- Forest trees behind cottage -->
      <polygon points="380,370 400,250 420,370" />
      <polygon points="410,370 430,240 450,370" />
      <polygon points="440,370 460,260 480,370" />
      <polygon points="470,370 490,245 510,370" />
      <polygon points="500,370 520,270 540,370" />
      <polygon points="530,370 550,255 570,370" />
      <polygon points="560,370 580,275 600,370" />
    </g>

    <!-- Mirror Lake Surface (Bottom Half) -->
    <rect x="0" y="370" width="${CELL_W}" height="230" fill="url(#c5_lake)" />

    <!-- Reflection of Sun & Sky in Water -->
    <g fill="#fef08a" opacity="0.35">
      <ellipse cx="340" cy="390" rx="30" ry="2.5" />
      <ellipse cx="340" cy="415" rx="55" ry="3.5" />
      <ellipse cx="340" cy="445" rx="80" ry="4" />
      <ellipse cx="340" cy="480" rx="110" ry="5" />
      <ellipse cx="340" cy="520" rx="140" ry="6" opacity="0.25" />
    </g>

    <!-- Forest shoreline promontory (Left and Right) -->
    <path d="M 0 370 Q 140 370 220 390 L 220 600 L 0 600 Z" fill="#052e16" />

    <!-- Foreground Grand Spruces (Left Promontory) -->
    <g fill="#022c22">
      <!-- Big spruce 1 -->
      <polygon points="15,480 40,230 65,480" />
      <polygon points="10,430 40,310 70,430" />
      <polygon points="5,480 40,370 75,480" />
      <rect x="36" y="480" width="8" height="40" fill="#451a03" />

      <!-- Big spruce 2 -->
      <polygon points="65,510 95,250 125,510" />
      <polygon points="60,450 95,330 130,450" />
      <polygon points="55,510 95,390 135,510" />
      <rect x="91" y="510" width="8" height="40" fill="#451a03" />

      <!-- Medium spruce 3 -->
      <polygon points="125,480 150,290 175,480" />
    </g>

    <!-- Right Shore with Idyllic Swedish Falu Red Stuga (Cottage) -->
    <path d="M 340 380 Q 420 370 600 370 L 600 600 L 340 600 Z" fill="#052e16" />

    <!-- Classic Falu Red Cottage -->
    <!-- Red walls -->
    <rect x="420" y="325" width="80" height="45" fill="#991b1b" />
    <!-- White Corner Trim -->
    <rect x="420" y="325" width="4" height="45" fill="#f8fafc" />
    <rect x="496" y="325" width="4" height="45" fill="#f8fafc" />
    <!-- Roof (Dark tiles / slate) -->
    <polygon points="410,325 460,285 510,325" fill="#18181b" />
    <polygon points="412,325 460,288 508,325" fill="#27272a" />
    <!-- White roof bargeboard -->
    <line x1="410" y1="325" x2="460" y2="285" stroke="#f8fafc" stroke-width="2.5" />
    <line x1="460" y1="285" x2="510" y2="325" stroke="#f8fafc" stroke-width="2.5" />
    <!-- Brick Chimney -->
    <rect x="475" y="275" width="10" height="20" fill="#7f1d1d" />
    <!-- Smoke puff -->
    <circle cx="480" cy="265" r="4" fill="#e2e8f0" opacity="0.6" />
    <circle cx="485" cy="255" r="6" fill="#e2e8f0" opacity="0.4" />
    <!-- Lit warm windows with cross frame -->
    <rect x="435" y="335" width="16" height="18" fill="#fef08a" stroke="#f8fafc" stroke-width="2" />
    <line x1="443" y1="335" x2="443" y2="353" stroke="#f8fafc" stroke-width="1.5" />
    <line x1="435" y1="344" x2="451" y2="344" stroke="#f8fafc" stroke-width="1.5" />
    <rect x="470" y="335" width="16" height="18" fill="#fef08a" stroke="#f8fafc" stroke-width="2" />
    <line x1="478" y1="335" x2="478" y2="353" stroke="#f8fafc" stroke-width="1.5" />
    <line x1="470" y1="344" x2="486" y2="344" stroke="#f8fafc" stroke-width="1.5" />

    <!-- Wooden Jetty (Brygga) extending into the lake -->
    <polygon points="360,400 410,390 410,396 360,406" fill="#78350f" />
    <!-- Jetty posts in water -->
    <line x1="370" y1="403" x2="370" y2="425" stroke="#451a03" stroke-width="3" />
    <line x1="395" y1="398" x2="395" y2="420" stroke="#451a03" stroke-width="3" />
    <!-- Small wooden rowing boat tied to jetty -->
    <path d="M 335 415 Q 355 425 375 415 Q 355 408 335 415 Z" fill="#b45309" stroke="#451a03" stroke-width="1.5" />
    <line x1="355" y1="412" x2="365" y2="402" stroke="#e2e8f0" stroke-width="1.5" />

    <!-- Lake shoreline reeds & water lilies -->
    <g stroke="#15803d" stroke-width="2">
      <line x1="210" y1="395" x2="208" y2="375" />
      <line x1="215" y1="398" x2="216" y2="372" />
      <line x1="222" y1="400" x2="225" y2="378" />
      <line x1="345" y1="390" x2="344" y2="370" />
      <line x1="350" y1="392" x2="352" y2="368" />
    </g>
  </g>

  <!-- ============================================================================== -->
  <!-- ROW 2, COL 2 (600, 600): RUTA 6 · SNÖIGA BERG, STUGA & NORRSKEN (33.33% 100%) -->
  <!-- ============================================================================== -->
  <g transform="translate(600, 600)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c6_sky)" />

    <!-- Stars -->
    <g fill="#ffffff" opacity="0.85">
      <circle cx="60" cy="50" r="1.5" />
      <circle cx="110" cy="110" r="1.8" />
      <circle cx="180" cy="65" r="1.2" />
      <circle cx="260" cy="40" r="2" />
      <circle cx="340" cy="90" r="1.4" />
      <circle cx="420" cy="55" r="1.7" />
      <circle cx="510" cy="85" r="2.2" />
      <circle cx="560" cy="45" r="1.3" />
      <circle cx="480" cy="140" r="1.2" opacity="0.6" />
    </g>

    <!-- Magical Aurora Borealis Curtains (Norrsken) -->
    <path d="M 0 160 Q 140 70 280 130 Q 420 190 600 90 L 600 170 Q 420 250 280 190 Q 140 130 0 220 Z" fill="url(#c6_aurora1)" filter="url(#auroraGlow)" />
    <path d="M 0 110 Q 160 180 320 100 Q 460 30 600 130 L 600 180 Q 460 90 320 160 Q 160 230 0 160 Z" fill="url(#c6_aurora2)" filter="url(#auroraGlow)" />
    <!-- Fine vertical aurora drapery rays -->
    <g stroke="#34d399" stroke-width="2" opacity="0.4">
      <line x1="120" y1="80" x2="120" y2="180" />
      <line x1="160" y1="100" x2="160" y2="210" />
      <line x1="220" y1="90" x2="220" y2="200" />
      <line x1="300" y1="110" x2="300" y2="220" />
      <line x1="380" y1="80" x2="380" y2="190" />
      <line x1="450" y1="70" x2="450" y2="170" />
    </g>

    <!-- Majestic Alpine Peaks Covered in Snow & Ice -->
    <polygon points="0,380 90,240 180,360 290,210 400,340 500,230 600,350 600,600 0,600" fill="#0f172a" />
    <!-- Snow caps on mountain peaks -->
    <polygon points="90,240 70,270 90,265 110,275" fill="#f8fafc" />
    <polygon points="290,210 260,255 285,248 300,260 320,250" fill="#f8fafc" />
    <polygon points="500,230 475,265 495,258 525,270" fill="#f8fafc" />
    <!-- Snow shadows -->
    <polygon points="90,240 110,275 90,300" fill="#94a3b8" opacity="0.6" />
    <polygon points="290,210 320,250 290,290" fill="#94a3b8" opacity="0.6" />

    <!-- Rolling Snowdrifts (Midground) -->
    <path d="M 0 420 Q 150 370 300 410 Q 450 380 600 420 L 600 600 L 0 600 Z" fill="#e2e8f0" />
    <path d="M 0 470 Q 180 430 360 480 Q 480 450 600 470 L 600 600 L 0 600 Z" fill="#f1f5f9" />

    <!-- Heavy Snow-Laden Fir Trees -->
    <g fill="#0f172a">
      <!-- Left pine trees -->
      <polygon points="25,480 45,340 65,480" />
      <polygon points="55,500 80,360 105,500" />
      <!-- Snow on branches -->
      <polygon points="45,340 35,370 55,370" fill="#ffffff" />
      <polygon points="45,380 30,420 60,420" fill="#ffffff" />
      <polygon points="45,430 25,470 65,470" fill="#ffffff" />
      <!-- Pine 2 snow -->
      <polygon points="80,360 70,390 90,390" fill="#ffffff" />
      <polygon points="80,400 65,440 95,440" fill="#ffffff" />
      <!-- Right pine trees behind cabin -->
      <polygon points="480,480 505,350 530,480" />
      <polygon points="505,350 495,380 515,380" fill="#ffffff" />
      <polygon points="520,490 545,370 570,490" />
    </g>

    <!-- Cozy Timber Log Cabin (Nordpolen / Tomtens verkstad / Alpine refuge) -->
    <!-- Log cabin walls -->
    <rect x="330" y="420" width="100" height="60" fill="#451a03" rx="2" />
    <!-- Horizontal log lines -->
    <line x1="330" y1="432" x2="430" y2="432" stroke="#291002" stroke-width="2" />
    <line x1="330" y1="444" x2="430" y2="444" stroke="#291002" stroke-width="2" />
    <line x1="330" y1="456" x2="430" y2="456" stroke="#291002" stroke-width="2" />
    <line x1="330" y1="468" x2="430" y2="468" stroke="#291002" stroke-width="2" />

    <!-- Thick Snow-Covered Gable Roof -->
    <polygon points="315,420 380,365 445,420" fill="#78350f" />
    <!-- Heavy white snow blanket on roof -->
    <path d="M 310 422 L 380 360 L 450 422 Q 430 415 410 420 Q 380 412 350 420 Q 330 415 310 422 Z" fill="#ffffff" />

    <!-- Chimney & Smoke -->
    <rect x="405" y="355" width="14" height="24" fill="#b91c1c" />
    <path d="M 412 355 Q 418 335 410 320 Q 402 305 415 290 Q 425 275 418 260" stroke="#f1f5f9" stroke-width="5" fill="none" opacity="0.75" />

    <!-- Glowing Warm Amber Windows -->
    <rect x="345" y="435" width="22" height="22" fill="#fbbf24" filter="url(#glow)" stroke="#78350f" stroke-width="2" />
    <line x1="356" y1="435" x2="356" y2="457" stroke="#78350f" stroke-width="1.5" />
    <line x1="345" y1="446" x2="367" y2="446" stroke="#78350f" stroke-width="1.5" />
    <!-- Wooden door -->
    <rect x="390" y="440" width="22" height="40" fill="#291002" />
    <circle cx="407" cy="460" r="2" fill="#fbbf24" />

    <!-- Magical Victorian Street Lamp (Narnia / North Pole Lantern) -->
    <!-- Warm amber lantern glow -->
    <circle cx="210" cy="430" r="45" fill="#fef08a" opacity="0.35" filter="url(#glow)" />
    <circle cx="210" cy="430" r="16" fill="#fef08a" opacity="0.8" />
    <!-- Ornate black cast iron post -->
    <line x1="210" y1="420" x2="210" y2="520" stroke="#0f172a" stroke-width="4" />
    <!-- Lantern top & glass -->
    <polygon points="202,425 218,425 215,440 205,440" fill="#fbbf24" stroke="#0f172a" stroke-width="1.5" />
    <polygon points="200,425 210,412 220,425" fill="#0f172a" />
    <circle cx="210" cy="410" r="3" fill="#0f172a" />
    <!-- Little snow cap on top of lamp -->
    <ellipse cx="210" cy="411" rx="6" ry="2.5" fill="#ffffff" />
    <!-- Golden light pool on snow below lamp -->
    <ellipse cx="210" cy="520" rx="35" ry="8" fill="#fde047" opacity="0.45" />

    <!-- Foreground Snowbank -->
    <path d="M 0 540 Q 200 510 400 550 Q 520 530 600 550 L 600 600 L 0 600 Z" fill="#ffffff" />
  </g>

  <!-- ============================================================================== -->
  <!-- ROW 2, COL 3 (1200, 600): RUTA 7 · SOLIG KUST, HAV & GRÖNA KULLAR (66.66% 100%) -->
  <!-- ============================================================================== -->
  <g transform="translate(1200, 600)">
    <!-- Sky -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c7_sky)" />

    <!-- Radiant Summer Sun -->
    <circle cx="440" cy="110" r="55" fill="#fef08a" filter="url(#glow)" />
    <circle cx="440" cy="110" r="36" fill="#ffffff" />

    <!-- White Puffy Summer Clouds -->
    <g fill="#ffffff" opacity="0.9">
      <ellipse cx="120" cy="90" rx="45" ry="18" />
      <ellipse cx="150" cy="80" rx="35" ry="24" />
      <ellipse cx="180" cy="92" rx="30" ry="16" />

      <ellipse cx="290" cy="130" rx="40" ry="15" opacity="0.75" />
      <ellipse cx="315" cy="122" rx="30" ry="20" opacity="0.75" />
    </g>

    <!-- Deep Blue Ocean Horizon -->
    <rect x="0" y="240" width="${CELL_W}" height="240" fill="url(#c7_sea)" />

    <!-- Distant Sailboat on Horizon -->
    <polygon points="170,238 178,218 178,238" fill="#ffffff" />
    <polygon points="180,238 185,224 180,224" fill="#ffffff" />
    <polygon points="166,238 188,238 184,242 170,242" fill="#0f172a" />

    <!-- Rolling Turquoise Waves with White Foam Crests -->
    <g fill="none" stroke="#e0f2fe" stroke-width="2.5" opacity="0.8">
      <path d="M 40 280 Q 90 270 140 280 Q 190 290 240 280" />
      <path d="M 280 295 Q 340 285 400 295 Q 460 305 520 295" />
      <path d="M 10 330 Q 70 318 130 330 Q 190 342 250 330" />
      <path d="M 220 350 Q 290 335 360 350 Q 430 365 500 350" />
    </g>

    <!-- Golden Sand Beach Cove -->
    <path d="M 0 380 Q 180 340 320 370 Q 440 400 600 370 L 600 600 L 0 600 Z" fill="#fef3c7" />
    <path d="M 0 395 Q 180 360 320 385 Q 440 415 600 385 L 600 600 L 0 600 Z" fill="#fde68a" />

    <!-- Gotland / Bohuslän Limestone Raukar (Sea Stacks in water) -->
    <!-- Raukar 1 (Left) -->
    <polygon points="60,370 70,300 85,295 95,315 105,305 115,370" fill="#78716c" />
    <polygon points="68,302 85,295 95,315 102,308" fill="#d6d3d1" />
    <ellipse cx="88" cy="370" rx="32" ry="6" fill="#e0f2fe" opacity="0.7" />

    <!-- Raukar 2 (Smaller stack) -->
    <polygon points="130,360 138,320 148,315 155,360" fill="#57534e" />
    <polygon points="136,322 148,315 152,330" fill="#a8a29e" />

    <!-- High Green Coastal Bluff / Cliff (Right Headland) -->
    <path d="M 320 600 L 320 420 Q 380 360 450 330 Q 520 300 600 280 L 600 600 Z" fill="#15803d" />
    <path d="M 320 420 Q 380 360 450 330 L 450 600 L 320 600 Z" fill="#b45309" opacity="0.8" />
    <!-- Cliff top grass -->
    <path d="M 360 380 Q 440 320 600 280 L 600 310 Q 440 345 360 400 Z" fill="#22c55e" />

    <!-- Red-and-White Striped Maritime Lighthouse (Öland / Gotland / Coast) -->
    <!-- Lighthouse Base & Tower -->
    <polygon points="500,320 508,200 522,200 530,320" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
    <!-- Red stripes -->
    <polygon points="503,285 506,255 524,255 527,285" fill="#dc2626" />
    <polygon points="507,225 509,205 521,205 523,225" fill="#dc2626" />
    <!-- Lantern Room & Black Dome Roof -->
    <rect x="506" y="190" width="18" height="12" fill="#fef08a" stroke="#0f172a" stroke-width="1.5" />
    <polygon points="503,190 515,178 527,190" fill="#0f172a" />
    <!-- Balcony Railing -->
    <line x1="503" y1="200" x2="527" y2="200" stroke="#0f172a" stroke-width="2" />
    <!-- Lighthouse yellow beacon beam -->
    <polygon points="515,195 200,160 200,230" fill="#fef08a" opacity="0.35" />

    <!-- Mediterranean Cypress Trees on coastal ridge -->
    <g fill="#14532d">
      <ellipse cx="440" cy="340" rx="8" ry="28" />
      <ellipse cx="456" cy="330" rx="9" ry="32" />
      <ellipse cx="470" cy="345" rx="7" ry="24" />
    </g>

    <!-- Foreground Sand Dunes & Beach Grass -->
    <path d="M 0 490 Q 150 460 320 510 Q 460 480 600 520 L 600 600 L 0 600 Z" fill="#fef08a" />
    <g stroke="#15803d" stroke-width="2.5">
      <line x1="60" y1="510" x2="52" y2="475" />
      <line x1="65" y1="515" x2="68" y2="470" />
      <line x1="72" y1="512" x2="80" y2="478" />

      <line x1="220" y1="520" x2="212" y2="480" />
      <line x1="227" y1="525" x2="230" y2="475" />
      <line x1="235" y1="522" x2="245" y2="485" />
    </g>
  </g>

  <!-- ============================================================================== -->
  <!-- ROW 2, COL 4 (1800, 600): RUTA 8 · MÅNYTA, RYMDBAS & FRAMTIDSMILJÖ (100% 100%) -->
  <!-- ============================================================================== -->
  <g transform="translate(1800, 600)">
    <!-- Sky / Cosmic Space -->
    <rect width="${CELL_W}" height="${CELL_H}" fill="url(#c8_sky)" />

    <!-- Shimmering Starfield & Nebula Glow -->
    <!-- Purple/Cyan Nebula Dust -->
    <ellipse cx="360" cy="120" rx="180" ry="70" fill="#c026d3" opacity="0.15" filter="url(#glow)" />
    <ellipse cx="220" cy="180" rx="140" ry="60" fill="#06b6d4" opacity="0.12" filter="url(#glow)" />

    <g fill="#ffffff">
      <circle cx="40" cy="30" r="1.5" />
      <circle cx="90" cy="80" r="1.8" />
      <circle cx="150" cy="45" r="2.2" />
      <circle cx="210" cy="110" r="1.2" opacity="0.7" />
      <circle cx="280" cy="50" r="1.6" />
      <circle cx="340" cy="95" r="2" />
      <circle cx="430" cy="40" r="1.4" />
      <circle cx="490" cy="110" r="2.4" />
      <circle cx="550" cy="65" r="1.7" />
      <circle cx="580" cy="130" r="1.3" opacity="0.6" />
      <circle cx="70" cy="160" r="1.2" />
      <circle cx="510" cy="170" r="1.5" />
    </g>

    <!-- Earthrise (Glowing Blue Marble of Earth over lunar horizon) -->
    <!-- Earth Atmosphere Halo -->
    <circle cx="220" cy="140" r="62" fill="#38bdf8" opacity="0.35" filter="url(#glow)" />
    <circle cx="220" cy="140" r="48" fill="url(#c8_earth)" />
    <!-- Continents & Swirling White Clouds -->
    <path d="M 195 125 Q 215 115 235 128 Q 220 145 195 125 Z" fill="#22c55e" opacity="0.7" />
    <path d="M 210 145 Q 235 140 245 155 Q 225 165 210 145 Z" fill="#22c55e" opacity="0.65" />
    <path d="M 185 130 Q 220 120 250 135" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.8" />
    <path d="M 195 150 Q 225 155 255 148" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.85" />

    <!-- Desolate Lunar Horizon & Crater Ridges -->
    <polygon points="0,340 80,310 160,330 260,290 380,315 480,280 600,320 600,600 0,600" fill="#1e293b" />
    <!-- Midground Crater Rims -->
    <path d="M 0 380 Q 140 330 280 370 Q 440 340 600 370 L 600 600 L 0 600 Z" fill="#334155" />
    <ellipse cx="140" cy="385" rx="55" ry="14" fill="#1e293b" stroke="#64748b" stroke-width="2" />
    <ellipse cx="460" cy="390" rx="75" ry="18" fill="#1e293b" stroke="#64748b" stroke-width="2.5" />

    <!-- High-Tech Lunar Base / Bio-Dome Complex -->
    <!-- Geodesic Bio-Dome with Glowing Hydroponic Interior -->
    <ellipse cx="330" cy="410" rx="55" ry="35" fill="#047857" opacity="0.85" stroke="#38bdf8" stroke-width="2.5" />
    <!-- Dome lattice grid -->
    <line x1="330" y1="375" x2="330" y2="445" stroke="#67e8f9" stroke-width="1.5" opacity="0.8" />
    <line x1="285" y1="410" x2="375" y2="410" stroke="#67e8f9" stroke-width="1.5" opacity="0.8" />
    <path d="M 295 395 Q 330 385 365 395" stroke="#67e8f9" stroke-width="1.5" fill="none" opacity="0.8" />
    <circle cx="330" cy="405" r="14" fill="#a7f3d0" opacity="0.6" filter="url(#glow)" />

    <!-- Pressurized Cylindrical Habitat Modules -->
    <rect x="235" y="415" width="60" height="28" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
    <rect x="375" y="418" width="55" height="25" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
    <!-- Connecting tunnel tubes -->
    <rect x="290" y="425" width="45" height="10" fill="#94a3b8" />
    <rect x="365" y="425" width="20" height="10" fill="#94a3b8" />
    <!-- Glowing cyber windows -->
    <rect x="245" y="422" width="12" height="8" rx="2" fill="#38bdf8" />
    <rect x="265" y="422" width="12" height="8" rx="2" fill="#38bdf8" />
    <rect x="385" y="425" width="10" height="7" rx="2" fill="#fbbf24" />
    <rect x="402" y="425" width="10" height="7" rx="2" fill="#fbbf24" />

    <!-- Communications Radar Dish & Antenna Spire -->
    <line x1="450" y1="380" x2="450" y2="435" stroke="#f8fafc" stroke-width="2.5" />
    <ellipse cx="450" cy="380" rx="18" ry="7" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" transform="rotate(-30 450 380)" />
    <!-- Red blinking beacon on mast -->
    <circle cx="450" cy="365" r="3" fill="#ef4444" filter="url(#glow)" />

    <!-- Futuristic Solar Panel Arrays -->
    <polygon points="175,415 220,410 215,445 170,450" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
    <line x1="197" y1="412" x2="192" y2="447" stroke="#60a5fa" stroke-width="1" />
    <line x1="172" y1="432" x2="218" y2="427" stroke="#60a5fa" stroke-width="1" />

    <!-- Lunar Camper / Exploration Rover Vehicle (Foreground Left) -->
    <g transform="translate(60, 470)">
      <!-- Chassis / Body -->
      <polygon points="10,25 70,25 80,45 5,45" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
      <!-- Cockpit Windshield (Cyber Cyan Glow) -->
      <polygon points="50,28 68,28 75,42 50,42" fill="#38bdf8" opacity="0.9" filter="url(#glow)" />
      <!-- Big Lunar Mesh Rover Wheels -->
      <circle cx="20" cy="52" r="14" fill="#0f172a" stroke="#94a3b8" stroke-width="3" />
      <circle cx="20" cy="52" r="5" fill="#f8fafc" />
      <circle cx="68" cy="52" r="14" fill="#0f172a" stroke="#94a3b8" stroke-width="3" />
      <circle cx="68" cy="52" r="5" fill="#f8fafc" />
      <!-- Roof Rack / Solar Roof -->
      <rect x="15" y="18" width="45" height="5" fill="#3b82f6" rx="2" />
      <!-- Bright Headlight Beams illuminating moon dust -->
      <polygon points="75,38 180,25 180,65" fill="#fef08a" opacity="0.4" />
    </g>

    <!-- Foreground Crater Field & Moon Dust Ground -->
    <path d="M 0 490 Q 200 450 400 480 Q 520 465 600 485 L 600 600 L 0 600 Z" fill="url(#c8_lunar)" />
    <!-- Impact Crater Foreground Right -->
    <ellipse cx="480" cy="535" rx="90" ry="24" fill="#0f172a" stroke="#475569" stroke-width="3" />
    <ellipse cx="485" cy="540" rx="70" ry="16" fill="#020617" />
  </g>
</svg>`;
}

async function buildGrid() {
  const svg = generateSvg();
  const outputPath = path.resolve(__dirname, '../public/backgrounds/themes-grid.jpg');

  console.log('Rendering 4x2 themes grid SVG with sharp...');
  await sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4'
    })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

buildGrid().catch(err => {
  console.error('Error generating themes-grid.jpg:', err);
  process.exit(1);
});
