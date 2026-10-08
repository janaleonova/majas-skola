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
 function start(topic,mode){let items=shuffle(BANK[topic.id]).map(q=>({...q,options:shuffle(q[1].map((label,i)=>({label,correct:i===q[2]})))}));
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