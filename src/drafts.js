const key=(uid,moduleId)=>'majas-skola:'+uid+':draft-v3:'+moduleId;
export function readDraft(uid,moduleId){try{const d=JSON.parse(localStorage.getItem(key(uid,moduleId))||'null');return d?.version===3?d:null;}catch{return null;}}
export function writeDraft(uid,moduleId,value){try{localStorage.setItem(key(uid,moduleId),JSON.stringify({version:3,...value}));}catch{}}
export function clearDraft(uid,moduleId){try{localStorage.removeItem(key(uid,moduleId));}catch{}}
export function captureFields(root){return [...root.querySelectorAll('input,textarea,select')].map(e=>({value:e.value,checked:Boolean(e.checked)}));}
export function restoreFields(root,fields=[]){[...root.querySelectorAll('input,textarea,select')].forEach((e,i)=>{if(fields[i]&&!e.disabled){if(e.tagName!=='SELECT')e.value=fields[i].value||'';e.checked=fields[i].checked;}});}
