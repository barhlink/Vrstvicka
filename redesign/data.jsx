// Game data — based on the original Vrstvička game (5 worlds × 5 challenges).
// Mappings: low → hollow, mid → medium, high → full

const GROUPS = [
  {
    id: 'hracky', icon: '🎮', title: 'Hračky a hry', sub: 'Pro radost a zábavu',
    accent: 'coral',
    items: [
      { id:'kachnicka', name:'Gumová kachnička', emoji:'🦆',
        sub:'Měkká hračka', desc:'Hračka pro malé dítě. Musí být měkká a ohebná!',
        hint:'TPU se natáhne až 5× délky. Je jako opravdová guma!',
        optimal:{ material:'TPU', infill:'medium', speed:'slow' } },
      { id:'pohar', name:'Pohár pro vítěze', emoji:'🏆',
        sub:'Hladký povrch', desc:'Hezký pohár na polici. Krásný povrch je důležitý!',
        hint:'PLA dává nejhladší povrchy. Dutá výplň ušetří materiál.',
        optimal:{ material:'PLA', infill:'hollow', speed:'slow' } },
      { id:'terc', name:'Terč na šipky', emoji:'🎯',
        sub:'Vydrží nárazy', desc:'Pevný terč na zeď. Musí vydržet šipky i nárazy!',
        hint:'Pevnost = vysoká výplň + silný materiál.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'loutka', name:'Loutka na prst', emoji:'🎪',
        sub:'Pohodlná, pružná', desc:'Maňásek na divadlo. Musí být pohodlný na prstu a trochu pružný!',
        hint:'Na prstech chceme pružný materiál, ne tvrdý plast.',
        optimal:{ material:'TPU', infill:'hollow', speed:'slow' } },
      { id:'kostka', name:'Herní kostka', emoji:'🎲',
        sub:'Přesná a pevná', desc:'Kostka na deskovou hru. Musí být přesná a pevná!',
        hint:'Přesnost = hezký tisk. Pevnost = velká výplň.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
    ],
  },
  {
    id: 'domacnost', icon: '🏠', title: 'Domácnost', sub: 'Pomocníci do bytu',
    accent: 'sage',
    items: [
      { id:'kvetinac', name:'Květináč na parapet', emoji:'🪴',
        sub:'Lehký, dekorativní', desc:'Hezký květináč na okno. Lehký a dekorativní!',
        hint:'Dekorace = PLA + pomalý tisk + dutá výplň.',
        optimal:{ material:'PLA', infill:'hollow', speed:'slow' } },
      { id:'stojanek-tel', name:'Stojánek na telefon', emoji:'📱',
        sub:'Stabilní, drží', desc:'Stojánek na stůl. Musí pevně držet telefon a být stabilní!',
        hint:'Stabilita = dostatečná výplň. PETG lépe odolá tlaku.',
        optimal:{ material:'PETG', infill:'medium', speed:'slow' } },
      { id:'vesak', name:'Věšák na klíče', emoji:'🔑',
        sub:'Unese klíče', desc:'Věšák na zeď. Musí unést klíče a být pevně přišroubovaný!',
        hint:'Pevnost je klíčová – klíče jsou těžké!',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'mydlo', name:'Dávkovač na mýdlo', emoji:'🧴',
        sub:'Voděodolný', desc:'Náhradní pumpa na tekuté mýdlo. Musí být voděodolná a pevná!',
        hint:'PETG lépe odolá vodě a chemikáliím než PLA.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'svicen', name:'Svícen na čajovou svíčku', emoji:'🕯️',
        sub:'Krásný vzhled', desc:'Hezký svícen na stůl. Důležitý je krásný vzhled!',
        hint:'PLA + pomalý tisk = nejhezčí dekorativní výsledek.',
        optimal:{ material:'PLA', infill:'hollow', speed:'slow' } },
    ],
  },
  {
    id: 'skola', icon: '🏫', title: 'Škola a věda', sub: 'Do třídy a laborky',
    accent: 'amber',
    items: [
      { id:'stojanek', name:'Stojánek na tužky', emoji:'✏️',
        sub:'Stabilní, hezký', desc:'Stojánek na psací potřeby do školy. Musí být stabilní a hezký!',
        hint:'Stabilita = střední výplň. PLA pro hezký vzhled.',
        optimal:{ material:'PLA', infill:'medium', speed:'slow' } },
      { id:'zkumavky', name:'Držák na zkumavky', emoji:'🔬',
        sub:'Pevný, odolný', desc:'Stojánek do školní laboratoře. Musí pevně držet zkumavky!',
        hint:'Laboratoř = pevnost a odolnost. PETG odolá chemikáliím!',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'puzzle', name:'Puzzle', emoji:'🗺️',
        sub:'Lehké, hezké', desc:'Část vzdělávacího puzzle světadílů. Lehký a hezký!',
        hint:'Puzzle = PLA + dutá výplň + pomalu pro detaily.',
        optimal:{ material:'PLA', infill:'hollow', speed:'slow' } },
      { id:'pravitko', name:'Pravítko s milimetry', emoji:'📏',
        sub:'Přesné, pevné', desc:'Přesné pravítko na rýsování. Musí mít přesné mm!',
        hint:'Přesnost = pomalý tisk + tvrdý materiál.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'raketka', name:'Raketka na zeď', emoji:'🚀',
        sub:'Lehká dekorace', desc:'Dekorace do třídy. Musí být krásná a lehká!',
        hint:'Pro krásné dekorace: PLA + pomalý tisk + malá výplň!',
        optimal:{ material:'PLA', infill:'hollow', speed:'slow' } },
    ],
  },
  {
    id: 'priroda', icon: '🌿', title: 'Příroda', sub: 'Ven do zahrady',
    accent: 'sage',
    items: [
      { id:'krmitko', name:'Krmítko pro ptáky', emoji:'🪺',
        sub:'Odolné dešti', desc:'Venkovní krmítko. Musí odolat dešti a mrazu!',
        hint:'Venkovní předměty potřebují materiál odolný vlhkosti.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'visacka', name:'Visačka na rostlinu', emoji:'🌱',
        sub:'UV, vodě odolná', desc:'Štítek do záhonu. Lehký, hezký, odolný venku.',
        hint:'Nejde o pevnost, ale o odolnost vůči UV záření a vlhkosti.',
        optimal:{ material:'PETG', infill:'hollow', speed:'slow' } },
      { id:'hmyz', name:'Domeček pro hmyz', emoji:'🐛',
        sub:'Pevný, venkovní', desc:'Hotel pro užitečný hmyz do zahrady. Musí být pevný a odolný!',
        hint:'Příroda potřebuje materiál, který dlouho vydrží venku.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'leknin', name:'Plovoucí leknín', emoji:'🌊',
        sub:'Plave, ohýbá se', desc:'Dekorativní květ na vodní hladinu. Musí plavat a ohýbat se!',
        hint:'Plovoucí předmět potřebuje lehký a vodě odolný materiál.',
        optimal:{ material:'TPU', infill:'hollow', speed:'slow' } },
      { id:'seminka', name:'Zásobník na semínka', emoji:'🌰',
        sub:'Pevný, voděodolný', desc:'Dávkovač semínek pro zahradníky. Musí být pevný a voděodolný!',
        hint:'Kontakt s vlhkostí a zemí = potřebujeme odolný materiál.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
    ],
  },
  {
    id: 'technika', icon: '🤖', title: 'Technika', sub: 'Užitečné gadgety',
    accent: 'coral',
    items: [
      { id:'pouzdro', name:'Pouzdro na telefon', emoji:'📱',
        sub:'Tlumí nárazy', desc:'Ochranné pouzdro. Musí tlumit nárazy a přesně pasovat!',
        hint:'Ochrana = pružnost. Tuhý plast náraz nepohltí.',
        optimal:{ material:'TPU', infill:'medium', speed:'slow' } },
      { id:'kabely', name:'Organizér kabelů', emoji:'🔌',
        sub:'Pružný klip', desc:'Klip na uspořádání kabelů na stole. Pružný, aby kabely přidržel!',
        hint:'Klip musí být dost pružný, aby se rozevřel, ale dost pevný, aby držel.',
        optimal:{ material:'TPU', infill:'medium', speed:'slow' } },
      { id:'mys', name:'Podložka pod zápěstí', emoji:'🖱️',
        sub:'Měkká, pohodlná', desc:'Ergonomická podložka k myši. Měkká a pohodlná!',
        hint:'Pohodlí = pružný materiál, který se přizpůsobí tvaru zápěstí.',
        optimal:{ material:'TPU', infill:'hollow', speed:'slow' } },
      { id:'ozubeni', name:'Ozubené kolečko', emoji:'⚙️',
        sub:'Přesné, pevné', desc:'Náhradní díl do mechanismu. Musí být přesný a pevný!',
        hint:'Ozubení potřebuje přesný tvar a tuhý materiál – jinak se brzy opotřebí.',
        optimal:{ material:'PETG', infill:'full', speed:'slow' } },
      { id:'vypinac', name:'Kryt vypínače', emoji:'💡',
        sub:'Hladký, přesný', desc:'Dekorativní kryt na světelný vypínač. Hezký a pevný!',
        hint:'Kryt potřebuje hladký povrch a přesné rozměry pro montáž.',
        optimal:{ material:'PLA', infill:'medium', speed:'slow' } },
    ],
  },
];

const MATERIALS = [
  { id: 'PLA',  name: 'Tvrdý plast', code: 'PLA',  color: 'oklch(0.72 0.10 235)',
    desc: 'Snadno se tiskne, je pevný, ale lehce praskne.' },
  { id: 'PETG', name: 'Silný plast', code: 'PETG', color: 'oklch(0.72 0.13 145)',
    desc: 'Pružnější, vydrží náraz a tah. Hodí se na věci, co se táhnou.' },
  { id: 'TPU',  name: 'Gumový',      code: 'TPU',  color: 'oklch(0.74 0.14 50)',
    desc: 'Měkký a ohebný — vrátí se do tvaru, když ho zmačkneš.' },
];

const INFILLS = [
  { id:'hollow', name:'Dutá',    label:'0–1 %',   desc:'Skoro prázdná. Lehká, ale ohne se.' },
  { id:'medium', name:'Střední', label:'15–20 %', desc:'Lehká a přitom drží tvar.' },
  { id:'full',   name:'Plná',    label:'100 %',   desc:'Těžká a nejpevnější. Tiskne se déle.' },
];

const SPEEDS = [
  { id:'slow', name:'Pomalu', label:'hezčí',  desc:'Hladké vrstvy, krásný povrch.' },
  { id:'fast', name:'Rychle', label:'hrubší', desc:'Vidět vrstvičky, hrubší povrch.' },
];

const PREDICTIONS = [
  { id:'works',   label:'Bude to fungovat',     icon:'🎯' },
  { id:'unsure',  label:'Nejsem si jistý/á',    icon:'🤔' },
  { id:'explore', label:'Zkouším, co se stane', icon:'💡' },
];

const REFLECTIONS = [
  { id:'surprise', label:'Překvapilo mě to', icon:'😮' },
  { id:'expected', label:'Čekal/a jsem to',  icon:'✅' },
  { id:'unsure',   label:'Nevím',            icon:'🤔' },
  { id:'next',     label:'Příště jinak',     icon:'💡' },
];

function evaluatePrint(item, config) {
  const o = item.optimal;
  const hits = ['material','infill','speed'].filter(k => o[k] === config[k]).length;
  if (hits === 3) return { score:3, kind:'great', title:'Skvěle! Vyšlo to.', body:'Všechno sedí — materiál, výplň i rychlost. Tisk je pevný a hezký.' };
  if (hits === 2) return { score:2, kind:'ok',    title:'Funguje to, ale jde to líp.', body:'Skoro! Jedna věc se ještě dá vylepšit.' };
  if (hits === 1) return { score:1, kind:'meh',   title:'Hmm, není to ono.', body:'Funkce kulhá. Zkus změnit nastavení a porovnat.' };
  return                  { score:0, kind:'fail', title:'Tohle se nepovedlo.', body:'Tiskárna sice tiskne, ale výsledek nesedí. Zkus to jinak.' };
}

const matLabel    = id => MATERIALS.find(m => m.id === id)?.code   || '—';
const matFull     = id => MATERIALS.find(m => m.id === id)?.name   || '—';
const infillLabel = id => INFILLS.find(i => i.id === id)?.name     || '—';
const speedLabel  = id => SPEEDS.find(s => s.id === id)?.name      || '—';
const matColor    = id => MATERIALS.find(m => m.id === id)?.color  || '#ccc';

// Tips (the "Víš, že…" overlay) — keyed by item id
const TIPS = {
  kachnicka:'TPU se natáhne až 5× délky a vrátí se zpět. Skvělý na měkké hračky.',
  pohar:    'PLA vzniká z kukuřičného škrobu. 🌽 A dává nejhladší povrchy.',
  terc:     'Plná výplň + PETG = pevný terč, který šipky nezdolají.',
  loutka:   'Na prstu chceme pružnost — TPU se přizpůsobí prstu jako rukavice.',
  kostka:   'Pomalý tisk = ostré číslice. Plná výplň = nedeformuje se při dopadu.',
  kvetinac: 'Dutá výplň = lehký květináč. Parapet ti za to poděkuje.',
  'stojanek-tel':'PETG je tužší než PLA — telefon stojí pevně.',
  vesak:    'Plná výplň zpevní stěny kolem šroubu. Klíče nepadají.',
  mydlo:    'PETG odolá vodě a mýdlu. PLA by časem nasákl vlhkost.',
  svicen:   'PLA + pomalu = krásné detaily a hladký povrch dekorace.',
  stojanek: 'Střední výplň drží stabilitu, ale neutáhne stůl tíhou.',
  zkumavky: 'PETG odolá chemikáliím — laborka mu nedá. PLA by reagoval.',
  puzzle:   'Pomalý tisk = přesné okraje. Dílky pak hezky pasují.',
  pravitko: 'Pomalu tištěné dílky = přesné mm. Tužší materiál se neprohne.',
  raketka:  'Dekorace nic nenese — dutá výplň ušetří plast i čas.',
  krmitko:  'PETG vydrží mráz i déšť. PLA by venku za zimu zvlhl a praskl.',
  visacka:  'PETG nežloutne na slunci. Hodí se na cokoli ven.',
  hmyz:     'Plná výplň + PETG = roky venku bez prasklin.',
  leknin:   'TPU plave a vlní se s vodou. Skvěle imituje skutečný leknín.',
  seminka:  'PETG drží suchá semínka i ve vlhkém skleníku.',
  pouzdro:  'TPU pohlcuje nárazy. Telefon pád přežije.',
  kabely:   'TPU se rozevře a zase zacvakne — ideální pro klipy.',
  mys:      'TPU se přizpůsobí zápěstí. Po hodině práce nic nebolí.',
  ozubeni:  'Pomalu = přesný tvar zubu. PETG se brzy neopotřebí.',
  vypinac:  'PLA dává hladký povrch a přesné rozměry pro šrouby.',
};

Object.assign(window, {
  GROUPS, MATERIALS, INFILLS, SPEEDS, PREDICTIONS, REFLECTIONS, TIPS,
  evaluatePrint, matLabel, matFull, infillLabel, speedLabel, matColor,
});
