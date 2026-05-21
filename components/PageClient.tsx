"use client";

import { useState } from "react";
import type { MemberSummary, Stats } from "@/types";
import { StatsBar } from "./StatsBar";
import { ClubChart } from "./ClubChart";
import { RankingTable } from "./RankingTable";

interface Props {
  members: MemberSummary[];
  statsByYear: Record<string, Stats>;
}

const YEAR_LABELS: Record<string, string> = {
  all: "Ogółem",
};

export function PageClient({ members, statsByYear }: Props) {
  const years = Object.keys(statsByYear).filter((k) => k !== "all").sort();
  const [year, setYear] = useState("all");

  const stats = statsByYear[year] ?? statsByYear.all;

  return (
    <>
      {/* Year tabs */}
      <div style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 flex items-center gap-1 pt-4 pb-0">
          {["all", ...years].map((y) => {
            const label = YEAR_LABELS[y] ?? y;
            const active = year === y;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className="relative px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                style={{
                  color: active ? "var(--c-text-1)" : "var(--c-text-4)",
                  background: "transparent",
                  borderBottom: active ? "2px solid var(--c-accent)" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <StatsBar stats={stats} />

      <main className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-4">
        <ClubChart data={stats.by_club} />
      </main>

      <RankingTable members={members} year={year} />
    </>
  );
}
