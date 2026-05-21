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
            Niezależny projekt monitorujący wydatki publiczne posłów Sejmu RP.
            Otwarte dane, bez prowizji.
          </p>
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--c-text-6)" }}
          >
            Źródła danych
          </div>
          <ul className="mt-3 space-y-1.5 text-[13px]" style={{ color: "var(--c-text-4)" }}>
            <li>
              ·{" "}
              <a
                href="https://jakglosuja.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--c-text-1)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--c-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--c-text-1)")
                }
              >
                jakglosuja.pl
              </a>{" "}
              
            </li>
          </ul>
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--c-text-6)" }}
          >
            Zastrzeżenia
          </div>
          <p
            className="mt-3 text-[12px] leading-relaxed"
            style={{ color: "var(--c-text-5)" }}
          >
            Dane mają charakter{" "}
            <span style={{ color: "var(--c-text-1)" }}>poglądowy</span>.
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--c-border)" }}>
        <div
          className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracking-wider"
          style={{ color: "var(--c-text-6)" }}
        >
          <span>© 2025 kilometrówki.pl · CC BY 4.0</span>
          <span>Dane: jakglosuja.pl</span>
        </div>
      </div>
    </footer>
  );
}
