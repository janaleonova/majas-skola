// Deterministic daily foundations; shared by both children's views.
// Never derive scores from an AI response. All arithmetic and multiple-choice keys are fixed here.
export const FOUNDATION_PARTS=['math','language','nut'];
const dayNumber=date=>Math.floor(Date.parse(date+'T12:00:00Z')/86400000);
export function validFoundationDate(date){return /^20\d{2}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date+'T12:00:00Z'))&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;}
const mod=(n,m)=>(n%m+m)%m;
const templates=[
 {title:'Grāmatu plaukts',easyText:'Elza lasa grāmatu. Pirmajā dienā viņa izlasīja sešas lappuses. Otrajā dienā — astoņas.',syllables:'grā-ma-ta',text:'Bibliotēkā Elza atrada grāmatu par meža dzīvniekiem. Pirmajā dienā viņa izlasīja sešas lappuses. Otrajā dienā viņa izlasīja astoņas lappuses. Pēc tam Elza pastāstīja brālim, kā vāvere gatavojas ziemai.',question:'Ko Elza izlasīja otrajā dienā?',options:['Astoņas lappuses','Sešas lappuses','Desmit lappuses'],answer:'Astoņas lappuses',word:'grāmata',masked:'gr_mata',missing:'ā'},
 {title:'Rudens parks',easyText:'Rūta ar tēti gāja parkā. Viņi redzēja vāveres. Sāka līt, tāpēc abi gāja mājās.',syllables:'vā-ve-re',text:'Pēc stundām Rūta kopā ar tēti aizgāja uz parku. Viņi ieraudzīja trīs vāveres un piecus baložus. Rūta paņēma līdzi siltu tēju. Kad sāka līt, abi devās mājās.',question:'Kāpēc Rūta un tētis devās mājās?',options:['Sāka līt','Viņi satika skolotāju','Beidzās tēja'],answer:'Sāka līt',word:'vāvere',masked:'v_vere',missing:'ā'},
 {title:'Skolas dārzs',easyText:'Marks katru rītu apskata skolas dārza priedīti. Viņš pārbauda, vai augsne ir mitra.',syllables:'prie-dī-te',text:'Pie skolas bērni iestādīja mazas priedītes. Marks katru rītu pārbaudīja, vai augsne ir mitra. Samanta savāca sausās lapas. Viņi cerēja, ka kociņi izaugs stipri.',question:'Ko Marks pārbaudīja katru rītu?',options:['Vai augsne ir mitra','Cik lapu nokritis','Vai skan zvans'],answer:'Vai augsne ir mitra',word:'priedīte',masked:'pried_te',missing:'ī'},
 {title:'Kucēna diena',easyText:'Suns Buks meklēja zilu bumbiņu. Beigās Buks to atrada zem dīvāna.',syllables:'bum-bi-ņa',text:'Mazais suns Buks pazaudēja savu zilo bumbiņu. Viņš meklēja to zem galda un pie durvīm. Beigās bumbiņu atrada zem dīvāna. Buks priecīgi lēkāja pa istabu.',question:'Kur atradās zilā bumbiņa?',options:['Zem dīvāna','Pie durvīm','Dārzā'],answer:'Zem dīvāna',word:'bumbiņa',masked:'bumb_ņa',missing:'i'},
 {title:'Klases izbrauciens',easyText:'Klase devās uz muzeju. Bērniem visvairāk patika vecs koka vilciens.',syllables:'vil-ciens',text:'No rīta klase ar autobusu devās uz muzeju. Gids parādīja senas rotaļlietas un dažādus darbarīkus. Visvairāk bērniem patika vecs koka vilciens. Pēc apskates viņi zīmēja savu mīļāko eksponātu.',question:'Kas bērniem patika visvairāk?',options:['Koka vilciens','Skolas autobuss','Tējas krūze'],answer:'Koka vilciens',word:'vilciens',masked:'v_lciens',missing:'i'},
 {title:'Lielā pankūku diena',easyText:'Māsa jauca mīklu. Brālis nomazgāja ābolus. Abi cepa pankūkas.',syllables:'ā-bols',text:'Brīvdienā māsa un brālis gatavoja pankūkas. Māsa sajauca mīklu, bet brālis nomazgāja ābolus. Pēc tam viņi kopā saklāja galdu. Visa ģimene ēda brokastis.',question:'Ko paveica brālis?',options:['Nomazgāja ābolus','Sajauca mīklu','Aizgāja uz veikalu'],answer:'Nomazgāja ābolus',word:'ābols',masked:'_bols',missing:'ā'},
 {title:'Pastaiga gar upi',easyText:'Agate un vectēvs vēroja putnus pie upes. Agate skatījās no attāluma.',syllables:'put-ni',text:'Agate ar vectēvu gāja gar upi. Viņi pamanīja pīles un vienu gulbi. Vectēvs pastāstīja, ka putnus nedrīkst traucēt ligzdošanas laikā. Agate putnus vēroja no attāluma.',question:'Kā Agate vēroja putnus?',options:['No attāluma','No laivas','No koka'],answer:'No attāluma',word:'putni',masked:'p_tni',missing:'u'}
];
const nuts=[
 {place:'uzlīmes',owner:'Liene',unit:'uzlīmes',box:'aploksnes',extra:'zīmulis'},
 {place:'kartiņas',owner:'Rihards',unit:'kartiņas',box:'paciņas',extra:'lineāls'},
 {place:'krāsainos akmentiņus',owner:'Laura',unit:'akmentiņi',box:'maisiņi',extra:'dzēšgumija'},
 {place:'konfektes',owner:'Tomass',unit:'konfektes',box:'kastītes',extra:'pildspalva'},
 {place:'zīmodziņus',owner:'Marta',unit:'zīmodziņi',box:'lādītes',extra:'burtnīca'}
];
function arithmetic(role,seed){
 const level=role==='marks'?1:0,offset=mod(seed*7+(level?11:3),30);
 const a=level?30+offset:12+offset,b=level?9+mod(seed,15):5+mod(seed,10);
 const add=(a+b<=100)?a+b:100;const sub=a+b;
 const x=2+mod(seed+level,9),y=2+mod(seed*3+4,9);
 const list=[
 {id:'add1',kind:'plus',prompt:`${a} + ${b} = ?`,answer:add},
 {id:'sub1',kind:'minus',prompt:`${sub} − ${b} = ?`,answer:a},
 {id:'mult1',kind:'multiply',prompt:`${x} × ${y} = ?`,answer:x*y},
 {id:'div1',kind:'divide',prompt:`${x*y} ÷ ${x} = ?`,answer:y},
 {id:'add2',kind:'plus',prompt:`${14+mod(seed*2,16)} + ${10+mod(seed,15)} = ?`,answer:24+mod(seed*2,16)+mod(seed,15)},
 {id:'sub2',kind:'minus',prompt:`${42+mod(seed,35)} − ${12+mod(seed,12)} = ?`,answer:30+mod(seed,35)-mod(seed,12)},
 {id:'mult2',kind:'multiply',prompt:`${2+mod(seed+5,9)} × ${2+mod(seed+2,9)} = ?`,answer:(2+mod(seed+5,9))*(2+mod(seed+2,9))},
 {id:'div2',kind:'divide',prompt:`${(2+mod(seed+1,9))*(2+mod(seed+6,9))} ÷ ${2+mod(seed+1,9)} = ?`,answer:2+mod(seed+6,9)}
 ];
 return list;
}
export function getDailyFoundations(role,date){
 if(!['marks','samanta'].includes(role)||!validFoundationDate(date))throw Error('Nederīga dienas pamatprasmju misija.');
 const seed=dayNumber(date),variant=mod(seed+(role==='marks'?0:3),templates.length),story=templates[variant];
 const groups=2+mod(seed+(role==='marks'?2:0),4),per=3+mod(seed*3+(role==='marks'?1:0),6),given=1+mod(seed,Math.min(6,groups*per-1)),irrelevant=3+mod(seed,6),product=groups*per,total=product-given,nutTemplate=nuts[mod(seed+(role==='marks'?0:2),nuts.length)];
 const nut={
  story:`${nutTemplate.owner} sakrāja ${groups} ${nutTemplate.box}. Katrā ir ${per} ${nutTemplate.unit}. Viņš/viņa atdeva draugam ${given} ${nutTemplate.unit}. Blakus uz galda atrodas arī ${irrelevant} ${nutTemplate.extra}. Cik ${nutTemplate.unit} palika?`,
  question:`Cik ${nutTemplate.unit} palika?`,
  facts:[{id:'groups',label:`${groups} ${nutTemplate.box}`,value:groups},{id:'per',label:`${per} ${nutTemplate.unit} katrā`,value:per},{id:'given',label:`${given} atdotas`,value:given},{id:'irrelevant',label:`${irrelevant} ${nutTemplate.extra}`,value:irrelevant}],
  needed:['groups','per','given'],questionOptions:[`Cik ${nutTemplate.unit} palika?`,`Cik ${nutTemplate.extra} ir uz galda?`,`Cik ${nutTemplate.box} ir kopā?`],
  firstOperation:'multiply',secondOperation:'subtract',firstAnswer:product,answer:total,
  firstPrompt:`${groups} × ${per} = ?`,secondPrompt:`${product} − ${given} = ?`, operations:['multiply','add','subtract','divide'],
  explanation:`Vispirms ${groups} × ${per} = ${product}, pēc tam ${product} − ${given} = ${total}. ${irrelevant} ${nutTemplate.extra} aprēķinam nav vajadzīgi.`
 };
 return {role,date,math:arithmetic(role,seed),language:{...story,text:role==='samanta'?story.easyText:story.text,questions:[{id:'read',prompt:story.question,options:story.options,answer:story.answer},{id:'spell',prompt:`Ieraksti trūkstošo burtu vārdā ${story.masked}`,answer:story.missing},{id:'meaning',prompt:'Kāds ir galvenais notikums izlasītajā tekstā?',options:[`Stāsts par: ${story.title.toLowerCase()}`,'Stāsts par kosmosa ceļojumu','Stāsts par zemūdeni'],answer:`Stāsts par: ${story.title.toLowerCase()}`},{id:'write',prompt:`Uzraksti visu vārdu bez izlaistajiem burtiem: ${story.masked}`,answer:story.word}]},nut};
}
export function foundationWeekId(date){if(!validFoundationDate(date))throw Error('Nederīgs datums');return Math.floor((dayNumber(date)+3)/7);}
export const FOUNDATION_LABELS={math:'Ātrie aprēķini',language:'Lasu un rakstu',nut:'Cietais rieksts'};
export function foundationScore(part,mission,answers){
 if(part==='math')return {correct:mission.math.filter(q=>String(answers[q.id]??'').trim()===String(q.answer)).length,total:mission.math.length};
 if(part==='language')return {correct:mission.language.questions.filter(q=>String(answers[q.id]??'').trim().toLocaleLowerCase('lv')===String(q.answer).toLocaleLowerCase('lv')).length,total:mission.language.questions.length};
 if(part==='nut'){
  const a=answers||{},n=mission.nut;
  return {correct:Number(n.needed.length===n.facts.filter(f=>a.facts?.includes(f.id)).length&&n.needed.every(id=>a.facts?.includes(id)))+
    Number(a.question===n.question)+Number(a.firstOperation===n.firstOperation)+Number(a.secondOperation===n.secondOperation)+Number(Number(a.firstAnswer)===n.firstAnswer&&String(a.firstAnswer??'').trim()!=='')+Number(Number(a.answer)===n.answer&&String(a.answer??'').trim()!==''),total:6};
 }
 throw Error('Nezināma pamatprasme');
}
