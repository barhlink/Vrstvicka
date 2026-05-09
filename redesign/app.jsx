// Vrstvička — main App: routing, state, persistence, tweaks panel.

const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#86C44E", "#FBF7EC", "#1F2A1A"],
  "displayFont": "Bricolage Grotesque",
  "bodyFont": "DM Sans",
  "mascotTone": "green",
  "showFloatingChips": true,
  "density": "regular"
}/*EDITMODE-END*/;

const PALETTES = [
  ["#86C44E", "#FBF7EC", "#1F2A1A"], // green / paper / forest — default (Zvídavě)
  ["#E97A4F", "#FBF5EC", "#29221A"], // coral / cream / ink
  ["#D9A24E", "#FAF3E2", "#2A2418"], // amber / paper / brown
  ["#5B8FBE", "#F2F0EA", "#1A2129"], // blue / mist / navy
];

const DISPLAY_FONTS = ["Bricolage Grotesque", "Instrument Serif", "Space Grotesk", "DM Serif Display"];
const BODY_FONTS    = ["DM Sans", "Manrope", "Public Sans", "Work Sans"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette/fonts via CSS vars
  useE(() => {
    const root = document.documentElement;
    const [accent, bg, ink] = t.palette || PALETTES[0];
    root.style.setProperty('--coral', accent);
    root.style.setProperty('--bg', bg);
    root.style.setProperty('--ink', ink);
    root.style.setProperty('--display', `'${t.displayFont}', ui-serif, Georgia, serif`);
    root.style.setProperty('--body',    `'${t.bodyFont}', ui-sans-serif, system-ui, sans-serif`);
  }, [t.palette, t.displayFont, t.bodyFont]);

  // Routing
  const [route, setRoute] = useS({ name: 'home' }); // home | picker | config | predict | print | result | diary
  const [group, setGroup]       = useS(null);
  const [item, setItem]         = useS(null);
  const [config, setConfig]     = useS({ material:null, infill:null, speed:null });
  const [prediction, setPredict]= useS(null);
  const [entries, setEntries]   = useS(() => {
    try { return JSON.parse(localStorage.getItem('vrstvicka.diary') || '[]'); } catch { return []; }
  });

  const persist = (next) => {
    setEntries(next);
    try { localStorage.setItem('vrstvicka.diary', JSON.stringify(next)); } catch {}
  };

  const reset = () => {
    setItem(null); setGroup(null);
    setConfig({ material:null, infill:null, speed:null });
    setPredict(null);
  };

  const startExplore = () => { reset(); setRoute({ name: 'picker' }); };

  return (
    <>
      {/* Top nav */}
      <nav className="nav">
        <div className="wrap nav__inner">
          <a href="#" className="brand" onClick={(e)=>{ e.preventDefault(); setRoute({ name: 'home' }); }}>
            <VrstvickaMini size={32} />
            <span>Vrstvička</span>
            <span style={{
              fontFamily:'var(--mono)', fontSize: 11, color:'var(--ink-3)',
              fontWeight: 500, marginLeft: 6, letterSpacing:'.06em', textTransform:'uppercase',
            }}>3D tisk</span>
          </a>
          <div className="nav__links">
            <button className="nav__link"
                    aria-current={route.name === 'home' ? 'true' : undefined}
                    onClick={() => setRoute({ name: 'home' })}>
              Úvod
            </button>
            <button className="nav__link"
                    aria-current={['picker','config','predict','print','result'].includes(route.name) ? 'true' : undefined}
                    onClick={startExplore}>
              🔍 Průzkum
            </button>
            <button className="nav__link"
                    aria-current={route.name === 'diary' ? 'true' : undefined}
                    onClick={() => setRoute({ name: 'diary' })}>
              📓 Deník
              {entries.length > 0 && (
                <span style={{
                  marginLeft: 4, background:'var(--coral)', color:'#fff',
                  fontSize: 11, fontWeight: 700, padding:'1px 7px', borderRadius: 999,
                  fontFamily:'var(--mono)',
                }}>{entries.length}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="wrap">
        {route.name === 'home' && (
          <HeroScreen
            attempts={entries.length}
            onStart={startExplore}
            onDiary={() => setRoute({ name: 'diary' })}
          />
        )}
        {route.name === 'picker' && (
          <PickerScreen
            onPick={(g, it) => { setGroup(g); setItem(it); setRoute({ name: 'config' }); }}
            onBack={() => setRoute({ name: 'home' })}
          />
        )}
        {route.name === 'config' && item && (
          <ConfigScreen
            item={item} group={group} config={config} setConfig={setConfig}
            onNext={() => setRoute({ name: 'predict' })}
            onBack={() => setRoute({ name: 'picker' })}
          />
        )}
        {route.name === 'predict' && item && (
          <PredictScreen
            item={item} group={group} config={config}
            prediction={prediction} setPrediction={setPredict}
            onNext={() => setRoute({ name: 'print' })}
            onBack={() => setRoute({ name: 'config' })}
          />
        )}
        {route.name === 'print' && item && (
          <PrintScreen
            item={item} group={group} config={config}
            onDone={() => setRoute({ name: 'result' })}
            onCancel={() => setRoute({ name: 'config' })}
          />
        )}
        {route.name === 'result' && item && (
          <ResultScreen
            item={item} group={group} config={config} prediction={prediction}
            onSave={(entry) => {
              const next = [entry, ...entries].slice(0, 30);
              persist(next);
              setRoute({ name: 'diary' });
            }}
            onAgain={() => setRoute({ name: 'config' })}
            onHome={() => { reset(); setRoute({ name: 'picker' }); }}
          />
        )}
        {route.name === 'diary' && (
          <DiaryScreen
            entries={entries}
            onClear={() => persist([])}
            onStart={startExplore}
          />
        )}
      </main>

      <footer style={{ borderTop:'1px solid var(--line-2)', padding:'34px 0 50px', marginTop: 40, color:'var(--ink-3)' }}>
        <div className="wrap" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap: 14, fontSize: 14 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 10 }}>
            <VrstvickaMini size={26} />
            <span style={{ fontFamily:'var(--display)', fontWeight: 600, color:'var(--ink-2)' }}>Vrstvička</span>
            <span>· Badatelská dílna 3D tisku</span>
          </span>
          <span>Vyrobeno s ♥ pro zvídavé děti — © 2026</span>
        </div>
      </footer>

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Vzhled" />
        <TweakColor
          label="Paleta (akcent / podklad / inkoust)"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={DISPLAY_FONTS}
          onChange={(v) => setTweak('displayFont', v)}
        />
        <TweakSelect
          label="Body font"
          value={t.bodyFont}
          options={BODY_FONTS}
          onChange={(v) => setTweak('bodyFont', v)}
        />
        <TweakSection label="Maskot" />
        <TweakRadio
          label="Tón Vrstvičky"
          value={t.mascotTone}
          options={['green', 'coral', 'sage', 'amber']}
          onChange={(v) => setTweak('mascotTone', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
