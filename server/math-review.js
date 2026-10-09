import {randomBytes,createHmac,timingSafeEqual} from 'node:crypto';
import {scoreVerifiedAttempt} from './reward-policy.js';
const SECRET=randomBytes(32);
const used=new Set();
const MAX_AGE=15*60*1000;
const choices={multiply:100,divide:100,family:300,story:200};
function randomPick(topic,count){
 const max=choices[topic];if(!max)throw Error('Nederīga tēma');
 const ids=Array.from({length:max},(_,i)=>i);
 for(let i=ids.length-1;i>0;i--){const j=randomBytes(4).readUInt32BE(0)%(i+1);[ids[i],ids[j]]=[ids[j],ids[i]];}
 return ids.slice(0,count);
}
function item(topic,index){
 const a=Math.floor((index%(100))/10)+1,b=index%10+1,n=a*b;
 if(topic==='multiply')return {id:'m'+a+'-'+b,answer:n};
 if(topic==='divide')return {id:'d'+a+'-'+b,answer:b};
 if(topic==='family'){const kind=Math.floor(index/100);return kind===0?{id:'f1-'+a+'-'+b,answer:n}:kind===1?{id:'f2-'+a+'-'+b,answer:a}:{id:'f3-'+a+'-'+b,answer:b};}
 if(topic==='story'){return index<100?{id:'s1-'+a+'-'+b,answer:n}:{id:'s2-'+a+'-'+b,answer:b};}
 throw Error('Nederīga tēma');
}
function sign(payload){const data=Buffer.from(JSON.stringify(payload)).toString('base64url');return data+'.'+createHmac('sha256',SECRET).update(data).digest('base64url');}
function verify(token){if(typeof token!=='string'||token.length>5500)throw Error('Nederīgs sesijas kods');const [data,mac,...rest]=token.split('.');if(!data||!mac||rest.length)throw Error('Nederīgs sesijas kods');const valid=createHmac('sha256',SECRET).update(data).digest();const received=Buffer.from(mac,'base64url');if(received.length!==valid.length||!timingSafeEqual(received,valid))throw Error('Sesija nav derīga');return JSON.parse(Buffer.from(data,'base64url').toString());}
export function createMathSession({uid,topic,mode}){
 if(!uid||!choices[topic]||!['learn','practice','exam'].includes(mode))throw Error('Nederīgi parametri');
 const count=mode==='learn'?8:mode==='exam'?20:12;
 const ids=randomPick(topic,count);
 const token=sign({uid,topic,mode,ids,createdAt:Date.now(),nonce:randomBytes(16).toString('hex')});
 return {token,ids:ids.map(i=>item(topic,i).id),topic,mode,count,expiresInSeconds:900};
}
export function gradeMathSession({uid,token,answers}){
 const p=verify(token);
 if(p.uid!==uid||Date.now()-p.createdAt>MAX_AGE||p.createdAt>Date.now()+30000)throw Error('Sesija beigusies vai neatbilst kontam');
 if(used.has(p.nonce))throw Error('Šī sesija jau ir pārbaudīta');
 if(!Array.isArray(answers)||answers.length!==p.ids.length)throw Error('Nepilnas atbildes');
 const correctAnswers=p.ids.map(i=>item(p.topic,i).answer);
 const outcome=scoreVerifiedAttempt({answers,correctAnswers,mode:p.mode});
 used.add(p.nonce);
 if(used.size>20000)used.clear(); // volatile replay guard, NOT suitable for spending
 return {...outcome,topic:p.topic,mode:p.mode,verifiedBy:'server',spendableBP:0,explanation:'Pārbaudīts serverī. Tērējami BP vēl netiek piešķirti.'};
}
