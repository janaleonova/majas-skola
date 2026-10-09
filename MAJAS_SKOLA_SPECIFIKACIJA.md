# MĀJAS SKOLA — Projekta specifikācija, arhitektūra un attīstības plāns

**Dokumenta versija:** 1.0 (Darba dokumentācija)  
**Datums:** 2026. gada 9. oktobris  
**Repozitorijs:** `github.com/janaleonova/majas-skola`  
**Statuss:** Vienotais atskaites punkts. Nodalītas kodā ieviestās funkcijas no nākotnē plānotajām.

---

## 1. Projekta mērķis un dizaina koncepcija

### 1.1. Mērķis
**Mājas skola** ir specializēta vienas ģimenes mācību lietotne diviem bērniem — **Markam** un **Samantai** — ar personalizētu mācību saturu, atšķirīgām vizuālajām pasaulēm un centralizētu vecāka pārvaldības paneli.

Galvenie principi:
- **Patstāvīga mācīšanās:** Bērns darbojas savā tempā, saņemot tūlītēju atgriezenisko saiti un atbalstu bez stresa vai kaunināšanas.
- **Bērnam pielāgots formāts:** Katram bērnam saturs, vizuālā valoda un didaktiskais atbalsts atbilst viņa uztveres specifikai un mācību vajadzībām.
- **Divu līmeņu dizains:**
  1. *Sākuma pasaule:* Ilustrēta, emocionāli saistoša vide (Markam — *Pūķu sala*, Samantai — *Saulainais dārzs* ar motīvu izvēli).
  2. *Mācību režīms:* Pēc konkrēta priekšmeta un tēmas izvēles interfeiss pārslēdzas uz maksimāli koncentrētu, mierīgu, lielu un skaidru uzdevuma skatu, noņemot liekos dekoratīvos elementus un novēršot uzmanības novēršanu.

---

## 2. Lietotāju lomas, tiesības un autorizācija

### 2.1. Lomu matrica

| Lietotājs | Piekļuve | Pašreizējā loma un iespējas | Plānotās nākotnes iespējas |
| :--- | :--- | :--- | :--- |
| **Marks** | Tikai Marka skola | Latviešu valoda, matemātika, angļu valoda; 3 treniņu režīmi; MI pedagogs; personīgais motīvs | Interaktīva 3D pasaule; apstiprināms balvu maks; XP līmeņi |
| **Samanta** | Tikai Samantas skola | Matemātikas laboratorija (vizuālie/stāstu uzdevumi); Latviešu valoda ar teksta balss nolasīšanu (TTS); motīvi | Angļu valoda; 3D dārzs; balvu veikals |
| **Vecāks** | Abu bērnu pārskats | Pilna abu bērnu skatu pārslēgšana; jaunu uzdevumu piešķiršana; bērnu progresa un prasmju analīze; testa datu droša dzēšana | Balvu pieprasījumu apstiprināšana; uzdevumu bankas redaktors |

### 2.2. Pieteikšanās arhitektūra (3 konti, 1 paroles lauks)
- Autentifikācija balstīta uz **Firebase Authentication Email/Password** servisu ar 3 atsevišķiem kontiem.
- Lai bērniem nebūtu jāievada sarežģīti e-pasti, saskarnē ir viens universāls paroles lauks.
- Servera aizsargāts maršruts `POST /api/password-login`:
  - Droši salīdzina paroli ar servera vides mainīgajos glabātajiem e-pastiem (`MARKS_LOGIN_EMAIL`, `SAMANTA_LOGIN_EMAIL`, `PARENT_LOGIN_EMAIL`), izmantojot Google Identity Toolkit REST API.
  - Ietver pieprasījumu skaita ierobežošanu (rate-limiting: maks. 8 mēģinājumi 15 minūtēs no vienas IP adreses), novēršot paroļu minēšanu.
  - Nekad neizvada paroles, privātas atslēgas vai pilnus tokenus konsolē vai klienta atbildēs.
- Pēc sekmīgas paroles pārbaudes klients veic oficiālo Firebase SDK autorizāciju ar `signInWithEmailAndPassword` un iestata noturīgu sesiju (`browserLocalPersistence`).
- Lietotāja loma tiek nolasīta no Firestore dokumenta `homeSchool/data/users/{uid}` un pārbaudīts lauks `approved === true`. Ja lietotājs nav apstiprināts vai loma nesakrīt, klients nekavējoties tiek izrakstīts.

---

## 3. Izveidotais mācību saturs un trenažieri

### 3.1. Marka skola
1. **Latviešu valoda (`src/latvian-school.js`):**
   - **Tēmas:**
     - *Vārda sastāvs un vārddarināšana* (sakne, priedēklis, piedēklis, galotne, salikteņi, vārdu savienojumi, izskaņa).
     - *Saziņa un saziņas veidi* (mutvārdu, rakstveida, neverbālā saziņa, mīmika, žesti, sūtītājs/saņēmējs, pieklājīga komunikācija).
     - *Vārdšķiras un vārda pamatforma* (lietvārds, darbības vārds, īpašības vārds, pamatformas, nenoteiksme).
   - **Uzdevumu formāti:**
     - Viena pareizā atbilde no variantiem.
     - Vairāku pareizo atbilžu atlase (checkbox veida izvēle).
     - Brīva precīzas pamatformas vai vārda ievade ar teksta lauku.
   - **MI Pedagogs:** Integrēts Gemini modelis, kas palīdz Markam soli pa solim bez pareizās atbildes priekšlaicīgas atklāšanas.

2. **Matemātika (`src/marks-math.js`):**
   - **Tēmas:**
     - ⚔️ *Reizrēķins* (1–10 reizināšana līdz 100).
     - 🛡️ *Dalīšana* (dalīšana bez atlikuma 1–10).
     - 🔗 *Saistītais pieraksts* (reizināšanas un dalīšanas skaitļu saimes, nezināmā reizinātāja meklēšana).
     - 🐉 *Teksta misijas* (pūķa un kristālu teksta uzdevumi ar vizualizētām kristālu grupām).
   - **Formāts:** Liels ciparu ievades lauks, tūlītēja pārbaude, vizuāls grupu attēlojums.

3. **Angļu valoda (`src/marks-english.js`):**
   - **Tēmas:**
     - 📅 *Nedēļas dienas* (tulkošana abos virzienos, secība).
     - 🗓️ *Mēneši* (12 mēnešu tulkojumi un secība).
     - 🍁 *Gadalaiki*.
     - 🧑 *Personu vietniekvārdi* (I, you, he, she, it, we, they un to lietojums teikumos).

### 3.2. Samantas skola
1. **Matemātikas laboratorija (`src/samanta-math.js`):**
   - **Moduļi:**
     - ✖ *Reizrēķins* (ar iespēju izvēlēties konkrētu skaitļu saimi no 1 līdz 10).
     - ➗ *Dalīšana* (tikai veselos skaitļos bez atlikuma).
     - ⚡ *Jauktais izaicinājums* (reizināšana un dalīšana kopā).
     - 🧩 *Redzu un skaitu* (līdz 100 priekšmetiem — āboli, zvaigznes, ziedi, taureņi, skaidri sadalīti grupās).
     - 📖 *Stāstu uzdevumi* (ikdienas situācijas ar Samantu un draugiem).
   - **Atbalsta rīki:** Pilna interaktīvā reizināšanas tabula 10×10 ar elementu iezīmēšanu.

2. **Latviešu valodas dārzs (`src/samanta-latvian.js`):**
   - **Tēmas:**
     - 📖 *Vieglā lasīšana* (īsi teikumi ar konkrētu jautājumu par saturu).
     - 🧩 *Vārdšķiras* (lietvārds, darbības vārds, īpašības vārds draudzīgā formā).
     - 🔤 *Trūkstošais burts* (vārdi ar iztrūkstošiem patskaņiem un līdzskaņiem).
   - **Pieejamība:** Iebūvēta pārlūka balss sintēze (`SpeechSynthesis` latviešu valodā) uzdevuma nolasīšanai skaļi, kā arī apturēšanas poga.

3. **Angļu valoda ar audio (`src/samanta-english.js`):**
   - **Tēmas:**
     - 🎨 *Krāsas* (10 pamatkrāsas ar attēliem un tulkojumu).
     - 🐾 *Dzīvnieki* (10 mīļdzīvnieki ar ikonām).
     - 🔢 *Skaitļi 1–10* (skaitīšana un vārdi).
     - 🎒 *Skola un ikdiena* (grāmata, saule, draugs, ābols, ūdens).
   - **Audio atbalsts:** Integrēta angļu valodas izrunas nolasīšana (`Web Speech API` ar `en-US`/`en-GB`), klausīšanās režīms un tūlītēja audio atgriezeniskā saite.
   - **Pielāgojums:** Lielas, disleksijai draudzīgas izvēles pogas, vizuālas kartītes un kļūdu atkārtošana.

4. **Mobilā skārienekrāna ciparnīca matemātikā (`src/touch-numpad.js`):**
   - Iebūvēts ērts ciparnīcas bloks (0–9, dzēšana ⌫, apstiprināšana ✓) gan Marka, gan Samantas matemātikas trenažierī.
   - Novērš virtuālās tastatūras pārklāšanos planšetēs un telefonos, ļaujot bērnam fokusēties uz rēķināšanu.

5. **Balvu veikals un ģimenes motivācijas sistēma (`src/rewards-system.js`):**
   - Bērni krāj BP (bonusa punktus) un XP par pareizi atrisinātiem uzdevumiem un sērijām.
   - Bērnu skatā pieejams **🎁 Balvu veikals** ar reālām ģimenes balvām (papildu spēļu laiks, picas vakars, velobrauciens, grāmata, gardums).
   - Bērns var pieteikt balvu, un tā nonāk vecāka panelī apstiprināšanai.
   - Vecāka panelī pieejama balvu apstiprināšana, izpildes atzīmēšana vai noraidīšana.

6. **PWA (Progressive Web App) atbalsts:**
   - Izveidots `public/manifest.json` un `public/sw.js` ar lietotnes ikonu (`public/icon.svg`).
   - Iespēja pievienot Mājas skolu pie sākuma ekrāna (Add to Home Screen / Install App) Android, iOS un datorā.
   - Bezsaistes kešatmiņa lietotnes pamata čaulai (app shell).

7. **Vecāka 7 dienu mācību analītika:**
   - Centralizēts kopsavilkums par Marka un Samantas pēdējo 7 dienu aktivitātēm (treniņu skaits, vidējais procents, apgūtās tēmas).
   - Poga *📋 Kopēt 7 dienu pārskatu starpliktuvē* ērtai saziņai un piezīmēm.

---

## 4. Mācību metodika

### 4.1. Trīs mācību režīmi
Katrai tēmai ir pieejami trīs didaktiski mērķtiecīgi režīmi:
1. **🌱 Mācos (8 jautājumi):**
   - Pieejama poga *💡 Pavediena palīdzība*.
   - Skaidrojums pieejams pirms vai pēc atbildes mēģinājuma.
   - Kļūdas gadījumā tiek dots pavediens, nevis sods.
2. **🎯 Trenējos (12 jautājumi):**
   - Līdzsvarots treniņš ar progresa joslu un pareizo atbilžu sērijas skaitītāju.
   - Pēc atbildes uzreiz tiek parādīts pareizais risinājums un skaidrojums.
3. **🏆 Pārbaudu sevi (20 jautājumi):**
   - Eksāmena / paškontroles režīms bez pavedieniem un tūlītējas atbilžu rādīšanas uzdevuma laikā.
   - Pilns rezultāts, kļūdu analīze un prasmju sadalījums tiek parādīts beigās.

### 4.2. Kļūdu treniņš ar jauniem piemēriem
- Ja treniņā pieļautas kļūdas, sistēma piedāvā pogu **“🎯 Trenēt kļūdas ar citiem piemēriem”**.
- Netiek mehāniski atkārtoti tie paši jautājumi, bet ģenerēti jauni uzdevumi par tām pašām vājajām prasmēm.

### 4.3. Mākslīgā intelekta (MI) pedagogs
- Izstrādāts servera maršrutā `POST /api/marka-ai`, izmantojot Google Gemini modeli.
- **Pedagoģiskās vadlīnijas:**
  - AI darbojas kā 4. klases latviešu valodas skolotājs.
  - Atbild 1–4 īsos, saprotamos teikumos latviešu valodā.
  - Pirmajos mēģinājumos **nekad neatklāj pareizo atbildi**, bet dod soli-pa-solim pavedienu vai līdzīgu piemēru.
  - Tikai pēc vairākiem neveiksmīgiem mēģinājumiem sniedz skaidrojumu.
- **Drošība:**
  - API atslēgas glabājas tikai serverī un nekad nenonāk bērna pārlūkā.
  - Pārbauda bērna Firebase ID tokenu; pieejams tikai autorizētam Marka kontam.
  - Stundas pieprasījumu limits (rate limit) novērš pārmērīgu izsaukumu skaitu.

---

## 5. Motivācijas un punktu sistēma

### 5.1. Pamatprincipi (`POINTS_POLICY.md` un `src/points-policy.js`)
- **BP (Balvu punkti):** Vizuāls treniņa novērtējums, nākotnē tērējams vecāku apstiprinātām balvām.
- **XP (Pieredze):** Nākamajā posmā plānoti netērējami pieredzes punkti līmeņa progresam.
- Katram bērnam ir pilnīgi nošķirts punktu uzskaites profils. Punktu pārnese starp kontiem nav iespējama.
- Nav punktu par bezmērķīgu klikšķināšanu vai pavadīto laiku.

### 5.2. Pašreizējā aprēķina skala
Treniņam ar 20 jautājumiem maksimālais potenciāls ir **20 BP**:
- 0–39%: 0–3 BP;
- 40–59%: 4–7 BP;
- 60–74%: 8–11 BP;
- 75–89%: 12–15 BP;
- 90–100%: 16–18 BP.
- **Sērijas bonuss:** +1 BP par vismaz 5 pareizām atbildēm pēc kārtas; +2 BP par vismaz 10.
- **Maksimums:** 20 BP par vienu uzdevumu kopu.
- Atkārtojot treniņu, tiek ieskaitīta tikai starpība virs iepriekšējā labākā rezultāta (nav iespējams dubultot punktus par vienu un to pašu darbu).

### 5.3. Skaidrs statuss: Vizuāls novērtējums pret reālu balvu maku
- **IEVIESTS KODĀ:**
  - Pareizo atbilžu sērija (piem., `🔥 5 pēc kārtas · Rekords: 7`).
  - Progresa josla katrā treniņā.
  - Informatīvs potenciālo BP aprēķins rezultātu logā.
- **PLĀNOTS NĀKAMAJĀ POSMĀ:**
  - Servera līmenī validēts, neviltojams bilances maks Firestore transakcijā.
  - Balvu katalogs (piem., +20 min telefona laika = 100 BP; galda spēļu vakars = 250 BP).
  - Vecāka apstiprināšanas poga pirms balvas izmantošanas.

---

## 6. Vecāka panelis

### 6.1. Ieviests kodā
1. **Pilna vides pārslēgšana:** Vecāks vienā klikšķī var atvērt un izmēģināt Marka skolu, Samantas skolu vai atgriezties pārskatā.
2. **Uzdevumu piešķiršana:** Vecāks var izveidot jaunu uzdevumu (nosaukums, priekšmets, saņēmējs: Markam, Samantai vai Abiem).
3. **Rezultātu un prasmju analīze:**
   - Vecāks redz katra bērna izpildītos treniņus, procentuālo novērtējumu un precīzu prasmju sadalījumu.
   - Sistēma automātiski izceļ prasmes, kurās rezultāts ir zem 80% (piemēram: `Jāpatrenē: Vārda sakne 60%`).
4. **Testa datu sakārtošana:**
   - Iebūvēts rīks vecāka paša testēšanas ierakstu dzēšanai (`deleteParentTestProgress`).
   - Tiek dzēsti tikai ieraksti, kuru `studentUid` sakrīt ar vecāka kontu, garantējot, ka bērnu reālie rezultāti nekad netiek skarti.

### 6.2. Plānots nākotnē
- Balvu pieprasījumu pārvaldība (apstiprināt / noraidīt ar skaidrojumu).
- Pielāgotu uzdevumu ievadīšana bērnu trenažieros tieši no vecāka paneļa.
- Datu eksports un nedēļas progresa pārskats.

---

## 7. Tehniskā arhitektūra un drošība

### 7.1. Komponentu koks
```
/
├── server.js                     # Express serveris (statiskie faili, /api/firebase-config, /api/password-login, /api/marka-ai)
├── package.json                  # Projekta atkarības un skripti (esbuild montāža)
├── firebase-blueprint.json       # Datu shēmas un entītiju specifikācija
├── FIRESTORE_RULES_PROPOSAL.md   # Izolētie drošības noteikumi homeSchool ceļam
├── SECURITY_AUDIT_REPORT.md      # Drošības audita ziņojums un scenāriju analīze
├── SETUP_LOGIN.md                # Rokasgrāmata 3 kontu iestatīšanai
├── POINTS_POLICY.md              # Punktu un motivācijas sistēmas metodika
├── src/
│   ├── main.js                   # Lietotnes sākumpunkts, navigācija, autentifikācija, lomu pārvaldība
│   ├── marks-math.js             # Marka matemātika (reizrēķins, dalīšana, saimes, misijas)
│   ├── marks-english.js          # Marka angļu valoda (dienas, mēneši, gadalaiki, vietniekvārdi)
│   ├── latvian-school.js         # Marka latviešu valoda (3 tēmas, multi-izvēle, teksts, MI integrācija)
│   ├── samanta-math.js           # Samantas matemātika (vizuālās grupas, stāsti, tabula)
│   ├── samanta-latvian.js        # Samantas latviešu valoda (lasīšana, vārdšķiras, burti, balss TTS)
│   ├── personal-theme.js         # Motīvu un fona vizuālā pārslēgšana
│   ├── points-policy.js          # Punktu un sēriju aprēķina matemātika
│   └── firebase/
│       ├── init.js               # Firebase Web SDK inicializācija ar vides mainīgajiem
│       └── homeSchoolService.js  # Firestore datu serviss (tikai homeSchool/data/ apakškolekcijas)
└── tests/
    └── security-scenarios.test.js # Automatizētie drošības pārbaudes scenāriji
```

### 7.2. Datu izolācija un Datorika HUB aizsardzība
- Projekts izmanto esošo Firebase projektu `datorika-hub`.
- **Kritiskā prasība:** Nekādā gadījumā nedrīkst skart, dzēst vai pārrakstīt esošos `datorika-hub` datus vai globālos noteikumus.
- Visi Mājas skolas dati tiek glabāti stingri izolētā ceļā:
  - Lietotāju profili: `/homeSchool/data/users/{uid}`
  - Uzdevumi: `/homeSchool/data/tasks/{taskId}`
  - Rezultātu vēsture: `/homeSchool/data/progress/{progressId}`
- Nav tiešu saknes līmeņa kolekciju, kas varētu pārklāties ar `datorika-hub`.

### 7.3. Firestore Security Rules arhitektūra
Drošības noteikumi paredzēti un auditēti ar šādiem principiem:
- Lietotājs pats **nevar** piešķirt sev lomu vai lauku `approved: true`. Lomas un apstiprinājumu iestata tikai administrators.
- Bērni (Marks, Samanta) var lasīt un rakstīt **tikai savus personīgos rezultātus** (`studentUid == request.auth.uid`).
- Vecāks var lasīt abus bērnu rezultātus un dzēst tikai savus testa ierakstus.
- Neatļautiem vai neapstiprinātiem lietotājiem piekļuve ir pilnībā liegta.

---

## 8. Kopsavilkums: Ieviests vs. Plānots

| Joma | Ieviests un pieejams kodā | Plānots turpmākajos posmos |
| :--- | :--- | :--- |
| **Autentifikācija** | 3 Firebase konti; 1 paroles lauks; rate-limiting serverī; sesijas saglabāšana | Paroles atjaunošana no saskarnes; biometrija mobilajās ierīcēs |
| **Marka mācības** | Latviešu valoda (3 tēmas); Matemātika (4 tēmas); Angļu valoda (4 tēmas); MI pedagogs | Padziļināta gramatika, dabaszinības, vēsture |
| **Samantas mācības** | Matemātika (5 moduļi ar vizuālajiem objektiem un tabulu); Latviešu valoda (3 tēmas ar audio nolasīšanu) | Angļu valodas trenažieris; matemātikas ģeometrijas moduļi |
| **Motivācija** | Atbilžu sērijas (`streak`), rekordi, progresa joslas, informatīvs BP aprēķins | Neuzlaužams servera balvu maks, XP līmeņi, fizisku/digitālu balvu veikals |
| **Dizains** | Personalizēti SVG pasaules heroji, motīvu pārslēdzējs, fokusēts uzdevuma ekrāns | Interaktīva 3D pasaule (Three.js / WebGL), animēti tēli |
| **Vecāka rīki** | Abu bērnu skatu pārslēgšana, uzdevumu izveide, progresa/prasmju audits, testa datu dzēšana | Balvu apstiprināšana, detalizēti laika grafiki, datu eksports |

---

## 9. Attīstības plāns un prioritārie soļi

1. **1. prioritāte: Stabilitāte un mobilā lietojamība**
   - Pārbaudīt visas mācību saskarnes reālos tālruņu un planšetdatoru ekrānos (skārienjutīgums, tastatūras atvēršanās, fontu salasāmība).
   - Nodrošināt stabilu Web Speech API darbību mobilajā Safari un Chrome pārlūkā.

2. **2. prioritāte: Drošības noteikumu publicēšana Firebase Console**
   - Pārbaudīt sagatavotos noteikumus lokāli ar Firebase Emulator.
   - Pēc apstiprināšanas ieviest noteikumus Firebase Console projektā `datorika-hub`, nodrošinot, ka Datorika HUB esošās kolekcijas paliek pilnīgi neskartas.

3. **3. prioritāte: Servera transakciju balvu maks un balvu veikals**
   - Ieviest uzticamu servera endpointu rezultātu apstiprināšanai un BP pievienošanai.
   - Izveidot bērniem vizuālu veikalu un vecākam vienkāršu “Apstiprināt balvu” pogu.

4. **4. prioritāte: Samantas angļu valodas trenažieris**
   - Sagatavot pirmo angļu valodas vārdu banku ar attēliem un audio izrunu.

5. **5. prioritāte: Interaktīva vizuālā pasaule**
   - Paplašināt Pūķu salu un Saulaino dārzu ar interaktīvām kartēm, kur katrs pabeigtais uzdevums atver jaunus salas vai dārza apgabalus.
