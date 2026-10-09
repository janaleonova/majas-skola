import {calculatePracticePoints,previewImprovement} from './points-policy.js';
// Marka skola: latviešu valodas trenažieri. Sākotnējā integrācijas versija.
const TOPICS=[
  {id:'morfemas',name:'Vārda sastāvs un vārddarināšana',icon:'🔎'},
  {id:'sazina',name:'Saziņa un saziņas veidi',icon:'💬'},
  {id:'vardskiras',name:'Vārdšķiras un vārda pamatforma',icon:'📚'}
];
const BANK={
 morfemas:[
  ['Kas ir vārda sakne?',['Vārda daļa, kas kopīga radniecīgiem vārdiem','Vienmēr vārda pēdējais burts','Vārda sākumā esošs priedēklis'],0,'Sakne izsaka radniecīgo vārdu kopīgo nozīmi.'],
  ['Kurš ir saliktenis?',['saules stars','saulespuķe','skaista puķe'],1,'Saliktenis veidots no divām vai vairākām saknēm.'],
  ['Kurš ir vārdu savienojums?',['sniegavīrs','ūdensroze','ūdens pudele'],2,'Vārdu savienojumu raksta atsevišķos vārdos.'],
  ['Kurš vārds ir radniecīgs vārdam “mežs”?',['mežains','mēness','maiss'],0,'Radniecīgiem vārdiem ir kopīga sakne un saistīta nozīme.'],
  ['Kas atrodas pirms saknes vārdā, ja vārdam ir priedēklis?',['galotne','priedēklis','piedēklis'],1,'Priedēklis atrodas pirms saknes.'],
  ['Kurš apgalvojums ir pareizs?',['Katram vārdam ir priedēklis','Katram vārdam ir piedēklis','Ne visiem vārdiem ir priedēklis'],2,'Priedēkļa un piedēkļa var nebūt.'],
  ['Izvēlies pareizi darinātu salikteni no vārdiem “saule” un “puķe”.',['saulespuķe','saule puķe','sauļpuķe'],0,'Saliktenis ir “saulespuķe”.']
 ],
 sazina:[
  ['Kura ir mutvārdu saziņa?',['Saruna klātienē','Vēstules rakstīšana','Plakāta lasīšana'],0,'Saruna klātienē ir mutvārdu saziņa.'],
  ['Kura ir rakstveida saziņa?',['Rokasspiediens','Īsziņa','Saruna pa telefonu'],1,'Īsziņa ir rakstveida saziņa.'],
  ['Kas palīdz saprast sarunas partneri?',['Pārtraukt viņu','Neklausīties','Uzmanīgi klausīties'],2,'Aktīva klausīšanās palīdz saprast teikto.'],
  ['Kā pieklājīgi pajautāt, ja nedzirdēji?',['Vai, lūdzu, vari atkārtot?','Runā normāli!','Tā nav mana problēma!'],0,'Pieklājīgs lūgums veicina labu saziņu.'],
  ['Kas ir neverbālā saziņa?',['E-pasta teksts','Sejas izteiksme','Grāmatas apraksts'],1,'Mīmika un žesti var nodot informāciju bez vārdiem.'],
  ['Kurš ir piemērots saziņas veids steidzamai sarunai?',['Vēstule pa pastu','Plakāts','Tālruņa zvans'],2,'Steidzamai informācijai parasti noder tiešs zvans.']
 ],
 vardskiras:[
  ['Kura vārdšķira nosauc priekšmetus un dzīvas būtnes?',['Lietvārds','Darbības vārds','Īpašības vārds'],0,'Lietvārds atbild, piemēram, uz jautājumu kas?'],
  ['Kurš vārds ir darbības vārds?',['skaists','skrien','koks'],1,'Darbības vārds nosauc darbību vai stāvokli.'],
  ['Kurš vārds ir īpašības vārds?',['māja','lasīt','gudrs'],2,'Īpašības vārds nosauc pazīmi.'],
  ['Kāda ir vārda “skrēja” nenoteiksme?',['skriet','skrēju','skriešana'],0,'Darbības vārda pamatforma ir nenoteiksme.'],
  ['Kura ir lietvārda “kokiem” pamatforma?',['kokos','koks','koki'],1,'Lietvārda pamatforma ir vienskaitļa nominatīvs, ja tas lietojams.'],
  ['Kura ir īpašības vārda “skaistākam” pamatforma?',['skaisti','skaistāk','skaists'],2,'Īpašības vārda pamatforma ir vīriešu dzimtes vienskaitļa nominatīvs.']
 ]
};
// Pārnesti un pielāgoti atlasīti sākotnējā trenažiera jautājumi.
BANK.morfemas.push(...[["Kura vārda sastāvdaļa atrodas pašās vārda beigās un lokot mainās?",["Galotne","Sakne","Priedēklis","Piedēklis"],0,"Galotne mainās, vārdu lokot: māja, mājas, mājai."],["Jānis strauji _______ no mājas pagalmā.",["izskrēja","ieskrēja","uzskrēja","pieskrēja"],0,"Priedēklis iz- norāda kustību uz āru."],["Skolēns uzmanīgi _______ klasē.",["iegāja","aizgāja","nogāja","izgāja"],0,"Ie- norāda kustību uz iekšu."],["Vāverīte veikli _______ augstā priedes zarā.",["uzkāpa","nokāpa","aizkāpa","iekāpa"],0,"Uz- norāda kustību augšup."],["Autobuss _______ pie pieturas.",["piebrauca","aizbrauca","pārbrauca","izbrauca"],0,"Pie- norāda tuvošanos."],["Skolotāja lūdza _______ kļūdaino vārdu pareizi.",["pārrakstīt","aizrakstīt","norakstīt","ierakstīt"],0,"Pār- šeit nozīmē darbību no jauna."],["Vakarā tētis _______ no tālā komandējuma.",["atbrauca","aizbrauca","izbrauca","uzbrauca"],0,"At- norāda atgriešanos."],["Kā sauc vārda daļu, kas ir kopīga radniecīgiem vārdiem?",["Sakne","Galotne","Priedēklis","Piedēklis"],0,"Sakne glabā radniecīgo vārdu kopīgo nozīmi."],["Kā sauc vārda daļu, kas atrodas PIRMS saknes?",["Priedēklis","Piedēklis","Galotne","Sakne"],0,"Priedēklis atrodas pirms saknes."],["Kas ir SALIKTENIS?",["Vārds no divām vai vairākām saknēm","Divi atsevišķi vārdi","Vārds tikai ar priedēkli","Vārds bez saknes"],0,"Saliktenī apvienotas vismaz divas saknes."],["Kas veido vārda IZSKAŅU?",["Piedēklis ar galotni vai tikai galotne","Priedēklis un sakne","Tikai priedēklis","Patskaņi"],0,"Izskaņa ir vārda beigu daļa aiz saknes."]]);
BANK.sazina.push(...[["Kas ir SAZIŅA?",["Informācijas, domu un jūtu apmaiņa","Tikai telefona zvans","Grāmatas lasīšana vienatnē","Klusēšana"],0,"Saziņā cilvēki nodod un saņem informāciju."],["Kā sauc cilvēku, kurš NODO ziņu?",["Sūtītājs","Saņēmējs","Vērotājs","Tulks"],0,"Sūtītājs nodod ziņu, saņēmējs to uztver."],["Kā sauc cilvēku, kurš uztver ziņu?",["Saņēmējs","Sūtītājs","Ziņnesis","Autors"],0,"Ziņas uztvērējs ir saņēmējs."],["Roberts zvana mammai. Kas ir sūtītājs?",["Roberts","Mamma","Telefons","Abi tikai saņēmēji"],0,"Roberts pasaka ziņu, mamma to uzklausa."],["Kas saziņā ir ZIŅA?",["Nodotā informācija","Tikai SMS","Tukša aploksne","Baterijas uzlāde"],0,"Ziņa ir informācija, ko nodod citam."],["Kura ir MUTVĀRDU saziņa?",["Saruna starpbrīdī","Apsveikuma kartīte","E-pasts","Ceļa zīme"],0,"Mutvārdu saziņā runā un klausās."],["Kura ir RAKSTVEIDA saziņa?",["Īsziņa draugam","Telefonsaruna","Mutiska uzstāšanās","Piemiegšana ar aci"],0,"Rakstveida saziņā izmanto uzrakstītu tekstu."],["Kāda priekšrocība ir rakstveida saziņai?",["Tekstu var pārlasīt vēlāk","Tā vienmēr ir skaļāka","Nav jādomā par vārdiem","To saprot visi dzīvnieki"],0,"Rakstītais saglabājas un ir pārlasāms."],["Kas ir NEVERBĀLĀ saziņa?",["Mīmika, žesti un poza","Svešvaloda","Tikai dators","Čukstēšana"],0,"Neverbālā saziņa notiek bez vārdiem."],["Kas ir MĪMIKA?",["Sejas izteiksme","Roku vicināšana","Skaļa runāšana","Rakstīšana"],0,"Mīmika ir sejas izteiksme."],["Kas ir ŽESTS?",["Roku vai galvas kustība ar nozīmi","Kliedziens","Rakstīts teikums","Frizūra"],0,"Žesti palīdz nodot informāciju."],["Ko nozīmē pirksts pie lūpām?",["Lūgums klusēt","Aicinājums dziedāt","Jādodas ēst","Jāatver logs"],0,"Tas ir žests, kas aicina ievērot klusumu."]]);
BANK.vardskiras.push(...[["Kāda ir vārda “skolēniem” pamatforma?",["skolēns","skolā","skolēni","skolot"],0,"Lietvārda pamatforma ir vienskaitļa nominatīvs."],["Kāda ir vārda “lasīja” pamatforma?",["lasīt","lasījums","lasa","lasītājs"],0,"Darbības vārda pamatforma ir nenoteiksme."],["Kāda ir īpašības vārda “zaļajām” pamatforma?",["zaļš","zaļa","zaļums","zaļot"],0,"Pamatforma ir vīriešu dzimtes vienskaitļa nominatīvs."],["Zem lielajiem OZOLIEM auga sēnes. Kāda ir izceltā vārda pamatforma?",["ozols","ozolains","ozoli","ozoliņš"],0,"Ozoliem → ozols."],["Kāda ir vārda “skrējām” pamatforma?",["skriet","skrējiens","skrienam","ātrs"],0,"Darbības vārda nenoteiksme ir skriet."],["Kāda ir īpašības vārda “gudrajai” pamatforma?",["gudrs","gudrība","gudri","gudrot"],0,"Gudrajai → gudrs."],["Kāda ir vārda “priecājamies” pamatforma?",["priecāties","prieks","priecīgs","priecīgi"],0,"Atgriezeniskā nenoteiksme ir priecāties."],["Kāda ir vārda “sniegā” pamatforma?",["sniegs","sniegainais","sniegot","sniegā"],0,"Sniegā → sniegs; tas ir lietvārds."],["Kāda ir lietvārda “mājām” pamatforma?",["māja","mājas","mājīgs","mājot"],0,"Mājām → māja."],["Kādu jautājumu uzdod lietvārda pamatformai?",["Kas?","Ko darīt?","Kāds?","Kad?"],0,"Lietvārda pamatforma atbild uz jautājumu kas?."],["Kādu jautājumu uzdod darbības vārda nenoteiksmei?",["Ko darīt?","Kas?","Kāds?","Cik?"],0,"Nenoteiksme atbild uz jautājumu ko darīt?."]]);
// Papildu formāti: vairākas pareizās atbildes un pārbaudāma brīvā ievade.
const EXTENDED={
 morfemas:[
  {kind:'multi',prompt:'Atzīmē visus radniecīgos vārdus vārdam “mežs”.',options:['mežiņš','mežains','mēness','mežmala','maiss'],answers:['mežiņš','mežains','mežmala'],explanation:'Radniecīgiem vārdiem ir kopīga sakne un saistīta nozīme.'},
  {kind:'multi',prompt:'Kuri no šiem ir salikteņi?',options:['saulespuķe','skolas soma','sniegavīrs','ūdens pudele','ūdensroze'],answers:['saulespuķe','sniegavīrs','ūdensroze'],explanation:'Saliktenim ir vismaz divas saknes, un to raksta vienā vārdā.'},
  {kind:'multi',prompt:'Atzīmē pareizos apgalvojumus par vārda sastāvu.',options:['Katram vārdam ir sakne.','Katram vārdam ir priedēklis.','Piedēklis var atrasties aiz saknes.','Visi radniecīgie vārdi nozīmē vienu un to pašu.'],answers:['Katram vārdam ir sakne.','Piedēklis var atrasties aiz saknes.'],explanation:'Priedēkļa un piedēkļa var nebūt; radniecīgiem vārdiem ir saistīta, nevis vienāda nozīme.'},
  {kind:'text',prompt:'Uzraksti salikteni, ko veido vārdi “saule” un “puķe”.',answers:['saulespuķe'],explanation:'Saule + puķe → saulespuķe.'},
  {kind:'text',prompt:'Kā sauc vārda daļu, kas atrodas pirms saknes?',answers:['priedēklis'],explanation:'Pirms saknes var atrasties priedēklis.'}
 ],
 sazina:[
  {kind:'multi',prompt:'Kuri ir rakstveida saziņas piemēri?',options:['E-pasts','Īsziņa','Telefonsaruna','Vēstule','Saruna klātienē'],answers:['E-pasts','Īsziņa','Vēstule'],explanation:'Rakstveida saziņā izmanto rakstītu tekstu.'},
  {kind:'multi',prompt:'Kas palīdz veidot pieklājīgu sarunu?',options:['Uzklausīt otru','Nepārtraukt runātāju','Izsmiet kļūdas','Uzdot precizējošu jautājumu'],answers:['Uzklausīt otru','Nepārtraukt runātāju','Uzdot precizējošu jautājumu'],explanation:'Pieklājīga saziņa prasa savstarpēju cieņu.'},
  {kind:'text',prompt:'Kā sauc cilvēku, kurš saņem ziņu?',answers:['saņēmējs'],explanation:'Ziņas saņēmējs uztver sūtītāja nodoto informāciju.'},
  {kind:'text',prompt:'Kā sauc sejas izteiksmi, kas palīdz sazināties bez vārdiem?',answers:['mīmika'],explanation:'Mīmika ir neverbālās saziņas līdzeklis.'}
 ],
 vardskiras:[
  {kind:'multi',prompt:'Atzīmē visus darbības vārdus.',options:['skrien','lasīt','skaists','domāja','māja'],answers:['skrien','lasīt','domāja'],explanation:'Darbības vārdi nosauc darbību vai stāvokli.'},
  {kind:'multi',prompt:'Atzīmē visus īpašības vārdus.',options:['gudrs','zaļa','ātri','skaists','skola'],answers:['gudrs','zaļa','skaists'],explanation:'Īpašības vārdi nosauc pazīmi.'},
  {kind:'text',prompt:'Uzraksti darbības vārda “skrēja” pamatformu.',answers:['skriet'],explanation:'Darbības vārda pamatforma ir nenoteiksme.'},
  {kind:'text',prompt:'Uzraksti lietvārda “kokiem” pamatformu.',answers:['koks'],explanation:'Lietvārda pamatforma parasti ir vienskaitļa nominatīvs.'}
 ]
};
const normalize=s=>String(s).trim().toLocaleLowerCase('lv-LV').replace(/\s+/g,' ');
const shuffle=a=>{let b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
export function renderLatvianSchool(container,{canSubmit=false,currentUid='',saveProgress=async()=>{},askAI=null}={}){
 const prefix=canSubmit&&currentUid?'majas-skola:'+currentUid+':marks-lv:':null;
 const host=document.createElement('section');host.className='module learning-hub latvian-hub';host.style.gridColumn='1/-1';
 host.innerHTML='<div class="learning-heading"><span class="eyebrow">✦ MARKA VALODAS LABORATORIJA</span><h2>📕 Vārdu piedzīvojums</h2><p>Atklāj vārdu noslēpumus, pārbaudi sevi un audzē prasmes! Izvēlies tēmu.</p></div>';
 container.append(host);
 const nav=document.createElement('div');nav.className='topic-grid';host.append(nav);
 const content=document.createElement('div');host.append(content);
 const historyKey=topic=>prefix+'history-'+topic.id;
 function readHistory(topic){if(!prefix)return [];try{const val=JSON.parse(localStorage.getItem(historyKey(topic))||'[]');return Array.isArray(val)?val.slice(-30):[];}catch{return [];}}
 function saveHistory(topic,row){if(!prefix)return;try{localStorage.setItem(historyKey(topic),JSON.stringify([...readHistory(topic),row].slice(-30)));}catch{}}
 function skillOf(topic,q){
  const p=q.prompt.toLocaleLowerCase('lv-LV');
  if(topic.id==='sazina'){
    if(/žest|mīmik|neverbāl|sejas/.test(p))return 'Neverbālā saziņa';
    if(/pieklāj|uzklaus|sarun|saprast/.test(p))return 'Sarunāšanās prasmes';
    return 'Saziņas veidi un jēdzieni';
  }
  if(topic.id==='vardskiras'){
    if(/pamatform|nenoteiksm/.test(p))return 'Vārda pamatforma';
    return 'Vārdšķiru atpazīšana';
  }
  if(/salikten|vārdu savienojum/.test(p))return 'Salikteņi';
  if(/radniecīg|sakn/.test(p))return 'Sakne un radniecīgie vārdi';
  if(/priedēkl|ieskrēj|izskrēj|brauca|kāpa|pārrakst/.test(p))return 'Priedēkļi';
  if(/izskaņ|piedēkl|galotn/.test(p))return 'Vārda sastāvs';
  return 'Vārda sastāvs un vārddarināšana';
 }
 function aiButton(parent,label,payload){
  if(!canSubmit || typeof askAI!=='function')return;
  const button=addButton(parent,label,async()=>{
   button.disabled=true;button.textContent='🤖 Domāju…';
   const output=document.createElement('p');output.setAttribute('role','status');parent.append(output);
   try{output.textContent=await askAI(payload);}
   catch(e){output.textContent='MI treneris pašlaik nav pieejams. Turpinām parasto treniņu.';console.warn('[Marka skola] MI:',e?.message||'unknown');}
   finally{button.disabled=false;button.textContent=label;}
  });
 }
 const pending=new Map();
 function pendingKey(topic){return prefix+'errors-'+topic.id;}
 function loadPending(topic){
   if(pending.has(topic.id))return pending.get(topic.id);
   if(!canSubmit)return [];
   try{
     const raw=JSON.parse(localStorage.getItem(pendingKey(topic))||'[]');
     const valid=Array.isArray(raw)?raw.filter(prompt=>typeof prompt==='string').slice(0,30):[];
     const all=[...BANK[topic.id].map(q=>q[0]),...(EXTENDED[topic.id]||[]).map(q=>q.prompt)];
     const found=valid.filter(prompt=>all.includes(prompt)).map(prompt=>({prompt}));
     pending.set(topic.id,found);return found;
   }catch{return [];}
 }
 function remember(topic,missed){
   if(!canSubmit)return;
   const questions=missed.slice(0,30);
   pending.set(topic.id,questions);
   try{if(questions.length)localStorage.setItem(pendingKey(topic),JSON.stringify(questions.map(q=>q.prompt)));
   else localStorage.removeItem(pendingKey(topic));}catch{}
 }
 function addButton(parent,title,onClick){const button=document.createElement('button');button.type='button';button.textContent=title;button.style.margin='8px';button.onclick=onClick;parent.append(button);return button;}
 for(const topic of TOPICS){const b=document.createElement('button');b.type='button';b.className='topic-tile';b.innerHTML='<span class="topic-emoji">'+topic.icon+'</span><strong>'+topic.name+'</strong><small>Atvērt trenažieri →</small>';b.onclick=()=>choose(topic);nav.append(b);}
 function choose(topic){content.replaceChildren();
  const h=document.createElement('h3');h.textContent='✦ '+topic.name;content.append(h);
  const past=readHistory(topic);
  if(past.length){
   const best=Math.max(...past.map(p=>p.percent||0));const last=past[past.length-1];
   const summary=document.createElement('p');summary.textContent='📈 Mans progress · Pēdējais: '+last.percent+'% · Labākais: '+best+'% · Mēģinājumi: '+past.length;content.append(summary);
   const recent=past.slice(-5).map(p=>p.percent+'%').join(' → ');
   const line=document.createElement('small');line.textContent='Pēdējie rezultāti: '+recent;content.append(line);
  }
  const missed=loadPending(topic);if(missed.length){const note=document.createElement('p');note.textContent='🐉 Vēl vari nostiprināt '+missed.length+' jautājumus, kuros kļūdījies.';content.append(note);addButton(content,'🎯 Trenēt manas kļūdas',()=>start(topic,'errors',missed));}
  for(const [key,label] of [['learn','📖 Mācos'],['practice','🎯 Trenējos'],['exam','📝 Pārbaudu sevi']]){
   const b=document.createElement('button');b.type='button';b.textContent=label;b.className='action-button';b.style.margin='5px';b.onclick=()=>start(topic,key);content.append(b);}
 }
 function start(topic,mode,previousMisses=[]){const base=BANK[topic.id].map(q=>({kind:'single',prompt:q[0],options:q[1].map((label,i)=>({label,correct:i===q[2]})),explanation:q[3]}));
  const extras=EXTENDED[topic.id]||[];
  const all=[...base,...extras];
  const targetedSkills=new Set(previousMisses.map(q=>skillOf(topic,q)));
  const fresh=all.filter(q=>!previousMisses.some(old=>old.prompt===q.prompt));
  const targeted=fresh.filter(q=>targetedSkills.has(skillOf(topic,q)));
  // First train the same skills with fresh examples; broaden only if bank is too small.
  const source=mode==='errors'
    ? [...shuffle(targeted),...shuffle(fresh.filter(q=>!targeted.includes(q)))]
    : shuffle(all);
  // Error practice uses different questions from the same topic; never repeat the missed prompts.
  const wanted=mode==='errors'?Math.min(10,Math.max(4,previousMisses.length*2)):mode==='exam'?20:mode==='practice'?12:8;
  let items=source.slice(0,Math.min(wanted,source.length)).map(q=>({...q,options:shuffle(q.options||[])}));
  let index=0,correct=0,streak=0,maxStreak=0;
  const results=[];
  const missed=[];
  const skillStats={};
  render();
  function render(){content.replaceChildren();
   if(index===items.length){void finish();return;}
   const progress=document.createElement('div');progress.className='progress-track';const fill=document.createElement('div');fill.className='progress-fill';fill.style.width=Math.round(index/items.length*100)+'%';progress.append(fill);content.append(progress);
   const streakTag=document.createElement('p');streakTag.className='streak-label';streakTag.textContent='🔥 '+streak+' pareizas pēc kārtas · Rekords: '+maxStreak;content.append(streakTag);
   const q=items[index],h=document.createElement('h3');h.className='latvian-question';h.textContent=(index+1)+'/'+items.length+' · '+q.prompt;content.append(h);
   const form=document.createElement('form');form.className='latvian-question-form';content.append(form);
   const feedback=document.createElement('p');feedback.setAttribute('role','status');
   let input;
   if(q.kind==='text'){
    input=document.createElement('input');input.type='text';input.required=true;input.autocomplete='off';input.maxLength=100;input.style.cssText='display:block;max-width:400px;width:100%;padding:12px;font:inherit;margin:12px 0;border:1px solid #aebdd0;border-radius:9px';form.append(input);
   }else{
    if(q.kind==='multi'){const hint=document.createElement('p');hint.textContent='Iespējamas vairākas pareizās atbildes.';form.append(hint);}
    q.options.forEach((o,i)=>{const label=document.createElement('label');label.style.cssText='display:block;padding:10px;cursor:pointer';const control=document.createElement('input');control.type=q.kind==='multi'?'checkbox':'radio';control.name='choice';control.value=String(i);label.append(control,document.createTextNode(' '+(typeof o==='string'?o:o.label)));form.append(label);});
   }
   if(mode==='learn'){const hint=document.createElement('button');hint.type='button';hint.textContent='💡 Palīdzība';hint.onclick=()=>{feedback.textContent='Izlasi uzdevumu vēlreiz. Salīdzini variantu nozīmi un atceries tēmas pamatprincipu.';};form.append(hint);}
   const btn=document.createElement('button');btn.type='submit';btn.textContent='Pārbaudīt';btn.style.margin='8px';form.append(btn);content.append(feedback);
   form.onsubmit=e=>{e.preventDefault();let good=false;
    if(q.kind==='text'){good=q.answers.some(a=>normalize(a)===normalize(input.value));}
    else if(q.kind==='multi'){const selected=[...form.querySelectorAll('input:checked')].map(el=>q.options[Number(el.value)]);if(selected.length===0){feedback.textContent='Izvēlies vismaz vienu atbildi.';return;}good=selected.length===q.answers.length&&selected.every(x=>q.answers.includes(x));}
    else{const selection=form.querySelector('input:checked');if(!selection){feedback.textContent='Izvēlies atbildi.';return;}good=q.options[Number(selection.value)].correct;}
    correct+=Number(good);streak=good?streak+1:0;maxStreak=Math.max(maxStreak,streak);results.push(good);if(!good)missed.push(q);
    const skill=skillOf(topic,q);const stats=skillStats[skill]||(skillStats[skill]={correct:0,total:0});stats.total++;stats.correct+=Number(good);
    if(!good&&mode!=='exam'){aiButton(content,'🤖 Palīdzi saprast', {mode:'hint',skill,question:q.prompt,studentAnswer:q.kind==='text'?input.value:q.kind==='multi'?[...form.querySelectorAll('input:checked')].map(el=>q.options[Number(el.value)]).join(', '):String(q.options[Number(form.querySelector('input:checked')?.value)]?.label||''),explanation:q.explanation,attempt:1});}form.querySelectorAll('input,button').forEach(el=>el.disabled=true);
    feedback.textContent=mode==='exam'?'Atbilde saglabāta.':good?'✅ Pareizi!':('🔄 Vēl ne. '+q.explanation);
    const next=document.createElement('button');next.className='action-button';next.type='button';next.textContent=index+1===items.length?'Rezultāts':'Nākamais →';next.onclick=()=>{index++;render();};content.append(next);
   };
  }
  async function finish(){const pct=Math.round(correct/items.length*100);const h=document.createElement('h3');h.textContent=topic.name+': '+pct+'% ('+correct+'/'+items.length+')';content.append(h);
   const breakdown=Object.entries(skillStats).map(([skill,stat])=>({skill,percent:Math.round(100*stat.correct/stat.total),correct:stat.correct,total:stat.total})).sort((a,b)=>a.percent-b.percent);
   if(breakdown.length){
    const heading=document.createElement('h4');heading.textContent='Prasmju pārskats';content.append(heading);
    for(const skill of breakdown){const line=document.createElement('p');line.textContent=(skill.percent>=80?'🟢 ':skill.percent>=60?'🟡 ':'🟠 ')+skill.skill+': '+skill.percent+'% ('+skill.correct+'/'+skill.total+')';content.append(line);}
    if(breakdown[0].percent<80){const suggestion=document.createElement('p');suggestion.textContent='Ieteikums: vēl patrenē “'+breakdown[0].skill+'”.';content.append(suggestion);}
   }
   const policy=calculatePracticePoints({correct,total:items.length,maxStreak,mode});
   const bestKey=prefix+'best-'+topic.id;let bestBefore=0;if(prefix)try{bestBefore=Number(localStorage.getItem(bestKey))||0;}catch{}
   const award=previewImprovement(bestBefore,policy.potential);
   const points=document.createElement('div');points.className='soft-notice';
   points.textContent=policy.eligible?'🏅 Punktu potenciāls '+policy.potential+'/20 · Uzlabojums +'+award.earned+' treniņa BP · Sērijas bonuss '+policy.streakBonus:'🌱 Mācību režīmā balvu punktus neiegūst.';
   content.append(points);
   const note=document.createElement('p');note.className='points-disclaimer';note.textContent='Treniņa BP pašlaik ir informatīvi un netiek pieskaitīti balvu makam, līdz ieviesta droša servera pārbaude.';content.append(note);
   const practiceRow={date:new Date().toISOString(),mode,percent:pct,correct,total:items.length,skills:breakdown,maxStreak,pointsPotential:policy.potential,pointsPreview:award.earned};
   if(breakdown.length)aiButton(content,'🤖 MI trenera ieteikums',{mode:'result',skill:breakdown[0].skill,percent:pct});
   if(mode!=='errors')remember(topic,missed);
   else if(missed.length)remember(topic,missed);
   else remember(topic,[]);
   if(missed.length){
    const callout=document.createElement('div');callout.style.cssText='border:1px solid #b7cfe3;border-radius:12px;padding:14px;margin:14px 0;background:#f3f8fd';
    const title=document.createElement('strong');title.textContent='🐉 Vēl viens neliels izaicinājums?';callout.append(title);
    const desc=document.createElement('p');desc.textContent='Tev bija '+missed.length+' nepareizas atbildes. Pamēģini līdzīgus uzdevumus ar citiem piemēriem!';callout.append(desc);
    addButton(callout,'🎯 Trenēt manas kļūdas',()=>start(topic,'errors',missed));
    addButton(callout,'Vēlāk',()=>choose(topic));content.append(callout);
   }else if(mode==='errors'){
    const done=document.createElement('p');done.textContent='🎉 Labi! Šajā kļūdu treniņā visi uzdevumi izpildīti pareizi.';content.append(done);
   }
   const status=document.createElement('p');content.append(status);
   if(canSubmit){try{const id=await saveProgress({studentRole:'marks',activityType:topic.name+' · '+mode,subject:'Latviešu valoda',score:pct,notes:JSON.stringify({topicId:topic.id,mode,correct,total:items.length,skills:breakdown})});if(!id)throw Error('Nav apstiprināta saglabāšana');saveHistory(topic,practiceRow);if(prefix)try{localStorage.setItem(bestKey,String(award.best));}catch{};status.textContent='✅ Rezultāts saglabāts Firebase.';}catch{status.textContent='⚠️ Rezultātu neizdevās saglabāt.';}}
   else status.textContent='Vecāka priekšskatījums: rezultāts nav saglabāts.';
   const again=document.createElement('button');again.type='button';again.textContent='Trenēties vēlreiz';again.onclick=()=>start(topic,mode);content.append(again);
   const back=document.createElement('button');back.type='button';back.textContent='Atpakaļ uz režīmiem';back.style.margin='8px';back.onclick=()=>choose(topic);content.append(back);
  }
 }
}