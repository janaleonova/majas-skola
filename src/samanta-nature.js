// Samantas skola — Dabaszinības 3. klasei (Nobeiguma pārbaudes darbs ar Zelta bonusiem)
// Temats: "Kas ir kopīgs un atšķirīgs dažādām dabas teritorijām?" (Skola2030 standarts)
// Ietver:
// 1. 10 Pamatdaļas uzdevumi (NPD)
// 2. 5 Ekskluzīvie Zelta bonusa uzdevumi (Rasene, Sfagni, Meža ārsts dzenis, Dabas detektīvs, Bionika)
// 3. Interaktīvā Dabas laboratorija (Meža 5 stāvi, Salīdzināšanas matrica, Barības ķēžu konstruktors, Pielāgošanās)
// 4. Balss nolasīšana latviešu valodā (TTS) ar auto-read un ātruma kontroli (0.85x / 1.0x)
// 5. Oficiālais Samantas Diploms 1–10 ballēs ar zelta zvaigznēm un drukas/lejupielādes iespēju

import { calculatePracticePoints, previewImprovement } from './points-policy.js';

// Audio efekti ar Web Audio API
function playSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.22); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (type === 'bonus') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + idx * 0.08);
        g.gain.setValueAtTime(0.13, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.32);
        o.start(now + idx * 0.08);
        o.stop(now + idx * 0.08 + 0.33);
      });
    } else if (type === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + idx * 0.11);
        g.gain.setValueAtTime(0.18, now + idx * 0.11);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.5);
        o.start(now + idx * 0.11);
        o.stop(now + idx * 0.11 + 0.52);
      });
    }
  } catch {}
}

// Balss nolasīšanas pārvaldība
let speechRate = 0.88; // Bērniem draudzīgs ātrums
let autoReadEnabled = true;

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(text, { onEnd = null } = {}) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  if (!text) return;

  const cleanText = String(text)
    .replace(/[🌿🌲🌸🍓🌾🐸🦆🦌🦉🦅🐜🦇⭐🌟📜🏆💡🎙️🔊🐢🐰⏹️]/g, '')
    .replace(/➔|→/g, ', no tā seko ')
    .replace(/\s+/g, ' ')
    .trim();

  const utter = new SpeechSynthesisUtterance(cleanText);
  utter.lang = 'lv-LV';
  utter.rate = speechRate;

  const voices = window.speechSynthesis.getVoices();
  const lvVoice = voices.find(v => v.lang.toLowerCase().startsWith('lv'));
  if (lvVoice) utter.voice = lvVoice;

  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

// Jautājumu banka: 10 pamatuzdevumi un 5 bonusa uzdevumi
export const NATURE_QUESTIONS = [
  // --- I DAĻA: 10 PAMATUZDEVUMI ---
  {
    id: 'npd-1',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 1/10',
    title: 'Dabas teritorijas pret cilvēka veidotajām',
    prompt: 'Kuras no šīm teritorijām ir DABISKAS, kas veidojas un pastāv pašas par sevi bez cilvēka kopšanas?',
    options: [
      'Mežs, dabiska pļava, purvs un dabīga upe',
      'Pilsētas parks, ābeļdārzs un kartupeļu tīrums',
      'Rīgas kanāls, zāliens pie mājas un siltumnīca'
    ],
    answer: 'Mežs, dabiska pļava, purvs un dabīga upe',
    explanation: 'Dabiskas teritorijas (mežs, pļava, purvs, upe) izveidojas dabas procesu rezultātā. Parkus, dārzus, tīrumus un kanālus veido un regulāri kopj cilvēks.',
    hint: 'Padomā, kuras vietas meža zvēriem un augiem pastāv bez cilvēka laistīšanas un pļaušanas!'
  },
  {
    id: 'npd-2',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 2/10',
    title: 'Meža 5 stāvi no augšas uz leju',
    prompt: 'Kāds ir pareizais meža stāvu izkārtojums virzienā no augšas (kur spīd saule) uz leju līdz zemei?',
    options: [
      'Vainagu stāvs → Pamežs (krūmi) → Lakstaugu stāvs → Sūnu stāvs → Pazemes stāvs',
      'Sūnu stāvs → Pamežs → Koku vainagi → Zāles stāvs',
      'Pazemes stāvs → Sūnas → Vainagi → Pamežs'
    ],
    answer: 'Vainagu stāvs → Pamežs (krūmi) → Lakstaugu stāvs → Sūnu stāvs → Pazemes stāvs',
    explanation: 'Mežā gaisma nāk no augšas: visaugstāk ir koku vainagi (priedes, ozoli), zem tiem pamežs (lazdas, pīlādži), tad lakstaugi (mellenes, zāle), pie zemes sūnas un ķērpji, bet zemē — koku un augu saknes.',
    hint: 'Iztēlojies augstāko koka galotni un ej soli pa solim lejup līdz pat slieku aliņām!'
  },
  {
    id: 'npd-3',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 3/10',
    title: 'Pļava un apputeksnētāji',
    prompt: 'Kāpēc dabiskā pļavā ir tik daudz košu un smaržīgu ziedu, un kāda ir to nozīme pļavas dzīvē?',
    options: [
      'Košie ziedi pievilina apputeksnētājus (bites, kamenes), kas pārnes ziedputekšņus un rada sēklas',
      'Ziedi smaržo, lai atbaidītu visus kukaiņus un putnus no pļavas',
      'Pļavas ziedi aug tikai tāpēc, lai cilvēki tos saplūktu vāzēs'
    ],
    answer: 'Košie ziedi pievilina apputeksnētājus (bites, kamenes), kas pārnes ziedputekšņus un rada sēklas',
    explanation: 'Pļavā ir daudz atklātas saules gaismas. Košie ziedi aicina kamenes, bites un tauriņus mieloties ar nektāru un apputeksnēt augus. Garajā pļavas zālē ligzdo arī putni (piemēram, grieze).',
    hint: 'Ziedi un kukaiņi ir labākie draugi dabā: zieds dod saldo nektāru, kukainis palīdz rasties sēklām!'
  },
  {
    id: 'npd-4',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 4/10',
    title: 'Purvs — dabas sūklis un sfagni',
    prompt: 'Kāpēc purvu dēvē par "dabas sūkli", un kādi īpaši augi tur sastopami?',
    options: [
      'Sfagnu sūnas uzsūc un satur milzīgu ūdens daudzumu; purvā aug dzērvenes, spilves un rasenes',
      'Purvs ir sauss akmeņains tuksnesis, kurā aug tikai egles un kaktusi',
      'Purvs uzsūc tikai saules starus, un tur nekad nav ūdens'
    ],
    answer: 'Sfagnu sūnas uzsūc un satur milzīgu ūdens daudzumu; purvā aug dzērvenes, spilves un rasenes',
    explanation: 'Sfagnu sūnas spēj uzsūkt ūdeni līdz pat 25 reizes vairāk par savu sauso svaru! Purvs uzkrāj saldūdeni, pasargā apkārtni no plūdiem, un tur lēni tūkstošiem gadu veidojas kūdra.',
    hint: 'Atceries mīkstās purva sūnas un sārtās ogas, kuras rudenī lasām ar gariem zābakiem!'
  },
  {
    id: 'npd-5',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 5/10',
    title: 'Ūdenstilpes — tekošs upes ūdens pret ezeru',
    prompt: 'Kāda ir būtiskākā atšķirība starp upi un ezeru, un kā dzīvei ūdenī pielāgojies bebrs?',
    options: [
      'Upē ūdens nepārtraukti plūst straumē, bet ezerā ir stāvošs; bebram ir peldplēves un plakana aste stūrēšanai',
      'Upē dzīvo tikai putni, bet ezerā tikai kukaiņi; bebram nav nekādu pielāgojumu peldēšanai',
      'Ezers vienmēr tek kalnup, bet upe stāv uz vietas; bebrs elpo caur žaunām kā zivs'
    ],
    answer: 'Upē ūdens nepārtraukti plūst straumē, bet ezerā ir stāvošs; bebram ir peldplēves un plakana aste stūrēšanai',
    explanation: 'Upe ir tekošs ūdens ar straumi, kas nes barības vielas un skābekli. Ezerā ūdens ir stāvošs. Bebram ir ūdensnecaurlaidīgs kažoks, peldplēves starp pirkstiem un plata aste kā airis.',
    hint: 'Padomā par ūdens kustību un par to, kāpēc bebrs ūdenī jūtas tikpat veikli kā zivs!'
  },
  {
    id: 'npd-6',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 6/10',
    title: 'Temata kodols: Kas KOPĪGS un kas ATŠĶIRĪGS?',
    prompt: 'Kas ir KOPĪGS visām dabas teritorijām (mežam, pļavai, purvam, ezeram) un kas ir ATŠĶIRĪGS?',
    options: [
      'Kopīgs: visur ir dzīvība un barības ķēdes, vajadzīga saule, ūdens un gaiss. Atšķirīgs: mitrums, gaismas daudzums, augsne un sugu pielāgojumi',
      'Kopīgs: visās vietās aug tieši vienādi koki un peld vienādas zivis. Atšķirīgs ir tikai teritorijas nosaukums',
      'Kopīgs ir tikai tas, ka cilvēks visur uzbūvējis mājas; dabā nav nekādu atšķirību'
    ],
    answer: 'Kopīgs: visur ir dzīvība un barības ķēdes, vajadzīga saule, ūdens un gaiss. Atšķirīgs: mitrums, gaismas daudzums, augsne un sugu pielāgojumi',
    explanation: 'Šis ir pārbaudes darba galvenais jautājums! Visas dabas teritorijas ir dzīvības mājvietas (ekosistēmas). Taču mežā ir vairāk ēnas, pļavā daudz gaismas, purvā slapja kūdra, bet ezerā — ūdens vide.',
    hint: 'Iedomājies, kas vajadzīgs ikvienai dzīvai radībai, un kā atšķiras gaiss, zeme un mitrums mežā un ezerā!'
  },
  {
    id: 'npd-7',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 7/10',
    title: 'Barības ķēžu likumi',
    prompt: 'Kura no šīm barības ķēdēm mežā ir pareizi sakārtota no ražotāja (auga) līdz plēsējam?',
    options: [
      'Ozola zīle (ražotājs augs) → Meža pele (zālēdājs) → Pūce (plēsējs)',
      'Pūce (plēsējs) → Ozola zīle (augs) → Meža pele (zālēdājs)',
      'Lapsa → Zāle → Vilks → Ozols'
    ],
    answer: 'Ozola zīle (ražotājs augs) → Meža pele (zālēdājs) → Pūce (plēsējs)',
    explanation: 'Barības ķēde vienmēr sākas ar zaļo augu (ražotāju), kas izmanto saules gaismu. Ar augu barojas zālēdājs (pele), bet ar peli barojas plēsējs (pūce).',
    hint: 'Bultiņa barības ķēdē rāda: "kas ko apēd". Pirmais vienmēr ir augs!'
  },
  {
    id: 'npd-8',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 8/10',
    title: 'Dzīvnieku un augu pielāgošanās videi',
    prompt: 'Kā dzērve ir pielāgojusies slapjam purvam, bet priede — sausam priežu silam?',
    options: [
      'Dzērvei ir garas kājas un knābis brienot pa sūnām un dūņām; priedei ir šauras skujas ar vaska kārtiņu mitruma taupīšanai',
      'Dzērvei ir žaunas elpošanai zem ūdens; priedei lapas rudenī pilnībā nobirst kā liepai',
      'Dzērvei ir biezas zvīņas kā zivij; priedei saknes aug tikai virs zemes gaisā'
    ],
    answer: 'Dzērvei ir garas kājas un knābis brienot pa sūnām un dūņām; priedei ir šauras skujas ar vaska kārtiņu mitruma taupīšanai',
    explanation: 'Garas kājas ļauj dzērvei neiegrimt purva lāmās un ar garo knābi noķert vardīti. Priedes šaurās skujas ar vasku samazina ūdens iztvaikošanu, tāpēc priede izdzīvo sausās smiltīs.',
    hint: 'Paskaties uz dzērves garajām kājām un priedes adatām — katra ķermeņa daļa palīdz izdzīvot!'
  },
  {
    id: 'npd-9',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 9/10',
    title: 'Cilvēka ietekme un dabas saudzēšana',
    prompt: 'Kāds ir galvenais zelta likums, apmeklējot dabas takas, purva laipas un mežus?',
    options: [
      '"Ko atnesi, to aiznes!" — neatstāj atkritumus, neplūc aizsargājamus augus un ej pa laipām, lai nesamīdītu sūnas',
      'Kurināt ugunskurus sausās sūnās jebkurā vietā, kur vien iepatīkas',
      'Skaļi klaigāt un atstāt visus plastmasas maisiņus mežā par mājvietām lapsām'
    ],
    answer: '"Ko atnesi, to aiznes!" — neatstāj atkritumus, neplūc aizsargājamus augus un ej pa laipām, lai nesamīdītu sūnas',
    explanation: 'Purva sūnas un meža zemsedze ataug ļoti lēni — samīdītām sūnām un ķērpjiem vajag daudzus gadus, lai atjaunotos. Visi atkritumi vienmēr jāpaņem līdzi un jāšķiro mājās.',
    hint: 'Dabā mēs esam ciemiņi, tāpēc aiz sevis atstājam tikai pateicības smaidu un tīru taku!'
  },
  {
    id: 'npd-10',
    isBonus: false,
    section: 'I Daļa · Pamatuzdevums 10/10',
    title: 'Biotopu atpazīšana un salīdzināšana',
    prompt: 'Kurā dabas teritorijā tu vienkopus atradīsi augstas priedes, brūkleņu mētras, baravikas un dzeņa kaltu dobumu?',
    options: [
      'Priežu mežā (silā)',
      'Pilsētas asfaltētā stāvvietā',
      'Kviešu un miežu labības tīrumā'
    ],
    answer: 'Priežu mežā (silā)',
    explanation: 'Brūklenes un mellenes ir meža lakstaugu stāva augi, baravikas veido sadarbību ar koku saknēm, bet dzenis meklē kaitēkļus un kaļ dobumus vecos koku stumbros.',
    hint: 'Kur tu ar groziņu dodies sēņot un ogot kopā ar ģimeni?'
  },

  // --- II DAĻA: 5 EKSKLUZĪVIE ZELTA BONUSA UZDEVUMI ---
  {
    id: 'bonus-1',
    isBonus: true,
    bonusNumber: 1,
    section: '🌟 II Daļa · 1. ZELTA BONUSS',
    title: 'Rasenes noslēpums — kukaiņēdājs augs purvā',
    prompt: 'Kāpēc apaļlapu rasene purvā ar lipīgiem, mirdzošiem pilieniem ķer un gremo mazus kukaiņus, lai gan tā pati ir zaļš augs?',
    options: [
      'Purva skābajā kūdrā ļoti trūkst slāpekļa un minerālvielu, tāpēc rasene trūkstošās vielas uzņem no noķertajiem kukaiņiem',
      'Rasene ir nikna uz odiem, jo tie tai traucē mierīgi ziedēt purva lāmā',
      'Rasenei nav hlorofila un tā nemāk izmantot saules gaismu, tāpēc pārtiek tikai no mušām'
    ],
    answer: 'Purva skābajā kūdrā ļoti trūkst slāpekļa un minerālvielu, tāpēc rasene trūkstošās vielas uzņem no noķertajiem kukaiņiem',
    explanation: 'Izcili! Rasene pati veic fotosintēzi (tā ir zaļa), taču purva kūdrā nav augiem vajadzīgā slāpekļa. Tāpēc rasene ar gremošanas sulām izšķīdina noķertos kukaiņus un iegūst minerālvielas!',
    hint: 'Padomā, kādas vielas trūkst purva kūdrā un kāpēc augam vajadzīgas "papildu pusdienas"!'
  },
  {
    id: 'bonus-2',
    isBonus: true,
    bonusNumber: 2,
    section: '🌟 II Daļa · 2. ZELTA BONUSS',
    title: 'Sfagnu sūnu superspējas medicīnā',
    prompt: 'Kuras divas pārsteidzošas superspējas piemīt purva sfagnu sūnām, kuru dēļ tās senāk izmantoja brūču pārsiešanai un ūdens attīrīšanai?',
    options: [
      'Tās uzsūc mitrumu 20–25 reizes vairāk par savu svaru un satur dabisku antiseptiķi sfagnolu, kas iznīcina baktērijas',
      'Tās tumsā spīd kā spuldzītes un silda zemi kā elektriskais sildītājs',
      'Tās pārvērš purva ūdeni zeltā un lido pa gaisu kā mazie putni'
    ],
    answer: 'Tās uzsūc mitrumu 20–25 reizes vairāk par savu svaru un satur dabisku antiseptiķi sfagnolu, kas iznīcina baktērijas',
    explanation: 'Apbrīnojama dabas gudrība! Sfagnu šūnas darbojas kā dabisks sūklis, bet sfagnols cīnās pret mikrobiem un pūšanu. Tāpēc purva ūdens ir tik dzidrs un tīrs!',
    hint: 'Atceries: "dabas sūklis" un "dabas zāles pret baktērijām"!'
  },
  {
    id: 'bonus-3',
    isBonus: true,
    bonusNumber: 3,
    section: '🌟 II Daļa · 3. ZELTA BONUSS',
    title: 'Meža ekosistēmas līdzsvars — meža ārsts dzenis',
    prompt: 'Kāpēc dzeni pamatoti dēvē par "meža ārstu un celtnieku", un kas notiktu mežā, ja visi dzeņi pēkšņi izzustu?',
    options: [
      'Dzenis iznīcina koksnes kaitēkļus un izkaļ dobumus, kuros pēc tam ligzdo citi putni un vāveres; bez dzeņa mežs slimotu un trūktu mājvietu',
      'Dzenis ārstē kokus, aptinot tos ar zaļām lapām un medicīnas pārsējiem',
      'Mežā nekas nemainītos, jo dzenis tikai taisa troksni ar savu knābi'
    ],
    answer: 'Dzenis iznīcina koksnes kaitēkļus un izkaļ dobumus, kuros pēc tam ligzdo citi putni un vāveres; bez dzeņa mežs slimotu un trūktu mājvietu',
    explanation: 'Dzenis katru gadu izkaļ jaunu dobumu, bet vecos dobumus atstāj zīlītēm, pūcēm, sikspārņiem un vāverēm, kuri paši koku izkalt nespēj. Dzenis ir īsts meža arhitekts un sargs!',
    hint: 'Dzenis ar stipro knābi dara divus darbus: tīra kokus no mizgraužiem un būvē mājas citiem!'
  },
  {
    id: 'bonus-4',
    isBonus: true,
    bonusNumber: 4,
    section: '🌟 II Daļa · 4. ZELTA BONUSS',
    title: 'Dabas detektīvs — kļūdu meklēšana biotopos',
    prompt: 'Esi dabas detektīvs! Kurā no šiem aprakstiem ir pieļauta RUPJA BIOLOĢISKA KĻŪDA par Latvijas dabas teritorijām?',
    options: [
      '"Latvijas priežu silā starp palmām bebrs kokā būvēja ligzdu no banāniem un kastaņiem."',
      '"Ziedu pļavā starp sarkano āboliņu kamene dūkdama vāca nektāru un nesa to uz aliņu zemē."',
      '"Purva lāmā peldēja spāres kāpurs, bet uz sausa ciņa sildījās maza purva ķirzaka."'
    ],
    answer: '"Latvijas priežu silā starp palmām bebrs kokā būvēja ligzdu no banāniem un kastaņiem."',
    explanation: 'Lielisks detektīva atklājums! Latvijas mežos neaug palmas un banāni, bet bebrs dzīvo ūdenī un uz zemes — bebrs nekad netaisa ligzdas koku galotnēs!',
    hint: 'Meklē teikumu, kurā sarakstītas pilnīgas pasakas par Latvijas dabu un dzīvniekiem!'
  },
  {
    id: 'bonus-5',
    isBonus: true,
    bonusNumber: 5,
    section: '🌟 II Daļa · 5. ZELTA BONUSS',
    title: 'Bionika — kā cilvēki noskatās tehnoloģijas no dabas',
    prompt: 'Kādu nozīmīgu cilvēku izgudrojumu ir iedvesmojušas ūdensputnu un bebra pakaļkāju peldplēves?',
    options: [
      'Ūdenslīdēju peldēšanas pleznas, kas ļauj cilvēkam viegli un ātri peldēt zem ūdens',
      'Lidmašīnu riteņus un helikoptera propelleru',
      'Ziemas adītos dūraiņus un vilnas cepures'
    ],
    answer: 'Ūdenslīdēju peldēšanas pleznas, kas ļauj cilvēkam viegli un ātri peldēt zem ūdens',
    explanation: 'Apsveicam! Zinātni, kurā cilvēki pēta dabas risinājumus un izgudro tehnoloģijas, sauc par BIONIKU. Peldplēves iedvesmoja pleznas, dadži — lipekļus (velcro), bet putnu spārni — lidmašīnas!',
    hint: 'Iztēlojies ūdenslīdēju ar gumijas "kājām", kas izskatās gluži kā pīles vai bebra pēdas!'
  }
];

// Teorijas datu struktūra interaktīvajai laboratorijai
export const NATURE_THEORY = {
  layers: [
    {
      level: 1,
      name: '1. Koku vainagu stāvs (augšējais stāvs)',
      icon: '🌲',
      height: '15 – 35 metri',
      sunlight: 'Visvairāk saules gaismas un vēja',
      plants: ['Priede', 'Egle', 'Ozols', 'Bērzs', 'Liepa', 'Osis'],
      animals: ['Dzenis', 'Vāvere', 'Krustknābis', 'Zīlīte', 'Pūce', 'Mizgrauzis'],
      desc: 'Meža koku galotnes veido "zaļo jumtu", kas uztver saules gaismu un pasargā zemākos stāvus no spēcīga vēja un lietus gāzēm. Šeit mājo putni, kas barojas ar sēklām un kaitēkļiem.',
      audio: 'Pirmais ir koku vainagu stāvs. Te aug augstākās priedes, egles un ozoli. Koku galotnēs mīt dzeņi, vāveres un pūces.'
    },
    {
      level: 2,
      name: '2. Pamežs (krūmu stāvs)',
      icon: '🌳',
      height: '2 – 5 metri',
      sunlight: 'Mērena pusēna',
      plants: ['Lazda (ar gardiem riekstiem)', 'Pīlādzis', 'Ieva', 'Kadiķis', 'Krūklis'],
      animals: ['Stirna', 'Mežastrazds', 'Sarkankrūtītis', 'Mežacūka', 'Tauriņu kāpuri'],
      desc: 'Pamežā aug ēncietīgi krūmi un mazi kociņi. Krūmu ogas un rieksti ir svarīga barība meža zvēriem rudenī un ziemā.',
      audio: 'Otrais ir pamežs jeb krūmu stāvs. Šeit aug lazdas ar riekstiem, pīlādži un kadiķi. Krūmos slēpjas stirnas un ligzdo mežastrazdi.'
    },
    {
      level: 3,
      name: '3. Lakstaugu un sīkkrūmu stāvs',
      icon: '🍓',
      height: '10 – 80 centimetri',
      sunlight: 'Izkliedēta gaisma un vēsums',
      plants: ['Mellenes', 'Brūklenes', 'Meža zemenes', 'Papardes', 'Zaķskābenes', 'Vizbulītes'],
      animals: ['Meža pele', 'Platspīļu vēzis grāvī', 'Krupis', 'Ķirzaka', 'Sienāzis', 'Skudra'],
      desc: 'Zāļu, papaparžu un melleņu mētru stāvs. Šeit zied pavasara pirmie ziedi (vizbulītes) pirms koki saplaukst un aizsedz sauli.',
      audio: 'Trešais ir lakstaugu stāvs. Te aug mellenes, brūklenes un papardes. Zālē skraida meža peles un sildās ķirzakas.'
    },
    {
      level: 4,
      name: '4. Sūnu un ķērpju stāvs',
      icon: '🌿',
      height: '1 – 10 centimetri',
      sunlight: 'Ēnains un mitrs mikroklimats',
      plants: ['Stāvveida sūna', 'Briežu ķērpis', 'Lācīši', 'Meža sēnes (baravikas, bekas)'],
      animals: ['Kukaiņi', 'Zirnekļi', 'Gliemeži', 'Kailgliemeži', 'Simtkāji'],
      desc: 'Mīksts "zaļais paklājs" pie pašas zemes. Sūnas uzsūc un saglabā mitrumu, pasargājot meža augsni no izžūšanas.',
      audio: 'Ceturtais ir sūnu un ķērpju stāvs pie pašas zemes. Zaļais paklājs saglabā mitrumu, un šeit aug gardās sēnes.'
    },
    {
      level: 5,
      name: '5. Pazemes un sakņu stāvs',
      icon: '🕳️',
      height: 'Augsnē līdz 2–5 metriem dziļi',
      sunlight: 'Pilnīga tumsa',
      plants: ['Koku un krūmu saknes', 'Sēņu micēlijs (sēņotne)', 'Biezi augsnes slāņi'],
      animals: ['Kurmis', 'Sliekas', 'Lācēna ala', 'Maitu vabolītes', 'Baktērijas'],
      desc: 'Neredzamā, bet ļoti svarīgā meža daļa. Saknes uzņem ūdeni un minerālvielas, sliekas irdina zemi, bet mikroorganismi sadala kritušās lapas auglīgā melnzemē.',
      audio: 'Piektais ir pazemes stāvs. Tumšajā augsnē koku saknes uzņem ūdeni, kurmji rok alas, bet sliekas rada auglīgu zemi.'
    }
  ],
  matrix: [
    {
      territory: 'Mežs 🌲',
      light: 'Ēnains (vainagi aiztur gaismu)',
      moisture: 'Mērens, zemsedze uztur mikroklimatu',
      soil: 'Bagātīga ar nobirām un trūdvielām',
      typical: 'Priede, egle, mellenes, dzenis, vāvere, stirna, alnis'
    },
    {
      territory: 'Pļava 🌸',
      light: 'Ļoti gaišs, daudz tiešas saules',
      moisture: 'Atkarīgs no lietus un reljefa',
      soil: 'Bieza auglīga velēna un zālaugu saknes',
      typical: 'Sarkanais āboliņš, pīpenes, kamenes, tauriņi, grieze, stārķis'
    },
    {
      territory: 'Purvs 🌿',
      light: 'Gaišs, atklāts, zemi kociņi',
      moisture: 'Pārlieku slapjš, liels ūdens daudzums',
      soil: 'Skāba kūdra, nabadzīga ar minerālvielām',
      typical: 'Sfagni, dzērvenes, spilves, rasene, dzērve, odi'
    },
    {
      territory: 'Ūdenstilpe 💧',
      light: 'Gaisma samazinās ar dziļumu',
      moisture: 'Pastāvīga ūdens vide',
      soil: 'Dūņas, smilts, ūdensaugu saknes',
      typical: 'Ūdensroze, niedres, līdaka, bebrs, zivju gārnis, spāre'
    }
  ],
  foodChains: [
    {
      title: 'Meža barības ķēde',
      steps: ['Ozola zīles (augs / ražotājs)', '➔', 'Meža pele (zālēdājs)', '➔', 'Pūce (plēsējs)'],
      desc: 'Ozols dod enerģiju pelei, bet pūce rūpējas, lai peļu mežā nesavairotos par daudz.',
      audio: 'Mežā: ozola zīles apēd meža pele, bet peli nomedī pūce.'
    },
    {
      title: 'Pļavas barības ķēde',
      steps: ['Pļavas āboliņš (augs / ražotājs)', '➔', 'Kāpurs / sienāzis (kukaiņēdājs)', '➔', 'Varde (patērētājs)', '➔', 'Baltais stārķis (plēsējs)'],
      desc: 'Ziedi baro kukaiņus, varde mielojas ar kukaiņiem, bet stārķis atrod vardīti pļavas zālē.',
      audio: 'Pļavā: āboliņa lapas grauž kāpurs, kāpuru apēd varde, bet vardi apēd stārķis.'
    },
    {
      title: 'Purva barības ķēde',
      steps: ['Purva spilve un dzērvenes', '➔', 'Purva strupaste (grauzējs)', '➔', 'Purva pūce vai lapsa'],
      desc: 'Dzērveņu ogas un sēklas nodrošina dzīvību purva grauzējiem, kas kalpo par barību plēsējiem.',
      audio: 'Purvā: dzērveņu ogas ēd purva pele, kuru nomedī purva pūce.'
    },
    {
      title: 'Ūdens barības ķēde',
      steps: ['Zaļās aļģes un ūdensaugi', '➔', 'Ūdensgliemezis un mazās zivtiņas', '➔', 'Līdaka (plēsējs)', '➔', 'Zivjērglis'],
      desc: 'Ūdensaugi ražo skābekli un barību mazajiem iemītniekiem, ar kuriem barojas lielās plēsīgās zivis.',
      audio: 'Ezerā: ūdensaugus ēd mazās zivis, zivis apēd līdaka, bet līdaku noķer zivjērglis.'
    }
  ]
};

// Galvenā Samantas dabas trenažiera eksporta funkcija
export function renderSamantaNature(container, options = {}) {
  const {
    saveProgress = async () => 'saved',
    canSubmit = true,
    alreadyEarnedBonus = false,
    onBack = null
  } = options;

  container.replaceChildren();

  // Saknes ietvars ar skaistu dabas tematikas noformējumu
  const root = document.createElement('div');
  root.className = 'samanta-nature-app';
  root.style.cssText = 'max-width:920px;margin:0 auto;padding:12px;font-family:system-ui,-apple-system,sans-serif;';
  container.append(root);

  let currentTab = 'exam'; // 'exam' | 'theory' | 'diploma'
  let currentQuestionIndex = 0;
  let userAnswers = {}; // { questionId: selectedOption }
  let examFinished = false;
  let finalResult = null;

  function renderHeader() {
    const head = document.createElement('div');
    head.className = 'nature-hero-card card';
    head.style.cssText = 'background:linear-gradient(135deg,#047857 0%,#065f46 60%,#064e3b 100%);color:white;padding:22px;border-radius:24px;margin-bottom:18px;box-shadow:0 12px 36px rgba(5,150,105,0.22);position:relative;overflow:hidden;';

    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;';

    const titleGroup = document.createElement('div');
    const badge = document.createElement('span');
    badge.className = 'tag';
    badge.style.cssText = 'background:rgba(255,255,255,0.22);color:#fff;border-radius:99px;padding:5px 12px;font-size:0.8rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;display:inline-block;margin-bottom:8px;';
    badge.textContent = '🌿 Samantas skola · 3. klase · Skola2030';

    const h1 = document.createElement('h1');
    h1.style.cssText = 'font-size:clamp(1.4rem,3.2vw,2rem);font-weight:900;margin:0 0 6px 0;line-height:1.2;';
    h1.textContent = 'Dabas teritorijas · Nobeiguma pārbaudes darbs';

    const subtitle = document.createElement('p');
    subtitle.style.cssText = 'margin:0;font-size:0.98rem;opacity:0.92;line-height:1.45;max-width:680px;';
    subtitle.textContent = 'Kas ir kopīgs un atšķirīgs mežam, pļavai, purvam un ūdeņiem? (10 pamatuzdevumi + 5 Zelta bonusi ar balss lasīšanu)';

    titleGroup.append(badge, h1, subtitle);
    topRow.append(titleGroup);

    // Navigācijas cilnes (Tabs)
    const tabsRow = document.createElement('div');
    tabsRow.style.cssText = 'display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;';

    const tabExam = document.createElement('button');
    tabExam.type = 'button';
    tabExam.style.cssText = `padding:9px 18px;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;border:0;transition:all 0.2s;background:${currentTab === 'exam' ? '#f59e0b' : 'rgba(255,255,255,0.18)'};color:${currentTab === 'exam' ? '#78350f' : '#fff'};box-shadow:${currentTab === 'exam' ? '0 4px 14px rgba(245,158,11,0.4)' : 'none'};`;
    tabExam.textContent = '🌟 NPD Pārbaudes darbs (15)';
    tabExam.onclick = () => { stopSpeaking(); currentTab = 'exam'; render(); };

    const tabTheory = document.createElement('button');
    tabTheory.type = 'button';
    tabTheory.style.cssText = `padding:9px 18px;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;border:0;transition:all 0.2s;background:${currentTab === 'theory' ? '#f59e0b' : 'rgba(255,255,255,0.18)'};color:${currentTab === 'theory' ? '#78350f' : '#fff'};box-shadow:${currentTab === 'theory' ? '0 4px 14px rgba(245,158,11,0.4)' : 'none'};`;
    tabTheory.textContent = '📖 Interaktīvā Dabas laboratorija';
    tabTheory.onclick = () => { stopSpeaking(); currentTab = 'theory'; render(); };

    tabsRow.append(tabExam, tabTheory);

    if (examFinished && finalResult) {
      const tabDiploma = document.createElement('button');
      tabDiploma.type = 'button';
      tabDiploma.style.cssText = `padding:9px 18px;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;border:0;transition:all 0.2s;background:${currentTab === 'diploma' ? '#f59e0b' : 'rgba(255,255,255,0.18)'};color:${currentTab === 'diploma' ? '#78350f' : '#fff'};box-shadow:${currentTab === 'diploma' ? '0 4px 14px rgba(245,158,11,0.4)' : 'none'};`;
      tabDiploma.textContent = '📜 Samantas Diploms';
      tabDiploma.onclick = () => { stopSpeaking(); currentTab = 'diploma'; render(); };
      tabsRow.append(tabDiploma);
    }

    head.append(topRow, tabsRow);
    return head;
  }

  // Balss lasītāja rīkjosla (VoiceReaderBar)
  function renderVoiceReaderBar(currentTextToRead) {
    const bar = document.createElement('div');
    bar.className = 'voice-reader-bar';
    bar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 16px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:16px;margin-bottom:14px;flex-wrap:wrap;';

    const leftControls = document.createElement('div');
    leftControls.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'action-button';
    playBtn.style.cssText = 'padding:7px 14px;background:#059669;color:#fff;border:0;border-radius:10px;font-weight:800;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;';
    playBtn.innerHTML = '<span>🔊</span><span>Noklausīties balsī</span>';
    playBtn.onclick = () => speakText(currentTextToRead);

    const stopBtn = document.createElement('button');
    stopBtn.type = 'button';
    stopBtn.className = 'quiet-button';
    stopBtn.style.cssText = 'padding:7px 12px;background:#fff;border:1px solid #cbd5e1;border-radius:10px;font-size:0.84rem;cursor:pointer;color:#475569;';
    stopBtn.innerHTML = '<span>⏹️</span><span>Apturēt</span>';
    stopBtn.onclick = () => stopSpeaking();

    // Ātruma izvēle
    const speedToggle = document.createElement('button');
    speedToggle.type = 'button';
    speedToggle.style.cssText = 'padding:7px 12px;background:#fff;border:1px solid #cbd5e1;border-radius:10px;font-size:0.84rem;cursor:pointer;color:#065f46;font-weight:700;';
    speedToggle.textContent = speechRate < 0.95 ? '🐢 Lēnāk (0.85x)' : '🐰 Parasti (1.0x)';
    speedToggle.onclick = () => {
      speechRate = speechRate < 0.95 ? 1.0 : 0.85;
      speedToggle.textContent = speechRate < 0.95 ? '🐢 Lēnāk (0.85x)' : '🐰 Parasti (1.0x)';
      stopSpeaking();
    };

    leftControls.append(playBtn, stopBtn, speedToggle);

    // Auto-read slēdzis
    const rightControls = document.createElement('label');
    rightControls.style.cssText = 'display:inline-flex;align-items:center;gap:6px;font-size:0.86rem;font-weight:700;color:#065f46;cursor:pointer;user-select:none;';
    const autoCheckbox = document.createElement('input');
    autoCheckbox.type = 'checkbox';
    autoCheckbox.checked = autoReadEnabled;
    autoCheckbox.style.cssText = 'width:18px;height:18px;accent-color:#059669;cursor:pointer;';
    autoCheckbox.onchange = (e) => {
      autoReadEnabled = e.target.checked;
    };
    rightControls.append(autoCheckbox, document.createTextNode('🎙️ Auto-lasīšana nākamajam solim'));

    bar.append(leftControls, rightControls);
    return bar;
  }

  // --- NPD PĀRBAUDES DARBA SKATS ---
  function renderExamView() {
    const wrap = document.createElement('div');
    wrap.className = 'exam-view-card';

    const q = NATURE_QUESTIONS[currentQuestionIndex];
    const totalQ = NATURE_QUESTIONS.length;
    const isBonus = q.isBonus;

    // Progresa josla ar Zelta bonusa vizuālo atdalījumu
    const progressCard = document.createElement('div');
    progressCard.style.cssText = 'background:#fff;padding:14px 18px;border-radius:18px;border:1px solid #e2e8f0;margin-bottom:14px;box-shadow:0 4px 16px rgba(0,0,0,0.03);';

    const progInfo = document.createElement('div');
    progInfo.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:0.9rem;font-weight:800;color:#334155;';
    progInfo.innerHTML = `<span>Uzdevums ${currentQuestionIndex + 1} no ${totalQ} ${isBonus ? '⭐ <b style="color:#d97706">(ZELTA BONUSS)</b>' : ''}</span><span>${Math.round(((currentQuestionIndex + 1) / totalQ) * 100)}%</span>`;

    const progBar = document.createElement('div');
    progBar.style.cssText = 'width:100%;height:10px;background:#e2e8f0;border-radius:99px;overflow:hidden;position:relative;';
    const progFill = document.createElement('div');
    progFill.style.cssText = `height:100%;width:${((currentQuestionIndex + 1) / totalQ) * 100}%;background:${isBonus ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#059669,#10b981)'};transition:width 0.3s ease;`;
    progBar.append(progFill);

    // Jautājumu numuru pogas ātrai pārskatīšanai
    const chipsRow = document.createElement('div');
    chipsRow.style.cssText = 'display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;';
    NATURE_QUESTIONS.forEach((item, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      const answered = userAnswers[item.id] !== undefined;
      const isCurrent = idx === currentQuestionIndex;
      chip.style.cssText = `width:30px;height:30px;border-radius:8px;border:1px solid ${isCurrent ? '#047857' : '#cbd5e1'};font-size:0.75rem;font-weight:800;cursor:pointer;background:${isCurrent ? '#059669' : answered ? (item.isBonus ? '#fef3c7' : '#d1fae5') : '#fff'};color:${isCurrent ? '#fff' : item.isBonus ? '#b45309' : '#334155'};`;
      chip.textContent = item.isBonus ? `⭐${idx - 9}` : String(idx + 1);
      chip.title = item.title;
      chip.onclick = () => {
        stopSpeaking();
        currentQuestionIndex = idx;
        render();
      };
      chipsRow.append(chip);
    });

    progressCard.append(progInfo, progBar, chipsRow);
    wrap.append(progressCard);

    // Sagatavo tekstu balss lasītājam
    const fullTextForSpeech = `${q.section}. ${q.title}. Jautājums: ${q.prompt}. Varianti ir šādi: ${q.options.map((opt, i) => `Variants ${i + 1}: ${opt}`).join('. ')}`;

    // Balss rīkjosla
    wrap.append(renderVoiceReaderBar(fullTextForSpeech));

    // Jautājuma kartīte
    const card = document.createElement('div');
    card.className = 'card question-card';
    card.style.cssText = `background:#fff;border-radius:20px;padding:24px;border:2px solid ${isBonus ? '#fde68a' : '#d1fae5'};box-shadow:0 10px 30px rgba(0,0,0,0.05);position:relative;`;

    const sectionBadge = document.createElement('div');
    sectionBadge.style.cssText = `display:inline-block;padding:5px 12px;border-radius:99px;font-size:0.82rem;font-weight:800;margin-bottom:12px;background:${isBonus ? '#fef3c7' : '#ecfdf5'};color:${isBonus ? '#b45309' : '#047857'};border:1px solid ${isBonus ? '#fde68a' : '#a7f3d0'};`;
    sectionBadge.textContent = q.section;

    const qTitle = document.createElement('h3');
    qTitle.style.cssText = 'font-size:1.15rem;color:#065f46;margin:0 0 8px 0;font-weight:800;';
    qTitle.textContent = q.title;

    const qPrompt = document.createElement('p');
    qPrompt.style.cssText = 'font-size:1.18rem;font-weight:700;color:#1e293b;line-height:1.5;margin:0 0 18px 0;';
    qPrompt.textContent = q.prompt;

    card.append(sectionBadge, qTitle, qPrompt);

    // Atbilžu variantu saraksts
    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:20px;';

    const selectedAns = userAnswers[q.id];

    q.options.forEach((optionText, optIdx) => {
      const isSelected = selectedAns === optionText;

      const optBtn = document.createElement('div');
      optBtn.style.cssText = `display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-radius:14px;border:2px solid ${isSelected ? (isBonus ? '#d97706' : '#059669') : '#e2e8f0'};background:${isSelected ? (isBonus ? '#fffbeb' : '#f0fdf4') : '#fff'};cursor:pointer;transition:all 0.2s;box-shadow:${isSelected ? '0 4px 14px rgba(5,150,105,0.12)' : 'none'};`;

      const textGroup = document.createElement('div');
      textGroup.style.cssText = 'display:flex;align-items:center;gap:12px;flex:1;';

      const circle = document.createElement('div');
      circle.style.cssText = `width:26px;height:26px;border-radius:99px;border:2px solid ${isSelected ? (isBonus ? '#d97706' : '#059669') : '#cbd5e1'};display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;color:${isSelected ? '#fff' : '#64748b'};background:${isSelected ? (isBonus ? '#d97706' : '#059669') : '#fff'};flex-shrink:0;`;
      circle.textContent = String.fromCharCode(65 + optIdx); // A, B, C

      const label = document.createElement('span');
      label.style.cssText = `font-size:1.02rem;line-height:1.45;color:${isSelected ? '#0f172a' : '#334155'};font-weight:${isSelected ? '700' : '500'};`;
      label.textContent = optionText;

      textGroup.append(circle, label);

      // Mazs atsevišķs audio skaļrunītis katram variantam
      const listenOptBtn = document.createElement('button');
      listenOptBtn.type = 'button';
      listenOptBtn.title = 'Noklausīties šo variantu balsī';
      listenOptBtn.style.cssText = 'background:none;border:0;padding:6px;cursor:pointer;font-size:1.15rem;border-radius:8px;color:#64748b;margin-left:8px;';
      listenOptBtn.textContent = '🔊';
      listenOptBtn.onclick = (e) => {
        e.stopPropagation();
        speakText(`Variants ${String.fromCharCode(65 + optIdx)}: ${optionText}`);
      };

      optBtn.append(textGroup, listenOptBtn);

      optBtn.onclick = () => {
        userAnswers[q.id] = optionText;
        playSound('correct');
        render();
      };

      optionsContainer.append(optBtn);
    });

    card.append(optionsContainer);

    // Padoms un norāde
    if (q.hint) {
      const hintBox = document.createElement('div');
      hintBox.style.cssText = 'background:#f8fafc;padding:10px 14px;border-radius:12px;border-left:4px solid #10b981;font-size:0.9rem;color:#475569;margin-bottom:18px;display:flex;align-items:center;gap:8px;';
      hintBox.innerHTML = `<span>💡</span><span><b>Padoms Samantai:</b> ${q.hint}</span>`;
      card.append(hintBox);
    }

    // Navigācijas pogas (Iepriekšējais / Nākamais / Iesniegt NPD)
    const navRow = document.createElement('div');
    navRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'quiet-button';
    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.style.cssText = `padding:11px 20px;border-radius:12px;font-weight:700;font-size:0.95rem;cursor:pointer;border:1px solid #cbd5e1;background:#fff;color:#475569;opacity:${currentQuestionIndex === 0 ? '0.4' : '1'};`;
    prevBtn.textContent = '← Iepriekšējais';
    prevBtn.onclick = () => {
      stopSpeaking();
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        render();
      }
    };

    const rightBtnGroup = document.createElement('div');
    rightBtnGroup.style.cssText = 'display:flex;gap:10px;';

    if (currentQuestionIndex < totalQ - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'action-button';
      nextBtn.style.cssText = 'padding:12px 24px;border-radius:12px;font-weight:800;font-size:1rem;cursor:pointer;border:0;background:linear-gradient(135deg,#059669,#047857);color:#fff;box-shadow:0 4px 14px rgba(5,150,105,0.3);';
      nextBtn.textContent = 'Nākamais uzdevums →';
      nextBtn.onclick = () => {
        stopSpeaking();
        currentQuestionIndex++;
        render();
      };
      rightBtnGroup.append(nextBtn);
    } else {
      const finishBtn = document.createElement('button');
      finishBtn.type = 'button';
      finishBtn.className = 'action-button';
      finishBtn.style.cssText = 'padding:12px 26px;border-radius:12px;font-weight:800;font-size:1.02rem;cursor:pointer;border:0;background:linear-gradient(135deg,#d97706,#b45309);color:#fff;box-shadow:0 6px 18px rgba(217,119,6,0.35);';
      finishBtn.textContent = '🏆 Pabeigt un saņemt Diplomā vērtējumu!';
      finishBtn.onclick = () => {
        stopSpeaking();
        calculateAndFinishExam();
      };
      rightBtnGroup.append(finishBtn);
    }

    navRow.append(prevBtn, rightBtnGroup);
    card.append(navRow);
    wrap.append(card);

    // Ja ieslēgta automātiskā nolasīšana un Samanta tikko atvēra šo jautājumu
    if (autoReadEnabled) {
      setTimeout(() => {
        speakText(fullTextForSpeech);
      }, 250);
    }

    return wrap;
  }

  // Pārbaudes darba novērtēšana
  async function calculateAndFinishExam() {
    let coreCorrect = 0;
    let bonusCorrect = 0;
    const errorsList = [];

    NATURE_QUESTIONS.forEach(q => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.answer;
      if (q.isBonus) {
        if (isCorrect) bonusCorrect++;
        else errorsList.push({ question: q, userAns, correctAns: q.answer });
      } else {
        if (isCorrect) coreCorrect++;
        else errorsList.push({ question: q, userAns, correctAns: q.answer });
      }
    });

    // Skola2030 vērtējums 1–10 ballēs pēc 10 pamatuzdevumiem
    const markGrade = Math.max(1, Math.min(10, Math.round(coreCorrect)));
    const corePercent = Math.round((coreCorrect / 10) * 100);

    let levelTitle = 'Izcili!';
    if (markGrade >= 9) levelTitle = 'Izcili!';
    else if (markGrade >= 7) levelTitle = 'Teicami un ļoti labi!';
    else if (markGrade >= 5) levelTitle = 'Labi apgūts pamats!';
    else levelTitle = 'Vēl jātrenējas!';

    finalResult = {
      coreCorrect,
      totalCore: 10,
      bonusCorrect,
      totalBonus: 5,
      grade: markGrade,
      percent: corePercent,
      levelTitle,
      errorsList,
      date: new Intl.DateTimeFormat('lv-LV', { dateStyle: 'long' }).format(new Date())
    };

    examFinished = true;
    currentTab = 'diploma';
    playSound('fanfare');

    // Saglabā progresu un piešķir BP
    if (canSubmit) {
      try {
        await saveProgress({
          activityType: 'Dabas teritorijas · 3. kl. NPD',
          subject: 'Dabaszinības',
          subjectId: 'nature',
          topicId: 'dabas_teritorijas_npd',
          score: corePercent,
          mode: 'exam',
          notes: {
            grade: markGrade,
            bonusCorrect,
            totalBonus: 5,
            mission: 'Dabas teritorijas'
          }
        });
      } catch (err) {
        console.warn('Neizdevās saglabāt Dabaszinību NPD progresu:', err);
      }
    }

    render();
  }

  // --- DIPLOMA UN REZULTĀTU SKATS ---
  function renderDiplomaView() {
    const wrap = document.createElement('div');
    wrap.className = 'diploma-view-wrap';

    if (!finalResult) {
      wrap.innerHTML = '<p>Pārbaudes darbs vēl nav pabeigts. Lūdzu, izpildi uzdevumus!</p>';
      return wrap;
    }

    const res = finalResult;

    // Rīkjosla ar diplomu darbībām
    const actionsBar = document.createElement('div');
    actionsBar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;';

    const leftBtns = document.createElement('div');
    leftBtns.style.cssText = 'display:flex;gap:8px;';

    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.className = 'action-button';
    printBtn.style.cssText = 'padding:10px 18px;background:#059669;color:#fff;border:0;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;';
    printBtn.innerHTML = '<span>🖨️</span><span>Drukāt / Saglabāt diplomu</span>';
    printBtn.onclick = () => window.print();

    const audioGreetingBtn = document.createElement('button');
    audioGreetingBtn.type = 'button';
    audioGreetingBtn.style.cssText = 'padding:10px 18px;background:#f59e0b;color:#78350f;border:0;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;box-shadow:0 4px 12px rgba(245,158,11,0.25);';
    audioGreetingBtn.innerHTML = '<span>🔊</span><span>Noklausīties apsveikumu balsī</span>';
    audioGreetingBtn.onclick = () => {
      speakText(`Apsveicam, Samanta! Tu esi sekmīgi nokārtojusi trešās klases dabaszinību pārbaudes darbu "Kas ir kopīgs un atšķirīgs dažādām dabas teritorijām". Tavs vērtējums ir ${res.grade} balles, un tu nopelnīji ${res.bonusCorrect} zelta bonusa zvaigznes! Tev piešķirts Zelta Dabas Pētnieces goda nosaukums!`);
    };

    leftBtns.append(printBtn, audioGreetingBtn);

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'quiet-button';
    retryBtn.style.cssText = 'padding:9px 16px;background:#fff;border:1px solid #cbd5e1;border-radius:12px;font-size:0.9rem;cursor:pointer;color:#475569;';
    retryBtn.textContent = '🔄 Pildīt vēlreiz';
    retryBtn.onclick = () => {
      stopSpeaking();
      userAnswers = {};
      currentQuestionIndex = 0;
      examFinished = false;
      currentTab = 'exam';
      render();
    };

    actionsBar.append(leftBtns, retryBtn);
    wrap.append(actionsBar);

    // Formāts A4 / sertifikāts (Diploms)
    const certificate = document.createElement('div');
    certificate.className = 'nature-certificate-card card';
    certificate.style.cssText = 'background:linear-gradient(145deg,#fffdf7 0%,#fefae0 40%,#f0fdf4 100%);border:8px double #d97706;border-radius:26px;padding:34px 28px;text-align:center;box-shadow:0 14px 40px rgba(217,119,6,0.18);position:relative;margin-bottom:24px;';

    certificate.innerHTML = `
      <div style="font-size:3.2rem;margin-bottom:6px;">🌿 📜 🦉</div>
      <div style="font-size:0.92rem;font-weight:900;letter-spacing:0.12em;color:#b45309;text-transform:uppercase;">Mājas Skola · Skola2030 standarts</div>
      <h2 style="font-size:clamp(1.8rem,4vw,2.4rem);font-weight:900;color:#065f46;margin:10px 0 4px 0;line-height:1.2;">OFICIĀLAIS DIPLOMS</h2>
      <p style="font-size:1.15rem;font-weight:800;color:#d97706;margin:0 0 16px 0;">⭐ ZELTA DABAS PĒTNIECE ⭐</p>
      
      <p style="font-size:1.05rem;color:#334155;max-width:620px;margin:0 auto 18px auto;line-height:1.5;">
        Šis dokuments apliecina, ka <b>Samanta</b> ir izcili apguvusi 3. klases Dabaszinību tematu:
        <br><i style="color:#047857;">"Kas ir kopīgs un atšķirīgs dažādām dabas teritorijām?"</i>
      </p>

      <div style="display:flex;justify-content:center;gap:18px;margin:22px 0;flex-wrap:wrap;">
        <div style="background:#fff;padding:14px 24px;border-radius:18px;border:2px solid #059669;box-shadow:0 4px 14px rgba(5,150,105,0.12);">
          <div style="font-size:0.82rem;font-weight:800;color:#64748b;text-transform:uppercase;">Vērtējums</div>
          <div style="font-size:2.4rem;font-weight:900;color:#047857;">${res.grade} <span style="font-size:1.2rem;color:#64748b;">/ 10</span></div>
          <div style="font-size:0.92rem;font-weight:800;color:#059669;">${res.levelTitle}</div>
        </div>

        <div style="background:#fff;padding:14px 24px;border-radius:18px;border:2px solid #d97706;box-shadow:0 4px 14px rgba(217,119,6,0.12);">
          <div style="font-size:0.82rem;font-weight:800;color:#64748b;text-transform:uppercase;">Zelta bonusi</div>
          <div style="font-size:2.4rem;font-weight:900;color:#d97706;">+${res.bonusCorrect} <span style="font-size:1.3rem;">⭐</span></div>
          <div style="font-size:0.92rem;font-weight:800;color:#b45309;">no 5 Zelta pērlēm</div>
        </div>

        <div style="background:#fff;padding:14px 24px;border-radius:18px;border:2px solid #7c3aed;box-shadow:0 4px 14px rgba(124,58,237,0.12);">
          <div style="font-size:0.82rem;font-weight:800;color:#64748b;text-transform:uppercase;">Punktu maks</div>
          <div style="font-size:2.4rem;font-weight:900;color:#7c3aed;">+20 BP</div>
          <div style="font-size:0.92rem;font-weight:800;color:#6d28d9;">Kino vakara mērķim!</div>
        </div>
      </div>

      <div style="border-top:1px dashed #cbd5e1;padding-top:16px;margin-top:18px;display:flex;justify-content:space-between;align-items:center;font-size:0.88rem;color:#64748b;">
        <span>📅 Datums: <b>${res.date}</b></span>
        <span>✍️ Pārbaudīts un apstiprināts Mājas skolas sistēmā</span>
      </div>
    `;

    wrap.append(certificate);

    // Kļūdu un atbilžu paskaidrojumu sadaļa
    const reviewCard = document.createElement('div');
    reviewCard.className = 'card';
    reviewCard.style.cssText = 'background:#fff;border-radius:20px;padding:24px;border:1px solid #e2e8f0;margin-bottom:20px;';

    const revH3 = document.createElement('h3');
    revH3.style.cssText = 'font-size:1.25rem;color:#065f46;margin:0 0 16px 0;font-weight:800;';
    revH3.textContent = '📖 Visu uzdevumu atbilžu pārskats un paskaidrojumi';
    reviewCard.append(revH3);

    NATURE_QUESTIONS.forEach((q, idx) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.answer;

      const row = document.createElement('div');
      row.style.cssText = `padding:14px;border-radius:14px;border-left:5px solid ${isCorrect ? '#10b981' : '#f43f5e'};background:${isCorrect ? '#f0fdf4' : '#fff1f2'};margin-bottom:12px;`;

      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.85rem;font-weight:800;color:${isCorrect ? '#047857' : '#be123c'};">${q.section} · ${isCorrect ? '✅ PAREIZI' : '❌ KĻŪDA'}</span>
        </div>
        <div style="font-weight:700;font-size:1rem;color:#1e293b;margin-bottom:6px;">${idx + 1}. ${q.prompt}</div>
        <div style="font-size:0.92rem;color:#334155;margin-bottom:4px;">Tava atbilde: <b>${userAns || 'Nav atbildēts'}</b></div>
        ${!isCorrect ? `<div style="font-size:0.92rem;color:#047857;font-weight:700;margin-bottom:4px;">Pareizā atbilde: <b>${q.answer}</b></div>` : ''}
        <div style="font-size:0.88rem;color:#475569;background:rgba(255,255,255,0.7);padding:8px 12px;border-radius:8px;margin-top:6px;">💡 <b>Skaidrojums:</b> ${q.explanation}</div>
      `;

      reviewCard.append(row);
    });

    wrap.append(reviewCard);
    return wrap;
  }

  // --- INTERAKTĪVĀS DABAS LABORATORIJAS SKATS (TEORIJA) ---
  function renderTheoryView() {
    const wrap = document.createElement('div');
    wrap.className = 'theory-view-wrap';

    // 1. Meža 5 stāvi
    const forestCard = document.createElement('div');
    forestCard.className = 'card';
    forestCard.style.cssText = 'background:#fff;border-radius:20px;padding:24px;border:1px solid #e2e8f0;margin-bottom:20px;box-shadow:0 8px 24px rgba(0,0,0,0.04);';

    forestCard.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:1.8rem;">🌲</span>
        <h3 style="font-size:1.35rem;color:#065f46;margin:0;font-weight:800;">Meža 5 stāvu interaktīvais šķērsgriezums</h3>
      </div>
      <p style="font-size:0.95rem;color:#475569;margin:0 0 18px 0;">Klikšķini uz jebkura meža stāva, lai atklātu tā iemītniekus un noklausītos stāstu balsī!</p>
    `;

    const layersList = document.createElement('div');
    layersList.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

    NATURE_THEORY.layers.forEach(layer => {
      const layerEl = document.createElement('div');
      layerEl.style.cssText = 'border:2px solid #d1fae5;border-radius:16px;padding:16px;background:linear-gradient(145deg,#fff,#f0fdf4);transition:all 0.2s;';

      layerEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.6rem;">${layer.icon}</span>
            <strong style="font-size:1.1rem;color:#065f46;">${layer.name}</strong>
          </div>
          <span style="font-size:0.8rem;background:#ecfdf5;color:#047857;padding:4px 10px;border-radius:99px;font-weight:800;border:1px solid #a7f3d0;">${layer.height}</span>
        </div>
        <p style="font-size:0.96rem;color:#334155;line-height:1.5;margin:0 0 10px 0;">${layer.desc}</p>
        <div style="font-size:0.88rem;color:#047857;margin-bottom:8px;">
          <b>🌿 Augi:</b> ${layer.plants.join(', ')}
          <br><b>🦊 Iemītnieki:</b> ${layer.animals.join(', ')}
        </div>
      `;

      const speakBtn = document.createElement('button');
      speakBtn.type = 'button';
      speakBtn.className = 'quiet-button';
      speakBtn.style.cssText = 'padding:6px 14px;background:#fff;border:1px solid #a7f3d0;border-radius:10px;color:#047857;font-weight:700;font-size:0.84rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;';
      speakBtn.innerHTML = '<span>🔊</span><span>Nolasīt stāvu balsī</span>';
      speakBtn.onclick = () => speakText(layer.audio);

      layerEl.append(speakBtn);
      layersList.append(layerEl);
    });

    forestCard.append(layersList);
    wrap.append(forestCard);

    // 2. Salīdzināšanas matrica: Mežs vs Pļava vs Purvs vs Ūdenstilpe
    const matrixCard = document.createElement('div');
    matrixCard.className = 'card';
    matrixCard.style.cssText = 'background:#fff;border-radius:20px;padding:24px;border:1px solid #e2e8f0;margin-bottom:20px;box-shadow:0 8px 24px rgba(0,0,0,0.04);';

    matrixCard.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:1.8rem;">📊</span>
        <h3 style="font-size:1.35rem;color:#065f46;margin:0;font-weight:800;">Lielā Salīdzināšanas matrica: Kas kopīgs un atšķirīgs?</h3>
      </div>
      <p style="font-size:0.95rem;color:#475569;margin:0 0 16px 0;">Pārskati četras dabas teritorijas: kā atšķiras saule, ūdens, augsne un sugas!</p>
    `;

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;';

    NATURE_THEORY.matrix.forEach(col => {
      const colEl = document.createElement('div');
      colEl.style.cssText = 'background:#f8fafc;padding:16px;border-radius:16px;border:1px solid #e2e8f0;';

      colEl.innerHTML = `
        <h4 style="font-size:1.15rem;color:#065f46;margin:0 0 12px 0;font-weight:800;border-bottom:2px solid #a7f3d0;padding-bottom:6px;">${col.territory}</h4>
        <div style="font-size:0.88rem;color:#334155;line-height:1.5;">
          <div style="margin-bottom:6px;"><b>☀️ Gaisma:</b> ${col.light}</div>
          <div style="margin-bottom:6px;"><b>💧 Mitrums:</b> ${col.moisture}</div>
          <div style="margin-bottom:6px;"><b>🌱 Augsne:</b> ${col.soil}</div>
          <div><b>🦊 Sugas:</b> ${col.typical}</div>
        </div>
      `;
      grid.append(colEl);
    });

    matrixCard.append(grid);
    wrap.append(matrixCard);

    // 3. Barības ķēžu konstruktors
    const chainsCard = document.createElement('div');
    chainsCard.className = 'card';
    chainsCard.style.cssText = 'background:#fff;border-radius:20px;padding:24px;border:1px solid #e2e8f0;margin-bottom:20px;box-shadow:0 8px 24px rgba(0,0,0,0.04);';

    chainsCard.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:1.8rem;">🔗</span>
        <h3 style="font-size:1.35rem;color:#065f46;margin:0;font-weight:800;">Barības ķēžu likumi: Kas ko apēd?</h3>
      </div>
      <p style="font-size:0.95rem;color:#475569;margin:0 0 16px 0;">Katrā dabas teritorijā barības ķēde sākas ar zaļo augu (ražotāju)!</p>
    `;

    NATURE_THEORY.foodChains.forEach(fc => {
      const fcEl = document.createElement('div');
      fcEl.style.cssText = 'background:#f0fdf4;border:1px solid #a7f3d0;padding:14px 18px;border-radius:14px;margin-bottom:12px;';

      const stepsHtml = fc.steps.map(s => s === '➔' ? '<span style="font-size:1.3rem;color:#059669;font-weight:900;">➔</span>' : `<span style="background:#fff;padding:4px 10px;border-radius:8px;font-weight:700;border:1px solid #cbd5e1;font-size:0.92rem;">${s}</span>`).join(' ');

      fcEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <strong style="font-size:1.05rem;color:#065f46;">${fc.title}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          ${stepsHtml}
        </div>
        <p style="font-size:0.9rem;color:#475569;margin:0 0 8px 0;">${fc.desc}</p>
      `;

      const audioChainBtn = document.createElement('button');
      audioChainBtn.type = 'button';
      audioChainBtn.className = 'quiet-button';
      audioChainBtn.style.cssText = 'padding:5px 12px;background:#fff;border:1px solid #a7f3d0;border-radius:8px;color:#047857;font-weight:700;font-size:0.82rem;cursor:pointer;';
      audioChainBtn.innerHTML = '<span>🔊</span><span>Klausīties ķēdi</span>';
      audioChainBtn.onclick = () => speakText(fc.audio);

      fcEl.append(audioChainBtn);
      chainsCard.append(fcEl);
    });

    wrap.append(chainsCard);

    // Poga uz pārbaudes darbu
    const startExBtn = document.createElement('div');
    startExBtn.style.cssText = 'text-align:center;padding:16px 0;';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'action-button';
    btn.style.cssText = 'padding:14px 32px;font-size:1.1rem;font-weight:800;border-radius:16px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border:0;cursor:pointer;box-shadow:0 6px 20px rgba(5,150,105,0.3);';
    btn.textContent = '🌟 Sākt Samantas NPD pārbaudes darbu ar Zelta bonusiem! →';
    btn.onclick = () => {
      stopSpeaking();
      currentTab = 'exam';
      render();
    };
    startExBtn.append(btn);
    wrap.append(startExBtn);

    return wrap;
  }

  // Galvenā renderēšanas funkcija
  function render() {
    root.replaceChildren();
    root.append(renderHeader());

    if (currentTab === 'exam') {
      root.append(renderExamView());
    } else if (currentTab === 'theory') {
      root.append(renderTheoryView());
    } else if (currentTab === 'diploma') {
      root.append(renderDiplomaView());
    }
  }

  // Sākotnējā atainošana
  render();

  return {
    cleanup() {
      stopSpeaking();
    }
  };
}
