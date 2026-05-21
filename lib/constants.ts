export const CLUB_LOGOS: Record<string, string> = {
  KO:              "/logos/ko.svg",
  PiS:             "/logos/pis.svg",
  Lewica:          "/logos/lewica.svg",
  "PSL-TD":        "/logos/psl.svg",
  Polska2050:      "/logos/polska2050.svg",
  Konfederacja:    "/logos/konfederacja.svg",
  Konfederacja_KP: "/logos/konfederacja_kp.png",
  Razem:           "/logos/razem.svg",
  Demokracja:      "/logos/demokracja.svg",
};

export const CLUB_COLORS: Record<string, string> = {
  KO:                "#FF6B35",
  PiS:               "#1B4F8A",
  Lewica:            "#C0392B",
  "PSL-TD":          "#27AE60",
  Polska2050:        "#F39C12",
  Konfederacja:      "#8E44AD",
  Konfederacja_KP:   "#7D3C98",
  Centrum:           "#7F8C8D",
  Razem:             "#E74C3C",
  Demokracja:        "#2980B9",
  "niez.":           "#4B5563",
  niez:              "#4B5563",
};

export const ANOMALY_THRESHOLD = 200;

export function fmtPln(n: number): string {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n) + " zł";
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat("pl-PL").format(n);
}
