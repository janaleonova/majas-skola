// Mājas skola — versija 2: bērniem draudzīga, motivējoša punktu metodika.
// Katrs ieguldītais darbs, mācīšanās un kļūdu labošana tiek apbalvota ar BP.
export const POINTS_VERSION = 2;
export const REWARD_CAP = 20;

export function calculatePracticePoints({correct,total,maxStreak=0,mode='practice'}={}){
  if(!Number.isInteger(total)||total<=0||!Number.isInteger(correct)||correct<0||correct>total)throw new Error('Nederīgs rezultāts');
  const percent=Math.round(100*correct/total);

  let base=0;
  if(mode==='learn'){
    // Mācību režīmā apbalvojam izziņas procesu un iedziļināšanos
    base=Math.max(6,Math.floor(6+(percent*8)/100)); // 6 līdz 14 BP
  }else if(mode==='mistakes'||mode==='errors'||mode==='review'){
    // Kļūdu labošana ir vērtīgākais mācīšanās brīdis — apbalvojam papildus!
    base=Math.max(8,Math.floor(8+(percent*8)/100)); // 8 līdz 16 BP
  }else{
    // Standarta treniņš un pārbaudes
    const bands=[[0,39,3,6],[40,59,7,10],[60,74,11,14],[75,89,15,17],[90,100,18,20]];
    const band=bands.find(([lo,hi])=>percent>=lo&&percent<=hi)||[0,100,5,15];
    const [lo,hi,low,high]=band;
    base=percent===0?3:Math.min(high,Math.floor(low+(percent-lo)*(high-low)/Math.max(1,hi-lo)));
  }

  // Sērijas bonuss par secīgi pareizām atbildēm
  const streakBonus=(maxStreak>=4?1:0)+(maxStreak>=8?1:0);
  const potential=Math.min(REWARD_CAP,base+streakBonus);
  return {percent,base,streakBonus,potential,eligible:true,cap:REWARD_CAP,mode};
}

export function previewImprovement(bestBefore,potential){
  const before=Math.max(0,Math.min(REWARD_CAP,Number(bestBefore)||0));
  const newBest=Math.max(before,Math.min(REWARD_CAP,potential));
  const diff=newBest-before;
  // Neatlaidības bonuss: pat ja iepriekš jau bija labs rezultāts, par katru pabeigtu treniņu piešķir +2 BP!
  const effortBonus=diff===0&&potential>=8?2:0;
  const earned=Math.max(diff,effortBonus);
  return {earned,best:newBest,improvement:diff,effortBonus};
}

