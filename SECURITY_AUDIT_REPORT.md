# Mājas skola — Firebase drošības un datu struktūras audita ziņojums

**Datums:** 2026-10-08  
**Projekts:** `majas-skola` (infrastruktūra: `datorika-hub`)  
**Mērķis:** Datu struktūras sakārtošana un Zero-Trust drošības arhitektūras ieviešana, garantējot Datorika HUB neskartību.

---

## 1. Datu struktūras labojumi (Firestore Paths)
Iepriekšējais kods izmantoja plakanu ceļu modeli. Tas ir pilnībā aizstāts ar korektu, stingru Firestore apakškolekciju hierarhiju:

| Resurss | Firestore tips | Precīzs ceļš | Apraksts |
| :--- | :--- | :--- | :--- |
| **Sakne** | Kolekcija | `/homeSchool` | Mājas skolas galvenā izolētā kolekcija |
| **Galvenais dokuments** | Dokuments | `/homeSchool/data` | Mājas skolas datu enkurdokuments |
| **Lietotāji** | Apakškolekcija | `/homeSchool/data/users/{uid}` | Lietotāju profili un lomas |
| **Uzdevumi** | Apakškolekcija | `/homeSchool/data/tasks/{taskId}` | Mācību uzdevumi |
| **Progress** | Apakškolekcija | `/homeSchool/data/progress/{progressId}` | Individuālie rezultāti un vēsture |
| **Iestatījumi** | Apakškolekcija | `/homeSchool/data/settings/{settingId}` | Konfigurācija un vecāku UID saraksts |

Visas koda funkcijas (`collection()` un `doc()`) failā `src/firebase/homeSchoolService.js` tagad saņem precīzi noteiktus parametrus:
- `collection(db, 'homeSchool', 'data', 'users')`
- `doc(db, 'homeSchool', 'data', 'users', uid)`
- `collection(db, 'homeSchool', 'data', 'tasks')`
- `collection(db, 'homeSchool', 'data', 'progress')`
- `collection(db, 'homeSchool', 'data', 'settings')`

---

## 2. Novērstās ievainojamības un uzlabojumi

### 2.1. Patvaļīgas vecāka/administratora lomas piešķiršanas novēršana
- **Iepriekšējais stāvoklis:** Lietotājs caur saskarni varēja izvēlēties jebkuru lomu un saglabāt `role: 'vecaks'` savā Firestore profilā.
- **Risinājums:** 
  1. Noņemta iespēja pašam piešķirt sev `vecaks` lomu.
  2. Vecāka autorizācija ir piesaistīta uzticamam Firebase Authentication UID (dokumentā `homeSchool/data/settings/config`).
  3. Drošības noteikumos iestrādāts noteikums: `request.resource.data.role != 'vecaks' || isParent()`.

### 2.2. Bērnu individuālo rezultātu izolācija
- **Iepriekšējais stāvoklis:** Bērni varēja pieprasīt visus progresa ierakstus, un filtrēšana notika tikai JavaScript līmenī pārlūkā.
- **Risinājums:**
  1. Katram progresa ierakstam tiek piesaistīts `studentUid` (autentificētā lietotāja UID).
  2. Bērna saskarne veic servera puses vaicājumu ar filtru `where('studentUid', '==', userUid)`.
  3. Drošības noteikumi atļauj lasīt TIKAI tad, ja `resource.data.studentUid == request.auth.uid` vai lietotājs ir `isParent()`.
  4. Marks nekad nevar redzēt Samantas datus, un Samanta nevar redzēt Marka datus.

### 2.3. Tikai apstiprināti ģimenes lietotāji
- Jebkurš cits Google konts, kas nav apstiprināts `users` apakškolekcijā (`approved == true`), saņem `PERMISSION_DENIED` pie jebkura lasīšanas vai rakstīšanas mēģinājuma.

---

## 3. Datorika HUB Wildcard noteikumu analīze
Firestore Security Rules darbojas pēc **pieļaujošās loģikas (OR)**. Ja Datorika HUB satur plašu noteikumu:
```javascript
match /{document=**} { allow read, write: if request.auth != null; }
```
tas apietu jaunos ierobežojumus.

**Drošības rekomendācija:**
1. Aizstāt globālos aizstājējzīmes noteikumus ar konkrētu kolekciju noteikumiem Datorika HUB resursiem (`courses`, `students` u.c.).
2. Vai pievienot izslēgšanas nosacījumu:
   ```javascript
   match /{document=**} {
     allow read, write: if request.auth != null && !document.matches('^homeSchool/.*');
   }
   ```

---

## 4. Drošības scenāriju testēšanas rezultāti

Palaisti 8 automatizēti pārbaudes scenāriji (`node tests/security-scenarios.test.js`):

| ID | Scenārijs | Sagaidāmais rezultāts | Faktiskais | Statuss |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Neautentificēts lietotājs lasa progresu | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-02** | Lietotājs ārpus ģimenes lasa uzdevumus | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-03** | Lietotājs pašpiešķir sev "vecaks" lomu | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-04** | Marks lasa Samantas individuālos rezultātus | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-05** | Samanta lasa savus personīgos rezultātus | ALLOWED | ALLOWED | **PASSED** |
| **SEC-06** | Bērns saglabā rezultātu ar svešu UID | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-07** | Bērns mēģina izveidot jaunu uzdevumu | PERMISSION_DENIED | PERMISSION_DENIED | **PASSED** |
| **SEC-08** | Vecāks lasa abu bērnu datus un izveido uzdevumus | ALLOWED | ALLOWED | **PASSED** |

**Kopā:** 8/8 pārbaudīti un sekmīgi.

---

## 5. Garantijas
- Reālajā Firebase datubāzē nav veiktas nekādas neatgriezeniskas izmaiņas.
- Drošības noteikumi nav publicēti un paliek priekšlikuma formā (`FIRESTORE_RULES_PROPOSAL.md`).
- Visi esošie Datorika HUB dati, kolekcijas un noteikumi paliek pilnībā neskarti.
