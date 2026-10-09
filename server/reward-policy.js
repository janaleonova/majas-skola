// BP server-side policy. Pure functions; never trust client-supplied scores.
// This module is not a bank: persisting awards requires an authenticated,
// server-verified answer session and a Firestore transaction.
export const MAX_BP_PER_TOPIC=20;
const BANDS=[[0,39,0,3],[40,59,4,7],[60,74,8,11],[75,89,12,15],[90,100,16,18]];
export function scoreVerifiedAttempt({answers,correctAnswers,mode='practice'}){
 if(!Array.isArray(answers)||!Array.isArray(correctAnswers)||answers.length!==correctAnswers.length||answers.length<1||answers.length>40)throw Error('Nederīgs uzdevumu skaits');
 let correct=0,streak=0,maxStreak=0;
 for(let i=0;i<answers.length;i++){
  const a=answers[i],key=correctAnswers[i];
  if(!Number.isInteger(a)||!Number.isInteger(key))throw Error('Atbildēm jābūt veseliem skaitļiem');
  const good=a===key;correct+=Number(good);streak=good?streak+1:0;maxStreak=Math.max(maxStreak,streak);
 }
 const total=answers.length,percent=Math.round(correct*100/total);
 if(!['practice','exam'].includes(mode))return {correct,total,percent,maxStreak,base:0,streakBonus:0,potential:0,eligible:false};
 const [lo,hi,low,high]=BANDS.find(([a,b])=>percent>=a&&percent<=b);
 const base=percent===0?0:Math.min(high,Math.floor(low+(percent-lo)*(high-low)/Math.max(1,hi-lo)));
 const streakBonus=Number(maxStreak>=5)+Number(maxStreak>=10);
 return {correct,total,percent,maxStreak,base,streakBonus,potential:Math.min(MAX_BP_PER_TOPIC,base+streakBonus),eligible:true};
}
export function calculateImprovement(previousBest,newPotential){
 if(!Number.isInteger(previousBest)||!Number.isInteger(newPotential)||previousBest<0||previousBest>MAX_BP_PER_TOPIC||newPotential<0||newPotential>MAX_BP_PER_TOPIC)throw Error('Nederīgs BP');
 const best=Math.max(previousBest,newPotential);
 return {earned:best-previousBest,best};
}
export function validateAwardIdentity({authenticatedUid,studentUid,studentRole,registeredRole}){
 return Boolean(authenticatedUid&&authenticatedUid===studentUid&&['marks','samanta'].includes(studentRole)&&registeredRole===studentRole);
}
export function awardDocumentId({studentUid,subjectKey,topicKey}){
 if(!/^[a-zA-Z0-9_-]{8,128}$/.test(studentUid)||! /^[a-z0-9_-]{1,55}$/.test(subjectKey)||! /^[a-z0-9_-]{1,55}$/.test(topicKey))throw Error('Nederīga identitāte vai tēma');
 return studentUid+'__'+subjectKey+'__'+topicKey;
}
// ATTENTION: a caller must provide answer keys from server-controlled content,
// not from a client payload. A unique attempt ID and Firestore transaction are
// necessary before any BP can be credited or redeemed.
