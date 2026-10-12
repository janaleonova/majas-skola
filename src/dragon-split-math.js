// Kristālu kalve 2.0 — paraugs, kļūdas analīze, kopdarbs, patstāvīga pārbaude.
const el=(tag,text='',cls='')=>{const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;};
const shuffled=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const sample=(n,k)=>({n,k,t:Math.floor(n/10)*10,u:n%10});
const bank=()=>{const out=[];for(let n=12;n<=79;n++)if(n%10!==0)for(let k=2;k<=6;k++)out.push(sample(n,k));return out;};

const parseEquation=(raw,operation)=>{
 const text=String(raw).replace(/\s+/g,'').replace(/[×xX*·⋅]/g,'×').replace(/＝/g,'=');
 const sides=text.split('=');
 if(sides.length!==2)return null;
 const evaluate=part=>{
  if(/^\d+$/.test(part))return {value:Number(part),terms:null};
  const regex=operation==='+'?/^(\d+)\+(\d+)$/:/^(\d+)×(\d+)$/;
  const match=part.match(regex);
  if(!match)return null;
  const terms=[Number(match[1]),Number(match[2])];
  return {value:operation==='+'?terms[0]+terms[1]:terms[0]*terms[1],terms};
 };
 const left=evaluate(sides[0]),right=evaluate(sides[1]);
 if(!left||!right||Boolean(left.terms)===Boolean(right.terms))return null;
 const expr=left.terms?left:right.terms?right:null;
 const number=left.terms?right.value:left.value;
 return {terms:expr.terms,result:number,valid:expr.value===number};
};
const unorderedPair=(actual,expected)=>actual[0]===expected[0]&&actual[1]===expected[1]||actual[0]===expected[1]&&actual[1]===expected[0];
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
  const form=el('form','','split-solution-form');host.append(form);
  const mult=el('section','','split-solution-section');form.append(mult);
  mult.append(el('h3','1. Aprēķini abas daļas'));
  const inputs=el('div','','split-solution-row');mult.append(inputs);
  const big=field(inputs,'30 × 4 = ?');
  const small=field(inputs,'2 × 4 = ?');
  const addition=el('section','','split-solution-section');form.append(addition);
  addition.append(el('h3','2. Saskaiti abus reizinājumus'));
  const sum=field(addition,'Cik sanāk kopā?');
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
  const form=el('form','','split-solution-form');host.append(form);
  const fieldExpr=(heading,label,hint)=>{
   const block=el('section','','split-solution-section');form.append(block);
   block.append(el('h3',heading));
   const wrap=el('label','','split-expression-field');wrap.append(el('span',label));
   const input=el('input','','split-expression-input');input.type='text';input.autocomplete='off';input.spellcheck=false;input.setAttribute('aria-label',label);input.placeholder='Ieraksti visu izteiksmi';wrap.append(input);block.append(wrap);
   let hints=0;
   btn(block,'💡 Pavediens',()=>{
    hints++;
    const texts=typeof hint==='function'?hint(hints):hint;
    feedback.textContent=Array.isArray(texts)?texts[Math.min(hints-1,texts.length-1)]:texts;
    feedback.className='answer-feedback';
   },'quiet-button');
   return input;
  };
  const feedback=el('p','','answer-feedback');feedback.setAttribute('role','status');
  const split=fieldExpr('1. Sadali skaitli '+q.n,'Pilns sadalījuma pieraksts',[
   'Padomā, cik pilnu desmitu un atsevišķu vienu ir skaitlī '+q.n+'.',
   'Pieraksta veids: skaitlis = desmitu daļa + vienu daļa.',
   'Šeit desmitu daļu veido '+Math.floor(q.n/10)+' desmiti.'
  ]);
  const multA=fieldExpr('2. Sareizini pirmo daļu','Uzraksti pirmo reizināšanas izteiksmi',[
   'Paņem desmitu daļu un sareizini ar '+q.k+'.',
   'Lieto zīmi ×. Piemēram, 20 × 3 = 60.'
  ]);
  const multB=fieldExpr('3. Sareizini otro daļu','Uzraksti otro reizināšanas izteiksmi',[
   'Paņem vienu daļu un sareizini ar '+q.k+'.',
   'Lieto zīmi ×. Piemēram, 4 × 3 = 12.'
  ]);
  const addition=fieldExpr('4. Saskaiti reizinājumus','Uzraksti visu saskaitīšanas izteiksmi',[
   'Saskaiti abu reizināšanu rezultātus.',
   'Lieto pierakstu: pirmais rezultāts + otrais rezultāts = kopā.'
  ]);
  form.append(feedback);
  // Math symbols can be inserted with one touch without changing the phone keyboard.
  for(const input of [split,multA,multB,addition]){
   const row=el('div','','split-symbols');input.parentElement.append(row);
   for(const symbol of ['×','+','=']){
    btn(row,symbol,()=>{
     if(input.readOnly)return;
     const from=input.selectionStart??input.value.length,to=input.selectionEnd??from;
     input.setRangeText(symbol,from,to,'end');input.dispatchEvent(new Event('input',{bubbles:true}));
     input.focus({preventScroll:true});
    },'quiet-button');
   }
   input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.blur();}});
  }
  const check=el('button','🔍 Pārbaudīt visu risinājumu','action-button');check.type='submit';form.append(check);
  let locked=false;
  form.addEventListener('submit',event=>{
   event.preventDefault();if(locked)return;
   if([split,multA,multB,addition].some(x=>!x.value.trim())){feedback.textContent='Aizpildi visas četras pilnās izteiksmes.';return;}
   const sp=parseEquation(split.value,'+'),ma=parseEquation(multA.value,'×'),mb=parseEquation(multB.value,'×'),ad=parseEquation(addition.value,'+');
   const malformed=[[sp,split,'1. Sadalīšana'],[ma,multA,'2. Pirmais reizinājums'],[mb,multB,'3. Otrais reizinājums'],[ad,addition,'4. Saskaitīšana']].find(([parsed])=>!parsed);
   if(malformed){
    const [,input,name]=malformed;
    feedback.textContent='⚠️ Nevaru nolasīt: '+name+'. Pārējās atbildes nav novērtētas. Izmanto ciparus un zīmes +, × vai *, =. Pieņemu abas vienādības puses un saskaitāmo secību. Vari labot.';
    input.focus({preventScroll:true});input.scrollIntoView({block:'center',behavior:'smooth'});return;
   }
   locked=true;check.disabled=true;[split,multA,multB,addition].forEach(input=>input.readOnly=true);
   const splitCorrect=sp.valid&&sp.result===q.n&&unorderedPair(sp.terms,[q.t,q.u]);
   const checkProduct=(expr,part)=>expr.valid&&expr.result===part*q.k&&unorderedPair(expr.terms,[part,q.k]);
   const checks=[
    splitCorrect,
    splitCorrect,
    checkProduct(ma,q.t),
    checkProduct(mb,q.u),
    ad.valid&&ad.result===q.n*q.k&&unorderedPair(ad.terms,[q.t*q.k,q.u*q.k])
   ];
   const points=checks.filter(Boolean).length;earned+=points;errorAttempts+=5-points;
   feedback.className='answer-feedback '+(points===5?'answer-feedback-good':'answer-feedback-error');
   feedback.textContent=points===5?'🎉 Viss pieraksts ir pareizs! Kristāls iegūts!':'Pareizi '+points+' no 5 pārbaudāmajām daļām. Pārskati: '+q.n+' = '+q.t+' + '+q.u+'; '+q.t+' × '+q.k+' = '+q.t*q.k+'; '+q.u+' × '+q.k+' = '+q.u*q.k+'; '+q.t*q.k+' + '+q.u*q.k+' = '+q.n*q.k+'.';
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
