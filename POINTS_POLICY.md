# Mājas skola — punktu piešķiršanas metodika (v1)

## Pamatprincips
- **BP (balvu punkti)**: vēlāk tērējami vecāku apstiprinātām balvām. Kods pagaidām rāda tikai *informatīvus treniņa BP*, **nevis īstu balvu maku**.
- **XP**: nākamajā posmā netērējams līmeņa progress.
- Katra bērna rezultāti un maks ir atsevišķi. Nedrīkst pārnest punktus starp kontiem.
- Nekāda atlīdzība par patvaļīgu klikšķināšanu vai izdarītā laika ilgumu.

## Precīza pirmās versijas aprēķina skala
Treniņam ar 20 jautājumiem ir 20 BP maksimālais potenciāls. Citam jautājumu skaitam nosaka pareizo atbilžu procentu. Pamatpunkti ir atkarīgi no procentu intervāla:
- 0–39%: 0–3 BP;
- 40–59%: 4–7 BP;
- 60–74%: 8–11 BP;
- 75–89%: 12–15 BP;
- 90–100%: 16–18 BP.
Proporcionāli interpolē intervāla iekšienē uz leju līdz veselam skaitlim.
Sērijas bonuss: **+1 BP** par vismaz 5 pareizām atbildēm pēc kārtas, vēl **+1 BP** par vismaz 10.
Maksimums: **20 BP kopā uz vienu priekšmeta tēmu/uzdevumu kopu**.
Atkārtojot treniņu, starpību nosaka pēc iepriekšējā **labākā** potenciāla: jaunais labākais mīnus iepriekšējais labākais (minimums 0).
Režīmi **Mācos** un **Trenēt kļūdas** BP potenciālu nepiešķir. Tie sniedz zināšanu atbalstu un turpmāku prasmju attīstību.

## Motivācijas UX
- Atbilžu sērijas skaitītājs (piemēram, “🔥 5 pēc kārtas”), ar mazu ieskaitāmo piemaksu.
- Progresa josla, kas rāda, cik jautājumu izpildīti no kopējā skaita.
- Pēc rezultāta parādīt procentus, punktu sadalījumu, sērijas bonusu un uzlabojumu.
- Kļūdas neatskaita nopelnītos punktus un bērnu nekaunina.
- Nav bezgalīgas pelnīšanas, pārlādējot vienu un to pašu treniņu.

## Obligāti pirms īsta balvu maka
**Treniņa BP pašlaik ir vizuāls, lokāli aprēķināts novērtējums.** Tas nav droši pieskaitāms naudai vai reālu privilēģiju tērēšanai.

Lai aktivizētu patiesu balvu maku:
1. Bērna uzdevuma komplekts ir reģistrēts uzticamā serverī (uzdevumu ID, vērtēšanas atslēgas, nejaušības sēkla), nevis paļaujas tikai uz klienta procentu.
2. Serveris autentificē bērnu, pārbauda atbildes un to secību, aprēķina sēriju un vecāko labāko rezultātu.
3. Vienā Firestore transakcijā serveris ievieto nemaināmu notikumu ar idempotences atslēgu un koriģē bērna atlikumu (maks. 20 BP par attiecīgo uzdevumu kopu).
4. Vecāka panelī ir pārskatāms audita žurnāls un korekciju iespēja.
5. Balvu saņemšanas pieprasījumi ir vecāka apstiprināmi, ar punktu rezervēšanu un atmaksu noraidīšanas gadījumā.
6. Ikdienas uzdevumu pabeigšanas bonuss: nākamajā posmā vienreiz dienā, tikai ja vecāka noteiktie darbi izpildīti; bez mākslīgi radītiem atkārtojumiem.
7. Abiem bērniem vienādas bāzes cenas; vecāks var piešķirt individuālas balvas.

Paredzētais sākotnējais veikals: +20 min telefona laika = 100 BP, +40 min spēļu laika = 180 BP, filmu vakars = 250 BP. Šīs cenas vēl nav aktivizētas.

## Integrācijas statuss
- Pievienots aprēķina modulis: `src/points-policy.js`.
- Marka latviešu valodā un Samantas matemātikā ieviesta sērija, progresa josla un informatīvs punktu potenciāls.
- **Nav** ieviesta servera līmeņa punktu piešķiršana un balvu veikala pirkšana.
- Citi vēl nepievienotie trenažieri pagaidām nav pieslēgti punktiem.

Punktu metodika ir paredzēta izmantošanai, bet bērnu balvu atlikumu nedrīkst uzskatīt par autorizētu, kamēr nav servera validācijas.
