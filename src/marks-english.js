const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};

export const NEW_WORDS = [
  { id: 'bag', en: 'a bag', word: 'bag', lv: 'soma', icon: '🎒', plural: false, article: 'a', example: 'Is it a bag? Yes, it is.' },
  { id: 'guitar', en: 'a guitar', word: 'guitar', lv: 'ģitāra', icon: '🎸', plural: false, article: 'a', example: 'Is the guitar new? Yes, it is.' },
  { id: 'phone', en: 'a phone', word: 'phone', lv: 'telefons', icon: '📱', plural: false, article: 'a', example: 'Is the phone in the bag? No, it isn\'t.' },
  { id: 'trainers', en: 'trainers', word: 'trainers', lv: 'sporta apavi / kedas', icon: '👟', plural: true, article: '', note: 'Daudzskaitlis! Lieto bez “a” un ar “are”.', example: 'Are they trainers? Yes, they are.' },
  { id: 'basketball', en: 'a basketball', word: 'basketball', lv: 'basketbola bumba', icon: '🏀', plural: false, article: 'a', example: 'Is it a basketball? Yes, it is.' },
  { id: 'headphones', en: 'headphones', word: 'headphones', lv: 'austiņas', icon: '🎧', plural: true, article: '', note: 'Daudzskaitlis! Lieto bez “a” un ar “are”.', example: 'Are the headphones on the desk? Yes, they are.' },
  { id: 'skateboard', en: 'a skateboard', word: 'skateboard', lv: 'skeitbords', icon: '🛹', plural: false, article: 'a', example: 'Is the skateboard fast? Yes, it is.' },
  { id: 'tshirt', en: 'a T-shirt', word: 'T-shirt', lv: 'T-krekls', icon: '👕', plural: false, article: 'a', example: 'Is he wearing a T-shirt? Yes, he is.' },
  { id: 'bike', en: 'a bike', word: 'bike', lv: 'velosipēds', icon: '🚲', plural: false, article: 'a', example: 'Is this your bike? No, it isn\'t.' },
  { id: 'jeans', en: 'jeans', word: 'jeans', lv: 'džinsi', icon: '👖', plural: true, article: '', note: 'Daudzskaitlis! Lieto bez “a” un ar “are”.', example: 'Are the jeans blue? Yes, they are.' },
  { id: 'sunglasses', en: 'sunglasses', word: 'sunglasses', lv: 'saulesbrilles', icon: '🕶️', plural: true, article: '', note: 'Daudzskaitlis! Lieto bez “a” un ar “are”.', example: 'Are those sunglasses cool? Yes, they are.' },
  { id: 'watch', en: 'a watch', word: 'watch', lv: 'rokaspulkstenis', icon: '⌚', plural: false, article: 'a', example: 'Is the watch on your wrist? Yes, it is.' },
  { id: 'console', en: 'a games console', word: 'games console', lv: 'spēļu konsole', icon: '🎮', plural: false, article: 'a', example: 'Is that a games console? Yes, it is.' },
  { id: 'laptop', en: 'a laptop', word: 'laptop', lv: 'portatīvais dators', icon: '💻', plural: false, article: 'a', example: 'Is the laptop open? Yes, it is.' },
  { id: 'sweater', en: 'a sweater', word: 'sweater', lv: 'džemperis', icon: '🧶', plural: false, article: 'a', example: 'Is the sweater warm? Yes, it is.' }
];

export const WORKSHEET_TASKS = {
  task1: [
    { prompt: '___ it a laptop?', answer: 'Is', options: ['Am', 'Is', 'Are'], explanation: 'Ar "it" (a laptop — vienskaitlis) lieto "Is".', icon: '💻' },
    { prompt: '___ they trainers?', answer: 'Are', options: ['Am', 'Is', 'Are'], explanation: '"Trainers" ir daudzskaitlī (they), tāpēc lieto "Are".', icon: '👟' },
    { prompt: '___ the guitar on the chair?', answer: 'Is', options: ['Am', 'Is', 'Are'], explanation: '"The guitar" ir viens priekšmets (it), tāpēc "Is".', icon: '🎸' },
    { prompt: '___ these sunglasses cool?', answer: 'Are', options: ['Am', 'Is', 'Are'], explanation: '"Sunglasses" ir daudzskaitlis (they), tāpēc "Are".', icon: '🕶️' },
    { prompt: '___ I ready with my bag?', answer: 'Am', options: ['Am', 'Is', 'Are'], explanation: 'Ar vietniekvārdu "I" vienmēr lieto "Am".', icon: '🎒' },
    { prompt: '___ the headphones loud?', answer: 'Are', options: ['Am', 'Is', 'Are'], explanation: '"Headphones" ir daudzskaitlī, tāpēc lieto "Are".', icon: '🎧' },
    { prompt: '___ that a games console?', answer: 'Is', options: ['Am', 'Is', 'Are'], explanation: '"A games console" ir viens priekšmets, tāpēc "Is".', icon: '🎮' },
    { prompt: '___ the jeans comfortable?', answer: 'Are', options: ['Am', 'Is', 'Are'], explanation: '"Jeans" angļu valodā ir daudzskaitlis, tāpēc "Are".', icon: '👖' },
    { prompt: '___ the skateboard fast?', answer: 'Is', options: ['Am', 'Is', 'Are'], explanation: '"A skateboard" ir vienskaitlis, tāpēc "Is".', icon: '🛹' },
    { prompt: '___ you wearing a sweater?', answer: 'Are', options: ['Am', 'Is', 'Are'], explanation: 'Ar "you" vienmēr lieto "Are".', icon: '🧶' }
  ],
  task2: [
    { statement: 'It is a laptop.', scrambled: ['laptop', 'Is', 'a', 'it', '?'], target: 'Is it a laptop?', icon: '💻' },
    { statement: 'They are trainers.', scrambled: ['trainers', 'Are', 'they', '?'], target: 'Are they trainers?', icon: '👟' },
    { statement: 'The guitar is new.', scrambled: ['guitar', 'Is', 'the', 'new', '?'], target: 'Is the guitar new?', icon: '🎸' },
    { statement: 'These are headphones.', scrambled: ['headphones', 'Are', 'these', '?'], target: 'Are these headphones?', icon: '🎧' },
    { statement: 'The bike is red.', scrambled: ['bike', 'Is', 'the', 'red', '?'], target: 'Is the bike red?', icon: '🚲' },
    { statement: 'Those are sunglasses.', scrambled: ['sunglasses', 'Are', 'those', '?'], target: 'Are those sunglasses?', icon: '🕶️' },
    { statement: 'He is wearing a T-shirt.', scrambled: ['wearing', 'Is', 'he', 'a T-shirt', '?'], target: 'Is he wearing a T-shirt?', icon: '👕' },
    { statement: 'The watch is on the desk.', scrambled: ['the watch', 'Is', 'on the desk', '?'], target: 'Is the watch on the desk?', icon: '⌚' }
  ],
  task3: [
    { prompt: 'Pārveido par jautājumu: It is a bike.', answer: 'Is it a bike?', accepted: ['Is it a bike?', 'Is it a bike', 'is it a bike?'], hint: 'Apgriez vārdu kārtību: darbības vārds Is nāk teikuma sākumā.' },
    { prompt: 'Pārveido par jautājumu: They are jeans.', answer: 'Are they jeans?', accepted: ['Are they jeans?', 'Are they jeans', 'are they jeans?'], hint: 'Darbības vārds Are nāk teikuma sākumā.' },
    { prompt: 'Pārveido par jautājumu: The sweater is warm.', answer: 'Is the sweater warm?', accepted: ['Is the sweater warm?', 'Is the sweater warm', 'is the sweater warm?'], hint: 'Is nāk pirms The sweater.' },
    { prompt: 'Pārveido par jautājumu: The phone is in the bag.', answer: 'Is the phone in the bag?', accepted: ['Is the phone in the bag?', 'Is the phone in the bag', 'is the phone in the bag?'], hint: 'Is nāk teikuma sākumā.' },
    { prompt: 'Pārveido par jautājumu: The basketball is round.', answer: 'Is the basketball round?', accepted: ['Is the basketball round?', 'Is the basketball round', 'is the basketball round?'], hint: 'Is nāk teikuma sākumā.' },
    { prompt: 'Pārveido par jautājumu: That is a games console.', answer: 'Is that a games console?', accepted: ['Is that a games console?', 'Is that a games console', 'is that a games console?'], hint: 'Is nāk pirms that.' }
  ],
  task4: [
    { question: 'Is it a guitar? (Jā)', answer: 'Yes, it is.', options: ['Yes, it is.', 'Yes, they are.', 'No, it isn\'t.'], note: 'Vienskaitlim "it" atbilde ir "Yes, it is."' },
    { question: 'Are they trainers? (Jā)', answer: 'Yes, they are.', options: ['Yes, they are.', 'Yes, it is.', 'No, they aren\'t.'], note: 'Daudzskaitlim "they" atbilde ir "Yes, they are."' },
    { question: 'Is the skateboard broken? (Nē)', answer: 'No, it isn\'t.', options: ['No, it isn\'t.', 'No, they aren\'t.', 'Yes, it is.'], note: 'Noliegums vienskaitlī: "No, it isn\'t."' },
    { question: 'Are the headphones expensive? (Nē)', answer: 'No, they aren\'t.', options: ['No, they aren\'t.', 'No, it isn\'t.', 'Yes, they are.'], note: 'Noliegums daudzskaitlī: "No, they aren\'t."' },
    { question: 'Is that your T-shirt? (Jā)', answer: 'Yes, it is.', options: ['Yes, it is.', 'Yes, I am.', 'No, it isn\'t.'], note: 'T-krekls ir priekšmets (it): "Yes, it is."' },
    { question: 'Are the sunglasses in the bag? (Nē)', answer: 'No, they aren\'t.', options: ['No, they aren\'t.', 'No, it isn\'t.', 'Yes, they are.'], note: 'Saulesbrilles (sunglasses) ir daudzskaitlī: "No, they aren\'t."' }
  ]
};

const words={days:[['Monday','pirmdiena'],['Tuesday','otrdiena'],['Wednesday','trešdiena'],['Thursday','ceturtdiena'],['Friday','piektdiena'],['Saturday','sestdiena'],['Sunday','svētdiena']],months:[['January','janvāris'],['February','februāris'],['March','marts'],['April','aprīlis'],['May','maijs'],['June','jūnijs'],['July','jūlijs'],['August','augusts'],['September','septembris'],['October','oktobris'],['November','novembris'],['December','decembris']],seasons:[['spring','pavasaris'],['summer','vasara'],['autumn','rudens'],['winter','ziema']]};
const pronouns=[['I','es'],['you','tu / jūs'],['he','viņš'],['she','viņa'],['it','tas / tā'],['we','mēs'],['they','viņi / viņas']];
const acceptedEnglish={autumn:['autumn','fall']};

export function speakEnglish(text, triggerBtn = null) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.84;
    u.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
    if (engVoice) u.voice = engVoice;
    if (triggerBtn) {
      triggerBtn.classList.add('audio-playing');
      u.onstart = () => triggerBtn.classList.add('audio-playing');
      u.onend = () => triggerBtn.classList.remove('audio-playing');
      u.onerror = () => triggerBtn.classList.remove('audio-playing');
    }
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

const normalizeAnswer=value=>String(value).trim().toLowerCase().replace(/[.!?]+$/,'').replace(/['’]/g,"'").replace(/\s+/g,' ');

export function isCorrectEnglishAnswer(question,input){
  const value=normalizeAnswer(input);
  const options=question.accepted||acceptedEnglish[question.a?.toLowerCase?.()]||(question.a?[question.a]:[]);
  return options.some(answer=>normalizeAnswer(answer)===value);
}

export function makeEnglishBank(){
  let bank=[];
  for(const [topic,pairs] of Object.entries(words)){
    pairs.forEach(([en,lv],i)=>{
      bank.push(
        {id:topic+'-en-'+i,topic,q:'Iztulko angliski: '+lv,a:en,hint:'Atceries nosaukumu angļu valodā.'},
        {id:topic+'-lv-'+i,topic,q:'Iztulko latviski: '+en,a:lv,accepted:en.toLowerCase()==='autumn'?['rudens']:undefined,hint:'Atceries tulkojumu.'},
        {id:topic+'-order-'+i,topic,q:'Kurš nosaukums nāk pēc '+en+'?',a:pairs[(i+1)%pairs.length][0],hint:'Padomā par secību.'}
      );
    });
  }
  pronouns.forEach(([en,lv],i)=>bank.push({id:'pronoun-'+i,topic:'pronouns',q:'Iztulko angliski: '+lv,a:en,hint:'I, you, he, she, it, we, they.'}));
  [
    ['Anna is my friend. ___ is kind.','she'],['Dad is tall. ___ is strong.','he'],
    ['Tom and I are friends. ___ play.','we'],['The cats are hungry. ___ want food.','they'],
    ['This is a dog. ___ is happy.','it'],['___ am at school.','I'],
    ['Are ___ ready?','you'],['Marta and Lisa sing. ___ sing well.','they'],
    ['Mother reads. ___ likes books.','she'],['The boy runs. ___ is fast.','he']
  ].forEach(([q,a],i)=>bank.push({id:'usage-'+i,topic:'pronouns',q,a,hint:'Nosaki, par kuru personu vai lietu ir runa.'}));

  // Jaunie vārdi — 15 priekšmeti
  NEW_WORDS.forEach((item, i)=>{
    bank.push({
      id:'vocab-en-'+i,
      topic:'vocab_objects',
      q:'Iztulko latviski: '+item.en+' '+item.icon,
      a:item.lv.split(' / ')[0],
      accepted:[item.lv, ...item.lv.split(' / '), item.lv.replace(' / ', '/')],
      hint:'Priekšmets: '+item.icon
    });
    bank.push({
      id:'vocab-lv-'+i,
      topic:'vocab_objects',
      q:'Iztulko angliski: '+item.lv+' '+item.icon,
      a:item.en,
      accepted:[item.en, item.word, item.en.toLowerCase(), item.word.toLowerCase()],
      hint:'Sāc ar artikulu vai nosaukumu: '+item.en
    });
  });

  // Jautājumi: am / is / are
  WORKSHEET_TASKS.task1.forEach((t, i)=>{
    bank.push({
      id:'q-to-be-gap-'+i,
      topic:'questions_to_be',
      q:'Ieraksti am, is vai are: '+t.prompt,
      a:t.answer,
      accepted:[t.answer, t.answer.toLowerCase()],
      hint:t.explanation
    });
  });
  WORKSHEET_TASKS.task3.forEach((t, i)=>{
    bank.push({
      id:'q-to-be-inv-'+i,
      topic:'questions_to_be',
      q:t.prompt,
      a:t.answer,
      accepted:t.accepted,
      hint:t.hint
    });
  });

  return bank;
}

export function renderMarksEnglish(root,{canSubmit=false,saveProgress=async()=>{},initialState=null,onCheckpoint=()=>{},initialTopic=null}={}){
  const host=document.createElement('section');
  host.className='module learning-hub marks-english';
  root.append(host);
  const bank=makeEnglishBank();

  const topics=[
    ['questions_to_be','❓ Jautājumi: am / is / are (SR darba lapa)'],
    ['vocab_objects','🎒 Jaunie vārdi (15 priekšmeti)'],
    ['days','📅 Nedēļas dienas'],
    ['months','🗓️ Mēneši'],
    ['seasons','🍁 Gadalaiki'],
    ['pronouns','🧑 Personu vietniekvārdi']
  ];

  let topic=null,items=[],index=0,correct=0,mode='practice',streak=0,best=0,misses=[];
  let worksheetSubTab='worksheet'; // 'worksheet' | 'solved' | 'vocab' | 'theory' | 'exam' | 'print'
  let worksheetScore={t1:0, t2:0, t3:0, t4:0, completed:false};
  let printWithAnswers=false;

  const el=(tag,cls,text)=>{
    let n=document.createElement(tag);
    if(cls)n.className=cls;
    if(text!==undefined)n.textContent=text;
    return n;
  };

  const button=(title,fn,cls='action-button')=>{
    let b=el('button',cls,title);
    b.type='button';
    b.onclick=fn;
    host.append(b);
    return b;
  };

  function home(){
    if('speechSynthesis' in window)window.speechSynthesis.cancel();
    host.replaceChildren();

    // Galvenais SR baneris
    const hero=el('div','english-sr-banner');
    const badge=el('span','english-sr-badge','🇬🇧 SKOLA2030 STANDARTS · 3./4. KLASE');
    const h2=el('h2','english-sr-title','SR: Protu veidot jautājumus ar - am/is/are');
    const p=el('p','english-sr-desc','Apgūsti 15 jaunos priekšmetu vārdus, teikuma apgriezto vārdu kārtību un īsās atbildes. Izmanto interaktīvo darba lapu vai sagatavo izdrukai!');
    hero.append(badge,h2,p);

    const ctaRow=el('div','reading-controls');
    const wsBtn=el('button','action-button','📝 Atvērt SR Darba lapu →');
    wsBtn.onclick=()=>renderWorksheetView('worksheet');
    const vocBtn=el('button','action-button','🎧 15 Jaunie vārdi & Audio →');
    vocBtn.onclick=()=>renderWorksheetView('vocab');
    const theoryBtn=el('button','action-button','💡 Noteikumi un SR ceļvedis →');
    theoryBtn.onclick=()=>renderWorksheetView('theory');
    const printBtn=el('button','action-button','🖨️ Drukājamā darba lapa →');
    printBtn.onclick=()=>renderWorksheetView('print');
    ctaRow.append(wsBtn,vocBtn,theoryBtn,printBtn);
    hero.append(ctaRow);
    host.append(hero);

    // Tēmu saraksts tradicionālajam treniņam
    const subHead=el('div','learning-heading');
    subHead.append(el('h3',undefined,'📚 Visas angļu valodas tēmas un trenažieri'));
    host.append(subHead);

    const grid=el('div','topic-grid');
    topics.forEach(([id,title])=>{
      const b=el('button','topic-tile');
      b.type='button';
      const emoji=title.slice(0,2);
      const name=title.slice(2);
      b.append(el('span','topic-emoji',emoji),el('strong',undefined,name),el('small',undefined,'Treniņš un pārbaude'));
      b.onclick=()=>{
        if(id==='questions_to_be')renderWorksheetView('worksheet');
        else if(id==='vocab_objects')renderWorksheetView('vocab');
        else choose(id);
      };
      grid.append(b);
    });
    host.append(grid);
  }

  // --- DARBA LAPA & JAUNIE VĀRDI GALVENIE SKATI ---
  function renderWorksheetView(tab='worksheet'){
    worksheetSubTab=tab;
    host.replaceChildren();

    // Augšējā navigācijas rīkjosla
    const topBar=el('div','subject-backbar');
    const backBtn=el('button','action-button subject-back','← Uz angļu valodas sākumu');
    backBtn.onclick=home;
    topBar.append(backBtn);
    host.append(topBar);

    // SR Kicker
    const srCard=el('div','english-sr-banner');
    srCard.append(
      el('span','english-sr-badge','🎯 SASNIEDZAMAIS REZULTĀTS (SR)'),
      el('h2','english-sr-title','Protu veidot jautājumus ar - am/is/are'),
      el('p','english-sr-desc','Skolēns prot: 1) izvēlēties atbilstošo to be formu; 2) veidot jautājuma vārdu kārtību; 3) lietot 15 jaunos vārdus; 4) atbildēt ar īso atbildi.')
    );
    host.append(srCard);

    // Cilnes (Tabs)
    const tabRow=el('div','english-nav-tabs');
    const tabs=[
      ['worksheet','📝 Interaktīvā darba lapa'],
      ['solved','✅ Atbilžu atslēga (Atrisinājums)'],
      ['vocab','🎧 15 Jaunie vārdi & Audio'],
      ['theory','💡 SR & Noteikumi'],
      ['exam','🏆 Pārbaudes darba lapa (ar BP)'],
      ['print','🖨️ Drukājamā darba lapa']
    ];
    tabs.forEach(([key,label])=>{
      const tBtn=el('button','english-nav-tab'+(tab===key?' active':''),label);
      tBtn.onclick=()=>renderWorksheetView(key);
      tabRow.append(tBtn);
    });
    host.append(tabRow);

    if(tab==='worksheet') renderInteractiveTasks();
    else if(tab==='solved') renderSolvedWorksheetView();
    else if(tab==='vocab') renderVocabCards();
    else if(tab==='theory') renderGrammarTheory();
    else if(tab==='exam') start('exam');
    else if(tab==='print') renderPrintWorksheet();
  }

  // 1. Interaktīvā darba lapa (Tasks 1 - 4)
  function renderInteractiveTasks(){
    const container=el('div','english-worksheet');

    const topBar=el('div','reading-controls');
    const viewSolvedBtn=el('button','action-button','✅ Apskatīt atrisinājumu (Atbilžu atslēga) →');
    viewSolvedBtn.style.background='linear-gradient(135deg, #059669, #10b981)';
    viewSolvedBtn.onclick=()=>renderWorksheetView('solved');
    const printViewBtn=el('button','action-button','🖨️ Sagatavot izdrukai');
    printViewBtn.onclick=()=>renderWorksheetView('print');
    topBar.append(viewSolvedBtn,printViewBtn);
    container.append(topBar);

    // 1. UZDEVUMS
    const t1Box=el('section','worksheet-task-box');
    t1Box.append(
      el('h3','worksheet-task-title','1. uzdevums: Izvēlies pareizo formu: Am, Is vai Are! (10 punkti)'),
      el('p',undefined,'Izlasi teikumu un noklikšķini uz pareizā darbības vārda. Pievērs uzmanību vienskaitlim un daudzskaitlim!')
    );
    const t1State=new Array(WORKSHEET_TASKS.task1.length).fill(null);
    const t1ScoreLabel=el('p',undefined,'Izpildīts: 0 / 10');

    WORKSHEET_TASKS.task1.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      const qHead=el('div','vocab-card-header');
      const qText=el('strong',undefined,(idx+1)+'. '+task.icon+' '+task.prompt);
      const audioBtn=el('button','audio-btn','🔊');
      audioBtn.title='Noklausīties teikumu';
      audioBtn.onclick=()=>speakEnglish(task.prompt.replace('___',task.answer),audioBtn);
      qHead.append(qText,audioBtn);
      row.append(qHead);

      const btnGroup=el('div','reading-controls');
      const feedback=el('small',undefined,'');
      task.options.forEach(opt=>{
        const b=el('button','action-button',opt);
        b.style.minWidth='80px';
        b.onclick=()=>{
          t1State[idx]=opt;
          [...btnGroup.querySelectorAll('button')].forEach(btn=>btn.disabled=true);
          if(opt===task.answer){
            b.style.background='#10b981';
            feedback.style.color='#047857';
            feedback.textContent='✅ Pareizi! '+task.explanation;
          }else{
            b.style.background='#ef4444';
            feedback.style.color='#b91c1c';
            feedback.textContent='⚠️ Nepareizi. Pareizā atbilde: '+task.answer+'. '+task.explanation;
          }
          const correctCount=t1State.filter((v,i)=>v===WORKSHEET_TASKS.task1[i].answer).length;
          t1ScoreLabel.textContent='Pareizi: '+correctCount+' / '+WORKSHEET_TASKS.task1.length;
        };
        btnGroup.append(b);
      });
      row.append(btnGroup,feedback);
      t1Box.append(row);
    });
    t1Box.append(t1ScoreLabel);
    container.append(t1Box);

    // 2. UZDEVUMS (Sentence Scrambler)
    const t2Box=el('section','worksheet-task-box');
    t2Box.append(
      el('h3','worksheet-task-title','2. uzdevums: Jautājumu konstruktors — saliec vārdus pareizā secībā! (8 punkti)'),
      el('p',undefined,'Klikšķini uz vārdu klucīšiem pareizā secībā, lai izveidotu jautājumu ar apgriezto vārdu kārtību.')
    );
    WORKSHEET_TASKS.task2.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      row.append(el('strong',undefined,(idx+1)+'. Apgalvojums: “'+task.statement+'” '+task.icon));
      
      const targetArea=el('div','word-scramble-area');
      const sourceArea=el('div','reading-controls');
      let chosen=[];

      const updateTarget=()=>{
        targetArea.replaceChildren();
        if(chosen.length===0){
          const placeholder=el('span',undefined,'Klikšķini uz vārdiem zemāk, lai saliktu teikumu…');
          placeholder.style.color='#94a3b8';
          targetArea.append(placeholder);
        }else{
          chosen.forEach((word, wIdx)=>{
            const chip=el('span','word-chip',word);
            chip.onclick=()=>{
              chosen.splice(wIdx,1);
              updateTarget();
              updateSource();
            };
            targetArea.append(chip);
          });
        }
      };

      const updateSource=()=>{
        sourceArea.replaceChildren();
        task.scrambled.forEach((word)=>{
          const countInScrambled=task.scrambled.filter(w=>w===word).length;
          const countInChosen=chosen.filter(w=>w===word).length;
          const isUsed=countInChosen>=countInScrambled;
          const btn=el('button','word-chip word-chip-source'+(isUsed?' used':''),word);
          btn.disabled=isUsed;
          btn.onclick=()=>{
            chosen.push(word);
            updateTarget();
            updateSource();
          };
          sourceArea.append(btn);
        });
      };

      const ctrlRow=el('div','reading-controls');
      const checkBtn=el('button','action-button','Pārbaudīt jautājumu');
      const clearBtn=el('button','action-button','Notīrīt');
      clearBtn.style.background='#64748b';
      clearBtn.onclick=()=>{chosen=[];updateTarget();updateSource();feedback.textContent='';};
      const audioBtn=el('button','audio-btn','🔊 Noklausīties');
      audioBtn.onclick=()=>speakEnglish(task.target,audioBtn);

      const feedback=el('p',undefined,'');
      checkBtn.onclick=()=>{
        const constructed=chosen.join(' ').replace(' ?','?');
        if(constructed.toLowerCase()===task.target.toLowerCase()||chosen.join(' ')===task.target.replace('?',' ?')){
          feedback.style.color='#047857';
          feedback.textContent='🎉 Lieliski! Pareizs jautājums: '+task.target;
          speakEnglish(task.target);
        }else{
          feedback.style.color='#b91c1c';
          feedback.textContent='🔍 Pārbaudi secību! Pareizi: '+task.target;
        }
      };
      ctrlRow.append(checkBtn,clearBtn,audioBtn);
      updateTarget();
      updateSource();
      row.append(targetArea,sourceArea,ctrlRow,feedback);
      t2Box.append(row);
    });
    container.append(t2Box);

    // 3. UZDEVUMS (Pārveido par jautājumu)
    const t3Box=el('section','worksheet-task-box');
    t3Box.append(
      el('h3','worksheet-task-title','3. uzdevums: Pārveido apgalvojumu par jautājumu! (6 punkti)'),
      el('p',undefined,'Ieraksti teikumu kā jautājumu. Atceries: darbības vārds Is vai Are nāk pirmais!')
    );
    WORKSHEET_TASKS.task3.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      row.append(el('strong',undefined,(idx+1)+'. '+task.prompt));
      const form=el('form','latvian-question-form');
      const inp=el('input',undefined);
      inp.type='text';
      inp.placeholder='Piem., Is it a bike?';
      inp.setAttribute('aria-label','Tava atbilde jautājumam '+(idx+1));
      const submitBtn=el('button','action-button','Pārbaudīt');
      submitBtn.type='submit';
      form.append(inp,submitBtn);
      const feedback=el('p',undefined,'');
      form.onsubmit=(e)=>{
        e.preventDefault();
        const ok=isCorrectEnglishAnswer(task,inp.value);
        if(ok){
          feedback.style.color='#047857';
          feedback.textContent='✅ Pareizi! '+task.answer;
          inp.style.borderColor='#10b981';
          speakEnglish(task.answer);
        }else{
          feedback.style.color='#b91c1c';
          feedback.textContent='💡 Padoms: '+task.hint+' Pareizā atbilde: '+task.answer;
          inp.style.borderColor='#ef4444';
        }
      };
      row.append(form,feedback);
      t3Box.append(row);
    });
    container.append(t3Box);

    // 4. UZDEVUMS (Īsās atbildes)
    const t4Box=el('section','worksheet-task-box');
    t4Box.append(
      el('h3','worksheet-task-title','4. uzdevums: Jautājumi un īsās atbildes (6 punkti)'),
      el('p',undefined,'Izvēlies gramatiski pareizo īso atbildi: Yes, it is. / No, it isn\'t. / Yes, they are. / No, they aren\'t.')
    );
    WORKSHEET_TASKS.task4.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      row.append(el('strong',undefined,(idx+1)+'. Jautājums: “'+task.question+'”'));
      const btnGroup=el('div','reading-controls');
      const feedback=el('p',undefined,'');
      task.options.forEach(opt=>{
        const b=el('button','action-button',opt);
        b.onclick=()=>{
          [...btnGroup.querySelectorAll('button')].forEach(btn=>btn.disabled=true);
          if(opt===task.answer){
            b.style.background='#10b981';
            feedback.style.color='#047857';
            feedback.textContent='✅ Pareizi! '+task.note;
            speakEnglish(task.question.split('(')[0]+' '+task.answer);
          }else{
            b.style.background='#ef4444';
            feedback.style.color='#b91c1c';
            feedback.textContent='⚠️ Nepareizi. '+task.note+' Pareizā atbilde: '+task.answer;
          }
        };
        btnGroup.append(b);
      });
      row.append(btnGroup,feedback);
      t4Box.append(row);
    });
    container.append(t4Box);

    // Darba lapas nobeigums
    const finishCard=el('section','english-sr-banner');
    finishCard.append(
      el('h3','english-sr-title','🏆 Esi gatavs pārbaudei par BP punktiem?'),
      el('p','english-sr-desc','Izpildi patstāvīgo pārbaudes darbu (15 jautājumi), nopelni +15 BP un iegūsti oficiālo Marka SR apliecinājumu!')
    );
    const startExamBtn=el('button','action-button','Sākt Pārbaudes darba lapu (ar BP) →');
    startExamBtn.style.marginTop='12px';
    startExamBtn.onclick=()=>start('exam');
    finishCard.append(startExamBtn);
    container.append(finishCard);

    host.append(container);
  }

  // Pilns darba lapas atrisinājuma skats (Atbilžu atslēga)
  function renderSolvedWorksheetView(){
    const container=el('div','english-worksheet');

    const scoreCard=el('section','english-sr-banner');
    scoreCard.style.background='linear-gradient(135deg, #065f46, #059669)';
    scoreCard.append(
      el('span','english-sr-badge','✅ ATBILŽU ATSLĒGA UN SKAIDROJUMI'),
      el('h3','english-sr-title','Pilns darba lapas atrisinājums: 28 / 28 p. (100% · 10 - Izcili)'),
      el('p','english-sr-desc','Visi 4 uzdevumi ir pilnībā atrisināti ar pareizajām atbildēm, audio izrunu un pamatojumiem.')
    );
    const navCta=el('div','reading-controls');
    const doInteractiveBtn=el('button','action-button','📝 Pildīt darba lapu patstāvīgi →');
    doInteractiveBtn.onclick=()=>renderWorksheetView('worksheet');
    const printKeyBtn=el('button','action-button','🖨️ Drukāt šo atrisinājumu');
    printKeyBtn.onclick=()=>{
      printWithAnswers=true;
      renderWorksheetView('print');
    };
    navCta.append(doInteractiveBtn,printKeyBtn);
    scoreCard.append(navCta);
    container.append(scoreCard);

    // 1. UZDEVUMS ATRISINĀTS
    const t1Box=el('section','worksheet-task-box');
    t1Box.append(
      el('h3','worksheet-task-title','1. uzdevums: Izvēlies pareizo formu: Am, Is vai Are (10 / 10 p.)'),
      el('p',undefined,'Pareizās formas ir ievietotas un pasvītrotas ar zaļu krāsu. Noklikšķini 🔊, lai noklausītos teikumu.')
    );
    WORKSHEET_TASKS.task1.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      const qHead=el('div','vocab-card-header');
      const fullSentence=task.prompt.replace('___','<strong style="color:#047857;text-decoration:underline;">'+task.answer+'</strong>');
      const qText=el('div',undefined);
      qText.innerHTML='<strong>'+(idx+1)+'. '+task.icon+' </strong> '+fullSentence;
      const audioBtn=el('button','audio-btn','🔊');
      audioBtn.onclick=()=>speakEnglish(task.prompt.replace('___',task.answer),audioBtn);
      qHead.append(qText,audioBtn);
      const expl=el('small',undefined,'💡 '+task.explanation);
      expl.style.color='#047857';
      expl.style.fontWeight='700';
      row.append(qHead,expl);
      t1Box.append(row);
    });
    container.append(t1Box);

    // 2. UZDEVUMS ATRISINĀTS
    const t2Box=el('section','worksheet-task-box');
    t2Box.append(
      el('h3','worksheet-task-title','2. uzdevums: Jautājumu konstruktors — saliec vārdus pareizā secībā (8 / 8 p.)'),
      el('p',undefined,'Apgalvojums pārveidots par jautājumu, pārceļot darbības vārdu Is vai Are uz teikuma sākumu.')
    );
    WORKSHEET_TASKS.task2.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      const topRow=el('div','vocab-card-header');
      const text=el('div',undefined);
      text.innerHTML='<strong>'+(idx+1)+'. '+task.icon+' “'+task.statement+'”</strong><br>➡️ <strong style="color:#047857;font-size:1.15rem;">'+task.target+'</strong>';
      const audioBtn=el('button','audio-btn','🔊');
      audioBtn.onclick=()=>speakEnglish(task.target,audioBtn);
      topRow.append(text,audioBtn);
      row.append(topRow);
      t2Box.append(row);
    });
    container.append(t2Box);

    // 3. UZDEVUMS ATRISINĀTS
    const t3Box=el('section','worksheet-task-box');
    t3Box.append(
      el('h3','worksheet-task-title','3. uzdevums: Pārveido apgalvojumu par jautājumu (6 / 6 p.)'),
      el('p',undefined,'Darbības vārds ir pārcelts uz sākumu ar lielo burtu un teikuma beigās likta jautājuma zīme.')
    );
    WORKSHEET_TASKS.task3.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      const topRow=el('div','vocab-card-header');
      const text=el('div',undefined);
      text.innerHTML='<strong>'+(idx+1)+'. '+task.prompt+'</strong><br>➡️ <strong style="color:#047857;font-size:1.15rem;">'+task.answer+'</strong>';
      const audioBtn=el('button','audio-btn','🔊');
      audioBtn.onclick=()=>speakEnglish(task.answer,audioBtn);
      topRow.append(text,audioBtn);
      const note=el('small',undefined,'💡 '+task.hint);
      note.style.color='#475569';
      row.append(topRow,note);
      t3Box.append(row);
    });
    container.append(t3Box);

    // 4. UZDEVUMS ATRISINĀTS
    const t4Box=el('section','worksheet-task-box');
    t4Box.append(
      el('h3','worksheet-task-title','4. uzdevums: Jautājumi un īsās atbildes (6 / 6 p.)'),
      el('p',undefined,'Gramatiski pareizā īsā atbilde (vienskaitlī lieto "it", daudzskaitlī lieto "they").')
    );
    WORKSHEET_TASKS.task4.forEach((task, idx)=>{
      const row=el('div','worksheet-question-row');
      const topRow=el('div','vocab-card-header');
      const text=el('div',undefined);
      text.innerHTML='<strong>'+(idx+1)+'. '+task.question+'</strong><br>➡️ <strong style="color:#047857;font-size:1.15rem;">'+task.answer+'</strong>';
      const audioBtn=el('button','audio-btn','🔊');
      audioBtn.onclick=()=>speakEnglish(task.question.split('(')[0]+' '+task.answer,audioBtn);
      topRow.append(text,audioBtn);
      const note=el('small',undefined,'💡 '+task.note);
      note.style.color='#047857';
      note.style.fontWeight='700';
      row.append(topRow,note);
      t4Box.append(row);
    });
    container.append(t4Box);

    // Apakšējā poga uz pārbaudi
    const ctaBottom=el('section','english-sr-banner');
    ctaBottom.append(
      el('h3','english-sr-title','🏆 Pārbaudi savas zināšanas testā!'),
      el('p','english-sr-desc','Izpildi patstāvīgo pārbaudes darbu, iegūsti vismaz 85% un nopelni +15 BP Marka kontā!')
    );
    const goExam=el('button','action-button','Sākt pārbaudes darbu ar BP →');
    goExam.style.marginTop='10px';
    goExam.onclick=()=>start('exam');
    ctaBottom.append(goExam);
    container.append(ctaBottom);

    host.append(container);
  }

  // 2. 15 Jaunie vārdi ar audio un kartītēm
  function renderVocabCards(){
    const wrap=el('div','english-worksheet');
    const header=el('div','learning-heading');
    header.append(
      el('h3',undefined,'🎒 15 Jaunie priekšmetu vārdi (Vocabulary)'),
      el('p',undefined,'Klausies izrunu, ievēro artikulu “a” un iegaumē, kuri 4 vārdi vienmēr ir daudzskaitlī!')
    );
    wrap.append(header);

    const grid=el('div','vocab-grid');
    NEW_WORDS.forEach(item=>{
      const card=el('article','vocab-card');
      const top=el('div','vocab-card-header');
      top.append(el('span','vocab-card-icon',item.icon));

      const spk=el('button','audio-btn','🔊 Klausīties');
      spk.onclick=()=>speakEnglish(item.en,spk);
      top.append(spk);
      card.append(top);

      card.append(
        el('h4','vocab-card-word',item.en),
        el('p','vocab-card-meaning',item.lv)
      );

      if(item.plural){
        card.append(el('span','vocab-card-tag','⚠️ Daudzskaitlis (they · are)'));
      }else{
        card.append(el('span','vocab-card-tag','Vienskaitlis (it · is)'));
      }

      const ex=el('p','vocab-card-example',item.example);
      card.append(ex);
      grid.append(card);
    });
    wrap.append(grid);

    // Audio klausīšanās poga visiem vārdiem pēc kārtas
    const playAllBox=el('div','worksheet-task-box');
    playAllBox.append(
      el('h4',undefined,'🎧 Klausīšanās treniņš'),
      el('p',undefined,'Noklausies visus 15 jaunos vārdus ar angļu valodas pareizo izrunu.')
    );
    const playAllBtn=el('button','action-button','▶️ Noklausīties visus 15 vārdus');
    playAllBtn.onclick=()=>{
      let i=0;
      function nextWord(){
        if(i<NEW_WORDS.length){
          speakEnglish(NEW_WORDS[i].en);
          i++;
          setTimeout(nextWord,1800);
        }
      }
      nextWord();
    };
    playAllBox.append(playAllBtn);
    wrap.append(playAllBox);

    host.append(wrap);
  }

  // 3. SR un Noteikumi (Grammar Guide)
  function renderGrammarTheory(){
    const wrap=el('div','english-worksheet');
    wrap.append(
      el('h3',undefined,'💡 Sasniedzamais rezultāts (SR) un gramatikas likumi'),
      el('p',undefined,'Kā pareizi veidot jautājumus ar “am / is / are”? Seko šiem 3 vienkāršajiem likumiem!')
    );

    const grid=el('div','grammar-guide-grid');

    // Likums 1
    const card1=el('article','grammar-card');
    card1.append(
      el('h3',undefined,'1. Likums: Izvēlies Am, Is vai Are'),
      el('p',undefined,'Darbības vārda forma ir atkarīga no personas vai priekšmeta skaita:')
    );
    const r1=el('div','grammar-rule-row');
    r1.append(el('span','grammar-badge grammar-badge-am','Am'),el('span',undefined,'Tikai ar <strong>I</strong> (Am I ready?)'));
    const r2=el('div','grammar-rule-row');
    r2.append(el('span','grammar-badge grammar-badge-is','Is'),el('span',undefined,'Ar <strong>he, she, it</strong> un <strong>vienskaitli</strong> (a bike, a phone, a guitar)'));
    const r3=el('div','grammar-rule-row');
    r3.append(el('span','grammar-badge grammar-badge-are','Are'),el('span',undefined,'Ar <strong>you, we, they</strong> un <strong>daudzskaitli</strong> (trainers, jeans, headphones, sunglasses)'));
    card1.append(r1,r2,r3);
    grid.append(card1);

    // Likums 2
    const card2=el('article','grammar-card');
    card2.append(
      el('h3',undefined,'2. Likums: Apgrieztā vārdu kārtība (Inversion)'),
      el('p',undefined,'Jautājumā darbības vārds pārlec uz pašu teikuma sākumu ar lielo burtu:')
    );
    const inv1=el('p',undefined,'Apgalvojums: <em>It <strong>is</strong> a laptop.</em><br>➡️ Jautājums: <strong>Is</strong> it a laptop?');
    inv1.style.background='#f1f5f9';inv1.style.padding='8px 12px';inv1.style.borderRadius='8px';
    const inv2=el('p',undefined,'Apgalvojums: <em>They <strong>are</strong> trainers.</em><br>➡️ Jautājums: <strong>Are</strong> they trainers?');
    inv2.style.background='#f1f5f9';inv2.style.padding='8px 12px';inv2.style.borderRadius='8px';
    card2.append(inv1,inv2);
    grid.append(card2);

    // Likums 3
    const card3=el('article','grammar-card');
    card3.append(
      el('h3',undefined,'3. Likums: Īsās atbildes (Short answers)'),
      el('p',undefined,'Angļu valodā neatbild ar vienu pašu “Yes” vai “No”, bet pievieno vietniekvārdu un to be formu:')
    );
    const sa1=el('div','grammar-rule-row');
    sa1.append(el('strong',undefined,'Is it a bag?'),el('span',undefined,'✓ <strong>Yes, it is.</strong> · ✗ <strong>No, it isn\'t.</strong>'));
    const sa2=el('div','grammar-rule-row');
    sa2.append(el('strong',undefined,'Are they trainers?'),el('span',undefined,'✓ <strong>Yes, they are.</strong> · ✗ <strong>No, they aren\'t.</strong>'));
    const sa3=el('div','grammar-rule-row');
    sa3.append(el('strong',undefined,'Are you ready?'),el('span',undefined,'✓ <strong>Yes, I am.</strong> · ✗ <strong>No, I\'m not.</strong>'));
    card3.append(sa1,sa2,sa3);
    grid.append(card3);

    // 4 īpašie vārdi
    const card4=el('article','grammar-card');
    card4.append(
      el('h3',undefined,'⚠️ 4 vārdi, kas vienmēr ir DAUDZSKAITLĪ!'),
      el('p',undefined,'Šiem priekšmetiem sastāvdaļas ir pa pāriem, tāpēc tiem nav artikula “a” un jautājumos vienmēr izmanto <strong>ARE</strong>:')
    );
    const plList=el('ul',undefined);
    plList.style.lineHeight='1.7';
    plList.innerHTML='<li>👟 <strong>trainers</strong> (sporta apavi / kedas) ➡️ <em>Are they trainers?</em></li><li>🎧 <strong>headphones</strong> (austiņas) ➡️ <em>Are the headphones on the table?</em></li><li>👖 <strong>jeans</strong> (džinsi) ➡️ <em>Are these jeans blue?</em></li><li>🕶️ <strong>sunglasses</strong> (saulesbrilles) ➡️ <em>Are those sunglasses cool?</em></li>';
    card4.append(plList);
    grid.append(card4);

    wrap.append(grid);
    host.append(wrap);
  }

  // 4. Drukājamā darba lapa (Print view)
  function renderPrintWorksheet(){
    const wrap=el('div','english-worksheet');
    const actions=el('div','reading-controls no-print');
    const printBtn=el('button','action-button','🖨️ Izdrukāt darba lapu (Print / PDF)');
    printBtn.onclick=()=>window.print();
    const toggleBtn=el('button','action-button',printWithAnswers?'📝 Rādīt tukšu darba lapu':'✅ Rādīt aizpildītu darba lapu (Atbilžu atslēga)');
    toggleBtn.style.background=printWithAnswers?'#3b82f6':'linear-gradient(135deg, #059669, #10b981)';
    toggleBtn.onclick=()=>{
      printWithAnswers=!printWithAnswers;
      renderPrintWorksheet();
    };
    actions.append(printBtn,toggleBtn);
    wrap.append(actions);

    const sheet=el('div','print-worksheet-sheet');
    const ans1=[
      'Is', 'Are', 'Is', 'Are', 'Am', 'Are', 'Is', 'Are', 'Is', 'Are'
    ];
    const ans2=[
      'Is it a laptop?', 'Are they trainers?', 'Is the guitar new?', 'Are these headphones?',
      'Is the bike red?', 'Are those sunglasses?'
    ];
    const ans3=[
      'Is it a bike?', 'Are they jeans?', 'Is the sweater warm?',
      'Is the phone in the bag?', 'Is the basketball round?', 'Is that a games console?'
    ];
    const ans4=[
      'Yes, it is.', 'Yes, they are.', 'No, it isn\'t.',
      'No, they aren\'t.', 'Yes, it is.', 'No, they aren\'t.'
    ];

    sheet.innerHTML=`
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-size: 1.6rem; color: #0f172a;">LEVEL UP · Angļu valodas darba lapa</h2>
          <span style="font-weight: 800; font-size: 1rem; color: #475569;">3./4. klase</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; font-weight: 700;">
          <div>Skolēna vārds: <strong>Marks</strong></div>
          <div>Datums: ${new Date().toLocaleDateString('lv-LV')}</div>
          <div>Punkti: <strong>${printWithAnswers ? '28 / 28 p. (10 - Izcili)' : '______ / 28 p.'}</strong></div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px;">
        <strong>Sasniedzamais rezultāts (SR):</strong> Protu veidot jautājumus ar <em>am / is / are</em>, apgriezt vārdu kārtību un lietot 15 jaunos vārdus.
        ${printWithAnswers ? '<span style="display:inline-block; margin-left:10px; background:#dcfce7; color:#166534; font-weight:900; padding:2px 8px; border-radius:6px;">✅ ATBILŽU ATSLĒGA (ATRISINĀTS)</span>' : ''}
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 8px;">1. uzdevums. Ieraksti tukšajā vietā pareizo formu: <u>am</u>, <u>is</u> vai <u>are</u>! (10 p.)</h4>
        <ol style="margin: 0; padding-left: 22px; line-height: 2;">
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Is</strong>' : '________'} it a laptop?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Are</strong>' : '________'} they trainers?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Is</strong>' : '________'} the guitar on the chair?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Are</strong>' : '________'} these sunglasses cool?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Am</strong>' : '________'} I ready with my bag?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Are</strong>' : '________'} the headphones loud?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Is</strong>' : '________'} that a games console?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Are</strong>' : '________'} the jeans blue?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Is</strong>' : '________'} the skateboard fast?</li>
          <li>${printWithAnswers ? '<strong style="color:#047857; text-decoration:underline;">Are</strong>' : '________'} you wearing a sweater?</li>
        </ol>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 8px;">2. uzdevums. Saliec vārdus pareizā secībā, lai izveidotu jautājumu! (6 p.)</h4>
        <div style="line-height: 2.2;">
          <div>1) [laptop / Is / a / it / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is it a laptop?</strong>' : '________________________________________________'}</div>
          <div>2) [trainers / Are / they / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Are they trainers?</strong>' : '________________________________________________'}</div>
          <div>3) [the guitar / Is / new / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is the guitar new?</strong>' : '________________________________________________'}</div>
          <div>4) [headphones / Are / these / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Are these headphones?</strong>' : '________________________________________________'}</div>
          <div>5) [the bike / Is / red / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is the bike red?</strong>' : '________________________________________________'}</div>
          <div>6) [sunglasses / Are / those / ?] ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Are those sunglasses?</strong>' : '________________________________________________'}</div>
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 8px;">3. uzdevums. Pārveido apgalvojumu par jautājumu! (6 p.)</h4>
        <div style="line-height: 2.2;">
          <div>1) It is a bike. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is it a bike?</strong>' : '________________________________________________'}</div>
          <div>2) They are jeans. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Are they jeans?</strong>' : '________________________________________________'}</div>
          <div>3) The sweater is warm. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is the sweater warm?</strong>' : '________________________________________________'}</div>
          <div>4) The phone is in the bag. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is the phone in the bag?</strong>' : '________________________________________________'}</div>
          <div>5) The basketball is round. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is the basketball round?</strong>' : '________________________________________________'}</div>
          <div>6) That is a games console. ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Is that a games console?</strong>' : '________________________________________________'}</div>
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="margin: 0 0 8px;">4. uzdevums. Uzraksti atbilstošo īso atbildi! (6 p.)</h4>
        <div style="line-height: 2.2;">
          <div>1) Is it a guitar? (Jā) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Yes, it is.</strong>' : '__________________________________'}</div>
          <div>2) Are they trainers? (Jā) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Yes, they are.</strong>' : '__________________________________'}</div>
          <div>3) Is the skateboard broken? (Nē) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">No, it isn\'t.</strong>' : '__________________________________'}</div>
          <div>4) Are the headphones expensive? (Nē) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">No, they aren\'t.</strong>' : '__________________________________'}</div>
          <div>5) Is that your T-shirt? (Jā) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">Yes, it is.</strong>' : '__________________________________'}</div>
          <div>6) Are the sunglasses in the bag? (Nē) ➡️ ${printWithAnswers ? '<strong style="color:#047857;">No, they aren\'t.</strong>' : '__________________________________'}</div>
        </div>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 20px; font-size: 0.88rem; color: #64748b; display: flex; justify-content: space-between;">
        <span>Vērtējums: 26-28 p. (10 - Izcili) · 23-25 p. (9 - Teicami) · 20-22 p. (8 - Ļoti labi)</span>
        <span>Vecāka / Skolotāja paraksts: ________________</span>
      </div>
    `;
    wrap.append(sheet);
    host.append(wrap);
  }

  // --- STANDARTA TRENIŅA UN PĀRBAUDES REŽĪMI ---
  function choose(id){
    topic=id;
    host.replaceChildren();
    const cur=topics.find(t=>t[0]===id);
    host.append(el('h2',undefined,cur?cur[1]:id));
    button('🌱 Mācos · 8',()=>start('learn'));
    button('🎯 Trenējos · 12',()=>start('practice'));
    button('🏆 Pārbaudu sevi · '+Math.min(20,bank.filter(q=>q.topic===id).length),()=>start('exam'));
    button('← Priekšmeta tēmas',home);
  }

  function start(m){
    mode=m;
    if(!topic) topic='questions_to_be';
    const pool=bank.filter(q=>q.topic===topic);
    const count=m==='learn'?8:m==='exam'?Math.min(pool.length,15):12;
    items=shuffle(pool).slice(0,count);
    index=correct=streak=best=0;
    misses=[];
    step();
  }

  function step(){
    onCheckpoint({topic,items,index,correct,mode,streak,best,misses,worksheetSubTab});
    if(index>=items.length){void finish();return;}
    host.replaceChildren();
    const q=items[index];

    // Galvene
    const topBar=el('div','subject-backbar');
    const backBtn=el('button','action-button subject-back','← Atpakaļ uz tēmām');
    backBtn.onclick=home;
    topBar.append(backBtn);
    host.append(topBar);

    host.append(el('h2',undefined,'Jautājums '+(index+1)+' / '+items.length));
    const bar=el('div','progress-track');
    const fill=el('div','progress-fill');
    fill.style.width=(100*index/items.length)+'%';
    bar.append(fill);
    host.append(bar);

    host.append(el('p',undefined,'🔥 '+streak+' pēc kārtas · Rekords: '+best));
    
    // Jautājuma karte
    const qBox=el('div','worksheet-task-box');
    const qHead=el('div','vocab-card-header');
    const promptTitle=el('h3',undefined,q.q);
    const audioBtn=el('button','audio-btn','🔊 Izruna');
    audioBtn.onclick=()=>speakEnglish(q.q.replace(/Iztulko.*?: /i,'').replace(/Ieraksti.*?: /i,'').replace(/Pārveido.*?: /i,''),audioBtn);
    qHead.append(promptTitle,audioBtn);
    qBox.append(qHead);

    const hint=el('p',undefined,'Raksti atbildi un spied “Pārbaudīt”. Punctuation (jautājuma zīme) ir pēc izvēles.');
    qBox.append(hint);

    const form=el('form','latvian-question-form');
    const inp=el('input',undefined);
    inp.type='text';
    inp.required=true;
    inp.autocomplete='off';
    inp.enterKeyHint='done';
    inp.setAttribute('aria-label','Tava atbilde');
    form.append(inp);

    const submit=el('button','action-button','Pārbaudīt atbildi');
    submit.type='submit';
    form.append(submit);
    qBox.append(form);

    const status=el('p',undefined);
    status.setAttribute('role','status');
    qBox.append(status);

    if(mode==='learn'&&q.hint){
      const helpBtn=el('button','action-button','💡 Padoms');
      helpBtn.style.background='#64748b';
      helpBtn.onclick=()=>status.textContent=q.hint;
      qBox.append(helpBtn);
    }

    inp.addEventListener('keydown',event=>{
      if(event.key==='Enter'){event.preventDefault();inp.blur();}
    });

    let checked=false,advanced=false;
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(checked||!inp.value.trim())return;
      checked=true;
      const good=isCorrectEnglishAnswer(q,inp.value);
      inp.readOnly=true;submit.disabled=true;
      status.textContent=mode==='exam'?'Atbilde pieņemta.':good?'🎉 Pareizi! Lieliski!':'🔍 Pareizā atbilde: '+q.a;
      if(good)speakEnglish(q.a);

      const fix=button('✏️ Labot atbildi',()=>{
        if(advanced)return;
        checked=false;inp.readOnly=false;submit.disabled=false;
        status.textContent='Vari izlabot un vēlreiz pārbaudīt.';
        fix.remove();next.remove();
      });
      const next=button(index+1===items.length?'Apstiprināt un skatīt rezultātu →':'Apstiprināt un turpināt →',()=>{
        if(advanced)return;
        advanced=true;
        correct+=Number(good);
        if(!good)misses.push({question:q.q,answer:q.a});
        streak=good?streak+1:0;
        best=Math.max(best,streak);
        index++;step();
      });
      next.style.marginTop='12px';
    });

    host.append(qBox);
  }

  async function finish(){
    let percent=Math.round(correct/items.length*100);
    host.replaceChildren();

    const resultBox=el('div','english-sr-banner');
    const badgeText=percent>=85?'🌟 SR SASNIEGTS TEICAMI!':percent>=60?'👍 SR DAĻĒJI SASNIEGTS':'🌱 VAJAG VĒL TRENĒTIES';
    resultBox.append(
      el('span','english-sr-badge',badgeText),
      el('h2','english-sr-title','Pārbaudes darba rezultāts: '+percent+'%'),
      el('p','english-sr-desc','Pareizi atbildēts: '+correct+' no '+items.length+' · Garākā pareizo atbilžu sērija: '+best)
    );
    host.append(resultBox);

    if(misses.length){
      const review=el('div','worksheet-task-box');
      review.append(el('h3',undefined,'Kļūdu analīze un pareizās atbildes'));
      for(const miss of misses){
        const row=el('p',undefined,miss.question+' → <strong>'+miss.answer+'</strong>');
        review.append(row);
      }
      host.append(review);
    }

    let stat=el('p',undefined);
    host.append(stat);

    if(canSubmit){
      try{
        const id=await saveProgress({
          studentRole:'marks',
          subject:'Angļu valoda',
          activityType:'questions_to_be · '+mode,
          score:percent,
          notes:JSON.stringify({correct,total:items.length,streak:best,missionId:'oct26-english-questions'})
        });
        stat.textContent=id?'✅ Rezultāts saglabāts sistēmā!'+(percent>=85?' (+15 BP misijas bonuss piešķirts!)':''):'⚠️ Nav apstiprināta saglabāšana';
      }catch{
        stat.textContent='⚠️ Saglabāšana neizdevās';
      }
    }

    const navRow=el('div','reading-controls');
    const retryBtn=el('button','action-button','Atkārtot pārbaudi');
    retryBtn.onclick=()=>start(mode);
    const wsBtn=el('button','action-button','Atgriezties pie Darba lapas');
    wsBtn.onclick=()=>renderWorksheetView('worksheet');
    const homeBtn=el('button','action-button','← Visas tēmas');
    homeBtn.onclick=home;
    navRow.append(retryBtn,wsBtn,homeBtn);
    host.append(navRow);
  }

  // Sākotnējais ielādes maršrutētājs
  if(initialState){
    ({topic,items,index,correct,mode,streak,best,misses,worksheetSubTab}=initialState);
    if(worksheetSubTab&&worksheetSubTab!=='exam'){
      renderWorksheetView(worksheetSubTab);
    }else{
      step();
    }
  }else if(initialTopic==='worksheet'){
    renderWorksheetView('worksheet');
  }else if(initialTopic&&topics.some(t=>t[0]===initialTopic)){
    choose(initialTopic);
  }else{
    home();
  }
}