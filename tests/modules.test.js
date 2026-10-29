import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {renderSamantaLatvian,makeSamantaLatvianBank} from '../src/samanta-latvian.js';
import {renderSamantaEnglish} from '../src/samanta-english.js';
import {renderMarksMath} from '../src/marks-math.js';
import {renderSamantaAdditionGame,makeAdditionChallengeBank} from '../src/samanta-sum-game.js';
import {renderSamantaNature,NATURE_QUESTIONS,NATURE_THEORY} from '../src/samanta-nature.js';
import {renderMarksEnglish,NEW_WORDS,WORKSHEET_TASKS,isCorrectEnglishAnswer} from '../src/marks-english.js';
import {renderMarksSocialStudies,SOCIAL_TOPICS,GOLDEN_BONUSES_DATA} from '../src/marks-social-studies.js';
import {renderPronounLab,CASES_LIST,PRONOUN_TABLES,SENTENCE_EXERCISES} from '../src/latvian-pronouns.js';
import {renderMarksNatureNPD,NPD_14_CRITERIA,NATURE_4TH_THEORY,NPD_QUESTIONS} from '../src/marks-nature-npd.js';
import {renderLatvianSchool} from '../src/latvian-school.js';
import {queueResult,flushResults,pendingResults} from '../src/progress-outbox.js';
function setup(){const {document,window}=parseHTML('<html><body><div id="root"></div></body></html>');globalThis.document=document;globalThis.window=window;globalThis.localStorage={data:new Map(),getItem(k){return this.data.get(k)||null},setItem(k,v){this.data.set(k,v)}};return document.querySelector('#root');}
const click=(r,pattern)=>{const b=[...r.querySelectorAll('button')].find(x=>typeof pattern==='string'?x.textContent===pattern:pattern.test(x.textContent));assert.ok(b,'Missing button '+pattern);b.click();return b;};
test('syllable presentation cannot count a reading answer twice',async()=>{
 const r=setup(),saved=[];renderSamantaLatvian(r,{canSubmit:true,saveProgress:async d=>{saved.push(d);return 'saved';}});click(r,/Vieglā lasīšana/);click(r,'🏆 Pārbaudu sevi · 16');
 const bank=makeSamantaLatvianBank();const answer=()=>{const text=r.querySelector('.reading-prompt').textContent.replaceAll('·','').replaceAll('\n','');const q=bank.find(q=>[q.prompt,q.syllablesText.replaceAll('-','')].some(t=>t.replaceAll('\n','')===text));assert.ok(q);click(r,q.answer);};
 answer();click(r,/Zilbju režīms/);answer();for(let i=0;i<16;i++){click(r,'Nākamais uzdevums →');if(i<15)answer();}await Promise.resolve();assert.equal(saved.length,1);assert.equal(saved[0].score,100);assert.ok(r.textContent.includes('16 no 16'));
});
test('order-of-operations choices have labels and clicking them never throws',()=>{
 const r=setup();renderMarksMath(r);click(r,/Saistītais pieraksts/);click(r,'🌱 Mācos · 8');const buttons=[...r.querySelectorAll('.order-choice-btn')];assert.equal(buttons.length,2);assert.ok(buttons.every(b=>b.textContent!=='order-choice-btn'));buttons.forEach(b=>b.onclick());assert.ok(r.querySelector('.order-step-form'));
});
test('English exam contains no answer in pronunciation control',()=>{const r=setup();renderSamantaEnglish(r);click(r,/Krāsas/);click(r,/Pārbaudu sevi/);for(const b of r.querySelectorAll('.reading-listen'))assert.equal(b.textContent,'🔊 Klausīties izrunu');assert.ok(!r.querySelector('.english-target-word')?.textContent?.startsWith('“'));});
test('all 42 addition bank answers are arithmetically correct and within 100',()=>{const bank=makeAdditionChallengeBank();assert.equal(bank.length,42);for(const q of bank){assert.equal(q.answer,q.a+q.b);assert.ok(q.answer<=100);}});
test('leaving mini-game cancels old navigation timer',()=>{
 const r=setup(),native=globalThis.setTimeout,nativeClear=globalThis.clearTimeout;const timers=new Map();let n=0;globalThis.setTimeout=fn=>{timers.set(++n,fn);return n};globalThis.clearTimeout=id=>timers.delete(id);
 try{renderSamantaAdditionGame(r);click(r,/4. Mini-spēle/);const target=+r.querySelector('.math-expression').textContent.match(/\d+/)[0],buttons=[...r.querySelectorAll('.pearl-button')];let pair;for(let i=0;i<buttons.length;i++)for(let j=i+1;j<buttons.length;j++)if(+buttons[i].textContent + +buttons[j].textContent===target)pair=[buttons[i],buttons[j]];pair.forEach(b=>b.click());click(r,/Atpakaļ uz sākumu/);for(const fn of timers.values())fn();assert.equal(r.querySelector('h2').textContent,'Saskaitīšanas pērles 🌸');}finally{globalThis.setTimeout=native;globalThis.clearTimeout=nativeClear;}
});
test('outbox retains a failed result and retries the same ID exactly once',async()=>{setup();const row=queueResult('uid',{score:100});await assert.rejects(flushResults('uid',async()=>{throw Error('offline')}));assert.equal(pendingResults('uid')[0].attemptId,row.attemptId);await flushResults('uid',async d=>d.attemptId);assert.equal(pendingResults('uid').length,0);});
test('Samanta 3rd grade nature NPD contains 10 core questions, 5 golden bonuses and mounts cleanly',()=>{
 assert.equal(NATURE_QUESTIONS.length,15);
 const core=NATURE_QUESTIONS.filter(q=>!q.isBonus);
 const bonus=NATURE_QUESTIONS.filter(q=>q.isBonus);
 assert.equal(core.length,10);
 assert.equal(bonus.length,5);
 for(const q of NATURE_QUESTIONS){
  assert.ok(q.prompt&&q.prompt.length>10);
  assert.equal(q.options.length,3);
  assert.ok(q.options.includes(q.answer));
  assert.ok(q.explanation&&q.explanation.length>10);
 }
 assert.equal(NATURE_THEORY.layers.length,5);
 assert.equal(NATURE_THEORY.matrix.length,4);
 assert.equal(NATURE_THEORY.foodChains.length,4);
 const r=setup();
 const mod=renderSamantaNature(r,{canSubmit:true});
 assert.ok(r.querySelector('.samanta-nature-app'));
 assert.ok(r.querySelector('.voice-reader-bar'));
 mod.cleanup?.();
});
test('Mark English module contains 15 vocabulary items and covers SR questions with am/is/are',()=>{
 assert.equal(NEW_WORDS.length,15);
 const expected=['a bag','a guitar','a phone','trainers','a basketball','headphones','a skateboard','a T-shirt','a bike','jeans','sunglasses','a watch','a games console','a laptop','a sweater'];
 for(const word of expected){
  assert.ok(NEW_WORDS.some(w=>w.en===word),'Missing expected vocabulary word: '+word);
 }
 const plurals=NEW_WORDS.filter(w=>w.plural).map(w=>w.en);
 assert.deepEqual(plurals.sort(),['headphones','jeans','sunglasses','trainers'].sort());
 assert.equal(WORKSHEET_TASKS.task1.length,10);
 assert.equal(WORKSHEET_TASKS.task2.length,8);
 assert.equal(WORKSHEET_TASKS.task3.length,6);
 assert.equal(WORKSHEET_TASKS.task4.length,6);
 assert.ok(isCorrectEnglishAnswer({a:'Is it a laptop?'},'Is it a laptop?'));
 assert.ok(isCorrectEnglishAnswer({a:'Is it a laptop?'},'is it a laptop'));
 assert.ok(isCorrectEnglishAnswer({a:'No, it isn\'t.'},'No, it isn\'t'));
 assert.ok(isCorrectEnglishAnswer({a:'No, it isn\'t.'},'No, it isn’t'));
 const r=setup();
 renderMarksEnglish(r,{canSubmit:true,initialTopic:'worksheet'});
 assert.ok(r.querySelector('.marks-english'));
 assert.ok(r.querySelector('.english-sr-banner'));
 assert.ok(r.textContent.includes('Protu veidot jautājumus ar - am/is/are'));
 click(r,/15 Jaunie vārdi/);
 assert.equal(r.querySelectorAll('.vocab-card').length,15);
 click(r,/Drukājamā darba lapa/);
 assert.ok(r.querySelector('.print-worksheet-sheet'));
 assert.ok(r.querySelector('.print-worksheet-sheet').textContent.includes('Skolēna vārds: Marks'));
});
test('Mark Social Studies module covers 8 SR blocks and 5 golden bonuses cleanly',()=>{
 assert.equal(SOCIAL_TOPICS.length,9);
 assert.equal(GOLDEN_BONUSES_DATA.length,5);
 const r=setup();
 renderMarksSocialStudies(r,{canSubmit:true});
 assert.ok(r.querySelector('.marks-social-studies'));
 assert.ok(r.textContent.includes('Kā plānot un patērēt resursus saprātīgi?'));
 assert.ok(r.textContent.includes('43 p.'));
 click(r,/8 SR Prasmju trenažieris/);
 assert.ok(r.textContent.includes('Patērētājs'));
 click(r,/5 Zelta bonusi Markam/);
 assert.ok(r.textContent.includes('50 / 30 / 20'));
 click(r,/Drukājamā darba lapa/);
 assert.ok(r.querySelector('.print-worksheet-sheet'));
 assert.ok(r.textContent.includes('Sociālās zinības (4. klase)'));
});
test('Mark Latvian pronouns module covers all 7 cases, questions, tables, and mounts cleanly',()=>{
 assert.equal(CASES_LIST.length,7);
 const expectedQuestions={
  nom:'Kas?',gen:'Kā?',dat:'Kam?',aku:'Ko?',ins:'Ar ko?',lok:'Kur? (kurā? par ko?)',vok:'Uzruna! (bez jautājuma)'
 };
 for(const c of CASES_LIST){
  assert.equal(c.question,expectedQuestions[c.id],'Case '+c.id+' has unexpected question');
 }
 assert.ok(PRONOUN_TABLES.es);
 assert.ok(PRONOUN_TABLES.tu);
 assert.ok(PRONOUN_TABLES.vins);
 assert.ok(PRONOUN_TABLES.mes);
 assert.ok(PRONOUN_TABLES.jus);
 assert.ok(PRONOUN_TABLES.sevis);
 assert.equal(PRONOUN_TABLES.es.cases.nom.form,'es');
 assert.equal(PRONOUN_TABLES.es.cases.dat.form,'man');
 assert.equal(PRONOUN_TABLES.es.cases.aku.form,'mani');
 assert.equal(PRONOUN_TABLES.sevis.cases.nom.form.includes('NAV'),true);
 assert.equal(PRONOUN_TABLES.sevis.cases.dat.form,'sev');
 assert.ok(SENTENCE_EXERCISES.length>=10);

 const r=setup();
 renderPronounLab(r);
 assert.ok(r.querySelector('.pronoun-lab-container'));
 assert.ok(r.textContent.includes('Vietniekvārdu locīšana'));
 assert.ok(r.textContent.includes('Nominatīvs'));
 assert.ok(r.textContent.includes('Kas?'));

 click(r,/Spēle: Savieno/);
 assert.ok(r.textContent.includes('Savieno locījumu ar tā pareizo jautājumu'));

 click(r,/Locīšanas puzle/);
 assert.ok(r.textContent.includes('Saliec vietniekvārdu'));

 click(r,/Teikumu detektīvs/);
 assert.ok(r.textContent.includes('Ieliec pareizo vietniekvārdu'));

 click(r,/5 Zelta likumi/);
 assert.ok(r.textContent.includes('Atgriezeniskajam vietniekvārdam NAV nominatīva'));

 click(r,/Drukājamā lapa/);
 assert.ok(r.querySelector('.print-pronoun-sheet'));
 assert.ok(r.textContent.includes('Skolēna vārds: Marks'));

 const r2=setup();
 renderLatvianSchool(r2,{canSubmit:true});
 assert.ok(r2.textContent.includes('Vietniekvārdu locīšana (7 locījumi)'));
 click(r2,/Vietniekvārdu locīšana/);
 assert.ok(r2.querySelector('.pronoun-lab-container'));
});

test('Mark 4th grade Nature NPD module covers all 14 criteria, 25 points, and mounts cleanly',async()=>{
 assert.equal(NPD_14_CRITERIA.length,14);
 const totalPts=NPD_14_CRITERIA.reduce((sum,c)=>sum+c.maxPts,0);
 assert.equal(totalPts,25);

 const soloCounts={I:0,II:0,III:0,'III/IV':0};
 NPD_14_CRITERIA.forEach(c=>{
  assert.ok(c.title&&c.title.length>5);
  assert.ok(c.maxPts>=1);
  soloCounts[c.solo]=(soloCounts[c.solo]||0)+c.maxPts;
 });
 assert.equal(soloCounts.I,8);
 assert.equal(soloCounts.II,8);
 assert.equal(soloCounts.III,3);
 assert.equal(soloCounts['III/IV'],6);

 assert.equal(NPD_QUESTIONS.length,14);
 assert.equal(NATURE_4TH_THEORY.length,6);

 const r=setup();
 let savedData=null;
 const mod=renderMarksNatureNPD(r,{
  canSubmit:true,
  saveProgress:async d=>{
   savedData=d;
   return 'saved-nature-1';
  }
 });

 assert.ok(r.querySelector('.nature-npd-app'));
 assert.ok(r.textContent.includes('Kā vairojas, aug un attīstās dzīvie organismi?'));
 assert.ok(r.textContent.includes('25 punkti'));

 click(r,/Mācību ceļvedis/);
 assert.ok(r.querySelector('.theory-layout'));
 assert.ok(r.textContent.includes('Vairošanās galvenā nozīme'));

 click(r,/Treniņa laboratorija/);
 assert.ok(r.querySelector('.practice-container'));
 assert.ok(r.textContent.includes('Uzdevums 1 no 14'));

 click(r,/Izdrukājama darba lapa/);
 assert.ok(r.querySelector('.print-worksheet-sheet'));
 assert.ok(r.textContent.includes('Skolēna vārds: Marks'));

 click(r,/Pārbaudes darbs/);
 assert.ok(r.querySelector('.exam-questions-list'));
 assert.ok(r.querySelector('#exam-q-1'));
 assert.equal(r.querySelector('#exam-q-14'),null);
 assert.ok(r.textContent.includes('Uzdevums 1 no 14'));
 for(let i=1;i<14;i++){
  click(r,/Nākamais →/);
  assert.ok(r.querySelector('#exam-q-'+(i+1)));
  assert.equal(r.querySelectorAll('.exam-q-card').length,1);
 }
 assert.ok(r.textContent.includes('Uzdevums 14 no 14'));
 click(r,/Iepriekšējais/);
 assert.ok(r.querySelector('#exam-q-13'));
 click(r,/Nākamais →/);
 click(r,/Pabeigt un iesniegt pārbaudes darbu/);
 await Promise.resolve();
 assert.ok(savedData);
 assert.equal(savedData.studentRole,'marks');
 assert.equal(savedData.subjectId,'nature');
 assert.equal(savedData.mode,'exam');
 const notes=JSON.parse(savedData.notes);
 assert.equal(notes.missionId,'oct29-nature-organisms');
 assert.equal(notes.total,25);

 mod.cleanup?.();
});
