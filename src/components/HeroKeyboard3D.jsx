import React from 'react';

export function LayerKeycapsSvg({ isHighlighted }) {
  return (
    <svg viewBox="0 0 520 140" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Layer border outline with subtle bevel */}
      <rect 
        x="3" 
        y="3" 
        width="514" 
        height="134" 
        rx="10" 
        fill="#EDE5D8" 
        stroke={isHighlighted ? '#C2622D' : '#D4C7B5'} 
        strokeWidth={isHighlighted ? 3 : 1.5}
      />

      {/* Row 1: Function Keys + Knob */}
      <g filter="url(#keyGlow)">
        {/* ESC Key - Terracotta Accent */}
        <rect x="14" y="10" width="24" height="18" rx="3.5" fill="url(#keycapAccentGrad)"/>
        <rect x="16" y="11" width="20" height="14" rx="2" fill="#C2622D" opacity="0.35"/>
        <text x="26" y="22" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#FFF" textAnchor="middle">ESC</text>

        {/* F1 - F4 */}
        <rect x="44" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="55" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F1</text>
        <rect x="69" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="80" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F2</text>
        <rect x="94" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="105" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F3</text>
        <rect x="119" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="130" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F4</text>

        {/* F5 - F8 */}
        <rect x="148" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="159" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F5</text>
        <rect x="173" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="184" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F6</text>
        <rect x="198" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="209" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F7</text>
        <rect x="223" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="234" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F8</text>

        {/* F9 - F12 */}
        <rect x="252" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="263" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F9</text>
        <rect x="277" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="288" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F10</text>
        <rect x="302" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="313" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F11</text>
        <rect x="327" y="10" width="22" height="18" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="338" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#6B5B49" textAnchor="middle">F12</text>

        {/* Navigation Cluster: PrtSc, Pause, Del */}
        <rect x="356" y="10" width="22" height="18" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="367" y="22" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#FFF" textAnchor="middle">PS</text>
        <rect x="381" y="10" width="22" height="18" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="392" y="22" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#FFF" textAnchor="middle">SL</text>
        <rect x="406" y="10" width="22" height="18" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="417" y="22" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#FFF" textAnchor="middle">PAU</text>
        <rect x="431" y="10" width="30" height="18" rx="3.5" fill="url(#keycapAccentGrad)"/>
        <text x="446" y="22" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">DEL</text>

        {/* Milled Brass Rotary Knob */}
        <circle cx="488" cy="19" r="11" fill="url(#brassKnobGrad)" stroke="#785918" strokeWidth="1.2"/>
        <circle cx="488" cy="19" r="8" fill="#B38933" stroke="#85621C" strokeWidth="0.8"/>
        <circle cx="488" cy="13" r="1.6" fill="#FFF" opacity="0.9"/>
      </g>

      {/* Row 2: Numbers */}
      <g filter="url(#keyGlow)">
        {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((char, i) => (
          <g key={i}>
            <rect x={14 + i * 27} y="33" width="23.5" height="19" rx="3.5" fill="url(#keycapTopGrad)"/>
            <text x={25.75 + i * 27} y="46" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#42382C" textAnchor="middle">{char}</text>
          </g>
        ))}
        {/* Backspace */}
        <rect x="365" y="33" width="45" height="19" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="387.5" y="46" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">BACKSPACE</text>
        {/* Home */}
        <rect x="414" y="33" width="28" height="19" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="428" y="46" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">HOME</text>
      </g>

      {/* Row 3: QWERTY */}
      <g filter="url(#keyGlow)">
        {/* TAB */}
        <rect x="14" y="56" width="35" height="19" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="31.5" y="69" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">TAB</text>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map((char, i) => (
          <g key={i}>
            <rect x={53 + i * 27} y="56" width="23.5" height="19" rx="3.5" fill="url(#keycapTopGrad)"/>
            <text x={64.75 + i * 27} y="69" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#42382C" textAnchor="middle">{char}</text>
          </g>
        ))}
        <rect x="377" y="56" width="33" height="19" rx="3.5" fill="url(#keycapTopGrad)"/>
        <text x="393.5" y="69" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#42382C" textAnchor="middle">\</text>
        {/* PgUp */}
        <rect x="414" y="56" width="28" height="19" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="428" y="69" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">PGUP</text>
      </g>

      {/* Row 4: ASDF */}
      <g filter="url(#keyGlow)">
        {/* CAPS */}
        <rect x="14" y="79" width="41" height="19" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="34.5" y="92" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">CAPS</text>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''].map((char, i) => (
          <g key={i}>
            <rect x={59 + i * 27} y="79" width="23.5" height="19" rx="3.5" fill="url(#keycapTopGrad)"/>
            <text x={70.75 + i * 27} y="92" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#42382C" textAnchor="middle">{char}</text>
          </g>
        ))}
        {/* ENTER - Terracotta Accent */}
        <rect x="356" y="79" width="54" height="19" rx="3.5" fill="url(#keycapAccentGrad)"/>
        <text x="383" y="92" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#FFF" textAnchor="middle">ENTER ↵</text>
        {/* PgDn */}
        <rect x="414" y="79" width="28" height="19" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="428" y="92" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">PGDN</text>
      </g>

      {/* Row 5: Bottom row + Spacebar + Arrows */}
      <g filter="url(#keyGlow)">
        <rect x="14" y="102" width="31" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="29.5" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">CTRL</text>

        <rect x="49" y="102" width="27" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="62.5" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">WIN</text>

        <rect x="80" y="102" width="27" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="93.5" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">ALT</text>

        {/* Spacebar */}
        <rect x="111" y="102" width="180" height="21" rx="4" fill="url(#keycapTopGrad)"/>
        <line x1="180" y1="112" x2="220" y2="112" stroke="#DFD4C0" strokeWidth="1.2" strokeLinecap="round"/>

        <rect x="295" y="102" width="26" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="308" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">ALT</text>

        <rect x="325" y="102" width="26" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="338" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">FN</text>

        <rect x="355" y="102" width="26" height="21" rx="3.5" fill="url(#keycapModGrad)"/>
        <text x="368" y="116" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#5A4E3E" textAnchor="middle">CTRL</text>

        {/* Arrow Keys */}
        <rect x="386" y="102" width="23" height="21" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="397.5" y="116" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#FFF" textAnchor="middle">←</text>

        <rect x="413" y="102" width="23" height="21" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="424.5" y="116" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#FFF" textAnchor="middle">↓</text>

        <rect x="440" y="102" width="23" height="21" rx="3.5" fill="url(#keycapSageGrad)"/>
        <text x="451.5" y="116" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#FFF" textAnchor="middle">→</text>
      </g>
    </svg>
  );
}

export function LayerSwitchesSvg({ isHighlighted }) {
  // Generates matrix of individual Gateron Oil King mechanical switches
  const switchPositions = [
    // Row 1
    [15, 11], [44, 11], [69, 11], [94, 11], [119, 11], [148, 11], [173, 11], [198, 11], [223, 11], [252, 11], [277, 11], [302, 11], [327, 11], [356, 11], [381, 11], [406, 11], [436, 11],
    // Row 2
    [15, 34], [42, 34], [69, 34], [96, 34], [123, 34], [150, 34], [177, 34], [204, 34], [231, 34], [258, 34], [285, 34], [312, 34], [339, 34], [376, 34], [417, 34],
    // Row 3
    [15, 57], [48, 57], [75, 57], [102, 57], [129, 57], [156, 57], [183, 57], [210, 57], [237, 57], [264, 57], [291, 57], [318, 57], [345, 57], [386, 57], [417, 57],
    // Row 4
    [15, 80], [52, 80], [79, 80], [106, 80], [133, 80], [160, 80], [187, 80], [214, 80], [241, 80], [268, 80], [295, 80], [322, 80], [375, 80], [417, 80],
    // Row 5
    [15, 103], [48, 103], [79, 103], [140, 103], [200, 103], [260, 103], [298, 103], [327, 103], [356, 103], [388, 103], [415, 103], [442, 103]
  ];

  return (
    <svg viewBox="0 0 520 140" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Translucent switch carrier plate background */}
      <rect 
        x="3" 
        y="3" 
        width="514" 
        height="134" 
        rx="10" 
        fill="#181615" 
        fillOpacity="0.88"
        stroke={isHighlighted ? '#C2622D' : '#3E3834'} 
        strokeWidth={isHighlighted ? 3 : 1.5}
      />

      {/* Rotary encoder mechanism */}
      <g transform="translate(476, 8)">
        <rect x="0" y="0" width="24" height="22" rx="4" fill="#24211F" stroke="#4A423C" strokeWidth="1"/>
        <circle cx="12" cy="11" r="7" fill="#C59638" stroke="#8A6518" strokeWidth="1"/>
        <circle cx="12" cy="11" r="3" fill="#1C1815"/>
      </g>

      {/* Individual Gateron Switches */}
      {switchPositions.map(([x, y], idx) => (
        <g key={idx} transform={`translate(${x}, ${y})`}>
          {/* Switch outer housing */}
          <rect x="0" y="0" width="20" height="17" rx="3" fill="url(#switchHousingGrad)" stroke="#4A4440" strokeWidth="0.8"/>
          {/* Top cover latch notches */}
          <rect x="2" y="0.5" width="3" height="1.5" rx="0.5" fill="#58514C"/>
          <rect x="15" y="0.5" width="3" height="1.5" rx="0.5" fill="#58514C"/>
          {/* POM stem well */}
          <rect x="5.5" y="4" width="9" height="9" rx="1.5" fill="#0E0D0C" stroke="#2B2725" strokeWidth="0.6"/>
          {/* Golden POM stem cross (+) */}
          <circle cx="10" cy="8.5" r="3.2" fill="url(#stemGoldGrad)"/>
          <path d="M8 8.5 L12 8.5 M10 6.5 L10 10.5" stroke="#4A340C" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      ))}

      {/* Stabilizers on Spacebar & large keys */}
      <rect x="120" y="108" width="160" height="6" rx="2" fill="#24211F" stroke="#E2C178" strokeWidth="0.8" strokeDasharray="4 2"/>
    </svg>
  );
}

export function LayerBrassPlateSvg({ isHighlighted }) {
  return (
    <svg viewBox="0 0 520 140" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Perimeter Gasket Mount Silicone Dampening Tabs */}
      <g fill="url(#gasketSiliconeGrad)" stroke="#7A2B18" strokeWidth="0.6">
        <rect x="65" y="0" width="28" height="6" rx="2"/>
        <rect x="175" y="0" width="28" height="6" rx="2"/>
        <rect x="305" y="0" width="28" height="6" rx="2"/>
        <rect x="415" y="0" width="28" height="6" rx="2"/>
        <rect x="65" y="134" width="28" height="6" rx="2"/>
        <rect x="175" y="134" width="28" height="6" rx="2"/>
        <rect x="305" y="134" width="28" height="6" rx="2"/>
        <rect x="415" y="134" width="28" height="6" rx="2"/>
        <rect x="0" y="44" width="6" height="22" rx="2"/>
        <rect x="0" y="84" width="6" height="22" rx="2"/>
        <rect x="514" y="44" width="6" height="22" rx="2"/>
        <rect x="514" y="84" width="6" height="22" rx="2"/>
      </g>

      {/* Main CNC Brass Plate Body */}
      <rect 
        x="5" 
        y="4" 
        width="510" 
        height="132" 
        rx="8" 
        fill="url(#brassPlateGrad)" 
        stroke={isHighlighted ? '#C2622D' : '#8A6318'} 
        strokeWidth={isHighlighted ? 3 : 1.5}
      />

      {/* Inner chamfer highlight line */}
      <rect x="7" y="6" width="506" height="128" rx="6" fill="none" stroke="#FFF7D9" strokeWidth="0.8" opacity="0.6"/>

      {/* Precision Switch Cutout Holes */}
      <g fill="#16130F" stroke="#7A5814" strokeWidth="0.7">
        {/* Row 1 Cutouts */}
        <g transform="translate(16, 12)">
          <rect x="0" y="0" width="18" height="15" rx="2"/>
          <rect x="28" y="0" width="18" height="15" rx="2"/>
          <rect x="53" y="0" width="18" height="15" rx="2"/>
          <rect x="78" y="0" width="18" height="15" rx="2"/>
          <rect x="103" y="0" width="18" height="15" rx="2"/>
          <rect x="132" y="0" width="18" height="15" rx="2"/>
          <rect x="157" y="0" width="18" height="15" rx="2"/>
          <rect x="182" y="0" width="18" height="15" rx="2"/>
          <rect x="207" y="0" width="18" height="15" rx="2"/>
          <rect x="236" y="0" width="18" height="15" rx="2"/>
          <rect x="261" y="0" width="18" height="15" rx="2"/>
          <rect x="286" y="0" width="18" height="15" rx="2"/>
          <rect x="311" y="0" width="18" height="15" rx="2"/>
          <rect x="340" y="0" width="18" height="15" rx="2"/>
          <rect x="365" y="0" width="18" height="15" rx="2"/>
          <rect x="390" y="0" width="18" height="15" rx="2"/>
          <rect x="418" y="0" width="18" height="15" rx="2"/>
          <circle cx="472" cy="7" r="8" fill="#16130F" stroke="#7A5814"/>
        </g>

        {/* Row 2 Cutouts */}
        <g transform="translate(16, 35)">
          <rect x="0" y="0" width="18" height="15" rx="2"/>
          <rect x="27" y="0" width="18" height="15" rx="2"/>
          <rect x="54" y="0" width="18" height="15" rx="2"/>
          <rect x="81" y="0" width="18" height="15" rx="2"/>
          <rect x="108" y="0" width="18" height="15" rx="2"/>
          <rect x="135" y="0" width="18" height="15" rx="2"/>
          <rect x="162" y="0" width="18" height="15" rx="2"/>
          <rect x="189" y="0" width="18" height="15" rx="2"/>
          <rect x="216" y="0" width="18" height="15" rx="2"/>
          <rect x="243" y="0" width="18" height="15" rx="2"/>
          <rect x="270" y="0" width="18" height="15" rx="2"/>
          <rect x="297" y="0" width="18" height="15" rx="2"/>
          <rect x="324" y="0" width="18" height="15" rx="2"/>
          <rect x="360" y="0" width="22" height="15" rx="2"/>
          <rect x="417" y="0" width="18" height="15" rx="2"/>
        </g>

        {/* Row 3 Cutouts */}
        <g transform="translate(16, 58)">
          <rect x="0" y="0" width="22" height="15" rx="2"/>
          <rect x="35" y="0" width="18" height="15" rx="2"/>
          <rect x="62" y="0" width="18" height="15" rx="2"/>
          <rect x="89" y="0" width="18" height="15" rx="2"/>
          <rect x="116" y="0" width="18" height="15" rx="2"/>
          <rect x="143" y="0" width="18" height="15" rx="2"/>
          <rect x="170" y="0" width="18" height="15" rx="2"/>
          <rect x="197" y="0" width="18" height="15" rx="2"/>
          <rect x="224" y="0" width="18" height="15" rx="2"/>
          <rect x="251" y="0" width="18" height="15" rx="2"/>
          <rect x="278" y="0" width="18" height="15" rx="2"/>
          <rect x="305" y="0" width="18" height="15" rx="2"/>
          <rect x="332" y="0" width="18" height="15" rx="2"/>
          <rect x="372" y="0" width="20" height="15" rx="2"/>
          <rect x="417" y="0" width="18" height="15" rx="2"/>
        </g>

        {/* Row 4 Cutouts */}
        <g transform="translate(16, 81)">
          <rect x="0" y="0" width="24" height="15" rx="2"/>
          <rect x="40" y="0" width="18" height="15" rx="2"/>
          <rect x="67" y="0" width="18" height="15" rx="2"/>
          <rect x="94" y="0" width="18" height="15" rx="2"/>
          <rect x="121" y="0" width="18" height="15" rx="2"/>
          <rect x="148" y="0" width="18" height="15" rx="2"/>
          <rect x="175" y="0" width="18" height="15" rx="2"/>
          <rect x="202" y="0" width="18" height="15" rx="2"/>
          <rect x="229" y="0" width="18" height="15" rx="2"/>
          <rect x="256" y="0" width="18" height="15" rx="2"/>
          <rect x="283" y="0" width="18" height="15" rx="2"/>
          <rect x="310" y="0" width="18" height="15" rx="2"/>
          <rect x="366" y="0" width="24" height="15" rx="2"/>
          <rect x="417" y="0" width="18" height="15" rx="2"/>
        </g>

        {/* Row 5 Spacebar & Modifiers Cutouts */}
        <g transform="translate(16, 104)">
          <rect x="0" y="0" width="22" height="15" rx="2"/>
          <rect x="32" y="0" width="20" height="15" rx="2"/>
          <rect x="62" y="0" width="20" height="15" rx="2"/>
          {/* Long Spacebar opening */}
          <rect x="95" y="0" width="185" height="15" rx="2"/>
          <rect x="290" y="0" width="20" height="15" rx="2"/>
          <rect x="319" y="0" width="20" height="15" rx="2"/>
          <rect x="348" y="0" width="20" height="15" rx="2"/>
          <rect x="380" y="0" width="18" height="15" rx="2"/>
          <rect x="408" y="0" width="18" height="15" rx="2"/>
          <rect x="435" y="0" width="18" height="15" rx="2"/>
        </g>
      </g>

      {/* Engraved brass plate specification */}
      <text x="260" y="130" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#755210" textAnchor="middle" letterSpacing="1">
        PRECISION CNC BRASS PLATE 1.5MM • GASKET ISOLATED
      </text>
    </svg>
  );
}

export function LayerPoronFoamSvg({ isHighlighted }) {
  return (
    <svg viewBox="0 0 520 140" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Gasket damper perimeter wings */}
      <g fill="#D98A32">
        <rect x="65" y="1" width="28" height="5" rx="1.5"/>
        <rect x="175" y="1" width="28" height="5" rx="1.5"/>
        <rect x="305" y="1" width="28" height="5" rx="1.5"/>
        <rect x="415" y="1" width="28" height="5" rx="1.5"/>
        <rect x="65" y="134" width="28" height="5" rx="1.5"/>
        <rect x="175" y="134" width="28" height="5" rx="1.5"/>
        <rect x="305" y="134" width="28" height="5" rx="1.5"/>
        <rect x="415" y="134" width="28" height="5" rx="1.5"/>
      </g>

      {/* Poron Foam Sheet */}
      <rect 
        x="6" 
        y="5" 
        width="508" 
        height="130" 
        rx="8" 
        fill="url(#poronFoamGrad)" 
        stroke={isHighlighted ? '#C2622D' : '#4E4844'} 
        strokeWidth={isHighlighted ? 3 : 1.5}
      />

      {/* Micro-cellular acoustic texture overlay */}
      <rect x="8" y="7" width="504" height="126" rx="6" fill="url(#poronCells)"/>

      {/* Pin pass-through acoustic cutouts */}
      <g fill="#100F0E" opacity="0.9">
        {[18, 44, 70, 95, 120, 148, 174, 200, 226, 252, 278, 304, 330, 360, 390, 420].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="18" r="3.5"/>
            <circle cx={cx} cy="42" r="3.5"/>
            <circle cx={cx} cy="66" r="3.5"/>
            <circle cx={cx} cy="90" r="3.5"/>
          </g>
        ))}
        {/* Spacebar cutout */}
        <rect x="120" y="108" width="160" height="8" rx="3" fill="#100F0E"/>
        <circle cx="395" cy="112" r="3.5"/>
        <circle cx="422" cy="112" r="3.5"/>
        <circle cx="450" cy="112" r="3.5"/>
      </g>

      {/* Acoustic Foam Stamp */}
      <text x="260" y="74" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#7D746D" textAnchor="middle" letterSpacing="2">
        JAPANESE PORON® XRD • 3.5MM ACOUSTIC ISOLATION
      </text>
    </svg>
  );
}

export function LayerPcbSvg({ isHighlighted }) {
  return (
    <svg viewBox="0 0 520 140" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* USB-C Connector Port at Top-Left */}
      <rect x="25" y="0" width="20" height="6" rx="2" fill="#B4BAC2" stroke="#5E656E" strokeWidth="0.8"/>
      <rect x="28" y="2" width="14" height="2" rx="0.5" fill="#151719"/>

      {/* FR-4 PCB Board */}
      <rect 
        x="5" 
        y="4" 
        width="510" 
        height="132" 
        rx="8" 
        fill="url(#pcbSubstrateGrad)" 
        stroke={isHighlighted ? '#C2622D' : '#3E4652'} 
        strokeWidth={isHighlighted ? 3 : 1.5}
      />

      {/* Intricate Gold Bus Traces (Immersion Gold ENIG) */}
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

      {/* Microcontroller & Surface Mount Components */}
      <rect x="75" y="52" width="26" height="26" rx="2.5" fill="#0A0B0D" stroke="#D4AA50" strokeWidth="0.9"/>
      <circle cx="81" cy="58" r="1.5" fill="#D4AA50"/>
      <text x="88" y="67" fontFamily="monospace" fontSize="5" fontWeight="bold" fill="#D4AA50" textAnchor="middle">ARM</text>

      {/* Hot-Swap Sockets Matrix (TTC 5-pin Sockets) */}
      <g fill="#0B0C0E" stroke="#D4AA50" strokeWidth="0.6">
        {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440].map((x, i) => (
          <g key={i}>
            <rect x={x} y="16" width="13" height="8" rx="2"/>
            <circle cx={x + 3.5} cy="20" r="1.2" fill="#FFE49E"/>
            <circle cx={x + 9.5} cy="20" r="1.2" fill="#FFE49E"/>

            <rect x={x} y="40" width="13" height="8" rx="2"/>
            <circle cx={x + 3.5} cy="44" r="1.2" fill="#FFE49E"/>
            <circle cx={x + 9.5} cy="44" r="1.2" fill="#FFE49E"/>

            <rect x={x} y="64" width="13" height="8" rx="2"/>
            <circle cx={x + 3.5} cy="68" r="1.2" fill="#FFE49E"/>
            <circle cx={x + 9.5} cy="68" r="1.2" fill="#FFE49E"/>

            <rect x={x} y="88" width="13" height="8" rx="2"/>
            <circle cx={x + 3.5} cy="92" r="1.2" fill="#FFE49E"/>
            <circle cx={x + 9.5} cy="92" r="1.2" fill="#FFE49E"/>
          </g>
        ))}
      </g>

      {/* Golden Silkscreen Certification */}
      <text x="270" y="128" fontFamily="monospace" fontSize="6.5" fontWeight="bold" fill="#D4AA50" textAnchor="middle" letterSpacing="1.2">
        KEYCRAFT RETRO 75 PCB • ENIG GOLD PLATING • QMK / VIA READY
      </text>
    </svg>
  );
}

export function LayerWalnutCaseSvg({ isHighlighted }) {
  return (
    <svg viewBox="0 0 520 156" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
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

      {/* 3D Bottom/Front Beveled Wooden Apron (thickness of the solid wood block) */}
      <path 
        d="M 6 128 L 6 146 Q 6 154 16 154 L 504 154 Q 514 154 514 146 L 514 128 Z" 
        fill="url(#walnutSideBevelGrad)"
        stroke={isHighlighted ? '#C2622D' : '#140A04'}
        strokeWidth={isHighlighted ? 2.5 : 1.2}
      />
      {/* Wood grain along bottom apron */}
      <path d="M 12 144 Q 260 148 508 143" stroke="#5A3217" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* Solid Walnut Wood Top Surface (Chassis) */}
      <rect 
        x="2"
        y="2"
        width="516" 
        height="136" 
        rx="12" 
        fill="url(#walnutTopGrad)" 
        stroke={isHighlighted ? '#C2622D' : '#1C0D05'} 
        strokeWidth={isHighlighted ? 3 : 2}
        filter="url(#caseDepthShadow)"
      />

      {/* Organic Wood Grain Lines on Top Face */}
      <g stroke="#A26B43" strokeWidth="1.2" opacity="0.35" fill="none" strokeLinecap="round">
        <path d="M12 24 Q260 16 508 26"/>
        <path d="M18 50 Q240 42 502 52"/>
        <path d="M10 80 Q270 72 510 84"/>
        <path d="M14 108 Q250 100 506 112"/>
        <path d="M16 126 Q260 120 504 128"/>
      </g>

      {/* Outer Chamfer Edge Highlight */}
      <rect x="5" y="5" width="510" height="130" rx="9" fill="none" stroke="#D19468" strokeWidth="0.8" opacity="0.45"/>

      {/* Machined Deep Internal Acoustic Cavity */}
      <rect x="14" y="12" width="492" height="116" rx="8" fill="url(#cavityInnerGrad)" stroke="#3D200F" strokeWidth="1.5"/>

      {/* Centered Inlaid Heavy Brass Counterweight */}
      <rect x="145" y="44" width="230" height="52" rx="6" fill="url(#brassWeightGrad)" stroke="#694C12" strokeWidth="1.5"/>
      <rect x="149" y="48" width="222" height="44" rx="4" fill="none" stroke="#FFF7D9" strokeWidth="0.8" opacity="0.6"/>

      <text x="260" y="68" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#2E1B04" textAnchor="middle" letterSpacing="2">
        KEYCRAFT RETRO 75
      </text>
      <text x="260" y="82" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#4D3008" textAnchor="middle" letterSpacing="1">
        SOLID AMERICAN WALNUT • TOTAL MASS 1850G
      </text>

      {/* Standoffs with acoustic dampening gaskets */}
      <rect x="22" y="18" width="18" height="8" rx="2" fill="#282420" stroke="#12100E" strokeWidth="0.8"/>
      <rect x="480" y="18" width="18" height="8" rx="2" fill="#282420" stroke="#12100E" strokeWidth="0.8"/>
      <rect x="22" y="112" width="18" height="8" rx="2" fill="#282420" stroke="#12100E" strokeWidth="0.8"/>
      <rect x="480" y="112" width="18" height="8" rx="2" fill="#282420" stroke="#12100E" strokeWidth="0.8"/>

      {/* Type-C Port Machined Notch */}
      <rect x="28" y="9" width="24" height="6" rx="1.5" fill="#0A0502"/>
    </svg>
  );
}
