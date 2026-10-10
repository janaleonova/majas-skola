// Pirmā iepazīšanās misija: sākuma līmeņa noteikšana. Nekādi tērējami BP.
export const DIAGNOSTIC_VERSION='starta-misija-v1';
const q=(skill,prompt,choices,answer)=>({skill,prompt,choices,answer});
export const DIAGNOSTICS={
 marks:[
 q('math.multiply','Cik ir 7 × 8?',['54','56','64'],1),
 q('math.divide','Cik ir 48 ÷ 6?',['8','6','9'],0),
 q('math.story','4 lādēs katrā ir 9 kristāli. Cik kopā?',['32','36','49'],1),
 q('math.mental','Cik ir 300 + 200 + 150?',['550','650','750'],1),
 q('reading.ending','Izlasi uzmanīgi: “Es devu grāmatu draugam.” Kam deva grāmatu?',['draugi','draugam','drauga'],1),
 q('reading.ending','Kurš vārds precīzi ir uzrakstīts: “Skolēni skrien pagalmā.”?',['skrēja','skrietu','skrien'],2),
 q('reading.detail','Izlasi: “Līga atnesa divas zilas krūzes, nevis trīs.” Cik krūzes Līga atnesa?',['Divas','Trīs','Vienu'],0),
 q('reading.detail','Izlasi: “Mazais suns negulēja. Tas gaidīja saimnieku.” Ko suns darīja?',['Gulēja','Gaidīja','Skrēja'],1),
 q('english.days','Kā angliski ir “trešdiena”?',['Thursday','Wednesday','Tuesday'],1),
 q('english.months','Kā angliski ir “oktobris”?',['October','August','November'],0),
 q('english.seasons','Ko nozīmē “spring”?',['Pavasaris','Ziema','Rudens'],0),
 q('english.pronouns','Kāds vietniekvārds der: “___ are my friends.”',['He','They','She'],1)
 ],
 samanta:[
 q('math.multiply','Cik ir 3 × 4?',['7','12','14'],1),
 q('math.multiply','Cik ir 6 × 5?',['30','25','35'],0),
 q('math.divide','Cik ir 20 ÷ 4?',['4','6','5'],2),
 q('math.story','Ir 3 šķīvji. Uz katra ir 2 āboli. Cik ābolu kopā?',['5','6','8'],1),
 q('reading.words','Izlasi vārdu: “puķīte”. Kurš variants ir tieši tāds pats?',['puķīte','puķītes','puķītei'],0),
 q('reading.ending','Izlasi: “Kaķis sēž zem galda.” Kur atrodas kaķis?',['Uz galda','Zem galda','Pie loga'],1),
 q('reading.detail','Izlasi: “Anna paņēma sarkanu somu.” Kādā krāsā bija soma?',['Zilā','Zaļā','Sarkanā'],2),
 q('reading.words','Kurš vārds ir uzrakstīts: “saulīte”?',['saule','saulīte','saulītes'],1),
 q('english.colors','Ko nozīmē “blue”?',['Zils','Zaļš','Sarkans'],0),
 q('english.animals','Ko nozīmē “cat”?',['Suns','Kaķis','Putns'],1),
 q('english.numbers','Kurš ir “seven”?',['7','6','9'],0),
 q('english.words','Kā angliski ir “grāmata”?',['ball','book','door'],1)
 ]
};
const E=(tag,txt)=>{const e=document.createElement(tag);if(txt!==undefined)e.textContent=txt;return e;};
export function analyzeDiagnostic(role,answers,times=[]){
 const questions=DIAGNOSTICS[role];if(!questions||answers.length!==questions.length)throw Error('Nederīgs sākuma tests');
 const skills={},sections={};
 for(let i=0;i<questions.length;i++){
  const item=questions[i],ok=answers[i]===item.answer;
  const group=item.skill.split('.')[0];
  const s=skills[item.skill]||{correct:0,total:0,observations:[]};s.correct+=Number(ok);s.total++;
  s.observations.push({correct:ok,responseMs:Number.isFinite(times[i])?Math.max(0,Math.round(times[i])):null});skills[item.skill]=s;
  const g=sections[group]||{correct:0,total:0};g.correct+=Number(ok);g.total++;sections[group]=g;
 }
 return {version:DIAGNOSTIC_VERSION,correct:Object.values(sections).reduce((a,x)=>a+x.correct,0),total:questions.length,sections,skills};
}
export function renderFirstDiagnostic(container,{role,canSubmit=false,alreadyCompleted=false,saveProgress=async()=>{},onBack=()=>{}}={}){
 const questions=DIAGNOSTICS[role],root=E('section');root.className='module learning-hub';
 container.replaceChildren(root);if(!questions)return;
 let position=0,answers=[],times=[],shownAt=0,busy=false;
 const button=(label,onClick)=>{const b=E('button',label);b.type='button';b.className='action-button';b.onclick=onClick;return b;};
 function intro(){
  root.replaceChildren(E('h2',role==='marks'?'🐉 Marka pirmā ekspedīcija':'🌷 Samantas pirmā ekspedīcija'));
  root.append(E('p','12 īsi uzdevumi no matemātikas, lasīšanas un angļu valodas. Nav atpakaļskaitīšanas. Ja kaut ko nezini, izvēlies savu labāko atbildi. Kļūdīties drīkst!'));
  root.append(E('p','Šī ir iepazīšanās, nevis atzīme. Balvu punktus šis tests nepiešķir.'));
  if(alreadyCompleted)root.append(E('p','✅ Tavā Firebase vēsturē sākuma misija jau ir izpildīta. To vari atkārtot tikai kā treniņu bez jauna sākuma rezultāta.'));
  if(!canSubmit)root.append(E('p','Vecāka priekšskatījums — rezultāts netiks saglabāts.'));
  root.append(button('Sākt misiju →',()=>{position=0;answers=[];times=[];question();}));
  root.append(button('← Atpakaļ',onBack));
 }
 function question(){
  const x=questions[position];shownAt=performance.now();
  root.replaceChildren(E('h2','Uzdevums '+(position+1)+' no '+questions.length));
  const p=E('p',x.prompt);p.style.cssText='font-size:clamp(1.25rem,3vw,1.8rem);line-height:1.65;font-weight:650;white-space:pre-wrap;';root.append(p);
  if(role==='samanta' && x.skill.startsWith('reading.')){
   root.append(E('p','Vispirms pamēģini izlasīt pati. Ja vajag, vari noklausīties.'));
   const speak=button('🔊 Noklausīties',()=>{if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x.prompt);u.lang='lv-LV';u.rate=0.8;speechSynthesis.speak(u);}});root.append(speak);
  }
  for(let i=0;i<x.choices.length;i++){
   const choice=button(x.choices[i],()=>{if(busy)return;times.push(Math.round(performance.now()-shownAt));answers.push(i);position++;if(position<questions.length)question();else void finish();});
   choice.style.cssText='display:block;width:100%;margin:12px 0;padding:16px;text-align:left;font-size:1.15rem';root.append(choice);
  }
  root.append(E('p','Strādā savā tempā. Šeit nav sacensību.'));
 }
 async function finish(){
  busy=true;const report=analyzeDiagnostic(role,answers,times);
  root.replaceChildren(E('h2','🎉 Pirmā ekspedīcija pabeigta!'));
  root.append(E('p','Tu izpildīji visus 12 uzdevumus. Šis ir tavs sākuma punkts — nākamajos treniņos redzēsim, kā aug prasmes.'));
  const labels={math:'Matemātika',reading:'Lasīšana',english:'Angļu valoda'};
  for(const [id,val] of Object.entries(report.sections))root.append(E('p',labels[id]+': '+val.correct+' no '+val.total));
  const status=E('p','');status.setAttribute('role','status');root.append(status);
  if(canSubmit&&!alreadyCompleted){
   status.textContent='Saglabāju sākuma rezultātu Firebase…';
   try{const id=await saveProgress({studentRole:role,subject:'Sākuma diagnostika',activityType:DIAGNOSTIC_VERSION,score:Math.round(report.correct*100/report.total),notes:JSON.stringify({kind:'baseline',...report})});if(!id)throw Error('Saglabāšana nav apstiprināta');status.textContent='✅ Sākuma rezultāts saglabāts Firebase.';}
   catch(e){status.textContent='⚠️ Rezultāts nav saglabāts Firebase. Lūdzu, pasaki vecākam.';}
  }else status.textContent=alreadyCompleted?'Atkārtots treniņš — sākuma rezultāts netiek pārrakstīts.':'Vecāka priekšskatījums — rezultāts nav saglabāts.';
  const prize=E('div');prize.className='soft-notice';
  prize.append(E('h3','🎁 Pirmās misijas pārsteigums'));
  prize.append(E('p','Par drosmi sākt un izpildīt visus uzdevumus vari kopā ar vecāku izvēlēties mazu prieku, piemēram, popkornu nākamajā filmu vakarā vai kopīgu galda spēli. Vecāks izlemj un sarunā, kad to īstenos. Šī nav automātiska BP balva.'));
  root.append(prize,button('← Uz priekšmetiem',onBack));busy=false;
 }
 intro();
}
