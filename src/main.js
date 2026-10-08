/**
 * Mājas skola - Galvenais klients ar Firebase Auth & Firestore integrāciju
 * Izmanto datorika-hub projektu un homeSchool izolēto datu struktūru
 */
import { 
  initFirebase, 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  isConfigured 
} from './firebase/init.js';

import { 
  ROLES, 
  ROLE_DETAILS, 
  getUserProfile, 
  setUserRole, 
  getTasks, 
  createTask, 
  updateTaskStatus, 
  recordProgress, 
  getProgressHistory 
} from './firebase/homeSchoolService.js';

// Globālais stāvoklis
const state = {
  user: null,
  userProfile: null,
  activeRole: null, // 'vecaks' | 'marks' | 'samanta'
  currentView: 'welcome', // 'welcome' | 'marka' | 'samanta' | 'vecaks'
  firebaseReady: false,
  tasks: [],
  progressLogs: []
};

// UI Elementi
const welcomeSection = document.getElementById('welcome');
const schoolSection = document.getElementById('school');
const schoolTitle = document.getElementById('school-title');
const schoolIntro = document.getElementById('school-intro');
const modulesContainer = document.getElementById('modules');
const homeBtn = document.getElementById('home');
const backBtn = document.getElementById('back');

// Izveido dinamisko galvenes Firebase statusa un profila joslu
function setupHeaderUI() {
  const header = document.querySelector('header');
  if (!header) return;

  let authContainer = document.getElementById('header-auth-bar');
  if (!authContainer) {
    authContainer = document.createElement('div');
    authContainer.id = 'header-auth-bar';
    authContainer.style.display = 'flex';
    authContainer.style.alignItems = 'center';
    authContainer.style.gap = '12px';
    header.appendChild(authContainer);
  }

  updateHeaderAuthUI();
}

function updateHeaderAuthUI() {
  const authContainer = document.getElementById('header-auth-bar');
  if (!authContainer) return;

  authContainer.innerHTML = '';

  // Firebase statusa indikators
  const statusBadge = document.createElement('span');
  statusBadge.className = 'fb-status-badge';
  statusBadge.style.cssText = 'font-size:0.8rem;padding:4px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:6px;';
  
  if (state.firebaseReady) {
    statusBadge.style.background = '#0e4a2d';
    statusBadge.style.color = '#86efac';
    statusBadge.innerHTML = '● datorika-hub pieslēgts';
  } else {
    statusBadge.style.background = '#422006';
    statusBadge.style.color = '#fde047';
    statusBadge.innerHTML = '○ Gaida konfigurāciju (.env)';
    statusBadge.title = 'Lai pilnībā aktivizētu, norādiet FIREBASE_API_KEY .env failā';
  }
  authContainer.appendChild(statusBadge);

  if (state.user) {
    // Profila informācija un lomas pārslēdzējs
    const userWrap = document.createElement('div');
    userWrap.style.cssText = 'display:flex;align-items:center;gap:8px;';

    const roleName = state.userProfile?.role 
      ? (ROLE_DETAILS[state.userProfile.role]?.title || state.userProfile.role)
      : 'Loma nav izvēlēta';

    const userBadge = document.createElement('button');
    userBadge.type = 'button';
    userBadge.style.cssText = 'background:#1f3b5c;color:#fff;border:1px solid #3b608a;padding:6px 12px;border-radius:8px;font-size:0.85rem;cursor:pointer;';
    userBadge.innerHTML = `👤 ${state.user.displayName || state.user.email} <span style="opacity:0.8;font-size:0.75rem;display:block">(${roleName})</span>`;
    userBadge.title = 'Mainīt lomu';
    userBadge.addEventListener('click', promptRoleSelectModal);

    const logoutBtn = document.createElement('button');
    logoutBtn.type = 'button';
    logoutBtn.textContent = 'Iziet';
    logoutBtn.style.cssText = 'background:transparent;color:#cbd5e1;border:1px solid #64748b;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:0.85rem;';
    logoutBtn.addEventListener('click', handleLogout);

    userWrap.appendChild(userBadge);
    userWrap.appendChild(logoutBtn);
    authContainer.appendChild(userWrap);
  } else if (state.firebaseReady) {
    const loginBtn = document.createElement('button');
    loginBtn.type = 'button';
    loginBtn.textContent = 'Pieslēgties ar Google';
    loginBtn.style.cssText = 'background:#215cba;color:white;border:none;padding:8px 14px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.85rem;';
    loginBtn.addEventListener('click', handleLogin);
    authContainer.appendChild(loginBtn);
  }
}

// Lomas izvēles logs
function promptRoleSelectModal() {
  const existing = document.getElementById('role-select-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'role-select-modal';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;';

  const modal = document.createElement('div');
  modal.style.cssText = 'background:#fff;color:#15243a;padding:28px;border-radius:16px;max-width:440px;width:100%;box-shadow:0 12px 36px rgba(0,0,0,0.25);';

  modal.innerHTML = `
    <h3 style="margin-top:0;font-size:1.4rem;">Izvēlies savu lomu Mājas skolā</h3>
    <p style="color:#52637a;font-size:0.95rem;">Šī loma tiks droši saglabāta Firestore <code>homeSchool/data/users</code> kolekcijā.</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin:20px 0;">
      <button type="button" class="role-opt-btn" data-role="vecaks" style="padding:14px;border:1px solid #dbe4ef;border-radius:10px;background:#f8fafc;font-weight:600;cursor:pointer;text-align:left;">
        📋 <strong>Vecāka panelis</strong>
        <div style="font-weight:normal;font-size:0.85rem;color:#64748b;margin-top:4px;">Pilna pārvaldība: veidot uzdevumus, sekot abu bērnu progresam</div>
      </button>
      <button type="button" class="role-opt-btn" data-role="marks" style="padding:14px;border:1px solid #dbe4ef;border-radius:10px;background:#f8fafc;font-weight:600;cursor:pointer;text-align:left;">
        🐉 <strong>Marka skola</strong>
        <div style="font-weight:normal;font-size:0.85rem;color:#64748b;margin-top:4px;">Marka personīgā mācību vide: spēles, treniņi un uzdevumi</div>
      </button>
      <button type="button" class="role-opt-btn" data-role="samanta" style="padding:14px;border:1px solid #dbe4ef;border-radius:10px;background:#f8fafc;font-weight:600;cursor:pointer;text-align:left;">
        🎨 <strong>Samantas skola</strong>
        <div style="font-weight:normal;font-size:0.85rem;color:#64748b;margin-top:4px;">Samantas personīgā mācību vide: nedēļas plāns un priekšmeti</div>
      </button>
    </div>
    <div style="text-align:right;">
      <button type="button" id="close-role-modal" style="background:transparent;border:1px solid #cbd5e1;padding:8px 16px;border-radius:8px;cursor:pointer;">Atcelt</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.querySelectorAll('.role-opt-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selected = btn.dataset.role;
      if (state.user) {
        btn.textContent = 'Saglabā...';
        await setUserRole(state.user.uid, {
          role: selected,
          email: state.user.email,
          displayName: state.user.displayName
        });
        state.userProfile = { role: selected };
        state.activeRole = selected;
      } else {
        state.activeRole = selected;
      }
      overlay.remove();
      updateHeaderAuthUI();
      // Ja lietotājs izvēlas lomu, atver atbilstošo skolu
      showSchoolView(selected);
    });
  });

  document.getElementById('close-role-modal').addEventListener('click', () => overlay.remove());
}

async function handleLogin() {
  if (!auth || !googleProvider) {
    alert('Firebase Auth nav gatavs. Lūdzu, pārbaudiet .env konfigurāciju.');
    return;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    state.user = result.user;
    const profile = await getUserProfile(result.user.uid);
    state.userProfile = profile;
    if (profile?.role) {
      state.activeRole = profile.role;
    } else {
      promptRoleSelectModal();
    }
    updateHeaderAuthUI();
  } catch (error) {
    console.error('Pieslēgšanās kļūda:', error);
  }
}

async function handleLogout() {
  if (auth) {
    await signOut(auth);
  }
  state.user = null;
  state.userProfile = null;
  state.activeRole = null;
  updateHeaderAuthUI();
  showSchoolView(); // atpakaļ uz sākumu
}

// Skatu pārslēgšana
async function showSchoolView(key) {
  if (!key) {
    welcomeSection.hidden = false;
    schoolSection.hidden = true;
    homeBtn.hidden = true;
    state.currentView = 'welcome';
    return;
  }

  state.currentView = key;
  welcomeSection.hidden = true;
  schoolSection.hidden = false;
  homeBtn.hidden = false;
  window.scrollTo(0, 0);

  // Ielādējam datus no Firestore
  await loadSchoolData(key);
}

// Datu ielāde un satura ģenerēšana
async function loadSchoolData(schoolKey) {
  const roleConfig = ROLE_DETAILS[schoolKey];
  if (!roleConfig) return;

  schoolTitle.textContent = `${roleConfig.symbol} ${roleConfig.title}`;
  schoolIntro.textContent = roleConfig.description;

  modulesContainer.innerHTML = '<div style="padding:24px;color:#64748b;">Ielādē datus no Cloud Firestore (datorika-hub)...</div>';

  let tasks = [];
  let progress = [];

  if (state.firebaseReady && db) {
    try {
      tasks = await getTasks(schoolKey === 'vecaks' ? null : schoolKey);
      progress = await getProgressHistory(schoolKey === 'vecaks' ? null : schoolKey);
    } catch (e) {
      console.warn('Neizdevās saņemt Firestore datus:', e);
    }
  }

  state.tasks = tasks;
  state.progressLogs = progress;

  renderSchoolModules(schoolKey);
}

function renderSchoolModules(schoolKey) {
  modulesContainer.innerHTML = '';

  if (schoolKey === 'vecaks') {
    renderParentDashboard();
  } else if (schoolKey === 'marks') {
    renderMarksSchool();
  } else if (schoolKey === 'samanta') {
    renderSamantaSchool();
  }
}

// 1. Vecāka panelis (Task creation, progress monitoring)
function renderParentDashboard() {
  const container = modulesContainer;

  // Modulis 1: Jauna uzdevuma izveide
  const createMod = document.createElement('div');
  createMod.className = 'module';
  createMod.style.gridColumn = '1 / -1';
  createMod.innerHTML = `
    <h2>➕ Izveidot jaunu uzdevumu bērniem</h2>
    <p style="color:#64748b;margin-bottom:14px;">Uzdevums tiks saglabāts Cloud Firestore <code>homeSchool/data/tasks</code> kolekcijā.</p>
    <form id="new-task-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;background:#f8fafc;padding:16px;border-radius:10px;border:1px solid #e2e8f0;">
      <div>
        <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:4px;">Uzdevuma nosaukums:</label>
        <input type="text" id="task-title" required placeholder="Piem., Reizrēķins līdz 10" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font:inherit;">
      </div>
      <div>
        <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:4px;">Mācību priekšmets:</label>
        <input type="text" id="task-subject" required placeholder="Matemātika, Dabaszinības..." style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font:inherit;">
      </div>
      <div>
        <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:4px;">Kam paredzēts:</label>
        <select id="task-assigned" style="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font:inherit;">
          <option value="both">Abiem (Marks & Samanta)</option>
          <option value="marks">🐉 Tikai Markam</option>
          <option value="samanta">🎨 Tikai Samantai</option>
        </select>
      </div>
      <div style="grid-column:1 / -1;display:flex;justify-content:flex-end;">
        <button type="submit" style="background:#215cba;color:white;border:none;padding:10px 18px;border-radius:8px;cursor:pointer;font-weight:600;">Saglabāt Firestore uzdevumu →</button>
      </div>
    </form>
  `;
  container.appendChild(createMod);

  // Formas apstrāde
  const form = createMod.querySelector('#new-task-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.querySelector('#task-title').value;
    const subject = form.querySelector('#task-subject').value;
    const assignedTo = form.querySelector('#task-assigned').value;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Saglabā...';

    if (db) {
      await createTask({
        title,
        subject,
        assignedTo,
        createdBy: state.user?.uid || 'vecaks'
      });
      await loadSchoolData('vecaks');
    } else {
      alert('Firestore nav pieejams. Pārliecinieties par .env konfigurāciju.');
      btn.disabled = false;
      btn.textContent = 'Saglabāt Firestore uzdevumu →';
    }
  });

  // Modulis 2: Aktīvo uzdevumu pārskats
  const tasksMod = document.createElement('div');
  tasksMod.className = 'module';
  tasksMod.innerHTML = `
    <h2>📋 Aktīvie mācību uzdevumi (${state.tasks.length})</h2>
    ${renderTaskListHtml(state.tasks, true)}
  `;
  container.appendChild(tasksMod);

  // Modulis 3: Rezultātu & progresa pārskats
  const progMod = document.createElement('div');
  progMod.className = 'module';
  progMod.innerHTML = `
    <h2>📊 Mācību rezultāti un aktivitātes</h2>
    ${renderProgressListHtml(state.progressLogs)}
  `;
  container.appendChild(progMod);

  attachTaskActionListeners(tasksMod);
}

// 2. Marka skola
function renderMarksSchool() {
  const container = modulesContainer;

  // Interaktīvais treniņš
  const drillMod = document.createElement('div');
  drillMod.className = 'module';
  drillMod.innerHTML = `
    <h2>⚔️ Ātrais treniņš: Matemātikas izaicinājums</h2>
    <p style="color:#64748b;">Pārbaudi savas spējas un saglabā rezultātu Firestore!</p>
    <div style="background:#f1f5f9;padding:16px;border-radius:10px;text-align:center;">
      <div style="font-size:1.8rem;font-weight:bold;margin:10px 0;">7 × 8 = ?</div>
      <div style="display:flex;justify-content:center;gap:10px;margin-top:12px;">
        <button class="drill-ans" data-ans="48" style="padding:10px 18px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;font-size:1.1rem;cursor:pointer;">48</button>
        <button class="drill-ans" data-ans="56" style="padding:10px 18px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;font-size:1.1rem;cursor:pointer;">56</button>
        <button class="drill-ans" data-ans="64" style="padding:10px 18px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;font-size:1.1rem;cursor:pointer;">64</button>
      </div>
      <div id="drill-feedback" style="margin-top:12px;font-weight:600;min-height:24px;"></div>
    </div>
  `;
  container.appendChild(drillMod);

  drillMod.querySelectorAll('.drill-ans').forEach(btn => {
    btn.addEventListener('click', async () => {
      const feedback = drillMod.querySelector('#drill-feedback');
      if (btn.dataset.ans === '56') {
        feedback.style.color = '#16a34a';
        feedback.textContent = '🎉 Pareizi! 56. Rezultāts tiek fiksēts...';
        if (db) {
          await recordProgress({
            studentRole: 'marks',
            activityType: 'Reizrēķina treniņš',
            subject: 'Matemātika',
            score: 100,
            notes: 'Veiksmīgi atrisināts 7x8'
          });
          feedback.textContent = '🎉 Pareizi! Rezultāts saglabāts Cloud Firestore!';
        }
      } else {
        feedback.style.color = '#dc2626';
        feedback.textContent = '❌ Mēģini vēlreiz!';
      }
    });
  });

  // Uzdevumu saraksts Markam
  const tasksMod = document.createElement('div');
  tasksMod.className = 'module';
  tasksMod.innerHTML = `
    <h2>📚 Marka šodienas uzdevumi</h2>
    ${renderTaskListHtml(state.tasks, false)}
  `;
  container.appendChild(tasksMod);
  attachTaskActionListeners(tasksMod);

  // Sasniegumi
  const badgeMod = document.createElement('div');
  badgeMod.className = 'module';
  badgeMod.innerHTML = `
    <h2>🏆 Sasniegumi un medaļas</h2>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;">
      <div style="background:#fef3c7;border:1px solid #fde68a;padding:12px;border-radius:10px;text-align:center;width:120px;">
        <div style="font-size:2rem;">⚡</div>
        <div style="font-weight:600;font-size:0.85rem;margin-top:4px;">Ātrais rēķinātājs</div>
      </div>
      <div style="background:#e0f2fe;border:1px solid #bae6fd;padding:12px;border-radius:10px;text-align:center;width:120px;">
        <div style="font-size:2rem;">🐉</div>
        <div style="font-weight:600;font-size:0.85rem;margin-top:4px;">Pūķa drosme</div>
      </div>
    </div>
  `;
  container.appendChild(badgeMod);
}

// 3. Samantas skola
function renderSamantaSchool() {
  const container = modulesContainer;

  // Nedēļas plāns
  const planMod = document.createElement('div');
  planMod.className = 'module';
  planMod.innerHTML = `
    <h2>📅 Samantas nedēļas plāns</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-top:12px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:10px;border-radius:8px;">
        <strong>Pirmdiena</strong>
        <div style="color:#64748b;font-size:0.85rem;margin-top:4px;">Latviešu valoda, Matemātika</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:10px;border-radius:8px;">
        <strong>Otrdiena</strong>
        <div style="color:#64748b;font-size:0.85rem;margin-top:4px;">Dabaszinības, Angļu valoda</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:10px;border-radius:8px;">
        <strong>Trešdiena</strong>
        <div style="color:#64748b;font-size:0.85rem;margin-top:4px;">Vizuālā māksla, Literatūra</div>
      </div>
    </div>
  `;
  container.appendChild(planMod);

  // Uzdevumi Samantai
  const tasksMod = document.createElement('div');
  tasksMod.className = 'module';
  tasksMod.innerHTML = `
    <h2>✅ Samantas uzdevumi</h2>
    ${renderTaskListHtml(state.tasks, false)}
  `;
  container.appendChild(tasksMod);
  attachTaskActionListeners(tasksMod);
}

function renderTaskListHtml(tasks, isParentView) {
  if (!tasks || tasks.length === 0) {
    return `<div style="color:#64748b;padding:12px 0;">Šobrīd nav neviena uzdevuma.</div>`;
  }

  return `
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
      ${tasks.map(t => {
        const isDone = t.status === 'completed';
        const assignedLabel = t.assignedTo === 'both' ? 'Marks & Samanta' : (t.assignedTo === 'marks' ? 'Marks 🐉' : 'Samanta 🎨');
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;background:${isDone ? '#f0fdf4' : '#fff'};border:1px solid ${isDone ? '#bbf7d0' : '#e2e8f0'};padding:12px;border-radius:8px;">
            <div>
              <div style="font-weight:600;${isDone ? 'text-decoration:line-through;color:#15803d;' : ''}">
                ${t.title}
              </div>
              <div style="font-size:0.8rem;color:#64748b;margin-top:2px;">
                ${t.subject || 'Priekšmets'} · Paredzēts: <strong>${assignedLabel}</strong>
              </div>
            </div>
            <div>
              <button class="toggle-task-btn" data-task-id="${t.id}" data-current-status="${t.status}" style="background:${isDone ? '#16a34a' : '#e2e8f0'};color:${isDone ? '#fff' : '#1e293b'};border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">
                ${isDone ? '✓ Izpildīts' : 'Pabeigt'}
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderProgressListHtml(logs) {
  if (!logs || logs.length === 0) {
    return `<div style="color:#64748b;padding:12px 0;">Vēl nav reģistrētu treniņu rezultātu.</div>`;
  }
  return `
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
      ${logs.map(log => `
        <div style="padding:10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.9rem;">
          <strong>${log.studentRole === 'marks' ? '🐉 Marks' : '🎨 Samanta'}</strong>: ${log.activityType} (${log.subject})
          <span style="color:#16a34a;font-weight:600;margin-left:8px;">${log.score} pts</span>
          <div style="color:#64748b;font-size:0.8rem;margin-top:2px;">${log.notes || ''}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function attachTaskActionListeners(container) {
  container.querySelectorAll('.toggle-task-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const taskId = btn.dataset.taskId;
      const current = btn.dataset.currentStatus;
      const newStatus = current === 'completed' ? 'pending' : 'completed';
      btn.textContent = 'Saglabā...';
      if (db) {
        await updateTaskStatus(taskId, newStatus);
        await loadSchoolData(state.currentView);
      }
    });
  });
}

// Sākotnējā inicializācija
async function initApp() {
  setupHeaderUI();

  // Pieslēdz pogas
  document.querySelectorAll('[data-school]').forEach(b => {
    b.addEventListener('click', () => showSchoolView(b.dataset.school));
  });
  homeBtn.addEventListener('click', () => showSchoolView());
  backBtn.addEventListener('click', () => showSchoolView());

  // Inicializējam Firebase
  const fb = await initFirebase();
  if (fb.isConfigured && auth) {
    state.firebaseReady = true;
    onAuthStateChanged(auth, async (user) => {
      state.user = user;
      if (user) {
        const profile = await getUserProfile(user.uid);
        state.userProfile = profile;
        if (profile?.role) {
          state.activeRole = profile.role;
        }
      } else {
        state.userProfile = null;
        state.activeRole = null;
      }
      updateHeaderAuthUI();
    });
  } else {
    state.firebaseReady = false;
    updateHeaderAuthUI();
  }
}

// Startējam lietotni pēc DOM ielādes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
