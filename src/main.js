import {initFirebase,auth,db,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,signOut,onAuthStateChanged} from './firebase/init.js';
import {getUserProfile,getTasks,getProgressHistory,createTask,updateTaskStatus,recordProgress,ROLES} from './firebase/homeSchoolService.js';
const state={user:null,role:null,view:null,emails:{},ready:false};
const $=id=>document.getElementById(id);
const schools={marks:['🐉 Marka skola','Mācību spēles un progress'],samanta:['🎨 Samantas skola','Uzdevumi un sasniegumi'],vecaks:['📋 Vecāka panelis','Abu bērnu mācību pārskats']};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let pendingRole=null;
function message(s){$('login-message').textContent=s||''}
function showLogin(role){if(!state.ready){alert('Firebase vēl nav konfigurēts. Skatiet projekta SETUP_LOGIN.md.');return}
 pendingRole=role;$('login-form').hidden=false;$('login-heading').textContent=schools[role][0]+' — parole';$('login-password').value='';message('');$('login-password').focus();}
function showWelcome(){state.view=null;$('welcome').hidden=false;$('school').hidden=true;$('home').hidden=!state.user;$('login-form').hidden=true;}
function header(){let bar=$('header-auth-bar');if(!bar){bar=document.createElement('div');bar.id='header-auth-bar';document.querySelector('header').append(bar)}
 bar.replaceChildren();if(state.user){const out=document.createElement('button');out.textContent='Iziet';out.addEventListener('click',async()=>{await signOut(auth);showWelcome()});bar.append(out);}}
async function login(e){e.preventDefault();const btn=$('login-form').querySelector('[type=submit]');btn.disabled=true;
 try{const email=state.emails[pendingRole];if(!email)throw Error('Šai skolai vēl nav iestatīts Firebase konts.');
 await setPersistence(auth,browserLocalPersistence);
 const result=await signInWithEmailAndPassword(auth,email,$('login-password').value);
 const profile=await getUserProfile(result.user.uid);
 if(!profile || profile.approved!==true || profile.role!==pendingRole){await signOut(auth);throw Error('Šim kontam nav apstiprinātas piekļuves.')}
 state.user=result.user;state.role=profile.role;$('login-password').value='';showWelcome();await showSchool(pendingRole);
 }catch(err){message(err.message?.includes('auth/')?'Nepareiza parole vai konts nav aktivizēts.':(err.message||'Neizdevās pieslēgties.'))}
 finally{btn.disabled=false}}
async function showSchool(role){if(!state.user || !state.role){showLogin(role);return}if(state.role!==ROLES.PARENT && state.role!==role){alert('Šī vide nav pieejama šim kontam.');return}
 state.view=role;$('welcome').hidden=true;$('school').hidden=false;$('home').hidden=false;
 $('school-title').textContent=schools[role][0];$('school-intro').textContent=schools[role][1];
 const area=$('modules');area.replaceChildren();let tasks=[],progress=[];
 try{tasks=await getTasks(role);progress=await getProgressHistory({role:state.role===ROLES.PARENT?'vecaks':role,userUid:state.user.uid});if(state.role===ROLES.PARENT && role!==ROLES.PARENT)progress=progress.filter(p=>p.studentRole===role);}
 catch(err){area.innerHTML='<div class="module">Neizdevās ielādēt datus. Pārbaudi Firestore piekļuves noteikumus.</div>';return}
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
 for(const p of progress){const row=document.createElement('p');row.textContent=(p.studentRole||'')+' · '+(p.activityType||'')+' · '+(p.score??'')+' punkti';progressBox.append(row)}area.append(progressBox);
 if(role==='marks'){const practice=document.createElement('div');practice.className='module';practice.innerHTML='<h2>⚔️ Ātrais treniņš</h2><p>7 × 8 = ?</p>';
 for(const n of [48,56,64]){const b=document.createElement('button');b.textContent=n;b.style.margin='4px';b.addEventListener('click',async()=>{if(n!==56){alert('Mēģini vēlreiz!');return}try{await recordProgress({studentRole:'marks',activityType:'Reizrēķins',subject:'Matemātika',score:100,currentUid:state.user.uid});alert('Pareizi! Rezultāts saglabāts.');await showSchool(role)}catch(err){alert('Pareizi, bet saglabāt neizdevās.')}});practice.append(b)}area.append(practice)}
}
async function start(){document.querySelectorAll('[data-school]').forEach(b=>b.addEventListener('click',()=>showSchool(b.dataset.school)));$('login-form').addEventListener('submit',login);$('login-cancel').addEventListener('click',()=>{$('login-form').hidden=true;message('')});$('home').addEventListener('click',showWelcome);$('back').addEventListener('click',showWelcome);
 try{const [fb,logins]=await Promise.all([initFirebase(),fetch('/api/login-profiles').then(r=>r.json())]);state.ready=Boolean(fb.isConfigured);state.emails=logins;
 if(state.ready){onAuthStateChanged(auth,async user=>{state.user=user;state.role=null;if(user){try{const profile=await getUserProfile(user.uid);if(profile?.approved && ['marks','samanta','vecaks'].includes(profile.role)){state.role=profile.role;await showSchool(profile.role)}else{await signOut(auth);showWelcome()}}catch(err){showWelcome()}}else showWelcome();header()})}
 }catch(e){console.error('Pieteikšanās konfigurācijas kļūda',e)}header();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
