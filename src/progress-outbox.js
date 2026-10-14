// Only completed results are queued. Each retry uses the same document ID.
const key=uid=>'majas-skola:'+uid+':pending-results-v3';
export function pendingResults(uid){try{const value=JSON.parse(localStorage.getItem(key(uid))||'[]');return Array.isArray(value)?value:[];}catch{return [];}}
export function queueResult(uid,data){const row={...data,attemptId:data.attemptId||crypto.randomUUID(),completedAt:data.completedAt||new Date().toISOString()};try{localStorage.setItem(key(uid),JSON.stringify([...pendingResults(uid).filter(x=>x.attemptId!==row.attemptId),row]));}catch{throw Error('Nevar saglabāt rezerves rezultātu šajā ierīcē.');}return row;}
export function acknowledgeResult(uid,id){localStorage.setItem(key(uid),JSON.stringify(pendingResults(uid).filter(x=>x.attemptId!==id)));}
export async function flushResults(uid,save){const sent=[];for(const row of pendingResults(uid)){const id=await save({...row,currentUid:uid});if(!id)throw Error('Konts nevar saglabāt rezultātu.');acknowledgeResult(uid,id);sent.push(id);}return sent;}
