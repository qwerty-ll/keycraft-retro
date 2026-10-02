// Слои клавиатуры KeyCraft Retro 75 для 3D-героя (viewBox 520×140)

// Обводка слоя: терракотовая и толще, когда слой выбран
const outline = (isHighlighted, color, width = 1.5, activeWidth = 3) => ({
  stroke: isHighlighted ? '#C2622D' : color,
  strokeWidth: isHighlighted ? activeWidth : width,
});

// Общая обёртка для всех слоёв
const Svg = ({ children, height = 140 }) => (
  <svg viewBox={`0 0 520 ${height}`} className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// ---------- Слой 1: кейкапы ----------
// стиль клавиши: [градиент, размер шрифта, цвет подписи]
const KEY_STYLES = {
  top: ['keycapTopGrad', 8, '#42382C'],
  mod: ['keycapModGrad', 7.5, '#5A4E3E'],
  mod7: ['keycapModGrad', 7, '#5A4E3E'],
  fn: ['keycapModGrad', 7, '#6B5B49'],
  sage: ['keycapSageGrad', 7, '#FFF'],
  sageSm: ['keycapSageGrad', 6.5, '#FFF'],
  sageLg: ['keycapSageGrad', 8, '#FFF'],
  accent: ['keycapAccentGrad', 7, '#FFF'],
  accentLg: ['keycapAccentGrad', 8, '#FFF'],
};

// ряд обычных клавиш шириной 23.5 с шагом 27
const letters = (x0, chars) => [...chars].map((c, i) => [x0 + i * 27, 23.5, 'top', c]);

// ряды: y, высота, базовая линия текста, клавиши [x, ширина, стиль, подпись]
const KEY_ROWS = [
  {
    y: 10, h: 18, ty: 22,
    keys: [
      ...[44, 148, 252].flatMap((x0, g) => [0, 1, 2, 3].map((i) => [x0 + i * 25, 22, 'fn', `F${g * 4 + i + 1}`])),
      [356, 22, 'sageSm', 'PS'], [381, 22, 'sageSm', 'SL'], [406, 22, 'sageSm', 'PAU'], [431, 30, 'accent', 'DEL'],
    ],
  },
  {
    y: 33, h: 19, ty: 46,
    keys: [...letters(14, '~1234567890-='), [365, 45, 'mod', 'BACKSPACE'], [414, 28, 'sage', 'HOME']],
  },
  {
    y: 56, h: 19, ty: 69,
    keys: [[14, 35, 'mod', 'TAB'], ...letters(53, 'QWERTYUIOP[]'), [377, 33, 'top', '\\'], [414, 28, 'sage', 'PGUP']],
  },
  {
    y: 79, h: 19, ty: 92,
    keys: [[14, 41, 'mod', 'CAPS'], ...letters(59, "ASDFGHJKL;'"), [356, 54, 'accentLg', 'ENTER ↵'], [414, 28, 'sage', 'PGDN']],
  },
  {
    y: 102, h: 21, ty: 116,
    keys: [
      [14, 31, 'mod7', 'CTRL'], [49, 27, 'mod7', 'WIN'], [80, 27, 'mod7', 'ALT'], 'space',
      [295, 26, 'mod7', 'ALT'], [325, 26, 'mod7', 'FN'], [355, 26, 'mod7', 'CTRL'],
      [386, 23, 'sageLg', '←'], [413, 23, 'sageLg', '↓'], [440, 23, 'sageLg', '→'],
    ],
  },
];

// Подпись на клавише
function KeyLabel({ x, y, size, color, children }) {
  return (
    <text x={x} y={y} fontFamily="monospace" fontSize={size} fontWeight="bold" fill={color} textAnchor="middle">
      {children}
    </text>
  );
}

// Один ряд клавиш с тенью
function KeyRow({ y, h, ty, keys, prefix, children }) {
  return (
    <g filter="url(#keyGlow)">
      {prefix}
      {keys.map((key, i) => {
        if (key === 'space') {
          return (
            <g key={i}>
              <rect x="111" y={y} width="180" height={h} rx="4" fill="url(#keycapTopGrad)"/>
              <line x1="180" y1="112" x2="220" y2="112" stroke="#DFD4C0" strokeWidth="1.2" strokeLinecap="round"/>
            </g>
          );
        }
        const [x, w, style, label] = key;
        const [grad, size, color] = KEY_STYLES[style];
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="3.5" fill={`url(#${grad})`}/>
            <KeyLabel x={x + w / 2} y={ty} size={size} color={color}>{label}</KeyLabel>
          </g>
        );
      })}
      {children}
    </g>
  );
}

// Слой 1: кейкапы
export function LayerKeycapsSvg({ isHighlighted }) {
  const [row1, ...rows] = KEY_ROWS;
  return (
    <Svg>
      <defs>
        <linearGradient id="keycapTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#F4ECE1"/>
        </linearGradient>
        <linearGradient id="keycapModGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EFE5D5"/>
          <stop offset="100%" stopColor="#DDD0BC"/>
        </linearGradient>
        <linearGradient id="keycapAccentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D8713D"/>
          <stop offset="100%" stopColor="#B35322"/>
        </linearGradient>
        <linearGradient id="keycapSageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8BAFA4"/>
          <stop offset="100%" stopColor="#6C8F84"/>
        </linearGradient>
        <radialGradient id="brassKnobGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF2D1"/>
          <stop offset="45%" stopColor="#E2BD68"/>
          <stop offset="85%" stopColor="#A88029"/>
          <stop offset="100%" stopColor="#694C12"/>
        </radialGradient>
        <filter id="keyGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#998A78" floodOpacity="0.4"/>
        </filter>
      </defs>

      <rect x="3" y="3" width="514" height="134" rx="10" fill="#EDE5D8" {...outline(isHighlighted, '#D4C7B5')}/>

      {/* Ряд 1: ESC, F-клавиши, навигация и латунный энкодер */}
      <KeyRow
        {...row1}
        prefix={<>
          <rect x="14" y="10" width="24" height="18" rx="3.5" fill="url(#keycapAccentGrad)"/>
          <rect x="16" y="11" width="20" height="14" rx="2" fill="#C2622D" opacity="0.35"/>
          <KeyLabel x={26} y={22} size={7.5} color="#FFF">ESC</KeyLabel>
        </>}
      >
        <circle cx="488" cy="19" r="11" fill="url(#brassKnobGrad)" stroke="#785918" strokeWidth="1.2"/>
        <circle cx="488" cy="19" r="8" fill="#B38933" stroke="#85621C" strokeWidth="0.8"/>
        <circle cx="488" cy="13" r="1.6" fill="#FFF" opacity="0.9"/>
      </KeyRow>

      {rows.map((row) => <KeyRow key={row.y} {...row} />)}
    </Svg>
  );
}

// ---------- Слой 2: свитчи ----------
export function LayerSwitchesSvg({ isHighlighted }) {
  // Координаты каждого свитча на плате
  const switchPositions = [
    // ряд 1
    [15, 11], [44, 11], [69, 11], [94, 11], [119, 11], [148, 11], [173, 11], [198, 11], [223, 11], [252, 11], [277, 11], [302, 11], [327, 11], [356, 11], [381, 11], [406, 11], [436, 11],
    // ряд 2
    [15, 34], [42, 34], [69, 34], [96, 34], [123, 34], [150, 34], [177, 34], [204, 34], [231, 34], [258, 34], [285, 34], [312, 34], [339, 34], [376, 34], [417, 34],
    // ряд 3
    [15, 57], [48, 57], [75, 57], [102, 57], [129, 57], [156, 57], [183, 57], [210, 57], [237, 57], [264, 57], [291, 57], [318, 57], [345, 57], [386, 57], [417, 57],
    // ряд 4
    [15, 80], [52, 80], [79, 80], [106, 80], [133, 80], [160, 80], [187, 80], [214, 80], [241, 80], [268, 80], [295, 80], [322, 80], [375, 80], [417, 80],
    // ряд 5
    [15, 103], [48, 103], [79, 103], [140, 103], [200, 103], [260, 103], [298, 103], [327, 103], [356, 103], [388, 103], [415, 103], [442, 103]
  ];

  return (
    <Svg>
      <defs>
        <linearGradient id="switchHousingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#302C2A"/>
          <stop offset="100%" stopColor="#151413"/>
        </linearGradient>
        <radialGradient id="stemGoldGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF1B8"/>
          <stop offset="50%" stopColor="#E2C178"/>
          <stop offset="100%" stopColor="#A37E26"/>
        </radialGradient>
      </defs>

      {/* Тёмная подложка под свитчи */}
      <rect x="3" y="3" width="514" height="134" rx="10" fill="#181615" fillOpacity="0.88" {...outline(isHighlighted, '#3E3834')}/>

      {/* Механизм крутилки громкости */}
      <g transform="translate(476, 8)">
        <rect x="0" y="0" width="24" height="22" rx="4" fill="#24211F" stroke="#4A423C" strokeWidth="1"/>
        <circle cx="12" cy="11" r="7" fill="#C59638" stroke="#8A6518" strokeWidth="1"/>
        <circle cx="12" cy="11" r="3" fill="#1C1815"/>
      </g>

      {/* Рисуем каждый свитч по координатам */}
      {switchPositions.map(([x, y], idx) => (
        <g key={idx} transform={`translate(${x}, ${y})`}>
          {/* Корпус свитча */}
          <rect x="0" y="0" width="20" height="17" rx="3" fill="url(#switchHousingGrad)" stroke="#4A4440" strokeWidth="0.8"/>
          {/* Защёлки крышки */}
          <rect x="2" y="0.5" width="3" height="1.5" rx="0.5" fill="#58514C"/>
          <rect x="15" y="0.5" width="3" height="1.5" rx="0.5" fill="#58514C"/>
          {/* Гнездо штока */}
          <rect x="5.5" y="4" width="9" height="9" rx="1.5" fill="#0E0D0C" stroke="#2B2725" strokeWidth="0.6"/>
          {/* Золотой крестик штока */}
          <circle cx="10" cy="8.5" r="3.2" fill="url(#stemGoldGrad)"/>
          <path d="M8 8.5 L12 8.5 M10 6.5 L10 10.5" stroke="#4A340C" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      ))}

      {/* Стабилизатор пробела */}
      <rect x="120" y="108" width="160" height="6" rx="2" fill="#24211F" stroke="#E2C178" strokeWidth="0.8" strokeDasharray="4 2"/>
    </Svg>
  );
}

// ---------- Слой 3: латунный плейт ----------
const GASKET_X = [65, 175, 305, 415];

// вырезы под свитчи: [y, [x | [x, ширина]]], ширина по умолчанию 18
const PLATE_CUTOUTS = [
  [12, [0, 28, 53, 78, 103, 132, 157, 182, 207, 236, 261, 286, 311, 340, 365, 390, 418]],
  [35, [0, 27, 54, 81, 108, 135, 162, 189, 216, 243, 270, 297, 324, [360, 22], 417]],
  [58, [[0, 22], 35, 62, 89, 116, 143, 170, 197, 224, 251, 278, 305, 332, [372, 20], 417]],
  [81, [[0, 24], 40, 67, 94, 121, 148, 175, 202, 229, 256, 283, 310, [366, 24], 417]],
  [104, [[0, 22], [32, 20], [62, 20], [95, 185], [290, 20], [319, 20], [348, 20], 380, 408, 435]],
];

export function LayerBrassPlateSvg({ isHighlighted }) {
  return (
    <Svg>
      <defs>
        <linearGradient id="brassPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2CC"/>
          <stop offset="25%" stopColor="#E5C16C"/>
          <stop offset="60%" stopColor="#C99834"/>
          <stop offset="90%" stopColor="#9E701B"/>
          <stop offset="100%" stopColor="#6E4D0E"/>
        </linearGradient>
        <linearGradient id="gasketSiliconeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E87A5D"/>
          <stop offset="100%" stopColor="#AF4A30"/>
        </linearGradient>
      </defs>

      {/* Силиконовые «ушки» Gasket Mount по краям */}
      <g fill="url(#gasketSiliconeGrad)" stroke="#7A2B18" strokeWidth="0.6">
        {GASKET_X.flatMap((x) => [0, 134].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="28" height="6" rx="2"/>))}
        {[0, 514].flatMap((x) => [44, 84].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="22" rx="2"/>))}
      </g>

      {/* Сама латунная пластина */}
      <rect x="5" y="4" width="510" height="132" rx="8" fill="url(#brassPlateGrad)" {...outline(isHighlighted, '#8A6318')}/>

      {/* Блик по фаске */}
      <rect x="7" y="6" width="506" height="128" rx="6" fill="none" stroke="#FFF7D9" strokeWidth="0.8" opacity="0.6"/>

      {/* Вырезы под свитчи */}
      <g fill="#16130F" stroke="#7A5814" strokeWidth="0.7">
        {PLATE_CUTOUTS.map(([y, holes]) => (
          <g key={y} transform={`translate(16, ${y})`}>
            {holes.map((h) => {
              const [x, w] = Array.isArray(h) ? h : [h, 18];
              return <rect key={x} x={x} y="0" width={w} height="15" rx="2"/>;
            })}
            {y === 12 && <circle cx="472" cy="7" r="8" fill="#16130F" stroke="#7A5814"/>}
          </g>
        ))}
      </g>

      {/* Гравировка на пластине */}
      <text x="260" y="130" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#755210" textAnchor="middle" letterSpacing="1">
        PRECISION CNC BRASS PLATE 1.5MM • GASKET ISOLATED
      </text>
    </Svg>
  );
}

// ---------- Слой 4: шумоизоляция Poron ----------
export function LayerPoronFoamSvg({ isHighlighted }) {
  return (
    <Svg>
      <defs>
        <linearGradient id="poronFoamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3C3936"/>
          <stop offset="50%" stopColor="#292624"/>
          <stop offset="100%" stopColor="#1B1A19"/>
        </linearGradient>
        <pattern id="poronCells" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1" fill="#151413" opacity="0.6"/>
        </pattern>
      </defs>

      {/* Оранжевые демпферы по краям */}
      <g fill="#D98A32">
        {GASKET_X.flatMap((x) => [1, 134].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="28" height="5" rx="1.5"/>))}
      </g>

      {/* Лист пороновой шумоизоляции */}
      <rect x="6" y="5" width="508" height="130" rx="8" fill="url(#poronFoamGrad)" {...outline(isHighlighted, '#4E4844')}/>

      {/* Текстура пор (узор из точек) */}
      <rect x="8" y="7" width="504" height="126" rx="6" fill="url(#poronCells)"/>

      {/* Отверстия под ножки свитчей */}
      <g fill="#100F0E" opacity="0.9">
        {[18, 44, 70, 95, 120, 148, 174, 200, 226, 252, 278, 304, 330, 360, 390, 420].map((cx, i) => (
          <g key={i}>
            {[18, 42, 66, 90].map((cy) => <circle key={cy} cx={cx} cy={cy} r="3.5"/>)}
          </g>
        ))}
        {/* Вырез под пробел */}
        <rect x="120" y="108" width="160" height="8" rx="3" fill="#100F0E"/>
        <circle cx="395" cy="112" r="3.5"/>
        <circle cx="422" cy="112" r="3.5"/>
        <circle cx="450" cy="112" r="3.5"/>
      </g>

      {/* Надпись на поролоне */}
      <text x="260" y="74" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#7D746D" textAnchor="middle" letterSpacing="2">
        JAPANESE PORON® XRD • 3.5MM ACOUSTIC ISOLATION
      </text>
    </Svg>
  );
}

// ---------- Слой 5: печатная плата ----------
export function LayerPcbSvg({ isHighlighted }) {
  return (
    <Svg>
      <defs>
        <linearGradient id="pcbSubstrateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252A30"/>
          <stop offset="60%" stopColor="#181B1F"/>
          <stop offset="100%" stopColor="#0F1113"/>
        </linearGradient>
        <linearGradient id="goldTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFE49E"/>
          <stop offset="50%" stopColor="#D4AA50"/>
          <stop offset="100%" stopColor="#8A6A22"/>
        </linearGradient>
      </defs>

      {/* Разъём USB-C */}
      <rect x="25" y="0" width="20" height="6" rx="2" fill="#B4BAC2" stroke="#5E656E" strokeWidth="0.8"/>
      <rect x="28" y="2" width="14" height="2" rx="0.5" fill="#151719"/>

      {/* Сама плата */}
      <rect x="5" y="4" width="510" height="132" rx="8" fill="url(#pcbSubstrateGrad)" {...outline(isHighlighted, '#3E4652')}/>

      {/* Золотые дорожки */}
      <g stroke="url(#goldTraceGrad)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <path d="M45 8 L110 8 L130 28 L470 28"/>
        <path d="M45 12 L105 12 L125 32 L470 32"/>
        <path d="M45 16 L100 16 L120 36 L470 36"/>
        <path d="M55 46 L160 46 L180 66 L450 66"/>
        <path d="M55 72 L210 72 L230 92 L460 92"/>
        <path d="M65 96 L270 96 L290 116 L440 116"/>
        <path d="M140 36 L140 120"/>
        <path d="M260 32 L260 120"/>
        <path d="M380 28 L380 120"/>
      </g>

      {/* Микроконтроллер */}
      <rect x="75" y="52" width="26" height="26" rx="2.5" fill="#0A0B0D" stroke="#D4AA50" strokeWidth="0.9"/>
      <circle cx="81" cy="58" r="1.5" fill="#D4AA50"/>
      <text x="88" y="67" fontFamily="monospace" fontSize="5" fontWeight="bold" fill="#D4AA50" textAnchor="middle">ARM</text>

      {/* Хот-свап сокеты: 15 столбцов × 4 ряда */}
      <g fill="#0B0C0E" stroke="#D4AA50" strokeWidth="0.6">
        {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440].map((x, i) => (
          <g key={i}>
            {[16, 40, 64, 88].map((y) => (
              <g key={y}>
                <rect x={x} y={y} width="13" height="8" rx="2"/>
                <circle cx={x + 3.5} cy={y + 4} r="1.2" fill="#FFE49E"/>
                <circle cx={x + 9.5} cy={y + 4} r="1.2" fill="#FFE49E"/>
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Надпись на плате */}
      <text x="270" y="128" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#D4AA50" textAnchor="middle" letterSpacing="1.2">
        KEYCRAFT RETRO 75 PCB • ENIG GOLD PLATING • QMK / VIA READY
      </text>
    </Svg>
  );
}

// ---------- Слой 6: корпус из ореха ----------
export function LayerWalnutCaseSvg({ isHighlighted }) {
  return (
    <Svg height={156}>
      <defs>
        <linearGradient id="walnutTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A5632"/>
          <stop offset="25%" stopColor="#673C1E"/>
          <stop offset="70%" stopColor="#4A2813"/>
          <stop offset="100%" stopColor="#2D1609"/>
        </linearGradient>
        <linearGradient id="walnutSideBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A2813"/>
          <stop offset="40%" stopColor="#321A0B"/>
          <stop offset="100%" stopColor="#1C0E06"/>
        </linearGradient>
        <linearGradient id="cavityInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E0E05"/>
          <stop offset="100%" stopColor="#0F0602"/>
        </linearGradient>
        <linearGradient id="brassWeightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF2CC"/>
          <stop offset="25%" stopColor="#E5C16C"/>
          <stop offset="70%" stopColor="#B88A28"/>
          <stop offset="100%" stopColor="#7A5612"/>
        </linearGradient>
        <filter id="caseDepthShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#150802" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Передний торец корпуса (толщина дерева) */}
      <path d="M 6 128 L 6 146 Q 6 154 16 154 L 504 154 Q 514 154 514 146 L 514 128 Z" fill="url(#walnutSideBevelGrad)" {...outline(isHighlighted, '#140A04', 1.2, 2.5)}/>
      {/* Текстура дерева на торце */}
      <path d="M 12 144 Q 260 148 508 143" stroke="#5A3217" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* Верх корпуса из ореха */}
      <rect x="2" y="2" width="516" height="136" rx="12" fill="url(#walnutTopGrad)" {...outline(isHighlighted, '#1C0D05', 2, 3)} filter="url(#caseDepthShadow)"/>

      {/* Волокна дерева */}
      <g stroke="#A26B43" strokeWidth="1.2" opacity="0.35" fill="none" strokeLinecap="round">
        <path d="M12 24 Q260 16 508 26"/>
        <path d="M18 50 Q240 42 502 52"/>
        <path d="M10 80 Q270 72 510 84"/>
        <path d="M14 108 Q250 100 506 112"/>
        <path d="M16 126 Q260 120 504 128"/>
      </g>

      {/* Блик по краю */}
      <rect x="5" y="5" width="510" height="130" rx="9" fill="none" stroke="#D19468" strokeWidth="0.8" opacity="0.45"/>

      {/* Внутренняя полость корпуса */}
      <rect x="14" y="12" width="492" height="116" rx="8" fill="url(#cavityInnerGrad)" stroke="#3D200F" strokeWidth="1.5"/>

      {/* Латунный утяжелитель с надписью */}
      <rect x="145" y="44" width="230" height="52" rx="6" fill="url(#brassWeightGrad)" stroke="#694C12" strokeWidth="1.5"/>
      <rect x="149" y="48" width="222" height="44" rx="4" fill="none" stroke="#FFF7D9" strokeWidth="0.8" opacity="0.6"/>

      <text x="260" y="68" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#2E1B04" textAnchor="middle" letterSpacing="2">
        KEYCRAFT RETRO 75
      </text>
      <text x="260" y="82" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#4D3008" textAnchor="middle" letterSpacing="1">
        SOLID AMERICAN WALNUT • TOTAL MASS 1850G
      </text>

      {/* Стойки крепления */}
      {[18, 112].flatMap((y) => [22, 480].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="18" height="8" rx="2" fill="#282420" stroke="#12100E" strokeWidth="0.8"/>
      )))}

      {/* Вырез под кабель */}
      <rect x="28" y="9" width="24" height="6" rx="1.5" fill="#0A0502"/>
    </Svg>
  );
}
