// Samantas latviešu valodas dārzs — vieglā lasīšana, zilbēšana un disleksijas atbalsts.
import { calculatePracticePoints, previewImprovement } from './points-policy.js';

const readingStories = [
  { sentence: 'Kaķis guļ uz sola.', syllables: 'Ka-ķis guļ uz so-la.', q: 'Kur guļ kaķis?', a: 'uz sola', options: ['uz sola', 'zem sola', 'kokā'], hint: 'Izlasi teikumu vēlreiz: kur atrodas kaķis?' },
  { sentence: 'Saule spīd.', syllables: 'Sau-le spīd.', q: 'Kas spīd?', a: 'saule', options: ['saule', 'mēness', 'lampa'], hint: 'Paskaties uz pirmo vārdu: kas ir debesīs?' },
  { sentence: 'Liene lasa grāmatu.', syllables: 'Lie-ne la-sa grā-ma-tu.', q: 'Ko lasa Liene?', a: 'grāmatu', options: ['grāmatu', 'vēstuli', 'avīzi'], hint: 'Ko Liene tur rokās?' },
  { sentence: 'Dārzā aug roze.', syllables: 'Dār-zā aug ro-ze.', q: 'Kas aug dārzā?', a: 'roze', options: ['roze', 'ābele', 'zāle'], hint: 'Puķe ar asiem ērkšķiem ir...' },
  { sentence: 'Mazs suns skrien.', syllables: 'Mazs suns skrien.', q: 'Kas skrien?', a: 'suns', options: ['suns', 'kaķis', 'zaķis'], hint: 'Četrkājains draugs, kurš rej.' },
  { sentence: 'Tētis cep maizi.', syllables: 'Tē-tis cep mai-zi.', q: 'Ko cep tētis?', a: 'maizi', options: ['maizi', 'pankūkas', 'kūku'], hint: 'Smaržīgu un siltu cepeškrāsnī cep...' },
  { sentence: 'Mežā dzīvo lapsa.', syllables: 'Me-žā dzī-vo lap-sa.', q: 'Kur dzīvo lapsa?', a: 'mežā', options: ['mežā', 'alā pie ezera', 'mājā'], hint: 'Zaļā vietā ar daudziem kokiem.' },
  { sentence: 'Anna dzer pienu.', syllables: 'An-na dzer pie-nu.', q: 'Ko dzer Anna?', a: 'pienu', options: ['pienu', 'tēju', 'ūdeni'], hint: 'Baltu un veselīgu dzērienu.' },
  { sentence: 'Putns dzied kokā.', syllables: 'Putns dzied ko-kā.', q: 'Kur dzied putns?', a: 'kokā', options: ['kokā', 'uz jumta', 'pļavā'], hint: 'Augstu zaros.' },
  { sentence: 'Zivis peld ezerā.', syllables: 'Zi-vis peld e-ze-rā.', q: 'Kur peld zivis?', a: 'ezerā', options: ['ezerā', 'upē pie jūras', 'bļodā'], hint: 'Ūdenstilpē, kur ir daudz ūdens.' },
  { sentence: 'Māsa zīmē puķi.', syllables: 'Mā-sa zī-mē pu-ķi.', q: 'Ko zīmē māsa?', a: 'puķi', options: ['puķi', 'māju', 'sauli'], hint: 'Ziedu ar krāsainām ziedlapiņām.' },
  { sentence: 'Pele grauž sieru.', syllables: 'Pe-le grauž sie-ru.', q: 'Ko grauž pele?', a: 'sieru', options: ['sieru', 'maizi', 'riekstu'], hint: 'Dzeltenu gardumu ar caurumiem.' },
  { sentence: 'Sniegs klāj zemi.', syllables: 'Sniegs klāj ze-mi.', q: 'Kas klāj zemi?', a: 'sniegs', options: ['sniegs', 'lietus', 'lapas'], hint: 'Balts un auksts ziemā.' },
  { sentence: 'Lācis guļ alā.', syllables: 'Lā-cis guļ a-lā.', q: 'Kur guļ lācis?', a: 'alā', options: ['alā', 'gultā', 'kokā'], hint: 'Drošā un siltā ziemas miega vietā.' },
  { sentence: 'Mamma nes somu.', syllables: 'Mam-ma nes so-mu.', q: 'Ko nes mamma?', a: 'somu', options: ['somu', 'grozu', 'kasti'], hint: 'Kur liek mantas un grāmatas?' },
  { sentence: 'Bērni spēlējas parkā.', syllables: 'Bēr-ni spē-lē-jas par-kā.', q: 'Kur spēlējas bērni?', a: 'parkā', options: ['parkā', 'skolā', 'istabā'], hint: 'Lielā zaļā laukumā ar šūpolēm.' },
  { sentence: 'Vilciens brauc ātri.', syllables: 'Vil-ciens brauc ā-tri.', q: 'Kas brauc ātri?', a: 'vilciens', options: ['vilciens', 'autobuss', 'ritenis'], hint: 'Brauc pa sliedēm.' },
  { sentence: 'Skolā skan zvans.', syllables: 'Sko-lā skan zvans.', q: 'Kas skan skolā?', a: 'zvans', options: ['zvans', 'mūzika', 'smaids'], hint: 'Aicina uz stundu.' }
];

const partWords = {
  lietvārds: ['māja','suns','zieds','koks','laiva','upe','skola','grāmata','pele','saule'],
  darbības_vārds: ['skrien','lasa','ēd','raksta','dzied','lec','sēž','brauc','zīmē','peld'],
  īpašības_vārds: ['mazs','liels','gudrs','gaišs','zaļš','skaists','silts','garš','sarkans','ātrs']
};

const gaps = [
  ['m_ja','ā',['ā','a','e']],
  ['sk_la','o',['o','u','a']],
  ['p_ķe','u',['u','ū','i']],
  ['z_eds','i',['i','ī','e']],
  ['lā_is','c',['c','č','s']],
  ['gr_mata','ā',['ā','a','o']],
  ['s_ule','a',['a','ā','e']],
  ['m_žs','e',['e','ē','i']],
  ['sni_gs','e',['e','ē','i']],
  ['m_ļš','ī',['ī','i','e']],
  ['r_tenis','i',['i','ī','u']],
  ['z_mulis','ī',['ī','i','e']],
  ['b_rns','ē',['ē','e','i']],
  ['r_denī','u',['u','ū','o']],
  ['pļ_va','a',['a','ā','e']],
  ['dra_gs','u',['u','ū','o']],
  ['m_konis','ā',['ā','a','o']]
];

export function makeSamantaLatvianBank() {
  const bank = [];
  readingStories.forEach((item, i) => {
    bank.push({
      id: 'r' + i,
      topic: 'reading',
      prompt: item.sentence + '\n' + item.q,
      speechText: item.sentence + ' ' + item.q,
      syllablesText: item.syllables + '\n' + item.q,
      answer: item.a,
      options: item.options,
      hint: item.hint
    });
  });

  for (const [name, words] of Object.entries(partWords)) {
    const roleName = name.replace('_', ' ');
    words.forEach((word, i) => {
      bank.push({
        id: 'p' + name + i,
        topic: 'parts',
        prompt: 'Kura vārdšķira ir vārds “' + word + '”?',
        speechText: 'Kura vārdšķira ir vārds ' + word + '?',
        syllablesText: 'Kura vārdšķira ir vārds “' + word + '”?',
        answer: roleName,
        options: ['lietvārds', 'darbības vārds', 'īpašības vārds'],
        hint: 'Lietvārds ir lieta vai būtne; darbības vārds ir darbība; īpašības vārds ir pazīme.'
      });
    });
  }

  gaps.forEach(([word, answer, options], i) => {
    bank.push({
      id: 'g' + i,
      topic: 'letters',
      prompt: 'Ievieto trūkstošo burtu: ' + word,
      speechText: 'Ievieto trūkstošo burtu vārdā ' + word.replace('_', 'tukšums'),
      syllablesText: 'Ievieto trūkstošo burtu: ' + word,
      answer: answer,
      options: options,
      hint: 'Izrunā vārdu lēnām un ieklausies skaņā.'
    });
  });

  return bank;
}

export function renderSamantaLatvian(root, { canSubmit = false, currentUid = '', saveProgress = async () => {}, initialState=null, onCheckpoint=()=>{} } = {}) {
  const host = document.createElement('section');
  host.className = 'module learning-hub samanta-reading';
  root.append(host);

  const bank = makeSamantaLatvianBank();
  const topics = [
    ['reading', '📖 Vieglā lasīšana', 'Īsi stāstiņi un teikumi ar jautājumiem'],
    ['parts', '🧩 Vārdšķiras', 'Lietvārdi, darbības vārdi un īpašības vārdi'],
    ['letters', '🔤 Trūkstošais burts', 'Atrodi īsto burtu vārdā']
  ];

  let topic = null;
  let mode = 'practice';
  let questions = [];
  let index = 0;
  let correct = 0;
  let streak = 0;
  let maxStreak = 0;
  let showSyllables = true;
  const answeredQuestions=new Set();

  const el = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };

  const btn = (text, cb, parent = host, cls = 'action-button') => {
    const b = el('button', text, cls);
    b.type = 'button';
    b.onclick = cb;
    parent.append(b);
    return b;
  };

  const shuffle = arr => {
    const b = [...arr];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };

  function view() {
    host.replaceChildren();
    const heading = el('div', undefined, 'learning-heading');
    heading.append(
      el('span', '🌸 SAMANTAS VALODAS DĀRZS', 'eyebrow'),
      el('h2', 'Vieglā lasīšana un vārdi'),
      el('p', 'Mācies savā tempā — ar skaidriem burtiem, zilbēm un balss atbalstu.')
    );
    host.append(heading);

    const grid = el('div', undefined, 'topic-grid');
    topics.forEach(([key, title, desc]) => {
      const tile = el('button', undefined, 'topic-tile');
      tile.type = 'button';
      tile.append(
        el('span', title.split(' ')[0], 'topic-emoji'),
        el('strong', title.slice(title.indexOf(' ') + 1)),
        el('small', desc)
      );
      tile.onclick = () => choose(key);
      grid.append(tile);
    });
    host.append(grid);
  }

  function choose(t) {
    topic = t;
    host.replaceChildren();
    const item = topics.find(x => x[0] === t);
    const heading = el('div', undefined, 'learning-heading');
    heading.append(
      el('span', '🌸 TĒMAS IZVĒLE', 'eyebrow'),
      el('h2', item[1]),
      el('p', item[2])
    );
    host.append(heading);

    const cluster = el('div', undefined, 'button-cluster');
    btn('🌱 Mācos · 8', () => start('learn'), cluster);
    btn('🎯 Trenējos · 12', () => start('practice'), cluster);
    btn('🏆 Pārbaudu sevi · 16', () => start('exam'), cluster);
    btn('← Visas tēmas', view, cluster, 'quiet-button');
    host.append(cluster);
  }

  function start(m) {
    mode = m;
    const pool = bank.filter(q => q.topic === topic);
    const count = m === 'learn' ? 8 : m === 'exam' ? 16 : 12;
    questions = shuffle(pool).slice(0, count);
    index = correct = streak = maxStreak = 0;
    answeredQuestions.clear();
    step();
  }

  function renderSyllableHtml(text) {
    return text.split('\n').map(line => {
      const words = line.split(' ');
      return words.map(w => {
        if (!w.includes('-')) return `<span>${w}</span>`;
        const parts = w.split('-');
        return parts.map((part, idx) => 
          `<span class="${idx % 2 === 0 ? 'syllable-a' : 'syllable-b'}">${part}</span>`
        ).join('<span class="syllable-dash">·</span>');
      }).join(' ');
    }).join('<br>');
  }

  function step() {
    onCheckpoint({topic,mode,questions,index,correct,streak,maxStreak,showSyllables});
    if (index >= questions.length) {
      void finish();
      return;
    }
    host.replaceChildren();
    const q = questions[index];

    const topBar = el('div', undefined, 'reading-topbar');
    topBar.append(el('h2', 'Uzdevums ' + (index + 1) + ' no ' + questions.length));

    // Syllables toggle button
    const sylBtn = el('button', showSyllables ? '✂️ Zilbju režīms: Ieslēgts' : '📖 Parastais teksts', 'syllable-mode-toggle');
    sylBtn.type = 'button';
    sylBtn.onclick = () => {
      showSyllables = !showSyllables;
      if(showSyllables&&q.syllablesText)taskText.innerHTML=renderSyllableHtml(q.syllablesText);else taskText.textContent=q.prompt;
    };
    topBar.append(sylBtn);
    host.append(topBar);

    const progress = el('div', undefined, 'progress-track');
    const fill = el('div', undefined, 'progress-fill');
    fill.style.width = Math.round((index / questions.length) * 100) + '%';
    progress.append(fill);
    host.append(progress);

    const streakBadge = el('p', '🔥 ' + streak + ' pareizas pēc kārtas · Rekords: ' + maxStreak, 'streak-label');
    host.append(streakBadge);

    const card = el('section', undefined, 'reading-task-card dyslexia-friendly');
    const taskText = el('div', undefined, 'reading-prompt');
    if (showSyllables && q.syllablesText) {
      taskText.innerHTML = renderSyllableHtml(q.syllablesText);
    } else {
      taskText.textContent = q.prompt;
      taskText.style.whiteSpace = 'pre-line';
    }
    card.append(taskText);

    // Audio controls
    const controls = el('div', undefined, 'reading-controls');
    const listenText = q.speechText || q.prompt;
    const listenBtn = btn('🔊 Nolasīt lēnām', () => {
      if (!('speechSynthesis' in window)) {
        status.textContent = 'Balss nolasīšana šajā ierīcē nav pieejama.';
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(listenText);
      u.lang = 'lv-LV';
      u.rate = 0.78; // Gentle slower speed for dyslexia
      u.pitch = 1.05;
      const lvVoice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('lv'));
      if (lvVoice) u.voice = lvVoice;

      u.onstart = () => listenBtn.classList.add('audio-playing');
      u.onend = () => listenBtn.classList.remove('audio-playing');
      u.onerror = () => listenBtn.classList.remove('audio-playing');
      window.speechSynthesis.speak(u);
    }, controls, 'reading-listen');

    btn('⏹ Apturēt', () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      listenBtn.classList.remove('audio-playing');
    }, controls, 'reading-stop');

    card.append(controls);

    const status = el('p', undefined, 'reading-feedback');
    status.setAttribute('role', 'status');

    // Interactive options cluster (no hard typing barrier for dyslexia)
    const optionsContainer = el('div', undefined, 'reading-options-cluster');
    optionsContainer.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:16px 0';

    const opts = q.options && q.options.length ? shuffle(q.options) : [q.answer];

    opts.forEach(optionText => {
      const optBtn = el('button', optionText, 'galotnes-btn');
      optBtn.type = 'button';
      optBtn.onclick = () => {
        if(answeredQuestions.has(index))return;answeredQuestions.add(index);
        optionsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
        const isGood = optionText.trim().toLowerCase() === q.answer.trim().toLowerCase();
        correct += Number(isGood);
        streak = isGood ? streak + 1 : 0;
        maxStreak = Math.max(streak, maxStreak);

        if (isGood) {
          optBtn.style.background = mode==='exam'?'#eef2ff':'#dcfce7';
          optBtn.style.borderColor = mode==='exam'?'#64748b':'#16a34a';
          status.textContent = mode === 'exam' ? 'Atbilde pieņemta!' : '🎉 Pareizi! Lieliski izlasīts!';
          status.className = mode==='exam'?'reading-feedback':'reading-feedback answer-feedback-good';
        } else {
          optBtn.style.background = mode==='exam'?'#eef2ff':'#fee2e2';
          optBtn.style.borderColor = mode==='exam'?'#64748b':'#dc2626';
          status.textContent = mode === 'exam' ? 'Atbilde pieņemta.' : '🔎 Pareizā atbilde bija: ' + q.answer + '. ' + (q.hint || '');
          status.className = mode==='exam'?'reading-feedback':'reading-feedback answer-feedback-error';
        }

        const nextBtn = btn('Nākamais uzdevums →', () => {
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          index++;
          step();
        }, card, 'action-button');
        nextBtn.style.marginTop = '14px';
      };
      optionsContainer.append(optBtn);
    });

    card.append(optionsContainer, status);

    if (mode === 'learn') {
      btn('💡 Pavediens', () => {
        status.textContent = q.hint || 'Pārlasi lēnām katru vārdu.';
      }, card, 'quiet-button');
    }

    host.append(card);
  }

  async function finish() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const pct = Math.round((100 * correct) / questions.length);
    host.replaceChildren();

    const heading = el('div', undefined, 'learning-heading');
    heading.append(
      el('span', '🌸 TRENIŅŠ PABEIGTS', 'eyebrow'),
      el('h2', pct >= 80 ? 'Izcili, Samanta!' : pct >= 50 ? 'Labi pastrādāts!' : 'Treniņš pabeigts!'),
      el('p', 'Pareizi ' + correct + ' no ' + questions.length + ' (' + pct + '%) · Garākā sērija: ' + maxStreak)
    );
    host.append(heading);

    const status = el('p', undefined, 'reading-feedback');
    host.append(status);

    if (canSubmit) {
      try {
        const id = await saveProgress({
          studentRole: 'samanta',
          subject: 'Latviešu valoda',
          activityType: topic + ' · ' + mode,
          score: pct,
          notes: JSON.stringify({ correct, total: questions.length, maxStreak, dyslexiaMode: showSyllables, mode })
        });
        status.textContent = id ? '✅ Rezultāts saglabāts.' : '⚠️ Saglabāšana nav apstiprināta.';
      } catch {
        status.textContent = '⚠️ Rezultāta saglabāšana neizdevās.';
      }
    } else {
      status.textContent = 'Vecāka priekšskatījums — rezultāts netiek ieskaitīts.';
    }

    const actions = el('div', undefined, 'button-cluster');
    btn('Trenēties vēlreiz', () => start(mode), actions);
    btn('← Atpakaļ uz tēmām', view, actions, 'quiet-button');
    host.append(actions);
  }

  if(initialState){({topic,mode,questions,index,correct,streak,maxStreak,showSyllables}=initialState);step();}else view();
}
