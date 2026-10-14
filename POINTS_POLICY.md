# Vienotā BP politika — versija 3

Vienīgais aprēķina avots ir `src/learning-policy.js`; pārlūks, rezultāta kvīts un servera matemātikas pārbaude izmanto to pašu metodiku.

| Daļa | Noteikums |
|---|---|
| Meistarība | Vienā tēmā maksimums 20 BP; tikai labākā patstāvīgā rezultāta pieaugums. 0–39%: 0; 40–59%: 4; 60–74%: 8; 75–89%: 12; 90–100%: 18. Papildus +1 par 5 pareizām pēc kārtas un +1 par 10. |
| Centība | +2 par tēmas pirmo pabeigto darbu dienā; visu tēmu kopējais centības limits +6 dienā. Atkārtojums tajā pašā dienā nedublē centību. Mācību/kļūdu režīms dod centību, ne patstāvīgās meistarības punktus. |
| Dienas līdzsvars | +10 vienu reizi dienā pēc valodas/literatūras, matemātikas un angļu valodas pabeigta darba. Nav precizitātes sliekšņa — tas ir dalības bonuss. |
| Īpašās misijas | Kristālu kalve +10 pie 85%; teikumi +10 pie 85%; dzeja +20 pie 85%; saskaitīšana +15 pie 80%. Katras misijas bonuss vienu reizi saglabātajā vēsturē. |
| Vecāka uzdevums | 0–30 papildu BP, vienu reizi katram bērnam par uzdevumu, izpildot vecāka izvēlēto moduļa, režīma, datuma un rezultāta prasību. |
| Diagnostika | 0 BP; tā nav atzīme vai sacensība. |
| Atlikums | Kopā nopelnītais mīnus vecāka apstiprināto balvu noraksti (`users/{uid}.spentBP`). |

Dienas robeža ir Europe/Riga. Tēmas atslēga neietver mācību/treniņa/pārbaudes režīmu. Atkārtota viena mēģinājuma nosūtīšana ar to pašu ID nerada jaunu ierakstu.

## Balvu apstiprināšana

Jauns pieteikums ir `kind: points_request`. Vecāks pārskata mācību rezultātus un izvēlas apstiprināt/noraidīt. Apstiprinot transakcija pārbauda pēdējo norakstīto summu, nepieļauj atkārtotu apstiprināšanu un palielina `spentBP` par kataloga cenu. Bērns savu norakstīto summu nevar mainīt. Agrākos `wish_only` pieteikumus apstiprina bez jauna noraksta.

Tie ir ģimenes mācību motivācijas punkti, ne ārējs finanšu maks. Vairākus moduļus vērtē klients; vecākam pirms balvas apstiprināšanas jāvērtē arī saglabātās atbildes. Matemātika atsevišķi pārbauda atbildes serverī. Vēstures administratīva dzēšana joprojām mainītu atvasinātos sasniegumus, tāpēc ikdienas panelī progresa dzēšanas pogas nav.

## Pāreja no v2

Esošie rezultāti netiek dzēsti vai pārrakstīti. Vēsture tiek aprēķināta pēc vienotās v3 formulas, izslēdzot diagnostiku un agrāko viena klikšķa `7×8` ierakstu. Līdz ar to skaitlis var atšķirties no v2 nekonsekventā atlikuma. Pirms reālas balvu izmantošanas pārskatīt abu bērnu sākotnējos punktus; vēsturi saglabāt.
