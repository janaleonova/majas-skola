import { renderSamantaMath } from './samanta-math.js';
import { renderLatvianSchool } from './latvian-school.js';
import {initFirebase,auth,db,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,signOut,onAuthStateChanged} from './firebase/init.js';
import {getUserProfile,getTasks,getProgressHistory,createTask,updateTaskStatus,recordProgress,ROLES} from './firebase/homeSchoolService.js';
const state={user:null,role:null,view:null,ready:false};
const $=id=>document.getElementById(id);
const schools={marks:['🐉 Marka skola','Mācību spēles un progress'],samanta:['🎨 Samantas skola','Uzdevumi un sasniegumi'],vecaks:['📋 Vecāka panelis','Abu bērnu mācību pārskats']};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function message(s){$('login-message').textContent=s||''}
function showLogin(){if(!state.ready){message('Firebase vēl nav konfigurēts.');return}
 $('login-form').hidden=false;$('login-password').value='';message('');$('login-password').focus();}
function showWelcome(){state.view=null;$('welcome').hidden=false;$('school').hidden=true;$('home').hidden=!state.user;$('login-form').hidden=Boolean(state.user);}
function header(){let bar=$('header-auth-bar');if(!bar){bar=document.createElement('div');bar.id='header-auth-bar';document.querySelector('header').append(bar)}
 bar.replaceChildren();if(state.user){const out=document.createElement('button');out.textContent='Iziet';out.addEventListener('click',async()=>{await signOut(auth);showWelcome()});bar.append(out);}}
function loginErrorMessage(err){
 const code=err?.code || '';
 if(code==='auth/invalid-api-key')return 'Firebase API atslēga nav derīga. Pārbaudi FIREBASE_API_KEY iestatījumus.';
 if(code==='auth/invalid-credential'||code==='auth/wrong-password'||code==='auth/user-not-found')return 'Nepareiza parole vai konta dati.';
 if(code==='auth/operation-not-allowed')return 'Firebase Email/Password pieteikšanās nav iespējota.';
 if(code==='auth/unauthorized-domain')return 'Preview domēns nav atļauts Firebase Authentication iestatījumos.';
 if(code==='auth/too-many-requests')return 'Pārāk daudz pieteikšanās mēģinājumu. Mēģini vēlāk.';
 if(code==='permission-denied'||code==='firestore/permission-denied')return 'Firestore liedz piekļuvi profilam. Pārbaudi profila tiesības.';
 if(code==='auth/network-request-failed')return 'Neizdevās savienoties ar Firebase. Pārbaudi internetu.';
 if(code==='auth/user-disabled')return 'Šis Firebase konts ir atspējots.';
 if(code.startsWith('auth/'))return 'Firebase pieteikšanās kļūda ('+code+').';
 return err?.message || 'Pieteikšanās neizdevās.';
}
async function login(e){e.preventDefault();const btn=$('login-form').querySelector('[type=submit]');btn.disabled=true;
 const password=$('login-password').value;
 try{
   const response=await fetch('/api/password-login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
   const identified=await response.json();
   if(!response.ok)throw Error(identified.error||'Pieteikšanās neizdevās.');
   await setPersistence(auth,browserLocalPersistence);
   const result=await signInWithEmailAndPassword(auth,identified.email,password);
   const profile=await getUserProfile(result.user.uid);
   if(!profile||profile.approved!==true||profile.role!==identified.role){
     await signOut(auth);throw Error('Šim kontam vēl nav apstiprināta piekļuve.');
   }
   state.user=result.user;state.role=profile.role;
   $('login-password').value='';await showSchool(state.role);
 }catch(err){message(loginErrorMessage(err))}
 finally{btn.disabled=false;}
}
async function showSchool(role){if(!state.user || !state.role){showLogin();return}if(state.role!==ROLES.PARENT && state.role!==role){alert('Šī vide nav pieejama šim kontam.');return}
 state.view=role;$('welcome').hidden=true;$('school').hidden=false;$('home').hidden=false;
 $('school-title').textContent=schools[role][0];$('school-intro').textContent=schools[role][1];
 const area=$('modules');area.replaceChildren();let tasks=[],progress=[];
 if(role==='marks'){renderLatvianSchool(area,{canSubmit:state.role===ROLES.MARKS,saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw new Error('Firestore neapstiprināja saglabāšanu');return saved;},askAI:async payload=>{const token=await state.user.getIdToken();const response=await fetch('/api/marka-ai',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(data.error||'MI treneris nav pieejams');return data.reply;}});}
 if(role==='samanta'){renderSamantaMath(area,{canSubmit:state.role===ROLES.SAMANTA,saveProgress:async data=>{const id=await recordProgress({...data,currentUid:state.user.uid});if(!id)throw Error('Firestore saglabāšana nav apstiprināta');return id;}});}
 // Independent data loading: Firestore errors must never remove learning modules.
 const loadErrors=[];
 try{
   tasks=await getTasks(state.role===ROLES.PARENT?ROLES.PARENT:role);
   if(state.role===ROLES.PARENT && role!==ROLES.PARENT)tasks=tasks.filter(t=>t.assignedTo===role || t.assignedTo==='both');
 }catch(err){loadErrors.push('uzdevumus');console.warn('[Mājas skola] Uzdevumu ielādes kļūdas kods:',err?.code||'unknown');}
 try{
   progress=await getProgressHistory({role:state.role===ROLES.PARENT?'vecaks':role,userUid:state.user.uid});
   if(state.role===ROLES.PARENT && role!==ROLES.PARENT)progress=progress.filter(p=>p.studentRole===role);
 }catch(err){loadErrors.push('rezultātus');console.warn('[Mājas skola] Progresa ielādes kļūdas kods:',err?.code||'unknown');}
 if(loadErrors.length){const notice=document.createElement('div');notice.className='module';notice.style.gridColumn='1/-1';notice.textContent='Pagaidām neizdevās ielādēt '+loadErrors.join(' un ')+'. Mācību trenažieri joprojām ir pieejami.';area.append(notice);}
 if(state.role===ROLES.PARENT){const nav=document.createElement('div');nav.className='module';nav.style.gridColumn='1/-1';
 nav.innerHTML='<h2>Pārslēgt vidi</h2><p>Vecākam pieejami abi bērnu skati.</p>';
 for(const child of ['marks','samanta','vecaks']){const b=document.createElement('button');b.textContent=schools[child][0];b.style.margin='5px';b.addEventListener('click',()=>showSchool(child));nav.append(b)}area.append(nav)}
 if(role===ROLES.PARENT){const form=document.createElement('form');form.className='module';form.innerHTML='<h2>Jauns uzdevums</h2><label>Nosaukums <input name="title" required maxlength="120"></label><label> Priekšmets <input name="subject" required maxlength="80"></label><label> Kam <select name="assigned"><option value="marks">Markam</option><option value="samanta">Samantai</option><option value="both">Abiem</option></select></label><button type="submit">Saglabāt</button>';
 form.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(form);try{await createTask({title:fd.get('title'),subject:fd.get('subject'),assignedTo:fd.get('assigned'),createdByUid:state.user.uid});await showSchool(role)}catch(err){alert('Saglabāt neizdevās: '+err.message)}});area.append(form)}
 const taskBox=document.createElement('div');taskBox.className='module';taskBox.innerHTML='<h2>Uzdevumi</h2>';
 if(!tasks.length){const p=document.createElement('p');p.textContent='Uzdevumu vēl nav.';taskBox.append(p)}
 for(const task of tasks){const item=document.createElement('p');item.textContent=(task.status==='completed'?'✅ ':'⬜ ')+task.title+' — '+(task.subject||'');const b=document.createElement('button');b.textContent=task.status==='completed'?'Atzīmēt kā neizpildītu':'Pabeigts';b.style.margin='8px';b.addEventListener('click',async()=>{try{await updateTaskStatus(task.id,task.status==='completed'?'pending':'completed');await showSchool(role)}catch(err){alert('Neizdevās saglabāt')}});item.append(b);taskBox.append(item)}area.append(taskBox);
 const progressBox=document.createElement('div');progressBox.className='module';progressBox.innerHTML='<h2>Rezultāti</h2>';
 if(!progress.length)progressBox.append(Object.assign(document.createElement('p'),{textContent:'Rezultātu vēl nav.'}));
 for(const p of progress){
  const row=document.createElement('div');row.style.cssText='padding:10px 0;border-bottom:1px solid #dce3eb';
  const header=document.createElement('strong');
  header.textContent=(p.studentRole==='marks'?'Marks':p.studentRole==='samanta'?'Samanta':'')+' · '+(p.activityType||'Treniņš')+' · '+(typeof p.score==='number'?p.score+'%':'Rezultāts nav zināms');
  row.append(header);
  try{
   const details=JSON.parse(p.notes||'null');
   if(details && Array.isArray(details.skills) && details.skills.length){
    const weak=details.skills.filter(skill=>skill.percent<80).sort((a,b)=>a.percent-b.percent);
    const info=document.createElement('p');info.textContent='Uzdevumi: '+(details.correct??0)+'/'+(details.total??0)+(weak.length?' · Jāpatrenē: '+weak.map(x=>x.skill+' '+x.percent+'%').join(', '):' · Pārbaudītās prasmes apgūtas labi');
    row.append(info);
   }
  }catch{}
  progressBox.append(row);
}area.append(progressBox);
 if(role==='marks'){const practice=document.createElement('div');practice.className='module';practice.innerHTML='<h2>⚔️ Ātrais treniņš</h2><p>7 × 8 = ?</p>';
 for(const n of [48,56,64]){const b=document.createElement('button');b.textContent=n;b.style.margin='4px';b.addEventListener('click',async()=>{if(n!==56){alert('Mēģini vēlreiz!');return}try{await recordProgress({studentRole:'marks',activityType:'Reizrēķins',subject:'Matemātika',score:100,currentUid:state.user.uid});alert('Pareizi! Rezultāts saglabāts.');await showSchool(role)}catch(err){alert('Pareizi, bet saglabāt neizdevās.')}});practice.append(b)}area.append(practice)}
}
async function start(){
 $('login-form').addEventListener('submit',login);
 $('home').addEventListener('click',showWelcome);
 $('back').addEventListener('click',showWelcome);
 try{
   const fb=await initFirebase();state.ready=Boolean(fb.isConfigured);
   if(state.ready)onAuthStateChanged(auth,async user=>{
     state.user=user;state.role=null;
     if(user){
       try{const profile=await getUserProfile(user.uid);
         if(profile?.approved && ['marks','samanta','vecaks'].includes(profile.role)){
           state.role=profile.role;await showSchool(profile.role);
         }else{await signOut(auth);showWelcome();}
       }catch(e){await signOut(auth);showWelcome();}
     }else showWelcome();
     header();
   });
   else message('Firebase vēl nav konfigurēts.');
 }catch(e){message('Neizdevās inicializēt savienojumu.')}
 header();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
