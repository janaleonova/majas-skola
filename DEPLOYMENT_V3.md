# Mājas skola v3 — palaišana un izvietošana

## Kas ir ieviests

Trīs priekšmetu katalogs, dienas tēma, datēti vecāka uzdevumi ar moduļa saiti un papildu bonusu, atsevišķa abu bērnu izpilde, vienota BP politika, savlaicīga rezultātu kvīts un atlikums, vietējie melnraksti, pabeigto rezultātu nosūtīšanas rezerves rinda, balvas ar vecāka apstiprinātu norakstu. Rakstiskie dzejas pamatojumi un teikuma pārveidojumi tiek saglabāti vecākam.

## Palaišana

```
npm ci
npm test
npm run build
npm start
```

Būvēšana ģenerē minificētu `public/bundle.js`. GitHub Actions izpilda instalēšanu, regresijas testus un būvēšanu. Nav vajadzīga vēl viena projekta kopija vai datu atiestatīšana.

## Firebase noteikumi — atsevišķs obligāts izvietošanas solis

`firestore.home-school.rules` ir jaunais `/homeSchool/data` noteikumu avots. **Neizvietot šo failu kā visa kopīgā Datorika HUB projekta noteikumus.** Integrēt tikai tā `match /homeSchool/data` bloku esošajos noteikumos. Pārbaudīt, ka esošs globāls wildcard nedod plašāku piekļuvi šai struktūrai. Kontu profili jābūt iepriekš izveidotiem un apstiprinātiem; pašreģistrācija ar `approved:true` nav atļauta.

Jaunie lauki: `tasks.completions`, `moduleId`, `bonusBP`, `targetScore`, `requiredMode`, `startDate`, `dueDate`; progresā — mēģinājuma ID, tēma, priekšmets un uzdevuma nosacījumu izpilde; balvās — `points_request`, `chargedBP`; bērna profilā — vecāka maināms `spentBP`.

Ja paliek vecie noteikumi, jaunā rezultāta saglabāšana, uzdevuma atzīmēšana vai balvas pieteikšana var tikt noraidīta. Lietotne pabeigto rezultātu saglabā lokālajā rezervē, rāda kļūdu un ļauj nosūtīt atkārtoti. Šī kļūda nav signāls dzēst esošos datus.

Reāli noteikumu testi:

```
npm run test:rules
```

Tiem vajadzīgs Java 21+ un lejupielādējams Firestore emulators. Konfigurācija `firebase.home-school.json` izmanto tikai testu projektu `demo-majas-skola`; komanda neizvieto neko produkcijā. Parastie DOM/regresijas testi nav publicēto Firestore noteikumu pārbaude.

## Servera konfigurācija

Saglabāt esošos Firebase/Gemini vides mainīgos. `MARKS_UID` var norādīt servera matemātikas/MI autorizācijai, ja Marka Auth konts ir mainīts. `MATH_SESSION_SECRET` — servera slepens, nejaušs vismaz 32 baitu noslēpums, vienāds visām instancēm; nodrošina, ka parakstītās 2 stundu matemātikas sesijas saglabājas pēc restarta. To nekad neievietot klientā vai GitHub. Bez šī mainīgā atslēga ir nejauša katrā procesā, tāpēc restartēšana anulē sesijas. `TRUST_PROXY_HOPS` iestatīt tikai zināmam reversā proxy ceļam; pēc noklusējuma proxy galvenes netiek uzticētas.

Bērnu UID priekšskatījumam/BP vecāka panelī tiek iegūti no apstiprinātajiem ģimenes profiliem. Vecāka aktivitātes indikatoram tiek izmantoti tie paši ģimenes profilu UID.

## Reālās vides pārbaude pirms izmantošanas

Ielogoties katrā no trim kontiem. Izpildīt vienu uzdevumu, salīdzināt kvīti un atlikumu, atvērt to pašu tēmu pēc pārlādes, pārbaudīt abiem piešķirta uzdevuma atšķirīgos statusus. Pieteikt un vecākam apstiprināt vienu balvu, pārbaudot vienu norakstu. Pārbaudīt portretu, ainavu un datoru. Firebase noteikumi un reālie konti jātestē savā izvietošanas vidē; repo testa dati nav produkcijas kontu pierādījums.

## Zināmās robežas

Melnraksti un nosūtīšanas rinda ir konkrētajā ierīcē; ierīces atmiņas dzēšana tos noņem. Neizdzēst lokālos datus, ja tajos ir nenosūtīts rezultāts. Melnraksts glabā pēdējo jautājuma/stadijas kontrolpunktu un teksta laukus; vēl neapstiprināta klikšķu izvēle vai pasvītrojums var būt jāatzīmē atkārtoti. Pārtraukts ātruma mēģinājums atsākas bez ātruma sacensības; ilgāk par 2 stundām aizkavētu servera matemātikas sesiju jāsāk no jauna. PWA bezsaistē var izmantot agrāk saņemtu publisko Firebase konfigurāciju, bet servera matemātika un MI joprojām prasa savienojumu.
