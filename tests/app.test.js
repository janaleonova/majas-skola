import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {build} from 'esbuild';
import {parseHTML} from 'linkedom';
import {createMathSession,gradeMathSession} from '../server/math-review.js';
import {CHILD_UIDS} from '../src/learning-policy.js';
const tick=()=>new Promise(r=>setImmediate(r));
test('dashboard → assigned lesson → grade → receipt → updated dashboard; parent text is safe',async()=>{
 const repo=new URL('../',import.meta.url).pathname;
 const compiled=await build({entryPoints:[repo+'src/main.js'],bundle:true,write:false,plugins:[{name:'mocks',setup(b){
  b.onLoad({filter:/firebase\/init\.js$/},()=>({loader:'js',contents:`export const auth={currentUser:{uid:'${CHILD_UIDS.marks}',getIdToken:async()=> 'test'}};export const db=null;export const initFirebase=async()=>({isConfigured:true});export const onAuthStateChanged=(a,cb)=>cb(a.currentUser);export const signOut=async()=>{};export const signInWithEmailAndPassword=async()=>({user:auth.currentUser});export const setPersistence=async()=>{};export const browserLocalPersistence='local';`}));
  b.onLoad({filter:/homeSchoolService\.js$/},()=>({loader:'js',contents:`export const ROLES={PARENT:'vecaks'};export const getUserProfile=async uid=>({role:uid==='parent'?'vecaks':uid==='${CHILD_UIDS.samanta}'?'samanta':'marks',approved:true,spentBP:0});export const getTasks=async()=>window.rows.tasks;export const getProgressHistory=async()=>[...window.rows.progress];export const recordProgress=async d=>{window.rows.progress.push({...d,studentUid:d.currentUid,id:d.attemptId,recordedAt:{seconds:Date.now()/1000}});return d.attemptId};export const getFamilyIdentities=async()=>(${JSON.stringify(CHILD_UIDS)});export const updateTaskStatus=async(id,status,role,attemptId)=>{window.rows.tasks.find(t=>t.id===id).completions={[role]:{status,attemptId}}};export const createTask=async()=>{};export const editTask=async()=>{};export const removeTask=async()=>{};`}));
  b.onLoad({filter:/activity-presence\.js$/},()=>({loader:'js',contents:`export const startChildPresence=()=>()=>{};export const renderParentPresence=()=>()=>{};`}));
  b.onLoad({filter:/child-guide\.js$/},()=>({loader:'js',contents:`export const installChildGuide=()=>({stop(){}});`}));
  b.onLoad({filter:/app-v3\.js$/},()=>({loader:'js',resolveDir:repo+'src',contents:fs.readFileSync(repo+'src/app-v3.js','utf8')+'\nwindow.appTest={state,showSchool,renderDashboard};'}));
 }}]});
 const {window,document}=parseHTML(fs.readFileSync(repo+'index.html','utf8'));globalThis.window=window;globalThis.document=document;globalThis.history={pushState(){}};globalThis.location={href:'http://test/'};globalThis.confirm=()=>true;
 globalThis.localStorage={data:new Map(),getItem(k){return this.data.get(k)||null},setItem(k,v){this.data.set(k,String(v))}};
 window.HTMLElement.prototype.focus=function(){};window.HTMLElement.prototype.scrollIntoView=function(){};window.scrollTo=()=>{};Object.defineProperty(document,'readyState',{value:'complete'});
 const nativeInterval=globalThis.setInterval,nativeFetch=globalThis.fetch;globalThis.setInterval=()=>0;
 globalThis.fetch=async(url,options)=>{const data=JSON.parse(options.body);return new Response(JSON.stringify(url.endsWith('/session')?createMathSession({uid:CHILD_UIDS.marks,...data}):gradeMathSession({uid:CHILD_UIDS.marks,...data})),{headers:{'Content-Type':'application/json'}});};
 window.rows={tasks:[{id:'assignment',title:'Dienas matemātika',assignedTo:'marks',moduleId:'matematika',daily:true,requiredMode:'learn',targetScore:0,bonusBP:5,completions:{}}],progress:[]};
 const click=text=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent===text);assert.ok(b,'Missing '+text);b.click();};
 try{
  new Function(compiled.outputFiles[0].text)();for(let i=0;i<10;i++)await tick();
  assert.equal(document.querySelectorAll('.subject-grid>.card').length,3);assert.ok(document.querySelector('.daily-task').textContent.includes('Dienas matemātika'));
  click('Sākt uzdevumu →');const tile=[...document.querySelectorAll('.topic-tile')].find(x=>x.textContent.includes('Reizrēķins'));tile.click();click('🌱 Mācos · 8');for(let i=0;i<10;i++)await tick();
  for(let i=0;i<8;i++){const expr=document.querySelector('.math-expression').textContent;const numbers=expr.match(/\d+/g).map(Number);document.querySelector('.big-number-input').value=String(numbers[0]*numbers[1]);document.querySelector('.math-answer-form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));click('Turpināt uzreiz →');}
  for(let i=0;i<15;i++)await tick();assert.ok(document.querySelector('.bp-receipt').textContent.includes('+7 BP'));assert.equal(window.rows.progress.length,1);assert.equal(window.rows.tasks[0].completions.marks.status,'completed');click('Atgriezties pie dienas plāna →');assert.ok(document.querySelector('.compact-progress').textContent.includes('Kopā 7 BP'));assert.ok(document.querySelector('.daily-task').textContent.includes('Izpildīts')||document.querySelector('.daily-task').textContent.includes('Šodienas'));
  window.rows.progress.push({studentUid:CHILD_UIDS.marks,studentRole:'marks',activityType:'<img id="unsafe" src="x" onerror="alert(1)">',subject:'Angļu valoda',score:100,recordedAt:{seconds:Date.now()/1000}});
  window.appTest.state.role='vecaks';window.appTest.state.user={uid:'parent'};await window.appTest.showSchool('vecaks');assert.equal(document.querySelector('#unsafe'),null);assert.ok(document.querySelector('#modules form').textContent.includes('Piešķirt uzdevumu'));
 }finally{globalThis.setInterval=nativeInterval;globalThis.fetch=nativeFetch;}
});
