import { ThemeToggle } from "./ThemeToggle";

export function Hero() {
  return (
    <header style={{ borderBottom: "1px solid var(--c-border)" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 md:pt-10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--c-text-4)" }}
          >
            <span className="inline-block w-2 h-2 bg-[#e53e3e]" />
            <span>Dane publiczne</span>
            <span style={{ color: "var(--c-text-6)" }}>/</span>
            <span>Sejm X kadencji</span>
            <span style={{ color: "var(--c-text-6)" }}>/</span>
            <span>aktualizacja 2025</span>
          </div>
          <ThemeToggle />
        </div>
        <h1
          className="mt-3 font-display font-black leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(48px, 9vw, 120px)", color: "var(--c-text-1)" }}
        >
          Kilometrówki
          <br />
          <span style={{ color: "var(--c-accent)" }}>posłów.</span>
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[16px] md:text-[18px]"
          style={{ color: "var(--c-text-2)" }}
        >
          Posłowie rozliczają do{" "}
          <span className="font-mono" style={{ color: "var(--c-text-1)" }}>
            1 500 km / mc
          </span>{" "}
          bez faktur i bez paragonów. Sprawdź, kto ile bierze.
        </p>
      </div>
    </header>
  );
}
