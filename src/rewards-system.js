import {collection,addDoc,getDocs,doc,getDoc,updateDoc,query,where,serverTimestamp,runTransaction} from 'firebase/firestore';
import {auth,db} from './firebase/init.js';
import {getUserProfile,getProgressHistory,ROLES} from './firebase/homeSchoolService.js';
import {calculateChildPoints} from './learning-policy.js';
export {calculateChildPoints};
const rewards=[
 {id:'popcorn',title:'Svaigs popkorns kino vakaram',cost:40,icon:'🍿'},
 {id:'cola',title:'Vēsa kola vai mīļākais dzēriens kino',cost:40,icon:'🥤'},
 {id:'icecream',title:'Mīļākais saldējums vai našķis',cost:50,icon:'🍦'},
 {id:'extra20',title:'Papildu 20 minūtes pirms miega',cost:70,icon:'⏰'},
 {id:'phone20',title:'Papildu 20 minūtes telefonā',cost:80,icon:'📱'},
 {id:'movie-pick',title:'Filmas izvēles šefs piektdienā',cost:90,icon:'🎬'},
 {id:'breakfast',title:'Svētdienas brokastu pasūtījums (pankūkas)',cost:110,icon:'🥞'},
 {id:'board-game',title:'Galda spēļu vakars pēc bērna noteikumiem',cost:130,icon:'🎲'},
 {id:'games40',title:'Papildu 40 minūtes spēļu laika',cost:150,icon:'🎮'},
 {id:'film',title:'Lielais ģimenes kino vakars ar popkorna komplektu',cost:200,icon:'👑'}
];
const claims=()=>collection(db,'homeSchool','data','rewardRequests');
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const button=(parent,label,handler)=>{const b=make('button',label);b.type='button';b.className='action-button';b.onclick=handler;parent.append(b);return b;};
async function identity(){if(!db||!auth.currentUser)throw Error('Pieslēdzies savam kontam.');const p=await getUserProfile(auth.currentUser.uid);if(!p?.approved)throw Error('Konts nav apstiprināts.');return {uid:auth.currentUser.uid,role:p.role};}
async function getRequests(role){const user=await identity();if(user.role!==ROLES.PARENT&&user.role!==role)throw Error('Šie pieteikumi nav pieejami.');const q=user.role===ROLES.PARENT?claims():query(claims(),where('studentUid','==',user.uid));const snap=await getDocs(q);return snap.docs.map(d=>({id:d.id,...d.data()}));}
async function submitWish(role,reward){const user=await identity();if(user.role!==role||user.role===ROLES.PARENT)throw Error('Vēlmi drīkst pieteikt tikai bērns savā kontā.');const profile=await getUserProfile(user.uid);const history=await getProgressHistory({role,userUid:user.uid});const balance=Math.max(0,calculateChildPoints(role,history,new Date(),user.uid).balance-(Number(profile.spentBP)||0));if(balance<reward.cost)throw Error('Šai balvai vēl pietrūkst BP.');const existing=await getRequests(role);if(existing.some(c=>c.rewardId===reward.id&&c.status==='pending'))throw Error('Šī vēlme jau gaida izskatīšanu.');await addDoc(claims(),{studentUid:user.uid,studentRole:role,rewardId:reward.id,rewardTitle:reward.title,cost:reward.cost,status:'pending',kind:'points_request',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});}
async function parentDecision(id,status){
 const user=await identity();if(user.role!==ROLES.PARENT)throw Error('Tikai vecāks var izskatīt vēlmi.');
 const ref=doc(db,'homeSchool','data','rewardRequests',id),snap=await getDoc(ref);
 if(!snap.exists()||snap.data().status!=='pending')throw Error('Vēlme jau izskatīta.');
 const request=snap.data(),reward=rewards.find(r=>r.id===request.rewardId);if(!reward)throw Error('Balva nav katalogā.');
 const history=await getProgressHistory({role:ROLES.PARENT,userUid:user.uid});
 const earned=calculateChildPoints(request.studentRole,history,new Date(),request.studentUid).balance;
 const profileRef=doc(db,'homeSchool','data','users',request.studentUid);
 await runTransaction(db,async tx=>{
  const [current,profile]=await Promise.all([tx.get(ref),tx.get(profileRef)]);
  if(!current.exists()||current.data().status!=='pending')throw Error('Vēlme jau izskatīta.');
  let chargedBP=0;
  if(status==='approved'&&current.data().kind==='points_request'){
   const spent=Number(profile.data()?.spentBP)||0;
   if(earned-spent<reward.cost)throw Error('Nepietiek BP. Izvēlies lētāku balvu vai noraidi pieteikumu.');
   chargedBP=reward.cost;tx.update(profileRef,{spentBP:spent+chargedBP,updatedAt:serverTimestamp()});
  }
  tx.update(ref,{status,chargedBP,reviewedBy:user.uid,updatedAt:serverTimestamp()});
 });
}
export function renderRewardShop(container,{studentRole,progressRecords=[],currentUid=null,spentBP=0,onBack}={}){
 const root=make('section');root.className='module learning-hub';container.replaceChildren(root);
 const points=calculateChildPoints(studentRole,progressRecords,new Date(),currentUid||undefined);points.balance=Math.max(0,points.balance-spentBP);points.remaining=Math.max(0,250-points.balance);
 root.append(
   make('h2','🎬 Ceļš uz kino vakaru un balvām'),
   make('p','Tavs šodienas guvums: +'+points.todayEarned+' BP! Kopā sakrāti '+points.balance+' / 250 BP. Līdz kino mērķim atlicis: '+points.remaining+' BP.')
 );
 const meter=make('progress');meter.max=250;meter.value=Math.min(250,points.balance);meter.style.cssText='width:100%;height:26px;accent-color:#7c3aed;border-radius:12px;margin:8px 0 16px';meter.setAttribute('aria-label','Progress līdz kino vakaram');root.append(meter);
 root.append(make('p','Mācību BP rodas no saglabātiem darbiem. Vecāks pārskata rezultātus un apstiprina balvas; pieteikums pats par sevi vēl nenoraksta punktus.'));
 root.append(make('h2','🎁 Balvu vēlmes'));
 const status=make('p');status.setAttribute('role','status');root.append(status);
 const list=make('div');list.className='topic-grid';root.append(list);

 const draw=async()=>{
  list.replaceChildren();try{
   const user=await identity();const existing=await getRequests(studentRole);
   for(const reward of rewards){const card=make('div');card.className='card reward-coupon-card';card.append(make('h3',reward.icon+' '+reward.title),make('p','Cena: '+reward.cost+' BP. Vecākam apstiprinot, BP tiek norakstīti.'));
    const own=existing.find(c=>c.rewardId===reward.id&&c.status==='pending');
    const b=button(card,own?'⏳ Gaida vecāka atbildi':'💌 Pieteikt vēlmi',async()=>{b.disabled=true;try{await submitWish(studentRole,reward);status.textContent='Vēlme saglabāta Firebase. Vecāks to varēs redzēt savā panelī.';await draw();}catch(e){status.textContent='Neizdevās: '+e.message;b.disabled=false;}});
    b.disabled=Boolean(own)||user.role!==studentRole||points.balance<reward.cost;list.append(card);
   }
   const history=make('div');history.className='card';history.append(make('h3','Manu vēlmju vēsture'));existing.forEach(c=>history.append(make('p',c.rewardTitle+' — '+({pending:'Gaida',approved:'Vecāks piekrita',rejected:'Noraidīta'}[c.status]||c.status))));list.append(history);
  }catch(e){status.textContent='Firebase vēlmes nav pieejamas: '+e.message;}
 };
 if(onBack)button(root,'← Atpakaļ uz priekšmetiem',onBack);
 void draw();return root;
}
export function renderParentRewardManager(container){
 const section=make('section');section.className='module';section.style.gridColumn='1/-1';section.append(make('h2','🎁 Bērnu balvu vēlmes'),make('p','Apstiprinot jaunu balvas pieteikumu, cena tiek norakstīta no bērna BP. Agrākās vēlmes bez punktu noraksta tiek saglabātas kā ģimenes vienošanās.'));
 const status=make('p');status.setAttribute('role','status');section.append(status);
 const list=make('div');list.className='topic-grid';section.append(list);container.append(section);
 const draw=async()=>{list.replaceChildren();try{const user=await identity();if(user.role!==ROLES.PARENT)throw Error('Nepieciešams vecāka konts.');const requests=await getRequests(ROLES.PARENT);requests.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));if(!requests.length)list.append(make('p','Vēlmju vēl nav.'));for(const c of requests){const card=make('div');card.className='card';card.append(make('h3',(c.studentRole==='marks'?'Marks':'Samanta')+' — '+c.rewardTitle),make('p','Statuss: '+({pending:'Gaida',approved:'Apstiprināts',rejected:'Noraidīta'}[c.status]||c.status)));if(c.status==='pending'){for(const [label,next] of [[c.kind==='points_request'?'✅ Apstiprināt un norakstīt BP':'✅ Piekrist agrākajai vēlmei','approved'],['❌ Noraidīt','rejected']])button(card,label,async()=>{try{await parentDecision(c.id,next);await draw();}catch(e){status.textContent=e.message;}});}list.append(card);}}catch(e){status.textContent='Firebase pieteikumu ielāde neizdevās: '+e.message;}};void draw();return section;
}
