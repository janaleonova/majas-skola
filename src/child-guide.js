// Lightweight, deterministic child guide. No personal data or AI prompts leave the device.
export function installChildGuide({role,getSubject=()=>'',getCrystals=()=>0}){
 if(!['marks','samanta'].includes(role))return ()=>{};
 const fairy=role==='samanta';
 const guide=document.createElement('aside');guide.className='levelup-guide-bubble';guide.setAttribute('aria-live','polite');
 guide.hidden=true;guide.innerHTML='<span class="guide-character" aria-hidden="true">'+(fairy?'🧚‍♀️':'🐉')+'</span><div class="guide-copy"><strong>'+(fairy?'Dārza feja':'Kristālu pūķis')+'</strong><p></p><div class="guide-actions"></div></div><button class="guide-close" type="button" aria-label="Aizvērt padomu">×</button>';
 document.body.append(guide);
 const body=guide.querySelector('p'),actions=guide.querySelector('.guide-actions');
 let lastAction=Date.now(),lastMessage=0,lastSubject='',closedUntil=0,disposed=false;
 const active=()=>document.visibilityState==='visible'&&document.getElementById('school')&&!document.getElementById('school').hidden;
 const say=(message,withHint=false)=>{
  if(disposed||!active()||Date.now()<closedUntil)return;
  body.textContent=message;actions.replaceChildren();guide.hidden=false;lastMessage=Date.now();
  if(withHint){const b=document.createElement('button');b.type='button';b.textContent='💡 Ko darīt?';b.onclick=()=>{body.textContent=fairy?'Izlasi jautājumu vēlreiz. Pamēģini vienu mazu soli, tad pārbaudi.':'Atrodi, ko uzdevums prasa. Izvēlies pirmo soli un tikai tad rēķini.';actions.replaceChildren();};actions.append(b);}
 };
 const userAction=()=>{lastAction=Date.now();};
 for(const event of ['pointerdown','keydown','touchstart'])document.addEventListener(event,userAction,{passive:true});
 guide.querySelector('.guide-close').onclick=()=>{guide.hidden=true;closedUntil=Date.now()+10*60*1000;};
 const timer=setInterval(()=>{
  if(!active()||guide.hidden===false||Date.now()-lastMessage<120000)return;
  const subject=getSubject(),idle=Date.now()-lastAction;
  // An idle reminder is opt-in and never reveals answers.
  if(idle>=90000&&idle<240000&&subject.includes('Matemātika'))say(fairy?'Vai vajag mazu pavedienu? Nav jāsteidzas.':'Iestrēgi? Ja vēlies, varu ieteikt pirmo soli.',true);
  else if(idle>=120000&&idle<300000&&!subject.includes('Matemātika'))say(fairy?'Varam sākt ar vienu mazu soli.':'Neaizmirsti — vari turpināt savā tempā.',true);
 },15000);
 const onVisibility=()=>{if(document.visibilityState!=='visible')guide.hidden=true;};
 document.addEventListener('visibilitychange',onVisibility);
 const showWelcome=()=>say(fairy?'Sveika! Izvēlies, kuru kristālu šodien audzēsim.':'Sveiks! Kurš kristāls būs tavs nākamais izaicinājums?');
 setTimeout(showWelcome,900);
 return {announce:message=>say(message),stop:()=>{disposed=true;clearInterval(timer);guide.remove();document.removeEventListener('visibilitychange',onVisibility);for(const event of ['pointerdown','keydown','touchstart'])document.removeEventListener(event,userAction);}};
}
