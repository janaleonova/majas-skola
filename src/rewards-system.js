// Mājas skolas motivācijas un balvu sistēma
// Piesaista bērnu nopelnītos treniņu punktus (BP) un XP reālām ģimenes balvām ar vecāka apstiprinājumu.

const DEFAULT_REWARDS = [
  { id: 'rew-icecream', title: 'Saldējums vai iecienīts gardums', icon: '🍦', cost: 40, desc: 'Izvēlies savu mīļāko saldējumu vai našķi veikalā' },
  { id: 'rew-game-30', title: '30 minūtes papildu spēļu / ekrāna laiks', icon: '🎮', cost: 50, desc: 'Papildu laiks Roblox, Minecraft vai planšetē' },
  { id: 'rew-movie-night', title: 'Ģimenes filmu vakars ar popkornu', icon: '🎬', cost: 75, desc: 'Tu izvēlies filmu un kārumus visai ģimenei' },
  { id: 'rew-bike-trip', title: 'Kopīgs velobrauciens vai piedzīvojums parkā', icon: '🚴', cost: 80, desc: 'Izbraukums ar riteņiem, skrejriteņiem vai pikniks' },
  { id: 'rew-pizza-night', title: 'Picas vakars vai vakariņu pasūtīšana', icon: '🍕', cost: 100, desc: 'Kopīgi pasūtām vai cepam tavu mīļāko picu' },
  { id: 'rew-book', title: 'Jauna grāmata vai komikss', icon: '📚', cost: 120, desc: 'Grāmatnīcas apmeklējums jaunas lasāmvielas izvēlei' },
  { id: 'rew-craft-toy', title: 'Radošais komplekts vai maza rotaļlieta', icon: '🎨', cost: 150, desc: 'Jauns lego, zīmēšanas krāsas vai hobija lieta' }
];

const CLAIMS_STORAGE_KEY = 'majas-skola-reward-claims-v1';

export function getStoredRewardClaims() {
  try {
    const raw = localStorage.getItem(CLAIMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredRewardClaims(claims) {
  try {
    localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
  } catch {}
}

export function calculateChildPoints(role, progressRecords = []) {
  // Saskaita punktus no bērna reģistrētajiem progresa datiem
  const childRecords = progressRecords.filter(r => r.studentRole === role);
  let totalXP = 0;

  for (const r of childRecords) {
    const score = Number(r.score) || 0;
    // Bāzes XP no uzdevuma: katrs veiksmīgs treniņš dod 10-25 XP atkarībā no rezultāta
    if (score >= 90) totalXP += 25;
    else if (score >= 70) totalXP += 18;
    else if (score >= 50) totalXP += 10;
    else totalXP += 5;

    // Papildu punkti, ja ir notes ar punktu datiem
    try {
      const notes = JSON.parse(r.notes || '{}');
      if (notes.pointsPreview) totalXP += Math.min(20, Number(notes.pointsPreview) || 0);
    } catch {}
  }

  // Saskaita iztērētos punktus no apstiprinātajām un aktīvajām balvām
  const claims = getStoredRewardClaims().filter(c => c.studentRole === role && c.status !== 'rejected');
  const spentPoints = claims.reduce((acc, c) => acc + (Number(c.cost) || 0), 0);
  const currentBalance = Math.max(0, totalXP - spentPoints);

  return { totalEarned: totalXP, spent: spentPoints, balance: currentBalance };
}

export function claimReward({ studentRole, rewardId, currentBalance }) {
  const reward = DEFAULT_REWARDS.find(r => r.id === rewardId);
  if (!reward) throw new Error('Balva netika atrasta.');
  if (currentBalance < reward.cost) throw new Error(`Nepieciešami vēl ${reward.cost - currentBalance} punkti.`);

  const newClaim = {
    id: 'claim-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    studentRole,
    studentName: studentRole === 'marks' ? 'Marks' : studentRole === 'samanta' ? 'Samanta' : studentRole,
    rewardId: reward.id,
    rewardTitle: reward.title,
    icon: reward.icon,
    cost: reward.cost,
    status: 'pending', // 'pending' | 'approved' | 'fulfilled' | 'rejected'
    claimedAt: new Date().toISOString(),
    statusUpdatedAt: new Date().toISOString()
  };

  const claims = getStoredRewardClaims();
  claims.unshift(newClaim);
  saveStoredRewardClaims(claims);
  return newClaim;
}

export function updateRewardClaimStatus(claimId, status) {
  const claims = getStoredRewardClaims();
  const target = claims.find(c => c.id === claimId);
  if (target) {
    target.status = status;
    target.statusUpdatedAt = new Date().toISOString();
    saveStoredRewardClaims(claims);
    return true;
  }
  return false;
}

export function renderRewardShop(container, { studentRole, progressRecords = [], onBack } = {}) {
  const host = document.createElement('section');
  host.className = 'module learning-hub reward-shop-hub';
  host.style.gridColumn = '1/-1';
  container.replaceChildren(host);

  const pointsInfo = calculateChildPoints(studentRole, progressRecords);

  const head = document.createElement('div');
  head.className = 'learning-heading';
  head.innerHTML = `
    <span class="eyebrow">🎁 BALVU VEIKALS UN MOTIVĀCIJA</span>
    <h2>Tavi nopelnītie punkti un mērķi</h2>
    <p>Katrs atrisināts uzdevums un katra sērija krāj punktus balvām, kuras apstiprina vecāks!</p>
  `;
  host.append(head);

  // Points Balance Card
  const balanceCard = document.createElement('div');
  balanceCard.className = 'reward-balance-card';
  balanceCard.style.cssText = 'background:linear-gradient(135deg,#6955f7,#443cae);color:white;padding:25px;border-radius:24px;margin-bottom:24px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:15px;box-shadow:0 15px 35px #5544cb33';
  balanceCard.innerHTML = `
    <div>
      <span style="font-size:0.9rem;text-transform:uppercase;letter-spacing:0.06em;opacity:0.9">Pieejamie punkti (BP)</span>
      <div style="font-size: clamp(2.5rem, 6vw, 3.8rem);font-weight:900;line-height:1">${pointsInfo.balance} <small style="font-size:1.4rem;font-weight:700">BP</small></div>
      <small style="opacity:0.85">Kopā nopelnīts: ${pointsInfo.totalEarned} BP · Iztērēts balvām: ${pointsInfo.spent} BP</small>
    </div>
    <div style="text-align:right">
      <span style="display:inline-block;background:rgba(255,255,255,0.2);padding:10px 16px;border-radius:99px;font-weight:800;font-size:0.95rem">
        ${pointsInfo.balance >= 40 ? '🎉 Vari izvēlēties balvu!' : '⭐ Krāj punktus treniņos!'}
      </span>
    </div>
  `;
  host.append(balanceCard);

  // Active Claims Section
  const myClaims = getStoredRewardClaims().filter(c => c.studentRole === studentRole);
  if (myClaims.length) {
    const claimsBox = document.createElement('div');
    claimsBox.className = 'my-claims-box';
    claimsBox.style.cssText = 'background:#ffffff;border:2px solid #eae6fb;border-radius:22px;padding:20px;margin-bottom:26px';
    claimsBox.innerHTML = '<h3 style="margin-top:0">📋 Tavi pieteikumi vecākam</h3>';

    const claimsList = document.createElement('div');
    claimsList.style.cssText = 'display:grid;gap:10px';

    myClaims.forEach(c => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#f9f8ff;border-radius:14px;gap:12px;flex-wrap:wrap';
      const statusBadge = c.status === 'approved' 
        ? '<span style="color:#137333;font-weight:900">✅ Apstiprināts (Gatavs saņemšanai!)</span>'
        : c.status === 'fulfilled'
          ? '<span style="color:#1a73e8;font-weight:900">🎉 Saņemts!</span>'
          : c.status === 'rejected'
            ? '<span style="color:#d93025;font-weight:900">❌ Noraidīts</span>'
            : '<span style="color:#e37400;font-weight:900">⏳ Gaida vecāka apstiprinājumu</span>';

      row.innerHTML = `
        <div>
          <strong style="font-size:1.1rem">${c.icon} ${c.rewardTitle}</strong>
          <small style="display:block;color:#67718e">${c.cost} BP · Pieteikts: ${new Date(c.claimedAt).toLocaleDateString('lv-LV')}</small>
        </div>
        <div>${statusBadge}</div>
      `;
      claimsList.append(row);
    });

    claimsBox.append(claimsList);
    host.append(claimsBox);
  }

  // Available Rewards Grid
  const listHeading = document.createElement('h3');
  listHeading.textContent = 'Pieejamās ģimenes balvas:';
  host.append(listHeading);

  const grid = document.createElement('div');
  grid.className = 'reward-grid';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin:16px 0 28px';

  DEFAULT_REWARDS.forEach(item => {
    const card = document.createElement('div');
    const canAfford = pointsInfo.balance >= item.cost;
    card.className = 'reward-coupon-card';
    card.style.opacity = canAfford ? '1' : '0.85';
    if (!canAfford) card.style.borderColor = '#e2dfed';

    const stampHtml = canAfford
      ? '<span class="reward-stamp reward-stamp-ready">⭐ Gatavs pieteikšanai!</span>'
      : `<span class="reward-stamp reward-stamp-need">Vēl trūkst ${item.cost - pointsInfo.balance} BP</span>`;

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div style="font-size:2.8rem;line-height:1">${item.icon}</div>
        ${stampHtml}
      </div>
      <div>
        <strong style="font-size:1.25rem;display:block;margin:6px 0 4px;color:#282f53">${item.title}</strong>
        <p style="font-size:0.92rem;color:#636e8b;margin:0">${item.desc}</p>
      </div>
      <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;border-top:1px dashed #e6e2f5;padding-top:12px">
        <span style="font-weight:900;font-size:1.2rem;color:#5a49c7">${item.cost} BP</span>
        <button type="button" class="action-button claim-btn" style="${canAfford ? '' : 'background:#e2e2ec;color:#787b99;cursor:not-allowed;box-shadow:none'}">
          ${canAfford ? 'Pieteikt balvu 🎯' : `Trūkst ${item.cost - pointsInfo.balance} BP`}
        </button>
      </div>
    `;

    const btn = card.querySelector('.claim-btn');
    if (canAfford) {
      btn.onclick = () => {
        try {
          claimReward({ studentRole, rewardId: item.id, currentBalance: pointsInfo.balance });
          alert(`🎉 Apsveicam! Tu pieteici balvu: “${item.title}”!\nVecāks saņems pieteikumu un varēs to apstiprināt.`);
          renderRewardShop(container, { studentRole, progressRecords, onBack });
        } catch (e) {
          alert(e.message);
        }
      };
    } else {
      btn.disabled = true;
    }

    grid.append(card);
  });
  host.append(grid);

  if (onBack) {
    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'quiet-button';
    backBtn.textContent = '← Atpakaļ uz mācībām';
    backBtn.onclick = onBack;
    host.append(backBtn);
  }
}

export function renderParentRewardManager(container) {
  const section = document.createElement('section');
  section.className = 'module';
  section.style.gridColumn = '1/-1';

  const title = document.createElement('h2');
  title.textContent = '🎁 Balvu pieteikumu pārvaldība';
  section.append(title);

  const desc = document.createElement('p');
  desc.textContent = 'Šeit redzami Marka un Samantas pieteikumi par nopelnītajiem mācību punktiem. Apstiprini un atzīmē kā izpildītas ģimenes balvas!';
  section.append(desc);

  const claims = getStoredRewardClaims();
  if (!claims.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Pagaidām nav neviena aktīva balvu pieteikuma.';
    section.append(empty);
    container.append(section);
    return;
  }

  const list = document.createElement('div');
  list.style.cssText = 'display:grid;gap:12px;margin-top:14px';

  claims.forEach(c => {
    const row = document.createElement('div');
    row.style.cssText = 'border:1px solid #e2e4f3;border-radius:18px;padding:16px 20px;background:#fbfbfe;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px';

    const info = document.createElement('div');
    info.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:1.8rem">${c.icon}</span>
        <div>
          <strong style="font-size:1.15rem">${c.studentName}: ${c.rewardTitle}</strong>
          <small style="display:block;color:#67718e">${c.cost} BP · Pieteikts: ${new Date(c.claimedAt).toLocaleString('lv-LV')} · Statuss: <strong>${c.status}</strong></small>
        </div>
      </div>
    `;

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';

    if (c.status === 'pending') {
      const bApprove = document.createElement('button');
      bApprove.type = 'button';
      bApprove.textContent = '✅ Apstiprināt';
      bApprove.style.cssText = 'background:#137333;color:white;border:0;border-radius:10px;padding:8px 14px;font-weight:800';
      bApprove.onclick = () => {
        updateRewardClaimStatus(c.id, 'approved');
        renderParentRewardManager(container);
      };

      const bReject = document.createElement('button');
      bReject.type = 'button';
      bReject.textContent = '❌ Noraidīt';
      bReject.style.cssText = 'background:#f28b82;color:#5f2120;border:0;border-radius:10px;padding:8px 14px;font-weight:800';
      bReject.onclick = () => {
        updateRewardClaimStatus(c.id, 'rejected');
        renderParentRewardManager(container);
      };

      actions.append(bApprove, bReject);
    } else if (c.status === 'approved') {
      const bDone = document.createElement('button');
      bDone.type = 'button';
      bDone.textContent = '🎉 Atzīmēt kā saņemtu / izpildītu';
      bDone.style.cssText = 'background:#1a73e8;color:white;border:0;border-radius:10px;padding:8px 14px;font-weight:800';
      bDone.onclick = () => {
        updateRewardClaimStatus(c.id, 'fulfilled');
        renderParentRewardManager(container);
      };
      actions.append(bDone);
    } else if (c.status === 'fulfilled') {
      const doneLabel = document.createElement('span');
      doneLabel.textContent = 'Izpildīts ✅';
      doneLabel.style.cssText = 'color:#137333;font-weight:800;padding:6px 12px;background:#e6f4ea;border-radius:8px';
      actions.append(doneLabel);
    } else {
      const rejectLabel = document.createElement('span');
      rejectLabel.textContent = 'Noraidīts ❌';
      rejectLabel.style.cssText = 'color:#d93025;font-weight:800;padding:6px 12px;background:#fce8e6;border-radius:8px';
      actions.append(rejectLabel);
    }

    row.append(info, actions);
    list.append(row);
  });

  section.append(list);
  container.append(section);
}
