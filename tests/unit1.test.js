import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {NEW_WORDS} from '../src/marks-english.js';
import {UNIT1_DAYS,UNIT1_MOCK,UNIT1_RUBRIC,UNIT1_DAY2,UNIT1_DAY3,UNIT1_DAY4,
  unit1AutoTotal,unit1DailyCanBonus,unit1MissionId,unit1TopicId,
  isUnit1Correct,scoreUnit1} from '../src/marks-unit1-data.js';
import {renderMarksUnit1Mission} from '../src/marks-unit1-mission.js';
import {CHILD_UIDS,calculateChildPoints} from '../src/learning-policy.js';
import {dailyTrainingQuestions,dailyExamQuestions,dailyReadiness,UNIT1_TRAINING_BANK} from '../src/marks-unit1-training.js';

const setup=()=>{
 const {document,window}=parseHTML('<html><head></head><body><div id="root"></div></body></html>');
 globalThis.document=document;globalThis.window=window;
 return {root:document.getElementById('root'),document,window};
};

test('five daily missions and authentic 52-point rubric with 43 objective points',()=>{
 assert.deepEqual(UNIT1_DAYS.map(d=>d.date),[
  '2026-10-30','2026-10-31','2026-11-01','2026-11-02','2026-11-03']);
 assert.equal(NEW_WORDS.length,15);
 assert.equal(UNIT1_DAY2.length,20);
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
 assert.equal(unit1DailyCanBonus('2026-11-03','2026-11-03',90,7,34),false);
 assert.equal(unit1DailyCanBonus('2026-11-03','2026-11-03',90,7,49),true);
});

test('Mark earns five +10 BP bonuses only once each, no bonus before release or after deadline',()=>{
 const make=(date,id,score=90,mode='exam',completedDate=date,hasWriting=true)=>({
  id,studentRole:'marks',studentUid:CHILD_UIDS.marks,subject:'Angļu valoda',subjectId:'english',
  topicId:unit1TopicId(date),activityType:'Unit 1 · '+date+' · '+mode,mode,score,
  completedAt:completedDate+'T11:00:00+02:00',
  notes:JSON.stringify({mode,missionId:unit1MissionId(date),
   writingSentences:hasWriting?Array.from({length:7},(_,i)=>'My favourite English sentence is number '+i+'.'):[],writingWordCount:hasWriting?49:0})
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

test('training is extensive, cumulative and daily NPD covers more than the new topic',()=>{
 const sizes=UNIT1_DAYS.map(d=>dailyTrainingQuestions(d.date).length);
 const exam=UNIT1_DAYS.map(d=>dailyExamQuestions(d.date,NEW_WORDS,UNIT1_DAY2,UNIT1_DAY3,UNIT1_DAY4,UNIT1_MOCK));
 assert.deepEqual(sizes,[53,98,105,128,128]);
 assert.deepEqual(exam.map(a=>a.length),[30,39,33,43,50]);
 assert.deepEqual(UNIT1_DAYS.map((d,i)=>[d.date,exam[i].length]),[
  ['2026-10-30',30],['2026-10-31',39],['2026-11-01',33],['2026-11-02',43],['2026-11-03',50]]);
 for(let i=0;i<5;i++){
  assert.equal(new Set(exam[i].map(q=>q.id)).size,exam[i].length);
  assert.equal(new Set(dailyTrainingQuestions(UNIT1_DAYS[i].date).map(q=>q.id)).size,sizes[i]);
 }
 assert.equal(Object.values(UNIT1_TRAINING_BANK).flat().length,128);
 assert.equal(dailyReadiness(84),'almost');
 assert.equal(dailyReadiness(85),'ready');
});


test('spelling gap tasks reconstruct the exact word and are available on NPD eve',()=>{
 const gaps=UNIT1_TRAINING_BANK.spelling;
 const fromMemory=UNIT1_TRAINING_BANK.spellingFull;
 assert.equal(gaps.length,35);
 assert.equal(fromMemory.length,8);
 for(const q of gaps){
  assert.equal(q.spellingMask.length,q.spellingWord.length,q.id);
  let missing='';
  for(let i=0;i<q.spellingMask.length;i++){
   if(q.spellingMask[i]==='_')missing+=q.spellingWord[i];
   else assert.equal(q.spellingMask[i],q.spellingWord[i],q.id);
  }
  assert.equal(q.answer,missing,q.id);
  assert.ok(isUnit1Correct(q,missing),q.id);
  assert.ok(!isUnit1Correct(q,'WRONG'),q.id);
 }
 assert.ok(gaps.some(q=>q.spellingWord==='games console'));
 assert.ok(gaps.some(q=>q.spellingWord==='the UK'));
 assert.ok(fromMemory.some(q=>q.answer==='a games console'));
 assert.ok(fromMemory.every(q=>q.options===null));
 for(const date of ['2026-11-02','2026-11-03']){
  const training=dailyTrainingQuestions(date);
  assert.ok(training.some(q=>q.id.startsWith('train-spell-')),date);
  assert.ok(training.some(q=>q.id.startsWith('train-spell-full-')),date);
 }
 assert.equal(UNIT1_MOCK.find(s=>s.key==='nationalities').items.length,7);
 assert.equal(UNIT1_MOCK.find(s=>s.key==='nationalities').max,3.5);
});

test('spelling shortcut opens keyboard and accepts tapped missing letters',()=>{
 const {root}=setup();
 let checkpoint;
 renderMarksUnit1Mission(root,{today:'2026-11-03',onCheckpoint:state=>{checkpoint=state;}});
 const day=[...root.querySelectorAll('.unit1-day-card')].at(-1);
 assert.ok(day);
 const shortcut=[...day.querySelectorAll('button')].find(x=>x.textContent.includes('Trenēt vārdu rakstību'));
 assert.ok(shortcut);
 shortcut.click();
 assert.equal(checkpoint.phase,'practice');
 const q=UNIT1_TRAINING_BANK.spelling[0];
 const field=root.querySelector('.unit1-exam-card input');
 assert.ok(field);
 assert.equal(field.getAttribute('autocomplete'),'off');
 assert.equal(field.getAttribute('inputmode'),'none');
 assert.equal(field.hasAttribute('readonly'),true,'Spelling must not accept dictated/pasted text');
 assert.equal(root.querySelectorAll('.unit1-letter-key').length,28);
 for(const ch of q.answer){
  const key=[...root.querySelectorAll('.unit1-letter-key')].find(x=>x.textContent===ch.toUpperCase());
  assert.ok(key,ch);
  key.click();
 }
 assert.equal(checkpoint.practiceAnswers[q.id],q.answer);
 field.onkeydown({key:'Backspace',preventDefault(){}});
 assert.equal(checkpoint.practiceAnswers[q.id],q.answer.slice(0,-1));
 field.onkeydown({key:q.answer.slice(-1),preventDefault(){}});
 assert.equal(checkpoint.practiceAnswers[q.id],q.answer);
 const check=[...root.querySelectorAll('button')].find(b=>b.textContent==='Pārbaudīt atbildi');
 check.click();
 assert.ok(root.textContent.includes('Pilnais vārds: '+q.spellingWord));
});

test('the guided practice explains mistakes, then day-one NPD independently checks 30 answers and saves bonus',async()=>{
 const {root}=setup();
 let saved;
 let checkpoint;
 renderMarksUnit1Mission(root,{
  today:'2026-10-30',
  saveProgress:async data=>{saved=data;return 'saved';},
  onCheckpoint:data=>{checkpoint=data;}
 });
 assert.equal(root.querySelectorAll('.unit1-day-card').length,5);
 const first=root.querySelector('.unit1-day-card button');
 first.click();
 assert.ok(root.textContent.includes('Vārdu medības'));
 assert.equal(root.querySelectorAll('.unit1-flashcard').length,15);
 const practice=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('Trenēties · 53'));
 assert.ok(practice);
 practice.click();
 assert.ok(root.textContent.includes('Treniņu trase'));
 const check=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('Pārbaudīt atbildi'));
 assert.ok(check);
 check.click();
 assert.ok(root.textContent.includes('Pamēģini vēlreiz'));
 assert.equal(checkpoint.phase,'practice');
 const npd=[...root.querySelectorAll('button')].find(b=>b.textContent.includes('Kārtot dienas NPD'));
 npd.click();
 assert.equal(checkpoint.phase,'exam');
 const bank=dailyExamQuestions('2026-10-30',NEW_WORDS,UNIT1_DAY2,UNIT1_DAY3,UNIT1_DAY4,UNIT1_MOCK);
 for(let group=0;group<Math.ceil(bank.length/4);group++){
  const questions=bank.slice(group*4,group*4+4);
  const blocks=[...root.querySelectorAll('.unit1-question')];
  assert.equal(blocks.length,questions.length);
  for(let i=0;i<questions.length;i++){
   const q=questions[i],block=blocks[i];
   const input=block.querySelector('input');
   if(input){input.value=q.answer;input.oninput();}
   else{
    const choice=[...block.querySelectorAll('button')].find(b=>b.textContent===q.answer);
    assert.ok(choice,'Missing correct choice for '+q.id);
    choice.click();
   }
  }
  if(group<Math.ceil(bank.length/4)-1){
   const next=[...root.querySelectorAll('button')].find(b=>b.textContent==='Nākamais →');
   assert.ok(next);next.click();
  }
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
 assert.ok(root.textContent.includes('85%'));
 assert.ok(root.textContent.includes('Kļūdu')===false);
});
