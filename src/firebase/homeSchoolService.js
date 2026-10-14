/**
 * Mājas skolas datu serviss
 * Nodrošina izolētu datu piekļuvi Cloud Firestore zem 'homeSchool/data/...' struktūras.
 * Datu modelis:
 *   - Kolekcija: 'homeSchool'
 *   - Dokumenta ceļš: 'homeSchool/data'
 *   - Apakškolekcijas:
 *       - 'homeSchool/data/users/{uid}'
 *       - 'homeSchool/data/tasks/{taskId}'
 *       - 'homeSchool/data/progress/{progressId}'
 *       - 'homeSchool/data/settings/{settingId}'
 * Aizsargā visus datorika-hub esošos datus un novērš neatļautu lomu maiņu.
 */
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import {qualifiesTask} from '../catalog.js';
import {dayKey,describeActivity,POINTS_VERSION} from '../learning-policy.js';
import { db, auth, handleFirestoreError, OperationType } from './init.js';

export const ROLES = {
  PARENT: 'vecaks',
  MARKS: 'marks',
  SAMANTA: 'samanta'
};

export const ROLE_DETAILS = {
  [ROLES.PARENT]: {
    id: 'vecaks',
    title: 'Vecāka panelis',
    symbol: '📋',
    canCreateTasks: true,
    canViewAll: true,
    description: 'Pārvaldība, uzdevumu izveide, abu bērnu progresa pārskats'
  },
  [ROLES.MARKS]: {
    id: 'marks',
    title: 'Marka skola',
    symbol: '🐉',
    canCreateTasks: false,
    canViewAll: false,
    description: 'Mācību spēles, treniņi un sasniegumi'
  },
  [ROLES.SAMANTA]: {
    id: 'samanta',
    title: 'Samantas skola',
    symbol: '🎨',
    canCreateTasks: false,
    canViewAll: false,
    description: 'Mācību priekšmeti, nedēļas plāns un progress'
  }
};

/**
 * Pārbaudītas palīgfunkcijas precīziem Firestore ceļiem:
 * 'homeSchool/data' kā dokuments un apakškolekcijas tajā
 */
export function getHomeSchoolDocRef() {
  if (!db) return null;
  return doc(db, 'homeSchool', 'data');
}

export function getUsersColRef() {
  if (!db) return null;
  return collection(db, 'homeSchool', 'data', 'users');
}

export function getUserDocRef(uid) {
  if (!db || !uid) return null;
  return doc(db, 'homeSchool', 'data', 'users', uid);
}

export function getTasksColRef() {
  if (!db) return null;
  return collection(db, 'homeSchool', 'data', 'tasks');
}

export function getTaskDocRef(taskId) {
  if (!db || !taskId) return null;
  return doc(db, 'homeSchool', 'data', 'tasks', taskId);
}

export function getProgressColRef() {
  if (!db) return null;
  return collection(db, 'homeSchool', 'data', 'progress');
}

export function getProgressDocRef(progressId) {
  if (!db || !progressId) return null;
  return doc(db, 'homeSchool', 'data', 'progress', progressId);
}

export function getSettingsColRef() {
  if (!db) return null;
  return collection(db, 'homeSchool', 'data', 'settings');
}

export function getSettingsDocRef(settingId = 'config') {
  if (!db) return null;
  return doc(db, 'homeSchool', 'data', 'settings', settingId);
}

/**
 * Pārbauda, vai lietotāja UID ir reģistrēts kā vecāks settings konfigurācijā
 */
export async function verifyParentAuthority(uid) {
  if (!db || !uid) return false;
  try {
    const configSnap = await getDoc(getSettingsDocRef('config'));
    if (configSnap.exists()) {
      const parentUids = configSnap.data().parentUids || [];
      if (parentUids.includes(uid)) return true;
    }
    // Pārbauda paša lietotāja uzticamo profilu datubāzē
    const userSnap = await getDoc(getUserDocRef(uid));
    if (userSnap.exists() && userSnap.data().role === ROLES.PARENT && userSnap.data().approved === true) {
      return true;
    }
  } catch (err) {
    console.warn('[Mājas skola] Vecāka autorizācijas pārbaude:', err.message);
  }
  return false;
}

/**
 * Iegūst lietotāja profilu un lomu Mājas skolā pēc Auth UID
 */
export async function getUserProfile(uid) {
  if (!db || !uid) return null;
  const path = `homeSchool/data/users/${uid}`;
  try {
    const snap = await getDoc(getUserDocRef(uid));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

/**
 * Reģistrē vai atjaunina lietotāja profilu.
 * DROŠĪBA: Lietotājs pats NEDRĪKST piešķirt sev 'vecaks' lomu.
 * 'vecaks' loma tiek piešķirta TIKAI tad, ja UID atbilst reģistrētam vecākam.
 */
export async function registerUserProfile(uid, { requestedRole, email, displayName, configuredParentUid = null }) {
  if (!db || !uid) return false;
  const path = `homeSchool/data/users/${uid}`;

  try {
    const existing = await getUserProfile(uid);

    let finalRole = requestedRole;
    let isApproved = false;

    // Ja lietotājs pieprasa vecāka lomu:
    if (requestedRole === ROLES.PARENT) {
      // Pārbauda vai šis UID sakrīt ar konfigurēto vecāka UID vai jau apstiprinātu vecāku
      const isAuthorizedParent = (configuredParentUid && configuredParentUid === uid) ||
                                 (existing?.role === ROLES.PARENT && existing?.approved === true) ||
                                 (await verifyParentAuthority(uid));

      if (isAuthorizedParent) {
        finalRole = ROLES.PARENT;
        isApproved = true;
      } else {
        console.warn(`[Drošība] Lietotājs ${uid} mēģināja sev patvaļīgi piešķirt vecāka lomu. Piešķiršana noraidīta.`);
        // Drošības nolūkos neļaujam kļūt par vecāku — novirzām uz apstiprināšanas gaidīšanu
        finalRole = existing?.role || ROLES.MARKS;
        isApproved = existing?.approved || false;
      }
    } else if (requestedRole === ROLES.MARKS || requestedRole === ROLES.SAMANTA) {
      // Bērna lomas reģistrācija
      finalRole = requestedRole;
      isApproved = true; // Ģimenes lietotājs aktīvs
    } else {
      finalRole = ROLES.MARKS;
      isApproved = true;
    }

    const payload = {
      uid,
      email: email || '',
      displayName: displayName || '',
      role: finalRole,
      approved: isApproved,
      updatedAt: serverTimestamp()
    };

    if (!existing) {
      payload.createdAt = serverTimestamp();
    }

    await setDoc(getUserDocRef(uid), payload, { merge: true });
    return { success: true, role: finalRole, approved: isApproved };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error };
  }
}

/**
 * Iegūst uzdevumus atkarībā no lomas.
 * Vecāks redz visus uzdevumus.
 * Bērns (Marks vai Samanta) redz TIKAI sev un abiem piešķirtos uzdevumus.
 */
export async function getTasks(role) {
  if (!db) return [];
  const path = 'homeSchool/data/tasks';
  const colRef = getTasksColRef();
  try {
    if (role === ROLES.PARENT || !role) {
      const snap = await getDocs(colRef);
      return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => (b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    }
    // Child-readable, index-free queries. Never fall back to listing all tasks.
    const [own, shared] = await Promise.all([
      getDocs(query(colRef, where('assignedTo','==',role))),
      getDocs(query(colRef, where('assignedTo','==','both')))
    ]);
    const map = new Map();
    for (const snap of [own,shared]) for (const d of snap.docs) map.set(d.id,{id:d.id,...d.data()});
    return [...map.values()].sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
  } catch (error) {
    console.warn('[Mājas skola] Uzdevumu vaicājums:',error?.code || 'unknown');
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Pievieno jaunu uzdevumu (atļauts tikai vecākam)
 */
export async function createTask({ title, subject, assignedTo, description, dueDate, startDate, moduleId, daily=false, bonusBP=0, targetScore=0, requiredMode='any', createdByUid }) {
  if (!db) return null;
  const path = 'homeSchool/data/tasks';
  try {
    const taskPayload = {
      title: String(title||'').trim().slice(0,120),
      moduleId: moduleId || null,
      daily: Boolean(daily),
      bonusBP:Math.max(0,Math.min(30,Math.floor(Number(bonusBP)||0))),
      targetScore:Math.max(0,Math.min(100,Math.floor(Number(targetScore)||0))),
      requiredMode,
      startDate: startDate || dayKey(new Date()),
      completions: {},
      subject: subject || 'Vispārīgi',
      assignedTo: assignedTo || 'both',
      description: description || '',
      status: 'pending',
      dueDate: dueDate || null,
      createdBy: createdByUid || auth?.currentUser?.uid || 'vecaks',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const ref = await addDoc(getTasksColRef(), taskPayload);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
}

/**
 * Atjaunina uzdevuma statusu
 */
export async function updateTaskStatus(taskId,status,childRole=null,attemptId=null) {
 if(!db||!auth.currentUser)throw Error('Nepieciešama pieteikšanās.');
 if(!['completed','pending'].includes(status))throw Error('Nederīgs statuss.');
 const profile=await getUserProfile(auth.currentUser.uid);
 const role=profile?.role===ROLES.PARENT?childRole:profile?.role;
 if(!['marks','samanta'].includes(role))throw Error('Izvēlies bērnu.');
 const ref=getTaskDocRef(taskId),snap=await getDoc(ref);
 if(!snap.exists())throw Error('Uzdevums nav atrasts.');
 const task=snap.data();if(!['both',role].includes(task.assignedTo))throw Error('Uzdevums nav piešķirts šim bērnam.');
 if(task.moduleId&&status==='completed'&&!attemptId)throw Error('Vispirms izpildi un saglabā mācību uzdevumu.');
 await updateDoc(ref,{['completions.'+role]:{status,attemptId:attemptId||null,at:new Date().toISOString()},updatedAt:serverTimestamp()});
 return true;
}
export async function editTask(taskId,data){
 const profile=await getUserProfile(auth?.currentUser?.uid);if(profile?.role!==ROLES.PARENT)throw Error('Tikai vecāks var rediģēt uzdevumu.');
 const payload={};for(const key of ['title','description','dueDate','startDate','moduleId','assignedTo','daily','bonusBP','targetScore','requiredMode'])if(key in data)payload[key]=data[key];
 await updateDoc(getTaskDocRef(taskId),{...payload,updatedAt:serverTimestamp()});
}
export async function removeTask(taskId){const p=await getUserProfile(auth?.currentUser?.uid);if(p?.role!==ROLES.PARENT)throw Error('Tikai vecāks.');await deleteDoc(getTaskDocRef(taskId));}

/**
 * Reģistrē progresu vai treniņa rezultātu.
 * DROŠĪBA: Obligāti piesaista autentificētā lietotāja UID (studentUid),
 * lai bērns nevarētu viltot cita bērna rezultātus.
 */
export async function recordProgress(data) {
 if(!db)throw Error('Nav savienojuma ar Firebase.');
 const {studentRole,currentUid,activityType,subject,score,notes}=data;
 const uid=auth?.currentUser?.uid;
 if(!uid||currentUid&&currentUid!==uid||!['marks','samanta'].includes(studentRole))return null;
 const profile=await getUserProfile(uid);if(profile?.role!==studentRole||profile.approved!==true)return null;
 if(!Number.isFinite(score)||score<0||score>100)throw Error('Rezultātam jābūt no 0 līdz 100%.');
 const attemptId=data.attemptId||crypto.randomUUID();
 if(!/^[a-zA-Z0-9_-]{8,100}$/.test(attemptId))throw Error('Nederīgs mēģinājuma ID.');
 const ref=getProgressDocRef(attemptId),existing=await getDoc(ref);
 if(existing.exists()){if(existing.data().studentUid!==uid)throw Error('Mēģinājums pieder citam kontam.');return attemptId;}
 const d=describeActivity(data);
 let taskQualified=false,taskBonus=0;
 if(data.taskId){const taskSnap=await getDoc(getTaskDocRef(data.taskId));if(!taskSnap.exists())throw Error('Uzdevums vairs nav pieejams.');const task=taskSnap.data();if(![studentRole,'both'].includes(task.assignedTo))throw Error('Uzdevums nav piešķirts šim bērnam.');taskQualified=qualifiesTask(task,data,d.mode,dayKey(data.completedAt||new Date()));taskBonus=taskQualified?task.bonusBP||0:0;}
 await setDoc(ref,{
  studentUid:uid,studentRole,activityType:String(activityType||'Treniņš').slice(0,180),subject:String(subject||'Mācības').slice(0,80),score,
  notes:typeof notes==='string'?notes.slice(0,24000):'',attemptId,moduleId:data.moduleId||null,taskId:data.taskId||null,
  subjectId:d.subjectId,topicId:d.topicId,pointsVersion:POINTS_VERSION,
  taskQualified,taskBonus,
  completedAt:data.completedAt||new Date().toISOString(),recordedAt:serverTimestamp()
 });
 return attemptId;
}

/**
 * Iegūst progresa vēsturi:
 * DROŠĪBA:
 * - Vecāks ('vecaks') var saņemt visu bērnu ierakstus.
 * - Bērns (Marks vai Samanta) pieprasa TIKAI savus individuālos rezultātus ar `where('studentUid', '==', userUid)`
 *   vai `where('studentRole', '==', role)`, saskaņā ar Firestore Security Rules prasībām!
 */
export async function getProgressHistory({ role, userUid }) {
  if (!db) return [];
  const path = 'homeSchool/data/progress';
  try {
    const colRef=getProgressColRef();
    if (role !== ROLES.PARENT && !userUid) return [];
    // No orderBy: avoid requiring a composite index for each child's own results.
    // Child queries must be constrained by their authenticated UID.
    const q=role===ROLES.PARENT ? colRef : query(colRef,where('studentUid','==',userUid));
    const snap=await getDocs(q);
    return snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.recordedAt?.seconds||0)-(a.recordedAt?.seconds||0));
  } catch(error){
    console.warn('[Mājas skola] Progresa vaicājums:',error?.code || 'unknown');
    handleFirestoreError(error,OperationType.LIST,path);
    return [];
  }
}

/** Deletes only progress records whose owner is the authenticated parent. */
export async function deleteParentTestProgress(progressIds){
  const parent=auth?.currentUser;
  if(!parent||!db||!Array.isArray(progressIds))throw new Error('Nepieciešama vecāka pieteikšanās.');
  const profile=await getUserProfile(parent.uid);
  if(profile?.role!==ROLES.PARENT)throw new Error('Dzēšana pieejama tikai vecākam.');
  let count=0;
  for(const id of progressIds){
    if(typeof id!=='string'||!id||id.length>200)continue;
    const ref=getProgressDocRef(id);
    const snap=await getDoc(ref);
    if(!snap.exists()||snap.data().studentUid!==parent.uid)continue;
    await deleteDoc(ref);
    count++;
  }
  return count;
}

/**
 * Parent-only reset of progress owned by exactly one child. This never touches
 * user profiles, tasks, settings or unrelated Datorika HUB collections.
 * Firestore Security Rules must independently permit parent deletion.
 */
export async function resetChildProgress(childRole,expectedCount){
 const parent=auth?.currentUser;
 if(!db||!parent)throw new Error('Nepieciešama vecāka pieteikšanās.');
 if(childRole!==ROLES.MARKS&&childRole!==ROLES.SAMANTA)throw new Error('Nepareiza bērna izvēle.');
 const profile=await getUserProfile(parent.uid);
 if(profile?.role!==ROLES.PARENT)throw new Error('Atiestatīšana pieejama tikai vecākam.');
 const identities=await getFamilyIdentities(),childUid=identities[childRole];if(!childUid)throw Error('Bērna konts nav konfigurēts.');
 const docs=await getDocs(query(getProgressColRef(),where('studentUid','==',childUid)));
 if(typeof expectedCount!=='number'||docs.size!==expectedCount)
  throw new Error('Ierakstu skaits ir mainījies. Atjauno lapu un apstiprini vēlreiz.');
 // Check every record's role and ownership before any deletion.
 for(const d of docs.docs)if(d.data().studentUid!==childUid||d.data().studentRole!==childRole)
  throw new Error('Atrasts neatbilstošs ieraksts. Dzēšana pārtraukta.');
 let deleted=0;
 for(const d of docs.docs){await deleteDoc(d.ref);deleted++;}
 return deleted;
}

export async function getFamilyIdentities(){
 if(!db)return {};const profile=await getUserProfile(auth?.currentUser?.uid);if(profile?.role!==ROLES.PARENT)return {};
 const snap=await getDocs(getUsersColRef()),ids={};for(const d of snap.docs){const p=d.data();if(p.approved&&['marks','samanta'].includes(p.role))ids[p.role]=d.id;}return ids;
}
