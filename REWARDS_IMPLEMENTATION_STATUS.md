# BP maka ieviešanas statuss — 2026-10-09

## 1. Pabeigts un ieslēgts
- Firestore balvu **vēlmju** pieteikumi `homeSchool/data/rewardRequests`: bērna konts iesniedz, vecāks piekrīt/noraida.
- Vecāka priekšskatījums neveido bērna Firebase progresa ierakstus.
- Samantas matemātikas un Marka latviešu valodas lokālie ieraksti ir izolēti ar Firebase UID.
- Balvu veikals nerāda neapstiprinātus punktus kā iztērējamu atlikumu.

## 2. Sagatavots servera kods, bet VĒL NAV PIESLĒGTS tērējamam makam
- `server/reward-policy.js`: pareizo atbilžu pārbaude tikai pret servera zināmām atbildēm, sērijas bonusi, 20 BP maksimālais potenciāls, viena temata labākā rezultāta uzlabojuma starpība, identitātes pārbaude.
- `server/reward-policy.test.js`: vienību testi; `npm test` to palaišanai.
- Šie faili **neizveido Firebase maku, nepiešķir BP un nenoraksta BP**.

## 3. Obligāti pirms ieslēgšanas
1. Servera kontrolēts uzdevumu saturs un atbilžu atslēgas — bērna pārlūks nedrīkst iesūtīt `correctAnswers` vai `correct` kā uzticamu rezultātu.
2. Verificēts Firebase ID tokens un profils, atsevišķa bērna UID identitāte.
3. Katram pārbaudes mēģinājumam neatkārtojams ID, laika logs un stingra pārbaude, vai atbilžu secība atbilst izsniegtajam uzdevumam.
4. Firestore Admin SDK / drošs servera konts un transakcija: temata maksimums, jauns mēģinājums, piešķirtā starpība un audita ieraksts tiek rakstīti atomāri.
5. BP balanss jāaprēķina no servera apstiprināta žurnāla. XP nedrīkst sajaukt ar BP; mācību un kļūdu treniņi nedod BP.
6. Balvas pieteikuma apstiprināšanas laikā servera transakcija pārbauda bilanci, rezervē/noraksta cenu, neļauj dubultu pirkumu; noraidīšanas gadījumā veic drošu rezervācijas atbrīvošanu.
7. Pārbaudīt Firebase Emulator scenārijus un nošķirt `homeSchool` no esošā Datorika HUB.

**Drošības princips:** labāk pagaidām nulle tērējamu BP nekā kļūdaini vai viltoti bērnu sasniegumi. Iepriekšējā vecāka testēšanas vēsture netiek automātiski dzēsta.
