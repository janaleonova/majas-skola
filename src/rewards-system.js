import {collection,addDoc,getDocs,doc,getDoc,updateDoc,query,where,serverTimestamp} from 'firebase/firestore';
import {auth,db} from './firebase/init.js';
import {getUserProfile,ROLES} from './firebase/homeSchoolService.js';
// Until verified server-side award transactions exist, spendable BP must be zero.
export function calculateChildPoints(){return {totalEarned:0,spent:0,balance:0,provisional:true};}
const rewards=[
 {id:'phone20',title:'Papildu 20 minūtes telefonā',cost:100,icon:'📱'},
 {id:'games40',title:'Papildu 40 minūtes spēļu laika',cost:180,icon:'🎮'},
 {id:'film',title:'Ģimenes filmu vakars',cost:250,icon:'🎬'}];
const claims=()=>collection(db,'homeSchool','data','rewardRequests');
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const button=(parent,label,handler)=>{const b=make('button',label);b.type='button';b.className='action-button';b.onclick=handler;parent.append(b);return b;};
async function identity(){if(!db||!auth.currentUser)throw Error('Pieslēdzies savam kontam.');const p=await getUserProfile(auth.currentUser.uid);if(!p?.approved)throw Error('Konts nav apstiprināts.');return {uid:auth.currentUser.uid,role:p.role};}
async function getRequests(role){const user=await identity();if(user.role!==ROLES.PARENT&&user.role!==role)throw Error('Šie pieteikumi nav pieejami.');const q=user.role===ROLES.PARENT?claims():query(claims(),where('studentUid','==',user.uid));const snap=await getDocs(q);return snap.docs.map(d=>({id:d.id,...d.data()}));}
async function submitWish(role,reward){const user=await identity();if(user.role!==role||user.role===ROLES.PARENT)throw Error('Vēlmi drīkst pieteikt tikai bērns savā kontā.');const existing=await getRequests(role);if(existing.some(c=>c.rewardId===reward.id&&c.status==='pending'))throw Error('Šī vēlme jau gaida izskatīšanu.');await addDoc(claims(),{studentUid:user.uid,studentRole:role,rewardId:reward.id,rewardTitle:reward.title,cost:reward.cost,status:'pending',kind:'wish_only',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});}
async function parentDecision(id,status){const user=await identity();if(user.role!==ROLES.PARENT)throw Error('Tikai vecāks var izskatīt vēlmi.');const ref=doc(db,'homeSchool','data','rewardRequests',id);const snap=await getDoc(ref);if(!snap.exists()||snap.data().status!=='pending'||snap.data().kind!=='wish_only')throw Error('Vēlme jau izskatīta vai nav pieejama.');await updateDoc(ref,{status,reviewedBy:user.uid,updatedAt:serverTimestamp()});}
export function renderRewardShop(container,{studentRole,onBack}={}){
 const root=make('section');root.className='module learning-hub';container.replaceChildren(root);
 root.append(make('h2','🎁 Balvu vēlmes'),make('p','Pagaidām vari iesniegt vēlmi vecākam. Balvu punkti vēl netiek ieskaitīti vai tērēti, jo tiek veidota droša punktu sistēma.'));
 const status=make('p');status.setAttribute('role','status');root.append(status);
 const list=make('div');list.className='topic-grid';root.append(list);
 const draw=async()=>{
  list.replaceChildren();try{
   const user=await identity();const existing=await getRequests(studentRole);
   for(const reward of rewards){const card=make('div');card.className='card';card.append(make('h3',reward.icon+' '+reward.title),make('p','Plānotā cena: '+reward.cost+' BP (punktu tērēšana vēl nav ieslēgta).'));
    const own=existing.find(c=>c.rewardId===reward.id&&c.status==='pending');
    const b=button(card,own?'⏳ Gaida vecāka atbildi':'💌 Pieteikt vēlmi',async()=>{b.disabled=true;try{await submitWish(studentRole,reward);status.textContent='Vēlme saglabāta Firebase. Vecāks to varēs redzēt savā panelī.';await draw();}catch(e){status.textContent='Neizdevās: '+e.message;b.disabled=false;}});
    b.disabled=Boolean(own)||user.role!==studentRole;list.append(card);
   }
   const history=make('div');history.className='card';history.append(make('h3','Manu vēlmju vēsture'));existing.forEach(c=>history.append(make('p',c.rewardTitle+' — '+({pending:'Gaida',approved:'Vecāks piekrita',rejected:'Noraidīta'}[c.status]||c.status))));list.append(history);
  }catch(e){status.textContent='Firebase vēlmes nav pieejamas: '+e.message;}
 };
 if(onBack)button(root,'← Atpakaļ uz priekšmetiem',onBack);
 void draw();return root;
}
export function renderParentRewardManager(container){
 const section=make('section');section.className='module';section.style.gridColumn='1/-1';section.append(make('h2','🎁 Bērnu balvu vēlmes'),make('p','Šie ir bērnu vēlmju pieteikumi Firebase, nevis apmaksātas balvas. Apstiprinājums neveic BP norakstīšanu.'));
 const status=make('p');status.setAttribute('role','status');section.append(status);
 const list=make('div');list.className='topic-grid';section.append(list);container.append(section);
 const draw=async()=>{list.replaceChildren();try{const user=await identity();if(user.role!==ROLES.PARENT)throw Error('Nepieciešams vecāka konts.');const requests=await getRequests(ROLES.PARENT);requests.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));if(!requests.length)list.append(make('p','Vēlmju vēl nav.'));for(const c of requests){const card=make('div');card.className='card';card.append(make('h3',(c.studentRole==='marks'?'Marks':'Samanta')+' — '+c.rewardTitle),make('p','Statuss: '+({pending:'Gaida',approved:'Piekritu (bez BP noraksta)',rejected:'Noraidīta'}[c.status]||c.status)));if(c.status==='pending'){for(const [label,next] of [['✅ Piekrist','approved'],['❌ Noraidīt','rejected']])button(card,label,async()=>{try{await parentDecision(c.id,next);await draw();}catch(e){status.textContent=e.message;}});}list.append(card);}}catch(e){status.textContent='Firebase pieteikumu ielāde neizdevās: '+e.message;}};void draw();return section;
}
