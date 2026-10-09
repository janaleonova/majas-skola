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
export async function createTask({ title, subject, assignedTo, description, dueDate, createdByUid }) {
  if (!db) return null;
  const path = 'homeSchool/data/tasks';
  try {
    const taskPayload = {
      title,
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
export async function updateTaskStatus(taskId, status) {
  if (!db || !taskId) return false;
  const path = `homeSchool/data/tasks/${taskId}`;
  try {
    await updateDoc(getTaskDocRef(taskId), {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    return false;
  }
}

/**
 * Reģistrē progresu vai treniņa rezultātu.
 * DROŠĪBA: Obligāti piesaista autentificētā lietotāja UID (studentUid),
 * lai bērns nevarētu viltot cita bērna rezultātus.
 */
export async function recordProgress({ studentRole, activityType, subject, score, notes, currentUid }) {
  if (!db) return null;
  const path = 'homeSchool/data/progress';
  const effectiveUid = currentUid || auth?.currentUser?.uid || null;

  try {
    const progressPayload = {
      studentUid: effectiveUid,
      studentRole: studentRole, // 'marks' vai 'samanta'
      activityType: activityType || 'trenins',
      subject: subject || 'Mācības',
      score: typeof score === 'number' ? score : 100,
      notes: notes || '',
      recordedAt: serverTimestamp()
    };
    const ref = await addDoc(getProgressColRef(), progressPayload);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
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
