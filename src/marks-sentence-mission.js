// Marka jaunā tēma: vārdšķiras, gramatiskais centrs, paplašināts/nepaplašināts teikums.
const el=(tag,text='',className='')=>{const x=document.createElement(tag);x.textContent=text;if(className)x.className=className;return x;};
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
const TYPE='Teikumu pūķa akadēmija · gramatikas centrs';
const words=[
 {word:'kaķis',answer:'Lietvārds',why:'Kas? — kaķis. Tas nosauc dzīvu būtni.'},
 {word:'skrien',answer:'Darbības vārds',why:'Ko dara? — skrien.'},
 {word:'zaļš',answer:'Īpašības vārds',why:'Kāds? — zaļš.'},
 {word:'suns',answer:'Lietvārds',why:'Kas? — suns.'},
 {word:'lēni',answer:'Apstākļa vārds',why:'Kā? — lēni.'},
 {word:'zīmē',answer:'Darbības vārds',why:'Ko dara? — zīmē.'},
 {word:'balodis',answer:'Lietvārds',why:'Kas? — balodis.'},
 {word:'skaists',answer:'Īpašības vārds',why:'Kāds? — skaists.'},
 {word:'rūc',answer:'Darbības vārds',why:'Ko dara? — rūc.'},
 {word:'bērni',answer:'Lietvārds',why:'Kas? — bērni.'}
];
const wordHelp={
 'Lietvārds':[
  'Pajautā: KAS tas ir? Vārds var nosaukt cilvēku, dzīvnieku, lietu vai parādību.',
  'Pamēģini ievietot vārdu teikumā: “Es redzu ...”. Vai tas nosauc kaut ko vai kādu?',
  'Atceries: vārdšķira ir lietvārds, ja vārds nosauc būtni, priekšmetu vai parādību.'
 ],
 'Darbības vārds':[
  'Pajautā: KO DARA? Ko kāds dara šajā brīdī?',
  'Vai šis vārds nosauc darbību vai procesu? Piemēram, “suns skrien”.',
  'Atceries: darbības vārds nosauc darbību vai stāvokli.'
 ],
 'Īpašības vārds':[
  'Pajautā: KĀDS? KĀDA? Kāds ir priekšmets vai dzīvnieks?',
  'Pamēģini pievienot vārdu pirms lietvārda, piemēram, “... koks”.',
  'Atceries: īpašības vārds nosauc pazīmi.'
 ],
 'Apstākļa vārds':[
  'Pajautā: KĀ? KUR? KAD? Šeit vajadzētu noskaidrot, KĀ notiek darbība.',
  'Pievieno vārdu darbībai: “skrien ...”. Vai tas paskaidro skriešanas veidu?',
  'Atceries: apstākļa vārds var paskaidrot darbības veidu, vietu vai laiku.'
 ]
};
const wordContexts={
 kaķis:'Kaķis guļ uz paklāja.',skrien:'Suns skrien pa taku.',zaļš:'Zaļš koks aug pagalmā.',
 suns:'Suns rej.',lēni:'Bruņurupucis lēni rāpo.',zīmē:'Bērns zīmē māju.',
 balodis:'Balodis lido.',skaists:'Skaists zieds zied.',rūc:'Lauva rūc.',bērni:'Bērni rotaļājas.'
};
const sentences=[
 {sentence:'Kaķis ņaud.',center:['Kaķis','ņaud'],type:'Nepaplašināts'},
 {sentence:'Melns kaķis skaļi ņaud.',center:['kaķis','ņaud'],type:'Paplašināts'},
 {sentence:'Suņi lec.',center:['Suņi','lec'],type:'Nepaplašināts'},
 {sentence:'Pagalmā suņi priecīgi lec.',center:['suņi','lec'],type:'Paplašināts'},
 {sentence:'Balodis lido.',center:['Balodis','lido'],type:'Nepaplašināts'},
 {sentence:'Balts balodis lido virs mājas.',center:['balodis','lido'],type:'Paplašināts'},
 {sentence:'Lauva rūc.',center:['Lauva','rūc'],type:'Nepaplašināts'},
 {sentence:'Lielā lauva skaļi rūc.',center:['lauva','rūc'],type:'Paplašināts'},
 {sentence:'Klauns smejas.',center:['Klauns','smejas'],type:'Nepaplašināts'},
 {sentence:'Jautrais klauns smejas cirkā.',center:['klauns','smejas'],type:'Paplašināts'},
 {sentence:'Zēns lasa.',center:['Zēns','lasa'],type:'Nepaplašināts'},
 {sentence:'Mazais zēns vakarā lasa grāmatu.',center:['zēns','lasa'],type:'Paplašināts'}
];
const normal=s=>String(s).toLocaleLowerCase('lv-LV').replace(/[.!?;,]/g,'').trim().replace(/\s+/g,' ');
const tokenize=s=>normal(s).split(' ');
const parseAnswer=(s)=>normal(s).split(/[,;+\s]+/).filter(Boolean);
const toSentence=(subject,verb)=>subject.charAt(0).toLocaleUpperCase('lv-LV')+subject.slice(1)+' '+verb+'.';

export function renderMarksSentenceMission(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub sentence-mission');root.append(host);
 let stage='intro',practice=[],exam=[],position=0,score=0,submitted=false,saving=false,prevSet=new Set();
 const create=(kind)=>{let bank=kind==='word'?words:sentences;let options=shuffle(bank.filter(i=>!prevSet.has(i.word||i.sentence)));if(options.length<8)options=shuffle(bank);return options;};
 const button=(parent,text,handler,cls='action-button')=>{const b=el('button',text,cls);b.type='button';b.onclick=handler;parent.append(b);return b;};
 const head=(sub)=>{host.replaceChildren();host.append(el('h2','🐉 Teikumu pūķa akadēmija'),el('p',sub,'sentence-subtitle'));};
 const explain=(title,body)=>{const box=el('div','','sentence-tip');box.append(el('strong',title),el('p',body));host.append(box);};
 const choices=(question,items,correct,after,{hint='',independent=false,help=[]}={})=>{
  const box=el('section','','sentence-question');box.append(el('h3',question));host.append(box);
  const options=el('div','','sentence-options');box.append(options);
  const feedback=el('p','','sentence-feedback');feedback.setAttribute('role','status');box.append(feedback);
  let shownHints=0;
  if(!independent&&help.length){
   const guides=el('div','','sentence-help-tools');
   const ask=button(guides,'🧠 Kādu jautājumu uzdot?',()=>{
    feedback.style.color='';
    feedback.textContent=help[Math.min(shownHints,help.length-1)];
    if(shownHints<help.length-1)shownHints++;
   },'quiet-button');
   ask.setAttribute('aria-label','Saņemt palīgjautājumu vārdšķiras noteikšanai');
   box.insertBefore(guides,options);
  }
  let done=false;
  for(const choice of items)button(options,choice,()=>{
   if(done)return;
   const ok=choice===correct;
   if(!independent&&!ok){feedback.textContent='Vēl ne. Padomā, uz kādu jautājumu šis vārds atbild. '+(help[0]||'')+' Mēģini vēlreiz.';feedback.style.color='#a53b34';return;}
   done=true;[...options.querySelectorAll('button')].forEach(x=>x.disabled=true);
   if(independent)score+=Number(ok);
   feedback.textContent=ok?'✨ Pareizi! '+(!independent?hint:''):independent?'Pareizā atbilde: '+correct+'. '+hint:'✅ Pareizi! '+hint;
   const next=button(box,'➡️ '+(after.label||'Turpināt'),after.action,'action-button sentence-next');next.focus({preventScroll:true});
  },'quiet-button');
 };
 const inputQuestion=(title,description,validate,after,{independent=false,hints=[]}={})=>{
  const section=el('section','','sentence-question');section.append(el('h3',title),el('p',description));host.append(section);
  const form=el('form','','sentence-form');section.append(form);
  const input=el('textarea','','sentence-input');input.rows=2;input.placeholder='Raksti savu atbildi…';input.setAttribute('aria-label',title);form.append(input);
  const feedback=el('p','','sentence-feedback');feedback.setAttribute('role','status');form.append(feedback);
  let hintCount=0,done=false;
  if(hints.length)button(section,'💡 Pavediens',()=>{feedback.textContent=hints[Math.min(hintCount++,hints.length-1)];},'quiet-button');
  const check=el('button','Pārbaudīt atbildi','action-button');check.type='submit';form.append(check);
  form.onsubmit=ev=>{
   ev.preventDefault();if(done||!input.value.trim()){feedback.textContent='Vispirms ieraksti atbildi.';return;}
   const result=validate(input.value);
   if(!independent&&!result.ok){feedback.textContent=result.feedback||'Pamēģini vēlreiz.';return;}
   done=true;input.readOnly=true;check.disabled=true;
   if(independent)score+=Number(result.ok);
   feedback.textContent=result.ok?'✨ Pareizi!':(result.feedback||'Šoreiz nav pareizi.');
   button(section,'➡️ '+(after.label||'Turpināt'),after.action,'action-button sentence-next');
  };
 };
 const intro=()=>{
  stage='intro';head('Jauna tēma · 4. klase · Mācies bez taimera');
  explain('1. Vispirms atšķirsim vārdšķiras','Lietvārds nosauc būtni, priekšmetu vai parādību (kas?). Darbības vārds nosauc darbību (ko dara?). Īpašības vārds pasaka, kāds ir priekšmets.');
  explain('2. Tad atradīsim gramatisko centru','Teikuma gramatiskais centrs ir teikuma priekšmets (par ko runā?) un izteicējs (ko tas dara? / kāds ir?). Vārdšķira nav tas pats, kas teikuma loceklis.');
  explain('3. Pārveidosim teikumus','Vienkāršā nepaplašinātā teikumā nav citu teikuma locekļu ārpus gramatiskā centra. Paplašinātā teikumā ir arī citi teikuma locekļi. Piemērs: Kaķis ņaud. → Melns kaķis skaļi ņaud.');
  button(host,'🌱 Vispirms patrenēties →',()=>{practice=shuffle(words).slice(0,8);position=0;wordPractice();});
 };
 const wordPractice=()=>{
  stage='practice';if(position>=practice.length){position=0;grammarPractice();return;}
  head('1/3 · Vārdšķiru treniņš · '+(position+1)+'/'+practice.length);
  const w=practice[position];explain('Vārds teikumā',wordContexts[w.word]||w.word);
  choices('Kāda vārdšķira ir vārdam “'+w.word+'”?',['Lietvārds','Darbības vārds','Īpašības vārds','Apstākļa vārds'],w.answer,
   {label:'Nākamais vārds',action:()=>{position++;wordPractice();}},{hint:w.why,help:wordHelp[w.answer]});
 };
 const grammarPractice=()=>{
  stage='practice';const list=[sentences[0],sentences[1],sentences[3]];if(position>=list.length){position=0;transformPractice();return;}
  const item=list[position];head('2/3 · Teikuma centrs · '+(position+1)+'/3');
  explain('Aplūko teikumu',item.sentence);
  inputQuestion('Ieraksti priekšmetu un izteicēju','Raksti abus vārdus, piemēram: kaķis, ņaud',
   answer=>{const words=parseAnswer(answer);const ok=words.length===2&&item.center.every(w=>words.includes(normal(w)));return {ok,feedback:'Meklē, PAR KO ir teikums un KO tas dara. Teikuma centrs: '+item.center.join(', ')+'.'};},
   {label:'Nākamais teikums',action:()=>{position++;grammarPractice();}},
   {hints:['Atrodi vārdu, kurš atbild uz jautājumu “kas?”.','Atrodi izteicēju — ko dara teikuma priekšmets?']});
 };
 const transformPractice=()=>{
  head('3/3 · Pārveido teikumu');
  explain('Pūķa piemērs','Suņi lec. → Mazie suņi jautri lec. Pievienotie vārdi paskaidro, kādi suņi un kā tie lec.');
  inputQuestion('Paplašini teikumu “Kaķis ņaud.”','Ieraksti savu paplašināto teikumu. Saglabā kaķi un ņaudēšanu, pievieno vismaz vienu teikuma locekli.',
   answer=>{const text=tokenize(answer);const ok=text.includes('kaķis')&&text.includes('ņaud')&&text.length>2;return {ok,feedback:'Atstāj vārdus “kaķis” un “ņaud”, pievieno paskaidrojošus vārdus. Piemēram: Melns kaķis skaļi ņaud.'};},
   {label:'Doties uz pārbaudījumu',action:ready},{hints:['Kāds kaķis? Kur tas atrodas? Kā tas ņaud?','Piemērs: Melns kaķis skaļi ņaud.']});
 };
 const ready=()=>{
  stage='ready';head('🏆 Gatavs patstāvīgajai misijai?');
  explain('8 jautājumi · 85% meistarība','Pārbaudījumā būs vārdšķiras, teikuma centrs un teikumu veidi. Bonusu dod par vismaz 7 pareizām atbildēm no 8 (87,5%).');
  explain('Bonuss',alreadyEarnedBonus?'Šīs tēmas vienreizējais +10 provizorisko BP bonuss jau ir iegūts.':'Par pirmo apstiprināto pārbaudījumu no 85% — vienreizēji +10 provizoriskie BP. Mēģinājumu vari atkārtot ar citiem jautājumiem.');
  button(host,'⚔️ Sākt pārbaudījumu',()=>{exam=shuffle([...shuffle(words).slice(0,3).map(w=>({kind:'word',data:w})),...shuffle(sentences).slice(0,3).map(x=>({kind:'center',data:x})),...shuffle(sentences).slice(0,2).map(x=>({kind:'type',data:x}))]);prevSet=new Set(exam.map(x=>x.data.word||x.data.sentence));position=score=0;examStep();});
 };
 const examStep=()=>{
  stage='exam';if(position>=exam.length){results();return;}
  const q=exam[position];head('💎 Patstāvīgā misija · '+(position+1)+'/8');
  if(q.kind==='word')choices('Kāda vārdšķira ir “'+q.data.word+'”?',['Lietvārds','Darbības vārds','Īpašības vārds','Apstākļa vārds'],q.data.answer,
    {label:'Nākamais jautājums',action:()=>{position++;examStep();}},{independent:true,hint:q.data.why});
  else if(q.kind==='type')choices('Kāds teikums ir “'+q.data.sentence+'”?',['Nepaplašināts','Paplašināts'],q.data.type,
    {label:'Nākamais jautājums',action:()=>{position++;examStep();}},{independent:true,hint:'Teikumā gramatiskais centrs ir '+q.data.center.join(' un ')+'.'});
  else{
   explain('Atrodi teikuma gramatisko centru',q.data.sentence);
   inputQuestion('Ieraksti priekšmetu un izteicēju','Raksti divus vārdus, atdalot ar komatu. Piemēram: suns, skrien',
    answer=>{const words=parseAnswer(answer);const ok=words.length===2&&q.data.center.every(w=>words.includes(normal(w)));return {ok,feedback:'Gramatiskais centrs: '+q.data.center.join(', ')+'.'};},
    {label:'Nākamais jautājums',action:()=>{position++;examStep();}},{independent:true});
  }
 };
 const results=()=>{
  stage='results';head('🏆 Teikumu pūķa misija pabeigta');
  const pct=Math.round(score/8*100),qualified=pct>=85;
  host.append(el('div',pct+'%','result-hero'),el('p','Pareizi: '+score+' no 8.'));
  host.append(el('p',qualified?'💎 Meistarība sasniegta! Vari apstiprināt rezultātu.':'💪 Pamēģini vēlreiz ar citiem jautājumiem, lai apgūtu tēmu.'));
  const notice=el('p','Rezultāts vēl nav saglabāts.');notice.setAttribute('role','status');host.append(notice);
  const confirm=button(host,'✅ Esmu apmierināts — saglabāt',async()=>{
   if(saving||submitted)return;
   if(!canSubmit){notice.textContent='Vecāka priekšskatījums — rezultātu nesaglabā.';return;}
   saving=true;confirm.disabled=true;
   try{const id=await saveProgress({studentRole:'marks',subject:'Latviešu valoda',activityType:TYPE,score:pct,notes:JSON.stringify({correct:score,total:8,childConfirmed:true,masteryBonusEligible:qualified,spendableBP:0,serverVerified:false})});if(!id)throw Error('Saglabāšana nav apstiprināta');submitted=true;notice.textContent='✅ Saglabāts! '+(qualified&&!alreadyEarnedBonus?'Vienreizējais +10 provizorisko BP bonuss nopelnīts.':'');}
   catch(err){notice.textContent='⚠️ Neizdevās saglabāt: '+(err.message||'savienojuma kļūda');confirm.disabled=false;}
   finally{saving=false;}
  });
  button(host,'🔄 Trenēties vēlreiz ar citiem jautājumiem',()=>{submitted=false;practice=create('word').slice(0,4);position=0;wordPractice();});
 };
 intro();
}
