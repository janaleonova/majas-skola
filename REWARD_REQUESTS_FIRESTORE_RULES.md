# Mājas skola — balvu vēlmju Firestore piekļuve
**Svarīgi:** šo noteikumu pievienošana GitHub pati par sevi NEAKTIVIZĒ tos Firebase. Jāpārbauda esošie noteikumi un jāievieto tikai zem esošā `match /homeSchool/{document=**}` atbilstošā `homeSchool/data` mezgla. Neaizstāt Datorika HUB noteikumus.

Jaunais ceļš: `homeSchool/data/rewardRequests/{requestId}`.

Šī posma sistēma ir **tikai vēlmju pieteikšana**: nav nopelnītu BP maka, automātiskas iztērēšanas, XP->BP konvertācijas vai balvas automātiskas piešķiršanas. Saglabātas agrākās localStorage vēlmju kopijas netiek importētas.

Piemērs noteikumu fragmentam, ko integrēt **esošajā** `match /homeSchool/data`:
```rules
match /rewardRequests/{requestId} {
  allow get, list: if isParent() ||
    (isApprovedFamily() && resource.data.studentUid == request.auth.uid);
  allow create: if isApprovedFamily()
    && !isParent()
    && request.resource.data.studentUid == request.auth.uid
    && request.resource.data.studentRole == getUserData(request.auth.uid).role
    && request.resource.data.kind == 'wish_only'
    && request.resource.data.status == 'pending'
    && request.resource.data.keys().hasOnly([
      'studentUid','studentRole','rewardId','rewardTitle','cost',
      'kind','status','createdAt','updatedAt'
    ]);
  allow update: if isParent()
    && request.resource.data.diff(resource.data).affectedKeys().hasOnly([
      'status','reviewedBy','updatedAt'
    ])
    && resource.data.status == 'pending'
    && request.resource.data.status in ['approved','rejected']
    && request.resource.data.reviewedBy == request.auth.uid;
  allow delete: if false;
}
```
Pirms publicēšanas testēt Firestore Emulator: bērns nevar lasīt otra bērna vēlmes, nevar mainīt statusu vai cenu, vecāks drīkst tikai piekrist/noraidīt, nepiederošs lietotājs netiek klāt. Globālie Firestore wildcard noteikumi nedrīkst apiet izolāciju.

Lai ieviestu **īstus tērējamus BP**, būs vajadzīga servera validēta uzdevumu atbilžu pārbaude un atsevišķa transakciju uzskaite ar idempotenci. Tikai pēc tam drīkst atļaut BP rezervēšanu, vecāka apstiprināšanu un iztērēšanu.
