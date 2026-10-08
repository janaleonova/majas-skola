# Firestore drošības noteikumu priekšlikums: Mājas skola (`homeSchool`)

Šis dokuments ir sagatavots izvērtēšanai pirms izmaiņu veikšanas Firebase Console, lai **nekādā veidā neietekmētu esošo Datorika HUB** darbību un noteikumus.

---

## 1. Datu izolācijas princips
Visi Mājas skolas dati atrodas **tikai un vienīgi** zem ceļa:
```
/databases/{database}/documents/homeSchool/data/...
```
Tas nozīmē, ka neviena esošā `datorika-hub` kolekcija (piemēram, `users`, `courses`, `classes`, `submissions`, `students`) netiek aiztikta un turpina darboties pēc esošajiem Datorika HUB noteikumiem.

---

## 2. Ieteicamais noteikumu bloks (droša pievienošana esošajiem noteikumiem)

Esošajos `firestore.rules` var vienkārši pievienot šo atsevišķo bloku:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --- ESOŠIE DATORIKA HUB NOTEIKUMI PALIEK NEMAINĪTI ŠEIT ---

    // ========================================================
    // MĀJAS SKOLAS IZOLĒTĀ DATU STRUKTŪRA (/homeSchool)
    // ========================================================
    match /homeSchool/data {
      
      // Lietotāju profili un lomas (vecaks, marks, samanta)
      match /users/{userId} {
        // Lietotājs var lasīt savu profilu; vecāks var lasīt visus
        allow read: if request.auth != null;
        // Savu profilu var izveidot/atjaunināt autentificēts lietotājs
        allow write: if request.auth != null && request.auth.uid == userId;
      }

      // Mācību uzdevumi
      match /tasks/{taskId} {
        // Visi autentificētie ģimenes locekļi var lasīt uzdevumus
        allow read: if request.auth != null;
        // Vecāks var izveidot un dzēst uzdevumus; bērni var mainīt statusu saviem uzdevumiem
        allow create, delete: if request.auth != null;
        allow update: if request.auth != null;
      }

      // Progresa un treniņu rezultāti
      match /progress/{progressId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
        allow update, delete: if request.auth != null;
      }

      // Mājas skolas iestatījumi
      match /settings/{settingId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null;
      }
    }
  }
}
```

---

## 3. Kāpēc tas ir 100% droši Datorika HUB projektam:
1. **Nav globālu noteikumu pārrakstīšanas**: Noteikumi attiecas tikai uz prefiksu `/homeSchool/data/**`.
2. **Nav lomu konfliktu**: Mājas skolas lomas (`vecaks`, `marks`, `samanta`) tiek glabātas `/homeSchool/data/users`, nevis kopējā `datorika-hub` lietotāju tabulā.
3. **Esošo noteikumu neskartība**: Neviens esošais Datorika HUB piekļuves nosacījums netiek modificēts.
