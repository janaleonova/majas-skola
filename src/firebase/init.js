/**
 * Firebase inicializācijas modulis lietotnei Mājas skola
 * Savienojas ar Firebase projektu datorika-hub (lietotne: majas-skola)
 * Konfigurācija tiek droši iegūta no vides mainīgajiem caur /api/firebase-config
 */
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer 
} from 'firebase/firestore';

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;
let isConfigured = false;

/**
 * Droša kļūdu apstrāde un diagnostika atbilstoši Firestore drošības prasībām
 */
export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Inicializē Firebase, iegūstot konfigurāciju no vides mainīgajiem caur serveri
 */
export async function initFirebase() {
  if (app && auth && db) {
    return { app, auth, db, authAvailable: true, isConfigured };
  }

  try {
    const res = await fetch('/api/firebase-config');
    if (!res.ok) {
      throw new Error(`Neizdevās saņemt Firebase konfigurāciju: ${res.statusText}`);
    }
    const config = await res.json();

    if (!config.apiKey || config.apiKey.trim() === '') {
      console.warn('[Firebase] FIREBASE_API_KEY nav iestatīts vides mainīgajos (.env). Integrācija sagatavota gaidīšanas režīmā.');
      isConfigured = false;
      return { app: null, auth: null, db: null, authAvailable: false, isConfigured: false };
    }

    // Izmanto tikai sešus konfigurācijā pieejamos parametrus (bez measurementId / Analytics)
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain || 'datorika-hub.firebaseapp.com',
      projectId: config.projectId || 'datorika-hub',
      storageBucket: config.storageBucket || 'datorika-hub.firebasestorage.app',
      messagingSenderId: config.messagingSenderId,
      appId: config.appId
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    isConfigured = true;

    // Pārbauda savienojumu ar Firestore, neizdarot nekādas datu izmaiņas
    testFirestoreConnection();

    return { app, auth, db, authAvailable: true, isConfigured: true };
  } catch (error) {
    console.error('[Firebase] Inicializācijas kļūda:', error);
    return { app: null, auth: null, db: null, authAvailable: false, isConfigured: false, error };
  }
}

/**
 * Pārbauda savienojumu ar Firestore serveri (tikai lasīšanas pārbaude)
 */
async function testFirestoreConnection() {
  if (!db) return;
  try {
    await getDocFromServer(doc(db, 'homeSchool', 'testConnection'));
    console.log('[Firebase] Savienojums ar datorika-hub Firestore veiksmīgi apstiprināts.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Klients šobrīd ir bezsaistē vai nav pieejams tīkls.');
    } else {
      console.info('[Firebase] Savienojuma pārbaude izpildīta:', error.message);
    }
  }
}

export { app, auth, db, googleProvider, isConfigured };
export { signInWithPopup, signOut, onAuthStateChanged };
