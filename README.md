# Kilometrówki posłów

Transparentność wydatków ryczałtowych posłów Sejmu X kadencji na przejazdy samochodem i taksówkami.

---

## O projekcie

Każdy poseł może rozliczyć do **1 500 km miesięcznie** bez faktur i paragonów. Dane pochodzą ze sprawozdań finansowych biur poselskich publikowanych przez Kancelarię Sejmu RP i agregowanych przez [jakglosuja.pl](https://jakglosuja.pl).

Ten projekt zbiera te dane w jednym miejscu i pozwala sprawdzić, kto i ile pobiera.

## Dane

| | |
|---|---|
| Źródło | [jakglosuja.pl](https://jakglosuja.pl) |
| Kadencja | Sejm X (2023–) |
| Lata | 2024, 2025 |
| Sprawozdań | 729 |
| Posłów | 369 |
| Plik | `data/sprawozdania.json` |

Dane zawierają pozycje z formularza sprawozdania finansowego:
- **poz. 9** — koszty przejazdów samochodem własnym lub innym
- **poz. 10** — koszty przejazdów taksówkami

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, `output: "export"` |
| Język | TypeScript (strict) |
| Style | Tailwind CSS v4, CSS variables (dark/light mode) |
| Wykresy | Custom CSS bar chart |

## Uruchomienie

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # statyczny build → out/
```

## Struktura

```
data/
  sprawozdania.json       źródło danych (729 sprawozdań)
components/
  PageClient.tsx          zakładki lat, globalny stan roku
  RankingTable.tsx        tabela z filtrowaniem i sortowaniem
  ClubChart.tsx           wykres słupkowy wg klubu
  StatsBar.tsx            4 statystyki na górze
  Hero.tsx                nagłówek strony
  ThemeToggle.tsx         przełącznik dark / light
lib/
  data.ts                 wczytuje JSON, transformuje do MemberSummary[]
  constants.ts            kolory klubów, loga, formatowanie PLN
types/
  index.ts                MemberSummary, YearRecord, Stats, ClubStat
public/
  logos/                  SVG/PNG loga klubów poselskich
```

## Licencja

Kod: **MIT**  
Dane: publiczne — Kancelaria Sejmu RP / jakglosuja.pl
