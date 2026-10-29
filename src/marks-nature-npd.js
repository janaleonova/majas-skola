// Marks — Dabaszinības 4. klasei (Nobeiguma pārbaudes darba trenažieris un laboratorija)
// Temats: "Kā vairojas, aug un attīstās dzīvie organismi?" (Lielvārds 2025 standarts)
// Maksimālais punktu skaits: 25 punkti | 14 uzdevumi / vērtēšanas kritēriji | SOLO I–IV līmeņi
//
// 1. Zina vairošanās nozīmi dabā (1 p., SOLO I)
// 2. Zina, kuri augi vairojas ar sēklām (1 p., SOLO I)
// 3. Zina, kuri dzīvnieki vairojas ar olām (1 p., SOLO I)
// 4. Zina, kuri dzīvnieki dzemdē mazuļus un baro ar pienu (1 p., SOLO I)
// 5. Zina auga dzīves cikla posmus (1 p., SOLO I)
// 6. Zina zieda daļas un to nozīmi vairošanās procesā (1 p., SOLO I)
// 7. Zina, kas ir apputeksnēšanās (1 p., SOLO I)
// 8. Zina, kādi apstākļi nodrošina sēklas uzdīgšanu (2 p., SOLO II)
// 9. Prot nosaukt augu pavairošanas veidu piemērus (3 p., SOLO III)
// 10. Prot skaidrot dzīvnieku uzvedību vairošanās, mazuļu augšanas un attīstības laikā (3 p., SOLO II)
// 11. Zina tauriņa attīstības ciklu (2 p., SOLO II)
// 12. Zina, kurā cilvēka attīstības posmā sākas intensīva dzimumšūnu attīstība (1 p., SOLO I)
// 13. Zina, kuras ir iedzimstošās un neiedzimstošās pazīmes (1 p., SOLO I)
// 14. Analizē eksperimenta datus un prot izskaidrot cēloņus augu attīstības laikā (6 p., SOLO III/IV)

export const NPD_14_CRITERIA = [
  { id: 1, title: 'Vairošanās nozīme dabā', maxPts: 1, solo: 'I', desc: 'Sugas saglabāšana un dzīvības turpināšanās uz Zemes.' },
  { id: 2, title: 'Augi, kuri vairojas ar sēklām', maxPts: 1, solo: 'I', desc: 'Ziedaugi un kailsēkļi (egle, priede, ābele, zirnis, ozols).' },
  { id: 3, title: 'Dzīvnieki, kuri vairojas ar olām', maxPts: 1, solo: 'I', desc: 'Putni, rāpuļi, abinieki, zivis un kukaiņi.' },
  { id: 4, title: 'Zīdītāji (dzemdē un baro ar pienu)', maxPts: 1, solo: 'I', desc: 'Suns, lācis, kaķis, bebrs, valis, cilvēks.' },
  { id: 5, title: 'Auga dzīves cikla posmi', maxPts: 1, solo: 'I', desc: 'Sēkla ➔ dīgsts ➔ pieaudzis augs ➔ zieds ➔ auglis ar sēklām ➔ sēklu izplatīšanās.' },
  { id: 6, title: 'Zieda uzbūve un vairošanās', maxPts: 1, solo: 'I', desc: 'Putekšnīca ar putekšņiem (vīrišķā) un auglenīca ar sēklotni (sievišķā).' },
  { id: 7, title: 'Apputeksnēšanās būtība', maxPts: 1, solo: 'I', desc: 'Putekšņu pārnešana no putekšnīcas uz auglenīcas drīksnu ar vēju vai kukaiņiem.' },
  { id: 8, title: 'Sēklas uzdīgšanas 3 apstākļi', maxPts: 2, solo: 'II', desc: 'Ūdens (mitrums), siltums (temperatūra) un gaiss (skābeklis).' },
  { id: 9, title: 'Augu pavairošanas veidi', maxPts: 3, solo: 'III', desc: 'Veģetatīvā (spraudeņi, sīpoli, bumbuļi, ūsas, sakneņi, lapas) un ģeneratīvā (ar sēklām).' },
  { id: 10, title: 'Dzīvnieku uzvedība, riests un perēšana', maxPts: 3, solo: 'II', desc: 'Putnu riests, mazuļa attīstība olā (dzeltenums, baltums, gaisa kamera) un aprūpe.' },
  { id: 11, title: 'Tauriņa attīstības cikls', maxPts: 2, solo: 'II', desc: 'Pilnīgā pārvērtība: Ola ➔ Kāpurs ➔ Kūniņa ➔ Pieaudzis tauriņš.' },
  { id: 12, title: 'Cilvēka dzimumšūnu attīstības posms', maxPts: 1, solo: 'I', desc: 'Pusaudža vecums / pubertāte.' },
  { id: 13, title: 'Iedzimstošās un neiedzimstošās pazīmes', maxPts: 1, solo: 'II', desc: 'Iedzimtās (acu krāsa, asinsgrupa) vs iegūtās (rētas, zināšanas, frizūra).' },
  { id: 14, title: 'Eksperimenta datu analīze un cēloņi', maxPts: 6, solo: 'III/IV', desc: 'Stādu A, B, C, D augšanas faktoru salīdzināšana, cēloņu skaidrošana un pamatojums.' }
];

export const NATURE_4TH_THEORY = [
  {
    id: 't1',
    title: '1. Kāpēc organismi vairojas? & Dzīvnieku grupas',
    icon: '🐣',
    summary: 'Dzīvības pamatlikums un vairošanās veidi dzīvnieku pasaulē',
    content: `
      <div class="theory-card">
        <h4>🌟 Vairošanās galvenā nozīme</h4>
        <p>Visi dzīvie organismi (augi, dzīvnieki, sēnes, baktērijas, cilvēki) ar laiku noveco un mirst. <strong>Vairošanās ir nepieciešama, lai suga saglabātos un dzīvība uz Zemes turpinātos no paaudzes paaudzē.</strong> Ja kāda suga pārstātu vairoties, tā dažu gadu laikā pilnībā izmirtu.</p>
        
        <h4>🥚 Dzīvnieki, kuri vairojas ar olām</h4>
        <ul>
          <li><strong>Putni:</strong> dēj olas ar cietu kaļķa čaulu, tās perē (silda) ligzdās (piem., stārķis, zīlīte, ērglis, vista).</li>
          <li><strong>Rāpuļi:</strong> dēj olas ar ādainu čaulu smiltīs vai augsnē (piem., ķirzakas, zalkši, bruņurupuči).</li>
          <li><strong>Abinieki:</strong> nērš kurkuļu ikrus ūdenī (piem., parastā varde, krupis).</li>
          <li><strong>Zivis:</strong> nērš ikrus ūdenī (piem., līdaka, asaris, karpa).</li>
          <li><strong>Kukaiņi:</strong> dēj oliņas uz augu lapām vai augsnē (piem., tauriņi, bites, vaboles).</li>
        </ul>

        <h4>🐾 Dzīvnieki, kuri dzemdē mazuļus un baro ar pienu (Zīdītāji)</h4>
        <p>Zīdītāji ir augstāk attīstīti dzīvnieki. Mazuļi attīstās mātes organismā, piedzimst dzīvi un pirmos dzīves mēnešus tiek baroti ar <strong>mātes pienu</strong>, kas satur visas nepieciešamās uzturvielas un antivielas imunitātei (piemēram: suns, kaķis, brūnais lācis, bebrs, stirna, mežacūka, valis, kā arī cilvēks).</p>
      </div>
    `
  },
  {
    id: 't2',
    title: '2. Auga dzīves cikls & Zieda uzbūve',
    icon: '🌸',
    summary: 'No sēkliņas līdz jaunam ziedam un auglim',
    content: `
      <div class="theory-card">
        <h4>🔄 Ziedauga dzīves cikla 6 posmi</h4>
        <div class="cycle-grid">
          <div class="cycle-step">1️⃣ <strong>Sēkla</strong> augsnē gaida piemērotus apstākļus</div>
          <div class="cycle-step">2️⃣ <strong>Dīgsts</strong> — izdīgst saknīte un zaļš asns</div>
          <div class="cycle-step">3️⃣ <strong>Pieaudzis augs</strong> — attīstās lapas, spēcīgs stublājs</div>
          <div class="cycle-step">4️⃣ <strong>Ziedēšana</strong> un apputeksnēšanās</div>
          <div class="cycle-step">5️⃣ <strong>Auglis ar sēklām</strong> nogatavojas</div>
          <div class="cycle-step">6️⃣ <strong>Sēklu izplatīšanās</strong> (vējš, dzīvnieki, ūdens)</div>
        </div>

        <h4>🌺 Zieda daļas un to loma vairošanās procesā</h4>
        <ul>
          <li><strong>Putekšņlapa ar putekšnīcu:</strong> VĪRIŠĶĀ zieda daļa. Tajā nobriest tūkstošiem mikroskopisku <em>ziedputekšņu</em>.</li>
          <li><strong>Auglenīca (drīksna, irbulis, sēklotne):</strong> SIEVIŠĶĀ zieda daļa. Uz tās lipīgās <em>drīksnas</em> nonāk putekšņi, un apakšējā daļā — <em>sēklotnē</em> — pēc apaugļošanās attīstās sēklas un auglis.</li>
          <li><strong>Vainaglapas:</strong> zieda krāšņās, košās lapiņas, kas smaržo un pievilina kukaiņus (bites, kamenes).</li>
          <li><strong>Kauslapas:</strong> nelielas zaļas lapiņas zieda pamatnē, kas aizsargā jaunu ziedpumpuru pirms tā atvēršanās.</li>
        </ul>

        <h4>🐝 Kas ir apputeksnēšanās?</h4>
        <p><strong>Apputeksnēšanās ir ziedputekšņu pārnešana no putekšnīcas uz auglenīcas drīksnu.</strong> To veic:</p>
        <ul>
          <li><strong>Kukaiņi (bites, kamenes, tauriņi):</strong> meklējot saldo nektāru, aplīp ar putekšņiem un pārnes tos uz citiem ziediem.</li>
          <li><strong>Vējš:</strong> apputeksnē kokus (bērzus, priedes, lazdas) un graudzāles, kuru ziedi nav koši, bet putekšņi ir ļoti viegli un sausi.</li>
        </ul>
      </div>
    `
  },
  {
    id: 't3',
    title: '3. Sēklas dīgšanas 3 zelta apstākļi & Pavairošana',
    icon: '🌱',
    summary: 'Kas sēklai vajadzīgs augsnē un kā pavairo augus bez sēklām',
    content: `
      <div class="theory-card">
        <h4>💧 Trīs obligātie apstākļi sēklas uzdīgšanai</h4>
        <ol>
          <li><strong>Ūdens (mitrums):</strong> sēklas miziņa uzbriest, kļūst mīksta, sēkla elpo straujāk un asns var izlauzties ārā.</li>
          <li><strong>Siltums (piemērota temperatūra):</strong> parasti no +12°C līdz +22°C. Aukstumā sēkla guļ vai sapūst.</li>
          <li><strong>Gaiss (skābeklis):</strong> dīgstoša sēkla ir dzīva un intensīvi elpo. Ja augsni pārblīvē vai sēklu noslīcina ūdenī bez gaisa, tā nosmok.</li>
        </ol>
        <p style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 10px; border-radius: 6px;">
          ⚠️ <strong>Svarīgs novērojums:</strong> Lielākajai daļai sēklu uzdīgšanai <strong>GAISMA NAV NEPIECIEŠAMA</strong>, jo tās dīgst tumsā zem zemes! Gaisma kļūst nepieciešama tikai tad, kad virs zemes parādās zaļās lapiņas, lai veiktu fotosintēzi.
        </p>

        <h4>🌿 Augu pavairošanas veidi</h4>
        <p>1. <strong>Ģeneratīvā pavairošana:</strong> ar sēklām (ābele, zirnis, kukurūza, ozols, tomāts).</p>
        <p>2. <strong>Veģetatīvā pavairošana</strong> (ar auga daļām):</p>
        <ul>
          <li><strong>Ar spraudeņiem:</strong> zariņš ūdenī izlaiž saknes (pelargonija, kārkls, jāņogas).</li>
          <li><strong>Ar sīpoliem:</strong> tulpes, narcises, dārza sīpoli.</li>
          <li><strong>Ar bumbuļiem:</strong> kartupeļi (bumbuļa "acītes" dzen asnus).</li>
          <li><strong>Ar ūsām / stīgām:</strong> dārza un meža zemenes.</li>
          <li><strong>Ar sakneņiem:</strong> maijpuķītes, piparmētras, vārpata.</li>
          <li><strong>Ar lapām:</strong> sanpaulijas (Āfrikas vijolītes lapu iesprauž mitrā zemē).</li>
        </ul>
      </div>
    `
  },
  {
    id: 't4',
    title: '4. Dzīvnieku uzvedība, riests, olas uzbūve & Tauriņš',
    icon: '🦋',
    summary: 'Kā dzīvnieki piesaista pāri, silda olas un kā tauriņš piedzīvo metamorfozi',
    content: `
      <div class="theory-card">
        <h4>🎶 Putnu riests</h4>
        <p><strong>Riests</strong> ir īpašs laiks pavasarī, kad putnu tēviņi sacenšas par mātīšu uzmanību:</p>
        <ul>
          <li>Dzied skaļas pavasara dziesmas (melnais meža strazds, lakstīgala).</li>
          <li>Izrāda košu kāzu tērpu un spārnu dejas (rubeņi, pāvi).</li>
          <li>Būvē paraugligzdas vai pasniedz dāvanas (zivis, zariņus).</li>
        </ul>

        <h4>🥚 Putna olas noslēpums</h4>
        <ul>
          <li><strong>Dzeltenums:</strong> galvenā mazuļa "barības noliktava" olā.</li>
          <li><strong>Olbaltums:</strong> pasargā dīgli no triecieniem un nodrošina mitrumu.</li>
          <li><strong>Čaula:</strong> ciets kaļķa apvalks ar mikroskopiskām porām gaisa apmaiņai.</li>
          <li><strong>Gaisa kamera:</strong> olas resnākajā galā nodrošina skābekli pirmajam elpas vilcienam pirms izšķilšanās.</li>
          <li><strong>Perēšana:</strong> vecāki sēž uz olām un silda tās ar savu ķermeņa siltumu (+38°C).</li>
        </ul>

        <h4>🐛 Tauriņa pilnīgā pārvērtība (Metamorfoze)</h4>
        <div class="cycle-grid">
          <div class="cycle-step">1️⃣ <strong>Ola</strong> — maza oliņa uz nātru vai kāpostu lapas apakšas.</div>
          <div class="cycle-step">2️⃣ <strong>Kāpurs</strong> — rāpojošs kāpurs, kurš nepārtraukti ēd lapas un ātri aug.</div>
          <div class="cycle-step">3️⃣ <strong>Kūniņa</strong> — nekustīgs miera stāvoklis; iekšienē kāpurs pārtop par tauriņu!</div>
          <div class="cycle-step">4️⃣ <strong>Pieaudzis tauriņš (Imago)</strong> — izpleš krāšņos spārnus, lido, barojas ar nektāru un dēj jaunas olas.</div>
        </div>
      </div>
    `
  },
  {
    id: 't5',
    title: '5. Cilvēka attīstība & Iedzimtās pret Iegūtajām pazīmēm',
    icon: '🧬',
    summary: 'Pubertāte un gēnu noslēpumi: kas mantots no vecākiem, kas iegūts dzīvē',
    content: `
      <div class="theory-card">
        <h4>🧑 Pusaudža vecums (Pubertāte)</h4>
        <p>Cilvēka dzīvē ir vairāki posmi: zīdainis ➔ bērnība ➔ <strong>pusaudža vecums</strong> ➔ pieaudzis cilvēks ➔ vecumdienas.</p>
        <p>Tieši <strong>pusaudža vecumā (aptuveni 11–16 gados)</strong> organismā sākas intensīva dzimumšūnu attīstība, strauja augšana un nobriešana, lai nākotnē cilvēks pats varētu kļūt par vecāku.</p>

        <h4>🧬 Iedzimstošās pazīmes (no bioloģiskajiem vecākiem ar gēniem)</h4>
        <p>Tās ir pazīmes, ar kurām bērns piedzimst un kuras nosaka DNS:</p>
        <ul>
          <li>Acu krāsa (zilas, brūnas, zaļas)</li>
          <li>Dabīgā matu krāsa un struktūra (taisni vai cirtaini)</li>
          <li>Asinsgrupa</li>
          <li>Auss ļipiņas forma (pieaugusi vai brīva)</li>
          <li>Iedzimts auguma garuma potenciāls un sejas panti</li>
        </ul>

        <h4>⚽ Neiedzimstošās / Iegūtās pazīmes (dzīves gaitā veidojušās)</h4>
        <p>Tās NAV ierakstītas gēnos un bērniem neiedzimst:</p>
        <ul>
          <li>Rētas pēc kritieniem vai operācijām</li>
          <li>Tetovējumi un matu krāsojums</li>
          <li>Nosauļots ādas tonis pēc vasaras</li>
          <li>Zināšanas, valodu prasmes, klavierspēles prasme</li>
          <li>Uztrenēti sporta muskuļi un ieradumi</li>
        </ul>
      </div>
    `
  },
  {
    id: 't6',
    title: '6. Eksperimentu analīze & Stādu laboratorija',
    icon: '🔬',
    summary: 'Kā zinātnieki pēta augu augšanu: kontrolgrupa, faktori un secinājumi',
    content: `
      <div class="theory-card">
        <h4>🌱 4 stādu klasiskais eksperiments</h4>
        <p>Zinātnieks iestādīja 4 vienādas pupas vienādā augsnē un 14 dienas vēroja to attīstību:</p>
        <table class="npd-table" style="width: 100%; border-collapse: collapse; margin: 12px 0;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="padding: 8px; border: 1px solid #cbd5e1;">Stāds</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1;">Apstākļi</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1;">Rezultāts pēc 14 dienām</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Stāds A (Kontrolgrupa)</strong></td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Saules gaisma + laistīts + istabas temp. (+20°C)</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; color: #059669; font-weight: bold;">18 cm garš, stiprs zaļš stumbrs, 6 veselīgas lapas!</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Stāds B</strong></td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Tumšs skapis + laistīts + istabas temp. (+20°C)</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">22 cm garš, izstīdzējis, bāli dzeltens, vārgs, sīkas lapiņas.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Stāds C</strong></td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Saules gaisma + BEZ ŪDENS (sauss) + istabas temp.</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; color: #dc2626;">4 cm garš, nokaltis un sakrunkojies.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Stāds D</strong></td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Saules gaisma + laistīts + ledusskapī (+4°C)</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">5 cm garš, augšana gandrīz apstājusies, tumšs un vājš.</td>
            </tr>
          </tbody>
        </table>

        <h4>🔍 Galvenie secinājumi:</h4>
        <ul>
          <li><strong>Kāpēc stāds A ir visveselīgākais?</strong> Jo tam bija nodrošināti visi 3 nepieciešamie augšanas faktori kopā.</li>
          <li><strong>Kāpēc stāds B bija dzeltens un izstīdzēja?</strong> Gaismas trūkuma dēļ tas nespēja ražot zaļo pigmentu hlorofilu un tiecās pēc gaismas, izstīdzot garš un vājš.</li>
          <li><strong>Kāpēc stāds C nokalta?</strong> Ūdens ir šūnu pamats un transportē barības vielas; bez ūdens augs izžūst un mirst.</li>
        </ul>
      </div>
    `
  }
];

// Audio lasītāja funkcijas ar TTS
export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  if (!text) return;
  const clean = String(text)
    .replace(/[🌿🌸🌱🐣🐾💧🌺🐝🥚🐛🦋🧑🧬🔬⭐🏆✅❌⚠️1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣]/g, '')
    .replace(/➔|→/g, ' seko ')
    .replace(/\s+/g, ' ')
    .trim();
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'lv-LV';
  utterance.rate = 0.88;
  const voices = window.speechSynthesis.getVoices();
  const lvVoice = voices.find(v => v.lang.startsWith('lv') || v.lang.includes('Latvian'));
  if (lvVoice) utterance.voice = lvVoice;
  window.speechSynthesis.speak(utterance);
}

// 14 NPD uzdevumu jautājumu banka pārbaudes darbam un treniņam
export const NPD_QUESTIONS = [
  {
    id: 1,
    critId: 1,
    title: '1. uzdevums. Vairošanās nozīme dabā',
    pts: 1,
    solo: 'I',
    prompt: 'Kāda ir galvenā vairošanās nozīme dabā visiem dzīvajiem organismiem?',
    options: [
      { text: 'Sugas saglabāšana un dzīvības turpināšanās uz Zemes no paaudzes paaudzē', correct: true },
      { text: 'Lai samazinātu augu un dzīvnieku skaitu konkrētā mežā', correct: false },
      { text: 'Lai organismiem nebūtu jāmeklē barība', correct: false }
    ],
    hint: 'Iedomājies, kas notiktu, ja neviens lācis vai ozols vairs nevairotos.',
    explanation: 'Ja dzīvie organismi nevairotos, esošie īpatņi novecojot nomirtu un suga uz visiem laikiem izzustu. Vairošanās nodrošina sugas saglabāšanos.'
  },
  {
    id: 2,
    critId: 2,
    title: '2. uzdevums. Augi, kuri vairojas ar sēklām',
    pts: 1,
    solo: 'I',
    prompt: 'Kuri no nosauktajiem augiem vairojas ar sēklām?',
    options: [
      { text: 'Ābele, priede, zirnis, egle un ozols', correct: true },
      { text: 'Meža papardes, sfagnu sūnas un ķērpji', correct: false },
      { text: 'Tikai sēnes un aļģes dīķī', correct: false }
    ],
    hint: 'Ziedaugi un skujkoki (kailsēkļi) veido sēklas. Papardes un sūnas vairojas ar sporām!',
    explanation: 'Ābele, zirnis un ozols ir ziedaugi ar sēklām augļos; priede un egle ir kailsēkļi ar sēklām čiekuros. Papardes un sūnas veido sporas.'
  },
  {
    id: 3,
    critId: 3,
    title: '3. uzdevums. Dzīvnieki, kuri vairojas ar olām',
    pts: 1,
    solo: 'I',
    prompt: 'Kuras no šīm dzīvnieku grupām vairojas, dējot olas vai nēršot ikrus?',
    options: [
      { text: 'Putni (stārķis), rāpuļi (ķirzaka), abinieki (varde) un kukaiņi (tauriņš)', correct: true },
      { text: 'Suns, kaķis, lācis un bebrs', correct: false },
      { text: 'Zilais valis, delfīns un mežacūka', correct: false }
    ],
    hint: 'Zīdītāji dzemdē dzīvus mazuļus, bet putni, rāpuļi, abinieki, zivis un kukaiņi dēj olas/ikrus.',
    explanation: 'Putni dēj olas ar kaļķa čaulu, rāpuļi ar ādainu čaulu, abinieki un zivis nērš ikrus ūdenī, kukaiņi dēj oliņas. Suņi un lāči ir zīdītāji.'
  },
  {
    id: 4,
    critId: 4,
    title: '4. uzdevums. Zīdītāji',
    pts: 1,
    solo: 'I',
    prompt: 'Kuri dzīvnieki dzemdē dzīvus mazuļus un baro tos ar mātes pienu?',
    options: [
      { text: 'Lācis, vilks, stirna, bebrs un cilvēks (zīdītāji)', correct: true },
      { text: 'Vārna, gulbis, līdaka un krupis', correct: false },
      { text: 'Tauriņš, odze, varde un lasis', correct: false }
    ],
    hint: 'Šo dzīvnieku klases nosaukums ir "zīdītāji", jo mātes zīda mazuļus ar pienu.',
    explanation: 'Zīdītāji ir vienīgie dzīvnieki, kas dzemdē mazuļus un baro tos ar augstvērtīgu mātes pienu.'
  },
  {
    id: 5,
    critId: 5,
    title: '5. uzdevums. Auga dzīves cikla posmi',
    pts: 1,
    solo: 'I',
    prompt: 'Kāda ir pareizā ziedauga dzīves cikla hronoloģiskā secība?',
    options: [
      { text: 'Sēkla ➔ Dīgsts (asns) ➔ Pieaudzis augs ➔ Ziedēšana ➔ Auglis ar sēklām ➔ Sēklu izplatīšanās', correct: true },
      { text: 'Ziedēšana ➔ Sēkla ➔ Auglis ➔ Dīgsts ➔ Sēklu izplatīšanās', correct: false },
      { text: 'Dīgsts ➔ Auglis ➔ Sēkla ➔ Ziedēšana ➔ Pieaudzis augs', correct: false }
    ],
    hint: 'Viss sākas no sēkliņas zemē un noslēdzas ar jaunām sēklām, kas izplatās.',
    explanation: 'Sēkla uzdīgst ➔ izaug augs ar stublāju un lapām ➔ tas uzzied ➔ pēc apputeksnēšanās nobriest auglis ar sēklām ➔ sēklas izplatās.'
  },
  {
    id: 6,
    critId: 6,
    title: '6. uzdevums. Zieda daļas un to nozīme vairošanās procesā',
    pts: 1,
    solo: 'I',
    prompt: 'Kura ir zieda VĪRIŠĶĀ un kura ir SIEVIŠĶĀ vairošanās daļa?',
    options: [
      { text: 'Putekšnīca ar putekšņiem ir vīrišķā; Auglenīca ar sēklotni ir sievišķā', correct: true },
      { text: 'Kauslapas ir vīrišķā; Vainaglapas ir sievišķā', correct: false },
      { text: 'Auglenīca ir vīrišķā; Putekšnīca ir sievišķā', correct: false }
    ],
    hint: 'Putekšņi veidojas putekšnīcā (vīrišķajā daļā), bet sēklas attīstās auglenīcas sēklotnē (sievišķajā daļā).',
    explanation: 'Putekšņlapa ar putekšnīcu ražo ziedputekšņus (vīrišķā), bet auglenīca satur sēklaizmetņus un sēklotni (sievišķā).'
  },
  {
    id: 7,
    critId: 7,
    title: '7. uzdevums. Kas ir apputeksnēšanās?',
    pts: 1,
    solo: 'I',
    prompt: 'Kas notiek ziedu apputeksnēšanās brīdī?',
    options: [
      { text: 'Putekšņi no putekšnīcas tiek pārnesti uz auglenīcas lipīgo drīksnu', correct: true },
      { text: 'Augs nomet lapas pirms ziemas sala', correct: false },
      { text: 'Sēklas izbirst uz zemes un uzsūc lietus ūdeni', correct: false }
    ],
    hint: 'Apputeksnēšanu veic bites, kamenes vai vējš, pārvietojot dzeltenos putekšņus.',
    explanation: 'Apputeksnēšanās ir process, kurā putekšņi nokļūst uz auglenīcas drīksnas, ļaujot notikt apaugļošanai un sēklu izveidei.'
  },
  {
    id: 8,
    critId: 8,
    title: '8. uzdevums. Sēklas uzdīgšanai nepieciešamie apstākļi (2 p.)',
    pts: 2,
    solo: 'II',
    prompt: 'Kuri TRĪS apstākļi ir OBLIGĀTI nepieciešami, lai sēkla uzdīgtu zemē?',
    options: [
      { text: 'Ūdens (mitrums), siltums (atbilstoša temperatūra) un gaiss (skābeklis elpošanai)', correct: true, pts: 2 },
      { text: 'Tikai ūdens (mitrums) viens pats', correct: false, pts: 1 },
      { text: 'Spilgta saules gaisma, sals un minerālmēsli', correct: false, pts: 0 }
    ],
    hint: 'Atceries: zem zemes ir tumšs, tāpēc gaisma dīgšanai nav vajadzīga, bet sēklai vajag mitrumu, siltumu un elpot skābekli!',
    explanation: '3 zelta apstākļi ir ūdens, siltums un gaiss. Gaisma sākumā pazemē nav obligāta — tā būs vajadzīga zaļajām lapām pēc uzdīgšanas.'
  },
  {
    id: 9,
    critId: 9,
    title: '9. uzdevums. Augu pavairošanas veidi (3 p.)',
    pts: 3,
    solo: 'III',
    prompt: 'Savieno pareizos augu veģetatīvās pavairošanas piemērus!',
    type: 'match_trio',
    items: [
      { label: 'Kartupelis', correct: 'Bumbuļi' },
      { label: 'Tulpe vai narcise', correct: 'Sīpoli' },
      { label: 'Dārza zemene', correct: 'Ūsas / stīgas' }
    ],
    choices: ['Bumbuļi', 'Sīpoli', 'Ūsas / stīgas'],
    hint: 'Kartupeļus stāda bumbuļos ar acītēm; tulpes izrok sīpolos; zemenes laid stīgas jeb ūsas!',
    explanation: 'Kartupeļus pavairo ar bumbuļiem, tulpes ar sīpoliem, zemenes ar stīgām/ūsām. Pelargonijas ar spraudeņiem, maijpuķītes ar sakneņiem.'
  },
  {
    id: 10,
    critId: 10,
    title: '10. uzdevums. Dzīvnieku uzvedība, riests un perēšana (3 p.)',
    pts: 3,
    solo: 'II',
    prompt: 'Izvērtē 3 apgalvojumus par putnu vairošanos un mazuļu aprūpi:',
    type: 'multi_statements',
    statements: [
      { text: 'Putnu riests ir pavasara uzvedība (dziesmas, spārnu dejas), lai piesaistītu mātīti.', correct: true },
      { text: 'Putna olas dzeltenums satur barības vielas, kas nepieciešamas augošajam dīglim.', correct: true },
      { text: 'Pēc izšķilšanās putnu vecāki mazuļus silda, baro ar kukaiņiem un aizsargā no briesmām.', correct: true }
    ],
    hint: 'Visi trīs soļi (riests, olas sildīšana un mazuļu barošana) raksturo putnu rūpes par pēcnācējiem.',
    explanation: 'Tēviņi pavasarī riesto, ola satur visas barības vielas un gaisa kameru, un vecāki pašaizliedzīgi aprūpē putnēnus.'
  },
  {
    id: 11,
    critId: 11,
    title: '11. uzdevums. Tauriņa attīstības cikls (2 p.)',
    pts: 2,
    solo: 'II',
    prompt: 'Sakārto pareizā secībā tauriņa pilnīgās pārvērtības posmus:',
    options: [
      { text: 'Ola ➔ Kāpurs ➔ Kūniņa ➔ Pieaudzis tauriņš (Imago)', correct: true, pts: 2 },
      { text: 'Ola ➔ Kūniņa ➔ Kāpurs ➔ Pieaudzis tauriņš', correct: false, pts: 1 },
      { text: 'Kāpurs ➔ Ola ➔ Pieaudzis tauriņš ➔ Kūniņa', correct: false, pts: 0 }
    ],
    hint: 'No olas izšķiļas rijīgs kāpurs, tad tas iekūņojas miera stāvoklī, un no kūniņas izlido spārnots tauriņš.',
    explanation: 'Pareizā secība ir: Ola ➔ Kāpurs ➔ Kūniņa ➔ Pieaudzis tauriņš. Kūniņā notiek metamorfoze.'
  },
  {
    id: 12,
    critId: 12,
    title: '12. uzdevums. Cilvēka attīstības posmi un dzimumšūnas',
    pts: 1,
    solo: 'I',
    prompt: 'Kurā cilvēka attīstības posmā organismā sākas intensīva dzimumšūnu attīstība?',
    options: [
      { text: 'Pusaudža vecumā (pubertātē)', correct: true },
      { text: 'Zīdaiņa vecumā pirmajos 6 mēnešos', correct: false },
      { text: 'Tikai sirmā vecumdienu posmā', correct: false }
    ],
    hint: 'Šajā posmā organisms piedzīvo strauju augšanu, balss lūzumu un hormonu izmaiņas.',
    explanation: 'Pusaudža vecumā (pubertātē, 11–16 gados) sākas dzimumšūnu attīstība un nobriešana.'
  },
  {
    id: 13,
    critId: 13,
    title: '13. uzdevums. Iedzimstošās un neiedzimstošās pazīmes',
    pts: 1,
    solo: 'II',
    prompt: 'Kura no šīm pazīmēm ir IEDZIMSTOŠA (to bērns manto no bioloģiskajiem vecākiem ar gēniem)?',
    options: [
      { text: 'Acu krāsa, dabīgā matu krāsa un asinsgrupa', correct: true },
      { text: 'Rēta uz ceļgala pēc kritiena ar velosipēdu', correct: false },
      { text: 'Prasme runāt angļu valodā un braukt ar skrituļdēli', correct: false }
    ],
    hint: 'Zināšanas, rētas un frizūru iegūst dzīves laikā, bet acu krāsu un asinsgrupu nosaka gēni!',
    explanation: 'Acu krāsa, dabiskā matu krāsa un asinsgrupa ir iedzimtas ģenētiskas pazīmes. Rētas un prasmes ir iegūtas dzīves laikā.'
  },
  {
    id: 14,
    critId: 14,
    title: '14. uzdevums. Eksperimenta datu analīze un cēloņi (6 p.)',
    pts: 6,
    solo: 'III/IV',
    prompt: 'Analizē eksperimentu ar 4 pupu stādiem (A, B, C, D) un atbildi uz 3 jautājumiem:',
    type: 'experiment_case',
    scenario: `
      Laboratorijā 14 dienas pētīja 4 pupu stādus vienādā augsnē:
      • Stāds A: Saules gaisma + regulāra laistīšana + istabas temperatūra (+20°C) ➔ Izauga 18 cm, stiprs zaļš stumbrs, 6 veselīgas lapas.
      • Stāds B: Tumšs skapis + regulāra laistīšana + istabas temperatūra (+20°C) ➔ Izauga 22 cm garš, izstīdzējis, bāli dzeltens un vārgs.
      • Stāds C: Saules gaisma + BEZ ūdens + istabas temperatūra (+20°C) ➔ Tikai 4 cm, nokaltis un sakrunkojies.
      • Stāds D: Saules gaisma + laistīts + ledusskapī (+4°C) ➔ Tikai 5 cm, augšana apstājusies.
    `,
    subQuestions: [
      {
        qId: 'q14_a',
        label: '1) Kurš stāds uzrādīja vislabāko un veselīgāko augšanas rezultātu? (1 p.)',
        options: ['Stāds A (Kontrolgrupa)', 'Stāds B (Skapī)', 'Stāds C (Sausais)', 'Stāds D (Ledusskapī)'],
        correct: 0,
        pts: 1
      },
      {
        qId: 'q14_b',
        label: '2) Kāds ir zinātniskais skaidrojums stāda A panākumiem? (1 p.)',
        options: [
          'Stādam A bija nodrošināti visi 3 nepieciešamie faktori kopā: gaisma, mitrums un siltums',
          'Stāds A vienkārši bija garāks par visiem pārējiem',
          'Stādam A nebija vajadzīgs ūdens'
        ],
        correct: 0,
        pts: 1
      },
      {
        qId: 'q14_c',
        label: '3) Izskaidro 1. FAKTORU (Gaisma): Kāpēc stāds B skapī bija garš, bet dzeltens un vājš? (2 p.)',
        options: [
          'Bez gaismas augs nespēj veidot zaļo hlorofilu fotosintēzei, un tas tiecas uz augšu gaismas meklējumos (izstīdz)',
          'Tumsā stāds B gulēja ziemas miegā',
          'Skapī bija pārāk daudz skābekļa'
        ],
        correct: 0,
        pts: 2
      },
      {
        qId: 'q14_d',
        label: '4) Izskaidro 2. FAKTORU (Ūdens): Kāpēc stāds C nokalta un nespēja augt? (2 p.)',
        options: [
          'Ūdens ir šūnu dzīvības pamats un transportē barības vielas; bez ūdens šūnas zaudē spriegumu un augs nokalst',
          'Ūdens traucē sēklas elpošanai',
          'Saule bez ūdens liek augam kļūt par koku'
        ],
        correct: 0,
        pts: 2
      }
    ]
  }
];

// Galvenais komponentes renderētājs
export function renderMarksNatureNPD(container, options = {}) {
  const { canSubmit = true, saveProgress = null, initialTopic = null } = options;

  let currentTab = initialTopic === 'theory' ? 'theory' : initialTopic === 'practice' ? 'practice' : 'exam';
  let activeTheoryId = 't1';

  // Treniņa režīma stāvoklis
  let practiceIndex = 0;
  let practiceAnswers = {};
  let practiceShowFeedback = false;

  // Pārbaudes darba stāvoklis (25 punkti)
  let examAnswers = {};
  let examMatchAnswers = {};
  let examMultiAnswers = {};
  let examSubAnswers = {};
  let examSubmitted = false;
  let examScore = 0;
  let examPointsEarned = 0;
  let examFeedback = null;
  let examSaveStatus = '';
  let examSaving = false;

  const root = document.createElement('div');
  root.className = 'nature-npd-app marks-theme';
  container.replaceChildren(root);

  function playTone(freq, type = 'sine', duration = 0.2) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {}
  }

  function playSuccessSound() {
    playTone(523.25, 'sine', 0.12);
    setTimeout(() => playTone(659.25, 'sine', 0.12), 100);
    setTimeout(() => playTone(783.99, 'sine', 0.25), 200);
  }

  function playFanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => playTone(f, 'triangle', 0.25), idx * 90);
    });
  }

  function render() {
    root.replaceChildren();

    // Galvene
    const header = document.createElement('header');
    header.className = 'npd-header';
    header.innerHTML = `
      <div class="npd-badge-row">
        <span class="npd-badge-pill">🌱 Dabaszinības · 4. klase</span>
        <span class="npd-badge-pill gold">🏆 Lielvārds 2025 · 25 punkti</span>
        <span class="npd-badge-pill">SOLO I–IV līmeņi</span>
      </div>
      <h2>Kā vairojas, aug un attīstās dzīvie organismi?</h2>
      <p class="npd-sub">Oficiālais 4. klases nobeiguma pārbaudes darba trenažieris un laboratorija Markam.</p>
    `;

    // Audio ātrās vadības josla
    const audioBar = document.createElement('div');
    audioBar.className = 'npd-audio-bar';
    audioBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:1.2rem;">🎙️</span>
        <span style="font-weight:700; font-size:0.92rem; color:#1e293b;">Balss lasītājs latviešu valodā</span>
      </div>
      <div style="display:flex; gap:6px;">
        <button type="button" class="audio-btn stop" id="btn-stop-audio">⏹️ Apturēt balsi</button>
      </div>
    `;
    audioBar.querySelector('#btn-stop-audio').onclick = () => stopSpeaking();
    header.append(audioBar);

    // Navigācijas cilnes
    const nav = document.createElement('nav');
    nav.className = 'npd-tabs';
    const tabs = [
      { id: 'exam', label: '📝 Pārbaudes darbs (25 p.)' },
      { id: 'practice', label: '🎯 Treniņa laboratorija' },
      { id: 'theory', label: '📖 Mācību ceļvedis & Špikeris' },
      { id: 'print', label: '🖨️ Izdrukājama darba lapa' }
    ];
    tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `npd-tab-btn ${currentTab === t.id ? 'active' : ''}`;
      btn.textContent = t.label;
      btn.onclick = () => {
        stopSpeaking();
        currentTab = t.id;
        render();
      };
      nav.append(btn);
    });
    header.append(nav);
    root.append(header);

    // Saturs atkarībā no izvēlētās cilnes
    const contentBox = document.createElement('div');
    contentBox.className = 'npd-content-box';

    if (currentTab === 'theory') {
      renderTheoryView(contentBox);
    } else if (currentTab === 'practice') {
      renderPracticeView(contentBox);
    } else if (currentTab === 'print') {
      renderPrintView(contentBox);
    } else {
      renderExamView(contentBox);
    }

    root.append(contentBox);
  }

  // 1. Mācību ceļvedis & Špikeris
  function renderTheoryView(parent) {
    const wrap = document.createElement('div');
    wrap.className = 'theory-layout';

    const sidebar = document.createElement('div');
    sidebar.className = 'theory-sidebar';
    NATURE_4TH_THEORY.forEach(t => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `theory-nav-item ${activeTheoryId === t.id ? 'active' : ''}`;
      item.innerHTML = `<span>${t.icon}</span> <span>${t.title}</span>`;
      item.onclick = () => {
        stopSpeaking();
        activeTheoryId = t.id;
        render();
      };
      sidebar.append(item);
    });

    const activeItem = NATURE_4TH_THEORY.find(x => x.id === activeTheoryId) || NATURE_4TH_THEORY[0];
    const main = document.createElement('div');
    main.className = 'theory-main-card';

    const tHeader = document.createElement('div');
    tHeader.className = 'theory-header-bar';
    tHeader.innerHTML = `
      <div>
        <h3>${activeItem.icon} ${activeItem.title}</h3>
        <p class="theory-summary">${activeItem.summary}</p>
      </div>
    `;

    const speakBtn = document.createElement('button');
    speakBtn.type = 'button';
    speakBtn.className = 'audio-btn speak';
    speakBtn.textContent = '🔊 Noklausīties šo sadaļu';
    speakBtn.onclick = () => {
      const plain = activeItem.title + '. ' + activeItem.summary + '. ' +
        activeItem.content.replace(/<[^>]+>/g, ' ');
      speakText(plain);
    };
    tHeader.append(speakBtn);
    main.append(tHeader);

    const body = document.createElement('div');
    body.className = 'theory-body';
    body.innerHTML = activeItem.content;
    main.append(body);

    wrap.append(sidebar, main);
    parent.append(wrap);
  }

  // 2. Treniņa laboratorija (ar tūlītēju atgriezenisko saiti)
  function renderPracticeView(parent) {
    const q = NPD_QUESTIONS[practiceIndex];
    const wrap = document.createElement('div');
    wrap.className = 'practice-container';

    // Progresa josla
    const prog = document.createElement('div');
    prog.className = 'practice-progress-bar';
    prog.innerHTML = `
      <div class="practice-step-info">
        <strong>Uzdevums ${practiceIndex + 1} no ${NPD_QUESTIONS.length}</strong>
        <span>SOLO līmenis: <strong>${q.solo}</strong> · Vērtība: <strong>${q.pts} p.</strong></span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${((practiceIndex + 1) / NPD_QUESTIONS.length) * 100}%;"></div>
      </div>
    `;
    wrap.append(prog);

    const card = document.createElement('div');
    card.className = 'practice-card';

    const qTitle = document.createElement('div');
    qTitle.style.display = 'flex';
    qTitle.style.justifyContent = 'space-between';
    qTitle.style.alignItems = 'center';
    qTitle.style.marginBottom = '12px';
    qTitle.innerHTML = `<h3 style="margin:0;">${q.title}</h3>`;

    const speakQBtn = document.createElement('button');
    speakQBtn.type = 'button';
    speakQBtn.className = 'audio-btn speak';
    speakQBtn.textContent = '🔊 Nolasīt';
    speakQBtn.onclick = () => speakText(q.prompt);
    qTitle.append(speakQBtn);
    card.append(qTitle);

    const promptP = document.createElement('p');
    promptP.className = 'practice-prompt';
    promptP.textContent = q.prompt;
    card.append(promptP);

    // Variantu izvēle atkarībā no jautājuma tipa
    if (q.type === 'match_trio') {
      const matchBox = document.createElement('div');
      matchBox.className = 'match-box';
      q.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'match-row';
        row.innerHTML = `<strong>${item.label}</strong> ➔ `;
        const sel = document.createElement('select');
        sel.className = 'match-select';
        sel.innerHTML = `<option value="">-- Izvēlies veidu --</option>` +
          q.choices.map(c => `<option value="${c}" ${practiceAnswers[item.label] === c ? 'selected' : ''}>${c}</option>`).join('');
        sel.onchange = (e) => {
          practiceAnswers[item.label] = e.target.value;
          practiceShowFeedback = false;
        };
        row.append(sel);
        matchBox.append(row);
      });
      card.append(matchBox);
    } else if (q.type === 'multi_statements') {
      const stmtBox = document.createElement('div');
      stmtBox.className = 'stmt-box';
      q.statements.forEach((s, idx) => {
        const row = document.createElement('div');
        row.className = 'stmt-row';
        row.innerHTML = `<p style="margin:0 0 6px;">${idx + 1}. ${s.text}</p>`;
        const btnGroup = document.createElement('div');
        btnGroup.className = 'button-cluster';
        ['Patiess', 'Aplams'].forEach(ans => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = `action-button ${practiceAnswers[`s_${idx}`] === ans ? 'active' : 'quiet-button'}`;
          b.textContent = ans;
          b.onclick = () => {
            practiceAnswers[`s_${idx}`] = ans;
            practiceShowFeedback = false;
            render();
          };
          btnGroup.append(b);
        });
        row.append(btnGroup);
        stmtBox.append(row);
      });
      card.append(stmtBox);
    } else if (q.type === 'experiment_case') {
      const expBox = document.createElement('div');
      expBox.className = 'experiment-scenario-box';
      expBox.innerHTML = `<pre style="white-space:pre-wrap; font-family:inherit; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #cbd5e1;">${q.scenario.trim()}</pre>`;
      q.subQuestions.forEach(sq => {
        const sqDiv = document.createElement('div');
        sqDiv.style.marginTop = '14px';
        sqDiv.innerHTML = `<strong>${sq.label}</strong>`;
        const optList = document.createElement('div');
        optList.className = 'practice-options';
        sq.options.forEach((optText, oIdx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `practice-opt-btn ${practiceAnswers[sq.qId] === oIdx ? 'selected' : ''}`;
          btn.textContent = optText;
          btn.onclick = () => {
            practiceAnswers[sq.qId] = oIdx;
            practiceShowFeedback = false;
            render();
          };
          optList.append(btn);
        });
        sqDiv.append(optList);
        expBox.append(sqDiv);
      });
      card.append(expBox);
    } else {
      const optList = document.createElement('div');
      optList.className = 'practice-options';
      q.options.forEach((opt, oIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `practice-opt-btn ${practiceAnswers[q.id] === oIdx ? 'selected' : ''}`;
        btn.textContent = opt.text;
        btn.onclick = () => {
          practiceAnswers[q.id] = oIdx;
          practiceShowFeedback = false;
          render();
        };
        optList.append(btn);
      });
      card.append(optList);
    }

    // Pārbaudes un atgriezeniskās saites poga
    const btnRow = document.createElement('div');
    btnRow.className = 'practice-actions';

    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = 'action-button';
    checkBtn.textContent = '🔍 Pārbaudīt atbildi';
    checkBtn.onclick = () => {
      practiceShowFeedback = true;
      playSuccessSound();
      render();
    };
    btnRow.append(checkBtn);

    if (practiceIndex > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'quiet-button';
      prevBtn.textContent = '← Iepriekšējais';
      prevBtn.onclick = () => {
        practiceIndex--;
        practiceShowFeedback = false;
        render();
      };
      btnRow.append(prevBtn);
    }

    if (practiceIndex < NPD_QUESTIONS.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'action-button';
      nextBtn.textContent = 'Nākamais uzdevums →';
      nextBtn.onclick = () => {
        practiceIndex++;
        practiceShowFeedback = false;
        render();
      };
      btnRow.append(nextBtn);
    }

    card.append(btnRow);

    if (practiceShowFeedback) {
      const fb = document.createElement('div');
      fb.className = 'practice-feedback-box';
      fb.innerHTML = `
        <div style="font-weight:800; color:#059669; margin-bottom:6px;">💡 Zinātniskais skaidrojums:</div>
        <p style="margin:0 0 8px;">${q.explanation}</p>
        <div style="font-size:0.88rem; color:#64748b;">Padoms: ${q.hint}</div>
      `;
      card.append(fb);
    }

    wrap.append(card);
    parent.append(wrap);
  }

  // 3. Pārbaudes darba simulators (25 punkti, 14 uzdevumi)
  function renderExamView(parent) {
    const wrap = document.createElement('div');
    wrap.className = 'exam-container';

    if (examSubmitted) {
      renderExamResults(wrap);
      parent.append(wrap);
      return;
    }

    const banner = document.createElement('div');
    banner.className = 'exam-intro-banner';
    banner.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <h3 style="margin:0 0 4px; color:#0f172a;">📋 Oficiālais pārbaudes darbs: 14 uzdevumi (25 punkti)</h3>
          <p style="margin:0; font-size:0.92rem; color:#475569;">Izpildi visus uzdevumus rūpīgi. Sasniedzot vismaz 80% (20 p.), saņemsi <strong>+20 BP</strong> Zelta bonusu!</p>
        </div>
        <div class="exam-status-badge">Kopā: 25 p. · SOLO I–IV</div>
      </div>
    `;
    wrap.append(banner);

    const questionsList = document.createElement('div');
    questionsList.className = 'exam-questions-list';

    NPD_QUESTIONS.forEach((q) => {
      const qCard = document.createElement('article');
      qCard.className = 'exam-q-card';
      qCard.id = `exam-q-${q.id}`;

      const qHead = document.createElement('div');
      qHead.className = 'exam-q-head';
      qHead.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="q-num-badge">${q.id}</span>
          <h4 style="margin:0; font-size:1.1rem; color:#0f172a;">${q.title}</h4>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="q-pts-pill">${q.pts} ${q.pts === 1 ? 'punkts' : 'punkti'} · SOLO ${q.solo}</div>
          <button type="button" class="audio-btn speak q-speak-btn" title="Noklausīties jautājumu balsī">🔊 Nolasīt</button>
        </div>
      `;
      qHead.querySelector('.q-speak-btn').onclick = () => speakText(q.prompt);
      qCard.append(qHead);

      const promptEl = document.createElement('p');
      promptEl.className = 'exam-q-prompt';
      promptEl.textContent = q.prompt;
      qCard.append(promptEl);

      // Rendering input according to question type
      if (q.type === 'match_trio') {
        const trioDiv = document.createElement('div');
        trioDiv.className = 'exam-match-group';
        q.items.forEach(it => {
          const row = document.createElement('div');
          row.className = 'match-row';
          row.innerHTML = `<span style="min-width:140px; font-weight:700; color:#0f172a;">${it.label}</span><span style="color:#059669; font-weight:800;">➔</span>`;
          const sel = document.createElement('select');
          sel.className = 'match-select';
          sel.innerHTML = `<option value="">-- Izvēlies pavairošanas veidu --</option>` +
            q.choices.map(c => `<option value="${c}" ${examMatchAnswers[it.label] === c ? 'selected' : ''}>${c}</option>`).join('');
          sel.onchange = (e) => {
            examMatchAnswers[it.label] = e.target.value;
          };
          row.append(sel);
          trioDiv.append(row);
        });
        qCard.append(trioDiv);
      } else if (q.type === 'multi_statements') {
        const stmtDiv = document.createElement('div');
        stmtDiv.className = 'exam-multi-group';
        q.statements.forEach((st, sIdx) => {
          const row = document.createElement('div');
          row.className = 'stmt-card-row';
          row.innerHTML = `<div style="font-weight:600; margin-bottom:8px; color:#0f172a; line-height:1.5;">${sIdx + 1}) ${st.text}</div>`;
          const cluster = document.createElement('div');
          cluster.className = 'button-cluster';
          ['Patiess', 'Aplams'].forEach(val => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `action-button ${examMultiAnswers[`s_${sIdx}`] === val ? 'active' : 'quiet-button'}`;
            b.textContent = val;
            b.onclick = () => {
              examMultiAnswers[`s_${sIdx}`] = val;
              render();
            };
            cluster.append(b);
          });
          row.append(cluster);
          stmtDiv.append(row);
        });
        qCard.append(stmtDiv);
      } else if (q.type === 'experiment_case') {
        const expDiv = document.createElement('div');
        expDiv.className = 'exam-exp-group';
        expDiv.innerHTML = `
          <div class="experiment-description">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span style="font-size:1.3rem;">🔬</span>
              <strong style="font-size:1.08rem; color:#064e3b;">Laboratorijas pētījums: 4 pupu stādi 14 dienu eksperimentā</strong>
            </div>
            <p style="margin:0 0 12px; font-size:0.95rem; color:#166534;">Četri vienādi pupu stādi vienādā augsnē tika audzēti dažādos apstākļos:</p>
            <ul style="margin:0; padding:0; list-style:none; display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px;">
              <li style="background:#ffffff; border:1.5px solid #bbf7d0; border-radius:14px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <strong style="color:#065f46;">🌱 Stāds A</strong>
                  <span style="background:#dcfce7; color:#166534; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:99px;">Kontrolgrupa</span>
                </div>
                <div style="font-size:0.88rem; color:#475569; margin-bottom:6px;">☀️ Saule · 💧 Laistīts · 🌡️ +20°C</div>
                <div style="font-size:0.88rem; font-weight:700; color:#059669;">➔ 18 cm, stiprs zaļš stumbrs, 6 veselīgas lapas.</div>
              </li>
              <li style="background:#ffffff; border:1.5px solid #fed7aa; border-radius:14px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <strong style="color:#9a3412;">🚪 Stāds B</strong>
                  <span style="background:#ffedd5; color:#9a3412; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:99px;">Tumsa</span>
                </div>
                <div style="font-size:0.88rem; color:#475569; margin-bottom:6px;">🌑 Tumšs skapis · 💧 Laistīts · 🌡️ +20°C</div>
                <div style="font-size:0.88rem; font-weight:700; color:#c2410c;">➔ 22 cm, bāli dzeltens, izstīdzējis un vārgs.</div>
              </li>
              <li style="background:#ffffff; border:1.5px solid #fecaca; border-radius:14px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <strong style="color:#991b1b;">🏜️ Stāds C</strong>
                  <span style="background:#fee2e2; color:#991b1b; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:99px;">Bez ūdens</span>
                </div>
                <div style="font-size:0.88rem; color:#475569; margin-bottom:6px;">☀️ Saule · 🚫 Bez laistīšanas · 🌡️ +20°C</div>
                <div style="font-size:0.88rem; font-weight:700; color:#dc2626;">➔ 4 cm, nokaltis un sakrunkojies.</div>
              </li>
              <li style="background:#ffffff; border:1.5px solid #bfdbfe; border-radius:14px; padding:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <strong style="color:#1e40af;">❄️ Stāds D</strong>
                  <span style="background:#dbeafe; color:#1e40af; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:99px;">Aukstums</span>
                </div>
                <div style="font-size:0.88rem; color:#475569; margin-bottom:6px;">☀️ Saule · 💧 Laistīts · 🧊 Ledusskapī (+4°C)</div>
                <div style="font-size:0.88rem; font-weight:700; color:#2563eb;">➔ 5 cm, augšana apstājusies.</div>
              </li>
            </ul>
          </div>
        `;
        q.subQuestions.forEach(sq => {
          const subBox = document.createElement('div');
          subBox.style.marginBottom = '18px';
          subBox.innerHTML = `<div style="font-weight:700; color:#0f172a; margin-bottom:10px; font-size:1.03rem;">${sq.label}</div>`;
          const opts = document.createElement('div');
          opts.className = 'exam-options-stack';
          sq.options.forEach((optText, oIdx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `exam-choice-btn ${examSubAnswers[sq.qId] === oIdx ? 'selected' : ''}`;
            btn.textContent = optText;
            btn.setAttribute('aria-pressed',String(examSubAnswers[sq.qId] === oIdx));
            btn.onclick = () => {
              examSubAnswers[sq.qId] = oIdx;
              opts.querySelectorAll('.exam-choice-btn').forEach((choice,index)=>{choice.classList.toggle('selected',index===oIdx);choice.setAttribute('aria-pressed',String(index===oIdx));});
            };
            opts.append(btn);
          });
          subBox.append(opts);
          expDiv.append(subBox);
        });
        qCard.append(expDiv);
      } else {
        const opts = document.createElement('div');
        opts.className = 'exam-options-stack';
        q.options.forEach((opt, oIdx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `exam-choice-btn ${examAnswers[q.id] === oIdx ? 'selected' : ''}`;
          btn.textContent = opt.text;
          btn.setAttribute('aria-pressed',String(examAnswers[q.id] === oIdx));
          btn.onclick = () => {
            examAnswers[q.id] = oIdx;
            opts.querySelectorAll('.exam-choice-btn').forEach((choice,index)=>{choice.classList.toggle('selected',index===oIdx);choice.setAttribute('aria-pressed',String(index===oIdx));});
          };
          opts.append(btn);
        });
        qCard.append(opts);
      }

      questionsList.append(qCard);
    });

    wrap.append(questionsList);

    // Iesniegšanas poga
    const submitBar = document.createElement('div');
    submitBar.className = 'exam-submit-bar';
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'action-button submit-exam-btn';
    submitBtn.innerHTML = '✨ Pabeigt un iesniegt pārbaudes darbu (25 punkti)';
    submitBtn.onclick = async () => {
      calculateAndSubmitExam();
    };
    submitBar.append(submitBtn);
    wrap.append(submitBar);

    parent.append(wrap);
  }

  // Aprēķina rezultātus un saglabā progress ierakstu
  async function calculateAndSubmitExam() {
    let totalEarned = 0;
    const breakdown = [];

    NPD_QUESTIONS.forEach(q => {
      let earned = 0;
      if (q.type === 'match_trio') {
        let matchCount = 0;
        q.items.forEach(it => {
          if (examMatchAnswers[it.label] === it.correct) matchCount++;
        });
        earned = matchCount; // max 3 pts
      } else if (q.type === 'multi_statements') {
        let stCount = 0;
        q.statements.forEach((st, sIdx) => {
          const expected = st.correct ? 'Patiess' : 'Aplams';
          if (examMultiAnswers[`s_${sIdx}`] === expected) stCount++;
        });
        earned = stCount; // max 3 pts
      } else if (q.type === 'experiment_case') {
        let expTotal = 0;
        q.subQuestions.forEach(sq => {
          if (examSubAnswers[sq.qId] === sq.correct) expTotal += sq.pts;
        });
        earned = expTotal; // max 6 pts
      } else {
        const chosen = examAnswers[q.id];
        if (chosen !== undefined) {
          const opt = q.options[chosen];
          if (opt && opt.correct) {
            earned = opt.pts !== undefined ? opt.pts : q.pts;
          }
        }
      }
      totalEarned += earned;
      breakdown.push({ critId: q.critId, title: q.title, maxPts: q.pts, earned, solo: q.solo });
    });

    examPointsEarned = totalEarned;
    examScore = Math.round((totalEarned / 25) * 100);
    examSubmitted = true;
    examFeedback = breakdown;
    examSaveStatus = '⏳ Saglabāju rezultātu…';
    examSaving = true;
    render();

    if (examScore >= 80) {
      playFanfare();
    } else {
      playSuccessSound();
    }

    if (canSubmit && typeof saveProgress === 'function') {
      try {
        const savedId = await saveProgress({
          studentRole: 'marks',
          subject: 'Dabaszinības',
          subjectId: 'nature',
          topicId: 'organismi_npd',
          activityType: 'Dabaszinības 4. kl. · NPD',
          score: examScore,
          mode: 'exam',
          notes: JSON.stringify({
            correct: examPointsEarned,
            total: 25,
            mode: 'exam',
            missionId: 'oct29-nature-organisms',
            breakdown
          })
        });
        if(!savedId)throw Error('Saglabāšana netika apstiprināta');
        examSaveStatus = '✅ Rezultāts apstiprināti saglabāts. Faktiski ieskaitītos BP skati kvītī.';
      } catch (err) {
        examSaveStatus = '⚠️ Saglabāšana nav apstiprināta. Rezultāts ir saglabāts ierīces rezerves rindā — izmanto atkārtotas nosūtīšanas pogu dienas plānā.';
        console.warn('Neizdevās saglabāt Dabaszinību NPD:', err);
      }
    }else{
      examSaveStatus = 'Priekšskatījuma režīms — punkti netiek saglabāti.';
    }
    examSaving = false;
    render();
  }

  // Pārbaudes darba rezultātu un diploma skats
  function renderExamResults(parent) {
    const card = document.createElement('div');
    card.className = 'exam-results-card';

    const grade = examPointsEarned >= 24 ? 10 :
      examPointsEarned >= 22 ? 9 :
      examPointsEarned >= 19 ? 8 :
      examPointsEarned >= 16 ? 7 :
      examPointsEarned >= 13 ? 6 :
      examPointsEarned >= 10 ? 5 : 4;

    const gradeText = examPointsEarned >= 24 ? 'Izcili! 🏆' :
      examPointsEarned >= 22 ? 'Teicami! 🌟' :
      examPointsEarned >= 19 ? 'Ļoti labi! ⭐' :
      examPointsEarned >= 16 ? 'Labi!' : 'Jāpatrenējas vēl!';

    // SOLO līmeņu punkti
    const soloStats = { I: { got: 0, max: 8 }, II: { got: 0, max: 8 }, III: { got: 0, max: 6 }, IV: { got: 0, max: 3 } };
    examFeedback.forEach(f => {
      if (f.solo === 'III/IV') {
        // q14 has 6 pts: 2 pts level III, 4 pts level IV
        soloStats['III'].got += Math.min(2, f.earned);
        soloStats['IV'].got += Math.max(0, f.earned - 2);
      } else if (soloStats[f.solo]) {
        soloStats[f.solo].got += f.earned;
      }
    });

    const saveNotice=document.createElement('p');
    saveNotice.setAttribute('role','status');
    saveNotice.className='npd-save-status';
    saveNotice.textContent=examSaveStatus||'Rezultāta saglabāšanas statuss nav zināms.';
    card.innerHTML = `
      <div class="results-header-box ${examScore >= 80 ? 'gold' : ''}">
        <span class="gold-trophy-icon">${examScore >= 80 ? '🏆' : '🌱'}</span>
        <h2>${examScore >= 80 ? 'Apsveicam, Mark! Zelta pārbaudes darbs nokārtots!' : 'Pārbaudes darba rezultāts'}</h2>
        <div class="score-display">
          <strong>${examPointsEarned} no 25 punktiem (${examScore}%)</strong>
          <span class="grade-pill">Vērtējums: ${grade} balles (${gradeText})</span>
        </div>
        ${examScore >= 80 ? '<p class="bonus-congrats">🎉 Sasniegts 80% slieksnis. +20 BP īpašo bonusu ieskaita vienreiz pēc veiksmīgas saglabāšanas; precīzu piešķīrumu skati BP kvītī.</p>' : '<p>Lai saņemtu +20 BP Zelta bonusu, nepieciešams sasniegt vismaz 80% (20 p.). Pārskati kļūdas un pamēģini vēlreiz!</p>'}
      </div>

      <div class="solo-levels-grid">
        <div class="solo-card">
          <h4>SOLO I Līmenis</h4>
          <div class="solo-val">${soloStats.I.got} / ${soloStats.I.max} p.</div>
          <small>Faktu un jēdzienu atpazīšana</small>
        </div>
        <div class="solo-card">
          <h4>SOLO II Līmenis</h4>
          <div class="solo-val">${soloStats.II.got} / ${soloStats.II.max} p.</div>
          <small>Sakarības, cikli un apstākļi</small>
        </div>
        <div class="solo-card">
          <h4>SOLO III Līmenis</h4>
          <div class="solo-val">${soloStats.III.got} / ${soloStats.III.max} p.</div>
          <small>Piemēru analīze un grupēšana</small>
        </div>
        <div class="solo-card">
          <h4>SOLO IV Līmenis</h4>
          <div class="solo-val">${soloStats.IV.got} / ${soloStats.IV.max} p.</div>
          <small>Eksperimenta datu pamatojums</small>
        </div>
      </div>

      <div class="results-actions-bar">
        <button type="button" class="action-button" id="btn-retake">🔄 Mēģināt vēlreiz</button>
        <button type="button" class="action-button" style="background:#059669;" id="btn-print-diploma">🖨️ Drukāt Apliecinājumu / Diplomu</button>
      </div>

      <h3 style="margin-top:28px; margin-bottom:12px;">📊 Uzdevumu detalizēts vērtējums (14 kritēriji):</h3>
      <div class="breakdown-table-wrap">
        <table class="npd-table">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Vērtēšanas kritērijs</th>
              <th>SOLO</th>
              <th>Punkti</th>
              <th>Statuss</th>
            </tr>
          </thead>
          <tbody>
            ${examFeedback.map(f => `
              <tr>
                <td><strong>${f.critId}</strong></td>
                <td>${f.title}</td>
                <td><span class="solo-tag">${f.solo}</span></td>
                <td><strong>${f.earned} / ${f.maxPts}</strong></td>
                <td>${f.earned === f.maxPts ? '✅ Pilnīgi pareizi' : f.earned > 0 ? '⚠️ Daļēji pareizi' : '❌ Nepareizi'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    card.prepend(saveNotice);

    card.querySelector('#btn-retake').onclick = () => {
      examSubmitted = false;
      examAnswers = {};
      examMatchAnswers = {};
      examMultiAnswers = {};
      examSubAnswers = {};
      render();
    };

    card.querySelector('#btn-print-diploma').onclick = () => {
      window.print();
    };

    parent.append(card);
  }

  // 4. Izdrukājamā darba lapa A4
  function renderPrintView(parent) {
    const wrap = document.createElement('div');
    wrap.className = 'print-view-container';

    const printActions = document.createElement('div');
    printActions.className = 'print-actions no-print';
    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.className = 'action-button';
    printBtn.textContent = '🖨️ Izdrukāt darba lapu (Print / PDF)';
    printBtn.onclick = () => window.print();
    printActions.append(printBtn);
    wrap.append(printActions);

    const sheet = document.createElement('div');
    sheet.className = 'print-worksheet-sheet';
    sheet.innerHTML = `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <h2 style="margin:0; font-size:1.45rem; color:#0f172a;">Dabaszinības · 4. klase · Pārbaudes darbs</h2>
          <span style="font-weight:800; font-size:1rem; color:#475569;">Lielvārds 2025</span>
        </div>
        <div style="font-size:1.15rem; font-weight:800; margin-top:6px; color:#0f172a;">Kā vairojas, aug un attīstās dzīvie organismi?</div>
        <div style="display:flex; justify-content:space-between; margin-top:14px; font-weight:700;">
          <div>Skolēna vārds: <strong>Marks</strong></div>
          <div>Datums: ${new Date().toLocaleDateString('lv-LV')}</div>
          <div>Kopā: ______ / 25 punkti (SOLO I–IV)</div>
        </div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>1. uzdevums.</strong> Kādēļ dzīvajiem organismiem dabā ir nepieciešams vairoties? (1 p.)</div>
        <div style="border-bottom:1px dotted #94a3b8; height:24px;"></div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>2. uzdevums.</strong> Nosauc 3 augus, kuri vairojas ar sēklām! (1 p.)</div>
        <div style="border-bottom:1px dotted #94a3b8; height:24px;"></div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>3. uzdevums.</strong> Nosauc 2 dzīvniekus, kuri vairojas ar olām! (1 p.)</div>
        <div style="border-bottom:1px dotted #94a3b8; height:24px;"></div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>4. uzdevums.</strong> Kuri dzīvnieki dzemdē mazuļus un baro ar pienu? Nosauc 2 piemērus! (1 p.)</div>
        <div style="border-bottom:1px dotted #94a3b8; height:24px;"></div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>5. uzdevums.</strong> Sakārto ziedauga dzīves cikla posmus (1–6)! (1 p.)</div>
        <div>[ &nbsp; ] Ziedēšana &nbsp;&nbsp;&nbsp; [ &nbsp; ] Sēkla &nbsp;&nbsp;&nbsp; [ &nbsp; ] Dīgsts &nbsp;&nbsp;&nbsp; [ &nbsp; ] Pieaudzis augs &nbsp;&nbsp;&nbsp; [ &nbsp; ] Auglis ar sēklām</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>6. uzdevums.</strong> Nosauc zieda vīrišķo un sievišķo vairošanās daļu! (1 p.)</div>
        <div>Vīrišķā daļa: ___________________________ &nbsp;&nbsp; Sievišķā daļa: ___________________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>7. uzdevums.</strong> Paskaidro, kas ir apputeksnēšanās un kas to veic! (1 p.)</div>
        <div style="border-bottom:1px dotted #94a3b8; height:24px;"></div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>8. uzdevums.</strong> Nosauc TRĪS apstākļus, kas obligāti nepieciešami sēklas uzdīgšanai! (2 p.)</div>
        <div>1) _________________________ &nbsp; 2) _________________________ &nbsp; 3) _________________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>9. uzdevums.</strong> Ar ko pavairo šos augus (veģetatīvi)? (3 p.)</div>
        <div>a) Kartupeli: _____________________ &nbsp; b) Tulpi: _____________________ &nbsp; c) Zemeni: _____________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>10. uzdevums.</strong> Skaidro dzīvnieku uzvedību! (3 p.)</div>
        <div>a) Kas ir putnu riests? ________________________________________________________________</div>
        <div>b) Kas olā baro dīgli? __________________ &nbsp; c) Kā vecāki aprūpē mazuļus? __________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>11. uzdevums.</strong> Sakārto tauriņa attīstības posmus (1–4)! (2 p.)</div>
        <div>[ &nbsp; ] Kūniņa &nbsp;&nbsp;&nbsp; [ &nbsp; ] Ola &nbsp;&nbsp;&nbsp; [ &nbsp; ] Pieaudzis tauriņš &nbsp;&nbsp;&nbsp; [ &nbsp; ] Kāpurs</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>12. uzdevums.</strong> Kurā cilvēka attīstības posmā attīstās dzimumšūnas? (1 p.) ______________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>13. uzdevums.</strong> Nosauc vienu iedzimto un vienu neiedzimto (iegūto) pazīmi! (1 p.)</div>
        <div>Iedzimtā: ________________________________ &nbsp;&nbsp; Iegūtā: ________________________________</div>
      </div>

      <div style="margin-bottom:12px; line-height:1.7;">
        <div><strong>14. uzdevums. Eksperimenta analīze</strong> (Pupiņu stādi A, B, C, D) (6 p.)</div>
        <div>a) Kurš stāds izauga vislabāk un kāpēc? __________________________________________________</div>
        <div>b) Izskaidro gaismas ietekmi uz stādu B: _________________________________________________</div>
        <div>c) Izskaidro ūdens trūkuma ietekmi uz stādu C: ____________________________________________</div>
      </div>

      <div style="border-top:1px solid #cbd5e1; padding-top:10px; margin-top:20px; font-size:0.88rem; color:#64748b; display:flex; justify-content:space-between;">
        <span>Vērtējums: 24-25 p. (10) · 22-23 p. (9) · 19-21 p. (8) · 16-18 p. (7) · 13-15 p. (6)</span>
        <span>Skolotāja paraksts: _________________</span>
      </div>
    `;
    wrap.append(sheet);
    parent.append(wrap);
  }

  // CSS stili — tīrs, mierīgs un augstas salasāmības dabaszinību mācību dizains
  const style = document.createElement('style');
  style.textContent = `
    /* Dabaszinību NPD trenažieris un laboratorija — augsta kontrasta, mierīgs ziemeļniecisks dizains */
    .nature-npd-app {
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif !important;
      background: #f8fafc !important;
      color: #0f172a !important;
      color-scheme: light !important;
      max-width: 1060px !important;
      margin: 0 auto !important;
      padding: 16px 20px 48px !important;
      border-radius: 24px !important;
    }
    .nature-npd-app * {
      box-sizing: border-box !important;
    }

    /* Galvene */
    .nature-npd-app .npd-header {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 55%, #e6f7ef 100%) !important;
      border: 1.5px solid #a7f3d0 !important;
      border-radius: 22px !important;
      padding: 26px 30px !important;
      margin-bottom: 24px !important;
      box-shadow: 0 8px 24px -4px rgba(16, 185, 129, 0.09) !important;
    }
    .nature-npd-app .npd-badge-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      margin-bottom: 12px !important;
    }
    .nature-npd-app .npd-badge-pill {
      background: #ffffff !important;
      color: #065f46 !important;
      border: 1px solid #6ee7b7 !important;
      padding: 5px 14px !important;
      border-radius: 99px !important;
      font-size: 0.82rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.02em !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03) !important;
    }
    .nature-npd-app .npd-badge-pill.gold {
      background: #fef3c7 !important;
      color: #92400e !important;
      border-color: #fcd34d !important;
    }
    .nature-npd-app .npd-header h2 {
      margin: 0 0 8px !important;
      color: #064e3b !important;
      font-size: clamp(1.4rem, 2.8vw, 1.85rem) !important;
      font-weight: 800 !important;
      line-height: 1.3 !important;
    }
    .nature-npd-app .npd-sub {
      margin: 0 0 16px !important;
      color: #047857 !important;
      font-size: 1.02rem !important;
      font-weight: 500 !important;
      line-height: 1.5 !important;
    }

    /* Balss lasītāja josla */
    .nature-npd-app .npd-audio-bar {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      background: #ffffffcc !important;
      backdrop-filter: blur(8px) !important;
      border: 1px solid #a7f3d0 !important;
      padding: 10px 18px !important;
      border-radius: 14px !important;
      margin-bottom: 18px !important;
      gap: 12px !important;
      flex-wrap: wrap !important;
    }
    .nature-npd-app .audio-btn {
      padding: 8px 16px !important;
      border-radius: 10px !important;
      font-weight: 700 !important;
      font-size: 0.88rem !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      border: 1px solid transparent !important;
    }
    .nature-npd-app .audio-btn.speak {
      background: #059669 !important;
      color: #ffffff !important;
      box-shadow: 0 2px 6px rgba(5, 150, 105, 0.22) !important;
    }
    .nature-npd-app .audio-btn.speak:hover {
      background: #047857 !important;
      transform: translateY(-1px) !important;
    }
    .nature-npd-app .audio-btn.stop {
      background: #fef2f2 !important;
      color: #b91c1c !important;
      border-color: #fecaca !important;
    }
    .nature-npd-app .audio-btn.stop:hover {
      background: #fee2e2 !important;
    }

    /* Navigācijas cilnes */
    .nature-npd-app .npd-tabs {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
    }
    .nature-npd-app .npd-tab-btn {
      padding: 11px 20px !important;
      border-radius: 12px !important;
      font-weight: 700 !important;
      font-size: 0.94rem !important;
      border: 1.5px solid #a7f3d0 !important;
      background: #ffffff !important;
      color: #065f46 !important;
      cursor: pointer !important;
      transition: all 0.16s ease !important;
    }
    .nature-npd-app .npd-tab-btn:hover {
      background: #f0fdf4 !important;
      border-color: #059669 !important;
      color: #047857 !important;
    }
    .nature-npd-app .npd-tab-btn.active {
      background: #059669 !important;
      color: #ffffff !important;
      border-color: #059669 !important;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.28) !important;
    }

    /* Pārbaudes darba ekrāns */
    .nature-npd-app .exam-container {
      background: transparent !important;
    }
    .nature-npd-app .exam-intro-banner {
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-left: 5px solid #059669 !important;
      border-radius: 16px !important;
      padding: 18px 22px !important;
      margin-bottom: 24px !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03) !important;
    }
    .nature-npd-app .exam-status-badge {
      background: #059669 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      padding: 7px 16px !important;
      border-radius: 99px !important;
      font-size: 0.88rem !important;
    }
    .nature-npd-app .exam-questions-list {
      display: flex !important;
      flex-direction: column !important;
      gap: 22px !important;
    }

    /* Jautājumu kartīte */
    .nature-npd-app .exam-q-card {
      display: block !important;
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 20px !important;
      padding: 24px 28px !important;
      box-shadow: 0 3px 12px -2px rgba(15, 23, 42, 0.04) !important;
      transition: border-color 0.2s ease !important;
    }
    .nature-npd-app .exam-q-card:hover {
      border-color: #cbd5e1 !important;
    }
    .nature-npd-app .exam-q-head {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 14px !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
    }
    .nature-npd-app .q-num-badge {
      background: #059669 !important;
      color: #ffffff !important;
      font-weight: 800 !important;
      width: 32px !important;
      height: 32px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 10px !important;
      font-size: 0.95rem !important;
    }
    .nature-npd-app .exam-q-head h4 {
      margin: 0 !important;
      font-size: 1.12rem !important;
      font-weight: 700 !important;
      color: #0f172a !important;
    }
    .nature-npd-app .q-pts-pill {
      background: #f1f5f9 !important;
      color: #334155 !important;
      border: 1px solid #e2e8f0 !important;
      font-size: 0.82rem !important;
      font-weight: 700 !important;
      padding: 5px 12px !important;
      border-radius: 99px !important;
    }
    .nature-npd-app .q-speak-btn {
      padding: 5px 12px !important;
      font-size: 0.82rem !important;
      font-weight: 700 !important;
      border-radius: 8px !important;
    }
    .nature-npd-app .exam-q-prompt {
      font-size: 1.14rem !important;
      font-weight: 700 !important;
      color: #0f291e !important;
      line-height: 1.6 !important;
      margin: 0 0 18px !important;
    }

    /* Atbilžu izvēles pogas */
    .nature-npd-app .exam-options-stack {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
      width: 100% !important;
    }
    .nature-npd-app .exam-choice-btn {
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      white-space: normal !important;
      min-height: 54px !important;
      padding: 14px 18px !important;
      text-align: left !important;
      line-height: 1.5 !important;
      background: #ffffff !important;
      color: #1e293b !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 14px !important;
      font-size: 1.02rem !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.16s ease !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;
    }
    .nature-npd-app .exam-choice-btn::before {
      content: '' !important;
      display: inline-block !important;
      flex-shrink: 0 !important;
      width: 20px !important;
      height: 20px !important;
      border-radius: 50% !important;
      border: 2px solid #cbd5e1 !important;
      background: #ffffff !important;
      transition: all 0.15s ease !important;
    }
    .nature-npd-app .exam-choice-btn:hover {
      background: #f8fafc !important;
      border-color: #10b981 !important;
      color: #0f172a !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08) !important;
    }
    .nature-npd-app .exam-choice-btn:hover::before {
      border-color: #10b981 !important;
    }
    .nature-npd-app .exam-choice-btn.selected {
      background: #ecfdf5 !important;
      color: #064e3b !important;
      border: 2px solid #059669 !important;
      font-weight: 700 !important;
      box-shadow: 0 3px 10px rgba(5, 150, 105, 0.15) !important;
    }
    .nature-npd-app .exam-choice-btn.selected::before {
      border-color: #059669 !important;
      background: radial-gradient(circle at center, #059669 45%, #ffffff 50%) !important;
      box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
    }
    .nature-npd-app .exam-choice-btn:focus-visible {
      outline: 2px solid #059669 !important;
      outline-offset: 2px !important;
    }

    /* Savienošanas uzdevums (match_trio - 9. uzd.) */
    .nature-npd-app .exam-match-group {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      background: #f8fafc !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 16px !important;
      padding: 16px !important;
    }
    .nature-npd-app .match-row {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 12px !important;
      padding: 12px 18px !important;
      flex-wrap: wrap !important;
    }
    .nature-npd-app .match-select {
      padding: 10px 16px !important;
      border-radius: 10px !important;
      border: 1.5px solid #cbd5e1 !important;
      background: #ffffff !important;
      color: #0f172a !important;
      font-weight: 600 !important;
      font-size: 0.98rem !important;
      min-height: 44px !important;
      cursor: pointer !important;
      flex: 1 !important;
      max-width: 320px !important;
      transition: border-color 0.15s ease !important;
    }
    .nature-npd-app .match-select:focus {
      border-color: #059669 !important;
      outline: 2px solid #059669 !important;
      outline-offset: 2px !important;
    }

    /* Apgalvojumu izvērtēšana (multi_statements - 10. uzd.) */
    .nature-npd-app .exam-multi-group {
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;
    }
    .nature-npd-app .stmt-card-row {
      background: #f8fafc !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 14px !important;
      padding: 16px 18px !important;
    }
    .nature-npd-app .stmt-card-row .button-cluster {
      display: flex !important;
      gap: 10px !important;
      margin-top: 10px !important;
    }
    .nature-npd-app .stmt-card-row .button-cluster button {
      flex: 1 !important;
      min-height: 44px !important;
      border-radius: 10px !important;
      font-weight: 700 !important;
      font-size: 0.95rem !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      box-shadow: none !important;
    }
    .nature-npd-app .stmt-card-row .quiet-button {
      background: #ffffff !important;
      border: 1.5px solid #cbd5e1 !important;
      color: #475569 !important;
    }
    .nature-npd-app .stmt-card-row .quiet-button:hover {
      background: #f1f5f9 !important;
      border-color: #94a3b8 !important;
      color: #1e293b !important;
    }
    .nature-npd-app .stmt-card-row .action-button.active {
      background: #059669 !important;
      color: #ffffff !important;
      border: 2px solid #059669 !important;
      box-shadow: 0 3px 10px rgba(5, 150, 105, 0.25) !important;
    }

    /* Eksperimenta analīze (14. uzd.) */
    .nature-npd-app .experiment-description {
      background: #f0fdf4 !important;
      border: 1.5px solid #86efac !important;
      border-radius: 16px !important;
      padding: 20px 22px !important;
      margin-bottom: 24px !important;
      box-shadow: 0 2px 10px rgba(16, 185, 129, 0.05) !important;
      line-height: 1.6 !important;
    }
    .nature-npd-app .exam-exp-group > div:not(.experiment-description) {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 16px !important;
      padding: 18px 20px !important;
      margin-bottom: 18px !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02) !important;
    }

    /* Iesniegšanas poga */
    .nature-npd-app .exam-submit-bar {
      margin-top: 30px !important;
      padding-top: 24px !important;
      border-top: 2px dashed #cbd5e1 !important;
      display: flex !important;
      justify-content: center !important;
    }
    .nature-npd-app .submit-exam-btn {
      background: linear-gradient(135deg, #059669, #10b981) !important;
      color: #ffffff !important;
      font-size: 1.1rem !important;
      font-weight: 800 !important;
      padding: 16px 36px !important;
      border-radius: 16px !important;
      border: none !important;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.28) !important;
      cursor: pointer !important;
      transition: all 0.16s ease !important;
    }
    .nature-npd-app .submit-exam-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 14px 30px rgba(16, 185, 129, 0.38) !important;
    }

    /* Saglabāšanas statuss */
    .nature-npd-app .npd-save-status {
      background: #ecfdf5 !important;
      color: #064e3b !important;
      border: 1.5px solid #059669 !important;
      border-radius: 14px !important;
      padding: 16px 20px !important;
      font-weight: 700 !important;
      font-size: 1.02rem !important;
      margin-bottom: 22px !important;
      box-shadow: 0 2px 8px rgba(5, 150, 105, 0.08) !important;
    }

    /* Rezultātu ekrāns & Diploms */
    .nature-npd-app .exam-results-card {
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 24px !important;
      padding: 32px !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04) !important;
    }
    .nature-npd-app .results-header-box {
      text-align: center !important;
      background: #f0fdf4 !important;
      border: 2px solid #86efac !important;
      border-radius: 20px !important;
      padding: 28px !important;
      margin-bottom: 24px !important;
    }
    .nature-npd-app .results-header-box.gold {
      background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%) !important;
      border-color: #fcd34d !important;
    }
    .nature-npd-app .gold-trophy-icon {
      font-size: 3.6rem !important;
      display: block !important;
      margin-bottom: 10px !important;
    }
    .nature-npd-app .score-display {
      margin: 14px 0 !important;
      font-size: 1.35rem !important;
      color: #064e3b !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
    }
    .nature-npd-app .grade-pill {
      background: #059669 !important;
      color: #ffffff !important;
      font-weight: 800 !important;
      padding: 6px 18px !important;
      border-radius: 99px !important;
      font-size: 0.98rem !important;
    }
    .nature-npd-app .bonus-congrats {
      font-weight: 700 !important;
      color: #92400e !important;
      font-size: 1.05rem !important;
      margin: 10px 0 0 !important;
    }
    .nature-npd-app .solo-levels-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)) !important;
      gap: 14px !important;
      margin-bottom: 26px !important;
    }
    .nature-npd-app .solo-card {
      background: #f8fafc !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 14px !important;
      padding: 16px !important;
      text-align: center !important;
      transition: transform 0.15s ease !important;
    }
    .nature-npd-app .solo-card h4 {
      margin: 0 0 6px !important;
      font-size: 0.95rem !important;
      font-weight: 700 !important;
      color: #475569 !important;
    }
    .nature-npd-app .solo-val {
      font-size: 1.5rem !important;
      font-weight: 900 !important;
      color: #059669 !important;
      margin-bottom: 4px !important;
    }
    .nature-npd-app .solo-card small {
      color: #64748b !important;
      font-size: 0.84rem !important;
    }
    .nature-npd-app .results-actions-bar {
      display: flex !important;
      justify-content: center !important;
      gap: 14px !important;
      margin: 24px 0 !important;
      flex-wrap: wrap !important;
    }
    .nature-npd-app .results-actions-bar button {
      padding: 13px 24px !important;
      border-radius: 12px !important;
      font-weight: 700 !important;
      font-size: 0.98rem !important;
      cursor: pointer !important;
    }
    .nature-npd-app .breakdown-table-wrap {
      overflow-x: auto !important;
      border-radius: 14px !important;
      border: 1.5px solid #e2e8f0 !important;
    }
    .nature-npd-app .npd-table {
      width: 100% !important;
      border-collapse: collapse !important;
      font-size: 0.94rem !important;
    }
    .nature-npd-app .npd-table th, .nature-npd-app .npd-table td {
      padding: 12px 16px !important;
      border: 1px solid #e2e8f0 !important;
      text-align: left !important;
    }
    .nature-npd-app .npd-table th {
      background: #f8fafc !important;
      font-weight: 800 !important;
      color: #334155 !important;
    }
    .nature-npd-app .solo-tag {
      background: #f1f5f9 !important;
      color: #475569 !important;
      border: 1px solid #cbd5e1 !important;
      padding: 3px 10px !important;
      border-radius: 99px !important;
      font-weight: 700 !important;
      font-size: 0.8rem !important;
    }

    /* Mācību ceļvedis & Špikeris */
    .nature-npd-app .theory-layout {
      display: grid !important;
      grid-template-columns: 290px 1fr !important;
      gap: 24px !important;
    }
    @media (max-width: 820px) {
      .nature-npd-app .theory-layout {
        grid-template-columns: 1fr !important;
      }
    }
    .nature-npd-app .theory-sidebar {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }
    .nature-npd-app .theory-nav-item {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 14px 16px !important;
      border-radius: 14px !important;
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      color: #1e293b !important;
      font-weight: 700 !important;
      font-size: 0.95rem !important;
      text-align: left !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
    }
    .nature-npd-app .theory-nav-item:hover {
      border-color: #10b981 !important;
      background: #f0fdf4 !important;
      transform: translateX(2px) !important;
    }
    .nature-npd-app .theory-nav-item.active {
      background: #ecfdf5 !important;
      border-color: #059669 !important;
      color: #064e3b !important;
      box-shadow: 0 2px 8px rgba(5, 150, 105, 0.15) !important;
    }
    .nature-npd-app .theory-main-card {
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 20px !important;
      padding: 28px !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03) !important;
    }
    .nature-npd-app .theory-header-bar {
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
      border-bottom: 1.5px solid #f1f5f9 !important;
      padding-bottom: 16px !important;
      margin-bottom: 20px !important;
      gap: 14px !important;
      flex-wrap: wrap !important;
    }
    .nature-npd-app .theory-summary {
      color: #64748b !important;
      margin: 6px 0 0 !important;
      font-size: 0.98rem !important;
    }
    .nature-npd-app .theory-card h4 {
      color: #065f46 !important;
      margin: 18px 0 10px !important;
      font-size: 1.15rem !important;
      font-weight: 800 !important;
    }
    .nature-npd-app .theory-card p, .nature-npd-app .theory-card li {
      font-size: 1.02rem !important;
      line-height: 1.65 !important;
      color: #334155 !important;
    }
    .nature-npd-app .cycle-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
      gap: 12px !important;
      margin: 14px 0 !important;
    }
    .nature-npd-app .cycle-step {
      background: #f8fafc !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 12px !important;
      padding: 12px 14px !important;
      font-size: 0.92rem !important;
      line-height: 1.5 !important;
    }

    /* Treniņa laboratorija */
    .nature-npd-app .practice-card {
      background: #ffffff !important;
      border: 1.5px solid #e2e8f0 !important;
      border-radius: 20px !important;
      padding: 26px !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03) !important;
    }
    .nature-npd-app .practice-progress-bar {
      margin-bottom: 18px !important;
    }
    .nature-npd-app .practice-step-info {
      display: flex !important;
      justify-content: space-between !important;
      margin-bottom: 8px !important;
      font-size: 0.92rem !important;
      color: #475569 !important;
    }
    .nature-npd-app .progress-track {
      background: #e2e8f0 !important;
      border-radius: 99px !important;
      height: 8px !important;
      overflow: hidden !important;
    }
    .nature-npd-app .progress-fill {
      background: #059669 !important;
      height: 100% !important;
      transition: width 0.3s ease !important;
    }
    .nature-npd-app .practice-prompt {
      font-size: 1.15rem !important;
      font-weight: 700 !important;
      color: #0f291e !important;
      margin-bottom: 18px !important;
      line-height: 1.6 !important;
    }
    .nature-npd-app .practice-options {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      margin-bottom: 20px !important;
    }
    .nature-npd-app .practice-opt-btn {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      width: 100% !important;
      min-height: 52px !important;
      padding: 14px 18px !important;
      border-radius: 12px !important;
      border: 1.5px solid #e2e8f0 !important;
      background: #ffffff !important;
      color: #1e293b !important;
      font-weight: 600 !important;
      text-align: left !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      font-size: 1.02rem !important;
      line-height: 1.5 !important;
    }
    .nature-npd-app .practice-opt-btn::before {
      content: '' !important;
      display: inline-block !important;
      flex-shrink: 0 !important;
      width: 18px !important;
      height: 18px !important;
      border-radius: 50% !important;
      border: 2px solid #cbd5e1 !important;
      background: #ffffff !important;
      transition: all 0.15s ease !important;
    }
    .nature-npd-app .practice-opt-btn:hover {
      border-color: #10b981 !important;
      background: #f0fdf4 !important;
    }
    .nature-npd-app .practice-opt-btn:hover::before {
      border-color: #10b981 !important;
    }
    .nature-npd-app .practice-opt-btn.selected {
      border-color: #059669 !important;
      background: #ecfdf5 !important;
      color: #064e3b !important;
      font-weight: 700 !important;
    }
    .nature-npd-app .practice-opt-btn.selected::before {
      border-color: #059669 !important;
      background: radial-gradient(circle at center, #059669 45%, #ffffff 50%) !important;
    }
    .nature-npd-app .practice-actions {
      display: flex !important;
      gap: 10px !important;
      margin-top: 16px !important;
      flex-wrap: wrap !important;
    }
    .nature-npd-app .practice-actions button {
      padding: 12px 20px !important;
      border-radius: 12px !important;
      font-weight: 700 !important;
    }
    .nature-npd-app .practice-feedback-box {
      margin-top: 22px !important;
      background: #f0fdf4 !important;
      border: 1.5px solid #86efac !important;
      border-radius: 14px !important;
      padding: 18px 20px !important;
      line-height: 1.65 !important;
    }

    /* Izdrukājamā darba lapa */
    .nature-npd-app .print-worksheet-sheet {
      background: #ffffff !important;
      border: 1.5px solid #cbd5e1 !important;
      border-radius: 12px !important;
      padding: 36px 40px !important;
      margin-top: 16px !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04) !important;
    }
    .nature-npd-app .print-actions {
      display: flex !important;
      justify-content: flex-end !important;
      margin-bottom: 12px !important;
    }

    @media print {
      .no-print, header, .npd-audio-bar, .npd-tabs, .subject-backbar {
        display: none !important;
      }
      .nature-npd-app {
        padding: 0 !important;
        background: #ffffff !important;
      }
      .print-worksheet-sheet {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
    }

    @media (max-width: 680px) {
      .nature-npd-app {
        padding: 10px 12px 32px !important;
      }
      .nature-npd-app .npd-header {
        padding: 18px !important;
      }
      .nature-npd-app .exam-q-card {
        padding: 18px !important;
      }
      .nature-npd-app .match-row {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .nature-npd-app .match-select {
        max-width: 100% !important;
      }
    }
  `;
  root.append(style);

  render();
  return {
    cleanup: () => {
      stopSpeaking();
    }
  };
}
