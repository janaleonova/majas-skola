import {attachTouchNumpad} from './touch-numpad.js';

// A gradual-release learning journey: model -> guided practice -> independent mastery.
const el=(tag,text='',cls='')=>{const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;};
const shuffle=array=>{const result=[...array];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;};
const example=(number,multiplier)=>({number,multiplier,tens:Math.floor(number/10)*10,ones:number%10});
const buildBank=()=>{const bank=[];for(let n=12;n<=79;n++)if(n%10!==0)for(let k=2;k<=6;k++)bank.push([n,k]);return bank;};

export function renderDragonSplitMath(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub dragon-split');root.append(host);
 const bank=buildBank();
 let previous=new Set(),tasks=[],mode='intro',position=0,phase=0,score=0,wrong=0,busy=false,submitted=false;
 const phaseNames=['Sareizini desmitus','Sareizini vienus','Saskaiti abas daļas'];
 const total=18; // 6 problems × 3 independently answered steps
 const makeNew=()=>{
  const fresh=shuffle(bank.filter(([n,k])=>!previous.has(n+'×'+k))).slice(0,8);
  previous=new Set(fresh.map(([n,k])=>n+'×'+k));
  return fresh.map(([n,k])=>example(n,k));
 };
 const button=(where,label,handler,kind='action-button')=>{
  const b=el('button',label,kind);b.type='button';b.onclick=handler;where.append(b);return b;
 };
 const heading=(subtitle)=>{
  const top=el('div','','split-heading');top.append(el('h2','🐉 Kristālu kalve'));
  if(subtitle)top.append(el('p',subtitle));
  host.append(top);
 };
 const representation=(q,part='')=>{
  const wrap=el('div','','split-representation');
  const title=el('div',q.number+' × '+q.multiplier+' = ?','split-problem');wrap.append(title);
  const split=el('div','','split-decomposition');
  const a=el('span','🔷 '+q.tens+' × '+q.multiplier);
  const plus=el('span',' + ');
  const b=el('span','💎 '+q.ones+' × '+q.multiplier);
  split.append(a,plus,b);wrap.append(split);
  if(part)wrap.append(el('p',part,'split-example-detail'));
  return wrap;
 };
 const intro=()=>{
  mode='intro';host.replaceChildren();heading('JAUNA PRASME · Reizināšana, sadalot skaitli');
  host.append(el('p','Te nav jāmin, kā spēlēt. Vispirms parādīšu paņēmienu, tad risināsim kopā, un tikai beigās būs pārbaudījums.'));
  const card=el('div','','split-worked');
  card.append(el('h3','👀 Skaties, kā es risinu: 24 × 3'));
  for(const line of [
   '1. 24 = 20 + 4  (2 desmiti un 4 vieni)',
   '2. 20 × 3 = 60',
   '3. 4 × 3 = 12',
   '4. 60 + 12 = 72',
   'Tātad 24 × 3 = 72 ✅'
  ])card.append(el('p',line));
  host.append(card);
  host.append(el('p','💡 Triks: lielo skaitli sadalām divos mazākos. Reizinām katru daļu un rezultātus saskaitām.'));
  button(host,'🤝 Skaidrs! Pamēģināsim kopā →',()=>{tasks=makeNew();mode='guided';position=phase=score=wrong=0;guided();});
 };
 const question=(q,expected,text,hint,done,{testing=false}={})=>{
  const stage=el('div','','split-instruction');stage.append(el('strong',text));host.append(stage);
  const card=el('div','','question-stage split-question');
  const form=el('form','','math-answer-form');
  const input=el('input','','big-number-input');input.type='number';input.inputMode='none';input.required=true;input.min='0';input.max='999';input.step='1';input.setAttribute('aria-label',text);
  const submit=el('button','Pārbaudīt','action-button');submit.type='submit';form.append(input,submit);card.append(form);
  const feedback=el('p','','answer-feedback');feedback.setAttribute('role','status');card.append(feedback);
  host.append(card);
  const keypad=attachTouchNumpad(card,input);
  if(!testing)button(host,'💡 Parādi paskaidrojumu',()=>{feedback.textContent=hint;},'quiet-button');
  let finished=false;
  form.onsubmit=event=>{
   event.preventDefault();if(finished||!card.isConnected||!input.value.trim())return;
   const value=Number(input.value);
   if(!Number.isInteger(value))return;
   if(!testing&&value!==expected){
    feedback.className='answer-feedback answer-feedback-error';
    feedback.textContent='Pamēģini vēlreiz. '+hint;
    input.value='';return;
   }
   finished=true;
   if(testing){if(value===expected)score++;else wrong++;}
   feedback.className='answer-feedback '+(value===expected?'answer-feedback-good':'answer-feedback-error');
   feedback.textContent=value===expected?'✨ Pareizi! Tu to izdarīji!':'Pareizā atbilde: '+expected+'. '+hint;
   input.disabled=true;submit.disabled=true;keypad.hidden=true;
   button(card,'➡️ '+(done.label||'Turpināt'),()=>{
    if(!finished||!card.isConnected)return;
    finished=false;done.action();
   },'action-button split-next');
  };
 };
 const guided=()=>{
  if(position>=2){mode='ready';ready();return;}
  host.replaceChildren();heading('🤝 Mācāmies kopā · '+(position+1)+' no 2');
  const q=tasks[position];
  host.append(representation(q,'Atceries: '+q.number+' = '+q.tens+' + '+q.ones));
  const steps=[
   {text:'1. solis · Cik ir '+q.tens+' × '+q.multiplier+'?',correct:q.tens*q.multiplier,hint:q.tens+' ir desmitu daļa. Reizini to ar '+q.multiplier+'.'},
   {text:'2. solis · Cik ir '+q.ones+' × '+q.multiplier+'?',correct:q.ones*q.multiplier,hint:'Reizini tikai vienus: '+q.ones+' × '+q.multiplier+'.'},
   {text:'3. solis · Saskaiti '+(q.tens*q.multiplier)+' + '+(q.ones*q.multiplier)+'.',correct:q.number*q.multiplier,hint:'Tagad saskaiti abus iegūtos rezultātus.'}
  ];
  const current=steps[phase];
  question(q,current.correct,current.text,current.hint,{label:phase===2?'Nākamais piemērs':'Nākamais solis',action:()=>{if(phase<2)phase++;else{phase=0;position++;}guided();}});
 };
 const ready=()=>{
  host.replaceChildren();heading('🏆 Gatavs patstāvīgajai misijai?');
  host.append(el('p','Tu jau redzēji paraugu un izmēģināji divus piemērus ar palīdzību. Tagad ir tavs pārbaudījums.'));
  const notice=el('div','','split-worked');
  notice.append(el('h3','⚔️ 6 lādes · 3 soļi katrā'));
  notice.append(el('p','1. Sareizini desmitus. 2. Sareizini vienus. 3. Saskaiti rezultātus.'));
  notice.append(el('p','Lai iegūtu meistarības bonusu, vajadzīgi vismaz 16 pareizi soļi no 18 (85% vai vairāk).'));
  notice.append(el('p',alreadyEarnedBonus?'🏅 Šīs tēmas bonuss jau saņemts, bet trenēties drīkst atkal.':'💎 Vienreizējais bonuss: +10 provizoriskie BP, ja pats apstiprināsi rezultātu.'));
  host.append(notice);
  button(host,'🚀 Sākt pārbaudījumu',()=>{mode='test';position=phase=score=wrong=0;test();});
  button(host,'🤝 Vēlreiz trenēties',()=>{mode='guided';position=phase=0;guided();},'quiet-button');
 };
 const test=()=>{
  if(position>=6){results();return;}
  host.replaceChildren();heading('💎 Lāde '+(position+1)+' no 6 · Solis '+(phase+1)+' no 3');
  const q=tasks[position+2];host.append(representation(q));
  const progress=el('div','','progress-track');
  const fill=el('div','','progress-fill');fill.style.width=Math.round((position*3+phase)/total*100)+'%';progress.append(fill);host.append(progress);
  const steps=[
   {text:'Sareizini desmitus: '+q.tens+' × '+q.multiplier+' = ?',expected:q.tens*q.multiplier,hint:'Desmitu daļa: '+q.tens+' × '+q.multiplier+' = '+q.tens*q.multiplier+'.'},
   {text:'Sareizini vienus: '+q.ones+' × '+q.multiplier+' = ?',expected:q.ones*q.multiplier,hint:'Vienu daļa: '+q.ones+' × '+q.multiplier+' = '+q.ones*q.multiplier+'.'},
   {text:'Saskaiti abas daļas: '+(q.tens*q.multiplier)+' + '+(q.ones*q.multiplier)+' = ?',expected:q.number*q.multiplier,hint:'Saskaiti iegūtos reizinājumus.'}
  ];
  const current=steps[phase];
  question(q,current.expected,current.text,current.hint,{
   label:phase===2?'Nākamā lāde':'Nākamais solis',
   action:()=>{if(phase<2)phase++;else{position++;phase=0;}test();}
  },{testing:true});
 };
 const results=()=>{
  mode='results';host.replaceChildren();heading('🏆 Pārbaudījums pabeigts!');
  const percent=Math.round(score/total*100),qualified=percent>=85;
  host.append(el('div',percent+'%','result-hero'));
  host.append(el('p','Pareizi ar pirmo mēģinājumu: '+score+' no '+total+'.'));
  host.append(el('p',qualified?'💎 Tu sasniedzi meistarības mērķi!':'💪 Vēl mazliet jāpatrenējas. Jaunajā mēģinājumā būs citi piemēri.'));
  const state=el('p','Rezultāts nav iesniegts. Tu pats izvēlies, vai ar to esi apmierināts.');state.setAttribute('role','status');host.append(state);
  const save=button(host,'✅ Esmu apmierināts — saglabāt',async()=>{
   if(busy||submitted)return;
   if(!canSubmit){state.textContent='Vecāka priekšskatījumā rezultātu nesaglabā.';return;}
   busy=true;save.disabled=true;
   try{
    const id=await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:'Kristālu kalve · skaitļa sadalīšana',score:percent,notes:JSON.stringify({correct:score,total,errors:wrong,childConfirmed:true,masteryBonusEligible:qualified,serverVerified:false,spendableBP:0})});
    if(!id)throw Error('Firebase neapstiprināja ierakstu');
    submitted=true;state.textContent='✅ Rezultāts saglabāts! '+(qualified&&!alreadyEarnedBonus?'💎 Vienreizējais +10 provizoriskais BP bonuss ir nopelnīts.':'');
   }catch(e){state.textContent='⚠️ Saglabāšana neizdevās: '+(e.message||'Pārbaudi savienojumu');save.disabled=false;}
   finally{busy=false;}
  });
  button(host,'🔄 Pamēģināt vēlreiz ar jauniem skaitļiem',()=>{if(busy)return;tasks=makeNew();position=phase=score=wrong=0;submitted=false;mode='guided';guided();});
 };
 intro();
}
