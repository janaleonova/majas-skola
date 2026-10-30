import {NEW_WORDS,speakEnglish} from './marks-english.js';
import {UNIT1_DAYS,UNIT1_COUNTRIES,UNIT1_DAY2,UNIT1_DAY3,UNIT1_DAY4,UNIT1_READING,UNIT1_LISTENING,UNIT1_MOCK,UNIT1_RUBRIC,UNIT1_BONUS_DEADLINE,UNIT1_NPD_DATE,unit1MissionId,unit1TopicId,isUnit1Correct,scoreUnit1,countUnit1Words,unit1DailyCanBonus} from './marks-unit1-data.js';

const el=(tag,cls='',value='')=>{
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(value)node.textContent=value;
 return node;
};
const add=(parent,...children)=>{parent.append(...children);return parent;};
const button=(text,callback,cls='unit1-btn')=>{
 const b=el('button',cls,text);b.type='button';b.onclick=callback;return b;
};
const monthDay=date=>date.slice(8,10)+'.'+date.slice(5,7)+'.';
const DAY1=UNIT1_DAYS[0].date;
const TEST_DAY=UNIT1_DAYS[4].date;
const dayQuestions=date=>{
 if(date===DAY1)return NEW_WORDS.map((word,i)=>({
  id:'object-'+word.id,
  prompt:word.icon+' '+word.lv+' — uzraksti nosaukumu angliski.',
  answer:word.en,
  points:1,
  extra:word.example
 }));
 if(date===UNIT1_DAYS[1].date)return UNIT1_DAY2;
 if(date===UNIT1_DAYS[2].date)return UNIT1_DAY3;
 if(date===UNIT1_DAYS[3].date)return UNIT1_DAY4;
 return UNIT1_MOCK.flatMap(section=>section.items);
};
const defaultWriting=()=>Array.from({length:7},()=>'');

export function renderMarksUnit1Mission(container,options={}){
 const {saveProgress=async()=>null,canSubmit=true,onCheckpoint=()=>{},initialState=null,completedMissions=[],today=new Date()}=options;
 const dayNow=typeof today==='string'?today:new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(today);
 const preferred=UNIT1_DAYS.filter(d=>d.date<=dayNow).at(-1)?.date||DAY1;
 let activeDate=UNIT1_DAYS.some(d=>d.date===initialState?.activeDate)?initialState.activeDate:preferred;
 let phase=['home','learn','exam','result'].includes(initialState?.phase)?initialState.phase:'home';
 let step=Math.max(0,Number(initialState?.step)||0);
 let answers=initialState?.answers&&typeof initialState.answers==='object'?{...initialState.answers}:{};
 let writing=Array.isArray(initialState?.writing)&&initialState.writing.length===7?[...initialState.writing]:defaultWriting();
 let saveStatus='';
 let saved=false;
 let submitting=false;
 let examResult=null;
 let showTranscript=false;
 const completed=new Set(completedMissions);
 const root=el('div','unit1-root');
 container.replaceChildren(root);
 const css=el('style');
 css.textContent="\n.unit1-root{max-width:1050px;margin:0 auto;padding:16px 10px 40px;color:#1b2e45!important;color-scheme:light;font-family:system-ui,-apple-system,sans-serif;line-height:1.5}\n.unit1-root *{box-sizing:border-box}\n.unit1-hero,.unit1-panel{background:#fff!important;color:#1b2e45!important;border:1px solid #cfddeb;border-radius:22px;padding:clamp(18px,3vw,30px);margin:0 0 18px;box-shadow:0 5px 25px rgba(16,41,70,.07)}\n.unit1-hero{background:linear-gradient(115deg,#effdf5,#eff7ff)!important;border-color:#b7e8d4}\n.unit1-root h2,.unit1-root h3,.unit1-root h4,.unit1-root p,.unit1-root label,.unit1-root strong,.unit1-root span{color:#1b2e45}\n.unit1-root h2{font-size:clamp(1.6rem,3.4vw,2.3rem);line-height:1.23;margin:12px 0}\n.unit1-root h3{font-size:clamp(1.3rem,2.5vw,1.7rem);margin:4px 0 12px}\n.unit1-root h4{font-size:1.15rem;margin:0 0 12px}\n.unit1-root p{font-size:1rem;margin:8px 0;line-height:1.55}\n.unit1-pill{display:inline-flex;background:#056e55;color:#fff!important;padding:6px 12px;border-radius:99px;font-weight:750;font-size:.82rem;letter-spacing:.03em}\n.unit1-date-line{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}\n.unit1-date-line span{background:#fff;border:1px solid #bddbd0;padding:7px 12px;border-radius:99px;font-size:.91rem}\n.unit1-topnav{display:flex;align-items:center;gap:14px;margin:10px 0 18px}\n.unit1-kicker{color:#52657d!important;font-size:.88rem;font-weight:800;letter-spacing:.03em}\n.unit1-muted{color:#52647b!important}\n.unit1-materials{background:#fff7e6;border-left:4px solid #d69e18;border-radius:8px;padding:12px 15px;font-size:.95rem!important;}
.unit1-tip{background:#eaf6ff;padding:13px 15px;border-left:4px solid #2683b2;border-radius:8px}\n.unit1-days{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:18px}\n.unit1-day-card,.unit1-flashcard{background:#f8fafd;border:1px solid #cbd8e7;border-radius:16px;padding:18px}\n.unit1-day-card strong{font-size:1.06rem}\n.unit1-day-card .unit1-focus{min-height:54px}\n.unit1-btn,.unit1-choice{border:2px solid #0b8c74;background:#0a896e!important;color:#fff!important;border-radius:12px;min-height:48px;padding:10px 16px;font-weight:800;font-size:1rem;cursor:pointer;max-width:100%;white-space:normal;line-height:1.4}\n.unit1-btn:hover,.unit1-btn:focus-visible{outline:3px solid #86efac;outline-offset:2px}\n.unit1-btn:disabled{opacity:.45;cursor:not-allowed}\n.unit1-btn.ghost{background:#fff!important;color:#126d65!important;border-color:#77bca9}\n.unit1-btn.primary{background:#076c59!important;border-color:#076c59}\n.unit1-flashcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin:18px 0}\n.unit1-flashcard{display:flex;flex-direction:column;align-items:flex-start;gap:12px}\n.unit1-flash-answer{background:#e6f4ee;color:#064c3b;padding:9px;border-radius:9px;font-weight:700;width:100%}\n.unit1-between{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}\n.unit1-progress{height:12px;background:#e0e7f0;border-radius:99px;overflow:hidden;margin:18px 0}\n.unit1-progress span{display:block;height:100%;border-radius:99px;background:#08916d}\n.unit1-exam-card{background:#fff;border:2px solid #d4deec;border-radius:18px;padding:clamp(16px,3vw,26px);margin:16px 0}\n.unit1-question{border-bottom:1px solid #e1e9f3;padding:14px 0}\n.unit1-question:last-child{border-bottom:0}\n.unit1-prompt{display:block!important;color:#172c43!important;font-weight:750;font-size:1.08rem;line-height:1.55;margin:0 0 14px}\n.unit1-options{display:grid;grid-template-columns:1fr;gap:9px}\n.unit1-choice{display:block;width:100%;text-align:left;background:#fff!important;border-color:#aabbd0;color:#162d42!important;min-height:50px;padding:13px 15px}\n.unit1-choice.chosen{background:#e0f7e9!important;color:#135438!important;border-color:#168454!important;box-shadow:inset 5px 0 0 #168454}\n.unit1-answer{display:block;width:100%;min-height:51px;background:#fff!important;color:#182a40!important;border:2px solid #8fa5bf;border-radius:12px;padding:12px 14px;font-size:1.06rem;font-family:inherit}\n.unit1-answer:focus{border-color:#087e6b;outline:2px solid #87d8bd;outline-offset:1px}\ntextarea.unit1-answer{min-height:70px;resize:vertical}\n.unit1-writing-line{display:block;margin:12px 0;font-weight:700}\n.unit1-writing-line span{display:block;margin:5px 0}\n.unit1-word-meter{background:#e3efff;padding:12px;border-radius:10px;font-weight:700}\n.unit1-controls{display:flex;gap:12px;flex-wrap:wrap;justify-content:space-between}\n.unit1-reading{display:block;background:#f0f6ff;border:1px solid #b2cef2;border-radius:14px;padding:16px;margin:14px 0;color:#183149}\n.unit1-reading p{margin:12px 0}\n.unit1-rubric{margin-top:22px;border:1px solid #cdd9e7;border-radius:14px;padding:15px}
.unit1-review-item{padding:12px 0;border-bottom:1px solid #dae3ef}.unit1-review-item p{margin:6px 0!important}\n.unit1-rubric summary{font-weight:800;cursor:pointer}\n.unit1-rubric-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px 15px}\n.unit1-pronouns{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}\n.unit1-pronouns p{background:#eaf6ef;border-radius:10px;padding:11px}\n.unit1-big-score{font-size:clamp(1.5rem,4vw,2.5rem)!important;font-weight:850}\n.unit1-success{color:#075d3d!important;background:#dcfce7;padding:13px;border-radius:12px;font-weight:750}\n.unit1-status{color:#9f1239!important;background:#fff1f2;padding:12px;border-radius:10px;font-weight:700}\n@media(max-width:520px){.unit1-root{padding:7px}.unit1-hero,.unit1-panel{border-radius:16px}.unit1-days{grid-template-columns:1fr}.unit1-controls>.unit1-btn{flex:1}}\n";
 const persist=()=>{
  onCheckpoint({activeDate,phase,step,answers,writing});
 };
 const switchDay=(date,screen='learn')=>{
  if(date>dayNow&&dayNow<UNIT1_NPD_DATE)return;
  activeDate=date;phase=screen;step=0;answers={};writing=defaultWriting();
  saved=false;examResult=null;saveStatus='';showTranscript=false;
  persist();render();
 };
 const nav=(label)=>{
  const n=el('nav','unit1-topnav');
  add(n,button('← Visas dienas',()=>{phase='home';persist();render();},'unit1-btn ghost'));
  add(n,el('span','unit1-kicker',label));
  return n;
 };
 const shell=()=>{
  root.replaceChildren(css);
  const hero=el('section','unit1-hero');
  add(hero,el('div','unit1-pill','🇬🇧 MARKA UNIT 1 · 4. KLASE'));
  add(hero,el('h2','','Angļu valodas NPD ekspedīcija'));
  add(hero,el('p','','5 mazas misijas līdz 3. novembrim. 4. novembrī — pārbaudes darbs.'));
  const dates=el('div','unit1-date-line');
  add(dates,el('span','','📅 30.10.–03.11. mācāmies'),el('span','','📝 04.11. NPD'),el('span','','🎁 Līdz +50 īpašajiem BP'));
  add(hero,dates);add(root,hero);
 };
 const labelStatus=(day)=>{
  if(completed.has(unit1MissionId(day.date)))return '✅ Bonusa nosacījums sasniegts';
  if(day.date>dayNow&&dayNow<UNIT1_NPD_DATE)return '🔒 Atveras '+monthDay(day.date);
  if(dayNow>UNIT1_BONUS_DEADLINE)return '📚 Atkārtošanai (bonusperiods beidzies)';
  return '🎁 +10 BP pie vismaz 80%';
 };
 const renderHome=()=>{
  const card=el('section','unit1-panel');
  add(card,el('h3','','Tavas 5 dienu misijas'));
  add(card,el('p','unit1-muted','Katru dienu sākumā mācies, pēc tam pārbaudi savas zināšanas. Bonusam jāizpilda vismaz 80% patstāvīgajā daļā.'));
  const grid=el('div','unit1-days');
  for(const d of UNIT1_DAYS){
   const item=el('article','unit1-day-card');
   const row=el('div','unit1-between');
   add(row,el('strong','',d.icon+' '+monthDay(d.date)+' · '+d.title),el('span','unit1-date',d.date===dayNow?'ŠODIEN':''));
   add(item,row,el('p','unit1-focus',d.focus),el('p','unit1-muted',labelStatus(d)));
   const isLocked=d.date>dayNow&&dayNow<UNIT1_NPD_DATE;
   const start=button(isLocked?'Vēl nav atvērts':completed.has(unit1MissionId(d.date))?'Atkārtot misiju →':'Sākt misiju →',
    ()=>switchDay(d.date),'unit1-btn');
   start.disabled=isLocked;add(item,start);add(grid,item);
  }
  add(card,grid);
  const scoring=el('details','unit1-rubric');
  const summary=el('summary','','Kāds būs pārbaudes darbs? · 52 punkti');add(scoring,summary);
  const table=el('div','unit1-rubric-list');
  UNIT1_RUBRIC.forEach((r,i)=>add(table,el('p','',(i+1)+'. '+r.name+' — '+String(r.points).replace('.',',')+' p.'+(r.manual?' (pārbauda skolotājs/vecāks)':''))));
  add(scoring,table,el('p','unit1-muted','Rakstīšanas kritēriju dokumentā norādīti 9 p., bet detalizēti aprakstīts tikai 1 punkts par katru pilnīgi pareizu teikumu. Atlikušo 2 punktu precizējums skolotājam nav norādīts.'));
  add(card,scoring);
  add(root,card);
 };
 const readOut=text=>{
  speakEnglish(text);
 };
 const lessonCards=(pairs)=>{
  const grid=el('div','unit1-flashcards');
  pairs.forEach(({front,back,example,voice})=>{
   const card=el('article','unit1-flashcard');
   add(card,el('strong','',front));
   const reveal=button('Atklāt atbildi',()=>{
    reveal.replaceWith(el('div','unit1-flash-answer',back+(example?' · '+example:'')));
   },'unit1-btn ghost');
   add(card,reveal);
   if(voice)add(card,button('🔊 Izruna',()=>readOut(voice),'unit1-btn ghost'));
   add(grid,card);
  });
  return grid;
 };
 const renderLesson=()=>{
  const day=UNIT1_DAYS.find(d=>d.date===activeDate);
  add(root,nav('MĀCĀMIES · '+monthDay(day.date)));
  const box=el('section','unit1-panel');
  add(box,el('h3','',day.icon+' '+day.title),el('p','unit1-muted',day.intro));
  add(box,el('p','unit1-materials','📘 Skolas materiāli: '+day.materials));
  if(activeDate===DAY1){
   add(box,el('p','','Iemācies visus 15 priekšmetus. Iegaumē: trainers, headphones, jeans un sunglasses ir daudzskaitlī.'));
   add(box,lessonCards(NEW_WORDS.map(x=>({front:x.icon+' '+x.lv,back:x.en,example:x.plural?'Daudzskaitlis → are':'Vienskaitlis → is',voice:x.en}))));
  }else if(activeDate===UNIT1_DAYS[1].date){
   add(box,el('p','','Valstis un tautības angļu valodā raksta ar lielo sākumburtu: Latvia → Latvian.'));
   add(box,lessonCards(UNIT1_COUNTRIES.map(x=>({front:x[3]+' '+x[0],back:x[1]+' → '+x[2],voice:x[1]+'. '+x[2]}))));
  }else if(activeDate===UNIT1_DAYS[2].date){
   const table=el('div','unit1-pronouns');
   [['I','am','am not'],['you (tu)','are','are not / aren’t'],['he / she / it','is','is not / isn’t'],['we','are','are not / aren’t'],['you (jūs)','are','are not / aren’t'],['they','are','are not / aren’t']].forEach(r=>add(table,el('p','',r[0]+' → '+r[1]+' → '+r[2])));
   add(box,el('h4','','BE Present Simple · Apgalvojums un noliegums'),table,
     el('p','unit1-tip','Atceries: I am, you are, he/she/it is, we are, you are, they are. Noliegumā pievieno not.'));
  }else if(activeDate===UNIT1_DAYS[3].date){
   add(box,el('h4','','BE jautājumi un īsās atbildes'),
     el('p','','You are ready. → Are you ready? → Yes, I am. / No, I am not.'),
     el('p','','She is German. → Is she German? → Yes, she is. / No, she isn’t.'),
     el('p','','They are students. → Are they students? → Yes, they are. / No, they aren’t.'),
     el('p','unit1-tip','Jautājumā am/is/are pārvieto teikuma sākumā. Īsajā atbildē atkārto atbilstošo vietniekvārdu un be formu.'));
  }else{
   add(box,el('h4','','Pirms finiša'),el('p','','NPD simulācijā ir astoņas objektīvo uzdevumu daļas (43 p.) un 7 teikumu apraksts (9 p., nepieciešama pieaugušā pārbaude).'));
   add(box,el('p','unit1-tip','SB 19. lpp. “Teen Forum” ir mācību grāmatā. Šeit izmantojam pašveidotu līdzīga veida lasīšanas un klausīšanās tekstu — nevis oriģinālās grāmatas tekstu.'));
   add(box,el('p','','Aprakstā izmanto vismaz dažas no šīm konstrukcijām: My favourite person is… / He is… / She is not… / We are… / I am…'));
  }
  add(box,button('Esmu gatavs — sākt patstāvīgo pārbaudi →',()=>{phase='exam';step=0;persist();render();},'unit1-btn primary'));
  add(root,box);
 };
 const itemsForDay=()=>dayQuestions(activeDate);
 const partsForDay=()=>{
  if(activeDate===TEST_DAY)return [...UNIT1_MOCK,{key:'writing',title:'9. Rakstīšana: 7 teikumi',max:9,description:'Apmēram 50 vārdi. Šo daļu vērtē pieaugušais.',items:[]}];
  return itemsForDay().map((item,i)=>({key:item.id,title:'Jautājums '+(i+1),max:item.points,description:'Vienu uzdevumu vienlaikus',items:[item]}));
 };
 const renderQuestion=(parent,q)=>{
  const block=el('div','unit1-question');
  add(block,el('label','unit1-prompt',q.prompt));
  const current=answers[q.id]||'';
  if(Array.isArray(q.options)&&q.options.length){
   const choices=el('div','unit1-options');
   // Fixed stable order with rotating offsets, so correct answer is not always first.
   const offset=(q.id.split('').reduce((a,x)=>a+x.charCodeAt(0),0)%q.options.length);
   const ordered=[...q.options.slice(offset),...q.options.slice(0,offset)];
   ordered.forEach(opt=>{
    const b=button(opt,()=>{
     answers[q.id]=opt;
     choices.querySelectorAll('button').forEach(btn=>{
      btn.classList.toggle('chosen',btn.textContent===opt);
      btn.setAttribute('aria-pressed',String(btn.textContent===opt));
     });
     persist();
    },'unit1-choice'+(current===opt?' chosen':''));
    b.setAttribute('aria-pressed',String(current===opt));add(choices,b);
   });
   add(block,choices);
  }else{
   const input=el('input','unit1-answer');
   input.type='text';input.value=current;input.placeholder='Ieraksti angļu valodā…';input.autocomplete='off';
   input.setAttribute('aria-label',q.prompt);
   input.oninput=()=>{answers[q.id]=input.value;persist();};
   add(block,input);
  }
  add(parent,block);
 };
 const renderWriting=parent=>{
  const instructions=el('div','unit1-writing-instructions');
  add(instructions,el('h4','','Uzraksti par sev svarīgu cilvēku vai lietu'),
    el('p','','Uzraksti 7 pilnus teikumus (~50 vārdi). Izmanto am/is/are, noliegumu un vārdus, ko esi iemācījies.'),
    el('p','unit1-muted','Šie teikumi netiek atzīmēti kā pareizi automātiski. Pārbaudi ar vecāku: lielais sākumburts, pareizrakstība un pieturzīme.'));
  add(parent,instructions);
  const meter=el('p','unit1-word-meter','');
  const update=()=>{const amount=writing.reduce((n,x)=>n+countUnit1Words(x),0);meter.textContent='Uzrakstīti '+amount+' vārdi · aizpildīti '+writing.filter(x=>x.trim()).length+'/7 teikumi · mērķis ~50 vārdi.';};
  for(let i=0;i<7;i++){
   const line=el('label','unit1-writing-line');
   add(line,el('span','','Teikums '+(i+1)));
   const input=el('textarea','unit1-answer');input.rows=2;input.value=writing[i];
   input.placeholder='Uzraksti pilnu teikumu angliski.';
   input.oninput=()=>{writing[i]=input.value;update();persist();};
   add(line,input);add(parent,line);
  }
  update();add(parent,meter);
 };
 const renderExam=()=>{
  const day=UNIT1_DAYS.find(d=>d.date===activeDate);
  const parts=partsForDay();
  step=Math.max(0,Math.min(step,parts.length-1));
  const part=parts[step];
  add(root,nav('PĀRBAUDU SEVI · '+monthDay(day.date)));
  const main=el('section','unit1-panel unit1-quiz');
  const top=el('div','unit1-between');
  add(top,el('h3','',day.icon+' '+day.title),el('strong','',String(step+1)+' / '+parts.length));
  add(main,top);
  const progress=el('div','unit1-progress');const bar=el('span');bar.style.width=(100*(step+1)/parts.length)+'%';add(progress,bar);add(main,progress);
  const panel=el('article','unit1-exam-card');
  add(panel,el('h4','',part.title),el('p','unit1-muted',part.description));
  if(part.content){
   const excerpt=el('section','unit1-reading');
   part.content.split('\n\n').forEach((p,i)=>add(excerpt,el('p','',(i+1)+'. '+p)));
   add(panel,excerpt);
  }
  if(part.audio){
   add(panel,el('p','unit1-tip','🎧 Noklausies stāstu. Šis ir oriģināls mācību teksts, ko nolasa ierīces angļu balss.'));
   add(panel,button('🔊 Klausīties angliski',()=>readOut(part.audio),'unit1-btn primary'));
   add(panel,button(showTranscript?'Paslēpt transkriptu':'Parādīt transkriptu, ja audio nav pieejams',()=>{
    showTranscript=!showTranscript;render();
   },'unit1-btn ghost'));
   if(showTranscript)add(panel,el('p','unit1-reading',part.audio));
  }
  if(part.key==='writing')renderWriting(panel);
  else part.items.forEach(q=>renderQuestion(panel,q));
  add(main,panel);
  const controls=el('div','unit1-controls');
  const prev=button('← Iepriekšējais',()=>{step=Math.max(0,step-1);persist();render();},'unit1-btn ghost');prev.disabled=step===0;add(controls,prev);
  if(step<parts.length-1)add(controls,button('Nākamais →',()=>{step++;showTranscript=false;persist();render();},'unit1-btn primary'));
  else {
   const send=button(submitting?'Saglabāju…':'Pabeigt un saglabāt rezultātu →',submit,'unit1-btn primary');
   send.disabled=submitting;add(controls,send);
  }
  add(main,controls);
  if(saveStatus)add(main,el('p','unit1-status',saveStatus));
  add(root,main);
 };
 const submit=async()=>{
  if(submitting)return;
  const day=UNIT1_DAYS.find(d=>d.date===activeDate);
  const questions=itemsForDay();
  const result=scoreUnit1(questions,answers);
  const filled=writing.filter(x=>x.trim()).length;
  if(activeDate===TEST_DAY&&filled!==7){
   saveStatus='Lai pabeigtu simulāciju, uzraksti visus 7 teikumus. Rakstīšanas pareizību pārbaudīs pieaugušais.';
   render();return;
  }
  if(!canSubmit||typeof saveProgress!=='function'){
   saveStatus='Priekšskatījums: rezultāts netiek iesniegts.';render();return;
  }
  submitting=true;saveStatus='Saglabāju rezultātu…';render();
  const eligible=unit1DailyCanBonus(activeDate,dayNow,result.percent,filled);
  const payload={
   studentRole:'marks',subject:'Angļu valoda',subjectId:'english',
   activityType:activeDate===TEST_DAY?'Unit 1 · 43 p. objektīvā daļa un rakstīšana · exam':'Unit 1 · '+monthDay(activeDate)+' · exam',
   topicId:unit1TopicId(activeDate),mode:'exam',score:result.percent,
   notes:JSON.stringify({
    missionId:unit1MissionId(activeDate),mode:'exam',
    objectivePoints:result.earned,objectiveMax:result.max,
    writingPendingReview:activeDate===TEST_DAY,writingSentences:activeDate===TEST_DAY?writing:null,
    writingWordCount:activeDate===TEST_DAY?writing.reduce((n,x)=>n+countUnit1Words(x),0):null,
    bonusRequirementMet:eligible,bonusAmount:10
   })
  };
  try{
   const id=await saveProgress(payload);
   if(!id)throw Error('Saglabāšana netika apstiprināta.');
   saved=true;examResult={...result,filled,eligible};submitting=false;saveStatus='';
   if(eligible)completed.add(unit1MissionId(activeDate));
   phase='result';persist();render();
  }catch(err){
   submitting=false;
   saveStatus='⚠️ Rezultāts vēl nav apstiprināti saglabāts. Vari mēģināt nosūtīt vēlreiz. '+(err?.message||'');
   render();
  }
 };
 const renderResult=()=>{
  add(root,nav('MISIJAS REZULTĀTS'));
  const panel=el('section','unit1-panel');
  const result=examResult||scoreUnit1(itemsForDay(),answers);
  add(panel,el('h3','','🎉 Tavs patstāvīgais rezultāts'));
  add(panel,el('p','unit1-big-score',result.earned+' / '+result.max+' p. · '+result.percent+'%'));
  if(activeDate===TEST_DAY){
   add(panel,el('p','','Izmēģinājuma NPD: '+result.earned+'/43 p. objektīvajos uzdevumos. Rakstīšana — vēl 9 p., kurus piešķir skolotājs/vecāks pēc pārbaudes. Kopējais vērtējums no 52 p. pašlaik nav noteikts.'));
  }
  const mistakes=itemsForDay().filter(item=>!isUnit1Correct(item,answers[item.id]||''));
  if(mistakes.length){
   const review=el('details','unit1-rubric');
   add(review,el('summary','','🔎 Kļūdu laboratorija · '+mistakes.length+' uzdevumi atkārtošanai'));
   mistakes.slice(0,15).forEach(item=>{
    const line=el('div','unit1-review-item');
    add(line,el('strong','',item.prompt),el('p','unit1-muted','Tava atbilde: '+(answers[item.id]||'—')),
      el('p','','Pareizā atbilde: '+item.answer));
    add(review,line);
   });
   if(mistakes.length>15)add(review,el('p','unit1-muted','Vēl '+(mistakes.length-15)+' uzdevumi pārskatāmi, atkārtoti izpildot misiju.'));
   add(panel,review);
  }
  if(result.eligible)add(panel,el('p','unit1-success','✅ +10 BP bonusa nosacījumi sasniegti. Faktiski ieskaitītos BP apskati LEVEL UP kvītī.'));
  else add(panel,el('p','unit1-muted','Bonuss tiek piešķirts vienu reizi pie vismaz 80%, iesniedzot atbilstošā periodā. Vari atkārtot treniņu.'));
  add(panel,button('Izvēlēties nākamo dienu →',()=>{phase='home';persist();render();},'unit1-btn primary'));
  add(panel,button('Atkārtot šo dienu',()=>switchDay(activeDate),'unit1-btn ghost'));
  add(root,panel);
 };
 function render(){
  shell();
  if(phase==='home')renderHome();
  else if(phase==='learn')renderLesson();
  else if(phase==='exam')renderExam();
  else renderResult();
 }
 render();
 return {cleanup(){try{window.speechSynthesis?.cancel();}catch{}}};
}
