import {renderMarksPoetryMission} from './marks-poetry-mission.js';
import {renderMarksSentenceMission} from './marks-sentence-mission.js';
import {renderDragonSplitMath} from './dragon-split-math.js';
import {renderFirstDiagnostic,DIAGNOSTIC_VERSION} from './first-diagnostic.js';
import {renderMarksMath} from './marks-math.js';
import {renderMarksEnglish} from './marks-english.js';
import {renderMarksUnit1Mission} from './marks-unit1-mission.js';
import {UNIT1_DAYS,UNIT1_BONUS_DEADLINE,UNIT1_NPD_DATE,unit1MissionId} from './marks-unit1-data.js';
import {renderMarksSocialStudies} from './marks-social-studies.js';
import {renderMarksNatureNPD} from './marks-nature-npd.js';
import {renderSamantaLatvian} from './samanta-latvian.js';
import {renderSamantaEnglish} from './samanta-english.js';
import {renderSamantaMath} from './samanta-math.js';
import {renderSamantaAdditionGame} from './samanta-sum-game.js';
import {renderSamantaNature} from './samanta-nature.js';
import {renderLatvianSchool} from './latvian-school.js';
import {renderRewardShop,renderParentRewardManager} from './rewards-system.js';
import {applyPersonalTheme,renderThemePicker} from './personal-theme.js';
import {installChildGuide} from './child-guide.js';
import {startChildPresence,renderParentPresence} from './activity-presence.js';
import {initFirebase,auth,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,signOut,onAuthStateChanged} from './firebase/init.js';
import {getUserProfile,getTasks,getProgressHistory,createTask,updateTaskStatus,editTask,removeTask,recordProgress,getProgressRecord,getFamilyIdentities,ROLES} from './firebase/homeSchoolService.js';
import {CATALOG,SUBJECTS,taskStatus,taskState,qualifiesTask} from './catalog.js';
import {calculateChildPoints,dayKey,readNotes,describeActivity,CHILD_UIDS} from './learning-policy.js';
import {readDraft,writeDraft,clearDraft,captureFields,restoreFields} from './drafts.js';
import {pendingResults,queueResult,acknowledgeResult,flushResults} from './progress-outbox.js';

const $=id=>document.getElementById(id);
const E=(tag,text='',cls='')=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
const button=(parent,text,fn,cls='action-button')=>{const b=E('button',text,cls);b.type='button';b.onclick=fn;parent.append(b);return b;};
const state={user:null,role:null,view:null,progress:[],tasks:[],loading:false,dirty:false,active:null,day:dayKey(new Date())};
let version=0,stopPresence=null,stopParent=null,guide=null,back=()=>{},currentActivity='Sākumekrāns';
const parked=new Map();
let familyIds={},spentByRole={};
const uidFor=role=>role===state.role?state.user?.uid:familyIds[role]||CHILD_UIDS[role];
const pointsFor=role=>{const p=calculateChildPoints(role,state.progress,new Date(),uidFor(role));p.spent=spentByRole[role]||0;p.balance=Math.max(0,p.balance-p.spent);p.remaining=Math.max(0,250-p.balance);return p;};
const canSubmit=role=>state.role===role;
const sendQueued=async row=>{const id=await recordProgress(row);const stored=id?await getProgressRecord(id):null;row={...row,...stored};if(id&&row.taskId&&row.taskQualified)await updateTaskStatus(row.taskId,'completed',row.studentRole,id);if(id&&state.user?.uid===row.currentUid&&!state.progress.some(r=>r.attemptId===id))state.progress.push({...row,studentUid:row.currentUid,recordedAt:{seconds:Date.parse(row.completedAt)/1000}});return id;};
function stopAudio(){if('speechSynthesis' in window)speechSynthesis.cancel();}
function leave(fn){if(state.dirty&&!confirm('Darbs vēl nav iesniegts. Iesākto posmu varēsi turpināt no dienas plāna. Vai atgriezties?'))return;stopAudio();state.dirty=false;fn();}
function welcome(){version++;state.progress=[];state.tasks=[];familyIds={};spentByRole={};stopAudio();stopPresence?.();stopPresence=null;stopParent?.();stopParent=null;guide?.stop();guide=null;parked.clear();state.dirty=false;state.active=null;$('welcome').hidden=false;$('school').hidden=true;$('home').hidden=true;if($('login-password'))$('login-password').value='';if($('login-message'))$('login-message').textContent='';header();}
function header(){let bar=$('header-auth-bar');if(!bar){bar=E('div');bar.id='header-auth-bar';document.querySelector('header').append(bar);}bar.replaceChildren();if(state.user)button(bar,'Iziet',()=>leave(async()=>{await signOut(auth);welcome();}),'quiet-button');}
async function refresh(){
 const mine=version;state.loading=true;
 const outcomes=await Promise.allSettled([getTasks(state.role),getProgressHistory({role:state.role,userUid:state.user.uid})]);
 if(mine!==version)return false;
 state.tasks=outcomes[0].status==='fulfilled'?outcomes[0].value:state.tasks;
 state.progress=outcomes[1].status==='fulfilled'?outcomes[1].value:state.progress;
 if(state.role==='vecaks')state.progress=state.progress.filter(r=>r.studentUid!==state.user.uid);
 try{const profile=await getUserProfile(state.user.uid);if(state.role!=='vecaks')spentByRole[state.role]=Number(profile.spentBP)||0;}catch{}
 state.loading=false;state.loadError=outcomes.some(r=>r.status==='rejected');return true;
}
async function showSchool(role){
 if(!state.user||!state.role)return;
 if(state.role!==ROLES.PARENT&&state.role!==role)return;
 version++;state.view=role;state.dirty=false;state.active=null;stopParent?.();stopParent=null;
 applyPersonalTheme(role);$('welcome').hidden=true;$('school').hidden=false;$('home').hidden=false;header();
 $('school-title').textContent={marks:'🐉 Marka skola',samanta:'🌸 Samantas skola',vecaks:'📋 Vecāka panelis'}[role];
 $('school-intro').textContent=role==='vecaks'?'Uzdevumi, izpilde un mācību progress':'Viens nākamais solis. Mācies savā tempā.';
 $('modules').replaceChildren(E('p','Ielādēju saglabātos darbus…'));
 if(!await refresh())return;
 if(state.role==='vecaks')try{familyIds=await getFamilyIdentities();for(const [role,uid] of Object.entries(familyIds)){const profile=await getUserProfile(uid);spentByRole[role]=Number(profile.spentBP)||0;}}catch{}
 if(role==='vecaks')renderParent();else renderDashboard(role);
 back=()=>showSchool(role);
}
function notice(parent,text,cls='soft-notice'){const p=E('p',text,cls);p.setAttribute('role','status');parent.append(p);return p;}
function pendingPanel(parent){
 if(state.role==='vecaks')return;
 const rows=pendingResults(state.user.uid);if(!rows.length)return;
 const section=E('section','','module result-retry');section.append(E('h2','💾 Nosūtīšanai saglabāti '+rows.length+' rezultāti'));
 const status=notice(section,'Pabeigtie rezultāti ir šīs ierīces rezerves atmiņā. Nosūti tos, kad atjaunojas savienojums.');
 button(section,'Nosūtīt rezultātus vēlreiz',async()=>{try{await flushResults(state.user.uid,sendQueued);await showSchool(state.view);}catch(e){status.textContent='Neizdevās nosūtīt: '+e.message;}});parent.append(section);
}
function completedModule(role,module,day=null){return state.progress.some(r=>r.studentUid===uidFor(role)&&r.studentRole===role&&(r.moduleId===module.id||module.prefix&&r.activityType?.startsWith(module.prefix))&&(!day||dayKey(r.completedAt||r.recordedAt)===day));}
function bonusEarned(role,module){return state.progress.some(r=>r.studentUid===uidFor(role)&&r.studentRole===role&&r.activityType?.startsWith(module.prefix)&&r.score>=module.threshold&&['practice','exam','speed'].includes(describeActivity(r).mode));}
function taskCard(parent,task,role){
 const status=taskState(task,role,state.day),box=E('article','','card task-card');box.append(E('h3',task.title));
 if(task.description)box.append(E('p',task.description));
 if(task.bonusBP)box.append(E('p','Papildu bonuss +'+task.bonusBP+' BP · nepieciešams '+(task.targetScore||0)+'%'+(task.requiredMode&&task.requiredMode!=='any'?' · režīms '+task.requiredMode:'')));
 box.append(E('p',({completed:'✅ Izpildīts',available:'Pieejams',expired:'Termiņš beidzies',scheduled:'Vēl nav sācies'})[status]+(task.dueDate?' · Līdz '+task.dueDate:'')));
 if(task.moduleId&&status==='available')button(box,'Sākt uzdevumu →',()=>openModule(role,task.moduleId,task));
 else if(!task.moduleId&&status==='available')button(box,'Atzīmēt kā izpildītu',async()=>{try{await updateTaskStatus(task.id,'completed',role);await showSchool(role);}catch(e){notice(box,e.message);}});
 if(status==='completed')button(box,'Apskatīt tēmu',()=>task.moduleId?openModule(role,task.moduleId):null,'quiet-button');
 parent.append(box);
}
function renderDashboard(role){
 state.active=null;state.dirty=false;currentActivity='Priekšmetu izvēle';state.day=dayKey(new Date());
 const area=$('modules');area.classList.remove('learning-active');area.replaceChildren();
 if(state.loadError)notice(area,'Daļu saglabāto datu neizdevās ielādēt. Punktu un izpildes statuss var nebūt pilnīgs.');
 pendingPanel(area);
 const points=pointsFor(role),top=E('section','','module compact-progress');
 top.append(E('h2','Šodien +'+points.todayEarned+' BP · Kopā '+points.balance+' BP'),E('p','💎 '+points.crystals.length+'/3 dienas priekšmeti · '+points.remaining+' BP līdz kino mērķim'));
 const slots=E('div','','crystal-slots');for(const subject of SUBJECTS)slots.append(E('span',(points.crystals.includes(subject.id)?'✅ ':'○ ')+subject.icon+' '+subject.name));top.append(slots);area.append(top);
 const tasks=state.tasks.filter(t=>['both',role].includes(t.assignedTo)),activeTasks=tasks.filter(t=>taskState(t,role,state.day)==='available');
 const assigned=tasks.find(t=>t.daily&&['available','completed'].includes(taskState(t,role,state.day))&&(!t.dueDate||t.dueDate>=state.day)&&(!t.startDate||t.startDate<=state.day))||activeTasks.find(t=>t.moduleId);
 const dailyModule=CATALOG[role][Math.floor(Date.parse(state.day+'T00:00:00Z')/86400000)%CATALOG[role].length];
 const daily=E('section','','module daily-task');daily.append(E('span','ŠODIENAS TĒMA','eyebrow'));
 if(role==='marks'&&state.day>='2026-10-14'){
  const specs=[
   {id:'oct29-nature-organisms',title:'🌱 Dabaszinības — Kā vairojas, aug un attīstās dzīvie organismi? (4. kl. NPD)',module:'daba',topic:'organismi_npd',bonus:20,min:80,
    details:'Oficiālā sagatavošanās 4. klases nobeiguma pārbaudes darbam (Lielvārds 2025, 25 punkti, 14 uzdevumi): augu un dzīvnieku vairošanās, zieda daļas, sēklu dīgšanas 3 apstākļi, veģetatīvā pavairošana, riests, tauriņa cikls, pubertāte, iedzimtība un 4 stādu eksperimenta datu analīze.'},
   {id:'oct26-english-questions',title:'🇬🇧 Angļu valoda — SR: Jautājumi ar am / is / are & Jaunie vārdi',module:'anglu',topic:'worksheet',bonus:15,min:85,
    details:'Interaktīvā darba lapa: 15 jaunie vārdi (bag, guitar, phone, trainers, headphones...), jautājumu veidošana ar am/is/are un īsās atbildes.'}
  ];
  const list=E('div','','today-missions');
  // Intensīva sagatavošanās angļu valodas Unit 1 NPD (04.11.).
  if(state.day>='2026-10-30'&&state.day<=UNIT1_NPD_DATE){
   const active=UNIT1_DAYS.filter(d=>d.date<=state.day).at(-1)||UNIT1_DAYS[0];
   const done=state.progress.some(r=>r.studentRole==='marks'&&r.studentUid===uidFor(role)&&
     readNotes(r).missionId===unit1MissionId(active.date)&&describeActivity(r).mode==='exam'&&r.score>=80);
   const card=E('article','','card task-card unit1-featured');
   const bonusText=state.day<=UNIT1_BONUS_DEADLINE?
     (done?'✅ Dienas +10 BP nosacījums izpildīts.':'🎁 Dienas bonuss +10 BP, ja patstāvīgajā daļā vismaz 80%.'):
     '📝 Šodien NPD. Atkārtošanai pieejamas visas piecas misijas.';
   card.append(E('h3','🇬🇧 Unit 1 · angļu valodas NPD 04.11.'),E('p',active.icon+' '+active.title+' — '+active.focus),E('p',bonusText),
     E('p','5 sagatavošanās dienas · be formas, 15 priekšmeti, valstis un tautības, lasīšana, klausīšanās, dialogs, rakstīšana.'));
   button(card,'Atvērt Unit 1 NPD ekspedīciju →',()=>openModule(role,'anglu-unit1'));
   list.append(card);
  }
  for(const spec of specs){
   const completed=state.progress.some(r=>r.studentRole==='marks'&&r.studentUid===uidFor(role)&&
    readNotes(r).missionId===spec.id&&describeActivity(r).mode==='exam'&&r.score>=spec.min);
   const card=E('article','','card task-card');
   card.append(E('h3',spec.title),E('p',spec.details),
    E('p',completed?'✅ Izpildīts · īpašais +'+spec.bonus+' BP bonuss iegūts':
      '🎁 +'+spec.bonus+' BP vienreiz, sasniedzot '+spec.min+'% patstāvīgajā pārbaudē.'));
   button(card,completed?'Apskatīt vai atkārtot →':'Sākt bonusa misiju →',
    ()=>openModule(role,spec.module,null,false,spec.topic,spec.id));
   list.append(card);
  }
  daily.append(list);
  if(assigned){const extra=E('section','','daily-assigned');extra.append(E('h3','Cits vecāka piešķirts uzdevums'));taskCard(extra,assigned,role);daily.append(extra);}
 }
 else if(role==='samanta'){
  const list=E('div','','today-missions');
  const card=E('article','','card task-card');
  const npdEarned=bonusEarned(role,{id:'daba',bonus:20,threshold:80,prefix:'Dabas teritorijas'});
  card.append(
    E('h3','🌿 1. Dabaszinības — 3. klases NPD pārbaudes darbs'),
    E('p','Temats: "Kas ir kopīgs un atšķirīgs dažādām dabas teritorijām?" (Mežs, pļava, purvs, ūdeņi, 5 meža stāvi, barības ķēdes un bionika).'),
    E('p',npdEarned?'✅ Zelta bonuss jau saņemts (+20 BP)! Vari atkārtot vai pētīt Dabas laboratoriju.':'🌟 Zelta bonuss: +20 BP un Zelta Dabas Pētnieces Diploms pie vismaz 80% rezultāta!')
  );
  button(card,'Atvērt dabaszinību NPD un laboratoriju →',()=>openModule(role,'daba'));
  list.append(card);
  daily.append(list);
  if(assigned){const block=E('section','','daily-assigned');block.append(E('h3','Papildu vecāka piešķirtais uzdevums'));taskCard(block,assigned,role);daily.append(block);}
 }
 else if(assigned)taskCard(daily,assigned,role);
 else {
  const done=completedModule(role,dailyModule,state.day);daily.append(E('h2',(done?'✅ ':'')+dailyModule.name));
  daily.append(E('p',done?'Šodienas tēma izpildīta. Vari nostiprināt zināšanas vai izvēlēties citu priekšmetu.':'Sāc ar šo tēmu; pēc tam izvēlies nākamo dienas priekšmetu.'));
  if(dailyModule.bonus)daily.append(E('p',bonusEarned(role,dailyModule)?'Vienreizējais bonuss jau saņemts.':'Īpašais bonuss: +'+dailyModule.bonus+' BP par pirmo rezultātu no '+dailyModule.threshold+'%.'));
  button(daily,done?'Atkārtot tēmu →':'Sākt šodienas tēmu →',()=>openModule(role,dailyModule.id));
 }
 daily.append(E('p','Dienas izvēle mainās pusnaktī pēc Latvijas laika. Visas tēmas vienmēr paliek priekšmetu katalogā.','points-disclaimer'));area.append(daily);
 const drafts=CATALOG[role].filter(m=>readDraft(uidFor(role),m.id)).map(m=>[role+':'+m.id,{name:m.name,task:state.tasks.find(t=>t.id===readDraft(uidFor(role),m.id)?.taskId)}]);
 for(const [key,draft] of drafts){const card=E('section','','module');card.append(E('h3','Turpināt iesākto: '+draft.name),E('p','Iesāktais posms un ievadītās atbildes saglabāti šajā ierīcē.'));button(card,'Turpināt →',()=>openModule(role,key.split(':')[1],draft.task,true));area.append(card);}
 const more=activeTasks.filter(t=>t!==assigned);if(more.length){const section=E('section','','module');section.append(E('h2','Vēl piešķirtie uzdevumi'));more.forEach(t=>taskCard(section,t,role));area.append(section);}
 const subjects=E('section','','module');subjects.append(E('h2','Mācību priekšmeti'));const grid=E('div','','subject-grid');
 for(const subject of SUBJECTS.filter(s=>CATALOG[role].some(m=>m.subjectId===s.id))){const card=E('article','','card');card.append(E('h3',subject.icon+' '+subject.name));for(const module of CATALOG[role].filter(x=>x.subjectId===subject.id)){button(card,module.name+' →',()=>openModule(role,module.id));if(module.bonus)card.append(E('small',bonusEarned(role,module)?'✅ Vienreizējais bonuss saņemts':module.description+' · +'+module.bonus+' BP pie '+module.threshold+'%'));}grid.append(card);}subjects.append(grid);area.append(subjects);
 const extras=E('details','','module');extras.append(E('summary','Mana pasaule, sākuma ekspedīcija un balvas'));
 renderThemePicker(extras,role);const diagnosticDone=state.progress.some(r=>r.studentUid===uidFor(role)&&r.activityType===DIAGNOSTIC_VERSION);
 button(extras,diagnosticDone?'Atkārtot sākuma ekspedīciju bez BP':'Sākt pirmo ekspedīciju',()=>openModule(role,'diagnostic'));
 button(extras,'Balvu veikals un vēlmes →',()=>openShop(role));area.append(extras);
 const help=E('details','','module');help.append(E('summary','Kā rodas mani BP?'),E('p','Meistarība: līdz 20 BP vienā tēmā, ieskaitot tikai labākā patstāvīgā rezultāta pieaugumu. Centība: +2 par tēmas pirmo pabeigto darbu dienā, līdz +6 dienā. Trīs priekšmeti dienā: +10 BP. Diagnostika nedod BP. Īpašās misijas bonusu saņem vienreiz. Punkti ir mācību sasniegumi; par balvām lemj vecāks.'));area.append(help);
 renderHistory(area,role);
 if(state.role==='vecaks')button(area,'← Vecāka panelis',()=>showSchool('vecaks'));
 back=()=>showSchool(role);
}
function receipt(trainer,row){
 const points=pointsFor(row.studentRole),event=points.events.find(e=>e.attemptId===row.attemptId);
 trainer.querySelector('.bp-receipt')?.remove();
 const box=E('section','','soft-notice bp-receipt');box.setAttribute('role','status');
 box.append(E('h3',event?'Ieskaitīti +'+event.earned+' BP':'Rezultāts saglabāts bez BP'));
 if(event)box.append(E('p','Meistarība +'+event.mastery+' · Centība +'+event.effort+' · Dienas bonuss +'+event.dailyBonus+' · Īpašais bonuss +'+event.missionBonus+' · Uzdevuma bonuss +'+event.assignedBonus),E('p','Kopā '+points.balance+' BP.'));
 button(box,'Atgriezties pie dienas plāna →',()=>renderDashboard(row.studentRole));trainer.append(box);
}
function openModule(role,id,task=null,resume=false,initialTopic=null,missionId=null){
 if(resume&&!missionId)missionId=readDraft(uidFor(role),id)?.missionId||null;
 const module=CATALOG[role].find(x=>x.id===id)||{id,name:'Pirmā ekspedīcija'},key=role+':'+id;
 if(readDraft(uidFor(role),id)&&!resume){if(confirm('Šī tēma jau ir iesākta. Turpināt saglabāto darbu?'))resume=true;else{parked.delete(key);clearDraft(uidFor(role),id);}}
 const area=$('modules');area.replaceChildren();area.classList.add('learning-active');state.active={role,id,task};currentActivity=module.name;
 const nav=E('div','','subject-backbar');button(nav,'← Dienas plāns',()=>leave(()=>renderDashboard(role)));area.append(nav);
 const savedDraft=resume?readDraft(uidFor(role),id):null;
 state.dirty=false;const trainer=E('div','','subject-trainer');area.append(trainer);
 const draft={trainer,name:module.name,task,dirty:false};parked.set(key,draft);
 let checkpoint=savedDraft?.state||null;
 const persist=()=>{if(canSubmit(role)&&checkpoint)writeDraft(state.user.uid,id,{name:module.name,state:checkpoint,fields:captureFields(trainer),taskId:task?.id||null,missionId});};
 trainer.addEventListener('input',()=>{draft.dirty=state.dirty=true;persist();});
 trainer.addEventListener('change',persist);
 trainer.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(!/^(←|⬅|Atpakaļ|Uz sākumu)/.test(b.textContent)&&!b.classList.contains('topic-tile'))draft.dirty=state.dirty=true;},true);
 let retryRow=savedDraft?.pendingAttemptId?{attemptId:savedDraft.pendingAttemptId}:null;
 const saveProgress=async data=>{
  if(!canSubmit(role))return null;const ownerUid=state.user.uid;
  let qualified=task?qualifiesTask(task,{...data,moduleId:id},describeActivity(data).mode,dayKey(new Date())):false;
  const notes=readNotes(data);
  const missionNotes=missionId?JSON.stringify({...notes,missionId}):data.notes;
  let row=queueResult(state.user.uid,{...data,notes:missionNotes,mode:describeActivity(data).mode,taskQualified:qualified,taskBonus:qualified?task.bonusBP||0:0,currentUid:state.user.uid,studentRole:role,moduleId:id,taskId:task?.id||null,attemptId:retryRow?.attemptId});retryRow=row;
  if(checkpoint)writeDraft(ownerUid,id,{name:module.name,state:checkpoint,fields:captureFields(trainer),taskId:task?.id||null,missionId,pendingAttemptId:row.attemptId});
  const send=async()=>{
   const savedId=await recordProgress(row);if(!savedId)throw Error('Saglabāšanu nevar apstiprināt.');const stored=await getProgressRecord(savedId);row={...row,...stored};qualified=row.taskQualified;
   acknowledgeResult(ownerUid,savedId);clearDraft(ownerUid,id);retryRow=null;
   if(state.user?.uid!==ownerUid)return savedId;
   if(!state.progress.some(r=>r.attemptId===row.attemptId))state.progress.push({...row,studentUid:ownerUid,recordedAt:{seconds:Date.parse(row.completedAt)/1000}});
   if(task&&qualified)try{await updateTaskStatus(task.id,'completed',role,savedId);task.completions={...task.completions,[role]:{status:'completed',attemptId:savedId}};}catch(e){notice(trainer,'Rezultāts saglabāts; uzdevuma statusu neizdevās atjaunot: '+e.message);}
   draft.dirty=false;if(state.active?.id===id)state.dirty=false;if(task&&!qualified)notice(trainer,'Rezultāts saglabāts; uzdevuma nosacījumi vēl nav sasniegti. Apskati prasības dienas plānā.');receipt(trainer,row);return savedId;
  };
  try{return await send();}catch(e){
   trainer.querySelector('.save-retry')?.remove();const box=E('section','','soft-notice save-retry');notice(box,'Rezultāts ir saglabāts rezerves atmiņā. '+e.message);
   button(box,'Saglabāt vēlreiz',async()=>{try{await send();box.remove();}catch(err){notice(box,err.message);}});trainer.append(box);throw e;
  }
 };
 const options={initialState:savedDraft?.state||null,onCheckpoint:data=>{checkpoint=data;if(canSubmit(role))writeDraft(state.user.uid,id,{name:module.name,state:data,fields:[],taskId:task?.id||null,missionId});},canSubmit:canSubmit(role),currentUid:canSubmit(role)?state.user.uid:'',saveProgress,alreadyEarnedBonus:module.bonus?bonusEarned(role,module):false};
 const api=async(path,payload)=>{const token=await state.user.getIdToken();const response=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});const data=await response.json();if(!response.ok)throw Error(data.error||'Servera kļūda');return data;};
 try{
  if(id==='diagnostic')renderFirstDiagnostic(trainer,{...options,role,alreadyCompleted:state.progress.some(r=>r.studentUid===uidFor(role)&&r.activityType===DIAGNOSTIC_VERSION),onBack:()=>leave(()=>renderDashboard(role))});
  else if(role==='marks'&&id==='latviesu')renderLatvianSchool(trainer,{...options,initialTopic,askAI:async payload=>(await api('/api/marka-ai',payload)).reply});
  else if(role==='marks'&&id==='matematika')renderMarksMath(trainer,{...options,initialTopic,startVerifiedSession:async(topic,mode)=>api('/api/math/session',{topic,mode}),gradeVerifiedSession:async(token,answers)=>api('/api/math/grade',{token,answers})});
  else if(role==='marks'&&id==='teikumi')renderMarksSentenceMission(trainer,options);
  else if(role==='marks'&&id==='dzeja')renderMarksPoetryMission(trainer,options);
  else if(role==='marks'&&id==='kristali')renderDragonSplitMath(trainer,options);
  else if(role==='marks'&&id==='anglu')renderMarksEnglish(trainer,{...options,initialTopic});
  else if(role==='marks'&&id==='anglu-unit1')renderMarksUnit1Mission(trainer,{
   ...options,
   completedMissions:state.progress.filter(r=>r.studentRole==='marks'&&r.studentUid===uidFor(role)&&
     describeActivity(r).mode==='exam'&&r.score>=80&&readNotes(r).missionId?.startsWith('unit1-'))
     .map(r=>readNotes(r).missionId),
   today:state.day
  });
  else if(role==='marks'&&(id==='social'||id==='socialie'))renderMarksSocialStudies(trainer,options);
  else if(role==='marks'&&id==='daba')renderMarksNatureNPD(trainer,{...options,initialTopic,
    requestLatvianAudio:async text=>{
      const token=await state.user.getIdToken();
      const result=await fetch('/api/latvian-tts',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({text}),signal:AbortSignal.timeout(16000)});
      if(!result.ok)throw Error('Kvalitatīvā balss nav pieejama');
      return result.json();
    }
  });
  else if(role==='samanta'&&id==='matematika')renderSamantaMath(trainer,options);
  else if(role==='samanta'&&id==='saskaitisana')renderSamantaAdditionGame(trainer,options);
  else if(role==='samanta'&&id==='latviesu')renderSamantaLatvian(trainer,options);
  else if(role==='samanta'&&id==='anglu')renderSamantaEnglish(trainer,options);
  else if(role==='samanta'&&id==='daba')renderSamantaNature(trainer,options);
 }catch(e){notice(trainer,'Neizdevās atvērt tēmu: '+e.message);button(trainer,'Mēģināt vēlreiz',()=>openModule(role,id,task));}
 restoreFields(trainer,savedDraft?.fields);if(savedDraft)draft.dirty=state.dirty=true;
 back=()=>leave(()=>renderDashboard(role));trainer.querySelector('h2')?.setAttribute('tabindex','-1');trainer.querySelector('h2')?.focus({preventScroll:true});window.scrollTo?.(0,0);
}
function openShop(role){state.dirty=false;const area=$('modules');area.replaceChildren();renderRewardShop(area,{studentRole:role,progressRecords:state.progress,currentUid:uidFor(role),spentBP:spentByRole[role]||0,onBack:()=>renderDashboard(role)});back=()=>renderDashboard(role);}
function renderHistory(parent,role){
 const section=E('details','','module results-panel');section.append(E('summary','Rezultāti un atbilžu pārskats'));
 const controls=E('div','','button-cluster');const subjectFilter=E('select');subjectFilter.setAttribute('aria-label','Filtrēt priekšmetu');for(const [id,name] of [['','Visi priekšmeti'],...SUBJECTS.map(s=>[s.id,s.name])]){const opt=E('option',name);opt.value=id;subjectFilter.append(opt);}controls.append(subjectFilter);section.append(controls);const list=E('div');section.append(list);let shown=20;
 const draw=()=>{list.replaceChildren();const rows=state.progress.filter(r=>(role==='vecaks'||r.studentUid===uidFor(role))&&(!subjectFilter.value||describeActivity(r).subjectId===subjectFilter.value)).sort((a,b)=>Date.parse(b.completedAt||'')-Date.parse(a.completedAt||'')||(b.recordedAt?.seconds||0)-(a.recordedAt?.seconds||0));
  for(const row of rows.slice(0,shown)){const card=E('details','','result-row');const date=row.completedAt?new Date(row.completedAt):new Date((row.recordedAt?.seconds||0)*1000);card.append(E('summary',(row.studentRole==='marks'?'Marks':'Samanta')+' · '+row.activityType+' · '+row.score+'% · '+date.toLocaleString('lv-LV')));const n=readNotes(row);card.append(E('p','Režīms: '+describeActivity(row).mode+(n.total?' · '+n.correct+'/'+n.total:'')+(n.serverVerified?' · Matemātikas atbildes pārbaudītas serverī':'')));
   for(const skill of n.skills||[])card.append(E('p',skill.skill+': '+skill.percent+'%'));
   for(const answer of n.writingAnswers||[])card.append(E('p',answer.question+'\nBērna atbilde: '+answer.answer));
   const event=pointsFor(row.studentRole).events.find(e=>e.attemptId===(row.attemptId||row.id));if(event)card.append(E('p','BP: +'+event.earned+' (meistarība '+event.mastery+', centība '+event.effort+', bonusi '+(event.dailyBonus+event.missionBonus)+')'));list.append(card);
  }if(!rows.length)list.append(E('p','Šim filtram rezultātu vēl nav.'));if(rows.length>shown)button(list,'Rādīt vēl 20',()=>{shown+=20;draw();});
 };subjectFilter.onchange=()=>{shown=20;draw();};draw();parent.append(section);
}
function renderParent(){
 const area=$('modules');area.replaceChildren();area.classList.remove('learning-active');state.day=dayKey(new Date());
 if(state.loadError)notice(area,'Daļu datu neizdevās ielādēt. Atjauno paneli pirms lēmumu pieņemšanas.');
 const overview=E('section','','module');overview.append(E('h2','Šodienas darbi'));
 for(const role of ['marks','samanta']){const points=pointsFor(role),card=E('article','','card');card.append(E('h3',role==='marks'?'Marks':'Samanta'),E('p','Šodien +'+points.todayEarned+' BP · kopā '+points.balance+' BP · '+points.crystals.length+'/3 priekšmeti'));button(card,'Atvērt bērna skatu',()=>showSchool(role));for(const task of state.tasks.filter(t=>['both',role].includes(t.assignedTo))){card.append(E('p',task.title+' — '+taskState(task,role,state.day)));}overview.append(card);}area.append(overview);
 const form=E('form','','module');form.append(E('h2','Piešķirt uzdevumu'));
 const field=(name,label,type='text')=>{const wrap=E('label',label),input=E('input');input.name=name;input.type=type;wrap.append(input);form.append(wrap);return input;};
 const title=field('title','Nosaukums');title.required=true;title.maxLength=120;const description=field('description','Īsa instrukcija');description.maxLength=500;
 const role=E('select');role.name='assigned';role.setAttribute('aria-label','Kam piešķirt');for(const [id,text] of [['marks','Markam'],['samanta','Samantai'],['both','Abiem']]){const o=E('option',text);o.value=id;role.append(o);}form.append(role);
 const moduleSelect=E('select');moduleSelect.name='module';moduleSelect.setAttribute('aria-label','Atveramā mācību tēma');form.append(moduleSelect);
 const choose=()=>{moduleSelect.replaceChildren(E('option','Ārpus lietotnes — manuāla izpilde'));moduleSelect.firstChild.value='';const modules=role.value==='both'?CATALOG.marks.filter(m=>CATALOG.samanta.some(x=>x.id===m.id)):CATALOG[role.value||'marks'];for(const m of modules){const o=E('option',m.name);o.value=m.id;moduleSelect.append(o);}};role.onchange=choose;choose();
 const startDate=field('startDate','Sākums','date');startDate.value=state.day;const dueDate=field('dueDate','Termiņš','date');dueDate.value=state.day;
 const bonusBP=field('bonusBP','Papildu BP (0–30)','number');bonusBP.min=0;bonusBP.max=30;bonusBP.value=0;
 const targetScore=field('targetScore','Mērķa rezultāts %','number');targetScore.min=0;targetScore.max=100;targetScore.value=70;
 const requiredMode=E('select');requiredMode.setAttribute('aria-label','Nepieciešamais režīms');for(const [id,label] of [['any','Jebkurš pabeigts darbs'],['exam','Patstāvīga pārbaude'],['practice','Treniņš'],['learn','Mācību posms']]){const o=E('option',label);o.value=id;requiredMode.append(o);}form.append(requiredMode);
 const daily=field('daily','Izcelts dienas uzdevums','checkbox');daily.checked=true;
 const submit=E('button','Saglabāt uzdevumu','action-button');submit.type='submit';form.append(submit);const status=notice(form,'');
 form.onsubmit=async e=>{e.preventDefault();if(dueDate.value&&dueDate.value<startDate.value){status.textContent='Termiņš nevar būt pirms sākuma.';return;}submit.disabled=true;try{const m=CATALOG[role.value==='both'?'marks':role.value].find(x=>x.id===moduleSelect.value);await createTask({title:title.value,description:description.value,assignedTo:role.value,moduleId:moduleSelect.value||null,subject:SUBJECTS.find(x=>x.id===m?.subjectId)?.name||'Vispārīgi',startDate:startDate.value,dueDate:dueDate.value||null,daily:daily.checked,bonusBP:Number(bonusBP.value),targetScore:Number(targetScore.value),requiredMode:requiredMode.value});await showSchool('vecaks');}catch(e){status.textContent=e.message;submit.disabled=false;}};area.append(form);
 const tasks=E('details','','module');tasks.open=true;tasks.append(E('summary','Uzdevumu pārvaldība'));
 for(const task of state.tasks){const card=E('article','','card');card.append(E('h3',task.title),E('p',(task.description||'')+' · '+task.assignedTo+' · '+(task.dueDate||'Bez termiņa')));button(card,'Rediģēt',async()=>{const name=prompt('Uzdevuma nosaukums',task.title);if(name===null)return;const desc=prompt('Instrukcija',task.description||'');if(desc===null)return;const due=prompt('Termiņš YYYY-MM-DD vai tukšs',task.dueDate||'');if(due===null)return;if(due&&!/^\d{4}-\d{2}-\d{2}$/.test(due)){notice(card,'Nederīgs datums.');return;}try{await editTask(task.id,{title:name.trim().slice(0,120),description:desc.slice(0,500),dueDate:due||null});await showSchool('vecaks');}catch(e){notice(card,e.message);}},'quiet-button');button(card,'Dzēst uzdevumu',async()=>{if(!confirm('Dzēst tikai uzdevumu “'+task.title+'”? Mācību rezultāti paliks.'))return;try{await removeTask(task.id);await showSchool('vecaks');}catch(e){notice(card,e.message);}},'quiet-button');tasks.append(card);}area.append(tasks);
 stopParent=renderParentPresence(area,familyIds);renderParentRewardManager(area);renderHistory(area,'vecaks');
 const analytics=E('details','','module');analytics.append(E('summary','7 dienu patstāvīgo pārbaužu pārskats'));
 for(const role of ['marks','samanta']){const rows=state.progress.filter(r=>r.studentUid===uidFor(role)&&describeActivity(r).mode==='exam'&&(r.recordedAt?.seconds||0)*1000>Date.now()-7*86400000&&!describeActivity(r).diagnostic);analytics.append(E('p',(role==='marks'?'Marks':'Samanta')+': '+rows.length+' pārbaudes'+(rows.length?' · vidēji '+Math.round(rows.reduce((s,r)=>s+r.score,0)/rows.length)+'%':'')));}area.append(analytics);
 back=()=>showSchool('vecaks');
}
async function start(){
 document.documentElement.dataset.appVersion='v3';
 $('home').onclick=()=>leave(()=>showSchool(state.view||state.role));$('back').onclick=()=>leave(()=>showSchool(state.view||state.role));
 window.addEventListener('beforeunload',e=>{if(state.dirty){e.preventDefault();e.returnValue='';}});
 window.addEventListener('popstate',()=>{history.pushState({},'',location.href);back();});history.pushState({},'',location.href);
 window.addEventListener('online',async()=>{if(state.user&&state.role!=='vecaks')try{await flushResults(state.user.uid,sendQueued);if(!state.active)await showSchool(state.view);}catch{}});
 setInterval(async()=>{if(!state.user||state.active||state.loading)return;const day=dayKey(new Date());if(day!==state.day){void showSchool(state.view);return;}if(state.role==='vecaks')return;const before=JSON.stringify([state.progress,state.tasks,spentByRole]);if(await refresh()&&!state.active&&before!==JSON.stringify([state.progress,state.tasks,spentByRole]))renderDashboard(state.view);},30000);
 const fb=await initFirebase();
 if(!fb.isConfigured){
  $('login-message').textContent='Firebase nav konfigurēts. Pārbaudi servera iestatījumus.';
  return;
 }

 let selectedLoginRole='marks';
 const roleButtons=document.querySelectorAll('.role-select-btn');
 const labelEl=$('login-password-label');
 const pwdInput=$('login-password');
 const msgEl=$('login-message');

 function updateRoleSelection(role){
  selectedLoginRole=role;
  roleButtons.forEach(btn=>{
   const active=btn.dataset.role===role;
   btn.classList.toggle('active',active);
   btn.style.borderColor=active?'#5d46d0':'#cbd5e1';
   btn.style.background=active?'#f1ecff':'#fff';
   btn.style.color=active?'#35208f':'#475569';
  });
  if(labelEl){
   if(role==='marks')labelEl.textContent='Marka parole';
   else if(role==='samanta')labelEl.textContent='Samantas parole';
   else if(role==='vecaks')labelEl.textContent='Vecāka parole';
   else labelEl.textContent='Parole';
  }
  if(msgEl)msgEl.textContent='';
  pwdInput?.focus();
 }

 roleButtons.forEach(btn=>{
  btn.onclick=()=>updateRoleSelection(btn.dataset.role);
 });

 if(pwdInput){
  pwdInput.addEventListener('input',()=>{
   if(msgEl&&msgEl.textContent)msgEl.textContent='';
  });
 }

 let isLoggingIn=false;
 $('login-form').onsubmit=async e=>{
  e.preventDefault();
  if(isLoggingIn)return;
  isLoggingIn=true;

  const submitBtn=e.currentTarget.querySelector('[type=submit]');
  submitBtn.disabled=true;
  if(pwdInput)pwdInput.disabled=true;
  submitBtn.textContent='Pārbauda...';
  if(msgEl)msgEl.textContent='';

  const passwordVal=pwdInput?pwdInput.value:'';

  try{
   const payload={password:passwordVal};
   if(selectedLoginRole&&['marks','samanta','vecaks'].includes(selectedLoginRole)){
    payload.role=selectedLoginRole;
   }

   const response=await fetch('/api/password-login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
    signal:AbortSignal.timeout(20000)
   });

   const identified=await response.json();
   if(!response.ok){
    const err=new Error(identified.error||'Neizdevās pieslēgties.');
    err.code=identified.code||(response.status===429?'auth/too-many-requests':'auth/failed');
    throw err;
   }

   await setPersistence(auth,browserLocalPersistence);
   let result;
   try{
    result=await signInWithEmailAndPassword(auth,identified.email,passwordVal);
   }catch(authErr){
    console.error('[Firebase Auth Diagnostika]',{
     code:authErr.code||'UNKNOWN',
     time:new Date().toISOString()
    });
    if(authErr.code==='auth/too-many-requests'){
     throw Object.assign(new Error('Pārāk daudz neveiksmīgu mēģinājumu. Drošības nolūkos Firebase uz laiku ir ierobežojis pieteikšanos šim kontam. Lūdzu, uzgaidi 10–15 minūtes.'),{code:authErr.code});
    }
    if(authErr.code==='auth/invalid-credential'||authErr.code==='auth/wrong-password'){
     throw Object.assign(new Error('Nepareiza parole.'),{code:authErr.code});
    }
    throw authErr;
   }

   const p=await getUserProfile(result.user.uid);
   if(!p?.approved||p.role!==identified.role){
    await signOut(auth);
    throw Object.assign(new Error('Konts nav apstiprināts vai neatbilst izvēlētajai lomai.'),{code:'auth/unapproved'});
   }

   if(pwdInput)pwdInput.value='';
  }catch(err){
   console.error('[Login Kļūda]',{
    code:err.code||'UNKNOWN',
    role:selectedLoginRole,
    time:new Date().toISOString()
   });
   if(msgEl){
    msgEl.textContent=err.message||'Neizdevās pieslēgties.';
   }
  }finally{
   isLoggingIn=false;
   submitBtn.disabled=false;
   if(pwdInput)pwdInput.disabled=false;
   submitBtn.textContent='Pieslēgties';
  }
 };

 onAuthStateChanged(auth,async user=>{
  stopPresence?.();stopPresence=null;guide?.stop();guide=null;state.user=user;state.role=null;
  if(!user){welcome();return;}
  try{
   const profile=await getUserProfile(user.uid);
   if(!profile?.approved||!['marks','samanta','vecaks'].includes(profile.role)){
    await signOut(auth);return;
   }
   state.role=profile.role;
   await showSchool(profile.role);
   if(profile.role!=='vecaks'){
    stopPresence=startChildPresence({role:profile.role,uid:user.uid,activity:()=>currentActivity});
    guide=installChildGuide({role:profile.role,getSubject:()=>currentActivity});
   }
  }catch(e){
   if($('login-message'))$('login-message').textContent='Neizdevās ielādēt kontu: '+e.message;
   welcome();
  }
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void start());else void start();
