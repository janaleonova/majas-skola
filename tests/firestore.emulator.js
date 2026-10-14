// Real rules tests. Never connect this suite to the production project.
import test,{before,after,beforeEach} from 'node:test';
import fs from 'node:fs';
import {initializeTestEnvironment,assertFails,assertSucceeds} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,updateDoc,serverTimestamp,runTransaction} from 'firebase/firestore';
let env;
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-majas-skola',firestore:{host:'127.0.0.1',port:8088,rules:fs.readFileSync(new URL('../firestore.home-school.rules',import.meta.url),'utf8')}});});
after(async()=>{await env?.cleanup();});
beforeEach(async()=>{await env.clearFirestore();await env.withSecurityRulesDisabled(async c=>{for(const [uid,role] of [['parent','vecaks'],['marks','marks'],['samanta','samanta']])await setDoc(doc(c.firestore(),'homeSchool/data/users/'+uid),{role,approved:true});await setDoc(doc(c.firestore(),'homeSchool/data/tasks/task'),{title:'Darbs',assignedTo:'both',moduleId:null,completions:{}});});});
const db=uid=>env.authenticatedContext(uid).firestore();
test('stranger cannot self-approve, child cannot change role or spending',async()=>{await assertFails(setDoc(doc(db('stranger'),'homeSchool/data/users/stranger'),{role:'marks',approved:true}));await assertFails(updateDoc(doc(db('marks'),'homeSchool/data/users/marks'),{role:'vecaks'}));await assertFails(updateDoc(doc(db('marks'),'homeSchool/data/users/marks'),{spentBP:0}));});
test('child only changes its own completion on a shared task',async()=>{await assertSucceeds(updateDoc(doc(db('marks'),'homeSchool/data/tasks/task'),{'completions.marks':{status:'completed',attemptId:null,at:'today'},updatedAt:serverTimestamp()}));await assertFails(updateDoc(doc(db('marks'),'homeSchool/data/tasks/task'),{'completions.samanta':{status:'completed',attemptId:null,at:'today'},updatedAt:serverTimestamp()}));});
test('progress ownership, range and bonus are enforced',async()=>{
 const good={studentUid:'marks',studentRole:'marks',activityType:'multiply · exam',subject:'Matemātika',score:100,notes:'{}',attemptId:'attempt123',moduleId:'matematika',taskId:null,subjectId:'math',topicId:'multiply',mode:'exam',pointsVersion:3,taskQualified:false,taskBonus:0,completedAt:new Date().toISOString(),recordedAt:serverTimestamp()};
 await assertSucceeds(setDoc(doc(db('marks'),'homeSchool/data/progress/attempt123'),good));await assertFails(getDoc(doc(db('samanta'),'homeSchool/data/progress/attempt123')));
 await assertFails(setDoc(doc(db('marks'),'homeSchool/data/progress/attempt456'),{...good,attemptId:'attempt456',taskBonus:30}));
 await assertFails(setDoc(doc(db('marks'),'homeSchool/data/progress/attempt789'),{...good,attemptId:'attempt789',score:106}));
});
test('parent approval and BP debit are permitted together; child approval is denied',async()=>{
 const request={studentUid:'marks',studentRole:'marks',rewardId:'popcorn',rewardTitle:'Popkorns',cost:40,kind:'points_request',status:'pending',createdAt:serverTimestamp(),updatedAt:serverTimestamp()};
 await assertSucceeds(setDoc(doc(db('marks'),'homeSchool/data/rewardRequests/reward'),request));await assertFails(updateDoc(doc(db('marks'),'homeSchool/data/rewardRequests/reward'),{status:'approved'}));
 const parentDb=db('parent');await assertSucceeds(runTransaction(parentDb,async tx=>{const user=doc(parentDb,'homeSchool/data/users/marks'),reward=doc(parentDb,'homeSchool/data/rewardRequests/reward');await tx.get(user);await tx.get(reward);tx.update(user,{spentBP:40});tx.update(reward,{status:'approved',chargedBP:40,reviewedBy:'parent',updatedAt:serverTimestamp()});}));
});
