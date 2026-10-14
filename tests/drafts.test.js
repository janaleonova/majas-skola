import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {renderSamantaLatvian,makeSamantaLatvianBank} from '../src/samanta-latvian.js';
import {renderMarksEnglish} from '../src/marks-english.js';
import {renderSamantaAdditionGame} from '../src/samanta-sum-game.js';
import {writeDraft,readDraft,clearDraft,captureFields,restoreFields} from '../src/drafts.js';
function setup(){const {document,window}=parseHTML('<html><body><div id="root"></div></body></html>');globalThis.document=document;globalThis.window=window;globalThis.localStorage={data:new Map(),getItem(k){return this.data.get(k)||null},setItem(k,v){this.data.set(k,v)},removeItem(k){this.data.delete(k)}};return document.querySelector('#root');}
const click=(r,re)=>{const b=[...r.querySelectorAll('button')].find(b=>re.test(b.textContent));assert.ok(b);b.click();};
test('resume reading preserves question order and score',()=>{
 const r=setup();let state;const onCheckpoint=s=>{state=JSON.parse(JSON.stringify(s))};renderSamantaLatvian(r,{onCheckpoint});click(r,/Vieglā lasīšana/);click(r,/Mācos/);
 const text=r.querySelector('.reading-prompt').textContent.replaceAll('·','').replaceAll('\n','');const q=makeSamantaLatvianBank().find(q=>q.syllablesText.replaceAll('-','').replaceAll('\n','')===text);click(r,new RegExp('^'+q.answer+'$'));click(r,/Nākamais uzdevums/);const before=r.querySelector('.reading-prompt').textContent;r.replaceChildren();renderSamantaLatvian(r,{initialState:state,onCheckpoint});assert.equal(r.querySelector('.reading-prompt').textContent,before);assert.equal(state.index,1);assert.equal(state.correct,1);
});
test('persistent draft restores typed English answer and can be cleared',()=>{
 const r=setup();let state;renderMarksEnglish(r,{onCheckpoint:s=>{state=JSON.parse(JSON.stringify(s))}});click(r,/Nedēļas dienas/);click(r,/Mācos/);r.querySelector('input').value='Wednesday';writeDraft('uid','anglu',{state,fields:captureFields(r)});const d=readDraft('uid','anglu');r.replaceChildren();renderMarksEnglish(r,{initialState:d.state});restoreFields(r,d.fields);assert.equal(r.querySelector('input').value,'Wednesday');clearDraft('uid','anglu');assert.equal(readDraft('uid','anglu'),null);
});
test('addition workshop resumes the selected method and step',()=>{const r=setup();let state;renderSamantaAdditionGame(r,{onCheckpoint:s=>{state=JSON.parse(JSON.stringify(s))}});click(r,/1. Atklāj/);click(r,/2. Pieskaiti pa daļām/);click(r,/Nākamais solis/);assert.equal(state.kind,'workshop');assert.equal(state.method,1);assert.equal(state.step,1);r.replaceChildren();renderSamantaAdditionGame(r,{initialState:state});assert.ok(r.textContent.includes('46 + 28'));});
