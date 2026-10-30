export const SUBJECTS=[{id:'language',name:'Latviešu valoda un literatūra',icon:'📕'},{id:'math',name:'Matemātika',icon:'🧮'},{id:'english',name:'Angļu valoda',icon:'🌎'},{id:'social',name:'Sociālās zinības',icon:'🏛️'},{id:'nature',name:'Dabaszinības',icon:'🌿'}];
export const CATALOG={marks:[
 {id:'latviesu',subjectId:'language',name:'Vārdi, galotnes un saziņa',description:'5 tēmas · vietniekvārdu locīšana (7 locījumi), galotnes, vārddarināšana'},
 {id:'teikumi',subjectId:'language',name:'Teikumu pūķa akadēmija',description:'Vārdšķiras un teikuma centrs',bonus:10,threshold:85,prefix:'Teikumu pūķa akadēmija'},
 {id:'dzeja',subjectId:'language',name:'Dzejas superizaicinājums',description:'Rainis un Juris Kronbergs · lasi un pamato',bonus:15,threshold:85,prefix:'Dzejas superizaicinājums'},
 {id:'matematika',subjectId:'math',name:'Skaitļu misijas',description:'Reizrēķins, dalīšana, darbību secība un stāsti'},
 {id:'kristali',subjectId:'math',name:'Kristālu kalve',description:'Reizināšana, sadalot desmitos un vienos',bonus:10,threshold:85,prefix:'Kristālu kalve'},
 {id:'anglu',subjectId:'english',name:'Angļu valoda & Darba lapa',description:'SR: veidot jautājumus ar am/is/are · 15 jaunie vārdi · dienas un mēneši'},
 {id:'anglu-unit1',subjectId:'english',name:'UNIT 1 · NPD misija 30.10.–03.11.',description:'5 dienas, 15 priekšmeti, valstis un tautības, be, 52 punktu simulācija · līdz +50 BP'},
 {id:'social',subjectId:'social',name:'Sociālās zinības · 4. kl. P.D.',description:'Kā plānot un patērēt resursus saprātīgi? · 8 SR uzdevumi · 43 p.',bonus:20,threshold:80,prefix:'Sociālās zinības'},
 {id:'daba',subjectId:'nature',name:'Dabaszinības · 4. kl. NPD',description:'Kā vairojas, aug un attīstās dzīvie organismi? · 14 SR · 25 p.',bonus:20,threshold:80,prefix:'Dabaszinības 4. kl.'}
],samanta:[
 {id:'daba',subjectId:'nature',name:'Dabas teritorijas · 3. kl. NPD',description:'Kas kopīgs un atšķirīgs mežam, pļavai, purvam un ūdeņiem · +20 BP',bonus:20,threshold:80,prefix:'Dabas teritorijas'},
 {id:'saskaitisana',subjectId:'math',name:'Saskaitīšanas pērles',description:'3 paņēmieni un summas līdz 100',bonus:15,threshold:80,prefix:'Saskaitīšanas pērles'},
 {id:'matematika',subjectId:'math',name:'Skaitļu piedzīvojums',description:'Reizrēķins, dalīšana, attēli un stāsti'},
 {id:'latviesu',subjectId:'language',name:'Valodas dārzs',description:'Lasīšana, vārdšķiras un trūkstošie burti'},
 {id:'anglu',subjectId:'english',name:'Angļu valodas dārzs',description:'Krāsas, dzīvnieki, skaitļi un ikdiena'}
]};
export function taskStatus(task,role){return task.completions?.[role]?.status||(task.assignedTo==='both'?'pending':task.status)||'pending';}
export function taskState(task,role,today){if(taskStatus(task,role)==='completed')return 'completed';if(task.startDate&&task.startDate>today)return 'scheduled';if(task.dueDate&&task.dueDate<today)return 'expired';return 'available';}
export function qualifiesTask(task,row,mode,day){return task.moduleId===row.moduleId&&(!task.startDate||task.startDate<=day)&&(!task.dueDate||task.dueDate>=day)&&(!task.requiredMode||task.requiredMode==='any'||task.requiredMode===mode)&&row.score>=(task.targetScore||0);}
