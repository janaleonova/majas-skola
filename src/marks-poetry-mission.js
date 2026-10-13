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
export function renderMarksPoetryMission(root,{canSubmit=false,alreadyEarnedBonus=false,saveProgress=async()=>{}}={}){
 const host=el('section','','module learning-hub poetry-mission');root.append(host);
 let items=[],i=0,points=0,complete=false,saving=false,submitted=false;
 const btn=(parent,text,cb,cls='action-button')=>{const b=el('button',text,cls);b.type='button';b.onclick=cb;parent.append(b);return b;};
 const heading=(subtitle)=>{host.replaceChildren();host.append(el('h2','🐉 Dzejas superizaicinājums'),el('p',subtitle));};
 const source=(id)=>{const d=texts[id];const block=el('blockquote','','poetry-quote');block.append(el('strong',d.author+' — '+d.title));for(const line of d.lines)block.append(el('p',line));const a=el('a','📖 Pārbaudīts avots');a.href=d.source;a.target='_blank';a.rel='noopener noreferrer';block.append(a);host.append(block);};
 const intro=()=>{
  heading('Literatūra · Gatavojamies NPD');
  const note=el('div','','sentence-tip');note.append(el('strong','Šīs misijas mērķis'));
  note.append(el('p','Atpazīsti dzejoļa tēmu, noskaņu, tēlus, atskaņas, salīdzini Raini un Juri Kronbergu un veido savas rindiņas. Autoru fragmenti ir īsi un pārbaudīti. Citi uzdevumi ir mūsu pašu sacerēti.'));
  note.append(el('p','🏆 15 jautājumi · vismaz 13 pareizi = 85% meistarība. Vienreizējs +20 provizorisko BP superbonuss.'));
  host.append(note);
  btn(host,'💡 Ātrā atgādne',()=>{
   const hint=el('div','','sentence-tip');hint.append(el('strong','Atceries!'),el('p','Tēma = par ko dzejolis; noskaņa = kādas sajūtas; tēli = kas tajā darbojas; atskaņas = līdzīgi skanošas vārdu beigas.'));host.append(hint);
  },'quiet-button');
  btn(host,'🚀 Sākt superizaicinājumu',()=>{items=shuffle(questions);i=points=0;complete=false;step();});
 };
 const step=()=>{
  if(i>=items.length){finish();return;}
  const q=items[i];heading('💎 Jautājums '+(i+1)+' / '+items.length);
  if(q.kind==='source')source(q.source);
  const card=el('section','','poetry-question');card.append(el('h3',q.question));host.append(card);
  const feedback=el('p','','sentence-feedback');feedback.setAttribute('role','status');card.append(feedback);
  let answered=false;
  const answer=(ok,explanation)=>{
   if(answered)return;answered=true;points+=Number(ok);
   feedback.textContent=ok?'✨ Pareizi! '+(explanation||''):'Pārdomā: '+(explanation||q.hint);
   for(const x of card.querySelectorAll('button'))x.disabled=true;
   btn(card,i===items.length-1?'🏆 Skatīt rezultātu →':'➡️ Nākamais jautājums →',()=>{i++;step();});
  };
  if(q.kind==='open'){
   const ta=el('textarea','','poetry-input');ta.rows=3;ta.placeholder='Uzraksti savu dzejas rindu vai nelielu divrindi…';card.append(ta);
   const info=el('p','Radošo atbildi programma nevar droši novērtēt pēc nozīmes vai atskaņām. Par divrindes uzrakstīšanu saņemsi dalības punktu, bet saturu vari pārrunāt ar vecāku.');card.append(info);
   btn(card,'✅ Iesniegt savu rindu',()=>{const value=ta.value.trim();if(value.length<16){feedback.textContent='Uzraksti mazliet garāku rindiņu — vismaz 16 rakstzīmes.';return;}answer(true,'Paldies par radošo darbu!');});
  }else{
   const choices=el('div','','poetry-choices');card.append(choices);
   for(const text of shuffle(q.options))btn(choices,text,()=>answer(text===q.correct,q.hint),'quiet-button');
  }
 };
 const finish=()=>{
  complete=true;heading('🏆 Superizaicinājums pabeigts!');
  const percent=Math.round(points/questions.length*100),qualified=percent>=85;
  host.append(el('div',percent+'%','result-hero'),el('p','Pareizi: '+points+' / '+questions.length+'.'));
  host.append(el('p',qualified?'💎 Esi sasniedzis meistarības mērķi!':'💪 Patrenējies un izmēģini jaunu jautājumu secību.'));
  const status=el('p','Rezultāts nav saglabāts — tu pats izvēlies.');status.setAttribute('role','status');host.append(status);
  const save=btn(host,'✅ Esmu apmierināts — saglabāt',async()=>{
   if(saving||submitted)return;if(!canSubmit){status.textContent='Vecāka priekšskatījumā nesaglabā.';return;}
   saving=true;save.disabled=true;
   try{const id=await saveProgress({studentRole:'marks',subject:'Literatūra',activityType:TYPE,score:percent,notes:JSON.stringify({correct:points,total:questions.length,childConfirmed:true,masteryBonusEligible:qualified,bonus:20,spendableBP:0})});if(!id)throw Error('Saglabāšana nav apstiprināta');submitted=true;status.textContent='✅ Saglabāts! '+(qualified&&!alreadyEarnedBonus?'+20 provizoriskie BP iegūti vienu reizi!':'');}
   catch(e){status.textContent='⚠️ Neizdevās saglabāt: '+(e.message||'pārbaudi savienojumu');save.disabled=false;}finally{saving=false;}
  });
  btn(host,'🔁 Vēlreiz ar mainītu jautājumu secību',intro);
 };
 intro();
}
