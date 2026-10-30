import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {NEW_WORDS} from '../src/marks-english.js';
import {UNIT1_DAYS,UNIT1_MOCK,UNIT1_RUBRIC,UNIT1_DAY2,UNIT1_DAY3,UNIT1_DAY4,
  unit1AutoTotal,unit1DailyCanBonus,unit1MissionId,unit1TopicId,
  isUnit1Correct,scoreUnit1} from '../src/marks-unit1-data.js';
import {renderMarksUnit1Mission} from '../src/marks-unit1-mission.js';
import {CHILD_UIDS,calculateChildPoints} from '../src/learning-policy.js';

const setup=()=>{
 const {document,window}=parseHTML('<html><head></head><body><div id="root"></div></body></html>');
 globalThis.document=document;globalThis.window=window;
 return {root:document.getElementById('root'),document,window};
};

test('five daily missions and authentic 52-point rubric with 43 objective points',()=>{
 assert.deepEqual(UNIT1_DAYS.map(d=>d.date),[
  '2026-10-30','2026-10-31','2026-11-01','2026-11-02','2026-11-03']);
 assert.equal(NEW_WORDS.length,15);
 assert.equal(UNIT1_DAY2.length,10);
 assert.equal(UNIT1_DAY3.length,12);
 assert.equal(UNIT1_DAY4.length,12);
 assert.equal(unit1AutoTotal,43);
 assert.equal(UNIT1_RUBRIC.reduce((a,b)=>a+b.points,0),52);
 assert.equal(UNIT1_RUBRIC.at(-1).points,9);
 assert.equal(UNIT1_RUBRIC.at(-1).manual,true);
 assert.deepEqual(UNIT1_MOCK.map(s=>s.max),[3.5,4,8,3.5,4,8,6,6]);
 for(const section of UNIT1_MOCK){
  assert.equal(section.items.reduce((n,q)=>n+q.points,0),section.max);
  assert.equal(new Set(section.items.map(q=>q.id)).size,section.items.length);
 }
});

test('answers are checked by meaning and accepted contractions, not by position',()=>{
 assert.equal(isUnit1Correct({answer:'She is not American.',accepted:["She isn't American."]},"She isn't American."),true);
 assert.equal(isUnit1Correct({answer:'Latvian'},'LATVIAN'),true);
 const bank=UNIT1_DAY3.slice(0,3);
 const valid={be1:'am',be2:'are',be3:'is'};
 assert.deepEqual(scoreUnit1(bank,valid),{earned:3,max:3,percent:100});
 assert.equal(scoreUnit1(bank,{be1:'is',be2:'are',be3:'are'}).percent,33);
});

test('bonus only on or after scheduled date, before NPD, and writing is required on day five',()=>{
 assert.equal(unit1DailyCanBonus('2026-11-01','2026-10-31',100,0),false);
 assert.equal(unit1DailyCanBonus('2026-10-30','2026-11-03',80,0),true);
 assert.equal(unit1DailyCanBonus('2026-10-30','2026-11-04',100,0),false);
 assert.equal(unit1DailyCanBonus('2026-11-03','2026-11-03',90,6),false);
 assert.equal(unit1DailyCanBonus('2026-11-03','2026-11-03',90,7),true);
});

test('Mark earns five +10 BP bonuses only once each, no bonus before release or after deadline',()=>{
 const make=(date,id,score=90,mode='exam',completedDate=date,hasWriting=true)=>({
  id,studentRole:'marks',studentUid:CHILD_UIDS.marks,subject:'Angļu valoda',subjectId:'english',
  topicId:unit1TopicId(date),activityType:'Unit 1 · '+date+' · '+mode,mode,score,
  completedAt:completedDate+'T11:00:00+02:00',
  notes:JSON.stringify({mode,missionId:unit1MissionId(date),
   writingSentences:hasWriting?Array.from({length:7},(_,i)=>'English sentence '+i+'.'):[]})
 });
 const date='2026-11-03';
 const dates=UNIT1_DAYS.map(d=>d.date);
 const p=calculateChildPoints('marks',[
  ...dates.map((d,i)=>make(d,'a'+i,90,'exam',date)),
  ...dates.map((d,i)=>make(d,'b'+i,95,'exam',date))
 ],new Date('2026-11-03T12:00:00+02:00'));
 assert.equal(p.events.reduce((sum,e)=>sum+e.missionBonus,0),50);
 const bad=calculateChildPoints('marks',[
  make(dates[3],'early',100,'exam',dates[0]),
  make(dates[0],'late',100,'exam','2026-11-04'),
  make(dates[4],'no-writing',100,'exam',date,false),
  make(dates[2],'practice',100,'practice',date)
 ],new Date('2026-11-04T12:00:00+02:00'));
 assert.equal(bad.events.reduce((sum,e)=>sum+e.missionBonus,0),0);
});

test('the interactive day-one mission saves a real score with day-specific mission identifier',async()=>{
 const {root}=setup();
 let saved;
 renderMarksUnit1Mission(root,{
  today:'2026-10-30',
  saveProgress:async data=>{saved=data;return 'saved';},
  onCheckpoint:()=>{}
 });
 assert.equal(root.querySelectorAll('.unit1-day-card').length,5);
 const first=[...root.querySelectorAll('.unit1-day-card button')][0];
 first.click();
 assert.ok(root.textContent.includes('Vārdu medības'));
 assert.equal(root.querySelectorAll('.unit1-flashcard').length,15);
 const start=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('sākt patstāvīgo'));
 start.click();
 assert.ok(root.textContent.includes('Jautājums 1'));
 for(let i=0;i<15;i++){
  const question=NEW_WORDS[i];
  const input=root.querySelector('.unit1-answer');
  assert.ok(input);
  input.value=question.en;
  input.oninput();
  const next=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('Nākamais →'));
  if(i<14)next.click();
 }
 const send=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('Pabeigt un saglabāt'));
 send.click();
 await Promise.resolve();
 await Promise.resolve();
 assert.ok(saved);
 assert.equal(saved.subjectId,'english');
 assert.equal(saved.topicId,'unit1-day-2026-10-30');
 assert.equal(saved.score,100);
 assert.equal(JSON.parse(saved.notes).missionId,'unit1-2026-10-30');
});
