// Screen components for Vrstvička.

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────
// HERO / HOME
// ─────────────────────────────────────────────────────────────────────────
function HeroScreen({ onStart, onDiary, attempts }) {
  return (
    <section className="hero" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 48, alignItems:'center' }} className="hero-grid">
        <div className="fade-up">
          <span className="chip chip--coral" style={{ marginBottom: 22 }}>
            ✦ Badatelská dílna 3D tisku
          </span>
          <h1 style={{ marginTop: 14 }}>
            Nauč se nastavit{' '}
            <span style={{ fontStyle:'italic', color:'var(--coral-ink)', fontFamily:'var(--display)' }}>tiskárnu</span>{' '}
            jako profík.
          </h1>
          <p style={{ fontSize: 19, color:'var(--ink-2)', marginTop: 22, maxWidth: 560 }}>
            Vyber si předmět, zvol materiál, výplň a rychlost — pak se podívej,
            jak ho Vrstvička vytiskne. Hraj, zkoušej a objevuj, co funguje.
          </p>
          <div style={{ display:'flex', gap: 12, marginTop: 30, flexWrap:'wrap' }}>
            <button className="btn btn--primary btn--lg" onClick={onStart}>
              🔍 Začít průzkum
            </button>
            <button className="btn btn--ghost btn--lg" onClick={onDiary}>
              📓 Badatelský deník
              {attempts > 0 && (
                <span style={{
                  marginLeft: 4, background:'var(--coral)', color:'#fff',
                  fontSize: 12, fontWeight: 700, padding:'2px 8px', borderRadius: 999,
                  fontFamily:'var(--mono)',
                }}>{attempts}</span>
              )}
            </button>
          </div>

          <div style={{ display:'flex', gap: 26, marginTop: 38, flexWrap:'wrap', color:'var(--ink-2)' }}>
            <FeatureLine icon="🎓" title="3.–9. třída" sub="Pro děti 9–14 let" />
            <FeatureLine icon="🌐" title="V prohlížeči" sub="Bez instalace" />
            <FeatureLine icon="💛" title="Zdarma" sub="Žádná registrace" />
          </div>
        </div>

        <div className="fade-up fade-up--delay-2" style={{ position:'relative', justifySelf:'center' }}>
          <div style={{
            background:'var(--paper)', border:'1px solid var(--line)', borderRadius:'var(--r-2xl)',
            padding: 36, boxShadow:'var(--shadow-3)', position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', inset: 0, background:
                'radial-gradient(circle at 30% 20%, var(--coral-soft), transparent 60%), radial-gradient(circle at 80% 90%, var(--sage-soft), transparent 55%)',
              opacity: .9, pointerEvents:'none',
            }} />
            <div style={{ position:'relative', textAlign:'center' }}>
              <Vrstvicka size={260} tone="green" />
              <div style={{
                marginTop: 14, fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.08em',
                textTransform:'uppercase', color:'var(--ink-3)',
              }}>
                AHOJ, JÁ JSEM <span style={{ color:'var(--coral-ink)', fontWeight:700 }}>VRSTVIČKA</span>
              </div>
            </div>
          </div>
          {/* floating chips */}
          <span className="chip chip--sage" style={{ position:'absolute', top: -10, left: -14, transform:'rotate(-6deg)' }}>
            vrstva 1
          </span>
          <span className="chip chip--amber" style={{ position:'absolute', bottom: 30, right: -22, transform:'rotate(5deg)' }}>
            100 % výplň
          </span>
          <span className="chip chip--coral" style={{ position:'absolute', top: 80, right: -26, transform:'rotate(8deg)' }}>
            🐢 pomalu
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FeatureLine({ icon, title, sub }) {
  return (
    <div style={{ display:'flex', gap: 12, alignItems:'center' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: 'var(--bg-soft)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize: 20,
      }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 600, color:'var(--ink)' }}>{title}</div>
        <div style={{ fontSize: 13, color:'var(--ink-3)' }}>{sub}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// STEP HEADER
// ─────────────────────────────────────────────────────────────────────────
function StepHeader({ step }) {
  const labels = ['Předmět','Nastavení','Predikce','Tisk','Reflexe'];
  return (
    <div style={{ display:'flex', justifyContent:'center', marginBottom: 36 }}>
      <div className="steps">
        {labels.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <span key={label} className={`step ${active ? 'step--active' : ''} ${done ? 'step--done' : ''}`}>
              <span className="step__num">{done ? '✓' : i + 1}</span>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 1) GROUP + ITEM PICKER
// ─────────────────────────────────────────────────────────────────────────
function PickerScreen({ onPick, onBack }) {
  const [groupId, setGroupId] = useState(GROUPS[0].id);
  const group = GROUPS.find(g => g.id === groupId);

  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <StepHeader step={0} />

      <div className="fade-up" style={{ textAlign:'center', maxWidth: 640, margin:'0 auto 32px' }}>
        <h2>Co chceš dnes prozkoumat?</h2>
        <p style={{ fontSize: 17, color:'var(--ink-2)', marginTop: 12 }}>
          Vyber skupinu a v ní si zvol předmět, který tě zajímá.
        </p>
      </div>

      {/* Group tabs */}
      <div className="fade-up fade-up--delay-1" style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom: 26 }}>
        {GROUPS.map(g => {
          const active = g.id === groupId;
          return (
            <button
              key={g.id}
              onClick={() => setGroupId(g.id)}
              className="btn btn--ghost"
              style={{
                background: active ? 'var(--ink)' : 'var(--paper)',
                color: active ? '#FFF8E7' : 'var(--ink)',
                borderColor: active ? 'var(--ink)' : 'var(--line)',
              }}
            >
              <span style={{ fontSize: 18 }}>{g.icon}</span>
              {g.title}
            </button>
          );
        })}
      </div>

      {/* Items */}
      <div className="grid-3 fade-up fade-up--delay-2">
        {group.items.map(item => (
          <button key={item.id} className="choice" onClick={() => onPick(group, item)}>
            <div style={{
              height: 130, borderRadius: 'var(--r-md)', background: 'var(--bg-soft)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize: 64,
              position:'relative', overflow:'hidden',
            }}>
              <div style={{
                position:'absolute', inset:0,
                background: `radial-gradient(120px 80px at 50% 60%, var(--${group.accent}-soft), transparent 70%)`,
              }} />
              <span style={{ position:'relative', filter:'drop-shadow(0 4px 8px rgba(41,34,26,.15))' }}>{item.emoji}</span>
            </div>
            <div className="choice__hd" style={{ marginTop: 6 }}>
              <span className="choice__name">{item.name}</span>
              <span className={`chip chip--${group.accent}`}>{item.sub}</span>
            </div>
            <div className="choice__desc">{item.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop: 32 }}>
        <button className="btn btn--ghost btn--sm" onClick={onBack}>← Zpět na úvod</button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2) CONFIGURATOR — material, infill, speed
// ─────────────────────────────────────────────────────────────────────────
function ConfigScreen({ group, item, config, setConfig, onNext, onBack }) {
  const ready = config.material && config.infill && config.speed;
  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <StepHeader step={1} />

      <div className="fade-up" style={{ display:'grid', gridTemplateColumns: '1fr 320px', gap: 36, alignItems:'flex-start' }}
           id="config-grid">
        <div>
          <div style={{ display:'flex', gap: 12, alignItems:'center', marginBottom: 8 }}>
            <span className={`chip chip--${group.accent}`}>{group.title}</span>
            <span style={{ fontSize: 12, color:'var(--ink-3)', fontFamily:'var(--mono)' }}>•</span>
            <span style={{ fontSize: 12, color:'var(--ink-3)', fontFamily:'var(--mono)' }}>vyber všechna 3 nastavení</span>
          </div>
          <h2>Jak to vytiskneš, <span style={{ fontStyle:'italic', color:'var(--coral-ink)' }}>{item.name.toLowerCase()}</span>?</h2>
          <p style={{ fontSize: 16, color:'var(--ink-2)', marginTop: 10, maxWidth: 560 }}>
            Vrstvička pozoruje. <strong>{item.desc}</strong>
          </p>

          <div style={{ marginTop: 36 }}>
            <SectionLabel num="1" title="Materiál" sub="Jaký plast zvolíš?" />
            <div className="grid-3" style={{ marginTop: 14 }}>
              {MATERIALS.map(m => (
                <button key={m.id} className="choice"
                        aria-pressed={config.material === m.id}
                        onClick={() => setConfig({ ...config, material: m.id })}>
                  <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
                    <span className="dot" style={{ background: m.color, width: 18, height: 18 }} />
                    <div style={{ display:'flex', flexDirection:'column' }}>
                      <span className="choice__name" style={{ fontSize: 18 }}>{m.name}</span>
                      <span className="choice__sub">{m.code}</span>
                    </div>
                  </div>
                  <div className="choice__desc">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <SectionLabel num="2" title="Výplň" sub="Kolik plastu má být uvnitř?" />
            <div className="grid-3" style={{ marginTop: 14 }}>
              {INFILLS.map(inf => (
                <button key={inf.id} className="choice"
                        aria-pressed={config.infill === inf.id}
                        onClick={() => setConfig({ ...config, infill: inf.id })}>
                  <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
                    <InfillIcon kind={inf.id} />
                    <div style={{ display:'flex', flexDirection:'column' }}>
                      <span className="choice__name" style={{ fontSize: 18 }}>{inf.name}</span>
                      <span className="choice__sub">{inf.label}</span>
                    </div>
                  </div>
                  <div className="choice__desc">{inf.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <SectionLabel num="3" title="Rychlost" sub="Pomalu, nebo rychle?" />
            <div className="grid-2" style={{ marginTop: 14 }}>
              {SPEEDS.map(s => (
                <button key={s.id} className="choice"
                        aria-pressed={config.speed === s.id}
                        onClick={() => setConfig({ ...config, speed: s.id })}>
                  <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{s.id === 'slow' ? '🐢' : '🐇'}</span>
                    <div style={{ display:'flex', flexDirection:'column' }}>
                      <span className="choice__name" style={{ fontSize: 18 }}>{s.name}</span>
                      <span className="choice__sub">{s.label}</span>
                    </div>
                  </div>
                  <div className="choice__desc">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', marginTop: 40, gap: 12, flexWrap:'wrap' }}>
            <button className="btn btn--ghost" onClick={onBack}>← Vybrat jiný předmět</button>
            <button className="btn btn--primary btn--lg" onClick={onNext} disabled={!ready}
                    style={{ opacity: ready ? 1 : .4, cursor: ready ? 'pointer' : 'not-allowed' }}>
              Pokračovat na predikci →
            </button>
          </div>
        </div>

        {/* Sticky preview side-panel */}
        <aside style={{ position:'sticky', top: 90 }}>
          <ConfigPreview item={item} group={group} config={config} />
        </aside>
      </div>

      <style>{`
        @media (max-width: 920px){
          #config-grid { grid-template-columns: 1fr !important; }
          #config-grid aside { position: static !important; }
        }
      `}</style>
    </section>
  );
}

function SectionLabel({ num, title, sub }) {
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap: 14 }}>
      <span style={{
        fontFamily:'var(--mono)', fontSize: 11, color:'var(--ink-3)', letterSpacing:'.08em',
      }}>0{num}</span>
      <h3 style={{ fontSize: 24 }}>{title}</h3>
      <span style={{ color:'var(--ink-3)', fontSize: 14 }}>{sub}</span>
    </div>
  );
}

function InfillIcon({ kind }) {
  const size = 22;
  return (
    <svg width={size} height={size} viewBox="0 0 22 22">
      <rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {kind === 'medium' && (
        <g stroke="var(--ink)" strokeWidth="1.2" opacity=".6">
          <line x1="2" y1="11" x2="20" y2="11" />
          <line x1="11" y1="2" x2="11" y2="20" />
        </g>
      )}
      {kind === 'full' && (
        <rect x="3.5" y="3.5" width="15" height="15" rx="2" fill="var(--ink)" opacity=".75" />
      )}
    </svg>
  );
}

function ConfigPreview({ item, group, config }) {
  return (
    <div className="card" style={{ padding: 20, position:'relative', overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(180px 120px at 80% 0%, var(--${group.accent}-soft), transparent 60%)`,
        pointerEvents:'none',
      }} />
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.08em', textTransform:'uppercase',
          color:'var(--ink-3)',
        }}>Tiskneme</div>
        <div style={{ display:'flex', alignItems:'center', gap: 14, marginTop: 8 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'var(--bg-soft)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize: 28,
          }}>{item.emoji}</div>
          <div>
            <div style={{ fontFamily:'var(--display)', fontWeight: 600, fontSize: 22 }}>{item.name}</div>
            <div style={{ color:'var(--ink-3)', fontSize: 13 }}>{item.sub}</div>
          </div>
        </div>

        <hr className="divider" style={{ margin:'18px 0' }} />

        <PreviewRow label="Materiál" value={config.material ? `${matFull(config.material)} · ${matLabel(config.material)}` : '—'} dot={config.material ? matColor(config.material) : null} />
        <PreviewRow label="Výplň"    value={config.infill ? `${infillLabel(config.infill)}` : '—'} />
        <PreviewRow label="Rychlost" value={config.speed ? speedLabel(config.speed) : '—'} />

        <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background:'var(--bg-soft)' }}>
          <div style={{
            display:'flex', alignItems:'center', gap: 8, fontSize: 12, color:'var(--ink-3)',
            fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'.06em',
          }}>
            <VrstvickaMini size={20} /> Vrstvička pozoruje
          </div>
          <p style={{ marginTop: 8, fontSize: 14, color:'var(--ink-2)' }}>
            {!config.material ? 'Začni výběrem materiálu — to je úplně první rozhodnutí.' :
             !config.infill ?  'Materiál máš. Teď zvol, kolik plastu bude uvnitř.' :
             !config.speed ?   'Skvělé. Zbývá zvolit rychlost.' :
             'Máš všechno. Pojď zkusit, jestli to vyjde!'}
          </p>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ label, value, dot }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px dashed var(--line-2)' }}>
      <span style={{ fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--ink-3)' }}>{label}</span>
      <span style={{ fontWeight: 600, display:'inline-flex', alignItems:'center', gap: 8 }}>
        {dot && <span className="dot" style={{ background: dot, width:10, height:10 }} />}
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3) PREDICTION
// ─────────────────────────────────────────────────────────────────────────
function PredictScreen({ item, group, config, prediction, setPrediction, onNext, onBack }) {
  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <StepHeader step={2} />

      <div className="fade-up" style={{ maxWidth: 760, margin:'0 auto', textAlign:'center' }}>
        <Vrstvicka size={120} tone={group.accent} mood="happy" />
        <h2 style={{ marginTop: 8 }}>Co myslíš, že se stane?</h2>
        <p style={{ fontSize: 17, color:'var(--ink-2)', marginTop: 10 }}>
          Tipni si, jestli ti tahle kombinace pro <strong>{item.name.toLowerCase()}</strong> bude fungovat.
          Žádný strach — i špatný tip nás něco naučí.
        </p>
      </div>

      <div className="fade-up fade-up--delay-1" style={{ marginTop: 30, display:'flex', justifyContent:'center', flexWrap:'wrap', gap: 14 }}>
        {PREDICTIONS.map(p => (
          <button key={p.id}
                  aria-pressed={prediction === p.id}
                  className="choice"
                  onClick={() => setPrediction(p.id)}
                  style={{ width: 220, alignItems:'center', textAlign:'center' }}>
            <div style={{ fontSize: 40 }}>{p.icon}</div>
            <div className="choice__name" style={{ fontSize: 18 }}>{p.label}</div>
          </button>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', marginTop: 50, gap: 12, maxWidth: 760, margin:'40px auto 0' }}>
        <button className="btn btn--ghost" onClick={onBack}>← Upravit nastavení</button>
        <button className="btn btn--coral btn--lg"
                onClick={onNext}
                disabled={!prediction}
                style={{ opacity: prediction ? 1 : .4, cursor: prediction ? 'pointer' : 'not-allowed' }}>
          🖨️ Tisknout!
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 4) PRINT ANIMATION
// ─────────────────────────────────────────────────────────────────────────
function PrintScreen({ item, group, config, onDone, onCancel }) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning]   = useState(true);
  const startedAt = useRef(performance.now());
  const total = config.speed === 'fast' ? 4500 : 7000;

  useEffect(() => {
    if (!running) return;
    let raf;
    const tick = () => {
      const t = (performance.now() - startedAt.current) / total;
      const p = Math.min(1, t);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => onDone(), 600);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const pct = Math.round(progress * 100);

  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <StepHeader step={3} />

      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 36, alignItems:'center' }} id="print-grid">
        <div className="card fade-up" style={{ padding: 24, position:'relative', overflow:'hidden', background: '#1c1612' }}>
          <div style={{ position:'absolute', inset:0,
            background:'radial-gradient(circle at 50% 30%, rgba(255,200,150,.18), transparent 60%)' }} />
          <div style={{ position:'relative' }}>
            <Printer3D progress={progress} material={config.material} infill={config.infill}
                       speed={config.speed} running={running} item={item} />
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              marginTop: 10, color:'#FFF8E7', fontFamily:'var(--mono)', fontSize: 12, letterSpacing:'.06em',
            }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap: 8 }}>
                <span style={{ width:8, height:8, borderRadius:999, background: matColor(config.material),
                               animation:'pulseDot 1.2s infinite' }} />
                VRSTVIČKA 3000 — TISK PROBÍHÁ
              </span>
              <span>{pct}%</span>
            </div>
          </div>
        </div>

        <div className="fade-up fade-up--delay-1">
          <span className={`chip chip--${group.accent}`}>{item.name}</span>
          <h2 style={{ marginTop: 14 }}>Tiskneme!</h2>
          <p style={{ fontSize: 16, color:'var(--ink-2)', marginTop: 10 }}>
            Tiskárna pokládá vrstvu po vrstvě. Pomalu — nebo rychle, podle tvého nastavení.
          </p>

          <div className="card" style={{ padding: 18, marginTop: 24 }}>
            <ProgressBar progress={progress} color={matColor(config.material)} />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>
              <Stat label="Materiál"  value={`${matFull(config.material)} · ${matLabel(config.material)}`} dot={matColor(config.material)} />
              <Stat label="Výplň"     value={infillLabel(config.infill)} />
              <Stat label="Rychlost"  value={speedLabel(config.speed)} />
            </div>
          </div>

          <div style={{ display:'flex', gap: 10, marginTop: 18 }}>
            <button className="btn btn--ghost btn--sm" onClick={onCancel}>⏹ Zastavit</button>
            <button className="btn btn--ghost btn--sm" onClick={() => { startedAt.current = performance.now(); setProgress(0); }}>↻ Znovu</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px){
          #print-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProgressBar({ progress, color }) {
  return (
    <div>
      <div style={{
        display:'flex', justifyContent:'space-between',
        fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.06em',
        textTransform:'uppercase', color:'var(--ink-3)',
      }}>
        <span>Průběh tisku</span>
        <span style={{ color:'var(--ink)' }}>{Math.round(progress * 100)} %</span>
      </div>
      <div style={{ height: 10, background:'var(--bg-soft)', borderRadius: 999, marginTop: 8, overflow:'hidden' }}>
        <div style={{
          height:'100%', width: `${progress * 100}%`, background: color, borderRadius: 999,
          transition: 'width 80ms linear',
        }} />
      </div>
    </div>
  );
}

function Stat({ label, value, dot }) {
  return (
    <div>
      <div style={{ fontFamily:'var(--mono)', fontSize: 10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink-3)' }}>{label}</div>
      <div style={{ marginTop: 4, fontWeight: 600, fontSize: 14, display:'flex', alignItems:'center', gap: 8 }}>
        {dot && <span className="dot" style={{ background: dot }} />}
        {value}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 5) RESULT / REFLECTION
// ─────────────────────────────────────────────────────────────────────────
function ResultScreen({ item, group, config, prediction, onSave, onAgain, onHome }) {
  const result = evaluatePrint(item, config);
  const [reflection, setReflection] = useState(null);

  const tone = result.score === 3 ? 'sage' : result.score === 2 ? 'amber' : 'coral';
  const tip = TIPS[item.id];

  const save = () => {
    onSave({ item, group, config, prediction, result, reflection, when: Date.now() });
  };

  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <StepHeader step={4} />

      <div className="fade-up" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 36, alignItems:'flex-start' }} id="res-grid">
        <div className="card" style={{ padding: 28, position:'relative', overflow:'hidden' }}>
          <div style={{
            position:'absolute', inset:0,
            background: `radial-gradient(220px 160px at 100% 0%, var(--${tone}-soft), transparent 60%)`,
          }} />
          <div style={{ position:'relative' }}>
            <span className={`chip chip--${tone}`} style={{ marginBottom: 12 }}>
              {result.score === 3 ? '★ ★ ★ skvělé' :
               result.score === 2 ? '★ ★ ☆ dobré'  :
               result.score === 1 ? '★ ☆ ☆ jde to lépe' :
                                    '☆ ☆ ☆ zkus jinak'}
            </span>
            <h2 style={{ marginTop: 6 }}>{result.title}</h2>
            <p style={{ marginTop: 10, fontSize: 16, color:'var(--ink-2)' }}>{result.body}</p>

            <div style={{ marginTop: 24, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
              <CompareRow label="Materiál"  picked={matLabel(config.material)} ok={item.optimal.material === config.material} optimal={matLabel(item.optimal.material)} />
              <CompareRow label="Výplň"     picked={infillLabel(config.infill)} ok={item.optimal.infill === config.infill} optimal={infillLabel(item.optimal.infill)} />
              <CompareRow label="Rychlost"  picked={speedLabel(config.speed)} ok={item.optimal.speed === config.speed} optimal={speedLabel(item.optimal.speed)} />
              <CompareRow label="Tvůj tip"  picked={PREDICTIONS.find(p => p.id === prediction)?.label || '—'} ok={null} optimal="" />
            </div>

            <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: 'var(--bg-soft)', border:'1px dashed var(--line)' }}>
              <div style={{ display:'flex', alignItems:'center', gap: 10, color:'var(--ink-3)', fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.08em', textTransform:'uppercase' }}>
                ✦ Víš, že…
              </div>
              <p style={{ marginTop: 8 }}>{tip}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>🔍 Jak to dopadlo?</h3>
          <p style={{ color:'var(--ink-2)', marginTop: 8 }}>
            Krátké zamyšlení nakonec — co tě překvapilo, co bys změnil/a?
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginTop: 18 }}>
            {REFLECTIONS.map(r => (
              <button key={r.id}
                      aria-pressed={reflection === r.id}
                      className="choice"
                      onClick={() => setReflection(r.id)}
                      style={{ flexDirection:'row', alignItems:'center', gap: 12, padding: 14 }}>
                <span style={{ fontSize: 28 }}>{r.icon}</span>
                <span className="choice__name" style={{ fontSize: 16 }}>{r.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap: 10, marginTop: 26, flexWrap:'wrap' }}>
            <button className="btn btn--primary btn--lg"
                    disabled={!reflection}
                    style={{ opacity: reflection ? 1 : .4, cursor: reflection ? 'pointer' : 'not-allowed' }}
                    onClick={save}>
              📓 Zapsat do deníku
            </button>
            <button className="btn btn--ghost" onClick={onAgain}>↻ Zkusit jinak</button>
            <button className="btn btn--ghost" onClick={onHome}>Prozkoumat něco jiného →</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px){
          #res-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CompareRow({ label, picked, ok, optimal }) {
  return (
    <div style={{ padding: 12, borderRadius: 12, background:'var(--bg-soft)', border:'1px solid var(--line-2)' }}>
      <div style={{ fontFamily:'var(--mono)', fontSize: 10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink-3)' }}>
        {label}
      </div>
      <div style={{ marginTop: 4, fontWeight: 600, display:'flex', justifyContent:'space-between', alignItems:'center', gap: 6 }}>
        <span>{picked}</span>
        {ok === true  && <span style={{ color:'var(--sage-ink)', fontSize: 13 }}>✓</span>}
        {ok === false && <span style={{ color:'var(--coral-ink)', fontSize: 11 }}>↳ {optimal}</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 6) DIARY
// ─────────────────────────────────────────────────────────────────────────
function DiaryScreen({ entries, onClear, onStart }) {
  return (
    <section className="pad-top" style={{ paddingBottom: 80 }}>
      <div className="fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap: 16 }}>
        <div>
          <span className="chip chip--sage">📓 Badatelský deník</span>
          <h2 style={{ marginTop: 14 }}>Co jsi už zkusil/a?</h2>
          <p style={{ marginTop: 8, color:'var(--ink-2)', maxWidth: 560 }}>
            Každý pokus se sem zapíše. Můžeš se k němu vracet, porovnávat s novými a dívat se, co se podařilo.
          </p>
        </div>
        <div style={{ display:'flex', gap: 10 }}>
          <button className="btn btn--coral" onClick={onStart}>🔍 Nový pokus</button>
          {entries.length > 0 && <button className="btn btn--ghost btn--sm" onClick={onClear}>Vyčistit</button>}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="card fade-up fade-up--delay-1" style={{ marginTop: 36, padding: 56, textAlign:'center' }}>
          <Vrstvicka size={140} tone="sage" mood="wink" />
          <h3 style={{ marginTop: 12 }}>Zatím prázdno.</h3>
          <p style={{ marginTop: 8, color:'var(--ink-2)' }}>Vrať se na průzkum a vyzkoušej první předmět.</p>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn--primary" onClick={onStart}>Začít první pokus →</button>
          </div>
        </div>
      ) : (
        <div className="grid-2 fade-up fade-up--delay-1" style={{ marginTop: 28 }}>
          {entries.map((e, i) => (
            <DiaryCard key={i} e={e} index={entries.length - i} />
          ))}
        </div>
      )}
    </section>
  );
}

function DiaryCard({ e, index }) {
  const tone = e.result.score === 3 ? 'sage' : e.result.score === 2 ? 'amber' : 'coral';
  const time = new Date(e.when).toLocaleString('cs-CZ', { dateStyle: 'short', timeStyle: 'short' });
  return (
    <div className="card" style={{ padding: 22, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top: 0, right: 0, padding:'8px 14px',
                    background: `var(--${tone}-soft)`, color: `var(--${tone}-ink)`,
                    borderBottomLeftRadius: 14, fontFamily:'var(--mono)', fontSize: 11, letterSpacing:'.06em' }}>
        #{String(index).padStart(2, '0')}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background:'var(--bg-soft)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize: 26,
        }}>{e.item.emoji}</div>
        <div>
          <div style={{ fontFamily:'var(--display)', fontWeight: 600, fontSize: 20 }}>{e.item.name}</div>
          <div style={{ fontFamily:'var(--mono)', fontSize: 11, color:'var(--ink-3)', letterSpacing:'.06em' }}>{time}</div>
        </div>
      </div>

      <div style={{ display:'flex', gap: 6, marginTop: 14, flexWrap:'wrap' }}>
        <span className="chip"><span className="dot" style={{ background: matColor(e.config.material) }} />{matLabel(e.config.material)}</span>
        <span className="chip">{infillLabel(e.config.infill)}</span>
        <span className="chip">{speedLabel(e.config.speed)}</span>
      </div>

      <p style={{ marginTop: 12, fontWeight: 600 }}>{e.result.title}</p>
      <p style={{ color:'var(--ink-2)', fontSize: 14, marginTop: 4 }}>{e.result.body}</p>

      <div style={{ display:'flex', gap: 10, marginTop: 14, fontSize: 13, color:'var(--ink-3)' }}>
        <span>Tip: <strong style={{ color:'var(--ink-2)' }}>
          {PREDICTIONS.find(p => p.id === e.prediction)?.label}
        </strong></span>
        <span>·</span>
        <span>Reflexe: <strong style={{ color:'var(--ink-2)' }}>
          {REFLECTIONS.find(r => r.id === e.reflection)?.label || '—'}
        </strong></span>
      </div>
    </div>
  );
}

Object.assign(window, {
  HeroScreen, PickerScreen, ConfigScreen, PredictScreen,
  PrintScreen, ResultScreen, DiaryScreen, StepHeader,
});
