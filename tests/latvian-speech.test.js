import test from 'node:test';
import assert from 'node:assert/strict';
import {speakText} from '../src/marks-nature-npd.js';

test('Latvian reading never falls back to a foreign voice',()=>{
 const beforeWindow=globalThis.window;
 const beforeUtterance=globalThis.SpeechSynthesisUtterance;
 let calls=0;
 try{
  globalThis.window={speechSynthesis:{
   cancel(){},getVoices:()=>[{lang:'en-US',name:'English'},{lang:'ru-RU',name:'Russian'}],
   speak(){calls++;}
  }};
  globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  assert.equal(speakText('Kā vairojas augi?'),false);
  assert.equal(calls,0);
 }finally{
  if(beforeWindow===undefined)delete globalThis.window;else globalThis.window=beforeWindow;
  if(beforeUtterance===undefined)delete globalThis.SpeechSynthesisUtterance;else globalThis.SpeechSynthesisUtterance=beforeUtterance;
 }
});

test('Latvian voice is selected explicitly',()=>{
 const beforeWindow=globalThis.window;
 const beforeUtterance=globalThis.SpeechSynthesisUtterance;
 const lv={lang:'lv-LV',name:'Latvian'};
 let spoken;
 try{
  globalThis.window={speechSynthesis:{
   cancel(){},getVoices:()=>[{lang:'en-US',name:'English'},lv],
   speak(u){spoken=u;}
  }};
  globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  assert.equal(speakText('Dzīvības turpināšanās'),true);
  assert.equal(spoken.voice,lv);
  assert.equal(spoken.lang,'lv-LV');
 }finally{
  if(beforeWindow===undefined)delete globalThis.window;else globalThis.window=beforeWindow;
  if(beforeUtterance===undefined)delete globalThis.SpeechSynthesisUtterance;else globalThis.SpeechSynthesisUtterance=beforeUtterance;
 }
});
