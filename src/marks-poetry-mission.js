// Literatūras superizaicinājums: īsi pārbaudīti autoru fragmenti + skaidri marķēti oriģināluzdevumi.
const TYPE='Dzejas superizaicinājums · Rainis un Kronbergs';
const el=(tag,value='',cls='')=>{const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e;};
const shuffle=arr=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const clean=s=>String(s).toLocaleLowerCase('lv-LV').replace(/[.,!?;:–—„“"']/g,'').trim().replace(/\s+/g,' ');
const texts=[
 {id:'rainis',author:'Rainis',title:'Saulītes uzdevums vasarā',source:'https://skolenam.lv/lv/darbi/literatura/latviesu-autoru-dzeja-un-dzejoli/15',lines:['Saulīte-māmiņa,','Vasara-meitiņa.'],theme:'Daba un vasara',mood:'Silta, gaiša',characters:'Saule un vasara'},
 {id:'kronbergs',author:'Juris Kronbergs',title:'Bez iemesla',source:'https://dgramata.lv/gramatas/dzeja/uz-balkona-bet-ja-visu-laiku/',lines:['bez iemesla','jauna zilbe','atrod papīru','pasaule pārtop'],theme:'Vārdi un radīšana',mood:'Pārdomu pilna',characters:'Personificēta zilbe'}
];
const questions=[
 {kind:'choice',question:'Kas ir dzejoļa tēma?',options:['Par ko dzejolī stāstīts','Cik pantu ir dzejolī','Autora uzvārds'],correct:'Par ko dzejolī stāstīts',hint:'Tēma pasaka, par ko teksts vēsta.'},
 {kind:'choice',question:'Kas ir dzejoļa noskaņa?',options:['Sajūta, ko rada dzejolis','Dzejoļa garums','Tikai pēdējais vārds'],correct:'Sajūta, ko rada dzejolis',hint:'Noskaņa var būt priecīga, skumja, mierīga vai noslēpumaina.'},
 {kind:'choice',question:'Kas ir atskaņas?',options:['Līdzīgi skanošas vārdu beigas','Visi vārdi vienā pantā','Dzejoļa nosaukums'],correct:'Līdzīgi skanošas vārdu beigas',hint:'Atskaņas bieži dzirdamas rindu beigās.'},
 {kind:'source',source:0,question:'Kurš autors rakstījis šo īso fragmentu?',options:['Rainis','Juris Kronbergs'],correct:'Rainis',hint:'Fragmenta avots ir norādīts zem panta.'},
 {kind:'source',source:0,question:'Kāda noskaņa vislabāk atbilst fragmentam?',options:['Silta un gaiša','Dusmīga un draudīga','Baisa'],correct:'Silta un gaiša',hint:'Padomā par saulīti un vasaru.'},
 {kind:'source',source:0,question:'Kuri tēli ir šajā fragmentā?',options:['Saulīte un vasara','Vilks un lācis','Skolotājs un skolēns'],correct:'Saulīte un vasara',hint:'Izlasi, kas tekstā nosaukts.'},
 {kind:'source',source:1,question:'Kurš autors ir šī īsā dzejoļa fragmenta autors?',options:['Juris Kronbergs','Rainis'],correct:'Juris Kronbergs',hint:'Skaties autoru avotu.'},
 {kind:'source',source:1,question:'Par ko liek domāt Kronberga fragments?',options:['Par vārdu radīšanu un pārvērtībām','Par suņa pastaigu','Par sacensībām'],correct:'Par vārdu radīšanu un pārvērtībām',hint:'Kas notiek ar zilbi un pasauli?'},
 {kind:'source',source:1,question:'Kas Kronberga fragmentā darbojas neparastā veidā?',options:['Zilbe, kas atrod papīru','Lācis, kas dejo','Saule, kas spēlē bumbu'],correct:'Zilbe, kas atrod papīru',hint:'Pamani, kam piedēvēta darbība.'},
 {kind:'choice',question:'Kas kopīgs abiem fragmentiem?',options:['Izmantota tēlaina valoda','Abos ir vilks','Abos ir tieši četras atskaņas'],correct:'Izmantota tēlaina valoda',hint:'Saulīte-māmiņa un zilbe, kas atrod papīru, rada tēlus.'},
 {kind:'rhyme',question:'Kurš vārds atskaņojas ar “māja”?',options:['kāja','mežs','logs'],correct:'kāja',hint:'Klausies vārda beigas.'},
 {kind:'rhyme',question:'Kurš vārds atskaņojas ar “diena”?',options:['viena','lietus','saule'],correct:'viena',hint:'Klausies vārda beigas.'},
 {kind:'rhyme',question:'Kurš pāris atskaņojas?',options:['zied — dzied','zied — koks','zied — saule'],correct:'zied — dzied',hint:'Vai skan līdzīgi vārdu beigas?'},
 {kind:'choice',question:'Kura noskaņa vislabāk atbilst rindai “Vējš klusi čukst pie loga”?',options:['Noslēpumaina un mierīga','Dusmīga un trokšņaina','Svētku un skaļa'],correct:'Noslēpumaina un mierīga',hint:'Šī ir šai spēlei īpaši sacerēta rinda, nevis citāts.'},
 {kind:'open',question:'Uzraksti savu divrindi par dabu. Pamēģini izveidot atskaņu rindu beigās.',accept:['oze'],sample:'Izdomā divas īsas rindiņas par dabu.',hint:'Uzraksti vienu vai divas rindiņas, kuras veido tēlu.'}
];
const extraQuestions=[{"kind":"choice","question":"Kas palīdz noteikt dzejoļa tēmu?","options":["Vārdi un notikumi, par kuriem rakstīts","Rindu skaits","Papīra krāsa"],"correct":"Vārdi un notikumi, par kuriem rakstīts","hint":"Meklē, kas tekstā tiek aprakstīts."},{"kind":"choice","question":"Kura atbilde raksturo noskaņu, nevis tēmu?","options":["Mierīga un sapņaina","Pavasara ziedi","Vārdi un zilbes"],"correct":"Mierīga un sapņaina","hint":"Noskaņa ir sajūta, nevis temats."},{"kind":"choice","question":"Kas ir dzejoļa tēls?","options":["Tas, kurš dzejolī darbojas vai ir attēlots","Tikai dzejoļa autors","Tikai atskaņa"],"correct":"Tas, kurš dzejolī darbojas vai ir attēlots","hint":"Tēls var būt cilvēks, dzīvnieks, priekšmets vai personificēta dabas parādība."},{"kind":"choice","question":"Kā tekstā var pamatot noskaņu?","options":["Nosaucot konkrētus vārdus, kuri to rada","Nosaucot vienīgi autora dzimšanas dienu","Saskaitot burtus"],"correct":"Nosaucot konkrētus vārdus, kuri to rada","hint":"Paskaidro, kuri vārdi palīdzēja tā justies."},{"kind":"choice","question":"Kā atšķiras tēma un noskaņa?","options":["Tēma — par ko; noskaņa — kādas sajūtas","Tie vienmēr nozīmē vienu un to pašu","Noskaņa ir tikai rindu skaits"],"correct":"Tēma — par ko; noskaņa — kādas sajūtas","hint":"Meklē divus jautājumus: par ko? un kā es jūtos?"},{"kind":"choice","question":"Vai katrā dzejolī obligāti ir atskaņas?","options":["Nē, dzeja var būt arī bez atskaņām","Jā, vienmēr","Tikai Raiņa dzejā"],"correct":"Nē, dzeja var būt arī bez atskaņām","hint":"Dzeja var izmantot ritmu, atkārtojumu un tēlainību bez atskaņām."},{"kind":"choice","question":"Kādēļ dzejnieks izmanto atskaņas?","options":["Lai radītu skanīgumu un saistītu rindas","Lai vienmēr padarītu dzejoli garāku","Lai paslēptu autoru"],"correct":"Lai radītu skanīgumu un saistītu rindas","hint":"Pievērs uzmanību rindu beigu skanējumam."},{"kind":"choice","question":"Kurš pāris atskaņojas?","options":["rīts — spīts","rīts — siena","rīts — saule"],"correct":"rīts — spīts","hint":"Ieklausies vārda beigās."},{"kind":"choice","question":"Kurš pāris atskaņojas?","options":["laiks — vaigs","laiks — upe","laiks — zieds"],"correct":"laiks — vaigs","hint":"Atskaņām svarīga izruna, ne tikai burti."},{"kind":"choice","question":"Kurš pāris atskaņojas?","options":["roka — moka","roka — vējš","roka — puķe"],"correct":"roka — moka","hint":"Meklē līdzīgu skanējumu vārda beigās."},{"kind":"choice","question":"Kurš pāris atskaņojas?","options":["saule — paaule","saule — zaule","saule — māja"],"correct":"saule — māja","hint":"Ne visiem vārdiem no piedāvājuma ir īsta atskaņa. Ievēro, ka jāmeklē skanējums."},{"kind":"choice","question":"Kas ir dzejas rinda?","options":["Viena teksta rinda dzejolī","Viss grāmatas vāks","Tikai autora vārds"],"correct":"Viena teksta rinda dzejolī","hint":"Vairākas dzejas rindas var veidot pantu."},{"kind":"choice","question":"Kas ir pants?","options":["Kopā apvienotas dzejoļa rindas","Jebkurš atsevišķs burts","Dzejoļa nosaukums"],"correct":"Kopā apvienotas dzejoļa rindas","hint":"Aplūko dzejoļa rindkopām līdzīgo izkārtojumu."},{"kind":"choice","question":"Kāda noskaņa ir pašsacerētajā rindā “Klusi krīt sniegs, un viss guļ”? ","options":["Mierīga","Nikna","Steidzīga"],"correct":"Mierīga","hint":"Tas nav Raiņa vai Kronberga citāts — ieklausies vārdos “klusi” un “guļ”."},{"kind":"choice","question":"Kāda tēma ir pašsacerētajā rindā “Pavasarī pumpuri veras”? ","options":["Dabas atmoda","Pilsētu satiksme","Ziemas sports"],"correct":"Dabas atmoda","hint":"Kas ir attēlots? Tas nav abu autoru citāts."},{"kind":"choice","question":"Kas var būt kopīgs dažādu autoru dzejoļiem?","options":["Tēmas, tēli, noskaņa vai tēlaina valoda","Obligāti vienāds vārdu skaits","Obligāti vienāda dzimšanas vieta"],"correct":"Tēmas, tēli, noskaņa vai tēlaina valoda","hint":"Salīdzini redzamo tekstā, nevis tikai autoru vārdus."},{"kind":"choice","question":"Kā pamatot kopīgo Raiņa un Kronberga fragmentos?","options":["Nosaucot tēlainu izteiksmi katrā fragmentā","Uzminot abu rakstīšanas laiku","Izvēloties vienu mīļāko autoru"],"correct":"Nosaucot tēlainu izteiksmi katrā fragmentā","hint":"Raiņa saule kā māmiņa un Kronberga zilbe kā darītāja ir tēlainības piemēri."},{"kind":"choice","question":"Kas Rainim īsajā fragmentā ir personificēts?","options":["Saulīte un vasara","Sniegavīrs un suns","Burtnīca un zīmulis"],"correct":"Saulīte un vasara","hint":"Saulīte ir nosaukta par māmiņu, vasara — par meitiņu."},{"kind":"choice","question":"Kāpēc vārdu “zilbe” Kronberga fragmentā var uzskatīt par tēlu?","options":["Tai piedēvēta darbība — tā atrod papīru","Jo zilbe ir dzīvnieks","Jo tai obligāti ir atskaņa"],"correct":"Tai piedēvēta darbība — tā atrod papīru","hint":"Nedzīva vai abstrakta lieta tekstā var darboties kā tēls."},{"kind":"choice","question":"Kā atbildēt uz NPD jautājumu “Raksturo noskaņu”?","options":["Nosaukt sajūtu un vienu piemēru no teksta","Uzrakstīt tikai “labs dzejolis”","Nosaukt tikai autoru"],"correct":"Nosaukt sajūtu un vienu piemēru no teksta","hint":"Labā atbilde ietver apgalvojumu un pamatojumu."}];
const fullBank=[...questions,...extraQuestions];
const writingTasks=[
 {kind:'writing',question:'Raksturo Raiņa fragmenta noskaņu 1–2 teikumos.',source:0,hint:'Nosauc sajūtu un pamato to ar vārdiem “saulīte” un “vasara”.',example:'Fragments rada siltu, gaišu noskaņu, jo saule un vasara attēlotas kā tuvas personas.'},
 {kind:'writing',question:'Kādi tēli darbojas Jura Kronberga fragmentā? Paskaidro.',source:1,hint:'Kas tekstā “atrod papīru”? Vai zilbe parasti spēj kaut ko atrast?',example:'Fragmentā darbojas personificēta zilbe, jo tai piedēvēta cilvēkam raksturīga darbība.'},
 {kind:'writing',question:'Uzraksti, kas kopīgs abu autoru fragmentiem, un pamato ar piemēru.',hint:'Abos fragmentos lietotas tēlainas izteiksmes. Nosauc piemēru no katra.',example:'Abi autori izmanto tēlainu valodu. Rainis saulīti sauc par māmiņu, savukārt Kronbergs zilbei piedēvē darbību.'}
];

export function renderMarksPoetryMission(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub poetry-mission');root.append(host);
 let items=[],i=0,points=0,complete=false,saving=false,submitted=false,mode='learning';
 const btn=(parent,text,cb,cls='action-button')=>{const b=el('button',text,cls);b.type='button';b.onclick=cb;parent.append(b);return b;};
 const heading=(subtitle)=>{host.replaceChildren();host.append(el('h2','🐉 Dzejas superizaicinājums'),el('p',subtitle));};
 const source=(id,hideAuthor=false)=>{const d=texts[id];const block=el('blockquote','','poetry-quote');block.append(el('strong',hideAuthor?'📜 Uzmini autoru no fragmenta':d.author+' — '+d.title));for(const line of d.lines)block.append(el('p',line));const a=el('a','📖 Pārbaudīts avots');a.href=d.source;a.target='_blank';a.rel='noopener noreferrer';if(!hideAuthor)block.append(a);host.append(block);};
 const intro=()=>{
  heading('Literatūra · Gatavojamies NPD');
  const note=el('div','','sentence-tip');note.append(el('strong','Šīs misijas mērķis'));
  note.append(el('p','Atpazīsti dzejoļa tēmu, noskaņu, tēlus, atskaņas, salīdzini Raini un Juri Kronbergu un veido savas rindiņas. Autoru fragmenti ir īsi un pārbaudīti. Citi uzdevumi ir mūsu pašu sacerēti.'));
  note.append(el('p','🌱 20 mācību jautājumi ar palīdzību, pēc tam 🏆 30 pārbaudes jautājumi (26/30 = vismaz 85%). Vienreizējs +20 provizorisko BP superbonuss.'));
  host.append(note);
  btn(host,'💡 Ātrā atgādne',()=>{
   const hint=el('div','','sentence-tip');hint.append(el('strong','Atceries!'),el('p','Tēma = par ko dzejolis; noskaņa = kādas sajūtas; tēli = kas tajā darbojas; atskaņas = līdzīgi skanošas vārdu beigas.'));host.append(hint);
  },'quiet-button');
  btn(host,'🚀 Sākt superizaicinājumu',()=>{items=[...shuffle(fullBank.filter(q=>q.kind!=='open')).slice(0,17),...shuffle(writingTasks)];mode='learning';i=points=0;complete=false;step();});
 };
 const step=()=>{
  if(i>=items.length){if(mode==='learning'){ready();return;}finish();return;}
  const q=items[i];heading((mode==='learning'?'🌱 Mācību jautājums ':'🏆 Tests ')+(i+1)+' / '+items.length);
  if(q.kind==='source')source(q.source,q.question.startsWith('Kurš autors'));
  if(q.kind==='writing'&&typeof q.source==='number')source(q.source);
  const card=el('section','','poetry-question');card.append(el('h3',q.question));host.append(card);
  const feedback=el('p','','sentence-feedback');feedback.setAttribute('role','status');card.append(feedback);
  let answered=false;
  const answer=(ok,explanation)=>{
   if(answered)return;
   if(mode==='learning'&&!ok){feedback.textContent='Mēģini vēlreiz. '+(explanation||q.hint);return;}
   answered=true;points+=Number(ok);
   feedback.textContent=ok?'✨ Pareizi! '+(explanation||''):'Pārdomā: '+(explanation||q.hint);
   if(q.kind==='source'&&q.question.startsWith('Kurš autors')){const details=el('p','Autors: '+texts[q.source].author+' · '+texts[q.source].title);card.append(details);}
   for(const x of card.querySelectorAll('button'))x.disabled=true;
   btn(card,i===items.length-1?'🏆 Skatīt rezultātu →':'➡️ Nākamais jautājums →',()=>{i++;step();});
  };
  if(mode==='learning'){
   let seen=0;btn(card,'💡 Pavediens',()=>{feedback.textContent=seen++===0?'Padomā, ko prasa jautājums, un atrodi norādi fragmentā.':q.hint;},'quiet-button');
  }
  if(q.kind==='writing'){
   const ta=el('textarea','','poetry-input');ta.rows=4;ta.placeholder='Uzraksti savu atbildi pilnā teikumā un pamato ar tekstu.';card.append(ta);
   btn(card,'💡 Kā veidot atbildi?',()=>{feedback.textContent=q.hint;},'quiet-button');
   btn(card,'📖 Apskatīt atbildes paraugu',()=>{feedback.textContent='Parauga atbilde: '+q.example;},'quiet-button');
   btn(card,'✅ Esmu uzrakstījis un sapratis',()=>{
    if(ta.value.trim().length<25){feedback.textContent='Pamēģini izveidot vismaz vienu pilnu teikumu ar pamatojumu.';return;}
    answer(true,'Labi! Salīdzini savu atbildi ar paraugu un pārrunā, vai to pamato teksta vārdi.');
   });
  }else if(q.kind==='open'){
   const ta=el('textarea','','poetry-input');ta.rows=3;ta.placeholder='Uzraksti savu dzejas rindu vai nelielu divrindi…';card.append(ta);
   const info=el('p','Radošo atbildi programma nevar droši novērtēt pēc nozīmes vai atskaņām. Par divrindes uzrakstīšanu saņemsi dalības punktu, bet saturu vari pārrunāt ar vecāku.');card.append(info);
   btn(card,'✅ Iesniegt savu rindu',()=>{const value=ta.value.trim();if(value.length<16){feedback.textContent='Uzraksti mazliet garāku rindiņu — vismaz 16 rakstzīmes.';return;}answer(true,'Paldies par radošo darbu!');});
  }else{
   const choices=el('div','','poetry-choices');card.append(choices);
   for(const text of shuffle(q.options))btn(choices,text,()=>answer(text===q.correct,q.hint),'quiet-button');
  }
 };
 const ready=()=>{
  heading('🏆 Mācību daļa pabeigta');
  const card=el('section','','poetry-question');
  card.append(el('h3','Tagad 30 patstāvīgi jautājumi'));
  card.append(el('p','Mācību daļā tu saņēmi skaidrojumus un pavedienus. Testā atbildēsi patstāvīgi. No 30 jautājumiem vismaz 26 jāatbild pareizi, lai saņemtu īpašo vienreizējo +20 BP bonusu.'));
  host.append(card);
  btn(host,'⚔️ Sākt 30 jautājumu testu',()=>{
   mode='exam';items=shuffle(fullBank.filter(q=>q.kind!=='open')).slice(0,30);i=points=0;step();
  });
  btn(host,'🔁 Vēlreiz 20 mācību jautājumi',intro,'quiet-button');
 };
 const finish=()=>{
  complete=true;heading('🏆 Superizaicinājums pabeigts!');
  const percent=Math.round(points/items.length*100),qualified=percent>=85;
  host.append(el('div',percent+'%','result-hero'),el('p','Pareizi: '+points+' / '+items.length+'.'));
  host.append(el('p',qualified?'💎 Esi sasniedzis meistarības mērķi!':'💪 Patrenējies un izmēģini jaunu jautājumu secību.'));
  const status=el('p','Rezultāts nav saglabāts — tu pats izvēlies.');status.setAttribute('role','status');host.append(status);
  const save=btn(host,'✅ Esmu apmierināts — saglabāt',async()=>{
   if(saving||submitted)return;if(!canSubmit){status.textContent='Vecāka priekšskatījumā nesaglabā.';return;}
   saving=true;save.disabled=true;
   try{const id=await saveProgress({studentRole:'marks',subject:'Literatūra',activityType:TYPE,score:percent,notes:JSON.stringify({correct:points,total:items.length,childConfirmed:true,masteryBonusEligible:qualified,bonus:20,spendableBP:0})});if(!id)throw Error('Saglabāšana nav apstiprināta');submitted=true;status.textContent='✅ Saglabāts! '+(qualified&&!alreadyEarnedBonus?'+20 provizoriskie BP iegūti vienu reizi!':'');}
   catch(e){status.textContent='⚠️ Neizdevās saglabāt: '+(e.message||'pārbaudi savienojumu');save.disabled=false;}finally{saving=false;}
  });
  btn(host,'🔁 Vēlreiz ar mainītu jautājumu secību',intro);
 };
 intro();
}
