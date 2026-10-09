import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreVerifiedAttempt,calculateImprovement,validateAwardIdentity,awardDocumentId} from './reward-policy.js';
test('Perfect 20-answer streak earns at most 20 BP',()=>{
 const keys=Array.from({length:20},(_,i)=>i+1);
 const r=scoreVerifiedAttempt({answers:keys,correctAnswers:keys,mode:'exam'});
 assert.equal(r.percent,100);assert.equal(r.maxStreak,20);assert.equal(r.potential,20);
});
test('Learning mode earns zero',()=>assert.equal(scoreVerifiedAttempt({answers:[1,2],correctAnswers:[1,2],mode:'learn'}).potential,0));
test('Repeat cannot award again',()=>assert.deepEqual(calculateImprovement(20,20),{earned:0,best:20}));
test('Worse result cannot subtract points',()=>assert.deepEqual(calculateImprovement(18,5),{earned:0,best:18}));
test('Only improvement earns extra points',()=>assert.deepEqual(calculateImprovement(16,20),{earned:4,best:20}));
test('Invalid answers and score are rejected',()=>{assert.throws(()=>scoreVerifiedAttempt({answers:[1],correctAnswers:[1,2]}));assert.throws(()=>calculateImprovement(-1,5));});
test('Parent or wrong identity can never own child awards',()=>{
 assert.equal(validateAwardIdentity({authenticatedUid:'parentUID',studentUid:'childUID',studentRole:'marks',registeredRole:'marks'}),false);
 assert.equal(validateAwardIdentity({authenticatedUid:'childUID',studentUid:'childUID',studentRole:'marks',registeredRole:'samanta'}),false);
 assert.equal(validateAwardIdentity({authenticatedUid:'childUID',studentUid:'childUID',studentRole:'marks',registeredRole:'marks'}),true);
});
test('Distinct children have distinct topic documents',()=>{
 assert.notEqual(awardDocumentId({studentUid:'child_1234',subjectKey:'math',topicKey:'multiply'}),awardDocumentId({studentUid:'child_5678',subjectKey:'math',topicKey:'multiply'}));
});
