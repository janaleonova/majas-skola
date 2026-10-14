import test from 'node:test';
import assert from 'node:assert/strict';
import {createMathSession,gradeMathSession} from './math-review.js';
import {makeMarksMathBank} from '../src/math-bank.js';
test('every topic agrees with the shared question bank',()=>{
 for(const topic of ['multiply','divide','family','story']){
  const bank=new Map(makeMarksMathBank(topic).map(q=>[q.id,q]));const s=createMathSession({uid:'test',topic,mode:'exam'});
  const answers=s.ids.map(id=>{const q=bank.get(id);return q.step1?{value:q.answer,firstOp:q.firstOpChoice,intermediate:q.step1.answer}:q.answer;});
  assert.equal(gradeMathSession({uid:'test',token:s.token,answers}).percent,100);
  assert.deepEqual(gradeMathSession({uid:'test',token:s.token,answers}),gradeMathSession({uid:'test',token:s.token,answers}));
  assert.throws(()=>gradeMathSession({uid:'other',token:s.token,answers}));
 }
});
test('wrong order with correct final answer is graded consistently and retries cannot change answers',()=>{
 const s=createMathSession({uid:'test',topic:'family',mode:'exam'}),bank=new Map(makeMarksMathBank('family').map(q=>[q.id,q]));
 const answers=s.ids.map(id=>{const q=bank.get(id);return {value:q.answer,firstOp:q.firstOpChoice,intermediate:q.step1.answer};});
 answers[0].firstOp='wrong';assert.equal(gradeMathSession({uid:'test',token:s.token,answers}).correct,19);
 answers[0].firstOp=bank.get(s.ids[0]).firstOpChoice;assert.throws(()=>gradeMathSession({uid:'test',token:s.token,answers}));
});
