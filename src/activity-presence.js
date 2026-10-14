import {doc, collection, setDoc, onSnapshot, getDoc, runTransaction, serverTimestamp} from 'firebase/firestore';
import {auth,db} from './firebase/init.js';

const uidByRole={marks:'w4nbeq1UguRFrvdwVSFOkk46zXA2',samanta:'txTRitErw8c4NRK87v1JFrFkoPa2'};
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const base=()=>collection(db,'homeSchool','data','activityPresence');
const ref=(uid,date)=>doc(base(),uid+'_'+date);
const capped=(n,min,max)=>Math.min(max,Math.max(min,n));

export function startChildPresence({role,uid:configuredUid,activity=()=> 'Sākumekrāns',onError=()=>{}}={}){
 const uid=configuredUid||uidByRole[role];
 if(!uid||!db||auth.currentUser?.uid!==uid)return ()=>{};
 const sessionId=(crypto.randomUUID?.()||String(Date.now())+Math.random());
 let lastTick=Date.now(),lastInteraction=Date.now(),disposed=false,busy=false,day=today();
 const touch=()=>{lastInteraction=Date.now();};
 for(const type of ['pointerdown','keydown','touchstart'])document.addEventListener(type,touch,{passive:true});
 const eligible=()=>document.visibilityState==='visible' && document.hasFocus() && Date.now()-lastInteraction<90000;
 let lastActivity=String(activity()).slice(0,100);
 const tick=async(force=false)=>{
  if(disposed||busy||auth.currentUser?.uid!==uid)return;
  const now=Date.now(),nextDay=today();
  if(nextDay!==day){day=nextDay;lastTick=now;}
  const label=String(activity()).slice(0,100);
  const active=eligible();
  const delta=active?capped(Math.round((now-lastTick)/1000),0,20):0;
  lastTick=now;
  if(!force&&delta===0&&label===lastActivity)return;
  lastActivity=label;busy=true;
  try{
   const target=ref(uid,day);
   await runTransaction(db,async tx=>{
    const existing=await tx.get(target);
    const previous=existing.exists()?existing.data():{};
    // Avoid adding activity seconds twice when multiple app tabs are open.
    const previousTime=previous.updatedAt?.toMillis?.()||0;
    const otherSession=previous.sessionId&&previous.sessionId!==sessionId&&now-previousTime<35000;
    const counted=otherSession?0:delta;
    tx.set(target,{
     studentUid:uid,studentRole:role,date:day,
     activity:active?label:'Nav aktīvs',
     isActive:active,
     activeSeconds:capped((Number(previous.activeSeconds)||0)+counted,0,86400),
     sessionId,updatedAt:serverTimestamp()
    });
   });
  }catch(e){onError(e);}finally{busy=false;}
 };
 const interval=setInterval(()=>{void tick();},15000);
 const onVisibility=()=>{lastTick=Date.now();void tick(true);};
 document.addEventListener('visibilitychange',onVisibility);
 const onPageHide=()=>{void tick(true);};
 window.addEventListener('pagehide',onPageHide);
 void tick(true);
 return ()=>{disposed=true;clearInterval(interval);document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('pagehide',onPageHide);for(const type of ['pointerdown','keydown','touchstart'])document.removeEventListener(type,touch);};
}

export function renderParentPresence(container,identities=uidByRole){
 const panel=document.createElement('section');panel.className='module';panel.style.gridColumn='1/-1';
 const h=document.createElement('h2');h.textContent='🟢 Bērnu aktivitāte šobrīd';panel.append(h);
 const info=document.createElement('p');info.textContent='Aktīvās minūtes skaita tikai tad, kad lietotne ir priekšplānā un bērns nesen ar to darbojies. Atjaunojas aptuveni ik pēc 15 sekundēm.';panel.append(info);
 const body=document.createElement('div');body.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px';panel.append(body);container.append(panel);
 let unsubscribe=[],statusRefresh=new Map(),currentDate='';
 function attach(){
  unsubscribe.forEach(fn=>fn());unsubscribe=[];statusRefresh=new Map();body.replaceChildren();
  currentDate=today();
  for(const [role,name] of [['marks','Marks'],['samanta','Samanta']]){
   const box=document.createElement('div');box.className='card';box.style.padding='15px';body.append(box);
   const title=document.createElement('h3');title.textContent=name;box.append(title);
   const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Ielādē…';box.append(status);
   const stop=onSnapshot(ref(identities[role]||uidByRole[role],currentDate),snap=>{
    const row=snap.data();
    if(!row){status.textContent='Šodien vēl nav reģistrētas aktivitātes.';return;}
    const refresh=()=>{const fresh=row.updatedAt?.toMillis&&Date.now()-row.updatedAt.toMillis()<45000;
    const online=Boolean(row.isActive&&fresh);
    const minutes=Math.floor((Number(row.activeSeconds)||0)/60);
    const seconds=(Number(row.activeSeconds)||0)%60;
    status.textContent=(online?'🟢 Aktīvs: ':'⚪ Nav aktīvs · Pēdējā aktivitāte: ')+(row.activity||'—')+'\nŠodien ekrānā: '+minutes+' min '+seconds+' s';
    status.style.whiteSpace='pre-line';};refresh();statusRefresh.set(role,refresh);
   },err=>{status.textContent='Datu piekļuve liegta vai nav konfigurēta: '+(err.code||err.message);});
   unsubscribe.push(stop);
  }
 }
 attach();
 const dateTimer=setInterval(()=>{if(today()!==currentDate)attach();else statusRefresh.forEach(fn=>fn());},15000);
 return ()=>{clearInterval(dateTimer);unsubscribe.forEach(fn=>fn());};
}
