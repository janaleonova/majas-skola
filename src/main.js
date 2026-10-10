import {renderFirstDiagnostic,DIAGNOSTIC_VERSION} from './first-diagnostic.js';
import {renderMarksMath} from './marks-math.js';
import {renderMarksEnglish} from './marks-english.js';
import {renderSamantaLatvian} from './samanta-latvian.js';
import {renderSamantaEnglish} from './samanta-english.js';
import {renderRewardShop,renderParentRewardManager,calculateChildPoints} from './rewards-system.js';
import { applyPersonalTheme,renderThemePicker } from './personal-theme.js';
import { renderSamantaMath } from './samanta-math.js';
import { renderLatvianSchool } from './latvian-school.js';
import {initFirebase,auth,db,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,signOut,onAuthStateChanged} from './firebase/init.js';
import {getUserProfile,getTasks,getProgressHistory,createTask,updateTaskStatus,recordProgress,deleteParentTestProgress,resetChildProgress,ROLES} from './firebase/homeSchoolService.js';
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
function render7DayAnalytics(container,allProgress){
 const section=document.createElement('section');section.className='module';section.style.gridColumn='1/-1';
 const title=document.createElement('h2');title.textContent='📊 7 dienu mācību analītika un kopsavilkums';section.append(title);
 const desc=document.createElement('p');desc.textContent='Abu bērnu aktivitāte pēdējā nedēļā (treniņu skaits, vidējais rezultāts un apgūtās tēmas).';section.append(desc);
 const sevenDaysAgo=Date.now() - 7*24*60*60*1000;
 const recent=allProgress.filter(p=>{
  const t=p.recordedAt?.seconds?p.recordedAt.seconds*1000:(p.date?new Date(p.date).getTime():0);
  return t>=sevenDaysAgo;
 });
 const mRecent=recent.filter(p=>p.studentRole==='marks');
 const sRecent=recent.filter(p=>p.studentRole==='samanta');
 const mAvg=mRecent.length?Math.round(mRecent.reduce((acc,p)=>acc+(Number(p.score)||0),0)/mRecent.length):null;
 const sAvg=sRecent.length?Math.round(sRecent.reduce((acc,p)=>acc+(Number(p.score)||0),0)/sRecent.length):null;

 const grid=document.createElement('div');
 grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:16px 0';

 const mCard=document.createElement('div');
 mCard.style.cssText='background:#f6f7ff;border:2px solid #dedbf8;border-radius:20px;padding:20px';
 mCard.innerHTML=`<h3 style="margin-top:0">🐉 Marks (7 dienas)</h3>
  <p style="margin:6px 0"><strong>Pabeigti treniņi:</strong> ${mRecent.length}</p>
  <p style="margin:6px 0"><strong>Vidējais rezultāts:</strong> ${mAvg!==null?mAvg+'%':'Nav ierakstu pēdējās 7 dienās'}</p>
  <p style="margin:6px 0;font-size:0.92rem;color:#67718e">Tēmas: ${mRecent.map(p=>p.activityType||p.subject).slice(0,5).join(', ')||'Pagaidām nav'}</p>`;

 const sCard=document.createElement('div');
 sCard.style.cssText='background:#fff8fc;border:2px solid #fadbe9;border-radius:20px;padding:20px';
 sCard.innerHTML=`<h3 style="margin-top:0">🌸 Samanta (7 dienas)</h3>
  <p style="margin:6px 0"><strong>Pabeigti treniņi:</strong> ${sRecent.length}</p>
  <p style="margin:6px 0"><strong>Vidējais rezultāts:</strong> ${sAvg!==null?sAvg+'%':'Nav ierakstu pēdējās 7 dienās'}</p>
  <p style="margin:6px 0;font-size:0.92rem;color:#67718e">Tēmas: ${sRecent.map(p=>p.activityType||p.subject).slice(0,5).join(', ')||'Pagaidām nav'}</p>`;

 grid.append(mCard,sCard);section.append(grid);

 const copyBtn=document.createElement('button');
 copyBtn.type='button';copyBtn.className='action-button';
 copyBtn.textContent='📋 Kopēt 7 dienu pārskatu starpliktuvē';
 copyBtn.onclick=async()=>{
  const report=['--- MĀJAS SKOLA: 7 DIENU PĀRSKATS ---',
   `Izveidots: ${new Date().toLocaleDateString('lv-LV')} plkst. ${new Date().toLocaleTimeString('lv-LV')}`,
   '',
   `🐉 MARKS:`,
   `- Treniņu skaits: ${mRecent.length}`,
   `- Vidējais vērtējums: ${mAvg!==null?mAvg+'%':'Nav datu'}`,
   `- Galvenās tēmas: ${mRecent.map(p=>p.activityType||p.subject).join(', ')||'Nav'}`,
   '',
   `🌸 SAMANTA:`,
   `- Treniņu skaits: ${sRecent.length}`,
   `- Vidējais vērtējums: ${sAvg!==null?sAvg+'%':'Nav datu'}`,
   `- Galvenās tēmas: ${sRecent.map(p=>p.activityType||p.subject).join(', ')||'Nav'}`,
   '--------------------------------------'
  ].join('\n');
  try{
   await navigator.clipboard.writeText(report);
   copyBtn.textContent='✅ Nokopēts starpliktuvē!';
   setTimeout(()=>{copyBtn.textContent='📋 Kopēt 7 dienu pārskatu starpliktuvē';},2500);
  }catch{
   alert(report);
  }
 };
 section.append(copyBtn);container.append(section);
}
async function showSchool(role){if(!state.user || !state.role){showLogin();return}if(state.role!==ROLES.PARENT && state.role!==role){alert('Šī vide nav pieejama šim kontam.');return}
 state.view=role;$('welcome').hidden=true;$('school').hidden=false;$('home').hidden=false;
 $('school-title').textContent=schools[role][0];$('school-intro').textContent=schools[role][1];
 const area=$('modules');area.replaceChildren();let tasks=[],progress=[];let refreshChildDashboard=null;
 applyPersonalTheme(role);
 if(role==='marks'||role==='samanta'){
  const hero=document.createElement('section');hero.className='world-hero world-hero-'+role;hero.style.gridColumn='1/-1';
  const art=document.createElement('img');art.src=role==='marks'?'/public/dragon-world.svg':'/public/garden-world.svg';art.alt=role==='marks'?'Pūķu sala ar pasaku pili, kalniem un pūķi':'Saulains dārzs ar namiņu, varavīksni un ziediem';art.className='world-hero-art';
  const overlay=document.createElement('div');overlay.className='world-hero-content';
  const k=document.createElement('span');k.className='world-kicker';k.textContent=role==='marks'?'LEVEL UP! · DRAGON REALM':'🌸 TAVA MĀCĪBU PASAULE';
  const title=document.createElement('h2');title.textContent=role==='marks'?'Pūķu ekspedīcija':'Laipni lūgta Saulainajā dārzā!';
  const desc=document.createElement('p');desc.textContent=role==='marks'?'Zināšanas dod spēku. Katra misija ir solis tuvāk nākamajam līmenim.':'Te mācīties var savā ritmā — ar attēliem, klausīšanos un maziem sasniegumiem.';
  overlay.append(k,title,desc);hero.append(art,overlay);area.append(hero);
  renderThemePicker(area,role);
 }

 if(role==='marks'||role==='samanta'){
  const subjectRoot=document.createElement('section');subjectRoot.className='subjects-root';subjectRoot.style.gridColumn='1/-1';area.append(subjectRoot);
  const available=role==='marks'
    ?[{id:'latviesu',icon:'📕',name:'Latviešu valoda',description:'Vārdu piedzīvojums · 3 tēmas',active:true,kind:'language'},
      {id:'matematika',icon:'🧮',name:'Matemātika',description:'Reizrēķins, dalīšana, saistītais pieraksts un teksta misijas',active:true,kind:'math'},
      {id:'anglu',icon:'🌎',name:'Angļu valoda',description:'Dienas, mēneši, gadalaiki un vietniekvārdi',active:true,kind:'english'}]
    :[{id:'matematika',icon:'🧮',name:'Matemātika',description:'Reizrēķins, dalīšana, attēli un stāsti',active:true,kind:'math'},
      {id:'latviesu',icon:'📚',name:'Latviešu valoda',description:'Lasīšana, vārdšķiras un burti',active:true,kind:'language'},
      {id:'anglu',icon:'🌎',name:'Angļu valoda',description:'Vārdi, krāsas, dzīvnieki un audio izruna',active:true,kind:'english'}];
  const openSubject=id=>{
   subjectRoot.replaceChildren();
   const nav=document.createElement('div');nav.className='subject-backbar';
   const back=document.createElement('button');back.type='button';back.className='subject-back';back.textContent='← Visi priekšmeti';back.onclick=renderSubjects;nav.append(back);subjectRoot.append(nav);
   const trainer=document.createElement('div');trainer.className='subject-trainer';subjectRoot.append(trainer);
   if(id==='latviesu'&&role==='marks'){
    renderLatvianSchool(trainer,{canSubmit:state.role===ROLES.MARKS,currentUid:state.role===ROLES.MARKS?state.user.uid:'',saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw new Error('Firestore neapstiprināja saglabāšanu');return saved;},askAI:async payload=>{const token=await state.user.getIdToken();const response=await fetch('/api/marka-ai',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(data.error||'MI treneris nav pieejams');return data.reply;}});
   }else if(id==='matematika'&&role==='marks'){
    renderMarksMath(trainer,{canSubmit:state.role===ROLES.MARKS,
     startVerifiedSession:async(topic,mode)=>{const token=await state.user.getIdToken();const response=await fetch('/api/math/session',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({topic,mode})});const data=await response.json();if(!response.ok)throw Error(data.error||'Servera sesija nav pieejama');return data;},
     gradeVerifiedSession:async(token,answers)=>{const idToken=await state.user.getIdToken();const response=await fetch('/api/math/grade',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+idToken},body:JSON.stringify({token,answers})});const data=await response.json();if(!response.ok)throw Error(data.error||'Servera pārbaude nav pieejama');return data;},
     saveProgress:async data=>{const id=await recordProgress({...data,currentUid:state.user.uid});if(!id)throw Error('Firebase saglabāšana nav apstiprināta');return id;}});
   }else if(id==='matematika'&&role==='samanta'){
    renderSamantaMath(trainer,{canSubmit:state.role===ROLES.SAMANTA,currentUid:state.role===ROLES.SAMANTA?state.user.uid:'',saveProgress:async data=>{const id=await recordProgress({...data,currentUid:state.user.uid});if(!id)throw Error('Firestore saglabāšana nav apstiprināta');return id;}});
   }
   else if(id==='anglu'&&role==='marks'){
    renderMarksEnglish(trainer,{canSubmit:state.role===ROLES.MARKS,saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw Error('Firebase saglabāšana nav apstiprināta');return saved;}});
   }else if(id==='anglu'&&role==='samanta'){
    renderSamantaEnglish(trainer,{canSubmit:state.role===ROLES.SAMANTA,saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw Error('Firebase saglabāšana nav apstiprināta');return saved;}});
   }else if(id==='latviesu'&&role==='samanta'){
    renderSamantaLatvian(trainer,{canSubmit:state.role===ROLES.SAMANTA,saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw Error('Firebase saglabāšana nav apstiprināta');return saved;}});
   }
   // Learning mode focuses on the task rather than the decorative dashboard.
   const hero=area.querySelector('.world-hero');if(hero)hero.hidden=true;
   const picker=area.querySelector('.theme-picker');if(picker)picker.hidden=true;
   subjectRoot.scrollIntoView({behavior:'smooth',block:'start'});
  };
  function renderSubjects(){
   subjectRoot.replaceChildren();
   const head=document.createElement('div');head.className='subject-intro';
   const eyebrow=document.createElement('span');eyebrow.className='eyebrow';eyebrow.textContent=role==='marks'?'TAVS MISIJU PANELIS':'IZVĒLIES MĀCĪBU PRIEKŠMETU';
   const title=document.createElement('h2');title.textContent=role==='marks'?'Šodienas misijas':'Ko šodien mācīsimies?';
   const caption=document.createElement('p');caption.textContent=role==='marks'?'Trīs prasmes, trīs virzieni. Izvēlies izaicinājumu — par īstu progresu, nevis klikšķiem.':'Izvēlies savu mācību priekšmetu. Pieejamās tēmas atvērsies nākamajā solī.';
   head.append(eyebrow,title,caption);subjectRoot.append(head);
   if(role==='marks'){const status=document.createElement('div');status.className='levelup-marks-status';status.textContent='⚔️ MARKS  ·  Prasmju ekspedīcija  ·  BP maks vēl nav aktivizēts';subjectRoot.append(status);}
   const diagnosticBox=document.createElement('div');diagnosticBox.className='card';diagnosticBox.style.cssText='margin:16px 0;padding:20px;border:2px solid #8a77c5;border-radius:18px;background:#faf7ff';
   const diagnosticDone=progress.some(p=>p.activityType===DIAGNOSTIC_VERSION && p.studentRole===role && (state.role===ROLES.PARENT || p.studentUid===state.user.uid));
   const dxTitle=document.createElement('h3');dxTitle.textContent=diagnosticDone?'✅ Pirmā ekspedīcija izpildīta':'🌟 Tava pirmā ekspedīcija';
   const dxDesc=document.createElement('p');dxDesc.textContent=diagnosticDone?'Sākuma rezultāts jau ir vēsturē. Vari apskatīt un atkārtot kā treniņu.':'12 īsi uzdevumi: matemātika, lasīšana un angļu valoda. Sāc bez steigas! Pēc misijas — neliels ģimenes pārsteigums.';
   const dxButton=document.createElement('button');dxButton.className='action-button';dxButton.type='button';dxButton.textContent=diagnosticDone?'Atkārtot kā treniņu →':'Sākt pirmo misiju →';
   dxButton.onclick=()=>{
    subjectRoot.replaceChildren();const diagContainer=document.createElement('div');subjectRoot.append(diagContainer);
    renderFirstDiagnostic(diagContainer,{role,alreadyCompleted:diagnosticDone,canSubmit:state.role===role,
      saveProgress:async data=>{const saved=await recordProgress({...data,currentUid:state.user.uid});if(!saved)throw Error('Firebase neapstiprināja saglabāšanu');return saved;},
      onBack:()=>{void showSchool(role);}});
   };
   diagnosticBox.append(dxTitle,dxDesc,dxButton);subjectRoot.append(diagnosticBox);
   const tiles=document.createElement('div');tiles.className=role==='marks'?'subject-grid levelup-marks-missions':'subject-grid';
   for(const subject of available){
    const button=document.createElement('button');button.type='button';button.className='subject-card subject-'+subject.kind;
    button.disabled=!subject.active;
    const symbol=document.createElement('span');symbol.className='subject-symbol';symbol.textContent=subject.icon;
    const name=document.createElement('strong');name.textContent=subject.name;
    const desc=document.createElement('span');desc.className='subject-description';desc.textContent=subject.description;
    const state=document.createElement('span');state.className='subject-status';state.textContent=subject.active?'Atvērt priekšmetu →':'Vēl nav pieejams';
    button.append(symbol,name,desc,state);
    if(subject.active)button.onclick=()=>openSubject(subject.id);
    tiles.append(button);
   }
   if(role==='marks'){const missionsNote=document.createElement('p');missionsNote.className='levelup-marks-note';missionsNote.textContent='Katru priekšmetu vari atvērt savā tempā. Dienas rotācijas un līmeņu automatizācija vēl tiek izstrādāta.';subjectRoot.append(missionsNote);}
   const shopTile=document.createElement('button');
   shopTile.type='button';shopTile.className='subject-card';
   shopTile.style.cssText='background:linear-gradient(145deg,#efeaff,#fbf7ff);border-color:#beb0f8;grid-column:1/-1;min-height:115px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px';
   const points=calculateChildPoints(role,progress);
   shopTile.innerHTML=`<div style="display:flex;align-items:center;gap:16px;text-align:left"><span style="font-size:2.8rem">🎁</span><div><strong style="font-size:1.35rem;display:block">Balvu veikals un mērķi</strong><span style="color:#6553a9;font-weight:700">Iesniedz balvas vēlmi vecākam. BP krāšana vēl nav aktivizēta.</span></div></div><span class="subject-status" style="margin:0;white-space:nowrap">Atvērt veikalu →</span>`;
   shopTile.onclick=()=>{
    subjectRoot.replaceChildren();
    const nav=document.createElement('div');nav.className='subject-backbar';
    const back=document.createElement('button');back.type='button';back.className='subject-back';back.textContent='← Visi priekšmeti';back.onclick=renderSubjects;nav.append(back);subjectRoot.append(nav);
    const shopContainer=document.createElement('div');subjectRoot.append(shopContainer);
    renderRewardShop(shopContainer,{studentRole:role,progressRecords:progress,onBack:renderSubjects});
   };
   tiles.append(shopTile);
   subjectRoot.append(tiles);
   const hero=area.querySelector('.world-hero');if(hero)hero.hidden=false;
   const picker=area.querySelector('.theme-picker');if(picker)picker.hidden=false;
  }
  refreshChildDashboard=renderSubjects;
  renderSubjects();
 }
 // Independent data loading: Firestore errors must never remove learning modules.
 const loadErrors=[];
 try{
   tasks=await getTasks(state.role===ROLES.PARENT?ROLES.PARENT:role);
   if(state.role===ROLES.PARENT && role!==ROLES.PARENT)tasks=tasks.filter(t=>t.assignedTo===role || t.assignedTo==='both');
 }catch(err){loadErrors.push('uzdevumus');console.warn('[Mājas skola] Uzdevumu ielādes kļūdas kods:',err?.code||'unknown');}
 try{
   progress=await getProgressHistory({role:state.role===ROLES.PARENT?'vecaks':role,userUid:state.user.uid});
   // Never count a parent's preview recordings as either child's achievements.
   if(state.role===ROLES.PARENT)progress=progress.filter(p=>p.studentUid!==state.user.uid);
   if(state.role===ROLES.PARENT && role!==ROLES.PARENT)progress=progress.filter(p=>p.studentRole===role);
   if(state.role!==ROLES.PARENT)progress=progress.filter(p=>p.studentUid===state.user.uid);
 }catch(err){loadErrors.push('rezultātus');console.warn('[Mājas skola] Progresa ielādes kļūdas kods:',err?.code||'unknown');}
 // Baseline buttons depend on Firebase history, so refresh after history loads.
 if(refreshChildDashboard)refreshChildDashboard();
 if(loadErrors.length){const notice=document.createElement('div');notice.className='module';notice.style.gridColumn='1/-1';notice.textContent='Pagaidām neizdevās ielādēt '+loadErrors.join(' un ')+'. Mācību trenažieri joprojām ir pieejami.';area.append(notice);}
 if(state.role===ROLES.PARENT){const nav=document.createElement('div');nav.className='module';nav.style.gridColumn='1/-1';
 nav.innerHTML='<h2>Pārslēgt vidi</h2><p>Vecākam pieejami abi bērnu skati.</p>';
 for(const child of ['marks','samanta','vecaks']){const b=document.createElement('button');b.textContent=schools[child][0];b.style.margin='5px';b.addEventListener('click',()=>showSchool(child));nav.append(b)}area.append(nav)}
 if(role===ROLES.PARENT){
  render7DayAnalytics(area,progress);
  renderParentRewardManager(area);
  const panel=document.createElement('section');panel.className='module';panel.style.gridColumn='1/-1';
  const title=document.createElement('h2');title.textContent='🧹 Testēšanas rezultātu sakārtošana';panel.append(title);
  const info=document.createElement('p');info.textContent='Var izdzēst tikai rezultātus, kuru īpašnieks ir šis vecāka konts. Marka un Samantas ieraksti netiek skarti.';panel.append(info);
  const remove=document.createElement('button');remove.type='button';remove.textContent='Pārbaudīt un dzēst manus testa rezultātus';panel.append(remove);
  const status=document.createElement('p');status.setAttribute('role','status');panel.append(status);
  remove.addEventListener('click',async()=>{
   remove.disabled=true;status.textContent='Pārbaudu vecāka testa ierakstus…';
   try{
    const all=await getProgressHistory({role:ROLES.PARENT,userUid:state.user.uid});
    const own=all.filter(p=>p.studentUid===state.user.uid&&p.id);
    if(!own.length){status.textContent='Šī vecāka konta testa ieraksti nav atrasti.';return;}
    const approved=window.confirm('Atrasti '+own.length+' ieraksti, kas saglabāti ar vecāka kontu. Dzēst tikai šos ierakstus? Bērnu rezultāti netiks dzēsti.');
    if(!approved){status.textContent='Dzēšana atcelta.';return;}
    const removed=await deleteParentTestProgress(own.map(p=>p.id));
    status.textContent='Izdzēsti '+removed+' vecāka testa ieraksti. Bērnu ieraksti saglabāti.';
    await showSchool(ROLES.PARENT);
   }catch(e){status.textContent='Dzēšana neizdevās: '+(e?.message||'Pārbaudi Firestore atļaujas.');}
   finally{remove.disabled=false;}
  });
  area.append(panel);
  const resetPanel=document.createElement('section');resetPanel.className='module';resetPanel.style.gridColumn='1/-1';
  const resetTitle=document.createElement('h2');resetTitle.textContent='Bērnu progresa atiestatīšana';resetPanel.append(resetTitle);
  const resetInfo=document.createElement('p');resetInfo.textContent='Dzēš tikai izvēlētā bērna Firebase mācību rezultātus. Konti, uzdevumi un Datorika HUB netiek skarti. Dzēšanu nevar atsaukt. Telefonā saglabātā lokālā treniņu statistika var palikt.';resetPanel.append(resetInfo);
  const resetStatus=document.createElement('p');resetStatus.setAttribute('role','status');resetPanel.append(resetStatus);
  for(const [childRole,childName,childUid] of [[ROLES.MARKS,'Marks','w4nbeq1UguRFrvdwVSFOkk46zXA2'],[ROLES.SAMANTA,'Samanta','txTRitErw8c4NRK87v1JFrFkoPa2']]){
   const button=document.createElement('button');button.type='button';button.textContent='Atiestatīt: '+childName;button.style.margin='6px';resetPanel.append(button);
   button.addEventListener('click',async()=>{
    button.disabled=true;resetStatus.textContent='Pārbaudu '+childName+' rezultātus…';
    try{
     const all=await getProgressHistory({role:ROLES.PARENT,userUid:state.user.uid});
     const matching=all.filter(p=>p.studentUid===childUid&&p.studentRole===childRole);
     if(!matching.length){resetStatus.textContent=childName+': Firebase rezultātu nav. Lokālā statistika telefonā netiek dzēsta.';return;}
     const answer=window.prompt('Neatgriezeniski dzēst '+matching.length+' '+childName+' rezultātus? Lai apstiprinātu, ieraksti precīzi: DZĒST '+childName.toUpperCase());
     if(answer!=='DZĒST '+childName.toUpperCase()){resetStatus.textContent='Atiestatīšana atcelta.';return;}
     resetStatus.textContent='Dzēšu tikai '+childName+' rezultātus…';
     const deleted=await resetChildProgress(childRole,matching.length);
     resetStatus.textContent=childName+': izdzēsti '+deleted+' Firebase rezultāti. Lokālās statistikas notīrīšana vēl nav veikta.';
     await showSchool(ROLES.PARENT);
    }catch(e){resetStatus.textContent='Atiestatīšana neizdevās vai bija daļēja: '+(e?.message||'Pārbaudi Firestore atļaujas.');}
    finally{button.disabled=false;}
   });
  }
  area.append(resetPanel);
 }
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
 $('home').addEventListener('click',()=>{if(state.user && state.role){void showSchool(state.view||state.role);}else showWelcome();});
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
