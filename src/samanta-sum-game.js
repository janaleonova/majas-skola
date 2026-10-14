// Samantas skola — Saskaitīšanas pērles (Saskaitīšanas paņēmieni un summas 100 apjomā)
// Pedagoģiski balstīts Skola2030 pamatizglītības standartā:
// 1. Sadalīšana desmitos un vienos (pa šķirām)
// 2. Pieskaitīšana pa daļām (vispirms desmitus, tad vienus)
// 3. Papildināšana līdz apaļam desmitam (draugu skaitļi)
// 4. Aprēķina summas 100 apjomā ar un bez pārejas citā desmitā
import { calculatePracticePoints, previewImprovement } from './points-policy.js';
import { attachTouchNumpad } from './touch-numpad.js';

const shuffle = a => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// Skaņas signāli ar Web Audio API saudzīgai un patīkamai atgriezeniskajai saitei
function playSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'good') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.25); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (type === 'bonus') {
      osc.type = 'triangle';
      [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + idx * 0.08);
        g.gain.setValueAtTime(0.12, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        o.start(now + idx * 0.08);
        o.stop(now + idx * 0.08 + 0.31);
      });
    }
  } catch {}
}

// Pārveido matemātikas izteiksmes dabiskā latviešu runas tekstā
export function formatMathForSpeech(raw) {
  return String(raw)
    .replace(/➔|→/g, ', tas ir, ')
    .replace(/×/g, ' reiz ')
    .replace(/÷/g, ' dalīts ar ')
    .replace(/\+/g, ' plus ')
    .replace(/-(?=\s*\d)/g, ' mīnus ')
    .replace(/=/g, ' ir ')
    .replace(/\?/g, ' cik?')
    .replace(/🌸|🌼|🌺|💎|🧩|⚡|👑|✨|🔥|🌱|🍿|🥤|🍦|⏰|📱|🎬|🥞|🎲|🎮/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

let voiceEnabled = true;

// Balss nolasīšana latviešu valodā ar dabiskām matemātikas frāzēm
export function speakText(text, { force = false } = {}) {
  if (!('speechSynthesis' in window)) return;
  if (!voiceEnabled && !force) return;
  window.speechSynthesis.cancel();
  const cleaned = formatMathForSpeech(text);
  if (!cleaned) return;
  const utter = new SpeechSynthesisUtterance(cleaned);
  utter.lang = 'lv-LV';
  utter.rate = 0.88;
  utter.pitch = 1.05;
  const voices = window.speechSynthesis.getVoices();
  const lvVoice = voices.find(v => v.lang.toLowerCase().startsWith('lv'));
  if (lvVoice) utter.voice = lvVoice;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// Uzdevumu ģenerators summu aprēķināšanai 100 apjomā
export function makeAdditionChallengeBank() {
  const bank = [];

  // 1. TIPA UZDEVUMI: Divciparu + apaļie desmiti (bez pārejas vienos)
  const roundTens = [
    [24, 30], [35, 40], [42, 30], [56, 20], [63, 30], [18, 50], [47, 40], [29, 60]
  ];
  roundTens.forEach(([a, b]) => {
    bank.push({
      id: `r-${a}-${b}`,
      a, b, answer: a + b,
      prompt: `${a} + ${b} = ?`,
      kind: 'tens',
      strategy: 'Pieskaiti desmitus pie desmitiem!',
      stepHint: `${a} + ${b}: ${Math.floor(a / 10) * 10} + ${b} = ${(Math.floor(a / 10) * 10) + b}, un pieskaiti vienus ${a % 10} ➔ ${a + b}.`
    });
  });

  // 2. TIPA UZDEVUMI: Divciparu + viencipara skaitlis ar pāreju citā desmitā
  const withTransitionSingle = [
    [37, 6], [48, 7], [56, 8], [65, 9], [28, 5], [74, 8], [39, 7], [46, 8], [58, 6], [67, 5]
  ];
  withTransitionSingle.forEach(([a, b]) => {
    const toNextTen = 10 - (a % 10);
    const rest = b - toNextTen;
    const nextTen = Math.ceil(a / 10) * 10;
    bank.push({
      id: `s-${a}-${b}`,
      a, b, answer: a + b,
      prompt: `${a} + ${b} = ?`,
      kind: 'single-bridge',
      strategy: 'Papildini līdz apaļam desmitam!',
      stepHint: `Skaitlim ${a} līdz ${nextTen} pietrūkst ${toNextTen}. ${a} + ${toNextTen} = ${nextTen}, un vēl pieskaiti ${rest} ➔ ${nextTen + rest}.`
    });
  });

  // 3. TIPA UZDEVUMI: Divciparu + divciparu bez pārejas vienos
  const noBridgeDouble = [
    [32, 25], [41, 36], [23, 54], [52, 35], [34, 43], [61, 27], [44, 32], [53, 24]
  ];
  noBridgeDouble.forEach(([a, b]) => {
    const tensSum = (Math.floor(a / 10) + Math.floor(b / 10)) * 10;
    const onesSum = (a % 10) + (b % 10);
    bank.push({
      id: `nb-${a}-${b}`,
      a, b, answer: a + b,
      prompt: `${a} + ${b} = ?`,
      kind: 'double-simple',
      strategy: 'Desmiti pie desmitiem, vieni pie vieniem!',
      stepHint: `Desmiti: ${(Math.floor(a / 10)) * 10} + ${(Math.floor(b / 10)) * 10} = ${tensSum}. Vieni: ${a % 10} + ${b % 10} = ${onesSum}. Kopā: ${tensSum} + ${onesSum} = ${tensSum + onesSum}.`
    });
  });

  // 4. TIPA UZDEVUMI: Divciparu + divciparu ar pāreju citā desmitā
  const bridgeDouble = [
    [38, 27], [46, 39], [29, 54], [57, 36], [48, 35], [35, 48], [58, 27], [49, 36], [27, 45], [36, 47]
  ];
  bridgeDouble.forEach(([a, b]) => {
    const tensSum = (Math.floor(a / 10) + Math.floor(b / 10)) * 10;
    const onesSum = (a % 10) + (b % 10);
    bank.push({
      id: `br-${a}-${b}`,
      a, b, answer: a + b,
      prompt: `${a} + ${b} = ?`,
      kind: 'double-bridge',
      strategy: 'Sadali pa šķirām vai pieskaiti pa daļām!',
      stepHint: `1. paņēmiens: ${a} + ${(Math.floor(b / 10)) * 10} = ${a + ((Math.floor(b / 10)) * 10)}, un + ${b % 10} = ${a + b}. Vai desmiti ${tensSum} + vieni ${onesSum} = ${a + b}.`
    });
  });

  // 5. TIPA UZDEVUMI: Samantas dārza stāsti ar ziediem un ogām
  const stories = [
    { a: 36, b: 28, text: 'Samanta dārza groziņā salasīja 36 zemenes un 28 avenes. Cik ogu ir pavisam kopā?' },
    { a: 45, b: 38, text: 'Saulainajā dobē uzziedēja 45 rozā tulpes un 38 dzeltenas tulpes. Cik tulpju zied kopā?' },
    { a: 54, b: 29, text: 'Samanta ar draudzeni savēra 54 zilas pērles un 29 mirdzošas baltas pērles. Cik pērļu ir rotā?' },
    { a: 37, b: 45, text: 'Puķu pļavā nolaidās 37 zili taureņi un 45 dzelteni taureņi. Cik taureņu ir pļavā?' },
    { a: 48, b: 26, text: 'Rīta saulē atvērās 48 margrietiņas un 26 zvaniņi. Cik ziedu atvērās kopā?' },
    { a: 59, b: 34, text: 'Dārza namiņā Samanta saskaitīja 59 ziedu uzlīmes un 34 taureņu uzlīmes. Cik uzlīmju pavisam?' }
  ];
  stories.forEach((st, idx) => {
    bank.push({
      id: `st-${idx}-${st.a}-${st.b}`,
      a: st.a, b: st.b,
      answer: st.a + st.b,
      prompt: st.text,
      kind: 'story',
      strategy: 'Izlasi stāstu un saskaiti abus skaitļus!',
      stepHint: `Saskaitām: ${st.a} + ${st.b}. Vispirms ${st.a} + ${Math.floor(st.b / 10) * 10} = ${st.a + (Math.floor(st.b / 10) * 10)}, un tad + ${st.b % 10} = ${st.a + st.b}!`
    });
  });

  return bank;
}

export function renderSamantaAdditionGame(container, {
  canSubmit = false,
  currentUid = '',
  alreadyEarnedBonus = false,
  saveProgress = async () => {}, initialState=null, onCheckpoint=()=>{}
} = {}) {
  let restoring=initialState;
  let timers=new Set(),generation=0;
  const later=(fn,ms)=>{const g=generation;const timer=setTimeout(()=>{timers.delete(timer);if(g===generation&&host.isConnected)fn();},ms);timers.add(timer);return timer;};
  const stopTimers=()=>{generation++;for(const timer of timers)clearTimeout(timer);timers.clear();stopSpeaking();};
  const host = document.createElement('section');
  host.className = 'module learning-hub samanta-sum-hub';
  host.style.gridColumn = '1/-1';
  container.replaceChildren(host);

  const storageKey = currentUid ? `majas-skola:${currentUid}:samanta-sum:history` : 'majas-skola:guest:samanta-sum';
  function getHistory() {
    try { const r=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(r)?r:[]; } catch { return []; }
  }
  function saveHistoryRecord(r) {
    try { localStorage.setItem(storageKey, JSON.stringify([...getHistory(), r].slice(-30))); } catch {}
  }

  const el = (tag, cls = '', text = '') => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== '') e.textContent = text;
    return e;
  };
  const button = (parent, text, action, cls = 'action-button') => {
    const b = el('button', cls, text);
    b.type = 'button';
    b.onclick = action;
    parent.append(b);
    return b;
  };

  function header(title, subtitle) {
    stopTimers();
    host.replaceChildren();
    const head = el('div', 'learning-heading');
    head.append(
      el('span', 'eyebrow', '🌸 SAMANTAS BONUSA SPĒLE · JAUNĀ VIELA'),
      el('h2', '', title),
      el('p', '', subtitle)
    );
    host.append(head);
  }

  // SĀKUMA IZVĒLE
  function home() {
    stopTimers();
    header('Saskaitīšanas pērles 🌸', 'Iemācies saskaitīt 100 apjomā ātri, viegli un ar prieku!');

    // Bonusa uzsaukums
    const bonusBanner = el('div', 'soft-notice');
    bonusBanner.style.cssText = 'background:linear-gradient(135deg,#fdf2f8,#faf5ff);border:2px solid #ec4899;border-radius:20px;padding:18px;margin:14px 0;text-align:left';
    bonusBanner.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <span style="font-size:2rem">👑</span>
        <div>
          <h3 style="margin:0;color:#9d174d;font-size:1.25rem">Jaunā viela: Saskaitīšanas paņēmieni 100 apjomā</h3>
          <p style="margin:2px 0;font-size:0.95rem;color:#701a75">Pirmais sasniegums ar vismaz 80% pareizi dod <strong>+15 BP bonusu</strong> tavā kino makā!</p>
        </div>
      </div>
      <div style="font-size:0.88rem;color:#831843">
        ${alreadyEarnedBonus ? '✨ Bonuss jau ir nopelnīts! Vari brīvi trenēties un krāt papildu treniņu punktus.' : '🎯 Pārbaudi sevi 12 uzdevumu izaicinājumā un nopelni +15 BP!'}
      </div>
    `;
    host.append(bonusBanner);

    const grid = el('div', 'topic-grid');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:16px;margin:16px 0';
    host.append(grid);

    const modes = [
      { id: 'workshop', icon: '🌟', title: '1. Atklāj 3 paņēmienus', desc: 'Soli pa solim ar krāsainām pērlēm un piemēriem' },
      { id: 'builder', icon: '🧩', title: '2. Pērļu konstruktors', desc: 'Saliec saskaitīšanu pa soļiem un pārbaudi sevi' },
      { id: 'challenge', icon: '🌸', title: '3. Pērļu dārza pārbaudījums', desc: '12 uzdevumi 100 apjomā · +15 BP bonuss' },
      { id: 'catcher', icon: '⚡', title: '4. Mini-spēle: Pērļu ķērājs', desc: 'Atrodi divus ziedus, kas kopā dod summu!' }
    ];

    modes.forEach(m => {
      const card = el('button', 'topic-tile');
      card.type = 'button';
      card.style.cssText = 'padding:18px;text-align:left;display:flex;flex-direction:column;gap:6px;border-radius:18px;border:2px solid #f9a8d4;background:#ffffff;box-shadow:0 6px 18px rgba(236,72,153,0.08);cursor:pointer';
      card.innerHTML = `
        <span style="font-size:2rem">${m.icon}</span>
        <strong style="font-size:1.15rem;color:#831843">${m.title}</strong>
        <small style="color:#64748b;font-size:0.9rem">${m.desc}</small>
      `;
      card.onclick = () => {
        if (m.id === 'workshop') startWorkshop();
        else if (m.id === 'builder') startBuilder();
        else if (m.id === 'challenge') startChallenge();
        else if (m.id === 'catcher') startCatcher();
      };
      grid.append(card);
    });

    const recent = getHistory();
    if (recent.length) {
      const best = Math.max(...recent.map(r => r.score || 0));
      const stats = el('div', 'stat-strip');
      stats.append(
        el('span', '', `🏅 Labākais rezultāts: ${best}%`),
        el('span', '', `🌸 Treniņi: ${recent.length}`),
        el('span', '', `💎 Bonusa statuss: ${alreadyEarnedBonus ? 'Iegūts (+15 BP)' : 'Gaidāms pie 80%'}`)
      );
      host.append(stats);
    }
  }

  // 1. REŽĪMS: PAŅĒMIENU DARBNĪCA (Interaktīvi skaidrojumi)
  function startWorkshop() {
    header('Atklāj 3 saskaitīšanas paņēmienus', 'Izvēlies paņēmienu un apskati, cik viegli skaitļi sadalās draudzīgās daļās!');

    const tabRow = el('div', 'button-cluster');
    tabRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px';
    host.append(tabRow);

    const displayArea = el('div', 'workshop-stage');
    displayArea.style.cssText = 'background:#ffffff;border:2px solid #f472b6;border-radius:22px;padding:22px;box-shadow:0 8px 24px rgba(244,114,182,0.12);margin-bottom:16px';
    host.append(displayArea);

    const methods = [
      {
        id: 'split',
        label: '1. Sadali desmitos un vienos',
        title: 'Desmiti pie desmitiem, vieni pie vieniem 🌸',
        exampleA: 34,
        exampleB: 25,
        steps: [
          { text: 'Piemērs: 34 + 25 = ?', sub: 'Sadalām abus skaitļus desmitos un vienos: 34 = 30 + 4, un 25 = 20 + 5' },
          { text: '1. solis: Saskaitām desmitus', sub: '30 + 20 = 50' },
          { text: '2. solis: Saskaitām vienus', sub: '4 + 5 = 9' },
          { text: '3. solis: Saskaitām rezultātus kopā!', sub: '50 + 9 = 59! Gatavs!' }
        ],
        visual: '34 + 25 = (30 + 20) + (4 + 5) = 50 + 9 = 59'
      },
      {
        id: 'parts',
        label: '2. Pieskaiti pa daļām',
        title: 'Vispirms desmitus, tad vienus 🌼',
        exampleA: 46,
        exampleB: 28,
        steps: [
          { text: 'Piemērs: 46 + 28 = ?', sub: 'Otro skaitli 28 sadalām: 20 un 8' },
          { text: '1. solis: Pieskaitām desmitus', sub: '46 + 20 = 66' },
          { text: '2. solis: Pieskaitām vienus', sub: '66 + 8: sadalām 8 kā 4 + 4 ➔ 66 + 4 = 70, un 70 + 4 = 74!' },
          { text: 'Gala rezultāts', sub: '46 + 28 = 74!' }
        ],
        visual: '46 + 28 = 46 + 20 + 8 = 66 + 8 = 74'
      },
      {
        id: 'friend',
        label: '3. Papildini līdz apaļam 10',
        title: 'Draugu skaitlis līdz apaļam desmitam 💎',
        exampleA: 48,
        exampleB: 35,
        steps: [
          { text: 'Piemērs: 48 + 35 = ?', sub: 'Skaitlim 48 pietrūkst tikai 2, lai kļūtu par apaļu 50!' },
          { text: '1. solis: Aizņemamies 2 no 35', sub: 'No 35 atņemam 2, paliek 33.' },
          { text: '2. solis: Izveidojam apaļu desmitu', sub: '48 + 2 = 50!' },
          { text: '3. solis: Pieskaitām atlikumu', sub: '50 + 33 = 83! Neticami ātri un viegli!' }
        ],
        visual: '48 + 35 = (48 + 2) + 33 = 50 + 33 = 83'
      }
    ];

    let currentMethodIndex=restoring?.kind==='workshop'?restoring.method:0;
    let stepIndex=restoring?.kind==='workshop'?restoring.step:0;restoring=null;

    function renderMethodView() {
      onCheckpoint({kind:'workshop',method:currentMethodIndex,step:stepIndex});
      displayArea.replaceChildren();
      const m = methods[currentMethodIndex];

      // Balss lasītāja josla apmācības posmam
      const voiceBar = el('div', 'voice-learning-bar');
      voiceBar.style.cssText = 'background:linear-gradient(135deg,#fdf2f8,#fce7f3);border:2px solid #f472b6;border-radius:16px;padding:10px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px';

      const voiceToggle = el('button', 'quiet-button', voiceEnabled ? '🔊 Balss lasītājs: IESLĒGTS' : '🔇 Balss lasītājs: IZSLĒGTS');
      voiceToggle.style.cssText = voiceEnabled ? 'background:#ec4899;color:white;font-weight:800;border-radius:12px;border:0;padding:8px 14px' : 'background:#e2e8f0;color:#64748b;font-weight:800;border-radius:12px;border:0;padding:8px 14px';
      voiceToggle.onclick = () => {
        voiceEnabled = !voiceEnabled;
        if (!voiceEnabled) stopSpeaking();
        else speakText(m.steps[stepIndex].text + '. ' + m.steps[stepIndex].sub, { force: true });
        renderMethodView();
      };

      const voiceBtns = el('div', 'button-cluster');
      voiceBtns.style.cssText = 'display:flex;gap:6px;align-items:center;margin:0';
      button(voiceBtns, '🔊 Nolasīt soli', () => {
        speakText(m.steps[stepIndex].text + '. ' + m.steps[stepIndex].sub, { force: true });
      }, 'quiet-button');
      button(voiceBtns, '▶️ Nolasīt visu paņēmienu', () => {
        const fullText = m.title + '. ' + m.steps.map(s => s.text + '. ' + s.sub).join(' ');
        speakText(fullText, { force: true });
      }, 'quiet-button');
      button(voiceBtns, '⏹ Apturēt', stopSpeaking, 'quiet-button');

      voiceBar.append(voiceToggle, voiceBtns);
      displayArea.append(voiceBar);

      const titleEl = el('h3', '', m.title);
      titleEl.style.cssText = 'color:#831843;margin-top:0;font-size:1.35rem';

      const visualBanner = el('div', 'math-expression');
      visualBanner.style.cssText = 'text-align:center;font-size:clamp(1.6rem,4vw,2.4rem);background:#fdf2f8;border-radius:16px;padding:14px;color:#9d174d;font-weight:900;margin:12px 0';
      visualBanner.textContent = m.visual;

      const stepsList = el('div', 'steps-list');
      stepsList.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin:16px 0';

      m.steps.forEach((st, i) => {
        const item = el('div', 'step-card');
        const active = i <= stepIndex;
        item.style.cssText = `padding:14px 18px;border-radius:14px;border:2px solid ${active ? '#ec4899' : '#e2e8f0'};background:${active ? '#fff0f7' : '#f8fafc'};opacity:${active ? '1' : '0.45'};transition:all 0.2s ease;cursor:pointer`;
        item.title = 'Uzklikšķini, lai noklausītos šo soli skaļi';
        item.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between">
            <strong style="color:${active ? '#9d174d' : '#64748b'};font-size:1.1rem">${st.text}</strong>
            <span style="font-size:1.1rem;opacity:0.8" title="Noklausīties">🔊</span>
          </div>
          <span style="color:#475569;font-size:0.95rem;margin-top:4px;display:block">${st.sub}</span>
        `;
        item.onclick = () => {
          speakText(st.text + '. ' + st.sub, { force: true });
        };
        stepsList.append(item);
      });

      const controls = el('div', 'button-cluster');
      if (stepIndex < m.steps.length - 1) {
        button(controls, '👣 Nākamais solis →', () => {
          stepIndex++;
          playSound('good');
          renderMethodView();
        });
      } else {
        if(canSubmit)button(controls,'Saglabāt apgūto paņēmienu',async()=>{try{await saveProgress({studentRole:'samanta',subject:'Matemātika',activityType:'Saskaitīšanas pērles · '+m.id+' · learn',score:100,notes:JSON.stringify({mode:'learn',correct:4,total:4})});controls.append(el('p','','Paņēmiens saglabāts.'));}catch(e){controls.append(el('p','',e.message));}});
        button(controls, '✨ Viss skaidrs! Sākt no jauna 🔄', () => {
          stepIndex = 0;
          renderMethodView();
        });
      }

      displayArea.append(titleEl, visualBanner, stepsList, controls);

      // Apmācības posmā automātiski ierunā soli, ja balss ir ieslēgta
      if (voiceEnabled) {
        speakText(m.steps[stepIndex].text + '. ' + m.steps[stepIndex].sub);
      }
    }

    methods.forEach((m, idx) => {
      const b = el('button', 'action-button', m.label);
      b.style.cssText = idx === currentMethodIndex ? 'background:#ec4899;color:white' : 'background:#fce7f3;color:#831843';
      b.onclick = () => {
        currentMethodIndex = idx;
        stepIndex = 0;
        tabRow.querySelectorAll('button').forEach((btnEl, bi) => {
          btnEl.style.cssText = bi === currentMethodIndex ? 'background:#ec4899;color:white' : 'background:#fce7f3;color:#831843';
        });
        renderMethodView();
      };
      tabRow.append(b);
    });

    renderMethodView();

    const bottom = el('div', 'button-cluster');
    bottom.style.marginTop = '20px';
    button(bottom, '🧩 Doties uz pērļu konstruktoru →', startBuilder);
    button(bottom, '← Atpakaļ uz sākumu', home, 'quiet-button');
    host.append(bottom);
  }

  // 2. REŽĪMS: PĒRĻU KONSTRUKTORS (Interaktīvs soļu treniņš)
  function startBuilder() {
    header('Pērļu konstruktors 🧩', 'Aizpildi soļus un saskaiti pareizi! Katrs solis tevi tuvina atbildei.');

    const problems = [
      {
        a: 36, b: 25,
        tensA: 30, tensB: 20, tensSum: 50,
        onesA: 6, onesB: 5, onesSum: 11,
        total: 61,
        title: '36 + 25 = ? (Sadalām pa šķirām)'
      },
      {
        a: 47, b: 28,
        tensA: 40, tensB: 20, tensSum: 60,
        onesA: 7, onesB: 8, onesSum: 15,
        total: 75,
        title: '47 + 28 = ? (Sadalām pa šķirām)'
      },
      {
        a: 53, b: 34,
        tensA: 50, tensB: 30, tensSum: 80,
        onesA: 3, onesB: 4, onesSum: 7,
        total: 87,
        title: '53 + 34 = ? (Sadalām pa šķirām)'
      },
      {
        a: 48, b: 36,
        tensA: 40, tensB: 30, tensSum: 70,
        onesA: 8, onesB: 6, onesSum: 14,
        total: 84,
        title: '48 + 36 = ? (Sadalām pa šķirām)'
      }
    ];

    let problemIndex=restoring?.kind==='builder'?restoring.problemIndex:0;restoring=null;

    function renderProblem() {
      onCheckpoint({kind:'builder',problemIndex});
      host.replaceChildren();
      const p = problems[problemIndex];

      const head = el('div', 'learning-heading');
      head.append(
        el('span', 'eyebrow', `🧩 UZDEVUMS ${problemIndex + 1} NO ${problems.length}`),
        el('h2', '', p.title),
        el('p', '', 'Aizpildi trīs soļus: desmiti, vieni, un tad saskaiti summu!')
      );
      host.append(head);

      const card = el('div', 'question-stage');
      card.style.cssText = 'background:#ffffff;border:2px solid #f472b6;border-radius:24px;padding:24px;max-width:580px;margin:0 auto;box-shadow:0 10px 30px rgba(244,114,182,0.1)';

      // Balss palīgs konstruktora apmācībai
      const voiceBar = el('div', 'voice-learning-bar');
      voiceBar.style.cssText = 'background:#fdf2f8;border:2px solid #f9a8d4;border-radius:14px;padding:8px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px';
      const speechInstruction = `Uzdevums: ${p.title}. 1. solis: saskaiti desmitus: ${p.tensA} plus ${p.tensB}. 2. solis: saskaiti vienus: ${p.onesA} plus ${p.onesB}. 3. solis: saskaiti rezultātus!`;
      button(voiceBar, '🔊 Nolasīt uzdevumu balsī', () => speakText(speechInstruction, { force: true }), 'quiet-button');
      button(voiceBar, '⏹ Apturēt', stopSpeaking, 'quiet-button');
      card.append(voiceBar);

      if (voiceEnabled) {
        speakText(speechInstruction);
      }

      const stepsBox = el('div', 'builder-steps');
      stepsBox.style.cssText = 'display:flex;flex-direction:column;gap:18px;margin:16px 0';

      // 1. SOLIS: Desmiti
      const step1 = el('div', 'builder-step');
      step1.innerHTML = `<label style="display:block;font-weight:800;color:#831843;margin-bottom:6px">1. Saskaiti desmitus: ${p.tensA} + ${p.tensB} = ?</label>`;
      const inp1 = el('input', 'big-number-input');
      inp1.type = 'number';
      inp1.placeholder = '?';
      inp1.style.cssText = 'font-size:1.4rem;padding:8px 12px;border:2px solid #cbd5e1;border-radius:12px;width:120px;text-align:center';
      step1.append(inp1);

      // 2. SOLIS: Vieni
      const step2 = el('div', 'builder-step');
      step2.innerHTML = `<label style="display:block;font-weight:800;color:#831843;margin-bottom:6px">2. Saskaiti vienus: ${p.onesA} + ${p.onesB} = ?</label>`;
      const inp2 = el('input', 'big-number-input');
      inp2.type = 'number';
      inp2.placeholder = '?';
      inp2.style.cssText = 'font-size:1.4rem;padding:8px 12px;border:2px solid #cbd5e1;border-radius:12px;width:120px;text-align:center';
      step2.append(inp2);

      // 3. SOLIS: Gala rezultāts
      const step3 = el('div', 'builder-step');
      step3.innerHTML = `<label style="display:block;font-weight:800;color:#831843;margin-bottom:6px">3. Gala rezultāts: Cik ir ${p.a} + ${p.b} kopā?</label>`;
      const inp3 = el('input', 'big-number-input');
      inp3.type = 'number';
      inp3.placeholder = '?';
      inp3.style.cssText = 'font-size:1.4rem;padding:8px 12px;border:2px solid #cbd5e1;border-radius:12px;width:120px;text-align:center';
      step3.append(inp3);

      stepsBox.append(step1, step2, step3);
      card.append(stepsBox);

      const feedback = el('p', 'answer-feedback');
      card.append(feedback);

      const checkBtn = button(card, '✨ Pārbaudīt manu risinājumu', () => {
        const v1 = Number(inp1.value);
        const v2 = Number(inp2.value);
        const v3 = Number(inp3.value);

        if (!inp1.value || !inp2.value || !inp3.value) {
          feedback.textContent = 'Lūdzu ieraksti atbildes visos 3 lodziņos!';
          feedback.className = 'answer-feedback answer-feedback-error';
          speakText('Lūdzu ieraksti atbildes visos 3 lodziņos!', { force: true });
          return;
        }

        const ok1 = v1 === p.tensSum;
        const ok2 = v2 === p.onesSum;
        const ok3 = v3 === p.total;

        if (ok1 && ok2 && ok3) {
          playSound('good');
          feedback.textContent = `🎉 Izcili, Samanta! ${p.tensA}+${p.tensB}=${p.tensSum}, ${p.onesA}+${p.onesB}=${p.onesSum}, un kopā ${p.total}!`;
          feedback.className = 'answer-feedback answer-feedback-good';
          speakText(`Izcili, Samanta! ${p.tensA} plus ${p.tensB} ir ${p.tensSum}, ${p.onesA} plus ${p.onesB} ir ${p.onesSum}, un kopā ${p.total}!`, { force: true });
          inp1.disabled = inp2.disabled = inp3.disabled = true;
          checkBtn.disabled = true;

          const nextCluster = el('div', 'button-cluster');
          nextCluster.style.marginTop = '16px';
          if (problemIndex < problems.length - 1) {
            button(nextCluster, 'Nākamais uzdevums ➔', () => {
              problemIndex++;
              renderProblem();
            });
          } else {
            if(canSubmit)button(nextCluster,'Saglabāt pabeigto konstruktoru',async()=>{try{await saveProgress({studentRole:'samanta',subject:'Matemātika',activityType:'Saskaitīšanas pērles · konstruktors · learn',score:100,notes:JSON.stringify({mode:'learn',correct:4,total:4})});nextCluster.append(el('p','','Konstruktors saglabāts.'));}catch(e){nextCluster.append(el('p','',e.message));}});
            button(nextCluster, '🌸 Sākt lielo 12 uzdevumu izaicinājumu (+15 BP) ➔', startChallenge);
            button(nextCluster, 'Uz sākumu', home, 'quiet-button');
          }
          card.append(nextCluster);
        } else {
          let errText = 'Pārbaudi: ';
          if (!ok1) errText += `desmitu summu (${p.tensA} + ${p.tensB}); `;
          if (!ok2) errText += `vienu summu (${p.onesA} + ${p.onesB}); `;
          if (!ok3) errText += `gala summu (${p.tensSum} + ${p.onesSum}).`;
          feedback.textContent = `💡 ${errText} Vari labot!`;
          feedback.className = 'answer-feedback answer-feedback-error';
          speakText(feedback.textContent, { force: true });
        }
      });

      host.append(card);

      const backRow = el('div', 'button-cluster');
      backRow.style.marginTop = '16px';
      button(backRow, '← Atpakaļ uz sākumu', home, 'quiet-button');
      host.append(backRow);
    }

    renderProblem();
  }

  // 3. REŽĪMS: LIELAIS PĒRĻU DĀRZA PĀRBAUDĪJUMS (12 uzdevumi · +15 BP bonuss)
  function startChallenge() {
    const restored=restoring?.kind==='challenge'?restoring:null;restoring=null;
    const all = makeAdditionChallengeBank();
    const items = restored?.items||shuffle(all).slice(0, 12);

    let index=restored?.index||0,correct=restored?.correct||0,streak=restored?.streak||0,maxStreak=restored?.maxStreak||0;
    const misses=restored?.misses||[];
    let answerTimer = null;

    function renderQuestion() {
      onCheckpoint({kind:'challenge',items,index,correct,streak,maxStreak,misses});
      if (answerTimer) { clearTimeout(answerTimer); answerTimer = null; }
      if (index >= items.length) {
        void finishChallenge();
        return;
      }

      const q = items[index];
      header('Pērļu dārza izaicinājums 🌸', `Uzdevums ${index + 1} no ${items.length} · Katra pareizā atbilde liek uzplaukt ziedam!`);

      // Ziedu progresa josla
      const gardenBar = el('div', 'flower-progress-bar');
      gardenBar.style.cssText = 'display:flex;justify-content:center;gap:6px;margin:12px 0;flex-wrap:wrap';
      for (let i = 0; i < items.length; i++) {
        const flower = el('span', 'flower-slot');
        flower.style.cssText = 'font-size:1.6rem;transition:transform 0.2s';
        if (i < index) {
          flower.textContent = misses.some(m => m.id === items[i].id) ? '🌱' : '🌸';
        } else if (i === index) {
          flower.textContent = '✨';
          flower.style.transform = 'scale(1.25)';
        } else {
          flower.textContent = '⚪';
          flower.style.opacity = '0.4';
        }
        gardenBar.append(flower);
      }
      host.append(gardenBar);

      // Sērijas indikators
      const streakBadge = el('div', 'streak-label');
      streakBadge.textContent = `🔥 Sērija: ${streak} pareizas atbildes · Rekords: ${maxStreak}`;
      host.append(streakBadge);

      // Uzdevuma kartīte
      const card = el('div', 'question-stage');
      card.style.cssText = 'background:#ffffff;border:2px solid #f472b6;border-radius:24px;padding:22px;max-width:540px;margin:0 auto;box-shadow:0 12px 32px rgba(244,114,182,0.12)';

      const strategyTag = el('span', 'eyebrow', q.strategy);
      card.append(strategyTag);

      const expr = el('div', q.kind === 'story' ? 'story-expression' : 'math-expression', q.prompt);
      expr.style.cssText = q.kind === 'story' ? 'font-size:1.2rem;line-height:1.5;margin:16px 0;color:#1e293b;font-weight:700' : 'font-size:2.4rem;font-weight:900;color:#9d174d;margin:16px 0;text-align:center';
      card.append(expr);

      const audioRow = el('div', 'reading-controls');
      button(audioRow, '🔊 Nolasīt uzdevumu', () => speakText(q.prompt + '. ' + q.strategy, { force: true }), 'quiet-button');
      button(audioRow, '⏹ Apturēt', stopSpeaking, 'quiet-button');
      card.append(audioRow);

      if (voiceEnabled && q.kind === 'story') {
        speakText(q.prompt);
      }

      const form = el('form', 'math-answer-form');
      const inp = el('input', 'big-number-input');
      inp.type = 'number';
      inp.inputMode = 'none'; // Izmantojam touch-numpad
      inp.required = true;
      inp.placeholder = '?';
      inp.autocomplete = 'off';
      inp.style.cssText = 'font-size:2rem;text-align:center;width:140px;margin:0 auto 12px;border:3px solid #f472b6;border-radius:16px;padding:8px';
      form.append(inp);

      const submitBtn = button(form, 'Pārbaudīt atbildi', () => {}, 'action-button');
      submitBtn.type = 'submit';

      const feedback = el('p', 'feedback-line');
      feedback.setAttribute('role', 'status');
      card.append(form, feedback);

      // Pievienojam mobilajiem draudzīgo skārienjutīgo ciparnīcu
      const numpad = attachTouchNumpad(card, inp);
      host.append(card);

      let answered = false;
      let advanced = false;

      form.onsubmit = e => {
        e.preventDefault();
        if (answered || !card.isConnected) return;
        const val = Number(inp.value);
        if (!Number.isInteger(val) || inp.value === '') return;
        answered = true;

        const isGood = val === q.answer;
        if (isGood) {
          correct++;
          streak++;
          maxStreak = Math.max(maxStreak, streak);
          playSound('good');
          feedback.textContent = streak >= 3 ? `🔥 Fantastiski, Samanta! Sērija: ${streak}` : '🎉 Pareizi! Zieds ir uzziedējis!';
          feedback.className = 'feedback-line answer-feedback answer-feedback-good';
        } else {
          streak = 0;
          misses.push(q);
          feedback.textContent = `💡 Pareizā atbilde ir ${q.answer}. ${q.stepHint}`;
          feedback.className = 'feedback-line answer-feedback answer-feedback-error';
        }

        inp.disabled = true;
        submitBtn.disabled = true;
        numpad.querySelectorAll('button').forEach(b => { b.disabled = true; });

        const advance = () => {
          if (advanced || !card.isConnected) return;
          advanced = true;
          if (answerTimer) clearTimeout(answerTimer);
          index++;
          renderQuestion();
        };

        const continueBtn = button(card, index + 1 === items.length ? 'Skatīt rezultātu ➔' : 'Nākamais uzdevums ➔', advance);
        continueBtn.style.marginTop = '12px';
        // Continue when the pupil has read the explanation.
      };
    }

    async function finishChallenge() {
      const pct = Math.round((correct / items.length) * 100);
      const isBonusWon = pct >= 80 && !alreadyEarnedBonus;

      header('Tavs ziedu dārza rezultāts 🌸', pct >= 80 ? '🎉 Izcili, Samanta! Ziedu pļava pilnībā saziedējusi!' : '👍 Lielisks treniņš! Katrs solis tevi stiprina.');

      const hero = el('div', 'result-hero', `${pct}%`);
      const sub = el('p', 'result-subtitle', `Pareizi: ${correct} no ${items.length} uzdevumiem (${pct}%) · Garākā pareizo atbilžu sērija: ${maxStreak}`);
      host.append(hero, sub);

      if (isBonusWon) playSound('bonus');

      /* Bonusa un punktu paziņojums
      const policy = calculatePracticePoints({ correct, total: items.length, maxStreak, mode: 'practice' });
      const ptsBox = el('div', 'soft-notice');
      ptsBox.style.cssText = 'background:linear-gradient(135deg,#fdf2f8,#faf5ff);border:3px solid #ec4899;border-radius:22px;padding:20px;margin:16px 0;text-align:center';

      ptsBox.innerHTML = `
        <div style="font-size:1.8rem;font-weight:900;color:#9d174d;margin-bottom:6px">
          ${isBonusWon ? '👑 +15 BP VIENREIZĒJAIS BONUSS NOPELNĪTS!' : `🌟 +${policy.potential} BP meistarības punkti!`}
        </div>
        <p style="font-size:1rem;color:#475569;margin:4px 0">
          ${isBonusWon ? 'Apsveicam! Tu sasniedzi vismaz 80% meistarību jaunajā saskaitīšanas tēmā!' : 'Sasniedz vismaz 80%, lai atslēgtu lielo +15 BP bonusu!'}
        </p>
        <div style="font-size:0.9rem;color:#701a75;margin-top:6px">
          Sērijas bonuss: +${policy.streakBonus} BP · Lielisks ieguldījums ceļā uz kino vakaru un gardumiem! 🍿
        </div>
      `;
      host.append(ptsBox); */

      // Kļūdu apskats, ja tādas bija
      if (misses.length) {
        const errorReview = el('div', 'soft-notice');
        errorReview.style.cssText = 'background:#fff8fc;border:2px solid #fbcfe8;border-radius:18px;padding:16px;margin:14px 0';
        errorReview.append(el('h3', '', '💡 Nostiprini šos piemērus:'));
        misses.forEach(m => {
          const row = el('p', '', `${m.prompt}  ➔  pareizā atbilde: ${m.answer} (${m.stepHint})`);
          row.style.margin = '6px 0';
          errorReview.append(row);
        });
        host.append(errorReview);
      }

      // Saglabāšana Firebase Firestore
      const status = el('p', 'save-status');
      status.style.fontWeight = '700';
      host.append(status);

      const record = {
        date: new Date().toISOString(),
        score: pct,
        correct,
        total: items.length,
        maxStreak,
        bonusWon:isBonusWon,mode:'exam'
      };
      saveHistoryRecord(record);

      if (canSubmit) {
        status.textContent = '⏳ Saglabāju rezultātu un punktus Firebase...';
        try {
          const savedId = await saveProgress({
            studentRole: 'samanta',
            subject: 'Matemātika',
            activityType: 'Saskaitīšanas pērles · Summas 100 apjomā',
            score: pct,
            notes: JSON.stringify(record)
          });
          if (savedId) {
            status.textContent = '✅ Rezultāts saglabāts.';
            status.style.color = '#15803d';
          } else {
            status.textContent = '⚠️ Rezultāts saglabāts vietējā ierīces atmiņā.';
          }
        } catch (err) {
          status.textContent = '⚠️ Firestore saglabāšanas kļūda, taču rezultāts saglabāts telefonā.';
        }
      } else {
        status.textContent = '👁️ Priekšskatījuma režīms — rezultāts netiek ieskaitīts reālajā reitingā.';
      }

      const actions = el('div', 'button-cluster');
      actions.style.marginTop = '18px';
      button(actions, '🌸 Trenēties vēlreiz', startChallenge);
      button(actions, '⚡ Pamēģināt Pērļu ķērāju mini-spēli', startCatcher);
      button(actions, '← Atpakaļ uz sākumu', home, 'quiet-button');
      host.append(actions);
    }

    renderQuestion();
  }

  // 4. REŽĪMS: PĒRĻU ĶĒRĀJS (Catch the Sum / Ātrā bonusa mini-spēle)
  function startCatcher() {
    stopTimers();
    header('Mini-spēle: Pērļu ķērājs ⚡', 'Atrodi divus ziedus, kas kopā veido prasīto mērķa summu!');

    const rounds = [
      { target: 50, pairs: [[32, 18], [25, 25], [41, 9]], distractors: [14, 27, 33] },
      { target: 60, pairs: [[45, 15], [38, 22], [51, 9]], distractors: [17, 26, 35] },
      { target: 75, pairs: [[48, 27], [55, 20], [36, 39]], distractors: [18, 29, 44] },
      { target: 80, pairs: [[56, 24], [43, 37], [62, 18]], distractors: [21, 33, 49] },
      { target: 100, pairs: [[65, 35], [48, 52], [73, 27]], distractors: [38, 45, 62] }
    ];

    let roundIndex=restoring?.kind==='catcher'?restoring.roundIndex:0;
    let score=restoring?.kind==='catcher'?restoring.score:0;restoring=null;

    function renderRound() {
      onCheckpoint({kind:'catcher',roundIndex,score});
      host.replaceChildren();
      if (roundIndex >= rounds.length) {
        header('Spēle pabeigta! 🎉', `Tu veiksmīgi noķēri pērļu pārus! Punkti: ${score} no ${rounds.length}`);
        playSound('bonus');
        if(canSubmit)void saveProgress({studentRole:'samanta',subject:'Matemātika',activityType:'Saskaitīšanas pērles · catcher · learn',score:Math.round(score/rounds.length*100),notes:JSON.stringify({mode:'learn',correct:score,total:rounds.length})}).catch(()=>{});
        const doneBox = el('div', 'soft-notice');
        doneBox.style.cssText = 'background:linear-gradient(135deg,#fdf2f8,#faf5ff);border:2px solid #ec4899;border-radius:20px;padding:24px;text-align:center;margin:16px 0';
        doneBox.innerHTML = `
          <h3 style="color:#9d174d;font-size:1.4rem;margin:0 0 8px">Lieliska skaitļu intuīcija! 🌸</h3>
          <p style="color:#475569">Tu meistarīgi atrodi draugu skaitļus, kas kopā veido apaļas summas.</p>
        `;
        host.append(doneBox);

        const cluster = el('div', 'button-cluster');
        button(cluster, 'Spēlēt vēlreiz 🔄', startCatcher);
        button(cluster, '🌸 Lielais 12 uzdevumu izaicinājums (+15 BP)', startChallenge);
        button(cluster, 'Uz sākumu', home, 'quiet-button');
        host.append(cluster);
        return;
      }

      const r = rounds[roundIndex];
      const correctPair = r.pairs[Math.floor(Math.random() * r.pairs.length)];
      const otherPair = r.pairs.find(p => p !== correctPair) || [10, r.target - 10];
      const numbers = shuffle([correctPair[0], correctPair[1], otherPair[0], r.distractors[0], r.distractors[1], r.distractors[2]]);

      const head = el('div', 'learning-heading');
      head.append(
        el('span', 'eyebrow', `⚡ RAUNDS ${roundIndex + 1} NO ${rounds.length}`),
        el('h2', '', `Mērķa summa: ${r.target}`),
        el('p', '', `Uzklikšķini uz DIVĀM pērlēm, kuru summa ir ${r.target}!`)
      );
      host.append(head);

      const targetBanner = el('div', 'math-expression');
      targetBanner.style.cssText = 'text-align:center;font-size:2.4rem;font-weight:900;color:#ec4899;background:#fdf2f8;border-radius:20px;padding:12px;margin:12px auto;max-width:320px';
      targetBanner.textContent = `🎯 Summa: ${r.target}`;
      host.append(targetBanner);

      const grid = el('div', 'pearls-grid');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:440px;margin:16px auto';
      host.append(grid);

      let selected = [];
      const buttons = [];
      const feedback = el('p', 'answer-feedback');
      feedback.style.textAlign = 'center';
      host.append(feedback);

      numbers.forEach((val, idx) => {
        const btn = el('button', 'pearl-button', String(val));
        btn.type = 'button';
        btn.style.cssText = 'aspect-ratio:1;border-radius:50%;font-size:1.6rem;font-weight:900;background:linear-gradient(135deg,#ffffff,#fce7f3);border:3px solid #f472b6;color:#831843;box-shadow:0 8px 16px rgba(244,114,182,0.15);cursor:pointer;transition:transform 0.15s, border-color 0.15s';
        buttons.push({ btn, val });

        btn.onclick = () => {
          if (selected.includes(idx)) {
            selected = selected.filter(x => x !== idx);
            btn.style.borderColor = '#f472b6';
            btn.style.background = 'linear-gradient(135deg,#ffffff,#fce7f3)';
            btn.style.transform = 'scale(1)';
            return;
          }

          selected.push(idx);
          btn.style.borderColor = '#9d174d';
          btn.style.background = '#fbcfe8';
          btn.style.transform = 'scale(1.1)';

          if (selected.length === 2) {
            const v1 = numbers[selected[0]];
            const v2 = numbers[selected[1]];
            const sum = v1 + v2;

            if (sum === r.target) {
              playSound('good');
              score++;
              feedback.textContent = `🎉 Pareizi! ${v1} + ${v2} = ${r.target}! Pērle noķerta!`;
              feedback.className = 'answer-feedback answer-feedback-good';
              buttons.forEach(b => { b.btn.disabled = true; });
              later(() => {
                roundIndex++;
                renderRound();
              }, 1200);
            } else {
              feedback.textContent = `💡 ${v1} + ${v2} = ${sum}. Mēģini citu pāri!`;
              feedback.className = 'answer-feedback answer-feedback-error';
              later(() => {
                buttons.forEach(b => {
                  b.btn.style.borderColor = '#f472b6';
                  b.btn.style.background = 'linear-gradient(135deg,#ffffff,#fce7f3)';
                  b.btn.style.transform = 'scale(1)';
                });
                selected = [];
              }, 900);
            }
          }
        };
        grid.append(btn);
      });

      const navRow = el('div', 'button-cluster');
      navRow.style.marginTop = '18px';
      button(navRow, '← Atpakaļ uz sākumu', home, 'quiet-button');
      host.append(navRow);
    }

    renderRound();
  }

  if(restoring)({workshop:startWorkshop,builder:startBuilder,challenge:startChallenge,catcher:startCatcher}[restoring.kind]||home)();else home();
}
