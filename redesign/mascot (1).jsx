// Vrstvička mascot + 3D printer animation SVGs.

// Vrstvička — friendly onion character (concentric layers = print layers).
function Vrstvicka({ size = 220, mood = 'happy', tone = 'green' }) {
  // tone: green (default) / coral / sage / amber — picks layer color family
  const tones = {
    green: ['#D9F2B5','#B6E08A','#86C44E','#52902A'],
    coral: ['#F4C9AE','#EFA987','#E97A4F','#C75A33'],
    sage:  ['#CFE3D2','#A9CDB1','#7AA68A','#52866B'],
    amber: ['#F2DDB0','#E8C57E','#D9A24E','#A87A2C'],
  };
  const c = tones[tone] || tones.coral;
  const blink = mood === 'wink';
  return (
    <svg viewBox="0 0 220 240" width={size} height={size * (240/220)} role="img" aria-label="Vrstvička, maskot ve tvaru cibulky">
      {/* shadow on ground */}
      <ellipse cx="110" cy="225" rx="78" ry="6" fill="rgba(41,34,26,.10)" />
      {/* leaf / sprout on top */}
      <g transform="translate(110 30)">
        <path d="M0 0 C 6 -22 22 -28 30 -22 C 26 -8 12 0 0 0 Z" fill="#52902A" />
        <path d="M0 0 C -6 -18 -20 -24 -28 -18 C -22 -6 -10 -1 0 0 Z" fill="#3F7720" />
        <line x1="0" y1="0" x2="0" y2="14" stroke="#3F7720" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* body — stacked rounded "layers" */}
      <ellipse cx="110" cy="140" rx="92" ry="92" fill={c[0]} />
      <ellipse cx="110" cy="148" rx="76" ry="76" fill={c[1]} />
      <ellipse cx="110" cy="156" rx="58" ry="58" fill={c[2]} />
      <ellipse cx="110" cy="164" rx="38" ry="38" fill={c[3]} opacity=".18" />
      {/* faint horizontal layer lines */}
      <g stroke="rgba(41,34,26,.08)" strokeWidth="1" fill="none">
        <path d="M22 140 Q 110 160 198 140" />
        <path d="M30 160 Q 110 178 190 160" />
        <path d="M40 180 Q 110 195 180 180" />
      </g>
      {/* cheeks */}
      <ellipse cx="76"  cy="150" rx="9" ry="6" fill={tone==='green' ? '#F4A28C' : '#F4A28C'} opacity=".55" />
      <ellipse cx="144" cy="150" rx="9" ry="6" fill="#F4A28C" opacity=".55" />
      {/* eyes */}
      <g fill="#29221A">
        {blink ? (
          <>
            <path d="M93 132 q 6 -6 12 0" stroke="#29221A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M115 132 q 6 -6 12 0" stroke="#29221A" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="99"  cy="135" r="4.2" />
            <circle cx="121" cy="135" r="4.2" />
            <circle cx="100.4" cy="133.4" r="1.2" fill="#fff" />
            <circle cx="122.4" cy="133.4" r="1.2" fill="#fff" />
          </>
        )}
      </g>
      {/* smile */}
      <path d="M97 150 Q 110 162 123 150" fill="none" stroke="#29221A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Tiny inline mascot (for nav, chips)
function VrstvickaMini({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 36" width={size} height={size * (36/32)} aria-hidden="true">
      <path d="M16 4 C 19 0 25 0 27 4 C 23 7 19 7 16 6 Z" fill="#52902A" />
      <ellipse cx="16" cy="22" rx="13" ry="13" fill="#B6E08A" />
      <ellipse cx="16" cy="24" rx="10" ry="10" fill="#86C44E" />
      <circle cx="13" cy="20" r="1.4" fill="#29221A" />
      <circle cx="19" cy="20" r="1.4" fill="#29221A" />
      <path d="M13 24 Q 16 27 19 24" stroke="#29221A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 3D printer SVG with animated nozzle and growing layers.
// Props: progress (0..1), material color, layerCount, speed ('slow'|'fast'),
//        running (bool — when true, nozzle wobbles)
function Printer3D({ progress = 0, material = 'PLA', infill = 'medium', speed = 'slow', running = false, item = null }) {
  const layerColor = matColor(material);

  // Print "object" lives in this box (in SVG coords)
  const objBox = { x: 100, y: 90, w: 80, h: 100 }; // bottom of object at y=190
  // Nozzle X position oscillates above the object
  const oscRange = objBox.w * 0.45;
  const nozzleX = (objBox.x + objBox.w/2) + Math.sin(progress * Math.PI * (speed === 'fast' ? 18 : 10)) * oscRange;
  // Reveal height: how much is "printed" so far (from bottom up)
  const revealH = Math.max(0.0001, progress * objBox.h);
  const revealY = objBox.y + objBox.h - revealH; // top edge of revealed area
  // Nozzle Y just above the reveal line
  const nozzleY = Math.max(78, revealY - 6);
  // Layer markers
  const layerSpacing = 6;
  const layersDone = Math.floor(progress * (objBox.h / layerSpacing));

  // Unique IDs to allow multiple instances on page
  const uid = item?.id || 'item';
  const clipId = `printclip-${uid}`;

  return (
    <svg viewBox="0 0 280 240" width="100%" style={{ display:'block' }} aria-label="3D tiskárna při tisku">
      <defs>
        <linearGradient id="printerFrame" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3128" />
          <stop offset="1" stopColor="#27201a" />
        </linearGradient>
        <linearGradient id="bedGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFCF6" />
          <stop offset="1" stopColor="#E8DFCD" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x={objBox.x - 4} y={revealY} width={objBox.w + 8} height={revealH + 1} />
        </clipPath>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="140" cy="225" rx="100" ry="6" fill="rgba(41,34,26,.10)" />

      {/* Frame: posts + top */}
      <rect x="34"  y="30" width="10" height="170" rx="4" fill="url(#printerFrame)" />
      <rect x="236" y="30" width="10" height="170" rx="4" fill="url(#printerFrame)" />
      <rect x="34"  y="22" width="212" height="14" rx="6" fill="url(#printerFrame)" />

      {/* Display panel */}
      <rect x="200" y="45" width="40" height="26" rx="5" fill="#1c1612" />
      <rect x="204" y="49" width="32" height="18" rx="3" fill={layerColor} opacity=".5" />
      <text x="220" y="61" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#FFF8E7" fontWeight="600">
        {Math.round(progress * 100)}%
      </text>

      {/* X-rail (top horizontal beam where nozzle hangs) */}
      <rect x="44" y="62" width="192" height="6" rx="3" fill="#1c1612" />

      {/* "Ghost" outline of full target object — faint, behind printed part */}
      {item && (
        <g opacity=".18">
          <text x={objBox.x + objBox.w/2} y={objBox.y + objBox.h - 4}
                fontSize={objBox.h * 0.95} textAnchor="middle"
                style={{ filter: 'grayscale(1)' }}>
            {item.emoji}
          </text>
        </g>
      )}

      {/* Printed item — actual emoji clipped to revealed area, tinted with material color */}
      {item && (
        <g clipPath={`url(#${clipId})`}>
          <text x={objBox.x + objBox.w/2} y={objBox.y + objBox.h - 4}
                fontSize={objBox.h * 0.95} textAnchor="middle">
            {item.emoji}
          </text>
          {/* Material color tint overlay (multiply effect via translucent rect) */}
          <rect x={objBox.x - 4} y={objBox.y - 4} width={objBox.w + 8} height={objBox.h + 8}
                fill={layerColor} opacity=".22" style={{ mixBlendMode: 'multiply' }} />
          {/* horizontal layer ridges across the printed object */}
          {Array.from({ length: layersDone + 1 }).map((_, i) => (
            <line key={i}
                  x1={objBox.x - 4}
                  x2={objBox.x + objBox.w + 4}
                  y1={objBox.y + objBox.h - i * layerSpacing}
                  y2={objBox.y + objBox.h - i * layerSpacing}
                  stroke={layerColor}
                  strokeWidth={speed === 'fast' ? 1.4 : 0.6}
                  opacity={speed === 'fast' ? 0.55 : 0.28} />
          ))}
        </g>
      )}

      {/* Active extrusion line from nozzle to top of revealed area */}
      {running && progress > 0.02 && (
        <line x1={nozzleX} y1={nozzleY + 6} x2={nozzleX} y2={revealY + 1}
              stroke={layerColor} strokeWidth="1.6" opacity=".85" strokeLinecap="round" />
      )}

      {/* Nozzle assembly */}
      <g transform={`translate(${nozzleX} ${Math.max(0, nozzleY - 50)})`}>
        <rect x="-12" y="0"  width="24" height="36" rx="4" fill="#1c1612" />
        <rect x="-9"  y="4"  width="18" height="6"  rx="2" fill={layerColor} />
        <polygon points="-6,36 6,36 0,50" fill="#1c1612" />
        <circle cx="0" cy="50" r="2.2" fill={layerColor} />
      </g>

      {/* Print bed */}
      <rect x="50" y="195" width="180" height="8" rx="2" fill="#2a221c" />
      <rect x="56" y="190" width="168" height="6" rx="2" fill="url(#bedGrad)" />

      {/* Subtle layer count tick marks on left */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,248,231,.45)">
        <text x="20" y="200">0</text>
        <text x="20" y="100">vrch</text>
      </g>

      {/* Infill hint badge */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,248,231,.55)">
        <text x="260" y="200" textAnchor="end">
          {infill === 'hollow' ? 'dutá 0–1%' : infill === 'medium' ? 'střední 15%' : 'plná 100%'}
        </text>
      </g>
    </svg>
  );
}

Object.assign(window, { Vrstvicka, VrstvickaMini, Printer3D });
