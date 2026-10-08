/**
 * Mājas skolas datu serviss
 * Nodrošina izolētu datu piekļuvi Cloud Firestore zem 'homeSchool' datu struktūras.
 * Aizsargā visus datorika-hub esošos datus no jebkādas pārrakstīšanas.
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
import { db, handleFirestoreError, OperationType } from './init.js';

/**
 * Trīs atbalstītās lomas Mājas skolā
 */
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
    description: 'Pārvaldība, uzdevumu izveide, progresa pārskats'
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
 * Droši kolekciju ceļi — visi atrodas TIKAI zem 'homeSchool/data/...'
 * Tas garantē, ka netiek skartas nevienas esošās datorika-hub kolekcijas.
 */
export const HS_PATHS = {
  ROOT: 'homeSchool',
  USERS: ['homeSchool', 'data', 'users'],
  TASKS: ['homeSchool', 'data', 'tasks'],
  PROGRESS: ['homeSchool', 'data', 'progress'],
  SETTINGS: ['homeSchool', 'data', 'settings']
};

function getUsersCollection() {
  return collection(db, ...HS_PATHS.USERS);
}

function getTasksCollection() {
  return collection(db, ...HS_PATHS.TASKS);
}

function getProgressCollection() {
  return collection(db, ...HS_PATHS.PROGRESS);
}

function getSettingsCollection() {
  return collection(db, ...HS_PATHS.SETTINGS);
}

/**
 * Iegūst lietotāja profilu un lomu Mājas skolā pēc Auth UID
 */
export async function getUserProfile(uid) {
  if (!db || !uid) return null;
  const path = `homeSchool/data/users/${uid}`;
  try {
    const docRef = doc(db, ...HS_PATHS.USERS, uid);
    const snap = await getDoc(docRef);
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
 * Saglabā vai atjaunina lietotāja lomu Mājas skolā
 */
export async function setUserRole(uid, { role, email, displayName }) {
  if (!db || !uid) return false;
  const path = `homeSchool/data/users/${uid}`;
  try {
    const docRef = doc(db, ...HS_PATHS.USERS, uid);
    const payload = {
      uid,
      email: email || '',
      displayName: displayName || '',
      role: role || ROLES.PARENT,
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return false;
  }
}

/**
 * Iegūst uzdevumus atkarībā no lomas (vecāks redz visus, Marks/Samanta savējos)
 */
export async function getTasks(role) {
  if (!db) return [];
  const path = 'homeSchool/data/tasks';
  try {
    let q;
    if (role === ROLES.PARENT || !role) {
      q = query(getTasksCollection(), orderBy('createdAt', 'desc'));
    } else {
      q = query(
        getTasksCollection(),
        where('assignedTo', 'in', [role, 'both']),
        orderBy('createdAt', 'desc')
      );
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    // Ja indeksēšana Firestore vēl nav veikta vai kļūda, mēģinām vienkāršu vaicājumu
    try {
      const snap = await getDocs(getTasksCollection());
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      if (role === ROLES.PARENT || !role) return all;
      return all.filter(t => t.assignedTo === role || t.assignedTo === 'both');
    } catch (fallbackError) {
      handleFirestoreError(fallbackError, OperationType.LIST, path);
      return [];
    }
  }
}

/**
 * Reāllaika klausītājs uzdevumiem
 */
export function subscribeTasks(role, callback) {
  if (!db) return () => {};
  const path = 'homeSchool/data/tasks';
  try {
    const q = getTasksCollection();
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      const filtered = (role === ROLES.PARENT || !role)
        ? tasks
        : tasks.filter(t => t.assignedTo === role || t.assignedTo === 'both');
      callback(filtered);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  } catch (error) {
    console.error('[Mājas skola] Neizdevās pievienot uzdevumu klausītāju:', error);
    return () => {};
  }
}

/**
 * Pievieno jaunu uzdevumu (tikai no vecāka lomas)
 */
export async function createTask({ title, subject, assignedTo, description, dueDate, createdBy }) {
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
      createdBy: createdBy || 'vecaks',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const ref = await addDoc(getTasksCollection(), taskPayload);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
}

/**
 * Atjaunina uzdevuma statusu ('pending', 'in_progress', 'completed')
 */
export async function updateTaskStatus(taskId, status) {
  if (!db || !taskId) return false;
  const path = `homeSchool/data/tasks/${taskId}`;
  try {
    const docRef = doc(db, ...HS_PATHS.TASKS, taskId);
    await updateDoc(docRef, {
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
 * Reģistrē progresu vai treniņa rezultātu
 */
export async function recordProgress({ studentRole, activityType, subject, score, notes }) {
  if (!db) return null;
  const path = 'homeSchool/data/progress';
  try {
    const progressPayload = {
      studentRole,
      activityType: activityType || 'trenins',
      subject: subject || 'Mācības',
      score: typeof score === 'number' ? score : 100,
      notes: notes || '',
      recordedAt: serverTimestamp()
    };
    const ref = await addDoc(getProgressCollection(), progressPayload);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
}

/**
 * Iegūst progresa ierakstus
 */
export async function getProgressHistory(studentRole) {
  if (!db) return [];
  const path = 'homeSchool/data/progress';
  try {
    const snap = await getDocs(getProgressCollection());
    const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!studentRole) return all;
    return all.filter(p => p.studentRole === studentRole);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}
