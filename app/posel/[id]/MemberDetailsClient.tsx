"use client";

import { useState } from "react";
import Link from "next/link";
import type { MemberSummary, YearRecord } from "@/types";
import { CLUB_COLORS, CLUB_LOGOS, fmtPln } from "@/lib/constants";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

interface Props {
  member: MemberSummary;
}

export function MemberDetailsClient({ member }: Props) {
  // Find available years for this member
  const availableYears = member.years.map((y) => String(y.year)).sort();
  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears[availableYears.length - 1] ?? ""
  );

  const currentYearRecord = member.years.find(
    (y) => String(y.year) === selectedYear
  );

  const selectedYearInt = currentYearRecord ? currentYearRecord.year : 0;
  const daysInSelectedYear = selectedYearInt > 0 ? ((selectedYearInt % 4 === 0 && (selectedYearInt % 100 !== 0 || selectedYearInt % 400 === 0)) ? 366 : 365) : 365;
  const travelSelectedYear = currentYearRecord
    ? currentYearRecord.km_car_pln + currentYearRecord.km_taxi_pln
    : 0;
  const dailyAverageSelectedYear = daysInSelectedYear > 0 ? travelSelectedYear / daysInSelectedYear : 0;

  const clubColor = CLUB_COLORS[member.club] ?? "#4b5563";
  const clubLogo = CLUB_LOGOS[member.club];

  // Calculate stats for all years
  const getDaysInYear = (year: number) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  };
  const totalAllYears = member.years.reduce((s, y) => s + y.total_pln, 0);
  const travelAllYears = member.km_total_all_years;
  const travelPercentage = totalAllYears > 0 ? (travelAllYears / totalAllYears) * 100 : 0;
  const totalDaysAllYears = member.years.reduce((s, y) => s + getDaysInYear(y.year), 0);
  const dailyAverageAllYears = totalDaysAllYears > 0 ? travelAllYears / totalDaysAllYears : 0;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Mini header */}
        <div style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
            <Link
              href="/"
              onClick={handleBack}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold transition-colors hover:opacity-80"
              style={{ color: "var(--c-text-1)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Powrót do rankingu
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Member Profile Hero */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6" style={{ borderBottom: "1px solid var(--c-border)" }}>
            <div>
              {/* Club tag */}
              <div className="flex items-center gap-3">
                {clubLogo ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-sm bg-white" style={{ border: "1px solid var(--c-border)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={clubLogo} alt={member.club} className="h-6 w-auto max-w-[80px] object-contain" />
                  </span>
                ) : (
                  <span
                    className="inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-sm"
                    style={{ background: clubColor + "22", color: clubColor, border: `1px solid ${clubColor}44` }}
                  >
                    {member.club}
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--c-text-4)" }}>
                  Klub parlamentarny
                </span>
              </div>

              {/* Name */}
              <h1
                className="mt-3 font-display font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "var(--c-text-1)" }}
              >
                {member.name}
              </h1>

              {/* Sejm Link */}
              <a
                href={`https://www.sejm.gov.pl/Sejm10.nsf/posel.xsp?id=${member.member_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[12px] uppercase tracking-wider font-mono hover:underline"
                style={{ color: "var(--c-text-4)" }}
              >
                Oficjalny profil sejmowy
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                </svg>
              </a>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 md:flex gap-4 shrink-0">
              <div className="p-4 min-w-[120px] md:min-w-[160px]" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Suma wydatków</div>
                <div className="font-mono font-bold text-[18px] md:text-[22px] tabular-nums mt-1" style={{ color: "var(--c-text-1)" }}>
                  {fmtPln(totalAllYears)}
                </div>
                <div className="text-[11px] mt-1 font-medium" style={{ color: "var(--c-text-4)" }}>Biuro poselskie ogółem</div>
              </div>

              <div className="p-4 min-w-[120px] md:min-w-[160px]" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Wydatki podróżne</div>
                <div className="font-mono font-bold text-[18px] md:text-[22px] tabular-nums mt-1" style={{ color: "var(--c-accent)" }}>
                  {fmtPln(travelAllYears)}
                </div>
                <div className="text-[11px] mt-1 font-medium" style={{ color: "var(--c-text-4)" }}>
                  Samochód + Taxi ({travelPercentage.toFixed(0)}%)
                </div>
              </div>

              <div className="p-4 min-w-[120px] md:min-w-[160px]" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Średnio na dzień</div>
                <div className="font-mono font-bold text-[18px] md:text-[22px] tabular-nums mt-1" style={{ color: "var(--c-accent)" }}>
                  {fmtPln(dailyAverageAllYears)}
                </div>
                <div className="text-[11px] mt-1 font-medium" style={{ color: "var(--c-text-4)" }}>
                  Z kilometrówek (łącznie)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic breakdown per year */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-4 pb-16">
          {/* Tabs header */}
          <div className="flex items-center justify-between gap-4 flex-wrap" style={{ borderBottom: "1px solid var(--c-border)" }}>
            <div className="flex items-center gap-1">
              {availableYears.map((yr) => {
                const active = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className="relative px-5 py-3 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                    style={{
                      color: active ? "var(--c-text-1)" : "var(--c-text-4)",
                      background: "transparent",
                      borderBottom: active ? "2px solid var(--c-accent)" : "2px solid transparent",
                      marginBottom: -1,
                    }}
                  >
                    Rok {yr}
                  </button>
                );
              })}
            </div>

            {currentYearRecord?.pdf_url && (
              <a
                href={currentYearRecord.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-wider px-3 py-1.5 mb-2 md:mb-0 transition-colors inline-flex items-center gap-1.5"
                style={{ border: "1px solid var(--c-border)", color: "var(--c-text-4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-4)")}
              >
                Pobierz sprawozdanie PDF ({selectedYear})
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            )}
          </div>

          {/* Details list / table */}
          {currentYearRecord ? (
            <div className="mt-8">
              {/* Year Summary KPI in table area */}
              <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div>
                  <div className="text-[12px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Łącznie w {selectedYear}</div>
                  <div className="font-mono text-xl md:text-2xl font-bold tabular-nums mt-0.5" style={{ color: "var(--c-text-1)" }}>
                    {fmtPln(currentYearRecord.total_pln)}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Samochód (punkt 9)</div>
                  <div className="font-mono text-xl md:text-2xl font-medium tabular-nums mt-0.5" style={{ color: "var(--c-text-1)" }}>
                    {fmtPln(currentYearRecord.km_car_pln)}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Taksówki (punkt 10)</div>
                  <div className="font-mono text-xl md:text-2xl font-medium tabular-nums mt-0.5" style={{ color: "var(--c-text-1)" }}>
                    {fmtPln(currentYearRecord.km_taxi_pln)}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-wider font-bold" style={{ color: "var(--c-text-3)" }}>Średnio na dzień ({selectedYear})</div>
                  <div className="font-mono text-xl md:text-2xl font-bold tabular-nums mt-0.5" style={{ color: "var(--c-accent)" }}>
                    {fmtPln(dailyAverageSelectedYear)}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--c-text-5)", borderBottom: "1px solid var(--c-border)" }}>
                      <th className="text-left font-medium pb-2 w-[50px]">Punkt</th>
                      <th className="text-left font-medium pb-2">Kategoria wydatków</th>
                      <th className="text-right font-medium pb-2 pr-4 w-[140px]">Kwota</th>
                      <th className="text-left font-medium pb-2 pl-4 w-[160px] md:w-[240px]">Udział w budżecie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentYearRecord.items
                      .sort((a, b) => a.number - b.number)
                      .map((item) => {
                        const pct = currentYearRecord.total_pln > 0 
                          ? (item.amount_pln / currentYearRecord.total_pln) * 100 
                          : 0;

                        // Highlight travel expenditures (categories 9 & 10)
                        const isTravel = item.number === 9 || item.number === 10;

                        return (
                          <tr
                            key={item.number}
                            className="transition-colors"
                            style={{
                              borderBottom: "1px solid var(--c-border)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "var(--c-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <td className="py-3.5 font-mono text-[13px] tabular-nums" style={{ color: "var(--c-text-4)" }}>
                              {item.number}
                            </td>
                            <td className="py-3.5 pr-4 text-[13px] md:text-[14px] leading-relaxed" style={{ color: "var(--c-text-1)" }}>
                              <span className={isTravel ? "font-bold" : ""}>{item.label}</span>
                              {item.subcategories && item.subcategories.length > 0 && (
                                <ul className="mt-2.5 pl-3.5 border-l-2 border-[var(--c-border)] space-y-1.5">
                                  {item.subcategories.map((sub, idx) => (
                                    <li key={idx} className="flex items-baseline justify-between gap-4 text-[12px]" style={{ color: "var(--c-text-3)" }}>
                                      <span className="font-normal">{sub.label}</span>
                                      <span className="font-mono font-medium tabular-nums text-right shrink-0" style={{ color: "var(--c-text-2)" }}>
                                        {fmtPln(sub.amount_pln)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </td>
                            <td className="py-3.5 text-right font-mono font-medium text-[14px] md:text-[15px] tabular-nums pr-4" style={{ color: isTravel ? "var(--c-accent)" : "var(--c-text-1)" }}>
                              {fmtPln(item.amount_pln)}
                            </td>
                            <td className="py-3.5 pl-4 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 rounded-sm overflow-hidden min-w-[60px]" style={{ background: "var(--c-surface2)", border: "1px solid var(--c-border)" }}>
                                  <div
                                    className="h-full rounded-sm"
                                    style={{
                                      width: `${pct}%`,
                                      background: isTravel ? "var(--c-accent)" : clubColor,
                                      transition: "width 0.5s ease-out",
                                    }}
                                  />
                                </div>
                                <span className="font-mono text-[10px] tabular-nums text-right w-8" style={{ color: "var(--c-text-4)" }}>
                                  {pct.toFixed(0)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-[14px]" style={{ color: "var(--c-text-5)" }}>
              Brak szczegółowych danych o wydatkach dla tego roku.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
