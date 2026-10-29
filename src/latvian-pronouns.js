// Vietniekvārdu locīšana 4. klasei — super interaktīvs materiāls ar visiem 7 locījumiem un jautājumiem.

export const CASES_LIST = [
  {
    id: 'nom',
    name: 'Nominatīvs',
    abbr: 'N.',
    question: 'Kas?',
    hint: 'Nosauc darītāju teikumā vai priekšmetu.',
    example: 'kas es, kas tu, kas viņš',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe'
  },
  {
    id: 'gen',
    name: 'Ģenitīvs',
    abbr: 'Ģ.',
    question: 'Kā?',
    hint: 'Parāda piederību vai kāda trūkumu (nav kā?).',
    example: 'kā manis, kā tevis, kā viņa, kā sevis',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a'
  },
  {
    id: 'dat',
    name: 'Datīvs',
    abbr: 'D.',
    question: 'Kam?',
    hint: 'Kam tiek dots, dāvināts, palīdzēts vai pieder.',
    example: 'kam man, kam tev, kam viņam, kam sev',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0'
  },
  {
    id: 'aku',
    name: 'Akuzatīvs',
    abbr: 'A.',
    question: 'Ko?',
    hint: 'Darbības tiešais objekts (redzu ko? satieku ko?).',
    example: 'ko mani, ko tevi, ko viņu, ko sevi',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca'
  },
  {
    id: 'ins',
    name: 'Instrumentālis',
    abbr: 'I.',
    question: 'Ar ko?',
    hint: 'Kopā ar ko vai ar kādu līdzekli darbība tiek veikta.',
    example: 'ar ko ar mani, ar ko ar tevi, ar ko ar sevi',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe'
  },
  {
    id: 'lok',
    name: 'Lokālatīvs',
    abbr: 'L.',
    question: 'Kur? (kurā? par ko?)',
    hint: 'Atrašanās vieta vai domas (domāju par ko? manī).',
    example: 'kur manī, kur tevī, kur mūsos, kur sevī',
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc'
  },
  {
    id: 'vok',
    name: 'Vokatīvs',
    abbr: 'V.',
    question: 'Uzruna! (bez jautājuma)',
    hint: 'Izsauc vai tieši uzrunā kādu personu. Jautājuma nav!',
    example: 'Tu!, Jūs! (pārējiem vokatīva formas nav)',
    color: '#db2777',
    bg: '#fdf2f8',
    border: '#fbcfe8'
  }
];

export const PRONOUN_TABLES = {
  es: {
    label: '1. persona (es)',
    person: '1. persona vienskaitlī',
    icon: '🙋‍♂️',
    cases: {
      nom: { form: 'es', sample: 'Es šodien cītīgi mācos latviešu valodu.' },
      gen: { form: 'manis', sample: 'Bez manis komanda nevarēja uzsākt spēli.' },
      dat: { form: 'man', sample: 'Mamma uzdāvināja man aizraujošu grāmatu.' },
      aku: { form: 'mani', sample: 'Draugi pasauca mani spēlēt futbolu.' },
      ins: { form: 'ar mani', sample: 'Vai tu nāksi pastaigāties kopā ar mani?' },
      lok: { form: 'manī', sample: 'Manī iedegās liela vēlme visu uzzināt!' },
      vok: { form: '— (nav)', sample: '1. personai vokatīva formas nav.' }
    }
  },
  tu: {
    label: '2. persona (tu)',
    person: '2. persona vienskaitlī',
    icon: '👉',
    cases: {
      nom: { form: 'tu', sample: 'Tu esi mans labākais un uzticamākais draugs.' },
      gen: { form: 'tevis', sample: 'Mēs visi ļoti gaidījām ciemos tieši tevis.' },
      dat: { form: 'tev', sample: 'Skolotāja uzticēja tev svarīgu uzdevumu.' },
      aku: { form: 'tevi', sample: 'Es tevi redzēju skolas bibliotēkā.' },
      ins: { form: 'ar tevi', sample: 'Visi vēlas sadarboties un runāties ar tevi.' },
      lok: { form: 'tevī', sample: 'Tevī mīt liels talants un gudrība!' },
      vok: { form: 'tu!', sample: 'Tu, draugs, ieklausies uzmanīgi!' }
    }
  },
  vins: {
    label: '3. persona (viņš)',
    person: '3. persona vīriešu dzimtē vienskaitlī',
    icon: '👦',
    cases: {
      nom: { form: 'viņš', sample: 'Viņš ātri atrisināja sarežģīto uzdevumu.' },
      gen: { form: 'viņa', sample: 'Šī ir viņa mīļākā skolas mugursoma.' },
      dat: { form: 'viņam', sample: 'Brālis iedeva viņam krāsainos zīmuļus.' },
      aku: { form: 'viņu', sample: 'Treneris paslavēja viņu par izcilu skrējienu.' },
      ins: { form: 'ar viņu', sample: 'Mēs kopā ar viņu braucām ar divriteņiem.' },
      lok: { form: 'viņā', sample: 'Viņā bija redzama liela apņēmība uzvarēt.' },
      vok: { form: '— (nav)', sample: '3. personai vokatīva formas nav.' }
    }
  },
  vina: {
    label: '3. persona (viņa)',
    person: '3. persona sieviešu dzimtē vienskaitlī',
    icon: '👧',
    cases: {
      nom: { form: 'viņa', sample: 'Viņa skaisti nodziedāja dziesmu svētkos.' },
      gen: { form: 'viņas', sample: 'Mēs apbrīnojām viņas skaisto zīmējumu.' },
      dat: { form: 'viņai', sample: 'Klasesbiedri pasniedza viņai ziedus dzimšanas dienā.' },
      aku: { form: 'viņu', sample: 'Es viņu satiku pie skolas durvīm.' },
      ins: { form: 'ar viņu', sample: 'Bija patīkami sarunāties un mācīties ar viņu.' },
      lok: { form: 'viņā', sample: 'Viņā vienmēr var sajust labestību un smaidu.' },
      vok: { form: '— (nav)', sample: '3. personai vokatīva formas nav.' }
    }
  },
  mes: {
    label: '1. persona (mēs)',
    person: '1. persona daudzskaitlī',
    icon: '🧑‍🤝‍🧑',
    cases: {
      nom: { form: 'mēs', sample: 'Mēs visi kopā esam varena komanda!' },
      gen: { form: 'mūsu', sample: 'Šī ir mūsu klases jaunā un plašā telpa.' },
      dat: { form: 'mums', sample: 'Skolotāja paskaidroja mums jauno tēmu.' },
      aku: { form: 'mūs', sample: 'Direktors uzaicināja mūs uz olimpiādi.' },
      ins: { form: 'ar mums', sample: 'Vai vēlies nākt rotaļāties kopā ar mums?' },
      lok: { form: 'mūsos', sample: 'Mūsos mājo vēlme izzināt visu pasauli.' },
      vok: { form: '— (nav)', sample: '1. personai vokatīva formas nav.' }
    }
  },
  jus: {
    label: '2. persona (jūs)',
    person: '2. persona daudzskaitlī',
    icon: '👥',
    cases: {
      nom: { form: 'jūs', sample: 'Jūs esat paveikuši patiešām lielisku darbu!' },
      gen: { form: 'jūsu', sample: 'Mēs cienām jūsu viedokli un ierosinājumus.' },
      dat: { form: 'jums', sample: 'Vēlamies novēlēt jums panākumus un prieku.' },
      aku: { form: 'jūs', sample: 'Mēs jūs sirsnīgi sveicam svētkos!' },
      ins: { form: 'ar jums', sample: 'Priecājamies sadarboties un draudzēties ar jums.' },
      lok: { form: 'jūsos', sample: 'Jūsos ir milzīgs radošais spēks.' },
      vok: { form: 'jūs!', sample: 'Jūs, zēni un meitenes, nāciet šurp!' }
    }
  },
  vini: {
    label: '3. persona (viņi / viņas)',
    person: '3. persona daudzskaitlī',
    icon: '👫',
    cases: {
      nom: { form: 'viņi / viņas', sample: 'Viņi un viņas aizrautīgi gatavojās pārbaudes darbam.' },
      gen: { form: 'viņu', sample: 'Mēs apskatījām viņu izveidotos plakātus.' },
      dat: { form: 'viņiem / viņām', sample: 'Skola pasniedza viņiem un viņām goda diplomus.' },
      aku: { form: 'viņus / viņas', sample: 'Treneris aicināja viņus un viņas uz sacensībām.' },
      ins: { form: 'ar viņiem / viņām', sample: 'Mēs lepojamies ar viņiem un viņām.' },
      lok: { form: 'viņos / viņās', sample: 'Viņos un viņās kvēlo patiesa zinātkāre.' },
      vok: { form: '— (nav)', sample: '3. personai vokatīva formas nav.' }
    }
  },
  sevis: {
    label: 'Atgriezeniskais (sevis)',
    person: 'Attiecas uz pašu darītāju (NAV nominatīva!)',
    icon: '🪞',
    cases: {
      nom: { form: '— (NAV NOMINATĪVA!)', sample: '⚠️ Zelta likums: atgriezeniskajam vietniekvārdam NAV nominatīva formas!' },
      gen: { form: 'sevis', sample: 'Viņš kaunējās pats no sevis par neuzmanību.' },
      dat: { form: 'sev', sample: 'Marks pagatavoja sev gardas brokastis.' },
      aku: { form: 'sevi', sample: 'Kaķēns spogulī ieraudzīja pats sevi.' },
      ins: { form: 'ar sevi', sample: 'Viņš runāja klusībā pats ar sevi.' },
      lok: { form: 'sevī', sample: 'Vajag ticēt sevī un saviem spēkiem!' },
      vok: { form: '— (nav)', sample: 'Atgriezeniskajam vietniekvārdam nav vokatīva.' }
    }
  }
};

export const GOLDEN_RULES = [
  {
    num: '1.',
    title: 'Atgriezeniskajam vietniekvārdam NAV nominatīva!',
    desc: 'Vārds “sevis” nekad neatbild uz jautājumu Kas? Nevar teikt “sevis gāja”. Sāk ar Ģenitīvu: sevis, sev, sevi, ar sevi, sevī.',
    icon: '🪞'
  },
  {
    num: '2.',
    title: 'Vokatīvam NAV jautājuma — tā ir tieša uzruna!',
    desc: 'Tikai 2. personai ir vokatīvs: “Tu, nāc šurp!” vai “Jūs, bērni, klausieties!”. Pārējiem personu vietniekvārdiem vokatīva nav.',
    icon: '📢'
  },
  {
    num: '3.',
    title: 'Datīvā ir īsās formas: man, tev, sev',
    desc: 'Vienskaitļa datīvā (Kam?) nav galotnes -am: sakām “iedod man”, “pasaki tev”, “nopirka sev”.',
    icon: '🎁'
  },
  {
    num: '4.',
    title: 'Lokālatīvā vienskaitlī ir GARAIS patskanis galotnē!',
    desc: 'Kur? manī, tevī, sevī, viņā — vārda beigās vienmēr ir garumzīme (ī, ā)!',
    icon: '📍'
  },
  {
    num: '5.',
    title: 'Daudzskaitļa akuzatīvs rakstāms ar garo Ū: mūs, jūs!',
    desc: 'Ko satika? Satika mūs un jūs (ar garo Ū, nevis īso u).',
    icon: '✍️'
  }
];

export const SENTENCE_EXERCISES = [
  {
    sentence: 'Mamma iedeva saldu ābolu (kam? — es) [ ___ ].',
    options: ['man', 'mani', 'manis', 'manī'],
    answer: 'man',
    caseName: 'Datīvs',
    question: 'Kam?',
    explanation: 'Iedeva kam? Man! Datīvs prasa formu “man”.'
  },
  {
    sentence: 'Skolotājs pasauca (ko? — mēs) [ ___ ] pie tāfeles.',
    options: ['mūs', 'mums', 'mūsu', 'mūsos'],
    answer: 'mūs',
    caseName: 'Akuzatīvs',
    question: 'Ko?',
    explanation: 'Pasauca ko? Mūs! Akuzatīva forma 1. personai dsk. ir “mūs”.'
  },
  {
    sentence: 'Visi draugi ļoti lepojas ar (ar ko? — viņš) [ ___ ].',
    options: ['viņu', 'viņam', 'viņā', 'viņa'],
    answer: 'viņu',
    caseName: 'Instrumentālis',
    question: 'Ar ko?',
    explanation: 'Lepojas ar ko? Ar viņu! Instrumentāļa forma ir “viņu”.'
  },
  {
    sentence: 'Kaķēns spogulī uzmanīgi pētīja pats (ko? — sevis) [ ___ ].',
    options: ['sevi', 'sev', 'sevī', 'sevis'],
    answer: 'sevi',
    caseName: 'Akuzatīvs',
    question: 'Ko?',
    explanation: 'Pētīja ko? Sevi! Atgriezeniskā vietniekvārda akuzatīvs ir “sevi”.'
  },
  {
    sentence: 'Marks klusībā (kur? / par ko? — sevis) [ ___ ] bija pārliecināts par uzvaru.',
    options: ['sevī', 'sev', 'sevi', 'sevis'],
    answer: 'sevī',
    caseName: 'Lokālatīvs',
    question: 'Kur? (kurā?)',
    explanation: 'Kur? Sevī! Lokālatīva galotnē vienmēr ir garais -ī.'
  },
  {
    sentence: '(Kas? — tu) [ ___ ] šodien esi īsts malacis!',
    options: ['Tu', 'Tev', 'Tevi', 'Tevis'],
    answer: 'Tu',
    caseName: 'Nominatīvs',
    question: 'Kas?',
    explanation: 'Kas ir malacis? Tu! Teikuma priekšmets atbild uz jautājumu Kas? (Nominatīvs).'
  },
  {
    sentence: 'Šīs košās krāsas pieder (kam? — viņa) [ ___ ].',
    options: ['viņai', 'viņu', 'viņas', 'viņā'],
    answer: 'viņai',
    caseName: 'Datīvs',
    question: 'Kam?',
    explanation: 'Pieder kam? Viņai! Sieviešu dzimtes vienskaitļa datīvs ir “viņai”.'
  },
  {
    sentence: 'Mēs no sirds uzticamies un ticam (kam? — jūs) [ ___ ].',
    options: ['jums', 'jūs', 'jūsu', 'jūsos'],
    answer: 'jums',
    caseName: 'Datīvs',
    question: 'Kam?',
    explanation: 'Ticam kam? Jums! 2. personas daudzskaitļa datīvs ir “jums”.'
  },
  {
    sentence: 'Bez (kā? — tevis) [ ___ ] šī spēle nebūtu tik jautra!',
    options: ['tevis', 'tev', 'tevi', 'tu'],
    answer: 'tevis',
    caseName: 'Ģenitīvs',
    question: 'Kā?',
    explanation: 'Bez kā? Bez tevis! Prievārds “bez” prasa ģenitīvu (Kā? — tevis).'
  },
  {
    sentence: 'Draugi vienmēr atceras un runā par (par ko? / kur? — mēs) [ ___ ].',
    options: ['mums', 'mūs', 'mūsu', 'mūsos'],
    answer: 'mums',
    caseName: 'Instrumentālis / Datīvs',
    question: 'Par ko?',
    explanation: 'Runā par ko? Par mums! Ar prievārdu “par” daudzskaitlī lieto datīva formu “mums”.'
  }
];

export const PRONOUN_BANK_QUESTIONS = [
  ['Uz kādu jautājumu atbild vietniekvārds NOMINATĪVĀ?', ['Kas?', 'Kam?', 'Ko?', 'Kā?'], 0, 'Nominatīva jautājums vienmēr ir: Kas? (kas es, kas tu, kas viņš).'],
  ['Uz kādu jautājumu atbild vietniekvārds ĢENITĪVĀ?', ['Kā?', 'Kas?', 'Kam?', 'Ar ko?'], 0, 'Ģenitīva jautājums ir: Kā? (kā manis, kā tevis, kā viņa, kā sevis).'],
  ['Uz kādu jautājumu atbild vietniekvārds DATĪVĀ?', ['Kam?', 'Ko?', 'Kur?', 'Kā?'], 0, 'Datīva jautājums ir: Kam? (kam man, kam tev, kam viņam, kam sev).'],
  ['Uz kādu jautājumu atbild vietniekvārds AKUZATĪVĀ?', ['Ko?', 'Kas?', 'Ar ko?', 'Kur?'], 0, 'Akuzatīva jautājums ir: Ko? (redzu ko? mani, tevi, viņu, sevi).'],
  ['Uz kādu jautājumu atbild vietniekvārds INSTRUMENTĀLĪ?', ['Ar ko?', 'Kur?', 'Kam?', 'Kā?'], 0, 'Instrumentāļa jautājums ir: Ar ko? (ar mani, ar tevi, ar viņu, ar sevi).'],
  ['Uz kādu jautājumu atbild vietniekvārds LOKĀLATĪVĀ?', ['Kur? (kurā? par ko?)', 'Ko?', 'Kas?', 'Kam?'], 0, 'Lokālatīva jautājums ir: Kur? (manī, tevī, sevī, mūsos).'],
  ['Kuram locījumam NAV jautājuma, jo tā ir tieša uzruna?', ['Vokatīvam', 'Nominatīvam', 'Lokālatīvam', 'Datīvam'], 0, 'Vokatīvs ir uzrunas forma bez jautājuma (piem., Tu!, Jūs!).'],
  ['Kura locījuma forma NAV atgriezeniskajam vietniekvārdam “sevis”?', ['Nominatīva (Kas?)', 'Ģenitīva (Kā?)', 'Datīva (Kam?)', 'Akuzatīva (Ko?)'], 0, 'Atgriezeniskajam vietniekvārdam sevis NAV nominatīva formas!'],
  ['Kāda ir vietniekvārda “es” forma DATĪVĀ (Kam?)?', ['man', 'mani', 'manis', 'manī'], 0, 'Kam? Man! 1. personas datīvs ir “man”.'],
  ['Kāda ir vietniekvārda “tu” forma ĢENITĪVĀ (Kā?)?', ['tevis', 'tev', 'tevi', 'tevī'], 0, 'Kā? Tevis! (nav kā? tevis).'],
  ['Kāda ir vietniekvārda “viņš” forma DATĪVĀ (Kam?)?', ['viņam', 'viņu', 'viņa', 'viņā'], 0, 'Kam? Viņam! (iedot kam? viņam).'],
  ['Kāda ir vietniekvārda “viņa” forma DATĪVĀ (Kam?)?', ['viņai', 'viņas', 'viņu', 'viņā'], 0, 'Kam? Viņai! (iedot kam? viņai).'],
  ['Kāda ir vietniekvārda “mēs” forma AKUZATĪVĀ (Ko?)?', ['mūs', 'mums', 'mūsu', 'mūsos'], 0, 'Satieku ko? Mūs! Akuzatīva forma ir “mūs” (ar garo Ū).'],
  ['Kāda ir vietniekvārda “jūs” forma DATĪVĀ (Kam?)?', ['jums', 'jūs', 'jūsu', 'jūsos'], 0, 'Palīdzēt kam? Jums! Datīvs ir “jums”.'],
  ['Kāda ir vietniekvārda “sevis” forma LOKĀLATĪVĀ (Kur?)?', ['sevī', 'sev', 'sevi', 'sevis'], 0, 'Kur? Sevī! Lokālatīvā ir garais -ī beigās.'],
  ['“Mamma palīdzēja (kam? — es) mājasdarbos.” Kurš vārds jāieliek?', ['man', 'mani', 'manis', 'es'], 0, 'Palīdzēja kam? Man (Datīvs).'],
  ['“Draugi meklēja (ko? — tu) pagalmā.” Kurš vārds pareizs?', ['tevi', 'tev', 'tevis', 'tu'], 0, 'Meklēja ko? Tevi (Akuzatīvs).'],
  ['“Bērni skrēja kopā ar (ar ko? — viņas).” Kurš vārds pareizs?', ['ar viņām', 'ar viņu', 'ar viņas', 'ar viņiem'], 0, 'Kopā ar ko? Ar viņām (sieviešu dzimtes daudzskaitlis).'],
  ['Kurš apgalvojums par vietniekvārdiem ir PAREIZS?', ['Lokālatīvā vienskaitlī galotnē ir garais patskanis (manī, tevī)', 'Vietniekvārdam “sevis” ir nominatīvs', 'Datīvā saka “manam” un “tevam”', 'Akuzatīvu “mūs” raksta ar īso u'], 0, 'Lokālatīva galotnē vienskaitlī vienmēr ir garumzīme: manī, tevī, sevī, viņā.']
];

export const PRONOUN_EXTENDED_QUESTIONS = [
  {
    kind: 'multi',
    prompt: 'Atzīmē visus locījumus, kuru jautājumi norādīti PAREIZI!',
    options: [
      'Nominatīvs — Kas?',
      'Ģenitīvs — Kā?',
      'Datīvs — Kam?',
      'Akuzatīvs — Kur?',
      'Instrumentālis — Ar ko?'
    ],
    answers: [
      'Nominatīvs — Kas?',
      'Ģenitīvs — Kā?',
      'Datīvs — Kam?',
      'Instrumentālis — Ar ko?'
    ],
    explanation: 'Akuzatīva jautājums ir Ko? (nevis Kur?). Pārējie norādīti pareizi.'
  },
  {
    kind: 'multi',
    prompt: 'Kuri no šiem ir 1. personas vietniekvārda “es” locījumi?',
    options: ['man', 'mani', 'manis', 'tevis', 'manī'],
    answers: ['man', 'mani', 'manis', 'manī'],
    explanation: '“Tevis” pieder 2. personai (tu). Visi pārējie ir vārda “es” formas.'
  },
  {
    kind: 'text',
    prompt: 'Kāds ir NOMINATĪVA jautājums? (Ieraksti vienu vārdu ar jautājuma zīmi vai bez)',
    answers: ['kas', 'kas?'],
    explanation: 'Nominatīva jautājums ir “Kas?”.'
  },
  {
    kind: 'text',
    prompt: 'Kāds ir DATĪVA jautājums? (Ieraksti vienu vārdu)',
    answers: ['kam', 'kam?'],
    explanation: 'Datīva jautājums ir “Kam?”.'
  },
  {
    kind: 'text',
    prompt: 'Ieraksti vietniekvārda “es” formu DATĪVĀ (Kam?): “Iedod lūdzu grāmatu ___!”',
    answers: ['man'],
    explanation: 'Iedod kam? Man! Datīva forma ir “man”.'
  },
  {
    kind: 'text',
    prompt: 'Ieraksti vietniekvārda “tu” formu AKUZATĪVĀ (Ko?): “Es vakar redzēju ___ bibliotēkā.”',
    answers: ['tevi'],
    explanation: 'Redzēju ko? Tevi! Akuzatīva forma ir “tevi”.'
  },
  {
    kind: 'text',
    prompt: 'Ieraksti atgriezeniskā vietniekvārda “sevis” formu LOKĀLATĪVĀ (Kur?): “Vajag ticēt ___!”',
    answers: ['sevī'],
    explanation: 'Ticēt kur? Sevī (ar garo ī)!'
  }
];

function speak(text) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'lv-LV';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch {}
  }
}

// Super interaktīvā vietniekvārdu locīšanas laboratorija
export function renderPronounLab(parent, { onStartPractice = () => {} } = {}) {
  const container = document.createElement('div');
  container.className = 'pronoun-lab-container';
  container.style.cssText = 'background: #ffffff; border-radius: 16px; padding: 20px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); margin-top: 14px;';

  let currentSection = 'explorer'; // 'explorer' | 'match' | 'puzzle' | 'rules' | 'sentences' | 'print'
  let activePronoun = 'es';

  function render() {
    container.replaceChildren();

    // Galvenā virsraksta daļa
    const header = document.createElement('div');
    header.style.cssText = 'background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #4338ca 100%); color: white; border-radius: 14px; padding: 18px 22px; margin-bottom: 16px; position: relative; overflow: hidden;';
    header.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
            🎭 Latviešu valoda · 4. klase
          </span>
          <h2 style="margin: 0; font-size: 1.6rem; font-weight: 900; letter-spacing: -0.02em;">
            Vietniekvārdu locīšana & Visi 7 locījumi
          </h2>
          <p style="margin: 6px 0 0; font-size: 0.95rem; opacity: 0.92; max-width: 650px;">
            Apgūsti visus locījumu nosaukumus (N., Ģ., D., A., I., L., V.), jautājumus (Kas? Kā? Kam? Ko? Ar ko? Kur? Uzruna!) un personu vietniekvārdu formas.
          </p>
        </div>
        <button type="button" id="pronoun-listen-all-btn" style="background: rgba(255,255,255,0.95); color: #1e3a8a; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.15s;">
          🔊 Klausīties locījumus
        </button>
      </div>
    `;
    container.append(header);

    const listenAllBtn = header.querySelector('#pronoun-listen-all-btn');
    if (listenAllBtn) {
      listenAllBtn.onclick = () => {
        speak('Latviešu valodas septiņi locījumi un jautājumi: Nominatīvs: Kas? Ģenitīvs: Kā? Datīvs: Kam? Akuzatīvs: Ko? Instrumentālis: Ar ko? Lokālatīvs: Kur? Vokatīvs: Uzruna!');
      };
    }

    // Navigācijas cilnes
    const nav = document.createElement('div');
    nav.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;';
    const tabs = [
      ['explorer', '🔍 Locījumu laboratorija & Matrica'],
      ['match', '⚡ Spēle: Savieno locījumu un jautājumu'],
      ['puzzle', '🧩 Locīšanas puzle'],
      ['sentences', '✍️ Teikumu detektīvs'],
      ['rules', '💡 5 Zelta likumi & Lamatas'],
      ['print', '🖨️ Drukājamā lapa']
    ];
    tabs.forEach(([key, title]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = currentSection === key;
      btn.style.cssText = `
        padding: 9px 15px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: 2px solid;
        transition: all 0.15s ease;
        ${isActive
          ? 'background: #1e40af; color: #ffffff; border-color: #1e40af; box-shadow: 0 4px 10px rgba(30,64,175,0.25);'
          : 'background: #f8fafc; color: #475569; border-color: #cbd5e1;'}
      `;
      btn.textContent = title;
      btn.onclick = () => {
        currentSection = key;
        render();
      };
      nav.append(btn);
    });
    container.append(nav);

    // Sekciju saturs
    if (currentSection === 'explorer') renderExplorer();
    else if (currentSection === 'match') renderMatchGame();
    else if (currentSection === 'puzzle') renderPuzzle();
    else if (currentSection === 'sentences') renderSentences();
    else if (currentSection === 'rules') renderRules();
    else if (currentSection === 'print') renderPrintView();
  }

  // 1. Locījumu laboratorija & Matrica
  function renderExplorer() {
    const wrap = document.createElement('div');

    // 7 Locījumu ātrā vārdnīca (kartiņas augšā)
    const casesHeading = document.createElement('div');
    casesHeading.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;';
    casesHeading.innerHTML = `
      <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-weight: 900;">
        📌 Septiņi latviešu valodas locījumi un to jautājumi
      </h3>
      <span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">Klikšķini uz locījuma, lai noklausītos!</span>
    `;
    wrap.append(casesHeading);

    const casesGrid = document.createElement('div');
    casesGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(135px, 1fr)); gap: 10px; margin-bottom: 22px;';

    CASES_LIST.forEach(c => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: ${c.bg}; border: 2px solid ${c.border}; border-radius: 12px; padding: 10px; cursor: pointer;
        display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s, box-shadow 0.15s;
      `;
      card.title = c.hint;
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <span style="font-size: 0.75rem; font-weight: 900; color: ${c.color}; background: rgba(255,255,255,0.7); padding: 1px 6px; border-radius: 4px;">${c.abbr}</span>
            <span style="font-size: 0.95rem;">🔊</span>
          </div>
          <div style="font-weight: 900; font-size: 0.95rem; color: #0f172a; margin-bottom: 2px;">${c.name}</div>
          <div style="font-size: 1.1rem; font-weight: 900; color: ${c.color}; margin-bottom: 4px;">${c.question}</div>
        </div>
        <div style="font-size: 0.75rem; color: #475569; line-height: 1.3;">${c.example}</div>
      `;
      card.onmouseenter = () => { card.style.transform = 'translateY(-2px)'; card.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)'; };
      card.onmouseleave = () => { card.style.transform = 'none'; card.style.boxShadow = 'none'; };
      card.onclick = () => {
        speak(`${c.name}. Jautājums: ${c.question}. Piemēram: ${c.example}.`);
      };
      casesGrid.append(card);
    });
    wrap.append(casesGrid);

    // Personu vietniekvārdu izvēle
    const selectorHeading = document.createElement('h3');
    selectorHeading.style.cssText = 'margin: 0 0 10px; color: #0f172a; font-size: 1.15rem; font-weight: 900;';
    selectorHeading.textContent = '👤 Izvēlies personu vietniekvārdu, lai redzētu pilnu locīšanas karti:';
    wrap.append(selectorHeading);

    const pronounSelector = document.createElement('div');
    pronounSelector.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;';

    Object.entries(PRONOUN_TABLES).forEach(([key, val]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isCurrent = activePronoun === key;
      btn.style.cssText = `
        padding: 8px 14px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: 2px solid;
        display: flex; align-items: center; gap: 6px; transition: all 0.12s;
        ${isCurrent
          ? 'background: #0284c7; color: white; border-color: #0284c7; box-shadow: 0 4px 8px rgba(2,132,199,0.3);'
          : 'background: #ffffff; color: #334155; border-color: #cbd5e1;'}
      `;
      btn.innerHTML = `<span>${val.icon}</span> <span>${val.label}</span>`;
      btn.onclick = () => {
        activePronoun = key;
        render();
      };
      pronounSelector.append(btn);
    });
    wrap.append(pronounSelector);

    // Aktīvā vietniekvārda locīšanas karte
    const activeData = PRONOUN_TABLES[activePronoun];
    const tableCard = document.createElement('div');
    tableCard.style.cssText = 'background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 14px; padding: 18px; margin-bottom: 20px;';

    tableCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">${activeData.icon}</span>
          <div>
            <h4 style="margin: 0; font-size: 1.25rem; color: #0f172a; font-weight: 900;">${activeData.label} locīšana</h4>
            <span style="font-size: 0.88rem; color: #64748b; font-weight: 700;">${activeData.person}</span>
          </div>
        </div>
        <button type="button" id="speak-active-pronoun" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
          🔊 Noklausīties visas formas
        </button>
      </div>
    `;

    const speakBtn = tableCard.querySelector('#speak-active-pronoun');
    if (speakBtn) {
      speakBtn.onclick = () => {
        const text = CASES_LIST.map(c => {
          const form = activeData.cases[c.id]?.form || '';
          return `${c.name}, ${c.question}: ${form}.`;
        }).join(' ');
        speak(text);
      };
    }

    const rowsWrap = document.createElement('div');
    rowsWrap.style.cssText = 'display: grid; gap: 8px;';

    CASES_LIST.forEach((c, idx) => {
      const caseItem = activeData.cases[c.id];
      if (!caseItem) return;

      const row = document.createElement('div');
      row.style.cssText = `
        background: #ffffff; border: 1.5px solid ${c.border}; border-left: 6px solid ${c.color};
        border-radius: 10px; padding: 10px 14px; display: grid; grid-template-columns: 140px 120px 1fr auto;
        align-items: center; gap: 12px; transition: background 0.12s;
      `;

      row.innerHTML = `
        <div style="font-weight: 900; color: #0f172a; font-size: 0.95rem;">
          <span style="color: ${c.color}; font-size: 0.82rem; margin-right: 4px;">${c.abbr}</span> ${c.name}
        </div>
        <div style="font-weight: 900; color: ${c.color}; font-size: 1.05rem;">
          ${c.question}
        </div>
        <div>
          <span style="font-size: 1.15rem; font-weight: 900; color: #1e3a8a; background: #e0f2fe; padding: 3px 10px; border-radius: 6px; display: inline-block; margin-right: 8px;">
            ${caseItem.form}
          </span>
          <small style="color: #475569; font-style: italic; font-size: 0.88rem;">${caseItem.sample}</small>
        </div>
        <button type="button" title="Klausīties teikumu" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; padding: 4px;">
          🔊
        </button>
      `;

      const audioBtn = row.querySelector('button');
      if (audioBtn) {
        audioBtn.onclick = () => speak(`${c.name}. ${c.question}: ${caseItem.form}. ${caseItem.sample}`);
      }

      rowsWrap.append(row);
    });

    tableCard.append(rowsWrap);
    wrap.append(tableCard);

    // Apakšējā aicinājuma poga
    const ctaRow = document.createElement('div');
    ctaRow.style.cssText = 'display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px;';
    const playMatchBtn = document.createElement('button');
    playMatchBtn.type = 'button';
    playMatchBtn.className = 'action-button';
    playMatchBtn.textContent = '⚡ Trenēt locījumu savienošanu →';
    playMatchBtn.onclick = () => {
      currentSection = 'match';
      render();
    };

    const startQuizBtn = document.createElement('button');
    startQuizBtn.type = 'button';
    startQuizBtn.className = 'action-button';
    startQuizBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    startQuizBtn.textContent = '📝 Sākt pārbaudes testu (par BP) →';
    startQuizBtn.onclick = () => onStartPractice();

    ctaRow.append(playMatchBtn, startQuizBtn);
    wrap.append(ctaRow);

    container.append(wrap);
  }

  // 2. Interaktīvā savienošanas spēle: Locījums ➔ Jautājums
  function renderMatchGame() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 18px;';

    wrap.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0f172a;">⚡ Savieno locījumu ar tā pareizo jautājumu!</h3>
          <p style="margin: 4px 0 0; color: #475569; font-size: 0.9rem;">Klikšķini vispirms uz locījuma kreisajā pusē, pēc tam uz tā jautājuma labajā pusē.</p>
        </div>
        <div id="match-score-badge" style="background: #1e40af; color: white; padding: 6px 14px; border-radius: 999px; font-weight: 900; font-size: 0.95rem;">
          Punkti: 0 / 7
        </div>
      </div>
    `;

    const arena = document.createElement('div');
    arena.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 14px;';

    const colCases = document.createElement('div');
    colCases.style.cssText = 'display: flex; flex-direction: column; gap: 10px;';
    colCases.innerHTML = '<strong style="color: #1e3a8a; margin-bottom: 4px;">1. Locījumu nosaukumi:</strong>';

    const colQuestions = document.createElement('div');
    colQuestions.style.cssText = 'display: flex; flex-direction: column; gap: 10px;';
    colQuestions.innerHTML = '<strong style="color: #047857; margin-bottom: 4px;">2. Locījumu jautājumi:</strong>';

    let selectedCase = null;
    let selectedQuestion = null;
    let solvedPairs = new Set();
    const scoreBadge = wrap.querySelector('#match-score-badge');

    // Sajaukt jautājumus
    const shuffledQuestions = [...CASES_LIST].sort(() => Math.random() - 0.5);

    CASES_LIST.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.caseId = c.id;
      btn.style.cssText = `
        padding: 12px 16px; border: 2px solid ${c.border}; border-radius: 10px; background: white;
        color: #0f172a; font-weight: 800; font-size: 0.95rem; cursor: pointer; text-align: left;
        display: flex; justify-content: space-between; align-items: center; transition: all 0.15s;
      `;
      btn.innerHTML = `<span>${c.abbr} ${c.name}</span> <span style="font-size: 0.8rem; color: #94a3b8;">Izvēlēties →</span>`;

      btn.onclick = () => {
        if (solvedPairs.has(c.id)) return;
        colCases.querySelectorAll('button').forEach(b => {
          if (!solvedPairs.has(b.dataset.caseId)) {
            b.style.borderColor = '#cbd5e1';
            b.style.background = 'white';
          }
        });
        selectedCase = c.id;
        btn.style.borderColor = '#2563eb';
        btn.style.background = '#eff6ff';
        checkPair();
      };
      colCases.append(btn);
    });

    shuffledQuestions.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.caseId = c.id;
      btn.style.cssText = `
        padding: 12px 16px; border: 2px solid #cbd5e1; border-radius: 10px; background: white;
        color: #0f172a; font-weight: 900; font-size: 1.05rem; cursor: pointer; text-align: left;
        display: flex; justify-content: space-between; align-items: center; transition: all 0.15s;
      `;
      btn.innerHTML = `<span>${c.question}</span> <span style="font-size: 0.8rem; color: #94a3b8;">← Pāris</span>`;

      btn.onclick = () => {
        if (solvedPairs.has(c.id)) return;
        colQuestions.querySelectorAll('button').forEach(b => {
          if (!solvedPairs.has(b.dataset.caseId)) {
            b.style.borderColor = '#cbd5e1';
            b.style.background = 'white';
          }
        });
        selectedQuestion = c.id;
        btn.style.borderColor = '#059669';
        btn.style.background = '#ecfdf5';
        checkPair();
      };
      colQuestions.append(btn);
    });

    function checkPair() {
      if (!selectedCase || !selectedQuestion) return;

      const caseBtn = colCases.querySelector(`button[data-case-id="${selectedCase}"]`);
      const qBtn = colQuestions.querySelector(`button[data-case-id="${selectedQuestion}"]`);

      if (selectedCase === selectedQuestion) {
        // Pareizs pāris!
        solvedPairs.add(selectedCase);
        speak(`Pareizi! ${CASES_LIST.find(x => x.id === selectedCase).name} atbild uz jautājumu ${CASES_LIST.find(x => x.id === selectedCase).question}!`);

        caseBtn.style.background = '#dcfce7';
        caseBtn.style.borderColor = '#22c55e';
        caseBtn.style.color = '#15803d';
        caseBtn.innerHTML = `<span>✅ ${caseBtn.textContent.replace('Izvēlēties →', '').trim()}</span>`;
        caseBtn.disabled = true;

        qBtn.style.background = '#dcfce7';
        qBtn.style.borderColor = '#22c55e';
        qBtn.style.color = '#15803d';
        qBtn.innerHTML = `<span>✅ ${qBtn.textContent.replace('← Pāris', '').trim()}</span>`;
        qBtn.disabled = true;

        selectedCase = null;
        selectedQuestion = null;
        scoreBadge.textContent = `Punkti: ${solvedPairs.size} / 7`;

        if (solvedPairs.size === 7) {
          setTimeout(() => {
            alert('🎉 Apsveicam, Mark! Visi 7 locījumi ir nevainojami savienoti ar to jautājumiem!');
          }, 300);
        }
      } else {
        // Kļūda — mirgo sarkans
        caseBtn.style.borderColor = '#ef4444';
        caseBtn.style.background = '#fee2e2';
        qBtn.style.borderColor = '#ef4444';
        qBtn.style.background = '#fee2e2';

        setTimeout(() => {
          if (!solvedPairs.has(selectedCase)) {
            caseBtn.style.borderColor = '#cbd5e1';
            caseBtn.style.background = 'white';
          }
          if (!solvedPairs.has(selectedQuestion)) {
            qBtn.style.borderColor = '#cbd5e1';
            qBtn.style.background = 'white';
          }
          selectedCase = null;
          selectedQuestion = null;
        }, 700);
      }
    }

    arena.append(colCases, colQuestions);
    wrap.append(arena);

    // Apakšējā poga jaunam mēģinājumam
    const resetRow = document.createElement('div');
    resetRow.style.cssText = 'margin-top: 18px; display: flex; justify-content: flex-end;';
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'action-button';
    resetBtn.textContent = '🔄 Sākt no jauna';
    resetBtn.onclick = () => renderMatchGame();
    resetRow.append(resetBtn);
    wrap.append(resetRow);

    container.append(wrap);
  }

  // 3. Locīšanas puzle
  function renderPuzzle() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 18px;';

    wrap.innerHTML = `
      <div style="margin-bottom: 14px;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0f172a;">🧩 Locīšanas puzle: Saliec vietniekvārdu pareizajos locījumos!</h3>
        <p style="margin: 4px 0 0; color: #475569; font-size: 0.9rem;">
          Izvēlies pareizo vārdu no apakšējiem žetoniem un ievieto to atbilstošā locījuma lauciņā.
        </p>
      </div>
    `;

    const pronounOptions = ['es', 'tu', 'mes', 'jus', 'sevis'];
    const selectorBar = document.createElement('div');
    selectorBar.style.cssText = 'display: flex; gap: 8px; margin-bottom: 16px;';
    pronounOptions.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.cssText = `
        padding: 6px 14px; border-radius: 8px; font-weight: 800; border: 2px solid; cursor: pointer;
        ${activePronoun === p ? 'background: #4338ca; color: white; border-color: #4338ca;' : 'background: white; color: #334155; border-color: #cbd5e1;'}
      `;
      b.textContent = PRONOUN_TABLES[p]?.label || p;
      b.onclick = () => {
        activePronoun = p;
        render();
      };
      selectorBar.append(b);
    });
    wrap.append(selectorBar);

    const puzzleGrid = document.createElement('div');
    puzzleGrid.style.cssText = 'display: grid; gap: 8px; margin-bottom: 16px;';

    const pData = PRONOUN_TABLES[activePronoun];
    const placed = {};

    CASES_LIST.forEach(c => {
      const correctForm = pData.cases[c.id]?.form;
      if (!correctForm || correctForm.includes('nav')) return;

      const slot = document.createElement('div');
      slot.style.cssText = `
        background: white; border: 2px dashed ${c.border}; border-radius: 10px; padding: 10px 14px;
        display: flex; align-items: center; justify-content: space-between; gap: 10px;
      `;
      slot.dataset.caseId = c.id;

      slot.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 900; color: ${c.color}; min-width: 120px;">${c.abbr} ${c.name}</span>
          <span style="font-weight: 800; color: #64748b; font-size: 0.95rem; min-width: 70px;">(${c.question})</span>
        </div>
        <div class="slot-target" style="min-width: 130px; height: 38px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.05rem; color: #1e3a8a;">
          [ Ievieto šeit ]
        </div>
      `;
      puzzleGrid.append(slot);
    });
    wrap.append(puzzleGrid);

    // Vārdu žetoni
    const chipsWrap = document.createElement('div');
    chipsWrap.style.cssText = 'background: white; border: 2px solid #cbd5e1; border-radius: 12px; padding: 14px;';
    chipsWrap.innerHTML = '<strong style="display: block; margin-bottom: 8px; color: #1e293b;">Pieejamās formas (klikšķini uz žetona, lai ievietotu nākamajā brīvajā lauciņā):</strong>';

    const chipsPool = document.createElement('div');
    chipsPool.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';

    const validForms = CASES_LIST
      .map(c => pData.cases[c.id]?.form)
      .filter(f => f && !f.includes('nav'));
    const shuffledForms = [...validForms].sort(() => Math.random() - 0.5);

    shuffledForms.forEach(form => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.style.cssText = `
        background: #e0e7ff; color: #3730a3; border: 1.5px solid #c7d2fe; padding: 8px 16px; border-radius: 999px;
        font-weight: 900; font-size: 1.05rem; cursor: pointer; transition: transform 0.12s;
      `;
      chip.textContent = form;
      chip.onclick = () => {
        // Ievietot pirmajā neaizpildītajā lauciņā
        const emptySlots = [...puzzleGrid.querySelectorAll('.slot-target')].filter(s => !s.dataset.filled);
        if (emptySlots.length) {
          const target = emptySlots[0];
          const parentSlot = target.closest('[data-case-id]');
          const caseId = parentSlot.dataset.caseId;
          const expected = pData.cases[caseId]?.form;

          target.textContent = form;
          target.dataset.filled = 'true';
          chip.disabled = true;
          chip.style.opacity = '0.4';

          if (form === expected) {
            target.style.background = '#dcfce7';
            target.style.color = '#15803d';
            target.innerHTML = `✅ ${form}`;
            speak(`Pareizi! ${form}`);
          } else {
            target.style.background = '#fee2e2';
            target.style.color = '#b91c1c';
            target.innerHTML = `❌ ${form}`;
            setTimeout(() => {
              target.textContent = '[ Ievieto šeit ]';
              delete target.dataset.filled;
              target.style.background = '#f1f5f9';
              target.style.color = '#1e3a8a';
              chip.disabled = false;
              chip.style.opacity = '1';
            }, 900);
          }
        }
      };
      chipsPool.append(chip);
    });
    chipsWrap.append(chipsPool);
    wrap.append(chipsWrap);

    container.append(wrap);
  }

  // 4. Teikumu detektīvs
  function renderSentences() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 18px;';

    wrap.innerHTML = `
      <div style="margin-bottom: 14px;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0f172a;">✍️ Teikumu detektīvs: Ieliec pareizo vietniekvārdu!</h3>
        <p style="margin: 4px 0 0; color: #475569; font-size: 0.9rem;">
          Izlasi teikumu, pievērs uzmanību jautājumam iekavās un izvēlies pareizo locījuma formu!
        </p>
      </div>
    `;

    const list = document.createElement('div');
    list.style.cssText = 'display: grid; gap: 14px;';

    SENTENCE_EXERCISES.forEach((ex, idx) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px;';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-weight: 900; color: #1e3a8a; font-size: 0.95rem;">${idx + 1}. uzdevums</span>
          <span style="font-size: 0.82rem; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 6px; font-weight: 700;">
            ${ex.caseName} (${ex.question})
          </span>
        </div>
        <p style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0 0 10px;">${ex.sentence}</p>
      `;

      const optionsRow = document.createElement('div');
      optionsRow.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;';
      const feedback = document.createElement('div');
      feedback.style.cssText = 'font-size: 0.92rem; font-weight: 700; min-height: 20px;';

      ex.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = 'background: #f1f5f9; color: #1e293b; border: 1.5px solid #cbd5e1; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer;';
        btn.textContent = opt;

        btn.onclick = () => {
          optionsRow.querySelectorAll('button').forEach(b => b.disabled = true);
          if (opt === ex.answer) {
            btn.style.background = '#dcfce7';
            btn.style.borderColor = '#22c55e';
            btn.style.color = '#15803d';
            feedback.style.color = '#15803d';
            feedback.textContent = `✅ Pareizi! ${ex.explanation}`;
            speak(`Pareizi! ${ex.explanation}`);
          } else {
            btn.style.background = '#fee2e2';
            btn.style.borderColor = '#ef4444';
            btn.style.color = '#b91c1c';
            feedback.style.color = '#b91c1c';
            feedback.textContent = `❌ Nepareizi. Pareizā atbilde ir: “${ex.answer}”. ${ex.explanation}`;
          }
        };
        optionsRow.append(btn);
      });

      card.append(optionsRow, feedback);
      list.append(card);
    });

    wrap.append(list);
    container.append(wrap);
  }

  // 5. Zelta likumi & Lamatas
  function renderRules() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 18px;';

    wrap.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #0f172a;">💡 5 Zelta likumi & Lamatas pārbaudes darbā</h3>
        <p style="margin: 4px 0 0; color: #475569; font-size: 0.9rem;">
          Šīs 5 lietas skolotāji visbiežāk pārbauda kontroldarbos. Iegaumē tās un iegūsti 10 balles!
        </p>
      </div>
    `;

    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; gap: 12px;';

    GOLDEN_RULES.forEach(r => {
      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 1.5px solid #cbd5e1; border-left: 6px solid #d97706; border-radius: 12px; padding: 14px;';
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.3rem;">${r.icon}</span>
          <h4 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #0f172a;">${r.num} ${r.title}</h4>
        </div>
        <p style="margin: 0; color: #334155; font-size: 0.95rem; line-height: 1.5;">${r.desc}</p>
      `;
      grid.append(card);
    });

    wrap.append(grid);
    container.append(wrap);
  }

  // 6. Drukājamā lapa
  function renderPrintView() {
    const wrap = document.createElement('div');
    wrap.className = 'print-pronoun-wrap';

    const printActions = document.createElement('div');
    printActions.style.cssText = 'margin-bottom: 14px; display: flex; gap: 10px; align-items: center;';
    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.className = 'action-button';
    printBtn.textContent = '🖨️ Drukāt darba lapu';
    printBtn.onclick = () => window.print();
    printActions.append(printBtn);
    wrap.append(printActions);

    const sheet = document.createElement('div');
    sheet.className = 'print-pronoun-sheet';
    sheet.style.cssText = 'background: white; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px; color: #0f172a; max-width: 800px; margin: 0 auto; font-family: system-ui, sans-serif;';

    sheet.innerHTML = `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-size: 1.5rem; color: #0f172a;">LEVEL UP · Latviešu valoda (4. klase)</h2>
          <span style="font-weight: 800; font-size: 1rem; color: #475569;">Mācību materiāls & Špikeris</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; font-weight: 700;">
          <div>Skolēna vārds: <strong>Marks</strong></div>
          <div>Datums: ${new Date().toLocaleDateString('lv-LV')}</div>
          <div>Temats: <strong>Vietniekvārdu locīšana</strong></div>
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 8px; font-size: 1.1rem; color: #1e3a8a;">1. Visi 7 locījumi, jautājumi un pamatformas:</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 6px 8px;">Locījums</th>
              <th style="padding: 6px 8px;">Jautājums</th>
              <th style="padding: 6px 8px;">1. pers. (es)</th>
              <th style="padding: 6px 8px;">2. pers. (tu)</th>
              <th style="padding: 6px 8px;">1. p. dsk. (mēs)</th>
              <th style="padding: 6px 8px;">Atgriezeniskais (sevis)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Nominatīvs</td>
              <td style="padding: 6px 8px; color: #2563eb; font-weight: 700;">Kas?</td>
              <td style="padding: 6px 8px;">es</td>
              <td style="padding: 6px 8px;">tu</td>
              <td style="padding: 6px 8px;">mēs</td>
              <td style="padding: 6px 8px; color: #b91c1c; font-weight: 700;">— (NAV)</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Ģenitīvs</td>
              <td style="padding: 6px 8px; color: #d97706; font-weight: 700;">Kā?</td>
              <td style="padding: 6px 8px;">manis</td>
              <td style="padding: 6px 8px;">tevis</td>
              <td style="padding: 6px 8px;">mūsu</td>
              <td style="padding: 6px 8px;">sevis</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Datīvs</td>
              <td style="padding: 6px 8px; color: #059669; font-weight: 700;">Kam?</td>
              <td style="padding: 6px 8px;">man</td>
              <td style="padding: 6px 8px;">tev</td>
              <td style="padding: 6px 8px;">mums</td>
              <td style="padding: 6px 8px;">sev</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Akuzatīvs</td>
              <td style="padding: 6px 8px; color: #dc2626; font-weight: 700;">Ko?</td>
              <td style="padding: 6px 8px;">mani</td>
              <td style="padding: 6px 8px;">tevi</td>
              <td style="padding: 6px 8px;">mūs</td>
              <td style="padding: 6px 8px;">sevi</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Instrumentālis</td>
              <td style="padding: 6px 8px; color: #7c3aed; font-weight: 700;">Ar ko?</td>
              <td style="padding: 6px 8px;">ar mani</td>
              <td style="padding: 6px 8px;">ar tevi</td>
              <td style="padding: 6px 8px;">ar mums</td>
              <td style="padding: 6px 8px;">ar sevi</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px 8px; font-weight: 700;">Lokālatīvs</td>
              <td style="padding: 6px 8px; color: #0891b2; font-weight: 700;">Kur?</td>
              <td style="padding: 6px 8px;">manī</td>
              <td style="padding: 6px 8px;">tevī</td>
              <td style="padding: 6px 8px;">mūsos</td>
              <td style="padding: 6px 8px;">sevī</td>
            </tr>
            <tr>
              <td style="padding: 6px 8px; font-weight: 700;">Vokatīvs</td>
              <td style="padding: 6px 8px; color: #db2777; font-weight: 700;">Uzruna!</td>
              <td style="padding: 6px 8px;">—</td>
              <td style="padding: 6px 8px;">tu!</td>
              <td style="padding: 6px 8px;">—</td>
              <td style="padding: 6px 8px;">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 6px;">2. Praktiskais uzdevums: Ieraksti pareizo vietniekvārdu!</h4>
        <div style="line-height: 1.9; font-size: 0.95rem;">
          <div>1) Mamma iedeva ābolu (kam? — es) ___________________.</div>
          <div>2) Skolotājs pasauca (ko? — mēs) ___________________ pie tāfeles.</div>
          <div>3) Bērni spēlējās kopā ar (ar ko? — viņš) ___________________.</div>
          <div>4) Kaķēns spogulī skatījās uz (ko? — sevis) ___________________.</div>
          <div>5) Mēs uzticamies un ticam (kam? — jūs) ___________________.</div>
        </div>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 0.85rem; color: #64748b; display: flex; justify-content: space-between;">
        <span>Zelta likums: Vietniekvārdam “sevis” NAV nominatīva formas!</span>
        <span>Paraksts: ________________</span>
      </div>
    `;

    wrap.append(sheet);
    container.append(wrap);
  }

  render();
  parent.append(container);
}
