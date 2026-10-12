import {attachTouchNumpad} from './touch-numpad.js';

// 4. klases darba lapa: divciparu reizināšana, sadalot desmitos un vienos.
const missions=[
 [23,2],[41,3],[32,4],[52,3],[16,5],[27,3],[34,2],[18,4],[43,5],[26,4],[35,3],[64,2],
 [36,2],[47,3],[25,4],[28,3],[54,2],[37,4],[46,5],[63,3],[19,6],[58,4],[76,3]
];
const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
const el=(tag,text='',cls='')=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};

export function renderDragonSplitMath(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub dragon-split');root.append(host);
 let tasks=[],index=0,phase=0,firstTry=0,errors=0,attempts=0,finished=false,busy=false;
 const stages=[
  {name:'Atver lādi',prompt:'Cik ir desmiti?',answer:(n,k)=>Math.floor(n/10)*10,tip:(n)=>n+' = '+(Math.floor(n/10)*10)+' + '+(n%10)},
  {name:'Atrodi dārgakmeņus',prompt:'Cik ir vieni?',answer:(n)=>n%10,tip:(n)=>n+' sadali desmitos un vienos.'},
  {name:'Uzlādē lielo kristālu',prompt:'Cik ir desmiti × reizinātājs?',answer:(n,k)=>Math.floor(n/10)*10*k,tip:(n,k)=>(Math.floor(n/10)*10)+' × '+k},
  {name:'Uzlādē mazo kristālu',prompt:'Cik ir vieni × reizinātājs?',answer:(n,k)=>(n%10)*k,tip:(n,k)=>(n%10)+' × '+k},
  {name:'Apvieno kristālus',prompt:'Kāds ir gala rezultāts?',answer:(n,k)=>n*k,tip:(n,k)=>(Math.floor(n/10)*10*k)+' + '+((n%10)*k)}
 ];
 let answered=false;
 const drawHome=()=>{
  finished=true;host.replaceChildren();
  host.append(el('h2','🐉 Kristālu kalve'),el('p','Jauna 4. klases misija: divciparu skaitļu reizināšana, sadalot desmitos un vienos.'));
  const sample=el('div','24 × 3 = (20 + 4) × 3 = 60 + 12 = 72','soft-notice');sample.style.cssText='font-size:clamp(1rem,4vw,1.4rem);font-weight:800;padding:14px;margin:12px 0';host.append(sample);
  host.append(el('p','Atver 6 lādes. Katrā lādē ir pieci mazi soļi. Bez taimera — svarīgāk ir saprast, kā rodas atbilde.'));
  host.append(el('p',alreadyEarnedBonus?'🏅 Meistarības bonuss jau iegūts! Vari trenēties atkal.':'🏅 Ja vismaz 85% soļu izpildīsi pareizi ar pirmo mēģinājumu, iegūsi vienreizēju +10 BP meistarības bonusu (provizoriski).'));
  const b=el('button','⚔️ Sākt kristālu misiju','action-button');b.type='button';b.onclick=()=>{tasks=shuffle(missions).slice(0,6);index=phase=firstTry=errors=attempts=0;finished=false;drawTask();};host.append(b);
 };
 const drawTask=()=>{
  if(index>=tasks.length){void finish();return;}
  answered=false;attempts=0;host.replaceChildren();
  const [n,k]=tasks[index],tens=Math.floor(n/10)*10,ones=n%10,stage=stages[phase];
  host.append(el('h2','🐉 Kristālu kalve · Lāde '+(index+1)+' / '+tasks.length));
  const bar=el('div','','progress-track');const fill=el('div','','progress-fill');fill.style.width=String(Math.round((index*stages.length+phase)/(tasks.length*stages.length)*100))+'%';bar.append(fill);host.append(bar);
  const equation=el('div',n+' × '+k+' = ?','math-expression');equation.style.textAlign='center';host.append(equation);
  const map=el('p',phase>=2?'🔷 '+tens+' × '+k+'  +  💎 '+ones+' × '+k:'🔷 '+n+' = □ + □');map.style.cssText='text-align:center;font-weight:800;font-size:clamp(1rem,3vw,1.3rem)';host.append(map);
  host.append(el('h3',stage.name+' · '+(phase+1)+'/5'),el('p',stage.prompt));
  const card=el('div','','question-stage');const form=el('form','','math-answer-form');
  const input=el('input','','big-number-input');input.type='number';input.min='0';input.max='999';input.step='1';input.required=true;input.autocomplete='off';input.setAttribute('aria-label',stage.prompt);
  const submit=el('button','Pārbaudīt','action-button');submit.type='submit';form.append(input,submit);card.append(form);
  const message=el('p','','answer-feedback');message.setAttribute('role','status');card.append(message);
  host.append(card);const keypad=attachTouchNumpad(card,input);
  const hint=el('button','💡 Padoms','quiet-button');hint.type='button';hint.onclick=()=>{message.textContent=stage.tip(n,k);};host.append(hint);
  form.onsubmit=event=>{
   event.preventDefault();if(answered||busy||input.value.trim()==='')return;
   const value=Number(input.value),expected=stage.answer(n,k);
   if(!Number.isInteger(value))return;
   attempts++;
   if(value!==expected){
    errors++;message.className='answer-feedback answer-feedback-error';
    message.textContent=attempts===1?'💡 Vēl ne! '+stage.tip(n,k)+' Mēģini vēlreiz.':'🧠 Padomā: '+stage.tip(n,k)+'. Tu vari!';
    input.value='';return;
   }
   if(attempts===1)firstTry++;
   answered=true;input.disabled=submit.disabled=true;keypad.querySelectorAll('button').forEach(b=>b.disabled=true);hint.disabled=true;
   message.className='answer-feedback answer-feedback-good';message.textContent=phase===4?'💎 Lāde atvērta! Kristāls atrasts!':'✨ Pareizi! Kristāls kļūst spožāks!';
   const next=el('button',phase===4?'💎 Nākamā lāde →':'Turpināt kalšanu →','action-button');next.type='button';
   next.onclick=()=>{if(!answered||busy)return;answered=false;if(phase===4){index++;phase=0;}else phase++;drawTask();};host.append(next);
  };
 };
 const finish=async()=>{
  if(busy||finished)return;finished=busy=true;
  host.replaceChildren();const total=tasks.length*stages.length;const score=Math.round(firstTry/total*100);
  host.append(el('h2','🏆 Kristālu kalve pabeigta!'),el('div','💎 '+tasks.length+' / '+tasks.length,'result-hero'));
  host.append(el('p','Pirmajā reizē pareizi: '+firstTry+' no '+total+' soļiem ('+score+'%). Kļūdaini mēģinājumi: '+errors+'.'));
  host.append(el('p','Svarīgākais: tu iemācījies sadalīt divciparu skaitli desmitos un vienos!'));
  const qualified=score>=85;
  host.append(el('p',qualified?(alreadyEarnedBonus?'🏅 Vismaz 85%! Šīs tēmas bonuss jau ir saņemts.':'🏅 Vismaz 85%! Par pirmo veiksmīgo izpildi pienākas +10 provizoriskie BP!'):'💪 Meistarības bonuss gaida pie 85%. Vari trenēties un mēģināt atkal.'));
  const note=el('p','Saglabāju rezultātu…');note.setAttribute('role','status');host.append(note);
  if(canSubmit){
   try{const id=await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:'Kristālu kalve · skaitļa sadalīšana',score,notes:JSON.stringify({correct:firstTry,total,completedChests:tasks.length,mistakes:errors,masteryBonusEligible:qualified,serverVerified:false,spendableBP:0})});note.textContent=id?'✅ Rezultāts saglabāts Firebase.':'⚠️ Saglabāšana nav apstiprināta.';}
   catch(e){note.textContent='⚠️ Rezultātu nesaglabāja: '+(e.message||'savienojuma kļūda');}
  }else note.textContent='Priekšskatījums — rezultāts netiek saglabāts.';
  const again=el('button','⚔️ Jauna ekspedīcija','action-button');again.type='button';again.onclick=drawHome;host.append(again);busy=false;
 };
 drawHome();
}
