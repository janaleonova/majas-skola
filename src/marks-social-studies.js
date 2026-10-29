// Sociālās zinības 4. klase: Kā plānot un patērēt resursus saprātīgi?
// Gatavošanās pārbaudes darbam (8 SR bloki + 5 Zelta bonusi Markam)

export const SOCIAL_TOPICS = [
  { id: 'concepts', title: '1. Jēdzieni: patērētājs, vajadzība, vēlme, pircējs, barters', points: 5, icon: '📖' },
  { id: 'needs_wants', title: '2. Situāciju analīze: vajadzība vai vēlme?', points: 5, icon: '⚖️' },
  { id: 'statements', title: '3. Apgalvojumu vērtēšana: patiess vai nepatiess (11 apgalvojumi)', points: 11, icon: '🔍' },
  { id: 'best_buy', title: '4. Izdevīgākā pirkuma izvēle un loģisks pamatojums', points: 2, icon: '🛒' },
  { id: 'packaging', title: '5. Informācijas izpēte uz iepakojuma un etiķetes', points: 9, icon: '🏷️' },
  { id: 'security', title: '6. Banknošu pretviltošanas elementi', points: 4, icon: '💶' },
  { id: 'money_history', title: '7. Naudas vēstures attēli hronoloģiskā secībā', points: 4, icon: '⏳' },
  { id: 'compare_prices', title: '8. Cenu salīdzināšana un jautājumi problēmas risināšanai', points: 3, icon: '💡' },
  { id: 'golden_bonuses', title: '🌟 Zelta bonusi Markam (50/30/20, triki, vienības cena, 3R)', points: 15, icon: '🏆' }
];

export const CONCEPTS_DATA = [
  {
    term: 'Patērētājs',
    definition: 'Cilvēks, kurš izmanto (patērē) preces vai pakalpojumus savu vajadzību un vēlmju apmierināšanai.',
    example: 'Kad tu apēd ābolu, brauc ar autobusu vai skaties filmu kinoteātrī, tu esi patērētājs.',
    icon: '👤'
  },
  {
    term: 'Vajadzība',
    definition: 'Tas, kas cilvēkam ir absolūti nepieciešams izdzīvošanai un veselībai (ūdens, ēdiens, silts apģērbs, mājoklis, drošība).',
    example: 'Bez dzeramā ūdens un droša mājokļa cilvēks nevar izdzīvot.',
    icon: '🍞'
  },
  {
    term: 'Vēlme',
    definition: 'Tas, ko cilvēks gribētu iegūt priekam, ērtībai vai izklaidei, bet bez kā var pilnībā iztikt.',
    example: 'Jaunākais telefons, jauna spēle, čipsi vai zīmola keda ir vēlme, nevis pamatvajadzība.',
    icon: '🎮'
  },
  {
    term: 'Pircējs',
    definition: 'Cilvēks, kurš iegādājas preces vai pakalpojumus, samaksājot par tiem ar naudu.',
    example: 'Veikalā pie kases tu samaksā par burtnīcu un kļūsti par pircēju.',
    icon: '🛒'
  },
  {
    term: 'Barters',
    definition: 'Preču vai pakalpojumu tieša maiņa pret citām precēm bez naudas starpniecības.',
    example: 'Tu iedod draugam grāmatu pret viņa spēļu figūriņu bez naudas maksāšanas.',
    icon: '🔄'
  }
];

export const NEEDS_WANTS_DATA = [
  {
    scenario: 'Dzeramais ūdens pēc sporta nodarbības karstā dienā.',
    type: 'Vajadzība',
    explanation: 'Cilvēka ķermenim ūdens ir vitāli svarīgs izdzīvošanai un veselībai.',
    icon: '💧'
  },
  {
    scenario: 'Jaunākā modeļa spēļu konsole, lai spēlētu ar draugiem.',
    type: 'Vēlme',
    explanation: 'Tā ir patīkama izklaide, bet bez tās cilvēka dzīvība un veselība nav apdraudēta.',
    icon: '🎮'
  },
  {
    scenario: 'Silta ziemas jaka un zābaki, kad ārā ir -15°C sals.',
    type: 'Vajadzība',
    explanation: 'Apģērbs aizsargā ķermeni no sala un novērš bīstamu saslimšanu.',
    icon: '🧥'
  },
  {
    scenario: 'Saldināta gāzēta limonāde un čipsu paka katru dienu.',
    type: 'Vēlme',
    explanation: 'Šie ir našķi; pamatēdiens un vitamīni ir vajadzība, bet čipsi — vēlme.',
    icon: '🥤'
  },
  {
    scenario: 'Zāles un ārsta apmeklējums, kad ir augsta temperatūra.',
    type: 'Vajadzība',
    explanation: 'Ārstēšanās ir nepieciešama, lai atgūtu veselību un novērstu komplikācijas.',
    icon: '💊'
  }
];

export const STATEMENTS_DATA = [
  { id: 1, text: 'Nauda ir universāls maksāšanas līdzeklis, ar kuru var novērtēt un iegādāties preces un pakalpojumus.', correct: true, explain: 'Patiess. Nauda atvieglo tirdzniecību un kalpo kā vērtības mērs.' },
  { id: 2, text: 'Ģimenes budžetā izdevumiem vienmēr jābūt lielākiem par ienākumiem.', correct: false, explain: 'Nepatiess! Ienākumiem jābūt lielākiem vai vienādiem ar izdevumiem, citādi rodas parādi.' },
  { id: 3, text: 'Barters ir darījums, kurā vienu preci apmaina pret citu preci bez naudas starpniecības.', correct: true, explain: 'Patiess. Tā ir tieša preču maiņa (prece pret preci).' },
  { id: 4, text: 'Reklāmas galvenais mērķis ir tikai izglītot cilvēkus par zinātni un vēsturi.', correct: false, explain: 'Nepatiess! Reklāmas galvenais mērķis ir pārliecināt patērētāju nopirkt preci vai pakalpojumu.' },
  { id: 5, text: 'Klients ir persona vai organizācija, kas saņem pakalpojumu vai pērk preci no uzņēmuma.', correct: true, explain: 'Patiess. Klients ir pakalpojuma saņēmējs vai pircējs.' },
  { id: 6, text: 'Preces cenu veikalā nosaka tikai un vienīgi pircēja vēlēšanās.', correct: false, explain: 'Nepatiess! Cenu veido ražošanas izmaksas, izejvielas, algas, nodokļi un konkurence.' },
  { id: 7, text: 'Tirdzniecība ir process, kurā notiek preču pirkšana un pārdošana par naudu.', correct: true, explain: 'Patiess. Tirdzniecība savieno ražotāju ar pircēju.' },
  { id: 8, text: 'Alga un kabatas nauda ir ienākumi, bet maksa par elektrību un pārtiku ir izdevumi.', correct: true, explain: 'Patiess. Ienākumi naudu ienes, bet izdevumi to tērē.' },
  { id: 9, text: 'Pirkumu saraksta sastādīšana pirms veikala palīdz ietaupīt naudu un resursus.', correct: true, explain: 'Patiess. Saraksts pasargā no liekiem un spontāniem pirkumiem.' },
  { id: 10, text: 'Visi reklāmā minētie solījumi vienmēr ir 100% patiesi un pilnīgi objektīvi.', correct: false, explain: 'Nepatiess! Reklāmās bieži pārspīlē preces labās īpašības un noklusē trūkumus.' },
  { id: 11, text: 'Uzkrājumi ("drošības spilvens") palīdz ģimenei segt negaidītus un pēkšņus tēriņus.', correct: true, explain: 'Patiess. Uzkrājumi sniedz finansiālu drošību un mieru.' }
];

export const BEST_BUY_DATA = {
  scenario: 'Markam skolai vajag iegādāties burtnīcas. Viņš salīdzina divus veikalus:',
  optionA: { store: 'Veikals “Zīmulis”', offer: 'Paka ar 4 burtnīcām maksā 2,00 €', unitPrice: 0.50 },
  optionB: { store: 'Veikals “Lielais Maiss”', offer: 'Komplekts ar 10 burtnīcām maksā 3,50 €', unitPrice: 0.35 },
  correctChoice: 'B',
  correctStore: 'Veikals “Lielais Maiss”',
  explanation: 'Komplektā viena burtnīca maksā 0,35 € (3,50 € / 10 = 0,35 €), bet mazajā pakā viena burtnīca maksā 0,50 € (2,00 € / 4 = 0,50 €). Vienas vienības cena Veikalā B ir par 0,15 € lētāka, tāpēc, pērkot vairāk ilgākam laikam, šis pirkums ir izdevīgāks!'
};

export const PACKAGING_DATA = [
  {
    q: '1. Kāds ir preces nosaukums un neto daudzums uz iepakojuma?',
    a: 'Nosaukums: Piens “Lauku spēks” 2,5%; Neto tilpums: 1 litrs (1000 ml).',
    hint: 'Skaties uz iepakojuma priekšpusi lielo uzrakstu un apakšējo tilpuma norādi.'
  },
  {
    q: '2. Līdz kuram datumam šis produkts ir derīgs lietošanā?',
    a: 'Līdz datumam, kas norādīts iepakojuma augšpusē (piem., “Izlietot līdz: 05.11.2026”).',
    hint: 'Meklē norādi “Izlietot līdz” un termiņa zīmogu.'
  },
  {
    q: '3. Kāda ir atšķirība starp norādi “Izlietot līdz...” un “Ieteicams līdz...”? Pamato!',
    a: '“Izlietot līdz” lieto ātri bojājošos produktiem (pienam, gaļai, zivīm) — pēc šī datuma lietot ir bīstami veselībai. “Ieteicams līdz” lieto ilgi glabājamiem produktiem (makaroniem, tējai) — pēc šī datuma var nedaudz mazināties garša vai smarža, bet produkts nav uzreiz kaitīgs.',
    hint: 'Veselības drošība pret kvalitātes ieteikumu.'
  },
  {
    q: '4. Kādā temperatūrā produkts jāuzglabā pēc atvēršanas?',
    a: 'Ledusskapī temperatūrā no +2°C līdz +6°C un jāizlieto dažu dienu laikā.',
    hint: 'Uz iepakojuma ir temperatūras skala ar grādiem pēc Celsija.'
  },
  {
    q: '5. Kā no sastāvdaļu saraksta var uzzināt, kuras izejvielas produktā ir visvairāk?',
    a: 'Sastāvdaļas vienmēr tiek uzskaitītas dilstošā secībā — tā viela, kas sarakstā minēta pati pirmā, produktā ir visvairāk.',
    hint: 'Dilstošā svara secības likums.'
  },
  {
    q: '6. Kāpēc uz iepakojuma ir obligāti jānorāda alergēni (piem., laktoze, glutēns, rieksti)?',
    a: 'Lai pasargātu cilvēkus ar pārtikas alerģijām no smagām veselības problēmām un dzīvībai bīstamām reakcijām.',
    hint: 'Patērētāja veselības un drošības aizsardzība.'
  },
  {
    q: '7. Ko nozīmē zaļās lapas ekomarķējuma simbols uz produkta?',
    a: 'Tas apliecina, ka produkts ražots bioloģiskajā lauksaimniecībā bez mākslīgiem pesticīdiem, antibiotikām un ĢMO, saudzējot dabu.',
    hint: 'Sertificēta bioloģiskā pārtika.'
  },
  {
    q: '8. Kādā atkritumu konteinerā pareizi jāizmet iztukšotā un saplacinātā tetrapaka?',
    a: 'Dzeltenajā konteinerā (vieglajam iepakojumam — plastmasai, metālam un kombinētajam kartona iepakojumam).',
    hint: 'Šķirotie atkritumi un iepakojuma pārstrāde.'
  },
  {
    q: '9. Kāpēc atbildīgs patērētājs vienmēr izpēta iepakojumu pirms pirkuma veikšanas? Pamato!',
    a: 'Lai pārliecinātos par derīguma termiņu, preces svaigumu, veselīgu sastāvu un nepārmaksātu par nevajadzīgām piedevām, tādējādi gudri plānojot resursus.',
    hint: 'Gudra patēriņa un veselības pamatojums.'
  }
];

export const SECURITY_ELEMENTS_DATA = [
  {
    name: '1. Ūdenszīme (Watermark)',
    desc: 'Skatoties uz banknoti pret gaismu, kļūst redzams caurspīdīgs Eiropas portrets un banknotes nomināla skaitlis.',
    action: 'Apskati pret gaismu',
    icon: '💡'
  },
  {
    name: '2. Drošības josla (Security thread)',
    desc: 'Tumša vertikāla līnija cauri banknotei, uz kuras pret gaismu redzams sīks eiro simbols € un vērtība.',
    action: 'Apskati pret gaismu',
    icon: '🧵'
  },
  {
    name: '3. Hologrāfiskā josla / Hologramma',
    desc: 'Pagrozot banknoti, sudrabotajā joslā mainās krāsas un parādās kustīgs eiro simbols, lodziņš un portrets.',
    action: 'Pagrozi banknoti',
    icon: '✨'
  },
  {
    name: '4. Reljefā druka (Taustāmais reljefs)',
    desc: 'Banknotes malās un uz lielā skaitļa ir reljefas svītriņas, kas ar pirkstiem jūtamas kā raupjas līnijas (palīdz arī vājredzīgiem cilvēkiem).',
    action: 'Patausti ar pirkstiem',
    icon: '👆'
  }
];

export const MONEY_HISTORY_DATA = [
  {
    step: 1,
    title: 'Preču nauda / Barters',
    period: 'Senie laiki (pirms monētām)',
    desc: 'Cilvēki mainīja vērtīgas preces: kauri gliemežvākus, sāli, kažokādas, graudus un mājlopus.',
    icon: '🐚'
  },
  {
    step: 2,
    title: 'Kaltās metāla monētas',
    period: 'Antīkie laiki un viduslaiki',
    desc: 'Zelta, sudraba un vara monētas ar valdnieku attēliem, kas bija vieglāk pārnēsājamas un ilgāk kalpoja.',
    icon: '🪙'
  },
  {
    step: 3,
    title: 'Papīra nauda (Banknotes)',
    period: 'No 17. gadsimta līdz mūsdienām',
    desc: 'Valsts garantētas papīra banknotes ar parakstiem un pretviltošanas zīmēm, kas aizstāja smagos zelta maisus.',
    icon: '💵'
  },
  {
    step: 4,
    title: 'Elektroniskā & Bezkontakta nauda',
    period: '21. gadsimts (Mūsdienas)',
    desc: 'Maksājumi ar bankas kartēm, viedtālruņiem, pulksteņiem un internetbanku bez fiziskas naudas aptaustīšanas.',
    icon: '💳'
  }
];

export const PRICE_COMPARISON_QUESTIONS = [
  {
    q: '1. Cik liela ir kopējā gala cena katrā vietā, pieskaitot piegādes un transporta izdevumus?',
    why: 'Interneta veikalā cena var izskatīties zemāka, bet kopā ar piegādes maksu (piem., +4 €) tā var kļūt dārgāka nekā veikalā uz vietas.'
  },
  {
    q: '2. Vai pārdevējs izsniedz čeku un nodrošina 2 gadu garantiju, ja precei atklāsies brāķis?',
    why: 'Tirgū vai no rokas pirktām precēm bieži nav čeka un garantijas, tāpēc defekta gadījumā nauda tiks zaudēta.'
  },
  {
    q: '3. Cik steidzami prece ir nepieciešama un vai ir vērts gaidīt piegādi?',
    why: 'Ja lieta vajadzīga rītdienas skolas stundai, jāpērk uz vietas, bet, ja var pagaidīt nedēļu, interneta pasūtījums var būt izdevīgāks.'
  }
];

export const GOLDEN_BONUSES_DATA = [
  {
    id: 'bonus_budget_rule',
    title: '🌟 1. Bonuss: 50 / 30 / 20 Zelta budžeta likums',
    desc: 'Kā gudrs patērētājs sadala savus ienākumus?',
    details: '• 50% — Pamatvajadzībām (ēdiens, mājoklis, komunālie maksājumi, skola).\n• 30% — Vēlmēm un priekam (hobiji, kino, našķi, izklaide).\n• 20% — Uzkrājumiem un drošības spilvenam (nākotnei un negaidītiem gadījumiem).',
    badge: '+4 BP'
  },
  {
    id: 'bonus_store_tricks',
    title: '🌟 2. Bonuss: Lielveikalu viltības un mārketinga triki',
    desc: 'Kā veikali mudina tevi tērēt vairāk?',
    details: '• Svaigas maizes un vaniļas smarža pie ieejas izraisa izsalkumu un vēlmi pirkt vairāk.\n• Dārgākās preces novieto acu līmenī, bet lētākās — pašos apakšējos vai augšējos plauktos.\n• Košas konfektes un sīkumi pie kases ir "spontānie pirkumi" garlaikotiem gaidītājiem.\n• Pirkumu ratiņi ir lieli, lai tukšums tajos liktos neomulīgs.',
    badge: '+4 BP'
  },
  {
    id: 'bonus_unit_price',
    title: '🌟 3. Bonuss: Vienības cena (Cena par 1 kg vai 1 litru)',
    desc: 'Kā atrast patieso izdevīgumu starp dažādiem iepakojumiem?',
    details: 'Vienmēr skaties uz mazajiem skaitļiem dzeltenajā vai baltajā cenu zīmē — “Cena par 1 kg” vai “Cena par 1 l”. Lielāks iepakojums ne vienmēr ir lētāks, un vienības cena atklāj patiesību!',
    badge: '+3 BP'
  },
  {
    id: 'bonus_circular_3r',
    title: '🌟 4. Bonuss: Ilgtspējīgs patēriņš un 3R likums',
    desc: 'Kā plānot resursus, lai saudzētu planētu Zemi?',
    details: '1. REDUCE (Samazini) — pērc tikai to, kas patiešām vajadzīgs.\n2. REUSE (Lieto atkārtoti) — izmanto auduma maisiņus un labo salauztās lietas.\n3. RECYCLE (Pārstrādā) — sašķiro atkritumus, lai materiāli pārtaptu jaunās lietās.',
    badge: '+2 BP'
  },
  {
    id: 'bonus_fake_money',
    title: '🌟 5. Bonuss: Kā rīkoties, ja rokās nonāk aizdomīga nauda?',
    desc: 'Atbildīga pilsoņa rīcības plāns',
    details: 'Nekādā gadījumā nemēģini to iztērēt vai nodot citam cilvēkam — viltotas naudas izplatīšana ir likuma pārkāpums! Aizdomīga banknote nekavējoties jānogādā bankas filiālē pārbaudei vai jāziņo policijai.',
    badge: '+2 BP'
  }
];

export function renderMarksSocialStudies(root, { canSubmit = false, saveProgress = async () => {}, initialState = null, onCheckpoint = () => {} } = {}) {
  const host = document.createElement('section');
  host.className = 'module learning-hub marks-social-studies';
  root.append(host);

  let currentTab = 'overview'; // 'overview' | 'trainer' | 'bonuses' | 'exam' | 'print'
  let activeTopic = 'concepts';
  let examAnswers = {};
  let examScore = 0;
  let examDone = false;

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function render() {
    onCheckpoint({ currentTab, activeTopic, examAnswers, examScore, examDone });
    host.replaceChildren();

    // Augšējais hero baneris
    const hero = el('div', 'english-sr-banner');
    hero.style.background = 'linear-gradient(135deg, #1e3a8a, #0d9488)';
    const badge = el('span', 'english-sr-badge', '🏛️ SOCIĀLĀS ZINĪBAS · 4. KLASE · P.D. MEISTARĪBA');
    const title = el('h2', 'english-sr-title', 'Kā plānot un patērēt resursus saprātīgi?');
    const desc = el('p', 'english-sr-desc', 'Sagatavojies pārbaudes darbam: 8 prasmju bloki (43 p.) + 5 Zelta bonusi Markam (+20 BP).');
    hero.append(badge, title, desc);

    // Navigācijas cilnes
    const tabRow = el('div', 'english-nav-tabs');
    const tabs = [
      ['overview', '📋 P.D. Pārskats & Vērtēšana'],
      ['trainer', '🎯 8 SR Prasmju trenažieris'],
      ['bonuses', '🌟 5 Zelta bonusi Markam'],
      ['exam', '🏆 P.D. Pārbaude (par BP)'],
      ['print', '🖨️ Drukājamā darba lapa']
    ];
    tabs.forEach(([k, label]) => {
      const btn = el('button', 'english-nav-tab' + (currentTab === k ? ' active' : ''), label);
      btn.onclick = () => {
        currentTab = k;
        render();
      };
      tabRow.append(btn);
    });
    hero.append(tabRow);
    host.append(hero);

    if (currentTab === 'overview') renderOverview();
    else if (currentTab === 'trainer') renderTrainer();
    else if (currentTab === 'bonuses') renderBonuses();
    else if (currentTab === 'exam') renderExam();
    else if (currentTab === 'print') renderPrint();
  }

  // 1. Pārskats & Vērtēšanas kritēriji
  function renderOverview() {
    const wrap = el('div', 'english-worksheet');

    const card = el('section', 'worksheet-task-box');
    card.append(
      el('h3', 'worksheet-task-title', 'Pārbaudes darba struktūra un sasniedzamie rezultāti (43 p.)'),
      el('p', undefined, 'Pārbaudes darbs sastāv no 8 daļām, kurās vērtē prasmi izprast ekonomikas pamatjēdzienus, atšķirt vajadzības no vēlmēm, pētīt iepakojumu un pieņemt atbildīgus lēmumus.')
    );

    const table = el('div', undefined);
    table.style.display = 'grid';
    table.style.gap = '10px';
    table.style.margin = '14px 0';

    SOCIAL_TOPICS.forEach((t, i) => {
      const row = el('div', 'worksheet-question-row');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.justifyContent = 'space-between';
      row.style.gap = '12px';

      const left = el('div', undefined);
      left.innerHTML = `<strong>${t.icon} ${t.title}</strong>`;
      const right = el('span', 'grammar-badge grammar-badge-is', `${t.points} punkti`);
      row.append(left, right);
      table.append(row);
    });
    card.append(table);

    const ctaRow = el('div', 'reading-controls');
    const startTrainBtn = el('button', 'action-button', '🎯 Sākt 8 SR trenažieri →');
    startTrainBtn.onclick = () => {
      currentTab = 'trainer';
      render();
    };
    const startBonusBtn = el('button', 'action-button', '🌟 Atvērt Zelta bonusus (+20 BP) →');
    startBonusBtn.style.background = 'linear-gradient(135deg, #d97706, #f59e0b)';
    startBonusBtn.onclick = () => {
      currentTab = 'bonuses';
      render();
    };
    ctaRow.append(startTrainBtn, startBonusBtn);
    card.append(ctaRow);

    wrap.append(card);
    host.append(wrap);
  }

  // 2. 8 SR Prasmju trenažieris
  function renderTrainer() {
    const wrap = el('div', 'english-worksheet');

    // Tēmu pārslēdzējs
    const subNav = el('div', 'english-nav-tabs');
    SOCIAL_TOPICS.filter(t => t.id !== 'golden_bonuses').forEach(t => {
      const btn = el('button', 'english-nav-tab' + (activeTopic === t.id ? ' active' : ''), `${t.icon} SR ${t.title.split('.')[0]}`);
      btn.onclick = () => {
        activeTopic = t.id;
        render();
      };
      subNav.append(btn);
    });
    wrap.append(subNav);

    const box = el('section', 'worksheet-task-box');

    if (activeTopic === 'concepts') {
      box.append(
        el('h3', 'worksheet-task-title', '1. SR: Skaidro jēdzienus – patērētājs, vajadzība, vēlme, pircējs, barters (5 p.)'),
        el('p', undefined, 'Iepazīsties ar 5 galvenajiem ekonomikas jēdzieniem un to piemēriem:')
      );
      CONCEPTS_DATA.forEach((item, idx) => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `
          <div style="font-size: 1.15rem; font-weight: 900; color: #1e3a8a; margin-bottom: 4px;">
            ${item.icon} ${idx + 1}. ${item.term}
          </div>
          <p style="margin: 4px 0 6px; font-weight: 700; color: #1e293b;">${item.definition}</p>
          <small style="color: #047857; font-style: italic;">Piemērs: ${item.example}</small>
        `;
        box.append(row);
      });
    } else if (activeTopic === 'needs_wants') {
      box.append(
        el('h3', 'worksheet-task-title', '2. SR: Dotajās situācijās atšķir vēlmes no vajadzībām (5 p.)'),
        el('p', undefined, 'Pārbaudi sevi: izvērtē situāciju un nosaki, vai tā ir pamatvajadzība vai vēlme!')
      );
      NEEDS_WANTS_DATA.forEach((item, idx) => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `<strong>${item.icon} ${idx + 1}. Situācija:</strong> ${item.scenario}`;
        const btnGroup = el('div', 'reading-controls');
        const feedback = el('p', undefined, '');

        ['Vajadzība', 'Vēlme'].forEach(choice => {
          const b = el('button', 'action-button', choice);
          b.onclick = () => {
            [...btnGroup.querySelectorAll('button')].forEach(btn => btn.disabled = true);
            if (choice === item.type) {
              b.style.background = '#10b981';
              feedback.style.color = '#047857';
              feedback.textContent = `✅ Pareizi! Tas ir: ${item.type}. Pamatojums: ${item.explanation}`;
            } else {
              b.style.background = '#ef4444';
              feedback.style.color = '#b91c1c';
              feedback.textContent = `⚠️ Nepareizi. Pareizā atbilde ir: ${item.type}. Pamatojums: ${item.explanation}`;
            }
          };
          btnGroup.append(b);
        });
        row.append(btnGroup, feedback);
        box.append(row);
      });
    } else if (activeTopic === 'statements') {
      box.append(
        el('h3', 'worksheet-task-title', '3. SR: Novērtē apgalvojumus (patiess/nepatiess) — 11 jautājumi (11 p.)'),
        el('p', undefined, 'Izlasi apgalvojumu un atzīmē, vai tas ir patiess vai nepatiess:')
      );
      STATEMENTS_DATA.forEach((item, idx) => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `<strong>${idx + 1}. Apgalvojums:</strong> ${item.text}`;
        const btnGroup = el('div', 'reading-controls');
        const feedback = el('small', undefined, '');

        [
          { label: 'Patiess', val: true },
          { label: 'Nepatiess', val: false }
        ].forEach(opt => {
          const b = el('button', 'action-button', opt.label);
          b.onclick = () => {
            [...btnGroup.querySelectorAll('button')].forEach(btn => btn.disabled = true);
            if (opt.val === item.correct) {
              b.style.background = '#10b981';
              feedback.style.color = '#047857';
              feedback.textContent = `✅ Pareizi! ${item.explain}`;
            } else {
              b.style.background = '#ef4444';
              feedback.style.color = '#b91c1c';
              feedback.textContent = `⚠️ Kļūda! Pareizā atbilde: ${item.correct ? 'Patiess' : 'Nepatiess'}. ${item.explain}`;
            }
          };
          btnGroup.append(b);
        });
        row.append(btnGroup, feedback);
        box.append(row);
      });
    } else if (activeTopic === 'best_buy') {
      const bData = BEST_BUY_DATA;
      box.append(
        el('h3', 'worksheet-task-title', '4. SR: Izvēlas izdevīgāko pirkumu un pamato izvēli (2 p.)'),
        el('p', undefined, bData.scenario)
      );
      const grid = el('div', 'grammar-guide-grid');
      const cardA = el('div', 'grammar-card');
      cardA.innerHTML = `<h4>A: ${bData.optionA.store}</h4><p>${bData.optionA.offer}</p><small>Vienas burtnīcas cena: <strong>0,50 €</strong></small>`;
      const cardB = el('div', 'grammar-card');
      cardB.innerHTML = `<h4>B: ${bData.optionB.store}</h4><p>${bData.optionB.offer}</p><small>Vienas burtnīcas cena: <strong>0,35 €</strong></small>`;
      grid.append(cardA, cardB);
      box.append(grid);

      const decision = el('div', 'worksheet-question-row');
      decision.innerHTML = `
        <strong>Kāds ir tavs lēmums un pamatojums?</strong>
        <p style="margin: 8px 0; color: #047857; font-weight: 700;">✅ Izdevīgākais pirkums: ${bData.correctStore}</p>
        <p style="margin: 4px 0; color: #334155;">💡 <strong>Loģisks pamatojums:</strong> ${bData.explanation}</p>
      `;
      box.append(decision);
    } else if (activeTopic === 'packaging') {
      box.append(
        el('h3', 'worksheet-task-title', '5. SR: Pēta informāciju uz iepakojuma un atbild uz jautājumiem (9 p.)'),
        el('p', undefined, 'Izpēti piena pakas etiķeti un uzzini, ko stāsta katrs marķējuma elements:')
      );
      PACKAGING_DATA.forEach((item, idx) => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `
          <strong>${item.q}</strong>
          <p style="margin: 6px 0 4px; color: #047857; font-weight: 700;">✅ Pareizā atbilde: ${item.a}</p>
          <small style="color: #64748b;">Padoms: ${item.hint}</small>
        `;
        box.append(row);
      });
    } else if (activeTopic === 'security') {
      box.append(
        el('h3', 'worksheet-task-title', '6. SR: Norāda un nosauc banknošu pretviltošanas elementus (4 p.)'),
        el('p', undefined, 'Apskati 4 galvenos eiro banknošu aizsardzības elementus (likums: “Apturi, apskati, patausti, pagrozi”):')
      );
      const grid = el('div', 'grammar-guide-grid');
      SECURITY_ELEMENTS_DATA.forEach(sec => {
        const card = el('div', 'grammar-card');
        card.innerHTML = `
          <h4>${sec.icon} ${sec.name}</h4>
          <span class="grammar-badge grammar-badge-is" style="margin-bottom: 8px;">Darbība: ${sec.action}</span>
          <p style="margin-top: 8px; font-size: 0.92rem; color: #334155;">${sec.desc}</p>
        `;
        grid.append(card);
      });
      box.append(grid);
    } else if (activeTopic === 'money_history') {
      box.append(
        el('h3', 'worksheet-task-title', '7. SR: Sakārto naudas attēlus hronoloģiskā secībā (4 p.)'),
        el('p', undefined, 'Naudas evolūcija no senajiem laikiem līdz mūsdienām:')
      );
      MONEY_HISTORY_DATA.forEach(h => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <strong style="font-size: 1.15rem; color: #1e3a8a;">${h.icon} ${h.step}. posms: ${h.title}</strong>
            <span class="grammar-badge grammar-badge-am">${h.period}</span>
          </div>
          <p style="margin: 6px 0 0; color: #334155;">${h.desc}</p>
        `;
        box.append(row);
      });
    } else if (activeTopic === 'compare_prices') {
      box.append(
        el('h3', 'worksheet-task-title', '8. SR: Cenu salīdzināšana un 3 jautājumi problēmas risināšanai (3 p.)'),
        el('p', undefined, 'Situācija: Marks meklē skolas mugursomu veikalā (35 €), internetā (25 € + 4 € piegāde) un tirgū (18 €). Kādus 3 jautājumus jāuzdod?')
      );
      PRICE_COMPARISON_QUESTIONS.forEach((item, idx) => {
        const row = el('div', 'worksheet-question-row');
        row.innerHTML = `
          <strong style="color: #1e3a8a;">${item.q}</strong>
          <p style="margin: 4px 0 0; color: #047857; font-size: 0.95rem;">💡 <strong>Pamatojums:</strong> ${item.why}</p>
        `;
        box.append(row);
      });
    }

    wrap.append(box);
    host.append(wrap);
  }

  // 3. 5 Zelta bonusi Markam
  function renderBonuses() {
    const wrap = el('div', 'english-worksheet');

    const banner = el('section', 'english-sr-banner');
    banner.style.background = 'linear-gradient(135deg, #b45309, #f59e0b)';
    banner.append(
      el('span', 'english-sr-badge', '🌟 ĪPAŠIE BONUSA UZDEVUMI MARKAM'),
      el('h3', 'english-sr-title', '5 Zelta meistarības tēmas ar ekskluzīviem BP bonusiem!'),
      el('p', 'english-sr-desc', 'Padziļināta izpratne par ģimenes budžetu, lielveikalu mārketinga trikiem, vienības cenu, aprites ekonomiku un viltotas naudas rīcību.')
    );
    wrap.append(banner);

    GOLDEN_BONUSES_DATA.forEach(b => {
      const box = el('section', 'worksheet-task-box');
      box.style.borderLeft = '5px solid #f59e0b';
      const head = el('div', 'vocab-card-header');
      head.append(
        el('h4', 'worksheet-task-title', b.title),
        el('span', 'grammar-badge grammar-badge-are', b.badge)
      );
      box.append(head, el('p', undefined, b.desc));

      const detailsBox = el('div', 'worksheet-question-row');
      detailsBox.style.background = '#fefce8';
      detailsBox.style.borderColor = '#fef08a';
      detailsBox.style.whiteSpace = 'pre-line';
      detailsBox.style.lineHeight = '1.7';
      detailsBox.innerHTML = `<strong>Pētnieka piezīmes:</strong>\n${b.details}`;
      box.append(detailsBox);

      wrap.append(box);
    });

    const cta = el('div', 'reading-controls');
    const startExamBtn = el('button', 'action-button', '🏆 Sākt pārbaudes darbu ar Zelta bonusiem (+20 BP) →');
    startExamBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    startExamBtn.onclick = () => {
      currentTab = 'exam';
      render();
    };
    cta.append(startExamBtn);
    wrap.append(cta);

    host.append(wrap);
  }

  // 4. Pārbaudes darbs (par BP punktiem)
  function renderExam() {
    const wrap = el('div', 'english-worksheet');

    if (examDone) {
      const resultCard = el('section', 'english-sr-banner');
      const isExcellent = examScore >= 80;
      resultCard.style.background = isExcellent ? 'linear-gradient(135deg, #065f46, #059669)' : 'linear-gradient(135deg, #b45309, #d97706)';
      resultCard.append(
        el('span', 'english-sr-badge', isExcellent ? '🌟 TEICAMI · SR SASNIEGTS UN ZELTA BONUSS NOPELNĪTS!' : '🌱 LABS REZULTĀTS · VARI ATKĀRTOT'),
        el('h2', 'english-sr-title', `Rezultāts: ${examScore}%`),
        el('p', 'english-sr-desc', `Pārbaudes darba uzdevumi izpildīti. Marks saņem oficiālo Sociālo zinību 4. klases apliecinājumu!`)
      );
      wrap.append(resultCard);

      const diploma = el('div', 'print-worksheet-sheet');
      diploma.innerHTML = `
        <div style="text-align: center; border: 3px double #0d9488; padding: 24px; border-radius: 12px; background: #f0fdfa;">
          <h2 style="color: #0f766e; margin: 0 0 6px;">📜 APLIECINĀJUMS SOCIĀLAJĀS ZINĪBĀS</h2>
          <p style="margin: 0; font-size: 1.1rem; color: #134e4a;">4. klases pārbaudes darbs: “Kā plānot un patērēt resursus saprātīgi?”</p>
          <div style="margin: 20px 0; font-size: 1.4rem; font-weight: 900; color: #115e59;">
            Piešķirts skolēnam: <u>Marks</u>
          </div>
          <p style="font-size: 1.1rem; line-height: 1.6;">
            Sasniegtais rezultāts: <strong>${examScore}%</strong> · Vērtējums: <strong>${examScore >= 90 ? '10 (Izcili)' : examScore >= 80 ? '9 (Teicami)' : '8 (Ļoti labi)'}</strong><br>
            🌟 Zelta Bonusa statuss: <strong>Finanšu un Resursu Meistars</strong>
          </p>
          <div style="margin-top: 18px; font-size: 0.9rem; color: #4b5563; display: flex; justify-content: space-between;">
            <span>Datums: ${new Date().toLocaleDateString('lv-LV')}</span>
            <span>Skolotājs / Vecāks: _________________</span>
          </div>
        </div>
      `;
      wrap.append(diploma);

      const navCta = el('div', 'reading-controls');
      const retryBtn = el('button', 'action-button', 'Atkārtot pārbaudi');
      retryBtn.onclick = () => {
        examDone = false;
        examAnswers = {};
        render();
      };
      const toTrainerBtn = el('button', 'action-button', '← Atgriezties trenažierī');
      toTrainerBtn.onclick = () => {
        currentTab = 'trainer';
        render();
      };
      navCta.append(retryBtn, toTrainerBtn);
      wrap.append(navCta);

      host.append(wrap);
      return;
    }

    const examBox = el('section', 'worksheet-task-box');
    examBox.append(
      el('h3', 'worksheet-task-title', 'Sociālo zinību 4. klases pārbaudes darbs (Patstāvīgais darbs)'),
      el('p', undefined, 'Atbildi uz 10 izlases jautājumiem no visiem 8 SR blokiem un Zelta bonusiem. Sasniedzot vismaz 80%, iegūsti +20 BP!')
    );

    const questions = [
      { id: 'q1', prompt: '1. Ko nozīmē jēdziens “Patērētājs”?', options: ['Cilvēks, kurš ražo preces rūpnīcā', 'Cilvēks, kurš izmanto preces un pakalpojumus savām vajadzībām', 'Valsts darbinieks'], correct: 1 },
      { id: 'q2', prompt: '2. Kas no minētā ir pamatvajadzība?', options: ['Jaunākais iPhone', 'Tīrs dzeramais ūdens un silts mājoklis ziemā', 'Biļete uz kinoteātri'], correct: 1 },
      { id: 'q3', prompt: '3. Kas ir barters?', options: ['Naudas noguldīšana bankas kontā', 'Preču tieša maiņa pret citām precēm bez naudas', 'Atlaides kupons veikalā'], correct: 1 },
      { id: 'q4', prompt: '4. Vai apgalvojums ir patiess: “Ģimenes budžetā izdevumiem vienmēr jābūt lielākiem par ienākumiem”?', options: ['Patiess', 'Nepatiess'], correct: 1 },
      { id: 'q5', prompt: '5. Kura prece ir izdevīgāka: 4 burtnīcas par 2,00 € vai 10 burtnīcas par 3,50 €?', options: ['4 burtnīcas par 2,00 € (0,50 €/gab)', '10 burtnīcas par 3,50 € (0,35 €/gab)'], correct: 1 },
      { id: 'q6', prompt: '6. Kādā secībā uz pārtikas iepakojuma norāda sastāvdaļas?', options: ['Alfabēta secībā', 'Dilstošā svara secībā (visvairāk ir tā, kas minēta pirmā)', 'Pēc nejaušības'], correct: 1 },
      { id: 'q7', prompt: '7. Kāds ir galvenais eiro banknošu pretviltošanas princips?', options: ['Apskati, patausti, pagrozi un pārbaudi pret gaismu', 'Pasmaržo banknoti', 'Paturi zem ūdens'], correct: 0 },
      { id: 'q8', prompt: '8. Kurš bija pats pirmais naudas attīstības posms?', options: ['Kaltās sudraba monētas', 'Preču nauda / barters (gliemežvāki, sāls, kažokādas)', 'Plastmasas bezkontakta kartes'], correct: 1 },
      { id: 'q9', prompt: '9. Ko nosaka 50 / 30 / 20 Zelta budžeta likums?', options: ['50% vajadzībām, 30% vēlmēm, 20% uzkrājumiem', 'Viss jātērē izklaidēm', '50% nodokļos, 50% veikalā'], correct: 0 },
      { id: 'q10', prompt: '10. Kā jārīkojas, ja tev rokās nonākusi aizdomīga banknote?', options: ['Mēģināt ātri iztērēt tirgū', 'Nekavējoties vērsties bankā vai policijā un nemaksāt ar to', 'Izmest atkritumos'], correct: 1 }
    ];

    questions.forEach((q, idx) => {
      const qRow = el('div', 'worksheet-question-row');
      qRow.append(el('strong', undefined, q.prompt));
      const group = el('div', 'reading-controls');
      q.options.forEach((opt, oIdx) => {
        const btn = el('button', 'action-button' + (examAnswers[q.id] === oIdx ? ' active' : ''), opt);
        btn.onclick = () => {
          examAnswers[q.id] = oIdx;
          render();
        };
        group.append(btn);
      });
      qRow.append(group);
      examBox.append(qRow);
    });

    const finishBtn = el('button', 'action-button', '✅ Iesniegt pārbaudes darbu un aprēķināt BP');
    finishBtn.style.marginTop = '18px';
    finishBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    finishBtn.onclick = async () => {
      let correctCount = 0;
      questions.forEach(q => {
        if (examAnswers[q.id] === q.correct) correctCount++;
      });
      examScore = Math.round((correctCount / questions.length) * 100);
      examDone = true;

      if (canSubmit) {
        try {
          await saveProgress({
            studentRole: 'marks',
            subject: 'Sociālās zinības',
            subjectId: 'social',
            activityType: 'Sociālās zinības · 4. kl. PD',
            score: examScore,
            mode: 'exam',
            notes: JSON.stringify({
              correct: correctCount,
              total: questions.length,
              mode: 'exam',
              missionId: 'nov26-social-resources'
            })
          });
        } catch (err) {
          console.warn('Neizdevās saglabāt Sociālo zinību PD:', err);
        }
      }

      render();
    };
    examBox.append(finishBtn);
    wrap.append(examBox);
    host.append(wrap);
  }

  // 5. Drukājamā darba lapa
  function renderPrint() {
    const wrap = el('div', 'english-worksheet');
    const actions = el('div', 'reading-controls no-print');
    const printBtn = el('button', 'action-button', '🖨️ Izdrukāt darba lapu (Print / PDF)');
    printBtn.onclick = () => window.print();
    actions.append(printBtn);
    wrap.append(actions);

    const sheet = el('div', 'print-worksheet-sheet');
    sheet.innerHTML = `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-size: 1.5rem; color: #0f172a;">LEVEL UP · Sociālās zinības (4. klase)</h2>
          <span style="font-weight: 800; font-size: 1rem; color: #475569;">Pārbaudes darbs</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; font-weight: 700;">
          <div>Skolēna vārds: <strong>Marks</strong></div>
          <div>Datums: ${new Date().toLocaleDateString('lv-LV')}</div>
          <div>Kopā: ______ / 43 p.</div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px;">
        <strong>Temats:</strong> Kā plānot un patērēt resursus saprātīgi? (Vērtēšanas kritēriji: 8 SR prasmju bloki).
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px;">1. uzdevums. Paskaidro jēdzienus! (5 p.)</h4>
        <div style="line-height: 2;">
          <div>1) Patērētājs: ________________________________________________________________</div>
          <div>2) Vajadzība: _________________________________________________________________</div>
          <div>3) Vēlme: _____________________________________________________________________</div>
          <div>4) Pircējs: ___________________________________________________________________</div>
          <div>5) Barters: ___________________________________________________________________</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px;">2. uzdevums. Nosaki: Vajadzība vai Vēlme? (5 p.)</h4>
        <div style="line-height: 1.9;">
          <div>1) Dzeramais ūdens pēc sporta treniņa ➡️ _______________________</div>
          <div>2) Jaunākā spēļu konsole ➡️ _______________________</div>
          <div>3) Ziemas zābaki pie -15°C ➡️ _______________________</div>
          <div>4) Čipsi un limonāde katru dienu ➡️ _______________________</div>
          <div>5) Zāles slimības laikā ➡️ _______________________</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px;">3. uzdevums. Novērtē apgalvojumus (Patiess / Nepatiess)! (11 p.)</h4>
        <div style="line-height: 1.8;">
          <div>1) Nauda ir universāls maksāšanas līdzeklis: [ _____ ]</div>
          <div>2) Izdevumiem vienmēr jābūt lielākiem par ienākumiem: [ _____ ]</div>
          <div>3) Barters ir maiņas darījums bez naudas: [ _____ ]</div>
          <div>4) Reklāmas vienīgais mērķis ir tikai izglītot: [ _____ ]</div>
          <div>5) Pirkumu saraksts palīdz netērēt lieki: [ _____ ]</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px;">4. uzdevums. Nosauc 4 eiro banknošu pretviltošanas elementus! (4 p.)</h4>
        <div style="line-height: 1.9;">
          <div>1) ________________________ 2) ________________________</div>
          <div>3) ________________________ 4) ________________________</div>
        </div>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 20px; font-size: 0.88rem; color: #64748b; display: flex; justify-content: space-between;">
        <span>Vērtējuma skala: 39-43 p. (10 - Izcili) · 34-38 p. (9 - Teicami) · 29-33 p. (8 - Ļoti labi)</span>
        <span>Paraksts: ________________</span>
      </div>
    `;
    wrap.append(sheet);
    host.append(wrap);
  }

  render();
}
