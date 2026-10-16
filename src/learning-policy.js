export const POINTS_VERSION=3;
export const REWARD_CAP=20;
export const DAILY_EFFORT_CAP=6;
export const CHILD_UIDS={marks:'w4nbeq1UguRFrvdwVSFOkk46zXA2',samanta:'txTRitErw8c4NRK87v1JFrFkoPa2'};
export const dayKey=value=>{
 const ms=typeof value?.toMillis==='function'?value.toMillis():typeof value?.seconds==='number'?value.seconds*1000:value instanceof Date?value.getTime():typeof value==='number'?value:Date.parse(value||'');
 return Number.isFinite(ms)?new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ms)):null;
};
export function rigaDayStart(day){
 let ms=Date.parse(day+'T00:00:00Z');if(!Number.isFinite(ms))throw Error('Nederīgs datums');
 const wanted=ms,formatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
 for(let i=0;i<3;i++){const p=Object.fromEntries(formatter.formatToParts(new Date(ms)).map(x=>[x.type,x.value]));ms+=wanted-Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day),Number(p.hour),Number(p.minute),Number(p.second));}
 return new Date(ms);
}
export function rigaDayEnd(day){const next=new Date(Date.parse(day+'T00:00:00Z')+86400000).toISOString().slice(0,10);return new Date(rigaDayStart(next).getTime()-1);}
export function readNotes(row){try{const n=typeof row.notes==='string'?JSON.parse(row.notes):row.notes;return n&&typeof n==='object'?n:{};}catch{return {};}}
export function describeActivity(row){
 const notes=readNotes(row),parts=String(row.activityType||'').split(' · ').map(x=>x.trim());
 const knownModes=['learn','practice','exam','speed','review','errors','mistakes'];
 const mode=knownModes.includes(row.mode)?row.mode:knownModes.includes(notes.mode)?notes.mode:[...parts].reverse().find(x=>knownModes.includes(x))||'practice';
 const text=String(row.subject||'')+' '+parts[0];
 const subjectId=row.subjectId||(/matemāt|reizrēķ|reizin|dalīš|saskait|kristālu|multiply|divide|family|story/i.test(text)?'math':/angļu|english/i.test(text)?'english':/latvie|literat|dzeja|dzejas|teikumu/i.test(text)?'language':null);
 const base=parts.filter(x=>!knownModes.includes(x)).join(' · ');
 const topicId=row.topicId||notes.topicId||base||'unknown';
 return {mode,subjectId,topicId,diagnostic:parts[0]==='starta-misija-v1'||notes.kind==='baseline',quick:parts[0]==='Reizrēķins'&&parts.length===1&&!notes.total,notes};
}
export function calculatePracticePoints({correct,total,maxStreak=0,mode='practice'}={}){
 if(!Number.isInteger(total)||total<1||!Number.isInteger(correct)||correct<0||correct>total)throw Error('Nederīgs rezultāts');
 const percent=Math.round(correct*100/total),eligible=['practice','exam','speed'].includes(mode);
 const base=!eligible?0:percent<40?0:percent<60?4:percent<75?8:percent<90?12:18;
 const streakBonus=eligible&&percent>=40?Number(maxStreak>=5)+Number(maxStreak>=10):0;
 return {percent,base,streakBonus,potential:Math.min(REWARD_CAP,base+streakBonus),eligible,cap:REWARD_CAP,mode,effort:2};
}
export function previewImprovement(before,potential){const best=Math.max(Number(before)||0,Math.min(REWARD_CAP,potential));return {earned:Math.max(0,best-(Number(before)||0)),best,improvement:Math.max(0,best-(Number(before)||0)),effortBonus:0};}
export function calculateChildPoints(role,records=[],now=new Date(),expectedUid=CHILD_UIDS[role]){
 const today=dayKey(now),best=new Map(),effortDay=new Map(),effortTopics=new Set(),subjects=new Map(),special=new Set(),taskBonuses=new Set(),attempts=new Set(),events=[];
 let totalEarned=0,todayEarned=0,activityCount=0;
 if(!['marks','samanta'].includes(role)||!expectedUid)return {totalEarned:0,todayEarned:0,balance:0,activityCount:0,crystals:[],events:[],goal:250,remaining:250,provisional:true};
 const sorted=[...records].sort((a,b)=>{
  const ms=x=>Date.parse(x.completedAt||'')||(typeof x.recordedAt?.seconds==='number'?x.recordedAt.seconds*1000+(x.recordedAt.nanoseconds||0)/1e6:Date.parse(x.recordedAt||'')||0);
  return ms(a)-ms(b)||String(a.attemptId||a.id||'').localeCompare(String(b.attemptId||b.id||''));
 });
 for(const row of sorted){
  if(row.studentRole!==role||row.studentUid!==expectedUid||!Number.isFinite(row.score)||row.score<0||row.score>100)continue;
  const d=describeActivity(row),day=dayKey(row.completedAt||row.recordedAt);
  if(!day||d.diagnostic||d.quick||!d.subjectId)continue;
  const attempt=row.attemptId||row.id;if(attempt&&attempts.has(attempt))continue;if(attempt)attempts.add(attempt);
  const topic=d.subjectId+'|'+d.topicId,percent=row.score,streak=Number(d.notes.maxStreak??d.notes.bestStreak??d.notes.streak)||0;
  const independent=['practice','exam','speed'].includes(d.mode);
  const missionId=d.notes.missionId;
  const newMission=role==='marks'&&['oct26-poetry','oct26-morphology','oct26-family'].includes(missionId);
  const potential=independent?Math.min(20,(percent<40?0:percent<60?4:percent<75?8:percent<90?12:18)+(percent>=40?Number(streak>=5)+Number(streak>=10):0)):0;
  const mastery=Math.max(0,potential-(best.get(topic)||0));best.set(topic,Math.max(best.get(topic)||0,potential));
  const effortKey=day+'|'+topic;let effort=0;
  if(!effortTopics.has(effortKey)){effort=Math.min(2,DAILY_EFFORT_CAP-(effortDay.get(day)||0));effortTopics.add(effortKey);effortDay.set(day,(effortDay.get(day)||0)+effort);}
  if(!subjects.has(day))subjects.set(day,new Set());
  const set=subjects.get(day),before=set.size;set.add(d.subjectId);const dailyBonus=before<3&&set.size===3?10:0;
  let missionBonus=0;
  for(const [key,label,threshold,bonus] of [['split','Kristālu kalve',85,10],['sentence','Teikumu pūķa akadēmija',85,10],['poetry','Dzejas superizaicinājums',85,day<'2026-10-14'?20:15],['addition','Saskaitīšanas pērles',80,15]])
   if(!(newMission&&key==='poetry')&&String(row.activityType||'').startsWith(label)&&independent&&percent>=threshold&&!special.has(key)){special.add(key);missionBonus+=bonus;}
  // Samantas dabaszinību NPD: zelta bonuss +20 BP vienreiz pie >=80%.
  // Saglabātās atbildes un piecas zelta zvaigznes netiek izmantotas papildpunktu fermošanai.
  if(role==='samanta'&&d.subjectId==='nature'&&d.mode==='exam'&&
     d.topicId==='dabas_teritorijas_npd'&&percent>=80&&!special.has('samanta-nature-npd')){
   special.add('samanta-nature-npd');missionBonus+=20;
  }
  // Pastāvīgās 2026. gada oktobra misijas: unikālais ID ir ierakstīts rezultātā.
  // Iepriekš saglabātos ierakstus bez missionId nepārrēķina pēc jaunajiem noteikumiem.
  const missionRules={
   'oct26-poetry':{subject:'language',topic:null,min:85,bonus:15},
   'oct26-morphology':{subject:'language',topic:'morfemas',min:85,bonus:15},
   'oct26-family':{subject:'math',topic:'family',min:80,bonus:5}
  };
  if(newMission){
   const rule=missionRules[missionId];
   if(day>='2026-10-14'&&d.mode==='exam'&&d.subjectId===rule.subject&&
      (!rule.topic||d.topicId===rule.topic)&&percent>=rule.min&&!special.has(missionId)){
    special.add(missionId);missionBonus+=rule.bonus;
   }
  }else{
   // Vēsturiskās 14.–15. oktobra piemaksas paliek nemainīgas, lai nepazustu BP.
   if(role==='marks'&&independent&&day>='2026-10-14'&&day<='2026-10-15'&&d.mode==='exam'&&
      d.topicId==='morfemas'&&d.subjectId==='language'&&percent>=85&&!special.has('npd-morfemas')){
     special.add('npd-morfemas');missionBonus+=15;
   }
   if(role==='marks'&&day==='2026-10-14'&&independent&&d.mode==='exam'&&
      (d.topicId==='family'||String(row.activityType||'').startsWith('family ·'))&&
      d.subjectId==='math'&&percent>=80&&!special.has('daily-family')){
     special.add('daily-family');missionBonus+=5;
   }
  }
  let assignedBonus=0;if(row.taskId&&row.taskQualified===true&&!taskBonuses.has(row.taskId)&&Number.isInteger(row.taskBonus)&&row.taskBonus>=0&&row.taskBonus<=30){assignedBonus=row.taskBonus;taskBonuses.add(row.taskId);}
  const earned=mastery+effort+dailyBonus+missionBonus+assignedBonus;totalEarned+=earned;if(day===today)todayEarned+=earned;activityCount++;
  events.push({attemptId:attempt,day,topicId:d.topicId,mastery,effort,dailyBonus,missionBonus,assignedBonus,earned,balance:totalEarned});
 }
 return {version:POINTS_VERSION,totalEarned,todayEarned,spent:0,balance:totalEarned,provisional:true,activityCount,goal:250,remaining:Math.max(0,250-totalEarned),crystals:[...(subjects.get(today)||[])],events};
}
