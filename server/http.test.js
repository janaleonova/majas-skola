import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
test('only public assets and explicit HTML routes are served',async()=>{
 const child=spawn(process.execPath,['server.js'],{cwd:new URL('../',import.meta.url),env:{...process.env,PORT:'3097'},stdio:['ignore','pipe','pipe']});
 try{await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Server did not start')),10000);child.stdout.once('data',()=>{clearTimeout(timeout);resolve();});child.once('error',reject);child.once('exit',code=>{if(code)reject(Error('Server exit '+code));});});
  for(const path of ['/server.js','/package.json','/src/main.js','/missing.js','/firestore.home-school.rules'])assert.equal((await fetch('http://127.0.0.1:3097'+path)).status,404,path);
  assert.equal((await fetch('http://127.0.0.1:3097/')).status,200);assert.equal((await fetch('http://127.0.0.1:3097/public/icon.svg')).status,200);
  const denied=await fetch('http://127.0.0.1:3097/api/math/session',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(denied.status,403);
 }finally{child.kill();}
});
