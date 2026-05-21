"use client";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div
            className="font-display font-black text-[22px] leading-none"
            style={{ color: "var(--c-text-1)" }}
          >
            kilometrówki<span style={{ color: "var(--c-accent)" }}>.</span>
          </div>
          <p
            className="mt-3 text-[12px] leading-relaxed"
            style={{ color: "var(--c-text-5)" }}
          >
            Niezależny, apolityczny projekt obywatelski monitorujący wydatki publiczne posłów Sejmu RP.
            Otwarte dane dla lepszej transparentności.
          </p>
          <div className="mt-4">
            <span
              className="text-[10px] uppercase tracking-[0.2em] block mb-1"
              style={{ color: "var(--c-text-6)" }}
            >
              Kontakt i korekty
            </span>
            <a
              href="https://github.com/GaloszJakub/Kilometrowki/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] hover:underline"
              style={{ color: "var(--c-text-1)" }}
            >
              Zgłoś uwagi / GitHub Issues
            </a>
          </div>
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--c-text-6)" }}
          >
            Źródła & RODO
          </div>
          <p
            className="mt-3 text-[12px] leading-relaxed"
            style={{ color: "var(--c-text-5)" }}
          >
            Dane są agregowane przez serwis{" "}
            <a
              href="https://jakglosuja.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:underline"
              style={{ color: "var(--c-text-1)" }}
            >
              jakglosuja.pl
            </a>{" "}
            na podstawie oficjalnych sprawozdań finansowych biur poselskich publikowanych przez Kancelarię Sejmu RP.
          </p>
          <p
            className="mt-3 text-[11px] leading-normal"
            style={{ color: "var(--c-text-5)" }}
          >
            Przetwarzanie danych osobowych posłów na Sejm RP odbywa się na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes – jawność i transparentność życia publicznego).
          </p>
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--c-text-6)" }}
          >
            Zastrzeżenia prawne
          </div>
          <p
            className="mt-3 text-[12px] leading-relaxed"
            style={{ color: "var(--c-text-5)" }}
          >
            Prezentowane informacje mają charakter wyłącznie <span style={{ color: "var(--c-text-1)" }}>poglądowy i edukacyjny</span>. Autor serwisu dokłada wszelkich starań, aby dane były rzetelne, lecz nie ponosi odpowiedzialności za dokładność sprawozdań źródłowych ani skutki ewentualnych pomyłek. Pełne, wiążące sprawozdania znajdują się na stronach <a href="https://www.sejm.gov.pl" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--c-text-1)" }}>sejm.gov.pl</a>.
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--c-border)" }}>
        <div
          className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracking-wider"
          style={{ color: "var(--c-text-6)" }}
        >
          <span>© 2026 kilometrówki.pl · CC BY 4.0</span>
          <span>Dane: Sejm RP / jakglosuja.pl</span>
        </div>
      </div>
    </footer>
  );
}
