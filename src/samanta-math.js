import {calculatePracticePoints,previewImprovement} from './points-policy.js';
import {attachTouchNumpad} from './touch-numpad.js';
// Samantas skola — pilns reizrēķina un dalīšanas trenažieris 1–10.
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};

export function makeMathQuestions(type='mixed',family=0,count=12){
 const base=[];
 for(let a=1;a<=10;a++)for(let b=1;b<=10;b++){
  if(family&&a!==family&&b!==family)continue;
  const product=a*b;
  if(type!=='division'&&type!=='visual'&&type!=='story'){
   base.push({key:'m-'+a+'-'+b,kind:'multiply',a,b,answer:product,prompt:a+' × '+b+' = ?',hint:a+' grupas, katrā '+b+' priekšmeti. Kopā ir '+product+'.'});
   base.push({key:'missing-m-'+a+'-'+b,kind:'missing',a,b,answer:b,prompt:a+' × □ = '+product,hint:'Atrodi skaitli, kuru reizinot ar '+a+', iegūst '+product+'.'});
  }
  if(type!=='multiply'&&type!=='visual'&&type!=='story'){
   base.push({key:'d-'+a+'-'+b,kind:'divide',a,b,answer:b,prompt:product+' ÷ '+a+' = ?',hint:'Ja '+product+' sadala '+a+' vienādās grupās, katrā ir '+b+'.'});
   base.push({key:'missing-d-'+a+'-'+b,kind:'missing',a,b,answer:a,prompt:product+' ÷ □ = '+b,hint:'Atrodi dalītāju, kas dod rezultātu '+b+'.'});
  }
 }
 if(type==='visual'||type==='story'){
  const objects=['🍎','⭐','🌼','🦋','🟣'];
  const people=['Samanta','Līga','Anna','Marta','Elza'];
  for(let a=1;a<=10;a++)for(let b=1;b<=10;b++){
   if(family&&a!==family&&b!==family)continue;
   const icon=objects[(a+b)%objects.length],person=people[(a+b)%people.length];
   if(type==='visual'){
    // A maximum of 100 visible objects, with clear groups.
    base.push({key:'v-m-'+a+'-'+b,kind:'visual-multiply',a,b,answer:a*b,prompt:'Cik priekšmetu ir kopā?',icon,hint:a+' grupas pa '+b+' ir '+a*b+'.'});
    base.push({key:'v-d-'+a+'-'+b,kind:'visual-divide',a,b,answer:b,prompt:'Cik priekšmetu ir katrā grupā?',icon,hint:a*b+' priekšmetus sadalot '+a+' vienādās grupās, katrā būs '+b+'.'});
   }else{
    base.push({key:'s-m-'+a+'-'+b,kind:'story-multiply',a,b,answer:a*b,prompt:person+' salika '+a+' groziņus. Katrā groziņā ir '+b+' āboli. Cik ābolu ir kopā?',hint:'Saskaiti '+a+' grupas pa '+b+' āboliem.'});
    base.push({key:'s-d-'+a+'-'+b,kind:'story-divide',a,b,answer:b,prompt:person+' vienādi sadalīja '+a*b+' uzlīmes '+a+' draugiem. Cik uzlīmju saņēma katrs draugs?',hint:'Sadalām '+a*b+' ar '+a+'.'});
   }
  }
 }
 return shuffle(base).slice(0,count);
}
export function renderSamantaMath(container,{canSubmit=false,currentUid='',saveProgress=async()=>{}}={}){
 const storagePrefix=canSubmit&&currentUid?'majas-skola:'+currentUid+':samanta-math:':null;
 const historyKey=storagePrefix+'history-v2';
 function history(){if(!storagePrefix)return [];try{const x=JSON.parse(localStorage.getItem(historyKey)||'[]');return Array.isArray(x)?x.slice(-50):[];}catch{return [];}}
 function store(result){if(!storagePrefix)return;try{localStorage.setItem(historyKey,JSON.stringify([...history(),result].slice(-50)));}catch{}}
 const host=document.createElement('section');host.className='module learning-hub math-hub';host.style.gridColumn='1/-1';container.append(host);
 let session=null,errors=[],currentMode='mixed',family=0;
 function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
 function button(parent,text,action,cls='action-button'){const b=el('button',cls,text);b.type='button';b.onclick=action;parent.append(b);return b;}
 function shell(title,subtitle){host.replaceChildren();const head=el('div','learning-heading');head.append(el('span','eyebrow','✦ SAMANTAS MATEMĀTIKAS LABORATORIJA'),el('h2','',title),el('p','',subtitle));host.append(head);}
 function welcome(){
  shell('Skaitļu piedzīvojums','Reizini, dali un kļūsti arvien drošāka! Te vari mēģināt tik reižu, cik vēlies.');
  const stats=history().filter(x=>x.type);if(stats.length){
   const last=stats.at(-1),row=el('div','stat-strip');row.append(el('span','','🏅 Labākais '+Math.max(...stats.map(x=>x.percent))+'%'),el('span','','📈 Pēdējais '+last.percent+'%'),el('span','','✦ Treniņi '+stats.length));host.append(row);
  }
  const modeRow=el('div','topic-grid');host.append(modeRow);
  for(const [type,icon,title,desc] of [['multiply','✖','Reizrēķins','Skaitļi no 1 līdz 10'],['division','➗','Dalīšana','Dalām tikai bez atlikuma'],['mixed','⚡','Jauktais izaicinājums','Reizināšana un dalīšana kopā'],['visual','🧩','Redzu un skaitu','Uzdevumi ar priekšmetu grupām'],['story','📖','Stāstu uzdevumi','Īsi teksta uzdevumi ar balsi']]){
   const b=el('button','topic-tile');b.type='button';b.append(el('span','topic-emoji',icon),el('strong','',title),el('small','',desc));b.onclick=()=>settings(type);modeRow.append(b);
  }
  if(errors.length){const alert=el('div','soft-notice','🎯 Tev ir '+errors.length+' jautājumi, kurus vari patrenēt vēlreiz.');host.append(alert);button(host,'Trenēt manas kļūdas',()=>start(currentMode,family,'mistakes'));}
  const grid=el('div','table-area');grid.append(el('h3','','🔢 Reizināšanas tabula'));const table=el('div','times-grid');
  for(let a=1;a<=10;a++){const line=el('div','times-line');for(let b=1;b<=10;b++){const cell=el('span','times-cell',String(a*b));cell.title=a+' × '+b;line.append(cell);}table.append(line);}grid.append(table);host.append(grid);
 }
 function settings(type){currentMode=type;shell(type==='multiply'?'✖ Reizrēķins':type==='division'?'➗ Dalīšana':type==='visual'?'🧩 Redzu un skaitu':type==='story'?'📖 Stāstu uzdevumi':'⚡ Jauktais izaicinājums','Izvēlies, ko vēlies patrenēt.');
  const controls=el('div','settings-panel');controls.append(el('label','','Kuru reizināšanas tabulu?'));const select=el('select','select-control');
  for(let i=0;i<=10;i++){const op=el('option','',i===0?'Visas tabulas 1–10':i+'. tabula');op.value=i;select.append(op);}select.value=String(family);select.onchange=()=>{family=Number(select.value)};controls.append(select);host.append(controls);
  const buttons=el('div','button-cluster');host.append(buttons);
  button(buttons,'🌱 Mācos · 8 uzdevumi',()=>start(type,Number(select.value),'learn'));
  button(buttons,'🎯 Trenējos · 12 uzdevumi',()=>start(type,Number(select.value),'practice'));
  button(buttons,'🏆 Pārbaudu sevi · 20 uzdevumi',()=>start(type,Number(select.value),'exam'));
  button(host,'← Visas tēmas',welcome,'quiet-button');
 }
 function start(type,fam,mode){const source=makeMathQuestions(type,fam,mode==='learn'?8:mode==='exam'?20:mode==='mistakes'?Math.min(10,Math.max(4,errors.length*2)):12);
  const previous=new Set(errors.map(q=>q.key));
  // Mistake training uses the same number families but another equation form.
  const related=mode==='mistakes'?errors.flatMap(q=>{
   const all=makeMathQuestions('mixed',0,400);
   return all.filter(x=>x.a===q.a&&x.b===q.b&&!previous.has(x.key));
  }):[];
  const distinct=[...new Map(related.map(q=>[q.key,q])).values()];
  const review=shuffle(distinct).slice(0,10);
  const items=mode==='mistakes'?review.length?review:source.filter(q=>!previous.has(q.key)).slice(0,10):source;
  session={type,fam,mode,items,index:0,correct:0,misses:[],answers:[],began:Date.now()};step();
 }
 function step(){if('speechSynthesis' in window)window.speechSynthesis.cancel();const s=session;if(s.index>=s.items.length){void finish();return;}
  const q=s.items[s.index];shell('Atrisini uzdevumu','Jautājums '+(s.index+1)+' no '+s.items.length);
  const bar=el('div','progress-track');const fill=el('div','progress-fill');fill.style.width=Math.round(s.index/s.items.length*100)+'%';bar.append(fill);host.append(bar);
  const streakLabel=el('div','streak-label','🔥 '+(s.streak||0)+' pareizas atbildes pēc kārtas · Rekords: '+(s.maxStreak||0));host.append(streakLabel);
  const card=el('div','question-stage');card.append(el('span','eyebrow',s.mode==='exam'?'PĀRBAUDES REŽĪMS':'TAVS IZAICINĀJUMS'),el('div',q.kind.startsWith('story')?'story-expression':'math-expression',q.prompt));
  if(q.kind.startsWith('visual')){
   const grid=el('div','visual-groups');grid.setAttribute('role','img');
   grid.setAttribute('aria-label',q.a+' grupas ar '+q.b+' priekšmetiem katrā');
   for(let i=0;i<q.a;i++){const group=el('div','visual-group');for(let j=0;j<q.b;j++)group.append(el('span','visual-object',q.icon));grid.append(group);}
   card.append(grid);
  }
  if(q.kind.startsWith('story')){
   const controls=el('div','reading-controls');
   const read=button(controls,'🔊 Nolasīt uzdevumu',()=>{
    if(!('speechSynthesis' in window)){feedback.textContent='Šajā pārlūkā balss nolasīšana nav pieejama.';return;}
    window.speechSynthesis.cancel();const speech=new SpeechSynthesisUtterance(q.prompt);speech.lang='lv-LV';speech.rate=0.85;speech.pitch=1;
    const available=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('lv'));
    if(available)speech.voice=available;
    window.speechSynthesis.speak(speech);
   },'quiet-button');
   read.setAttribute('aria-label','Nolasīt teksta uzdevumu skaļi');
   button(controls,'⏹ Apturēt',()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel();},'quiet-button');
   card.append(controls);
  }
  const form=el('form','math-answer-form');const inp=el('input','big-number-input');inp.type='number';inp.inputMode='numeric';inp.min='0';inp.max='100';inp.step='1';inp.required=true;inp.placeholder='?';inp.autocomplete='off';inp.setAttribute('aria-label','Tava atbilde');form.append(inp);
  const feedback=el('p','feedback-line');feedback.setAttribute('role','status');
  if(s.mode==='learn')button(card,'💡 Parādi pavedienu',()=>{feedback.textContent=q.kind.includes('multiply')?'Atceries: reizināšana ir atkārtota saskaitīšana.':q.kind.includes('divide')?'Pārbaudi dalīšanu ar reizināšanu.':'Domā, kura darbība jāizpilda.';},'quiet-button');
  const submit=el('button','action-button','Pārbaudīt');submit.type='submit';form.append(submit);card.append(form,feedback);
  const numpad=attachTouchNumpad(card,inp);
  host.append(card);
  inp.focus({preventScroll:true});
  form.onsubmit=e=>{e.preventDefault();const val=Number(inp.value);if(!Number.isInteger(val)||inp.value==='')return;
   const good=val===q.answer;s.correct+=Number(good);s.answers.push({key:q.key,correct:good});s.streak=good?(s.streak||0)+1:0;s.maxStreak=Math.max(s.maxStreak||0,s.streak);if(!good)s.misses.push(q);
   inp.disabled=true;submit.disabled=true;
   numpad.querySelectorAll('button').forEach(b=>b.disabled=true);
   feedback.textContent=s.mode==='exam'?'Atbilde pieņemta.':good?'✅ Pareizi! Tu to paveici!':'🔍 Vēl ne. '+q.hint;
   button(card,s.index+1===s.items.length?'Skatīt rezultātu →':'Nākamais →',()=>{s.index++;step();});
  };
 }
 async function finish(){const s=session,pct=Math.round(s.correct/s.items.length*100);errors=s.misses;currentMode=s.type;family=s.fam;
  shell('Tavs rezultāts','Katrs mēģinājums palīdz kļūt drošākai.');
  host.append(el('div','result-hero',pct+'%'),el('p','result-subtitle',s.correct+' pareizi no '+s.items.length+' uzdevumiem'));
  const weak=el('div','soft-notice',s.misses.length?'Visvairāk jānostiprina '+(s.type==='multiply'?'reizināšana':s.type==='division'?'dalīšana':'dažas reizināšanas un dalīšanas darbības')+'.':'🌟 Visas atbildes pareizas!');
  host.append(weak);
  const policy=calculatePracticePoints({correct:s.correct,total:s.items.length,maxStreak:s.maxStreak||0,mode:s.mode});
  const key=storagePrefix+'best-'+s.type+'-'+s.fam;let previous=0;if(storagePrefix)try{previous=Number(localStorage.getItem(key))||0;}catch{}
  const award=previewImprovement(previous,policy.potential);
  const row={type:s.type,mode:s.mode,percent:pct,correct:s.correct,total:s.items.length,date:new Date().toISOString(),streak:s.maxStreak||0,pointsPreview:award.earned,pointsPotential:policy.potential};
  const pts=el('div','soft-notice',policy.eligible?'🏅 Šī mēģinājuma punktu potenciāls: '+policy.potential+'/20 · Jauns uzlabojums: +'+award.earned+' treniņa BP · Sērijas bonuss: '+policy.streakBonus:'🌱 Šis ir mācību režīms — bez balvu punktiem.');host.append(pts);
  const disclaimer=el('p','points-disclaimer','Treniņa BP pagaidām ir informatīvi. Balvu makam tos nepieskaita, līdz ir droša servera vērtēšana.');host.append(disclaimer);
  const status=el('p','save-status');host.append(status);
  if(canSubmit){try{const id=await saveProgress({studentRole:'samanta',subject:'Matemātika',activityType:'Reizrēķins un dalīšana · '+s.type+' · '+s.mode,score:pct,notes:JSON.stringify(row)});if(id){store(row);if(storagePrefix)try{localStorage.setItem(key,String(award.best));}catch{};status.textContent='✅ Rezultāts saglabāts.';}else status.textContent='⚠️ Saglabāšanu nevarēja apstiprināt.';}catch{status.textContent='⚠️ Firebase saglabāšana neizdevās. Rezultāts paliek šīs pārlūkprogrammas vēsturē.';}}
  else status.textContent='Vecāka priekšskatījums — rezultāts netiek ieskaitīts.';
  const actions=el('div','button-cluster');host.append(actions);
  if(s.misses.length){button(actions,'🎯 Trenēt manas kļūdas',()=>start(s.type,s.fam,'mistakes'));button(actions,'Vēlāk',welcome,'quiet-button');}
  button(actions,'Mēģināt vēlreiz',()=>start(s.type,s.fam,s.mode));button(actions,'← Uz sākumu',welcome,'quiet-button');
 }
 welcome();
}
