import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {createMathSession,gradeMathSession} from '../server/math-review.js';
import {CHILD_UIDS} from '../src/learning-policy.js';
import {CATALOG} from '../src/catalog.js';
const repo=new URL('../',import.meta.url).pathname;
const compiled=await build({entryPoints:[repo+'src/main.js'],bundle:true,write:false,plugins:[{name:'browser-fixtures',setup(b){
 b.onLoad({filter:/firebase\/init\.js$/},()=>({loader:'js',contents:`export const auth={currentUser:{uid:window.testRole==='marks'?'${CHILD_UIDS.marks}':window.testRole==='samanta'?'${CHILD_UIDS.samanta}':'parent',getIdToken:async()=> 'test'}};export const db=null;export const initFirebase=async()=>({isConfigured:true});export const onAuthStateChanged=(a,cb)=>cb(a.currentUser);export const signOut=async()=>{};export const signInWithEmailAndPassword=async()=>({user:auth.currentUser});export const setPersistence=async()=>{};export const browserLocalPersistence='local';`}));
 b.onLoad({filter:/homeSchoolService\.js$/},()=>({loader:'js',contents:`export const ROLES={PARENT:'vecaks'};export const getUserProfile=async uid=>({role:uid==='parent'?'vecaks':uid==='${CHILD_UIDS.samanta}'?'samanta':'marks',approved:true,spentBP:0});export const getTasks=async()=>[];export const getProgressHistory=async()=>[];export const recordProgress=async d=>d.attemptId;export const getProgressRecord=async()=>null;export const getFamilyIdentities=async()=>(${JSON.stringify(CHILD_UIDS)});export const updateTaskStatus=async()=>{};export const createTask=async()=>{};export const editTask=async()=>{};export const removeTask=async()=>{};`}));
 b.onLoad({filter:/activity-presence\.js$/},()=>({loader:'js',contents:'export const startChildPresence=()=>()=>{};export const renderParentPresence=()=>()=>{};'}));
}}]});
const server=spawn(process.execPath,['server.js'],{cwd:repo,env:{...process.env,PORT:'3098'},stdio:['ignore','pipe','pipe']});
let browser;
try{
 await new Promise((ok,no)=>{server.stdout.once('data',ok);server.once('error',no);});
 browser=await chromium.launch({headless:true});
 const failures=[];
 for(const role of ['marks','samanta','vecaks'])for(const viewport of [{width:390,height:844},{width:844,height:390},{width:1365,height:900}]){
  const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage();
  page.on('pageerror',e=>failures.push(role+': '+e.message));page.on('dialog',d=>d.accept());
  await page.addInitScript(role=>{window.testRole=role;},role);
  await page.route('**/public/bundle.js',r=>r.fulfill({contentType:'text/javascript',body:compiled.outputFiles[0].text}));
  await page.route('**/api/math/**',async r=>{const data=r.request().postDataJSON();const result=r.request().url().endsWith('/session')?createMathSession({uid:CHILD_UIDS.marks,...data}):gradeMathSession({uid:CHILD_UIDS.marks,...data});await r.fulfill({contentType:'application/json',body:JSON.stringify(result)});});
  await page.goto('http://127.0.0.1:3098');await page.locator('#school').waitFor({state:'visible'});
  await page.locator(role==='vecaks'?'#modules form':'.daily-task').waitFor();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Dashboard overflow '+role+' '+viewport.width);
  if(role!=='vecaks'){
   assert.equal(await page.locator('.subject-grid>.card').count(),new Set(CATALOG[role].map(m=>m.subjectId)).size);
   const labels=await page.locator('.subject-grid button').allTextContents();
   for(const name of labels){
    console.log('Checking browser module:',role,viewport.width+'x'+viewport.height,name);
    try{
     await page.getByRole('button',{name,exact:true}).click();
     await page.locator('.subject-trainer').waitFor({state:'visible'});
     assert.ok((await page.locator('.subject-trainer').innerText()).trim().length>30,'Empty module '+name);
     const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
     assert.ok(width.scroll<=width.viewport,'Module overflow '+name+': '+JSON.stringify(width));
     await page.getByRole('button',{name:'← Dienas plāns',exact:true}).click();
    }catch(error){
     const diagnostic=await page.evaluate(()=>({
      path:location.pathname,heading:document.querySelector('.subject-trainer h2')?.textContent,
      buttons:[...document.querySelectorAll('.subject-trainer button')].slice(0,10).map(b=>b.textContent?.trim()),
      width:document.documentElement.scrollWidth,viewport:innerWidth
     })).catch(()=>({error:'Could not read DOM'}));
     fs.mkdirSync(repo+'test-artifacts',{recursive:true});
     await page.screenshot({path:repo+'test-artifacts/browser-failure-'+role+'-'+viewport.width+'.png',fullPage:true}).catch(()=>{});
     throw new Error('Browser module failed ['+role+' '+viewport.width+' '+name+']: '+error.message+' | '+JSON.stringify(diagnostic));
    }
   }
   if(role==='marks'){
    // End-to-end check: CSS must survive moving between exam questions.
    await page.getByRole('button',{name:'Dabaszinības · 4. kl. NPD →',exact:true}).click();
    await page.locator('#exam-q-1').waitFor();
    let background=await page.locator('#exam-q-1').evaluate(el=>getComputedStyle(el).backgroundColor);
    assert.equal(background,'rgb(255, 255, 255)','Nature question card should have white background');
    await page.locator('#exam-q-1 .exam-choice-btn').first().click();
    await page.getByRole('button',{name:'Nākamais →',exact:true}).click();
    await page.locator('#exam-q-2').waitFor();
    background=await page.locator('#exam-q-2').evaluate(el=>getComputedStyle(el).backgroundColor);
    assert.equal(background,'rgb(255, 255, 255)','Nature CSS must persist on the second question');
    assert.equal(await page.locator('.exam-q-card').count(),1);
    await page.getByRole('button',{name:'← Dienas plāns',exact:true}).click();
    await page.getByRole('button',{name:'Skaitļu misijas →',exact:true}).click();await page.getByRole('button',{name:/Saistītais pieraksts/}).click();await page.getByRole('button',{name:'🌱 Mācos · 8',exact:true}).click();await page.locator('.order-choice-btn').first().waitFor();
    const labels=await page.locator('.order-choice-btn').allTextContents();assert.ok(labels.every(t=>t!=='order-choice-btn'));await page.locator('.order-choice-btn').first().click();if(!await page.locator('.order-step-form').count())await page.locator('.order-choice-btn').nth(1).click();await page.locator('.order-step-form').waitFor();
   }
  }
  console.log('Browser UI passed:',role,viewport.width+'×'+viewport.height);await context.close();
 }
 assert.deepEqual(failures,[]);
}finally{await browser?.close();server.kill();}
