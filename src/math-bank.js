export function makeMarksMathBank(topic){
 const out=[];for(let a=1;a<=10;a++)for(let b=1;b<=10;b++){const n=a*b;
 const visual={groups:a,each:b,icon:['⭐','💎','🍎','🟣'][(a+b)%4]};
 if(topic==='multiply')out.push({id:'m'+a+'-'+b,prompt:a+' × '+b+' = ?',answer:n,hint:a+' grupas pa '+b+' = '+n});
 if(topic==='divide')out.push({id:'d'+a+'-'+b,prompt:n+' ÷ '+a+' = ?',answer:b,hint:'Pārbaudi: '+a+' × '+b+' = '+n});
 if(topic==='family'){
  // 4. klases matemātika: Saistītais pieraksts, darbību secība un iekavas
  // f1: Darbību secība bez iekavām (reizināšana un dalīšana pirms saskaitīšanas/atņemšanas)
  if(a%2===1){
   const left=a*10+20,mult=a*b,ans=left+mult;
   out.push({
    id:'f1-'+a+'-'+b,
    prompt:left+' + '+a+' × '+b+' = ?',
    expressionDisplay:left+' + '+a+' × '+b,
    answer:ans,
    firstOpChoice:a+' × '+b+' (reizināšana)',
    wrongOpChoice:left+' + '+a+' (saskaitīšana)',
    firstOpRule:'Reizināšana un dalīšana vienmēr jāveic pirms saskaitīšanas un atņemšanas!',
    step1:{title:'Reizināšana',prompt:'Cik ir '+a+' × '+b+' = ?',answer:mult,hint:'Vispirms jāveic reizināšana: '+a+' × '+b+' = '+mult+'.'},
    step2:{title:'Saskaitīšana (gala rezultāts)',prompt:'Cik ir '+left+' + '+mult+' = ?',answer:ans,hint:'Pieskaiti starprezultātu: '+left+' + '+mult+' = '+ans+'.'},
    hint:'Darbību secība: vispirms reizini '+a+' × '+b+' = '+mult+', pēc tam pieskaiti '+left+' = '+ans+'.'
   });
  }else{
   const product=a*b,left=70+b*2,ans=left-b;
   out.push({
    id:'f1-'+a+'-'+b,
    prompt:left+' - '+product+' ÷ '+a+' = ?',
    expressionDisplay:left+' - '+product+' ÷ '+a,
    answer:ans,
    firstOpChoice:product+' ÷ '+a+' (dalīšana)',
    wrongOpChoice:left+' - '+product+' (atņemšana)',
    firstOpRule:'Dalīšana vienmēr jāveic pirms atņemšanas!',
    step1:{title:'Dalīšana',prompt:'Cik ir '+product+' ÷ '+a+' = ?',answer:b,hint:'Vispirms jāveic dalīšana: '+product+' ÷ '+a+' = '+b+'.'},
    step2:{title:'Atņemšana (gala rezultāts)',prompt:'Cik ir '+left+' - '+b+' = ?',answer:ans,hint:'Atņem starprezultātu: '+left+' - '+b+' = '+ans+'.'},
    hint:'Darbību secība: vispirms izdali '+product+' ÷ '+a+' = '+b+', pēc tam atņem: '+left+' - '+b+' = '+ans+'.'
   });
  }
  // f2: Darbības ar iekavām ( ) — iekavas nosaka pirmo soli
  if(a%2===1){
   const p1=a*3,p2=a*b,sum=p1+p2,ans=3+b;
   out.push({
    id:'f2-'+a+'-'+b,
    prompt:'('+p1+' + '+p2+') ÷ '+a+' = ?',
    expressionDisplay:'('+p1+' + '+p2+') ÷ '+a,
    answer:ans,
    firstOpChoice:p1+' + '+p2+' (iekavās)',
    wrongOpChoice:p2+' ÷ '+a+' (dalīšana)',
    firstOpRule:'Darbības iekavās vienmēr jāveic pirmās!',
    step1:{title:'Darbība iekavās',prompt:'Cik ir '+p1+' + '+p2+' = ?',answer:sum,hint:'Darbības iekavās veic pirmās: '+p1+' + '+p2+' = '+sum+'.'},
    step2:{title:'Dalīšana (gala rezultāts)',prompt:'Cik ir '+sum+' ÷ '+a+' = ?',answer:ans,hint:'Izdali iekavu rezultātu ar '+a+': '+sum+' ÷ '+a+' = '+ans+'.'},
    hint:'Darbības iekavās veic pirmās: '+p1+' + '+p2+' = '+sum+'. Pēc tam izdali ar '+a+': '+sum+' ÷ '+a+' = '+ans+'.'
   });
  }else{
   const x=a+4+b,y=a+4,diff=b,ans=a*b;
   out.push({
    id:'f2-'+a+'-'+b,
    prompt:a+' × ('+x+' - '+y+') = ?',
    expressionDisplay:a+' × ('+x+' - '+y+')',
    answer:ans,
    firstOpChoice:x+' - '+y+' (iekavās)',
    wrongOpChoice:a+' × '+x+' (reizināšana)',
    firstOpRule:'Darbības iekavās vienmēr jāveic pirmās!',
    step1:{title:'Darbība iekavās',prompt:'Cik ir '+x+' - '+y+' = ?',answer:diff,hint:'Darbības iekavās veic pirmās: '+x+' - '+y+' = '+diff+'.'},
    step2:{title:'Reizināšana (gala rezultāts)',prompt:'Cik ir '+a+' × '+diff+' = ?',answer:ans,hint:'Reizini '+a+' ar iekavu rezultātu '+diff+': '+a+' × '+diff+' = '+ans+'.'},
    hint:'Darbības iekavās veic pirmās: '+x+' - '+y+' = '+diff+'. Pēc tam reizini: '+a+' × '+diff+' = '+ans+'.'
   });
  }
  // f3: Kombinētais saistītais pieraksts (3 darbības)
  if(a%2===1){
   const mult=a*b,add=b*3,ans=120-mult+add;
   out.push({
    id:'f3-'+a+'-'+b,
    prompt:'120 - '+a+' × '+b+' + '+add+' = ?',
    expressionDisplay:'120 - '+a+' × '+b+' + '+add,
    answer:ans,
    firstOpChoice:a+' × '+b+' (reizināšana)',
    wrongOpChoice:'120 - '+a+' (atņemšana)',
    firstOpRule:'Reizināšana vienmēr jāveic pirms saskaitīšanas un atņemšanas!',
    step1:{title:'1. darbība (reizināšana)',prompt:'Cik ir '+a+' × '+b+' = ?',answer:mult,hint:'Vispirms jāveic reizināšana: '+a+' × '+b+' = '+mult+'.'},
    step2:{title:'2. darbība (gala rezultāts)',prompt:'Cik ir 120 - '+mult+' + '+add+' = ?',answer:ans,hint:'120 - '+mult+' = '+(120-mult)+', tad '+(120-mult)+' + '+add+' = '+ans+'.'},
    hint:'1. solis (reizini): '+a+' × '+b+' = '+mult+'. 2. solis: 120 - '+mult+' = '+(120-mult)+'. 3. solis: '+(120-mult)+' + '+add+' = '+ans+'.'
   });
  }else{
   const product=a*b,add=b*2,ans=80+b;
   out.push({
    id:'f3-'+a+'-'+b,
    prompt:'80 - '+product+' ÷ '+a+' + '+add+' = ?',
    expressionDisplay:'80 - '+product+' ÷ '+a+' + '+add,
    answer:ans,
    firstOpChoice:product+' ÷ '+a+' (dalīšana)',
    wrongOpChoice:'80 - '+product+' (atņemšana)',
    firstOpRule:'Dalīšana vienmēr jāveic pirms saskaitīšanas un atņemšanas!',
    step1:{title:'1. darbība (dalīšana)',prompt:'Cik ir '+product+' ÷ '+a+' = ?',answer:b,hint:'Vispirms jāveic dalīšana: '+product+' ÷ '+a+' = '+b+'.'},
    step2:{title:'2. darbība (gala rezultāts)',prompt:'Cik ir 80 - '+b+' + '+add+' = ?',answer:ans,hint:'80 - '+b+' = '+(80-b)+', tad '+(80-b)+' + '+add+' = '+ans+'.'},
    hint:'1. solis (izdali): '+product+' ÷ '+a+' = '+b+'. 2. solis: 80 - '+b+' = '+(80-b)+'. 3. solis: '+(80-b)+' + '+add+' = '+ans+'.'
   });
  }
 }
 if(topic==='story'){out.push({id:'s1-'+a+'-'+b,prompt:'Pūķis atrada '+a+' lādes. Katrā lādē ir '+b+' kristāli. Cik kristālu kopā?',answer:n,hint:'Reizini lādes ar kristālu skaitu.',visual});out.push({id:'s2-'+a+'-'+b,prompt:n+' kristālus vienādi sadalīja '+a+' kastēs. Cik kristālu ir katrā kastē?',answer:b,hint:'Sadali visus kristālus kastēs.',visual});}
 }return out;
}
