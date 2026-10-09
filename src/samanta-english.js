// Samantas skola — Angļu valodas trenažieris ar audio izrunu un vizuālām kartītēm
const shuffle = a => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

const VOCABULARY = {
  colors: [
    { en: 'red', lv: 'sarkans', icon: '🔴', hint: 'Kā zemenes vai ugunsdzēsēju auto' },
    { en: 'blue', lv: 'zils', icon: '🔵', hint: 'Kā skaidras debesis vai jūra' },
    { en: 'green', lv: 'zaļš', icon: '🟢', hint: 'Kā zāle un lapas kokā' },
    { en: 'yellow', lv: 'dzeltens', icon: '🟡', hint: 'Kā silta saulīte un banāns' },
    { en: 'pink', lv: 'rozā', icon: '🌸', hint: 'Kā ziedošas puķītes vai flamingo' },
    { en: 'orange', lv: 'oranžs', icon: '🟠', hint: 'Kā apelsīns vai burkāns' },
    { en: 'purple', lv: 'violets', icon: '🟣', hint: 'Kā plūmes un mellenes' },
    { en: 'white', lv: 'balts', icon: '⚪', hint: 'Kā pirmais sniegs vai mākoņi' },
    { en: 'black', lv: 'melns', icon: '⚫', hint: 'Kā nakts debesis bez zvaigznēm' },
    { en: 'brown', lv: 'brūns', icon: '🟤', hint: 'Kā šokolāde vai lāča kažoks' }
  ],
  animals: [
    { en: 'cat', lv: 'kaķis', icon: '🐱', hint: 'Murrā un ķer pelītes' },
    { en: 'dog', lv: 'suns', icon: '🐶', hint: 'Cilvēka labākais draugs, kas rej' },
    { en: 'rabbit', lv: 'trusis', icon: '🐰', hint: 'Lec ar garām ausīm un grauž burkānu' },
    { en: 'bird', lv: 'putns', icon: '🐦', hint: 'Lido spārnos un dzied kokā' },
    { en: 'horse', lv: 'zirgs', icon: '🐴', hint: 'Skrien rikšiem pa pļavu' },
    { en: 'bear', lv: 'lācis', icon: '🐻', hint: 'Mīl medu un ziemā guļ alā' },
    { en: 'fox', lv: 'lapsa', icon: '🦊', hint: 'Kūmiņš ar kuplu rudu asti' },
    { en: 'fish', lv: 'zivs', icon: '🐟', hint: 'Peld dzidrā ūdenī un elpo ar žaunām' },
    { en: 'duck', lv: 'pīle', icon: '🦆', hint: 'Peld pa dīķi un saka pēk-pēk' },
    { en: 'lion', lv: 'lauva', icon: '🦁', hint: 'Zvēru karalis ar lepnu krēpi' }
  ],
  numbers: [
    { en: 'one', lv: 'viens (1)', icon: '1️⃣', hint: 'Pirmais skaitlis' },
    { en: 'two', lv: 'divi (2)', icon: '2️⃣', hint: 'Pāris, piemēram, divi zābaciņi' },
    { en: 'three', lv: 'trīs (3)', icon: '3️⃣', hint: 'Trīs sivēntiņi vai trīs vēlēšanās' },
    { en: 'four', lv: 'četri (4)', icon: '4️⃣', hint: 'Četras kājas galdam vai kaķītim' },
    { en: 'five', lv: 'pieci (5)', icon: '5️⃣', hint: 'Pieci pirkstiņi uz vienas rokas' },
    { en: 'six', lv: 'seši (6)', icon: '6️⃣', hint: 'Kukaiņiem ir 6 kājas' },
    { en: 'seven', lv: 'septiņi (7)', icon: '7️⃣', hint: 'Septiņas krāsas varavīksnē' },
    { en: 'eight', lv: 'astoņi (8)', icon: '8️⃣', hint: 'Astoņkājim ir 8 taustekļi' },
    { en: 'nine', lv: 'deviņi (9)', icon: '9️⃣', hint: 'Viens mazāk nekā desmit' },
    { en: 'ten', lv: 'desmit (10)', icon: '🔟', hint: 'Visi desmit roku pirksti' }
  ],
  daily: [
    { en: 'book', lv: 'grāmata', icon: '📖', hint: 'Priekšmets lasīšanai un stāstiem' },
    { en: 'apple', lv: 'ābols', icon: '🍎', hint: 'Saldais un sulīgais auglis' },
    { en: 'sun', lv: 'saule', icon: '☀️', hint: 'Spīd un silda debesu jumā' },
    { en: 'house', lv: 'māja', icon: '🏠', hint: 'Mūsu mājīgā mītne' },
    { en: 'friend', lv: 'draugs', icon: '🤝', hint: 'Cilvēks, ar kuru kopā priecājamies' },
    { en: 'star', lv: 'zvaigzne', icon: '⭐', hint: 'Mirdz naktī pie debesīm' },
    { en: 'water', lv: 'ūdens', icon: '💧', hint: 'Dzeramais un veldzējošais avots' },
    { en: 'tree', lv: 'koks', icon: '🌳', hint: 'Aug ar stumbru un zaļām lapām' }
  ]
};

export function makeSamantaEnglishBank(topicKey) {
  const items = VOCABULARY[topicKey] || VOCABULARY.colors;
  const questions = [];

  items.forEach((item, idx) => {
    // 1. Klausīšanās un vizuālā atpazīšana
    questions.push({
      id: topicKey + '-listen-' + idx,
      type: 'listen-choice',
      promptEn: item.en,
      promptText: 'Paklausies un izvēlies pareizo tulkojumu:',
      targetLv: item.lv,
      icon: item.icon,
      correctAnswer: item.lv,
      speechText: item.en,
      hint: item.hint,
      options: shuffle([
        item.lv,
        ...shuffle(items.filter(x => x.en !== item.en).map(x => x.lv)).slice(0, 3)
      ])
    });

    // 2. Latviski uz angliski
    questions.push({
      id: topicKey + '-translate-' + idx,
      type: 'choice',
      promptEn: item.en,
      promptText: `Kā angliski ir “${item.lv}”?`,
      targetLv: item.lv,
      icon: item.icon,
      correctAnswer: item.en,
      speechText: item.en,
      hint: item.hint,
      options: shuffle([
        item.en,
        ...shuffle(items.filter(x => x.en !== item.en).map(x => x.en)).slice(0, 3)
      ])
    });
  });

  return shuffle(questions);
}

export function renderSamantaEnglish(root, { canSubmit = false, saveProgress = async () => {} } = {}) {
  const host = document.createElement('section');
  host.className = 'module learning-hub samanta-english';
  root.append(host);

  const topics = [
    ['colors', '🎨 Krāsas', '10 košas krāsas angļu valodā'],
    ['animals', '🐾 Dzīvnieki', 'Mīļdzīvnieki un dabas draugi'],
    ['numbers', '🔢 Skaitļi 1–10', 'Skaitām no viens līdz desmit'],
    ['daily', '🎒 Skola un ikdiena', 'Grāmata, saule, draugs un ābols']
  ];

  let currentTopic = null;
  let mode = 'practice';
  let questions = [];
  let index = 0;
  let correct = 0;
  let streak = 0;
  let maxStreak = 0;
  let mistakes = [];

  function el(tag, text, cls) {
    const e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  function speakEnglish(text, triggerBtn = null) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.82;
    u.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
    if (engVoice) u.voice = engVoice;
    if (triggerBtn) {
      u.onstart = () => triggerBtn.classList.add('audio-playing');
      u.onend = () => triggerBtn.classList.remove('audio-playing');
      u.onerror = () => triggerBtn.classList.remove('audio-playing');
    }
    window.speechSynthesis.speak(u);
  }

  function viewTopics() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    host.replaceChildren();

    const head = el('div', undefined, 'learning-heading');
    head.append(
      el('span', '🌸 SAMANTAS ANGĻU VALODA', 'eyebrow'),
      el('h2', 'Angļu valodas piedzīvojums ar audio'),
      el('p', 'Klausies izrunu, skaties attēlus un apgūsti vārdus savā ritmā!')
    );
    host.append(head);

    const grid = el('div', undefined, 'topic-grid');
    for (const [key, title, desc] of topics) {
      const b = el('button', undefined, 'topic-tile');
      b.type = 'button';
      b.append(
        el('span', title.split(' ')[0], 'topic-emoji'),
        el('strong', title.slice(title.indexOf(' ') + 1)),
        el('small', desc)
      );
      b.onclick = () => chooseTopic(key);
      grid.append(b);
    }
    host.append(grid);

    if (mistakes.length) {
      const alert = el('div', '🎯 Tev ir ' + mistakes.length + ' vārdi, kurus vari patrenēt atkārtoti.', 'soft-notice');
      host.append(alert);
      const bMistakes = el('button', 'Trenēt manas kļūdas', 'action-button');
      bMistakes.type = 'button';
      bMistakes.onclick = () => start('mistakes');
      host.append(bMistakes);
    }
  }

  function chooseTopic(tKey) {
    currentTopic = tKey;
    host.replaceChildren();
    const meta = topics.find(x => x[0] === tKey);

    const head = el('div', undefined, 'learning-heading');
    head.append(
      el('span', '🌸 ' + meta[1].toUpperCase(), 'eyebrow'),
      el('h2', meta[1]),
      el('p', meta[2])
    );
    host.append(head);

    const cluster = el('div', undefined, 'button-cluster');
    const bLearn = el('button', '🌱 Mācos · 8 uzdevumi', 'action-button');
    bLearn.onclick = () => start('learn');
    const bPrac = el('button', '🎯 Trenējos · 12 uzdevumi', 'action-button');
    bPrac.onclick = () => start('practice');
    const bExam = el('button', '🏆 Pārbaudu sevi · 20 uzdevumi', 'action-button');
    bExam.onclick = () => start('exam');
    cluster.append(bLearn, bPrac, bExam);
    host.append(cluster);

    const bBack = el('button', '← Visas angļu valodas tēmas', 'quiet-button');
    bBack.onclick = viewTopics;
    host.append(bBack);
  }

  function start(m) {
    mode = m;
    const all = makeSamantaEnglishBank(currentTopic);
    if (m === 'mistakes' && mistakes.length) {
      questions = shuffle(mistakes).slice(0, 10);
    } else {
      questions = shuffle(all).slice(0, m === 'learn' ? 8 : m === 'exam' ? 20 : 12);
    }
    index = correct = streak = maxStreak = 0;
    step();
  }

  function step() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (index >= questions.length) {
      void finish();
      return;
    }

    host.replaceChildren();
    const q = questions[index];

    const head = el('div', undefined, 'learning-heading');
    head.append(
      el('span', 'UZDEVUMS ' + (index + 1) + ' NO ' + questions.length, 'eyebrow'),
      el('h2', q.promptText)
    );
    host.append(head);

    const track = el('div', undefined, 'progress-track');
    const fill = el('div', undefined, 'progress-fill');
    fill.style.width = Math.round((index / questions.length) * 100) + '%';
    track.append(fill);
    host.append(track);

    const streakBadge = el('p', '🔥 ' + streak + ' pareizas pēc kārtas · Rekords: ' + maxStreak, 'streak-label');
    host.append(streakBadge);

    const card = el('section', undefined, 'reading-task-card');

    // Visual Icon & Speech Section
    const centerDisplay = el('div', undefined, 'english-card-center');
    centerDisplay.style.textAlign = 'center';
    centerDisplay.style.margin = '16px 0 24px';

    const bigIcon = el('div', q.icon, 'english-big-icon');
    bigIcon.style.fontSize = 'clamp(3.5rem, 8vw, 5rem)';
    bigIcon.style.lineHeight = '1.2';
    centerDisplay.append(bigIcon);

    if (q.type === 'choice') {
      const lvWord = el('h3', q.targetLv, 'english-target-word');
      lvWord.style.fontSize = 'clamp(1.8rem, 4vw, 2.5rem)';
      lvWord.style.color = '#382b6b';
      lvWord.style.margin = '10px 0 6px';
      centerDisplay.append(lvWord);
    } else {
      const engPrompt = el('h3', `“${q.promptEn}”`, 'english-target-word');
      engPrompt.style.fontSize = 'clamp(2rem, 4vw, 2.8rem)';
      engPrompt.style.color = '#382b6b';
      engPrompt.style.margin = '10px 0 6px';
      centerDisplay.append(engPrompt);
    }

    const audioRow = el('div', undefined, 'reading-controls');
    const bListen = el('button', '🔊 Klausīties izrunu (“' + q.speechText + '”)', 'reading-listen');
    bListen.onclick = () => speakEnglish(q.speechText, bListen);
    const bStop = el('button', '⏹ Apturēt', 'reading-stop');
    bStop.onclick = () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      bListen.classList.remove('audio-playing');
    };
    audioRow.append(bListen, bStop);
    centerDisplay.append(audioRow);
    card.append(centerDisplay);

    // Audio plays automatically once on question render in learning mode
    if (mode === 'learn') {
      setTimeout(() => speakEnglish(q.speechText, bListen), 300);
    }

    // Answer Options (Multiple Choice with big accessible buttons)
    const optionsGrid = el('div', undefined, 'english-options-grid');
    optionsGrid.style.display = 'grid';
    optionsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(210px, 1fr))';
    optionsGrid.style.gap = '14px';
    optionsGrid.style.margin = '20px 0';

    const status = el('p', '', 'reading-feedback');
    status.setAttribute('role', 'status');

    let answered = false;

    q.options.forEach(opt => {
      const optBtn = el('button', opt, 'english-option-button');
      optBtn.type = 'button';
      optBtn.style.padding = '18px 20px';
      optBtn.style.fontSize = '1.35rem';
      optBtn.style.fontWeight = '800';
      optBtn.style.borderRadius = '18px';
      optBtn.style.border = '2px solid #e1d8f8';
      optBtn.style.background = '#ffffff';
      optBtn.style.color = '#2c2957';
      optBtn.style.cursor = 'pointer';
      optBtn.style.transition = 'all 0.15s ease';

      optBtn.onclick = () => {
        if (answered) return;
        answered = true;

        const isGood = opt.toLowerCase() === q.correctAnswer.toLowerCase();
        correct += Number(isGood);
        streak = isGood ? streak + 1 : 0;
        maxStreak = Math.max(streak, maxStreak);

        if (!isGood) {
          mistakes.push(q);
          optBtn.style.borderColor = '#e57373';
          optBtn.style.background = '#ffebee';
          optBtn.style.color = '#c62828';
        }

        // Highlight correct
        optionsGrid.querySelectorAll('button').forEach(b => {
          b.disabled = true;
          if (b.textContent.toLowerCase() === q.correctAnswer.toLowerCase()) {
            b.style.borderColor = '#48bb78';
            b.style.background = '#e6fffa';
            b.style.color = '#1b7454';
          }
        });

        status.textContent = mode === 'exam'
          ? 'Atbilde pieņemta.'
          : isGood
            ? '✅ Pareizi! Lieliski!'
            : `🔍 Pareizā atbilde ir “${q.correctAnswer}”. ${q.hint}`;

        // Also pronounce the word upon answer
        speakEnglish(q.speechText);

        const nextBtn = el('button', index + 1 === questions.length ? 'Skatīt rezultātu →' : 'Nākamais vārds →', 'action-button');
        nextBtn.style.marginTop = '15px';
        nextBtn.onclick = () => {
          index++;
          step();
        };
        card.append(nextBtn);
      };

      optionsGrid.append(optBtn);
    });

    card.append(optionsGrid, status);

    if (mode === 'learn') {
      const bHint = el('button', '💡 Pavediens', 'quiet-button');
      bHint.onclick = () => { status.textContent = q.hint; };
      card.append(bHint);
    }

    host.append(card);
  }

  async function finish() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const pct = Math.round((correct / questions.length) * 100);
    host.replaceChildren();

    const head = el('div', undefined, 'learning-heading');
    head.append(
      el('span', 'ANGĻU VALODAS REZULTĀTS', 'eyebrow'),
      el('h2', 'Pārbaude pabeigta!'),
      el('p', 'Katrs vārds tevi tuvina brīvai sarunvalodai.')
    );
    host.append(head);

    const scoreCard = el('div', pct + '%', 'result-hero');
    const summary = el('p', `Pareizi ${correct} no ${questions.length} vārdiem · Garākā pareizo sērija: ${maxStreak}`, 'result-subtitle');
    host.append(scoreCard, summary);

    const saveNotice = el('p', '', 'save-status');
    host.append(saveNotice);

    if (canSubmit) {
      try {
        const id = await saveProgress({
          studentRole: 'samanta',
          subject: 'Angļu valoda',
          activityType: `${topics.find(x => x[0] === currentTopic)?.[1] || currentTopic} · ${mode}`,
          score: pct,
          notes: JSON.stringify({ correct, total: questions.length, maxStreak })
        });
        saveNotice.textContent = id ? '✅ Rezultāts saglabāts Firebase.' : '⚠️ Saglabāšana nav apstiprināta.';
      } catch {
        saveNotice.textContent = '⚠️ Saglabāšana Firebase neizdevās.';
      }
    } else {
      saveNotice.textContent = 'Vecāka priekšskatījums — rezultāts netiek ieskaitīts.';
    }

    const actions = el('div', undefined, 'button-cluster');
    if (mistakes.length) {
      const bRepeat = el('button', '🎯 Trenēt kļūdas (' + mistakes.length + ')', 'action-button');
      bRepeat.onclick = () => start('mistakes');
      actions.append(bRepeat);
    }

    const bAgain = el('button', 'Mēģināt vēlreiz', 'action-button');
    bAgain.onclick = () => start(mode);
    const bAll = el('button', '← Visas angļu valodas tēmas', 'quiet-button');
    bAll.onclick = viewTopics;

    actions.append(bAgain, bAll);
    host.append(actions);
  }

  viewTopics();
}
