// Kristālu kalve 2.0 — paraugs, kļūdas analīze, kopdarbs, patstāvīga pārbaude.
const el=(tag,text='',cls='')=>{const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;};
const shuffled=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const sample=(n,k)=>({n,k,t:Math.floor(n/10)*10,u:n%10});
const bank=()=>{const out=[];for(let n=12;n<=79;n++)if(n%10!==0)for(let k=2;k<=6;k++)out.push(sample(n,k));return out;};
const TOTAL=30; // Five independently completed fields in each of six problems.

export function renderDragonSplitMath(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub dragon-split');root.append(host);
 let used=new Set(),examples=[],idx=0,earned=0,submitted=false,saving=false,view='intro',errorAttempts=0;
 const choose=()=>{const arr=shuffled(bank().filter(q=>!used.has(q.n+'x'+q.k))).slice(0,8);used=new Set(arr.map(q=>q.n+'x'+q.k));return arr;};
 const btn=(parent,label,onClick,cls='action-button')=>{const b=el('button',label,cls);b.type='button';b.addEventListener('click',onClick);parent.append(b);return b;};
 const title=(text)=>{host.append(el('h2','🐉 Kristālu kalve'),el('p',text));};
 const math=(text)=>{const block=el('div',text,'math-expression');block.style.cssText='text-align:center;font-size:clamp(2rem,6vw,3.6rem);margin:14px 0;color:#203470;font-weight:900';host.append(block);};
 const panel=(heading,lines)=>{const box=el('div','','split-instruction');box.append(el('strong',heading));for(const line of lines)box.append(el('p',line));host.append(box);return box;};
 const field=(holder,label)=>{const wrap=el('label','','split-answer-field');wrap.style.cssText='display:flex;flex-direction:column;gap:6px;font-size:1rem;font-weight:800;min-width:0;flex:1';wrap.append(el('span',label));const input=el('input','','big-number-input');input.type='number';input.inputMode='numeric';input.min='0';input.max='999';input.step='1';input.required=true;input.autocomplete='off';input.style.cssText='width:100%!important;max-width:100%!important;min-height:54px!important;color:#243568!important;font-size:1.4rem!important';input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();input.blur();}});wrap.append(input);holder.append(wrap);return input;};
 const row=()=>{const d=el('div','','split-input-row');d.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:12px 0';host.append(d);return d;};
 function intro(){
  view='intro';host.replaceChildren();title('1/4 · Atklāj paņēmienu');
  math('24 × 3 = ?');
  panel('👀 Skaties, kā var aprēķināt',[
   'Skaitlī 24 ir 2 desmiti un 4 vieni. Tātad 24 = 20 + 4.',
   'Vispirms: 20 × 3 = 60.',
   'Pēc tam: 4 × 3 = 12.',
   'Beigās: 60 + 12 = 72.',
   'Tātad 24 × 3 = 72.'
  ]);
  btn(host,'🧩 Sapratu — meklēšu pūķa kļūdu →',mistake);
 }
 function mistake(){
  view='mistake';host.replaceChildren();title('2/4 · Palīdzi pūķim izlabot aprēķinu');
  math('32 × 4 = ?');
  panel('🐉 Pūķis zina pirmo soli',[
   '32 = 30 + 2',
   'Tagad tev pašam jāaprēķina abas daļas un jāsaskaita rezultāti.',
   'Neuzmini atbildi no variantiem — izrēķini!'
  ]);
  const form=el('form');host.append(form);
  const inputs=row();
  const big=field(inputs,'30 × 4 = ?');
  const small=field(inputs,'2 × 4 = ?');
  const sum=field(form,'Cik sanāk kopā?');
  const status=el('p','','answer-feedback');status.setAttribute('role','status');form.append(status);
  const check=el('button','Pārbaudīt manu aprēķinu','action-button');check.type='submit';form.append(check);
  form.addEventListener('submit',event=>{
   event.preventDefault();
   if(!big.value||!small.value||!sum.value){status.textContent='Aizpildi visus trīs laukus.';return;}
   if(Number(big.value)===120&&Number(small.value)===8&&Number(sum.value)===128){
    status.className='answer-feedback answer-feedback-good';
    status.textContent='🎉 Pareizi! 30 × 4 = 120, 2 × 4 = 8, un kopā 128.';
    check.disabled=true;for(const i of [big,small,sum])i.readOnly=true;
    btn(host,'🤝 Tagad pamēģināsim citu piemēru →',guided);
   }else{
    status.className='answer-feedback answer-feedback-error';
    status.textContent='Vēl kaut kas nesakrīt. Pārbaudi abus reizinājumus un pēc tam to summu. Vari labot.';
   }
  });
 }
 function guided(){
  view='guided';host.replaceChildren();title('3/4 · Trenējamies ar atbalstu');
  const q=examples[0];
  math(q.n+' × '+q.k+' = ?');
  panel('👣 Pamēģini pats',[
   'Sadalījums: '+q.n+' = '+q.t+' + '+q.u+'.',
   'Aprēķini katras daļas reizinājumu un saskaiti.',
   'Ja kļūdīsies, varēsi labot.'
  ]);
  const form=el('form','','split-solution-form');host.append(form);
  const multi=el('section','','split-solution-section');multi.append(el('h3','1. Aprēķini abas daļas'));form.append(multi);
  const inputs=el('div','','split-solution-row');multi.append(inputs);
  const a=field(inputs,q.t+' × '+q.k+' = ?'),b=field(inputs,q.u+' × '+q.k+' = ?');
  const add=el('section','','split-solution-section');add.append(el('h3','2. Saskaiti rezultātus'));form.append(add);
  add.append(el('p','Abi reizinājumi kopā veido atbildi.','split-sum-hint'));
  const result=field(add,'Gala rezultāts: '+q.n+' × '+q.k+' = ?');
  const status=el('p','','answer-feedback');status.setAttribute('role','status');form.append(status);
  const check=el('button','Pārbaudīt manu risinājumu','action-button');check.type='submit';form.append(check);
  form.addEventListener('submit',e=>{
   e.preventDefault();
   if(!a.value||!b.value||!result.value){status.textContent='Aizpildi visas trīs atbildes.';return;}
   if(+a.value===q.t*q.k&&+b.value===q.u*q.k&&+result.value===q.n*q.k){
    status.textContent='✨ Pareizi! Tu pats izrēķināji abas daļas un summu.';status.className='answer-feedback answer-feedback-good';
    check.disabled=true;for(const x of [a,b,result])x.readOnly=true;
    btn(host,'🚀 Doties uz patstāvīgo pārbaudījumu →',ready);
   }else{status.textContent='Vēl nav pareizi. Pārbaudi katru reizinājumu un saskaitīšanu. Nekas nav zaudēts — vari labot.';status.className='answer-feedback answer-feedback-error';}
  });
 }
 function ready(){
  view='ready';host.replaceChildren();title('4/4 · Kristālu meistarības pārbaudījums');
  panel('💎 6 lādes, katrā 5 atbildes',[
   'Šoreiz sadalījumu un starprezultātus izvēlies pats.',
   'Vispirms aizpildi VISUS laukus. Tikai tad pārbaudi.',
   'Pārbaudījumā 26 no 30 pareizām atbildēm sasniedz vismaz 85%.',
   alreadyEarnedBonus?'Bonuss jau iegūts; vari uzlabot prasmes.':'Pirmais apstiprinātais rezultāts vismaz 85% dod +10 provizoriskus BP.'
  ]);
  btn(host,'⚔️ Sākt 6 lāžu pārbaudījumu',()=>{idx=earned=errorAttempts=0;submitted=false;challenge();});
  btn(host,'🤝 Vēlos vēlreiz trenēties',guided,'quiet-button');
 }
 function challenge(){
  view='challenge';if(idx>=6){results();return;}
  const q=examples[idx+2];host.replaceChildren();title('💎 Patstāvīgā lāde '+(idx+1)+' no 6');
  math(q.n+' × '+q.k+' = ?');
  const progress=el('div','','progress-track');const fill=el('div','','progress-fill');fill.style.width=(idx/6*100)+'%';progress.append(fill);host.append(progress);
  panel('1. Sadali skaitli divās daļās',[
   'Sadali '+q.n+' desmitu daļā un vienu daļā.',
   '2. Sareizini katru daļu ar '+q.k+'. 3. Saskaiti iegūtos rezultātus.',
   'Risini patstāvīgi. Atbildes atklāsim tikai pēc pārbaudes.'
  ]);
  const form=el('form','','split-solution-form');host.append(form);
  const section=(heading)=>{const block=el('section','','split-solution-section');block.append(el('h3',heading));form.append(block);return block;};
  const firstSection=section('1. Sadali '+q.n+' desmitos un vienos');
  const first=el('div','','split-solution-row');firstSection.append(first);
  const a=field(first,'Desmitu daļas vērtība'),b=field(first,'Vienu daļas vērtība');
  a.placeholder='Piem., 40';b.placeholder='Piem., 5';
  const secondSection=section('2. Sareizini abas daļas ar '+q.k);
  const second=el('div','','split-solution-row');secondSection.append(second);
  const c=field(second,'Pirmās daļas reizinājums'),d=field(second,'Otrās daļas reizinājums');
  const thirdSection=section('3. Saskaiti abus reizinājumus');
  const resultRow=el('div','','split-solution-row split-final-row');thirdSection.append(resultRow);
  const e=field(resultRow,'Gala rezultāts');
  const sumLabel=el('p','Pirmā reizinājuma rezultāts + otrā reizinājuma rezultāts = gala atbilde','split-sum-hint');thirdSection.insertBefore(sumLabel,resultRow);
  const tokens=(parent,parts)=>{const line=el('div','','split-math-line');for(const item of parts){const span=el('span',item);line.append(span);}parent.insertBefore(line,parent.querySelector('.split-solution-row'));};
  tokens(firstSection,[q.n+' = ','□',' + ','□']);
  tokens(secondSection,['(1. daļa × '+q.k+')',' + ','(2. daļa × '+q.k+')']);
  tokens(thirdSection,['□',' + ','□',' = ','?']);
  const status=el('p','','answer-feedback');status.setAttribute('role','status');form.append(status);
  const check=el('button','🔍 Pārbaudīt visu risinājumu','action-button');check.type='submit';form.append(check);
  let locked=false;
  form.addEventListener('submit',ev=>{
   ev.preventDefault();if(locked)return;
   const inputs=[a,b,c,d,e];if(inputs.some(x=>x.value.trim()==='')){status.textContent='Pirms pārbaudes aizpildi visus piecus laukus.';return;}
   const vals=inputs.map(x=>Number(x.value));
   if(!vals.every(Number.isInteger)||vals.some(v=>v<0||v>999)){status.textContent='Ievadi tikai veselus pozitīvus skaitļus.';return;}
   locked=true;check.disabled=true;inputs.forEach(x=>x.readOnly=true);
   // Each entry earns a point only when its reasoning and numeric value are correct.
   const ok=[vals[0]===q.t,vals[1]===q.u,
    vals[2]===q.t*q.k,
    vals[3]===q.u*q.k,
    vals[4]===q.n*q.k && vals[2]+vals[3]===vals[4]];
   const points=ok.filter(Boolean).length;earned+=points;errorAttempts+=5-points;
   status.className='answer-feedback '+(points===5?'answer-feedback-good':'answer-feedback-error');
   status.textContent=points===5?'🎉 Viss pareizi! Kristāls atrasts!':'Pareizas '+points+' no 5 daļām. Piemēram, '+q.n+' = '+q.t+' + '+q.u+'; '+q.t+' × '+q.k+' = '+q.t*q.k+' un '+q.u+' × '+q.k+' = '+q.u*q.k+'; rezultāts '+q.n*q.k+'.';
   btn(host,idx===5?'🏆 Skatīt rezultātu →':'💎 Nākamā lāde →',()=>{if(!locked)return;locked=false;idx++;challenge();});
  });
 }
 function results(){
  view='results';host.replaceChildren();const percent=Math.round(earned/TOTAL*100),qualified=percent>=85;
  title('🏆 Misija pabeigta');
  host.append(el('div',percent+'%','result-hero'));
  host.append(el('p','Pareizas atbildes: '+earned+' no '+TOTAL+'.'));
  host.append(el('p',qualified?'💎 Sasniegti vismaz 85%!':'💪 Nākamajā mēģinājumā centies sasniegt vismaz 85%.'));
  host.append(el('p','Tavs rezultāts vēl nav saglabāts. Vari izvēlēties, vai esi apmierināts.'));
  const note=el('p','','answer-feedback');note.setAttribute('role','status');host.append(note);
  const confirm=btn(host,'✅ Esmu apmierināts — iesniegt rezultātu',async()=>{
   if(submitted||saving)return;
   if(!canSubmit){note.textContent='Vecāka priekšskatījumā rezultāts netiek saglabāts.';return;}
   saving=true;confirm.disabled=true;
   try{
    const id=await saveProgress({studentRole:'marks',subject:'Matemātika',activityType:'Kristālu kalve · skaitļa sadalīšana',score:percent,notes:JSON.stringify({correct:earned,total:TOTAL,mistakes:errorAttempts,childConfirmed:true,masteryBonusEligible:qualified,serverVerified:false,spendableBP:0})});
    if(!id)throw Error('Firebase neapstiprināja ierakstu');
    submitted=true;note.textContent='✅ Rezultāts saglabāts!'+(qualified&&!alreadyEarnedBonus?' 🏅 Vienreizējais +10 BP bonuss ieskaitās provizoriskajā progresā.':'');
   }catch(error){note.textContent='⚠️ Saglabāšana neizdevās: '+(error.message||'Pārbaudi internetu');confirm.disabled=false;}
   finally{saving=false;}
  });
  btn(host,'🔄 Trenēties vēlreiz ar jauniem piemēriem',()=>{if(saving)return;examples=choose();guided();});
 }
 examples=choose();intro();
}
