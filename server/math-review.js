import {randomBytes,createHmac,timingSafeEqual} from 'node:crypto';
import {makeMarksMathBank} from '../src/math-bank.js';
import {scoreVerifiedAttempt} from './reward-policy.js';
if(process.env.MATH_SESSION_SECRET&&Buffer.byteLength(process.env.MATH_SESSION_SECRET)<32)throw Error('MATH_SESSION_SECRET jābūt vismaz 32 baitu garam.');
const SECRET=process.env.MATH_SESSION_SECRET||randomBytes(32);
const graded=new Map();
const MAX_AGE=2*60*60*1000;
const choices={multiply:100,divide:100,family:300,story:200};
function randomPick(topic,count){
 const max=choices[topic];if(!max)throw Error('Nederīga tēma');
 const ids=Array.from({length:max},(_,i)=>i);
 for(let i=ids.length-1;i>0;i--){const j=randomBytes(4).readUInt32BE(0)%(i+1);[ids[i],ids[j]]=[ids[j],ids[i]];}
 return ids.slice(0,count);
}
const banks=new Map(Object.keys(choices).map(t=>[t,makeMarksMathBank(t)]));
function item(topic,index){const q=banks.get(topic)?.[index];if(!q)throw Error('Nederīgs uzdevums');return q;}
function sign(payload){const data=Buffer.from(JSON.stringify(payload)).toString('base64url');return data+'.'+createHmac('sha256',SECRET).update(data).digest('base64url');}
function verify(token){if(typeof token!=='string'||token.length>5500)throw Error('Nederīgs sesijas kods');const [data,mac,...rest]=token.split('.');if(!data||!mac||rest.length)throw Error('Nederīgs sesijas kods');const valid=createHmac('sha256',SECRET).update(data).digest();const received=Buffer.from(mac,'base64url');if(received.length!==valid.length||!timingSafeEqual(received,valid))throw Error('Sesija nav derīga');return JSON.parse(Buffer.from(data,'base64url').toString());}
export function createMathSession({uid,topic,mode}){
 if(!uid||!choices[topic]||!['learn','practice','exam'].includes(mode))throw Error('Nederīgi parametri');
 const count=mode==='learn'?8:mode==='exam'?20:12;
 const ids=randomPick(topic,count);
 const token=sign({uid,topic,mode,ids,createdAt:Date.now(),nonce:randomBytes(16).toString('hex')});
 return {token,ids:ids.map(i=>item(topic,i).id),topic,mode,count,expiresInSeconds:7200};
}
export function gradeMathSession({uid,token,answers}){
 const p=verify(token);
 if(p.uid!==uid||Date.now()-p.createdAt>MAX_AGE||p.createdAt>Date.now()+30000)throw Error('Sesija beigusies vai neatbilst kontam');
 const previous=graded.get(p.nonce);if(previous){if(previous.answers!==JSON.stringify(answers))throw Error('Mēģinājuma atbildes nevar mainīt pēc pārbaudes');return previous.result;}
 if(!Array.isArray(answers)||answers.length!==p.ids.length)throw Error('Nepilnas atbildes');
 const questions=p.ids.map(i=>item(p.topic,i));
 const correctAnswers=questions.map(q=>q.answer);
 const normalized=answers.map((answer,i)=>{
  const q=questions[i];
  if(q.step1){
   if(!answer||typeof answer!=='object'||!Number.isInteger(answer.value)||!Number.isInteger(answer.intermediate)||typeof answer.firstOp!=='string')throw Error('Nepilni darbību secības soļi');
   return answer.firstOp===q.firstOpChoice&&answer.intermediate===q.step1.answer?answer.value:-1;
  }
  if(!Number.isInteger(answer))throw Error('Nederīga atbilde');return answer;
 });
 const outcome=scoreVerifiedAttempt({answers:normalized,correctAnswers,mode:p.mode});
 const result={...outcome,topic:p.topic,mode:p.mode,verifiedBy:'server',spendableBP:0};
 graded.set(p.nonce,{answers:JSON.stringify(answers),result,at:Date.now()});
 for(const [id,row] of graded)if(Date.now()-row.at>MAX_AGE)graded.delete(id);
 return result;
}
