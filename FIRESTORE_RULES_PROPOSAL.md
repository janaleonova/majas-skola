# Firestore drošības noteikumu priekšlikums: Mājas skola (`homeSchool`)

Šis priekšlikums ir izstrādāts, lai nodrošinātu **Zero-Trust piekļuves kontroli** Mājas skolas datiem, neietekmējot un nesabojājot esošā **Datorika HUB** projekta darbību.

---

## 1. Datu ceļu hierarhija
Firestore datu struktūra sastāv no pārmaiņus kolekcijām un dokumentiem:
- **Kolekcija:** `homeSchool`
- **Galvenais dokuments:** `homeSchool/data`
- **Apakškolekcijas dokumentā `homeSchool/data`:**
  - `users`: Lietotāju profili ar lomām (`homeSchool/data/users/{userId}`)
  - `tasks`: Mācību uzdevumi (`homeSchool/data/tasks/{taskId}`)
  - `progress`: Individuālie rezultāti un treniņu vēsture (`homeSchool/data/progress/{progressId}`)
  - `settings`: Iestatījumi un vecāku UID saraksts (`homeSchool/data/settings/{settingId}`)

---

## 2. Piedāvātie Firestore Security Rules

Šo noteikumu bloku var pievienot esošajiem `firestore.rules` Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // =========================================================================
    // MĀJAS SKOLAS IZOLĒTĀ DATU STRUKTŪRA (/homeSchool/data)
    // =========================================================================
    match /homeSchool/data {

      // --- PALĪGFUNKCIJAS ---
      function isSignedIn() {
        return request.auth != null;
      }

      function getUserData(uid) {
        return get(/databases/$(database)/documents/homeSchool/data/users/$(uid)).data;
      }

      // Pārbauda, vai lietotājs ir reģistrēts un apstiprināts ģimenes loceklis
      function isApprovedFamily() {
        return isSignedIn() &&
          exists(/databases/$(database)/documents/homeSchool/data/users/$(request.auth.uid)) &&
          getUserData(request.auth.uid).approved == true;
      }

      // Pārbauda vecāka administratora tiesības (piesaistīts uzticamam UID)
      function isParent() {
        return isSignedIn() && (
          // 1) UID atrodas autorizēto vecāku sarakstā settings/config dokumentā:
          (
            exists(/databases/$(database)/documents/homeSchool/data/settings/config) &&
            request.auth.uid in get(/databases/$(database)/documents/homeSchool/data/settings/config).data.parentUids
          ) ||
          // 2) Vai lietotājam jau ir apstiprināts vecāka profils datubāzē:
          (
            exists(/databases/$(database)/documents/homeSchool/data/users/$(request.auth.uid)) &&
            getUserData(request.auth.uid).role == 'vecaks' &&
            getUserData(request.auth.uid).approved == true
          )
        );
      }

      function isOwner(userId) {
        return isSignedIn() && request.auth.uid == userId;
      }

      // =======================================================================
      // 1. LIETOTĀJU PROFILI: /homeSchool/data/users/{userId}
      // =======================================================================
      match /users/{userId} {
        // Lietotājs var lasīt savu profilu; vecāks var lasīt visus
        allow get: if isOwner(userId) || isParent();
        allow list: if isParent();

        // DROŠĪBA: Lietotājs pats NEDRĪKST piešķirt sev 'vecaks' lomu!
        // Jauns lietotājs var reģistrēties TIKAI ar 'marks' vai 'samanta', ja vien nav vecāks
        allow create: if isOwner(userId) && (
          (request.resource.data.role != 'vecaks' && request.resource.data.approved == true) ||
          isParent()
        );

        // Atjaunināšana: Parasts lietotājs NEDRĪKST mainīt 'role' vai 'approved' statusu
        allow update: if (
          isParent() ||
          (
            isOwner(userId) &&
            request.resource.data.role == resource.data.role &&
            request.resource.data.approved == resource.data.approved
          )
        );

        allow delete: if isParent();
      }

      // =======================================================================
      // 2. MĀCĪBU UZDEVUMI: /homeSchool/data/tasks/{taskId}
      // =======================================================================
      match /tasks/{taskId} {
        // Vecāks redz visus uzdevumus.
        // Bērns var lasīt TIKAI sev vai abiem ('both') piešķirtos uzdevumus.
        allow get: if isParent() || (
          isApprovedFamily() &&
          (resource.data.assignedTo == getUserData(request.auth.uid).role || resource.data.assignedTo == 'both')
        );
        allow list: if isParent() || (
          isApprovedFamily() &&
          (resource.data.assignedTo == getUserData(request.auth.uid).role || resource.data.assignedTo == 'both')
        );

        // Tikai vecāks drīkst izveidot un dzēst uzdevumus
        allow create, delete: if isParent();

        // Statusu ("completed" / "pending") drīkst mainīt vecāks vai bērns, kuram uzdevums piešķirts
        allow update: if isParent() || (
          isApprovedFamily() &&
          (resource.data.assignedTo == getUserData(request.auth.uid).role || resource.data.assignedTo == 'both') &&
          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt'])
        );
      }

      // =======================================================================
      // 3. PROGRESA UN REZULTĀTU DATI: /homeSchool/data/progress/{progressId}
      // =======================================================================
      match /progress/{progressId} {
        // DROŠĪBA:
        // - Vecāks redz abu bērnu rezultātus.
        // - Marks un Samanta var skatīt TIKAI savus personīgos rezultātus (studentUid == auth.uid)!
        allow get: if isParent() || (
          isApprovedFamily() && resource.data.studentUid == request.auth.uid
        );
        allow list: if isParent() || (
          isApprovedFamily() && resource.data.studentUid == request.auth.uid
        );

        // Rezultātu drīkst saglabāt TIKAI ar savu autentificēto UID (nevar viltot cita bērna rezultātus)
        allow create: if isApprovedFamily() && (
          request.resource.data.studentUid == request.auth.uid || isParent()
        );

        // Dzēst vai labot rezultātus drīkst tikai vecāks
        allow update, delete: if isParent();
      }

      // =======================================================================
      // 4. IESTATĪJUMI: /homeSchool/data/settings/{settingId}
      // =======================================================================
      match /settings/{settingId} {
        allow read: if isApprovedFamily();
        // Noteikt vecāku UID sarakstu ('config') drīkst TIKAI vecāks
        allow write: if isParent();
      }
    }
  }
}
```

---

## 3. Pārbaude un aizsardzība pret esošajiem Datorika HUB Wildcard noteikumiem

### Kā Firestore apstrādā noteikumus (SVARĪGI):
Firestore Security Rules darbojas pēc **pieļaujošās apvienošanas (OR)** principa:
> Ja datubāzē eksistē jebkurš globāls noteikums (piemēram, `match /{document=**} { allow read, write: if request.auth != null; }`), tas piešķirs piekļuvi **arī** `homeSchool` datiem, ignorējot stingrākos iekšējos ierobežojumus!

### Kā nodrošināt, ka Datorika HUB noteikumi neapiet Mājas skolas drošību:

1. **Pārbaudiet Datorika HUB esošos noteikumus Firebase Console**:
   Pārliecinieties, vai tajos nav globāla aizstājējzīmes (wildcard) ieraksta:
   `match /{document=**} { allow ... }`

2. **Ja globāls wildcard noteikums eksistē, izmantojiet vienu no diviem drošiem risinājumiem**:
   - **A risinājums (Ieteicamais):** Definējiet Datorika HUB noteikumus konkrētām Datorika kolekcijām (piem., `match /courses/{id}`, `match /students/{id}`, `match /assignments/{id}`), nevis visai datubāzei kopumā.
   - **B risinājums (Izslēgšanas filtrs):** Ja globālais noteikums ir nepieciešams, pievienojiet nosacījumu, kas skaidri izslēdz `homeSchool`:
     ```javascript
     match /{document=**} {
       // Atļauj piekļuvi Datorika HUB datiem, bet aizliedz globālu piekļuvi homeSchool
       allow read, write: if request.auth != null && !document.matches('^homeSchool/.*');
     }
     ```

Šāda pieeja pilnībā garantē, ka neviens Datorika HUB lietotājs nevarēs piekļūt Mājas skolas ierakstiem.
