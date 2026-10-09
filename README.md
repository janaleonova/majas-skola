# Mājas skola

Vienas ģimenes mācību lietotne diviem bērniem — **Markam** un **Samantai** — ar personalizētu saturu, atšķirīgām vizuālajām pasaulēm un kopīgu **Vecāka pārvaldības paneli**.

## 📖 Projekta dokumentācija
- **[Pilna projekta specifikācija un attīstības plāns](MAJAS_SKOLA_SPECIFIKACIJA.md)** — vienotais atskaites punkts (arhitektūra, metodika, ieviestais kodā vs. plānotais, attīstības ceļakarte).
- **[Pieteikšanās un kontu iestatīšana](SETUP_LOGIN.md)** — 3 kontu un paroļu konfigurācija Firebase Authentication.
- **[Drošības noteikumu priekšlikums](FIRESTORE_RULES_PROPOSAL.md)** — izolētā Firestore datu struktūra `homeSchool/data/...`.
- **[Punktu un motivācijas metodika](POINTS_POLICY.md)** — pareizo atbilžu sērijas, BP un nākotnes balvu sistēma.
- **[Drošības audits](SECURITY_AUDIT_REPORT.md)** — neatļautas piekļuves un datu izolācijas pārbaužu scenāriji.

## Pašreizējais posms
- **Marka skola:** Latviešu valoda (3 tēmas ar MI pedagogu), Matemātika (reizrēķins, dalīšana, saimes, misijas ar ekrāna ciparnīcu), Angļu valoda, Balvu veikals.
- **Samantas skola:** Matemātika (vizuālās grupas, reizināšanas tabula, ekrāna ciparnīca), Latviešu valoda (balss nolasīšana), Angļu valoda (audio izruna, krāsas, dzīvnieki, skaitļi, ikdiena), Balvu veikals.
- **Vecāka panelis:** Abu bērnu skatu pārslēgšana, uzdevumu piešķiršana, rezultātu un prasmju analīze, balvu pieteikumu pārvaldība, 7 dienu analītika ar starpliktuves eksportu, vecāka testa datu dzēšana.
- **PWA (Progressive Web App):** Web App Manifest, Service Worker kešatmiņa un instalēšanas atbalsts planšetēs un viedtālruņos.
- **Datu izolācija:** Visi dati stingri nodalīti `homeSchool/data/` apakškolekcijās, neskarot esošos Datorika HUB datus.

## Datu drošība
Šis repozitorijs ir publisks. Nekad nepievienot paroles, privātās atslēgas vai bērnu sensitīvos datus kodā vai git vēsturē. Visi noslēpumi un atslēgas glabājas servera vides mainīgajos.

## Palaišana
```bash
npm install
npm run build
npm start
```
Dev serveris pieejams adresē `http://localhost:3000`.
