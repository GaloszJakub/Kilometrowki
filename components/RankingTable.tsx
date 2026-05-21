"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MemberSummary } from "@/types";
import { CLUB_COLORS, CLUB_LOGOS, fmtPln } from "@/lib/constants";

type SortKey = "total" | "car" | "taxi";

interface ViewRow {
  member: MemberSummary;
  total: number;
  car: number;
  taxi: number;
  pdf_url: string | null;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = options.find((o) => o.value === value)?.label ?? placeholder;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 text-[13px] min-w-[160px]"
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          color: value === "all" ? "var(--c-text-4)" : "var(--c-text-1)",
        }}
      >
        <span className="flex-1 text-left truncate">{label}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{
            stroke: "var(--c-text-5)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.15s",
            flexShrink: 0,
          }}
        >
          <path d="M1 3l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 min-w-full max-h-64 overflow-y-auto"
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-[13px] transition-colors"
              style={{
                background: value === opt.value ? "var(--c-hover)" : "transparent",
                color: value === opt.value ? "var(--c-text-1)" : "var(--c-text-3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = value === opt.value ? "var(--c-hover)" : "transparent")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClubBadge({ clubId }: { clubId: string }) {
  const logo = CLUB_LOGOS[clubId];
  const color = CLUB_COLORS[clubId] ?? "#4b5563";
  if (logo) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-sm bg-white" title={clubId}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={clubId} className="h-7 w-auto max-w-[96px] object-contain" />
      </span>
    );
  }
  return (
    <span
      className="inline-block px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-sm"
      style={{ background: color + "22", color, border: `1px solid ${color}44` }}
    >
      {clubId}
    </span>
  );
}

function MobileCard({ mp, rank, total, car, taxi, pdfUrl }: {
  mp: MemberSummary; rank: number;
  total: number; car: number; taxi: number; pdfUrl: string | null;
}) {
  const router = useRouter();
  return (
    <div
      className="p-4 cursor-pointer transition-colors hover:bg-[var(--c-hover)]"
      style={{ borderTop: "1px solid var(--c-border)" }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        router.push(`/posel/${mp.member_id}`);
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="font-mono text-3xl font-bold leading-none w-9 shrink-0 tabular-nums"
          style={{ color: "var(--c-text-6)" }}
        >
          {String(rank).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <a
            href={`https://www.sejm.gov.pl/Sejm10.nsf/posel.xsp?id=${mp.member_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[17px] font-semibold leading-tight truncate hover:underline"
            style={{ color: "var(--c-text-1)" }}
          >
            {mp.name}
          </a>
          <div className="mt-1">
            <ClubBadge clubId={mp.club} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--c-text-5)" }}>Łącznie</div>
          <div className="font-mono font-medium text-[16px] tabular-nums" style={{ color: "var(--c-text-1)" }}>{fmtPln(total)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--c-text-5)" }}>Auto</div>
          <div className="font-mono text-[15px] tabular-nums" style={{ color: "var(--c-text-1)" }}>{fmtPln(car)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--c-text-5)" }}>Taxi</div>
          <div className="font-mono text-[15px] tabular-nums" style={{ color: "var(--c-text-1)" }}>{fmtPln(taxi)}</div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {(pdfUrl ? [{ url: pdfUrl }] : mp.years.map((y) => ({ url: y.pdf_url, year: y.year }))).map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 transition-colors"
              style={{ border: "1px solid var(--c-border)", color: "var(--c-text-4)" }}
            >
              PDF{"year" in p ? ` ${p.year}` : ""}
            </a>
          ))}
        </div>
        <Link
          href={`/posel/${mp.member_id}`}
          className="inline-flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold transition-all hover:brightness-110 whitespace-nowrap shrink-0"
          style={{ background: "var(--c-accent)", color: "#fff" }}
        >
          Szczegóły
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

interface Props {
  members: MemberSummary[];
  year: string;
  club: string;
  setClub: (c: string) => void;
}

export function RankingTable({ members, year, club, setClub }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("total");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q");
      if (query) setQ(query);
    }
  }, []);

  const handleSetQ = (val: string) => {
    setQ(val);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (!val.trim()) params.delete("q");
      else params.set("q", val);
      const qs = params.toString();
      const newUrl = qs ? `?${qs}` : window.location.pathname;
      window.history.replaceState({ ...window.history.state }, "", newUrl);
    }
  };

  function handleSort(key: SortKey) {
    if (key === sort) setDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSort(key); setDir("desc"); }
  }

  const clubs = useMemo(
    () => ["all", ...Array.from(new Set(members.map((m) => m.club))).sort()],
    [members]
  );

  const filtered = useMemo((): ViewRow[] => {
    const yearNum = year === "all" ? null : parseInt(year);
    return members
      .filter((m) => {
        if (club !== "all" && m.club !== club) return false;
        if (q.trim() && !m.name.toLowerCase().includes(q.toLowerCase().trim())) return false;
        if (yearNum !== null && !m.years.some((y) => y.year === yearNum)) return false;
        return true;
      })
      .map((m): ViewRow => {
        if (yearNum === null) {
          return { member: m, total: m.km_total_all_years, car: m.km_car_all_years, taxi: m.km_taxi_all_years, pdf_url: null };
        }
        const yr = m.years.find((y) => y.year === yearNum)!;
        return { member: m, total: yr.km_total_pln, car: yr.km_car_pln, taxi: yr.km_taxi_pln, pdf_url: yr.pdf_url };
      })
      .sort((a, b) => dir === "desc" ? b[sort] - a[sort] : a[sort] - b[sort]);
  }, [members, q, club, year, sort, dir]);

  const sortCols: [SortKey, string, string][] = [
    ["total", "Ryczałt łącznie", "text-right pr-3 pb-2 pt-4 w-[160px]"],
    ["car",   "Auto",            "text-right pr-3 pb-2 pt-4 w-[130px]"],
    ["taxi",  "Taxi",            "text-right pr-4 pb-2 pt-4 w-[120px]"],
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-8 pb-16">
      {/* Filter bar */}
      <div
        className="sticky top-0 z-40 py-3"
        style={{
          backdropFilter: "blur(8px)",
          background: "color-mix(in srgb, var(--c-bg) 90%, transparent)",
          borderBottom: "1px solid var(--c-border)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Search */}
          <div
            className="flex items-center min-w-[220px] md:w-[280px]"
            style={{ border: "1px solid var(--c-border)", background: "var(--c-surface)" }}
          >
            <svg className="ml-2.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-4)" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => handleSetQ(e.target.value)}
              placeholder="Szukaj posła…"
              className="bg-transparent px-2 py-2 text-[14px] w-full focus:outline-none placeholder:text-[var(--c-text-5)]"
              style={{ color: "var(--c-text-1)" }}
            />
            {q && (
              <button onClick={() => handleSetQ("")} style={{ color: "var(--c-text-4)" }} className="px-2">
                ×
              </button>
            )}
          </div>

          <CustomSelect
            value={club}
            onChange={setClub}
            placeholder="Wszystkie kluby"
            options={[
              { value: "all", label: "Wszystkie kluby" },
              ...clubs.filter((c) => c !== "all").map((c) => ({ value: c, label: c })),
            ]}
          />

          <div className="flex-1" />

          {/* Mobile sort buttons */}
          <div className="flex md:hidden items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--c-text-5)" }}>
              Sortuj
            </span>
            {sortCols.map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className="px-2.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors"
                style={{
                  borderWidth: 1, borderStyle: "solid",
                  borderColor: sort === key ? "var(--c-text-1)" : "var(--c-border)",
                  background: sort === key ? "var(--c-hover)" : "transparent",
                  color: sort === key ? "var(--c-text-1)" : "var(--c-text-4)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 text-[11px] uppercase tracking-wider" style={{ color: "var(--c-text-5)" }}>
          <span className="font-mono tabular-nums" style={{ color: "var(--c-text-1)" }}>
            {filtered.length}
          </span>{" "}
          / {members.length} posłów
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--c-text-5)" }}>
              <th className="text-left font-medium pl-3 pr-2 pb-2 pt-4 w-[60px]">#</th>
              <th className="text-left font-medium pr-3 pb-2 pt-4">Poseł</th>
              <th className="text-left font-medium pr-3 pb-2 pt-4 w-[130px]">Klub</th>
              <th className="text-right font-medium pr-3 pb-2 pt-4 w-[80px]">Lata</th>
              {sortCols.map(([key, label, cls]) => (
                <th
                  key={key}
                  className={`font-medium cursor-pointer select-none ${cls}`}
                  onClick={() => handleSort(key)}
                  style={{ color: sort === key ? "var(--c-text-1)" : "var(--c-text-5)" }}
                >
                  <span className="inline-flex items-center justify-end gap-1">
                    {label}
                    <span style={{ opacity: sort === key ? 1 : 0 }}>
                      {dir === "desc" ? "↓" : "↑"}
                    </span>
                  </span>
                </th>
              ))}
              <th className="text-right font-medium pr-4 pb-2 pt-4 w-[60px]">PDF</th>
              <th className="text-right font-medium pr-4 pb-2 pt-4 w-[110px]">Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="py-16 text-center text-[14px]" style={{ color: "var(--c-text-5)" }}>
                  Brak posłów spełniających kryteria.
                </td>
              </tr>
            )}
            {filtered.map((row, i) => {
              const mp = row.member;
              const pdfLinks = row.pdf_url
                ? [{ year: parseInt(year), url: row.pdf_url }]
                : mp.years.map((y) => ({ year: y.year, url: y.pdf_url }));
              return (
                <tr
                  key={mp.member_id}
                  className="transition-colors cursor-pointer"
                  style={{ borderTop: "1px solid var(--c-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--c-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) return;
                    router.push(`/posel/${mp.member_id}`);
                  }}
                >
                  <td className="py-3.5 pl-3 pr-2 align-middle">
                    <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: "var(--c-text-6)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="py-3.5 pr-3 align-middle">
                    <a
                      href={`https://www.sejm.gov.pl/Sejm10.nsf/posel.xsp?id=${mp.member_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-[16px] font-semibold leading-tight hover:underline"
                      style={{ color: "var(--c-text-1)" }}
                    >
                      {mp.name}
                    </a>
                  </td>
                  <td className="py-3.5 pr-3 align-middle">
                    <ClubBadge clubId={mp.club} />
                  </td>
                  <td className="py-3.5 pr-3 align-middle text-right">
                    <span className="font-mono text-[13px] tabular-nums" style={{ color: "var(--c-text-4)" }}>
                      {year === "all" ? mp.years.map((y) => y.year).join(", ") : year}
                    </span>
                  </td>
                  <td className="py-3.5 pr-3 align-middle text-right">
                    <div className="font-mono font-medium text-[16px] tabular-nums" style={{ color: "var(--c-text-1)" }}>
                      {fmtPln(row.total)}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 align-middle text-right">
                    <div className="font-mono text-[15px] tabular-nums" style={{ color: "var(--c-mono)" }}>
                      {fmtPln(row.car)}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 align-middle text-right">
                    <div className="font-mono text-[14px] tabular-nums" style={{ color: "var(--c-text-4)" }}>
                      {fmtPln(row.taxi)}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 align-middle text-right">
                    <div className="flex flex-col items-end gap-1">
                      {pdfLinks.map((p) => (
                        <a
                          key={p.year}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 transition-colors"
                          style={{ border: "1px solid var(--c-border)", color: "var(--c-text-4)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-4)")}
                        >
                          {p.year}
                        </a>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 align-middle text-right">
                    <Link
                      href={`/posel/${mp.member_id}`}
                      className="inline-flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-1.5 font-bold transition-all hover:brightness-110 whitespace-nowrap shrink-0"
                      style={{ background: "var(--c-accent)", color: "#fff" }}
                    >
                      Szczegóły
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-[14px]" style={{ color: "var(--c-text-5)" }}>
            Brak posłów spełniających kryteria.
          </div>
        )}
        {filtered.map((row, i) => (
          <MobileCard key={row.member.member_id} mp={row.member} rank={i + 1} total={row.total} car={row.car} taxi={row.taxi} pdfUrl={row.pdf_url} />
        ))}
      </div>
    </section>
  );
}
