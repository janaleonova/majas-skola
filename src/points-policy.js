// Mājas skola — versija 1: pārskatāma punktu metodika.
// Pagaidu treniņa novērtējums. Balvu maka ieskaitījumiem vajadzīga servera autorizācija.
export const POINTS_VERSION = 1;
export const REWARD_CAP = 20;
export function calculatePracticePoints({correct,total,maxStreak=0,mode='practice'}={}){
  if(!Number.isInteger(total)||total<=0||!Number.isInteger(correct)||correct<0||correct>total)throw new Error('Nederīgs rezultāts');
  const percent=Math.round(100*correct/total);
  // No prize points in learning and mistake review modes; they remain useful practice.
  if(mode==='learn'||mode==='errors'||mode==='mistakes'||mode==='review')
    return {percent,base:0,streakBonus:0,potential:0,eligible:false,reason:'Mācību vai kļūdu labošanas režīms'};
  const bands=[[0,39,0,3],[40,59,4,7],[60,74,8,11],[75,89,12,15],[90,100,16,18]];
  const band=bands.find(([lo,hi])=>percent>=lo&&percent<=hi);
  const [lo,hi,low,high]=band;
  const base=percent===0?0:Math.min(high,Math.floor(low+(percent-lo)*(high-low)/Math.max(1,hi-lo)));
  const streakBonus=(maxStreak>=5?1:0)+(maxStreak>=10?1:0);
  const potential=Math.min(REWARD_CAP,base+streakBonus);
  return {percent,base,streakBonus,potential,eligible:true,cap:REWARD_CAP};
}
export function previewImprovement(bestBefore,potential){
 const before=Math.max(0,Math.min(REWARD_CAP,Number(bestBefore)||0));
 const after=Math.max(before,Math.min(REWARD_CAP,potential));
 return {earned:after-before,best:after};
}
