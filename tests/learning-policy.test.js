import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateChildPoints,CHILD_UIDS,dayKey,rigaDayStart,rigaDayEnd,describeActivity,calculatePracticePoints} from '../src/learning-policy.js';
import {taskStatus,taskState,qualifiesTask} from '../src/catalog.js';
const now=new Date('2026-10-14T10:00:00Z');
const row=(id,subject='Matemātika',activityType='multiply · practice',score=100,notes={})=>({id,studentUid:CHILD_UIDS.marks,studentRole:'marks',subject,activityType,score,recordedAt:{seconds:now.getTime()/1000},notes:JSON.stringify(notes)});
test('baseline and single-click legacy drill cannot earn BP',()=>assert.equal(calculateChildPoints('marks',[row('baseline','Sākuma diagnostika','starta-misija-v1'),row('click','Matemātika','Reizrēķins')],now).balance,0));
test('learning and exam share one topic and only the exam grants mastery',()=>{const p=calculateChildPoints('marks',[row('a','Matemātika','multiply · learn'),row('b','Matemātika','multiply · exam')],now);assert.equal(p.balance,20);assert.equal(p.events[0].mastery,0);assert.equal(p.events[1].effort,0);});
test('same-day repeats cannot farm effort or mastery; daily totals agree',()=>{const p=calculateChildPoints('marks',Array.from({length:70},(_,i)=>row('r'+i)),now);assert.equal(p.balance,20);assert.equal(p.todayEarned,p.balance);});
test('foreign UID and duplicate attempt IDs are ignored',()=>{const good=row('a');assert.equal(calculateChildPoints('marks',[good,good,{...row('b'),studentUid:'other'}],now).balance,20);});
test('literature counts as language and third subject grants bonus once',()=>{const p=calculateChildPoints('marks',[row('a','Literatūra','Dzejas superizaicinājums · Rainis un Kronbergs'),row('b'),row('c','Angļu valoda','days · exam'),row('d','Angļu valoda','months · exam')],now);assert.deepEqual(new Set(p.crystals),new Set(['language','math','english']));assert.equal(p.events.reduce((n,e)=>n+e.dailyBonus,0),10);assert.equal(p.events.reduce((n,e)=>n+e.effort,0),6);});
test('special bonus is once per history, not once per retake',()=>{const p=calculateChildPoints('marks',[row('a','Literatūra','Dzejas superizaicinājums · Rainis un Kronbergs'),row('b','Literatūra','Dzejas superizaicinājums · Rainis un Kronbergs')],now);assert.equal(p.events.reduce((n,e)=>n+e.missionBonus,0),15);});
test('assigned bonus is bounded and awarded only once per task',()=>{const a={...row('a'),taskId:'task',taskQualified:true,taskBonus:12};const p=calculateChildPoints('marks',[a,{...a,id:'b'}],now);assert.equal(p.events.reduce((n,e)=>n+e.assignedBonus,0),12);});
test('shared tasks have independent child completion',()=>{const t={assignedTo:'both',status:'completed',completions:{marks:{status:'completed'}}};assert.equal(taskStatus(t,'marks'),'completed');assert.equal(taskStatus(t,'samanta'),'pending');assert.equal(taskState({...t,dueDate:'2026-10-13'},'samanta','2026-10-14'),'expired');});
test('task qualification requires module, mode, threshold and dates',()=>{const t={moduleId:'matematika',requiredMode:'exam',targetScore:70,startDate:'2026-10-14',dueDate:'2026-10-14'};assert.equal(qualifiesTask(t,{moduleId:'matematika',score:80},'exam','2026-10-14'),true);assert.equal(qualifiesTask(t,{moduleId:'matematika',score:80},'learn','2026-10-14'),false);assert.equal(qualifiesTask(t,{moduleId:'matematika',score:80},'exam','2026-10-15'),false);});
test('Riga date boundaries and invalid percentage',()=>{assert.equal(dayKey(new Date('2026-10-13T21:30:00Z')),'2026-10-14');assert.throws(()=>calculatePracticePoints({correct:17,total:16}));});

test('Riga deadline bounds account for DST changes',()=>{assert.equal(rigaDayStart('2026-10-14').toISOString(),'2026-10-13T21:00:00.000Z');assert.equal(rigaDayStart('2026-10-25').toISOString(),'2026-10-24T21:00:00.000Z');assert.equal(rigaDayEnd('2026-10-25').toISOString(),'2026-10-25T21:59:59.999Z');});

test('three October missions award distinct bonus amounts only once',()=>{
 const lit=row('lit','Literatūra','Dzejas superizaicinājums · Rainis un Kronbergs',90,{mode:'exam'});
 const lv=row('lv','Latviešu valoda','Vārda sastāvs un vārddarināšana · exam',90,{topicId:'morfemas',mode:'exam'});
 const math=row('math','Matemātika','family · exam',80,{topicId:'family',mode:'exam'});
 const p=calculateChildPoints('marks',[lit,lv,math,{...lit,id:'lit2'},{...lv,id:'lv2'},{...math,id:'math2'}],now);
 assert.equal(p.events.reduce((sum,event)=>sum+event.missionBonus,0),35);
 assert.deepEqual(p.events.slice(0,3).map(event=>event.missionBonus),[15,15,5]);
});
test('October special bonuses require independent mode and minimum result',()=>{
 const lv=row('lv','Latviešu valoda','Vārda sastāvs un vārddarināšana · learn',100,{topicId:'morfemas',mode:'learn'});
 const math=row('math','Matemātika','family · exam',79,{topicId:'family',mode:'exam'});
 const p=calculateChildPoints('marks',[lv,math],now);
 assert.equal(p.events.reduce((sum,event)=>sum+event.missionBonus,0),0);
});
