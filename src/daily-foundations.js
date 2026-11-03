import {getDailyFoundations,foundationWeekId,FOUNDATION_LABELS,foundationScore} from './daily-foundations-data.js';

const el=(tag,text='',cls='')=>{const node=document.createElement(tag);node.textContent=text;if(cls)node.className=cls;return node;};
const add=(parent,...children)=>{parent.append(...children);return parent;};
const button=(label,fn,cls='db-btn')=>{const b=el('button',label,cls);b.type='button';b.onclick=fn;return b;};
const percent=(n,total)=>Math.round(100*n/total);
const partName=part=>FOUNDATION_LABELS[part]||part;
const PARTS=['language','math','nut'];
const STEPS=['facts','question','firstOperation','firstAnswer','secondOperation','answer'];
const OP_LABELS={multiply:'Reizināt (×)',add:'Saskaitīt (+)',subtract:'Atņemt (−)',divide:'Dalīt (÷)'};
const todayKey=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const safeText=x=>String(x??'').trim();
const isNumeric=x=>/^-?\d+$/.test(safeText(x));
export function renderDailyFoundations(container,{role='marks',today=todayKey(),initialPart=null,initialState=null,completedToday={},canSubmit=true,saveProgress=async()=>null,onCheckpoint=()=>{},askAI=null}={}){
 const date=typeof today==='string'?today:todayKey(),mission=getDailyFoundations(role,date);
 const saved=initialState?.date===date&&initialState?.role===role?initialState:null;
 let part=PARTS.includes(initialPart)?initialPart:PARTS.includes(saved?.part)?saved.part:'home';
 let values=saved?.values&&typeof saved.values==='object'?structuredClone(saved.values):{language:{},math:{},nut:{facts:[]}};
 for(const key of PARTS){if(!values[key])values[key]=key==='nut'?{facts:[]}:{};}
 let step=Math.max(0,Math.min(5,Number(saved?.step)||0));
 let attempts=saved?.attempts&&typeof saved.attempts==='object'?{...saved.attempts}:{};
 let firstTry=saved?.firstTry&&typeof saved.firstTry==='object'?{...saved.firstTry}:{};
 let completed={...(saved?.completed&&typeof saved.completed==='object'?saved.completed:{}),...completedToday};
 let showReadingHelp=false;
 let message='',working=false,aiText='',reason=saved?.reason||'';
 const root=el('div','','db-root');container.replaceChildren(root);
 const style=el('style');style.textContent=`
.db-root{color:#17304a!important;color-scheme:light;font:inherit;line-height:1.65;max-width:990px;margin:0 auto}
.db-root *{box-sizing:border-box}
.db-root .db-box{background:#fff!important;color:#17304a!important;border:2px solid #d4e2ef;border-radius:20px;padding:clamp(16px,3vw,28px);margin:14px 0}
.db-root .db-hero{background:linear-gradient(120deg,#eaf7ff,#edfaee)!important;border-color:#8dbcb4}
.db-root h2,.db-root h3,.db-root h4{color:#17304a!important;margin:5px 0 10px;line-height:1.35}
.db-root h2{font-size:clamp(1.6rem,3.2vw,2.1rem)}.db-root h3{font-size:1.34rem}
.db-root p,.db-root label,.db-root span,.db-root strong{color:#17304a!important}
.db-root p{margin:8px 0;font-size:1.03rem}
.db-root .db-sub{color:#48657f!important}
.db-root .db-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px}
.db-root .db-tile{border:2px solid #ccddeb;border-radius:14px;padding:18px;background:#f7fbff!important}
.db-root .db-btn{border:2px solid #14634d!important;border-radius:12px;background:#146b56!important;color:white!important;font:inherit;font-size:1rem;font-weight:750;min-height:49px;padding:10px 16px;cursor:pointer;max-width:100%;white-space:normal}
.db-root .db-btn.secondary{background:#fff!important;color:#155c50!important;border-color:#88b9ab!important}
.db-root .db-btn:focus-visible,.db-root input:focus-visible,.db-root textarea:focus-visible{outline:3px solid #2a8cc8;outline-offset:2px}
.db-root .db-btn:disabled{opacity:.45;cursor:wait}
.db-root .db-choice{background:#f9fcff!important;color:#183149!important;border:2px solid #96adc6!important;text-align:left;width:100%;margin:5px 0}
.db-root .db-choice.selected{background:#dbf6e6!important;border-color:#0b7055!important}
.db-root .db-input,.db-root textarea{display:block;background:#fff!important;color:#163149!important;border:2px solid #779bb5!important;border-radius:12px;font:inherit;font-size:1.16rem;padding:12px;min-height:52px;width:100%;margin:8px 0 14px}
.db-root .db-question{border-top:1px solid #dce7f0;padding:14px 0}
.db-root .db-question label{display:block;font-weight:800;font-size:1.13rem}
.db-root .db-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:15px 0}
.db-root .db-alert{background:#fff4df;border-left:5px solid #cc8e17;border-radius:8px;padding:12px}
.db-root .db-good{background:#e5f9ee;border-left:5px solid #158056;border-radius:8px;padding:12px}
.db-root .db-progress{height:12px;background:#dce6f1;border-radius:20px;overflow:hidden;margin:10px 0}
.db-root .db-progress span{display:block;height:100%;background:#17916f;border-radius:20px}
.db-root .db-reading{background:#f0f7ff!important;border-left:5px solid #337fae;border-radius:12px;padding:20px;font-size:1.25rem!important;line-height:1.85;letter-spacing:.01em}
.db-root .db-fact{display:block;border:2px solid #adbed0;border-radius:12px;margin:7px 0;padding:12px;cursor:pointer;background:#fbfdff!important;font-size:1.06rem}
.db-root .db-fact.checked{border-color:#117759;background:#e0f7eb!important}
.db-root .db-step{font-weight:800;color:#36667e!important}
.db-root .db-math-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.db-root .db-math-grid .db-question{border:1px solid #d2e0ed;border-radius:12px;padding:14px}
.db-root .db-math-grid input{max-width:190px}
@media(max-width:600px){.db-root .db-math-grid{grid-template-columns:1fr}.db-root .db-box{padding:15px}}
`;
 const persist=()=>onCheckpoint({date,role,part,values,step,attempts,firstTry,completed,reason});
 const navigate=target=>{part=target;message='';aiText='';persist();render();};
 const shell=()=>{
  root.replaceChildren(style);
  const hero=el('section','','db-box db-hero');
  add(hero,el('span','📅 '+date+' · IKDIENAS PAMATPRASMES','db-step'),el('h2','Katru dienu mazliet stiprāks'));
  add(hero,el('p','Lasām ar izpratni, rakstām, rēķinām un risinām. Aptuveni 15–25 minūtes; vari pildīt pa daļām.','db-sub'));
  add(root,hero);
  if(part!=='home')add(root,button('← Visas dienas misijas',()=>navigate('home'),'db-btn secondary'));
 };
 const home=()=>{
  const section=el('section','','db-box');
  add(section,el('h3','Šodienas trīs mazie izaicinājumi'));
  const grid=el('div','','db-grid');
  for(const id of PARTS){
   const d=completed[id],item=el('article','','db-tile');
   add(item,el('h3',({language:'📖 ',math:'🧮 ',nut:'🥜 '})[id]+partName(id)));
   add(item,el('p',({language:'Izlasi īsu tekstu, atbildi un ieraksti trūkstošo burtu.',math:'Astoņi piemēri: +, −, ×, ÷.',nut:'Atrodi dotos, saproti jautājumu, izvēlies darbības, aprēķini.'})[id]));
   add(item,el('p',d?'✅ Pabeigts · '+d.score+'%':'Vēl priekšā · var turpināt vēlāk'));
   add(item,button(d?'Atkārtot →':'Sākt →',()=>navigate(id)));
   add(grid,item);
  }
  add(section,grid,el('p','db-sub','MI konsultants pēc darba var pārskatīt tavu skaidrojumu. Punktus aprēķina programma, nevis MI.'));
  add(root,section);
 };
 const choose=(parent,list,key,answerValue,allowMultiple=false)=>{
  const current=values[part][key];
  const options=el('div');
  for(const entry of list){
   const value=typeof entry==='string'?entry:entry.id,label=typeof entry==='string'?entry:entry.label;
   const selected=allowMultiple?Array.isArray(current)&&current.includes(value):current===value;
   const b=button((selected?'✓  ':'')+label,()=>{
    if(allowMultiple){
     const a=new Set(values[part][key]||[]);if(a.has(value))a.delete(value);else a.add(value);values[part][key]=[...a];
    }else values[part][key]=value;
    message='';persist();render();
   },'db-btn db-choice'+(selected?' selected':''));
   b.setAttribute('aria-pressed',String(selected));add(options,b);
  }
  add(parent,options);
 };
 const input=(parent,key,label,numeric=false)=>{
  const l=el('label',label);l.setAttribute('for','basic-'+key);
  const field=el('input','','db-input');field.id='basic-'+key;field.type=numeric?'number':'text';field.inputMode=numeric?'numeric':'text';
  field.autocomplete='off';field.spellcheck=false;field.value=values[part][key]??'';
  field.oninput=()=>{values[part][key]=field.value;persist();};
  add(parent,l,field);return field;
 };
 const result=async(score)=>{
  if(working)return;working=true;message='Saglabāju…';render();
  const topicId='daily-basics-'+part+'-week-'+foundationWeekId(date);
  const subjectId=part==='language'?'language':'math';
  const data={studentRole:role,subject:subjectId==='math'?'Matemātika':'Latviešu valoda',subjectId,topicId,
   activityType:'Ikdienas pamatprasmes · '+partName(part)+' · exam',score,
   notes:JSON.stringify({mode:'exam',dailyFoundationDate:date,dailyFoundationPart:part,topicId,scoreSource:'deterministic',maxStreak:0})};
  if(!canSubmit){working=false;completed[part]={score,preview:true};message='Priekšskatījums: rezultāts netika iesniegts.';persist();render();return;}
  try{const savedId=await saveProgress(data);if(!savedId)throw Error('Saglabāšana netika apstiprināta.');
    completed[part]={score};message='✅ Pabeigts! Rezultāts saglabāts: '+score+'%.';
  }catch(e){message='⚠️ Rezultāts nav apstiprināti saglabāts: '+(e?.message||'Mēģini vēlreiz.');}
  working=false;persist();render();
 };
 const explain=parent=>{
  const block=el('section','','db-box');
  add(block,el('h3','🤖 MI konsultants pārbauda tavu domu gaitu'));
  add(block,el('p','Pastāsti vienā vai divos teikumos, kā tu saprati uzdevumu. MI sniegs ieteikumu, bet nemainīs aprēķināto rezultātu.'));
  add(block,el('p','Raksti tikai par uzdevumu — neievadi savu uzvārdu, kontaktus vai citu privātu informāciju.','db-sub'));
  const field=el('textarea','','db-input');field.value=reason;field.rows=3;field.placeholder='Es vispirms atradu… Pēc tam…';field.maxLength=450;
  field.oninput=()=>{reason=field.value;persist();};add(block,field);
  const ask=button(working?'Pārbaudu…':'Pārbaudīt skaidrojumu ar MI',async()=>{
    if(reason.trim().length<12){aiText='Uzraksti vismaz vienu īsu teikumu par savu domu gaitu.';render();return;}
    if(typeof askAI!=='function'){aiText='MI nav pieslēgts. Pārbaudi, vai izvēlējies visus dotos un pareizās darbības.';render();return;}
    working=true;aiText='MI pārskata skaidrojumu…';render();
    try{const reply=await askAI({part,date,explanation:reason.trim().slice(0,450)});
       aiText=typeof reply==='string'?reply:(reply?.reply||'MI nesniedza atbildi.');
    }catch(e){aiText='MI pašlaik nav pieejams. Tavs darbs un aprēķinātais rezultāts ir saglabāts.';}
    working=false;render();
  },'db-btn secondary');ask.disabled=working;add(block,ask);
  if(aiText)add(block,el('p',aiText,'db-alert'));add(parent,block);
 };
 const finish=parent=>{
  if(!completed[part])return;
  add(parent,el('p','✅ '+partName(part)+': '+completed[part].score+'%. '+(completed[part].preview?'Priekšskatījuma režīms.':'Saglabāts.'),'db-good'));
  if(part==='nut'||part==='language')explain(parent);
  add(parent,button('← Atgriezties pie pārējiem izaicinājumiem',()=>navigate('home'),'db-btn secondary'));
 };
 const renderMath=()=>{
  const box=el('section','','db-box');add(box,el('h3','🧮 '+partName(part)),el('p','Astoņi īsi aprēķini. Neizmanto kalkulatoru. Atbildes ieraksti patstāvīgi.'));
  const grid=el('div','','db-math-grid');
  for(const q of mission.math){const card=el('div','','db-question');input(card,q.id,q.prompt,true);add(grid,card);}
  add(box,grid);
  add(box,button('Pārbaudīt visus 8 piemērus',()=>{if(mission.math.every(q=>isNumeric(values.math[q.id]))){const s=foundationScore('math',mission,values.math);result(percent(s.correct,s.total));}else{message='Vispirms ieraksti atbildes visos astoņos piemēros.';render();}},'db-btn'));
  if(completed.math){const errors=mission.math.filter(q=>String(values.math[q.id]??'').trim()!==String(q.answer));
   if(errors.length)add(box,el('p','db-alert','Jāpatrenē: '+errors.map(q=>q.prompt.replace('?',String(q.answer))).join(' · ')));
  }
  if(message)add(box,el('p',message,'db-alert'));finish(box);add(root,box);
 };
 const renderLanguage=()=>{
  const box=el('section','','db-box');
  add(box,el('h3','📖 '+partName(part)),el('p','Lasi lēni un saproti. Drīksti pārlasīt vairākas reizes.'));
  add(box,el('h4',mission.language.title),el('p',mission.language.text,'db-reading'));
  if(role==='samanta'){
   add(box,button(showReadingHelp?'Paslēpt lasīšanas palīdzību':'🔎 Lasīt pa teikumiem',()=>{showReadingHelp=!showReadingHelp;render();},'db-btn secondary'));
   if(showReadingHelp){
    const helper=el('div','','db-box');add(helper,el('h4','Lasām soli pa solim'));
    mission.language.text.split(/\.\s*/).map(t=>t.trim()).filter(Boolean).forEach((sentence,i)=>add(helper,el('p',(i+1)+'. '+sentence+'.','db-reading')));
    add(helper,el('p','Grūtā vārda zilbes: '+mission.language.syllables,'db-sub'));add(box,helper);
   }
  }
  mission.language.questions.forEach(q=>{
   const card=el('div','','db-question');add(card,el('h4',q.prompt));
   if(q.options)choose(card,q.options,q.id);
   else input(card,q.id,'Uzraksti trūkstošo burtu',false);
   add(box,card);
  });
  add(box,button('Pārbaudīt lasīšanu un rakstīšanu',()=>{
   if(!mission.language.questions.every(q=>safeText(values.language[q.id])!=='')){message='Izlasi tekstu un atbildi uz visiem trim jautājumiem.';render();return;}
   const s=foundationScore('language',mission,values.language);result(percent(s.correct,s.total));
  }));
  if(completed.language){const errors=mission.language.questions.filter(q=>safeText(values.language[q.id]).toLocaleLowerCase('lv')!==q.answer.toLocaleLowerCase('lv'));
   if(errors.length)add(box,el('p','db-alert','Atkārto: '+errors.map(q=>q.prompt+' → '+q.answer).join(' · ')));
  }
  if(message)add(box,el('p',message,'db-alert'));finish(box);add(root,box);
 };
 const expectedCorrect=n=>{
  const a=values.nut,ref=mission.nut;
  if(n===0)return Array.isArray(a.facts)&&a.facts.length===3&&ref.needed.every(id=>a.facts.includes(id));
  if(n===1)return a.question===ref.question;
  if(n===2)return a.firstOperation===ref.firstOperation;
  if(n===3)return isNumeric(a.firstAnswer)&&Number(a.firstAnswer)===ref.firstAnswer;
  if(n===4)return a.secondOperation===ref.secondOperation;
  return isNumeric(a.answer)&&Number(a.answer)===ref.answer;
 };
 const nut=()=>{
  const n=mission.nut,box=el('section','','db-box');
  add(box,el('h3','🥜 Cietais rieksts'),el('p','Izlasi tekstu. Tev jāatrod svarīgā informācija un jāizvēlas darbības, nevis jāmin gala atbilde.'));
  add(box,el('p',n.story,'db-reading'));
  if(completed.nut){
   add(box,el('p','✅ Cietais rieksts atrisināts. Rezultāts par pirmo patstāvīgo mēģinājumu: '+completed.nut.score+'%.','db-good'));
   add(box,el('p','Risinājuma pārbaude: '+n.explanation,'db-sub'));
   add(box,button('🔁 Risināt šo uzdevumu no sākuma',()=>{
    values.nut={facts:[]};step=0;attempts={};firstTry={};completed.nut=null;reason='';aiText='';message='';persist();render();
   },'db-btn secondary'));
   finish(box);add(root,box);return;
  }
  add(box,el('p','Svarīgi: procentos skaitām pirmos patstāvīgos mēģinājumus. Ja kļūdījies, labo tik ilgi, līdz saproti — tas ir treniņa mērķis.','db-sub'));
  const bar=el('div','','db-progress');const fill=el('span');fill.style.width=percent(step,6)+'%';add(bar,fill);add(box,bar);
  add(box,el('p','Solis '+(step+1)+' no 6','db-step'));
  if(step===0){
   add(box,el('h4','1. Kuri skaitļi un lielumi ir vajadzīgi? Atzīmē visus vajadzīgos dotos.'));
   choose(box,n.facts,'facts',null,true);
  }else if(step===1){add(box,el('h4','2. Kas uzdevumā jāaprēķina?'));choose(box,n.questionOptions,'question');}
  else if(step===2){add(box,el('h4','3. Kādu darbību veiksi vispirms?'));choose(box,n.operations.map(x=>({id:x,label:OP_LABELS[x]})),'firstOperation');}
  else if(step===3){add(box,el('h4','4. '+n.firstStagePrompt));input(box,'firstAnswer','Ieraksti pirmās darbības rezultātu',true);}
  else if(step===4){add(box,el('h4','5. Kādu darbību veiksi otrajā solī?'));choose(box,n.operations.map(x=>({id:x,label:OP_LABELS[x]})),'secondOperation');}
  else{add(box,el('h4','6. '+n.question));input(box,'answer','Ieraksti gala rezultātu',true);}
  const feedback=attempts[step]||0;
  if(feedback>0&&!expectedCorrect(step))add(box,el('p',feedback>=2?
   (['Ievēro: daļa skaitļu stāstā ir lieki.','Atrodi jautājumu uzdevuma beigās.',n.firstHint,n.firstHint,n.secondHint,n.secondHint][step]):
   'Pārskati uzdevuma tekstu un mēģini vēlreiz.','db-alert'));
  add(box,button('Pārbaudīt šo soli →',()=>{
   if(working)return;
   const a=values.nut;
   const hasAnswer=step===0?Array.isArray(a.facts)&&a.facts.length>0:
    step===1?safeText(a.question)!=='':
    step===2?safeText(a.firstOperation)!=='':
    step===3?isNumeric(a.firstAnswer):
    step===4?safeText(a.secondOperation)!=='':isNumeric(a.answer);
   if(!hasAnswer){message='Vispirms izvēlies vai ieraksti savu atbildi. Tukša atbilde netiek skaitīta kā kļūda.';render();return;}
   const correct=expectedCorrect(step);
   if(!Object.hasOwn(firstTry,step))firstTry[step]=correct;
   if(correct){if(step<5){step++;message='';persist();render();}
    else {const score=percent(STEPS.filter((_,i)=>firstTry[i]).length,6);message='Visi soļi izpildīti. Saglabā rezultātu!';persist();result(score);}
   }else {attempts[step]=(attempts[step]||0)+1;message='Vēl nav pareizi. Pārskati teksta dotos un pamēģini vēlreiz.';persist();render();}
  }));
  if(message)add(box,el('p',message,'db-alert'));
  if(completed.nut)add(box,el('p','db-good','Risinājums: '+n.explanation));
  finish(box);add(root,box);
 };
 function render(){shell();if(part==='home')home();else if(part==='math')renderMath();else if(part==='language')renderLanguage();else nut();}
 render();
 return {cleanup(){}};
}
