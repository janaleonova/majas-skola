import {attachTouchNumpad} from './touch-numpad.js';
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
export {makeMarksMathBank} from './math-bank.js';
import {makeMarksMathBank} from './math-bank.js';
export function renderMarksMath(root,{canSubmit=false,startVerifiedSession=null,gradeVerifiedSession=null,saveProgress=async()=>{},initialState=null,onCheckpoint=()=>{}}={}){
 const host=document.createElement('section');host.className='module learning-hub marks-math';root.append(host);
 const topics=[['multiply','⚔️ Reizrēķins','Reizināšana 1–10, rezultāti līdz 100'],['divide','🛡️ Dalīšana','Dalīšana bez atlikuma'],['family','🔗 Saistītais pieraksts','Darbību secība, iekavas un kombinētās izteiksmes (4. klase)'],['story','🐉 Teksta misijas','Uzdevumi ar kristālu grupām']];
 const el=(tag,value,third)=>{const e=document.createElement(tag);if(third!==undefined){e.className=value||'';e.textContent=third;}else if(value!==undefined)e.textContent=value;return e;};
 const btn=(parent,txt,fn)=>{const b=el('button',txt);b.type='button';b.className='action-button';b.onclick=fn;parent.append(b);return b;};
 let chosen='',mode='',items=[],position=0,correct=0,streak=0,record=0,errors=[],entered=[],sessionToken=null,sessionError='';
 let speedDeadline=0,speedTimer=null,answerTimer=null;
 let automatedCount=0,reactionTimes=[],qStartTime=0;
 const stopAnswerTimer=()=>{if(answerTimer!==null){clearTimeout(answerTimer);answerTimer=null;}};
 const stopSpeedTimer=()=>{if(speedTimer!==null){clearInterval(speedTimer);speedTimer=null;}};
 function head(title,desc){stopAnswerTimer();host.replaceChildren();const h=el('div');h.className='learning-heading';h.append(el('span','🐉 MARKA MATEMĀTIKA'),el('h2',title),el('p',desc));host.append(h);}
 function home(){stopSpeedTimer();head('Skaitļu misijas','Izvēlies misiju un trenējies savā ritmā.');const grid=el('div');grid.className='topic-grid';host.append(grid);for(const [id,name,desc] of topics){const b=el('button');b.type='button';b.className='topic-tile';b.append(el('span',name.split(' ')[0]),el('strong',name.slice(name.indexOf(' ')+1)),el('small',desc));b.onclick=()=>choose(id);grid.append(b);}}
 function choose(id){stopSpeedTimer();chosen=id;const label=topics.find(t=>t[0]===id);head(label[1],label[2]);btn(host,'🌱 Mācos · 8',()=>start('learn'));btn(host,'🎯 Trenējos · 12',()=>start('practice'));btn(host,'🏆 Pārbaudu sevi · 20',()=>start('exam'));btn(host,'⚡ Ātruma treniņš · 60 sekundes',()=>start('speed'));btn(host,'← Misijas',home);}
 async function start(m,review=false){
  stopSpeedTimer();mode=review?'review':m;sessionToken=null;sessionError='';entered=[];
  const all=makeMarksMathBank(chosen);
  const different=review?all.filter(q=>!errors.some(e=>e.id===q.id)):all;
  items=shuffle(different).slice(0,review?10:m==='learn'?8:m==='exam'?20:12);
  position=correct=streak=record=automatedCount=0;errors=[];reactionTimes=[];
  if(canSubmit&&!review&&m!=='speed'){
   head('Gatavoju uzdevumus…','Izveidoju pārbaudāmu matemātikas sesiju.');
   try{
    if(typeof startVerifiedSession!=='function')throw Error('Nav servera pārbaudes');
    const issued=await startVerifiedSession(chosen,m);
    const byId=new Map(all.map(q=>[q.id,q]));
    const verifiedItems=issued.ids?.map(id=>byId.get(id));
    if(!issued.token||!Array.isArray(verifiedItems)||verifiedItems.some(x=>!x)||verifiedItems.length!==items.length)throw Error('Nederīgs servera uzdevumu saraksts');
    sessionToken=issued.token;items=verifiedItems;
   }catch(e){sessionError='Servera pārbaude nav pieejama: '+(e?.message||'Nezināma kļūda');}
  }
  if(mode==='speed'){
   speedDeadline=Date.now()+60000;
   speedTimer=setInterval(()=>{if(!host.isConnected){stopSpeedTimer();return;}if(mode!=='speed'){stopSpeedTimer();return;}const left=Math.max(0,Math.ceil((speedDeadline-Date.now())/1000));const clock=host.querySelector('.speed-clock');if(clock)clock.textContent='⏱️ Atlikušais laiks: '+left+' s';if(left===0){stopSpeedTimer();stopAnswerTimer();void finish();}},200);
  }
  step();
 }
  function renderOrderQuestion(card, q) {
   card.className = 'question-stage marks-order-stage';
   if(mode==='exam'){
    card.append(el('h3',q.expressionDisplay),el('p','Izvēlies pirmo darbību, aprēķini tās rezultātu un pēc tam visu izteiksmi.'));
    const form=el('form'),grid=el('div');grid.className='order-choice-grid';form.append(grid);
    for(const text of shuffle([q.firstOpChoice,q.wrongOpChoice])){const label=el('label'),radio=el('input');radio.type='radio';radio.name='first-operation';radio.value=text;radio.required=true;label.append(radio,document.createTextNode(' '+text));grid.append(label);}
    const field=(label)=>{const wrap=el('label',label),input=el('input');input.type='number';input.inputMode='numeric';input.required=true;input.min=0;input.max=500;input.className='big-number-input';input.setAttribute('aria-label',label);wrap.append(input);form.append(wrap);return input;};
    const intermediate=field('Pirmās darbības rezultāts'),final=field('Visas izteiksmes rezultāts');
    const submit=el('button','Iesniegt atbildi');submit.type='submit';submit.className='action-button';form.append(submit);card.append(form);
    let done=false;
    form.onsubmit=e=>{e.preventDefault();if(done)return;const selected=form.querySelector('input:checked');if(!selected||!intermediate.value||!final.value)return;done=true;const value=Number(final.value),mid=Number(intermediate.value);entered.push({value,firstOp:selected.value,intermediate:mid});const good=value===q.answer&&mid===q.step1.answer&&selected.value===q.firstOpChoice;correct+=Number(good);streak=good?streak+1:0;record=Math.max(record,streak);if(!good)errors.push(q);form.querySelectorAll('input,button').forEach(x=>x.disabled=true);card.append(el('p','Atbilde pieņemta.'));btn(card,'Nākamais →',()=>{position++;step();});};
    return;
   }
   let stepMistake = false, firstOp=null, firstIntermediate=null;
   let step1Done = false;
   let step2Done = false;

   const banner = el('div', 'order-expression-banner', '');
   banner.append(
    el('div', 'order-expression-title', '🔗 4. klase · Saistītais pieraksts un darbību secība'),
    el('div', 'order-expression-text', q.expressionDisplay || q.prompt)
   );
   const rulePill = el('div', 'order-rules-pill', '📘 Darbību secība: 1. Iekavas ➔ 2. Reizināšana un dalīšana ➔ 3. Saskaitīšana un atņemšana');
   card.append(banner);if(mode!=='exam')card.append(rulePill);

   const stepsContainer = el('div', 'order-steps-container', '');
   card.append(stepsContainer);

   const status = el('p', 'answer-feedback', '');
   status.setAttribute('role', 'status');
   card.append(status);

   const numpadSlot = el('div', 'order-numpad-slot', '');
   card.append(numpadSlot);

   // 1. SOLIS: Kura darbība jāveic vispirms?
   const s1Card = el('div', 'order-step-card active', '');
   const s1Header = el('div', 'order-step-header', '');
   s1Header.append(el('span', 'order-step-badge', '① 1. solis'), el('strong', 'order-step-title', 'Kura darbība jāveic vispirms?'));
   s1Card.append(s1Header);

   const choiceGrid = el('div', 'order-choice-grid', '');
   const choices = shuffle([
    { text: q.firstOpChoice, correct: true },
    { text: q.wrongOpChoice, correct: false }
   ]);

   choices.forEach(c => {
    const b = el('button', 'order-choice-btn', c.text);
    b.type = 'button';
    b.onclick = () => {
     if (step1Done) return;
     if(firstOp===null)firstOp=c.text;
     if (!c.correct) {
      b.classList.add('choice-wrong');
      status.textContent = mode==='exam'?'Izvēle pieņemta. Aprēķini šo darbību.':'Vēl ne. '+q.firstOpRule;
      if(mode==='exam'){step1Done=true;choiceGrid.querySelectorAll('button').forEach(x=>x.disabled=true);initStep2();return;}
      status.className = 'answer-feedback answer-feedback-error';
      stepMistake = true;
      return;
     }
     step1Done = true;
     b.classList.add('choice-correct');
     choiceGrid.querySelectorAll('button').forEach(btn => btn.disabled = true);
     s1Card.className = 'order-step-card completed';
     s1Header.querySelector('.order-step-title').textContent = '1. darbība izvēlēta: ' + q.firstOpChoice + ' ✅';
     status.textContent = '✅ Pareizi! Tagad aprēķini 1. darbību:';
     status.className = 'answer-feedback answer-feedback-good';
     initStep2();
    };
    choiceGrid.append(b);
   });
   s1Card.append(choiceGrid);
   stepsContainer.append(s1Card);

   // 2. SOLIS: 1. darbības starprezultāts
   function initStep2() {
    const s2Card = el('div', 'order-step-card active', '');
    const s2Header = el('div', 'order-step-header', '');
    s2Header.append(el('span', 'order-step-badge', '② 2. solis'), el('strong', 'order-step-title', 'Aprēķini 1. darbību: ' + q.step1.title));
    const s2Prompt = el('div', 'order-step-prompt', q.step1.prompt);

    const form = el('form', 'order-step-form', '');
    const inp = el('input', 'big-number-input', '');
    inp.type = 'number'; inp.inputMode = 'numeric'; inp.required = true; inp.min = 0; inp.max = 500; inp.step = 1;
    inp.placeholder = '?'; inp.setAttribute('aria-label', '1. darbības rezultāts');
    const sub = el('button', 'action-button', 'Pārbaudīt 1. darbību'); sub.type = 'submit';
    form.append(inp, sub);
    s2Card.append(s2Header, s2Prompt, form);
    stepsContainer.append(s2Card);

    numpadSlot.replaceChildren();
    attachTouchNumpad(numpadSlot, inp);

    form.onsubmit = e => {
     e.preventDefault();
     if (step2Done || !card.isConnected) return;
     const val = Number(inp.value);
     if (inp.value === '' || !Number.isInteger(val)) return;

     if(firstIntermediate===null)firstIntermediate=val;
     if (val !== q.step1.answer) {
      if(mode==='exam'){step2Done=true;inp.disabled=sub.disabled=true;status.textContent='Atbilde pieņemta.';initStep3();return;}
      status.textContent = 'Vēl ne. ' + q.step1.hint;
      status.className = 'answer-feedback answer-feedback-error';
      stepMistake = true;
      inp.value = '';
      return;
     }

     step2Done = true;
     inp.disabled = true; sub.disabled = true;
     s2Card.className = 'order-step-card completed';
     s2Header.querySelector('.order-step-title').textContent = q.step1.title + ': ' + q.step1.answer + ' ✅';
     status.textContent = '✅ Lieliski! 1. darbības rezultāts ir ' + q.step1.answer + '. Tagad aprēķini galīgo rezultātu:';
     status.className = 'answer-feedback answer-feedback-good';
     initStep3();
    };
   }

   // 3. SOLIS: Galīgais izteiksmes rezultāts
   function initStep3() {
    const s3Card = el('div', 'order-step-card active', '');
    const s3Header = el('div', 'order-step-header', '');
    s3Header.append(el('span', 'order-step-badge', '③ 3. solis'), el('strong', 'order-step-title', 'Galīgais izteiksmes rezultāts:'));
    const s3Prompt = el('div', 'order-step-prompt', q.step2.prompt);

    const form = el('form', 'order-step-form', '');
    const inp = el('input', 'big-number-input', '');
    inp.type = 'number'; inp.inputMode = 'numeric'; inp.required = true; inp.min = 0; inp.max = 500; inp.step = 1;
    inp.placeholder = '?'; inp.setAttribute('aria-label', 'Galīgais rezultāts');
    const sub = el('button', 'action-button', 'Pabeigt uzdevumu'); sub.type = 'submit';
    form.append(inp, sub);
    s3Card.append(s3Header, s3Prompt, form);
    stepsContainer.append(s3Card);

    numpadSlot.replaceChildren();
    attachTouchNumpad(numpadSlot, inp);

    let finalAnswered = false;
    form.onsubmit = e => {
     e.preventDefault();
     if (finalAnswered || !card.isConnected) return;
     const val = Number(inp.value);
     if (inp.value === '' || !Number.isInteger(val)) return;
     finalAnswered = true;

     inp.disabled = true; sub.disabled = true;
     numpadSlot.querySelectorAll('button').forEach(b => b.disabled = true);

     const elapsedSec = Math.max(0.2, (Date.now() - qStartTime) / 1000);
     reactionTimes.push(elapsedSec);

     const ok = val === q.answer;
     const fullyCorrect = ok && firstOp===q.firstOpChoice && firstIntermediate===q.step1.answer;
     entered.push({value:val,firstOp,intermediate:firstIntermediate});

     if (fullyCorrect) {
      correct++;
      streak++;
      record = Math.max(record, streak);
     } else {
      errors.push(q);
      streak = 0;
     }

     s3Card.className = 'order-step-card ' + (ok ? 'completed' : '');
     status.textContent = fullyCorrect
      ? '🎉 Izcili! Pareiza darbību secība un gala rezultāts: ' + q.answer + '!'
      : ok
      ? '💡 Gala rezultāts pareizs (' + q.answer + '), bet pievērs uzmanību 1. soļa darbību secībai!'
      : '❌ Pareizais gala rezultāts: ' + q.answer + '. ' + q.hint;
     if(mode==='exam'){status.textContent='Atbilde pieņemta.';status.className='answer-feedback';}else status.className='answer-feedback '+(fullyCorrect?'answer-feedback-good':'answer-feedback-error');

     const advance = () => {
      if (!card.isConnected) return;
      stopAnswerTimer();
      position++;
      step();
     };

     const next = btn(card, position + 1 === items.length ? 'Skatīt rezultātus →' : 'Turpināt uzreiz →', advance);
     next.setAttribute('aria-label', 'Pāriet uz nākamo uzdevumu');
     // The learner decides when to continue after reading feedback.
    };
   }
  }
  function step(){onCheckpoint({chosen,mode,items,position,correct,streak,record,errors,entered,sessionToken,sessionError,automatedCount,reactionTimes});stopAnswerTimer();qStartTime=Date.now();if(position>=items.length){void finish();return;}const q=items[position];head('Misija '+(position+1)+' no '+items.length,'Atrisini un turpini savu sēriju.');if(mode==='speed'){const timer=el('p','⏱️ Atlikušais laiks: '+Math.max(0,Math.ceil((speedDeadline-Date.now())/1000))+' s · 12 jautājumi');timer.className='speed-clock';timer.setAttribute('role','timer');host.append(timer);}
  const progress=el('div');progress.className='progress-track';const fill=el('div');fill.className='progress-fill';fill.style.width=Math.round(position/items.length*100)+'%';progress.append(fill);host.append(progress);const count=el('p','🔥 '+streak+' pēc kārtas · Rekords '+record);count.className='streak-label';host.append(count);const card=el('div');card.className='question-stage';
  if(q.step1 && q.step2 && mode!=='speed'){host.append(card);renderOrderQuestion(card,q);return;}
  card.append(el('div',q.prompt));card.firstChild.className='math-expression';if(q.visual){const groups=el('div');groups.className='visual-groups';groups.setAttribute('role','img');groups.setAttribute('aria-label',q.visual.groups+' grupas pa '+q.visual.each);for(let i=0;i<q.visual.groups;i++){const g=el('div');g.className='visual-group';for(let j=0;j<q.visual.each;j++){const icon=el('span',q.visual.icon);icon.className='visual-object';g.append(icon);}groups.append(g);}card.append(groups);}const form=el('form');form.className='math-answer-form';const input=el('input');input.type='number';input.inputMode='numeric';input.required=true;input.min=0;input.max=500;input.step=1;input.className='big-number-input';input.setAttribute('aria-label','Tava atbilde');const submit=el('button','Pārbaudīt');submit.type='submit';submit.className='action-button';form.append(input,submit);card.append(form);const status=el('p');status.setAttribute('role','status');card.append(status);const numpad=attachTouchNumpad(card,input);host.append(card);if(mode==='learn')btn(card,'💡 Pavediena palīdzība',()=>{status.textContent=q.hint;});let answered=false,advanced=false;form.onsubmit=e=>{e.preventDefault();if(answered||!card.isConnected)return;const value=Number(input.value);if(input.value===''||!Number.isInteger(value))return;answered=true;entered.push(value);const elapsedSec=Math.max(0.2,(Date.now()-qStartTime)/1000);reactionTimes.push(elapsedSec);const ok=value===q.answer;const isFast=ok&&elapsedSec<=3.2;if(isFast)automatedCount++;correct+=Number(ok);streak=ok?streak+1:0;record=Math.max(record,streak);if(!ok)errors.push(q);input.disabled=submit.disabled=true;numpad.querySelectorAll('button').forEach(b=>b.disabled=true);status.textContent=mode==='exam'?'Atbilde pieņemta.':ok?'🎉 Pareizi!':'❌ Pareizā atbilde: '+q.answer+'. '+q.hint;status.className='answer-feedback'+(mode==='exam'?'':ok?' answer-feedback-good':' answer-feedback-error');if(ok&&mode!=='exam'){const badge=isFast?el('div','⚡ Zibenīgs automātisms! ('+elapsedSec.toFixed(1)+'s)','speed-badge-flash'):el('div','💡 Pareizi izdomāts! ('+elapsedSec.toFixed(1)+'s)','speed-badge-thinking');card.append(badge);}const advance=()=>{if(advanced||!card.isConnected)return;advanced=true;stopAnswerTimer();position++;step();};if(mode==='exam'&&!ok){btn(card,'Nākamais →',advance);}else{const wait=ok?1000:2800;const next=btn(card,'Turpināt uzreiz →',advance);next.setAttribute('aria-label','Pāriet uz nākamo uzdevumu');if(mode==='speed')answerTimer=setTimeout(advance,wait);}};}
 async function finish(){
  stopAnswerTimer();stopSpeedTimer();
  const localPct=Math.round(correct/items.length*100);
  head('Misija pabeigta!','Katrs mēģinājums nostiprina prasmes.');
  const score=el('div',localPct+'%');score.className='result-hero';
  host.append(score,el('p',correct+' / '+items.length+' pareizi · Garākā sērija '+record),el('p','Strādā savā tempā. Ātrums netiek izmantots meistarības punktiem.'));
  const note=el('p');note.setAttribute('role','status');host.append(note);
  if(canSubmit&&mode!=='review'&&mode!=='speed'){
   if(!sessionToken||typeof gradeVerifiedSession!=='function'){
    note.textContent='⚠️ '+(sessionError||'Servera pārbaude nav pieejama.')+' Rezultāts nav saglabāts.';
   }else{
    note.textContent='Pārbaudu rezultātu serverī…';
    try{
     const verified=await gradeVerifiedSession(sessionToken,entered);
     if(verified.verifiedBy!=='server'||verified.total!==items.length||verified.correct!==correct)throw Error('Atbilžu pārbaudes neatbilstība');
     score.textContent=verified.percent+'%';
     const id=await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:chosen+' · '+mode,score:verified.percent,notes:JSON.stringify({correct:verified.correct,total:verified.total,bestStreak:verified.maxStreak,serverVerified:true,spendableBP:0})});
     if(!id)throw Error('Firebase nesaglabāja rezultātu');
     note.textContent='✅ Serveris pārbaudīja un Firebase saglabāja rezultātu. Tērējamie BP netika piešķirti.';
    }catch(e){note.textContent='⚠️ Pārbaude vai saglabāšana neizdevās: '+(e.message||'Kļūda')+'. Rezultāts nav apstiprināts.';}
   }
  }else if(mode==='speed'){
   note.textContent='⚡ Ātruma treniņš: '+entered.length+' no '+items.length+' atbildēti. '+(canSubmit?'Saglabāju rezultātu…':'Vecāka priekšskatījumā rezultātu nesaglabā.');
   if(canSubmit){try{
    const id=await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:'Ātruma treniņš · '+chosen,score:localPct,notes:JSON.stringify({correct,total:items.length,answered:entered.length,maxStreak:record,durationSeconds:60,serverVerified:false,provisionalBP:true,spendableBP:0})});
    if(!id)throw Error('Firebase neapstiprināja ierakstu');
    note.textContent='✅ Ātruma treniņš saglabāts Firebase. Rezultāts piedalās provizoriskajā kino vakara BP progresā; tērējamie punkti vēl nav aktivizēti.';
   }catch(e){note.textContent='⚠️ Ātruma treniņa saglabāšana neizdevās: '+(e.message||'Pārbaudi savienojumu');}
   }
  }
  else if(mode==='review'){note.textContent='Saglabāju kļūdu treniņu…';if(canSubmit)try{await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:chosen+' · review',score:localPct,notes:JSON.stringify({correct,total:items.length,mode:'review',maxStreak:record})});note.textContent='Kļūdu treniņš saglabāts.';}catch(e){note.textContent=e.message;}}
  else note.textContent='Vecāka priekšskatījums — rezultāts netiek ieskaitīts.';
  if(errors.length)btn(host,'🎯 Trenēt kļūdas ar citiem piemēriem',()=>{void start(mode,true);});
  btn(host,'Atkārtot misiju',()=>{void start(mode);});
  btn(host,'← Uz tēmām',home);
 }
 if(initialState){({chosen,mode,items,position,correct,streak,record,errors,entered,sessionToken,sessionError,automatedCount,reactionTimes}=initialState);if(mode==='speed'){mode='practice';sessionToken=null;sessionError='Ātruma mēģinājums pārtraukts. Sāc jaunu ātruma treniņu vai trenējies savā tempā.';}step();}else home();
}
