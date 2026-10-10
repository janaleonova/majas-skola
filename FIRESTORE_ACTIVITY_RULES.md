# LEVEL UP! — aktivitātes uzskaite (Firestore rules papildinājums)

Šis fragments **jāpievieno esošās Firestore datubāzes** `match /databases/{database}/documents` **iekšpusē**. Neaizvietot esošos noteikumus: tas pats Firebase projekts apkalpo arī Datorika HUB.

```js
match /homeSchool/data/activityPresence/{presenceId} {
  function signedIn() {
    return request.auth != null;
  }
  function parent() {
    return signedIn()
      && get(/databases/$(database)/documents/homeSchool/data/users/$(request.auth.uid)).data.role == 'vecaks';
  }
  function ownPresence() {
    return signedIn()
      && request.resource.data.studentUid == request.auth.uid
      && request.resource.data.studentRole in ['marks', 'samanta']
      && presenceId == request.auth.uid + '_' + request.resource.data.date;
  }
  function validPresence() {
    return ownPresence()
      && request.resource.data.keys().hasOnly([
        'studentUid','studentRole','date','activity','isActive',
        'activeSeconds','sessionId','updatedAt'
      ])
      && request.resource.data.date is string
      && request.resource.data.date.matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')
      && request.resource.data.activity is string
      && request.resource.data.activity.size() <= 100
      && request.resource.data.isActive is bool
      && request.resource.data.activeSeconds is int
      && request.resource.data.activeSeconds >= 0
      && request.resource.data.activeSeconds <= 86400
      && request.resource.data.sessionId is string
      && request.resource.data.updatedAt == request.time;
  }
  allow get, list: if signedIn() && (
    parent() || resource.data.studentUid == request.auth.uid
  );
  allow create: if validPresence() && request.resource.data.activeSeconds <= 20;
  allow update: if validPresence()
    && resource.data.studentUid == request.auth.uid
    && request.resource.data.studentRole == resource.data.studentRole
    && request.resource.data.date == resource.data.date
    && request.resource.data.activeSeconds >= resource.data.activeSeconds
    && request.resource.data.activeSeconds <= resource.data.activeSeconds + 20;
  allow delete: if false;
}
```

Tikai bērna autentificētais konts raksta savus uzskaites datus; vecāks tos lasa. Laiks ir **aptuvens, nevis garantēts ekrāna lietojuma audits**: ierīces fonā lietotni nesāk uzskaitīt, un ilgstošas bezdarbības laikā laiks netiek pieskaitīts. Drošības noteikumi ierobežo viena atjauninājuma apjomu, bet klienta ziņotās sekundes nevar pilnībā pierādīt serverī; šos datus **neizmantot izpērkamu BP piešķiršanai**.

Pēc publicēšanas pārbaudīt bērna kontā aktivitāti un vecāka panelī, vai redzamas abas kartītes. Neko neizdzēš no progress, users, tasks vai citām kolekcijām.
