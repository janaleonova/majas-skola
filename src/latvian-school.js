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
const shuffle=a=>{let b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
export function renderLatvianSchool(container,{canSubmit=false,saveProgress=async()=>{}}={}){
 const host=document.createElement('section');host.className='module';host.style.gridColumn='1/-1';
 host.innerHTML='<h2>📕 Latviešu valoda</h2><p>Izvēlies tēmu un treniņa režīmu.</p>';
 container.prepend(host);
 const nav=document.createElement('div');host.append(nav);
 const content=document.createElement('div');host.append(content);
 for(const topic of TOPICS){const b=document.createElement('button');b.type='button';b.textContent=topic.icon+' '+topic.name;b.style.margin='5px';b.onclick=()=>choose(topic);nav.append(b);}
 function choose(topic){content.replaceChildren();
  const h=document.createElement('h3');h.textContent=topic.name;content.append(h);
  for(const [key,label] of [['learn','📖 Mācos'],['practice','🎯 Trenējos'],['exam','📝 Pārbaudu sevi']]){
   const b=document.createElement('button');b.type='button';b.textContent=label;b.style.margin='5px';b.onclick=()=>start(topic,key);content.append(b);}
 }
 function start(topic,mode){let items=shuffle(BANK[topic.id]).slice(0,mode==='exam'?Math.min(20,BANK[topic.id].length):mode==='practice'?Math.min(12,BANK[topic.id].length):Math.min(8,BANK[topic.id].length)).map(q=>({...q,options:shuffle(q[1].map((label,i)=>({label,correct:i===q[2]})))}));
  let index=0,correct=0;
  const results=[];
  render();
  function render(){content.replaceChildren();
   if(index===items.length){void finish();return;}
   const q=items[index],h=document.createElement('h3');h.textContent=(index+1)+'/'+items.length+' · '+q[0];content.append(h);
   const form=document.createElement('form');content.append(form);
   const choices=shuffle(q.options);
   choices.forEach((o,i)=>{const label=document.createElement('label');label.style.display='block';label.style.padding='10px';const radio=document.createElement('input');radio.type='radio';radio.name='choice';radio.value=String(i);radio.required=true;label.append(radio,document.createTextNode(' '+o.label));form.append(label);});
   const feedback=document.createElement('p');feedback.setAttribute('role','status');
   if(mode==='learn'){const hint=document.createElement('button');hint.type='button';hint.textContent='💡 Palīdzība';hint.onclick=()=>{feedback.textContent='Atceries tēmas pamatprincipu un salīdzini visus variantus.';};form.append(hint);}
   const btn=document.createElement('button');btn.type='submit';btn.textContent='Pārbaudīt';btn.style.margin='8px';form.append(btn);content.append(feedback);
   form.onsubmit=e=>{e.preventDefault();const choice=form.querySelector('input:checked');if(!choice)return;
    const good=choices[Number(choice.value)].correct;correct+=Number(good);results.push(good);form.querySelectorAll('input,button').forEach(el=>el.disabled=true);
    feedback.textContent=mode==='exam'?'Atbilde saglabāta.':good?'✅ Pareizi!':('🔄 Vēl ne. '+q[3]);
    const next=document.createElement('button');next.type='button';next.textContent=index+1===items.length?'Rezultāts':'Nākamais →';next.onclick=()=>{index++;render();};content.append(next);
   };
  }
  async function finish(){const pct=Math.round(correct/items.length*100);const h=document.createElement('h3');h.textContent=topic.name+': '+pct+'% ('+correct+'/'+items.length+')';content.append(h);
   const status=document.createElement('p');content.append(status);
   if(canSubmit){try{await saveProgress({studentRole:'marks',activityType:topic.name+' · '+mode,subject:'Latviešu valoda',score:pct,notes:'Uzdevumi: '+correct+'/'+items.length});status.textContent='✅ Rezultāts saglabāts Firebase.';}catch{status.textContent='⚠️ Rezultātu neizdevās saglabāt.';}}
   else status.textContent='Vecāka priekšskatījums: rezultāts nav saglabāts.';
   const again=document.createElement('button');again.type='button';again.textContent='Trenēties vēlreiz';again.onclick=()=>start(topic,mode);content.append(again);
   const back=document.createElement('button');back.type='button';back.textContent='Atpakaļ uz režīmiem';back.style.margin='8px';back.onclick=()=>choose(topic);content.append(back);
  }
 }
}