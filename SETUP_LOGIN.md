# Mājas skola — 3 paroļu pieslēgšana

Kods GitHub ir sagatavots, taču paroles NAV izveidotas un Firestore noteikumi NAV publicēti.

## 1. Firebase Authentication
Firebase Console projektā `datorika-hub` atver **Authentication → Sign-in method** un ieslēdz **Email/Password**. Sadaļā **Users** manuāli izveido trīs atsevišķus kontus: Markam, Samantai un vecākam. Katram izvēlies atsevišķu e-pasta identifikatoru un paroli (vismaz 6 simboli; drošāk — garāku). E-pasti nav jāievada bērniem: saskarne jautās tikai paroli. Neievieto paroles GitHub, AI Studio čatā vai `.env` failā.

## 2. Servera vides mainīgie
Papildus sešiem `FIREBASE_...` konfigurācijas laukiem AI Studio vides mainīgajos iestati:
- `MARKS_LOGIN_EMAIL`: Marka kontam izveidotais e-pasts.
- `SAMANTA_LOGIN_EMAIL`: Samantas kontam izveidotais e-pasts.
- `PARENT_LOGIN_EMAIL`: vecāka kontam izveidotais e-pasts.

Šie identifikatori klientam tiek atdoti pa `/api/login-profiles`, un nav uzskatāmi par noslēpumiem. Paroles paliek tikai Firebase Authentication.

## 3. Firestore profili un atļaujas
Tā kā šajā Firebase projektā `(default)` datubāzes noteikumi pašlaik bloķē lasīšanu un rakstīšanu, pieteikšanās viena pati NAV pietiekama.

Pēc Firebase Auth kontu izveides Firebase Console atrodi katra konta UID un **administratora vadībā** izveido šos dokumentus:
- `homeSchool/data/users/<MARKA_UID>`: `{role:"marks", approved:true}`
- `homeSchool/data/users/<SAMANTAS_UID>`: `{role:"samanta", approved:true}`
- `homeSchool/data/users/<VECAKA_UID>`: `{role:"vecaks", approved:true}`

Kopīgās datubāzes Firestore Security Rules jāsagatavo un jātestē ar **Firebase Emulator**, pirms publicēšanas. Nedrīkst kopēt esošo `FIRESTORE_RULES_PROPOSAL.md` bez labojumiem: tas ļauj pašreģistrēt `approved:true` un nav drošs. Nodrošini, ka tikai iepriekš apstiprinātie UID var lasīt attiecīgos datus, bērni nevar veidot vecāka profilu un Datorika HUB kolekcijas netiek atvērtas.

## 4. Telefons
Pēc kontu un noteikumu konfigurācijas bērns atver Mājas skolu, izvēlas savu skolu un ievada tikai paroli. Firebase saglabā pieteikšanās sesiju pārlūkā līdz izrakstīšanās brīdim vai sesijas atsaukšanai. Tā nav garantēta tieši 30 dienu sesija.

## Svarīgi
Šī ir sākotnējā UI un pieteikšanās integrācija, **nevis pabeigta vai testēta produkcijas sistēma**. Nekad nelieto GitHub Pages kā vienīgo izvietošanas vidi šai Express versijai: tai vajadzīgs Node serveris maršrutiem `/api/firebase-config` un `/api/login-profiles`.
