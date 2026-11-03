test('Completed basics survive reopening and Samanta can read in short sections',()=>{
 const root=setup();renderDailyFoundations(root,{role:'samanta',today:'2026-11-03',initialPart:'language',completedToday:{math:{score:88},language:{score:100}}});
 assert.ok(root.textContent.includes('100%'));
 press(root,'Lasīt pa teikumiem');
 assert.ok(root.textContent.includes('Grūtā vārda zilbes'));
 press(root,'Visas dienas misijas');
 assert.ok(root.textContent.includes('Pabeigts · 88%'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {getDailyFoundations,foundationScore,foundationWeekId,validFoundationDate,FOUNDATION_PARTS} from '../src/daily-foundations-data.js';
import {renderDailyFoundations} from '../src/daily-foundations.js';

const setup=()=>{const {document,window}=parseHTML('<html><body><div id="root"></div></body></html>');
 globalThis.document=document;globalThis.window=window;return document.getElementById('root');};
const press=(root,needle)=>{
 const found=[...root.querySelectorAll('button')].find(b=>b.textContent.includes(needle));
 assert.ok(found,'Button missing: '+needle);found.click();return found;
};
test('Daily foundations are deterministic and all math/word-problem answers are valid',()=>{
 assert.deepEqual(FOUNDATION_PARTS,['math','language','nut']);
 assert.equal(validFoundationDate('2026-02-30'),false);
 for(const role of ['marks','samanta'])for(let day=1;day<=28;day++){
  const date='2026-11-'+String(day).padStart(2,'0'),a=getDailyFoundations(role,date),b=getDailyFoundations(role,date);
  assert.deepEqual(a,b);
  assert.equal(a.math.length,8);
  for(const q of a.math)assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=100,q.prompt);
  assert.equal(new Set(a.math.map(q=>q.id)).size,8);
  const all=Object.fromEntries(a.math.map(q=>[q.id,String(q.answer)]));
  assert.deepEqual(foundationScore('math',a,all),{correct:8,total:8});
  const correct=Object.fromEntries(a.language.questions.map(q=>[q.id,q.answer]));
  assert.deepEqual(foundationScore('language',a,correct),{correct:4,total:4});
  assert.ok(a.nut.answer>=0);
  const nut={facts:a.nut.needed,question:a.nut.question,firstOperation:'multiply',firstAnswer:a.nut.firstAnswer,secondOperation:'subtract',answer:a.nut.answer};
  assert.deepEqual(foundationScore('nut',a,nut),{correct:6,total:6});
  assert.equal(foundationScore('nut',a,{...nut,facts:a.nut.facts.map(f=>f.id)}).correct,5);
  assert.ok(a.nut.story.includes(String(a.nut.facts[3].value)));
 }
 assert.equal(foundationWeekId('2026-11-03'),foundationWeekId('2026-11-04'));
});
test('Students can start daily reading and save a separate language result',async()=>{
 const root=setup();let payload,checkpoint;
 renderDailyFoundations(root,{role:'samanta',today:'2026-11-03',onCheckpoint:s=>{checkpoint=s;},saveProgress:async data=>{payload=data;return 'saved';}});
 assert.equal(root.querySelectorAll('.db-tile').length,3);
 const first=root.querySelector('.db-tile');press(first,'Sākt →');
 const data=getDailyFoundations('samanta','2026-11-03');
 for(const q of data.language.questions){if(q.options)press(root,q.answer);else{const input=root.querySelector('#basic-'+q.id);input.value=q.answer;input.oninput();}}
 press(root,'Pārbaudīt lasīšanu');await Promise.resolve();await Promise.resolve();await Promise.resolve();
 assert.equal(payload.subjectId,'language');assert.equal(payload.score,100);
 assert.equal(JSON.parse(payload.notes).dailyFoundationDate,'2026-11-03');
 assert.equal(checkpoint.part,'language');
 assert.ok(data.language.text.length<getDailyFoundations('marks','2026-11-03').language.text.length);
});
test('Math saves independent score under a week-scoped topic, not an unlimited daily bonus',async()=>{
 const root=setup(),mission=getDailyFoundations('marks','2026-11-03');let payload;
 renderDailyFoundations(root,{role:'marks',today:'2026-11-03',initialPart:'math',saveProgress:async data=>{payload=data;return 'ok';}});
 for(const q of mission.math){const input=root.querySelector('#basic-'+q.id);assert.ok(input,q.id);input.value=q.answer;input.oninput();}
 press(root,'Pārbaudīt visus 8');
 await Promise.resolve();await Promise.resolve();await Promise.resolve();
 assert.equal(payload.score,100);
 assert.equal(payload.subjectId,'math');
 assert.equal(payload.topicId,'daily-basics-math-week-'+foundationWeekId('2026-11-03'));
 assert.ok(root.textContent.includes('100%'));
});
test('Nut is an interactive sequence; a corrected mistake does not award first-try points',async()=>{
 const root=setup(),data=getDailyFoundations('samanta','2026-11-03');let payload;
 renderDailyFoundations(root,{role:'samanta',today:'2026-11-03',initialPart:'nut',saveProgress:async data=>{payload=data;return 'ok';}});
 press(root,'Pārbaudīt šo soli');assert.ok(root.textContent.includes('Vēl nav pareizi'));
 for(const f of data.nut.facts.filter(f=>data.nut.needed.includes(f.id))){
  const btn=[...root.querySelectorAll('.db-choice')].find(b=>b.textContent.includes(f.label));
  assert.ok(btn,f.label);btn.click();
 }
 press(root,'Pārbaudīt šo soli');assert.ok(root.textContent.includes('Solis 2'));
 press(root,data.nut.question);press(root,'Pārbaudīt šo soli');
 press(root,'Reizināt');press(root,'Pārbaudīt šo soli');
 let field=root.querySelector('#basic-firstAnswer');field.value=String(data.nut.firstAnswer);field.oninput();press(root,'Pārbaudīt šo soli');
 press(root,'Atņemt');press(root,'Pārbaudīt šo soli');
 field=root.querySelector('#basic-answer');field.value=String(data.nut.answer);field.oninput();press(root,'Pārbaudīt šo soli');
 await Promise.resolve();await Promise.resolve();await Promise.resolve();
 assert.equal(payload.score,83);
 assert.equal(payload.subjectId,'math');
 assert.equal(JSON.parse(payload.notes).dailyFoundationPart,'nut');
 assert.ok(root.textContent.includes('Pārbaudīt skaidrojumu ar MI'));
});
