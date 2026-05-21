"use client";

import { useState } from "react";
import type { ClubStat } from "@/types";
import { CLUB_COLORS, CLUB_LOGOS, fmtPln } from "@/lib/constants";

interface Props {
  data: ClubStat[];
}

type Mode = "avg" | "total";

const BAR_AREA_H = 260;

export function ClubChart({ data }: Props) {
  const [mode, setMode] = useState<Mode>("avg");
  const [hovered, setHovered] = useState<string | null>(null);

  const sorted = [...data].sort((a, b) => b[mode] - a[mode]);
  const max = sorted[0]?.[mode] ?? 1;
  const min = sorted[sorted.length - 1]?.[mode] ?? 0;
  const floor = Math.max(0, (min - 0.2 * max) / 0.8);

  return (
    <div
      className="p-5 md:p-6"
      style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.18em] mb-1"
            style={{ color: "var(--c-text-4)" }}
          >
            Ryczałt km wg klubu
          </div>
          <div className="text-[18px] font-display font-bold" style={{ color: "var(--c-text-1)" }}>
            {mode === "avg" ? "Średnia na posła" : "Suma całkowita"}
          </div>
        </div>
        <div className="flex items-center shrink-0" style={{ border: "1px solid var(--c-border)" }}>
          {(["avg", "total"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors"
              style={{
                background: mode === m ? "var(--c-hover)" : "transparent",
                color: mode === m ? "var(--c-text-1)" : "var(--c-text-5)",
                borderRight: m === "avg" ? "1px solid var(--c-border)" : undefined,
              }}
            >
              {m === "avg" ? "Średnia" : "Suma"}
            </button>
          ))}
        </div>
      </div>

      {/* Bar area — fixed height, bars positioned from bottom */}
      <div className="flex items-end gap-2 md:gap-3" style={{ height: BAR_AREA_H }}>
        {sorted.map((entry) => {
          const pct = ((entry[mode] - floor) / (max - floor)) * 100;
          const barPx = Math.max(4, (pct / 100) * BAR_AREA_H);
          const color = CLUB_COLORS[entry.club_id] ?? "#4b5563";
          const isHovered = hovered === entry.club_id;
          const label =
            mode === "avg"
              ? `${Math.round(entry.avg / 1000)}k`
              : entry.total >= 1_000_000
              ? `${(entry.total / 1_000_000).toFixed(1)}M`
              : `${Math.round(entry.total / 1000)}k`;

          return (
            <div
              key={entry.club_id}
              className="relative flex-1 min-w-0 flex flex-col items-center justify-end"
              style={{ height: "100%", cursor: "default" }}
              onMouseEnter={() => setHovered(entry.club_id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Floating tooltip — absolutely positioned, doesn't affect bar height */}
              <div
                className="absolute bottom-full mb-2 left-1/2 pointer-events-none z-10 flex flex-col items-center"
                style={{
                  transform: `translateX(-50%) translateY(${isHovered ? 0 : 4}px)`,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.15s, transform 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  className="text-[11px] font-mono font-medium px-2 py-1 rounded"
                  style={{
                    background: "var(--c-surface2)",
                    border: "1px solid var(--c-border)",
                    color: "var(--c-text-1)",
                  }}
                >
                  {mode === "avg" ? fmtPln(entry.avg) : fmtPln(entry.total)}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "var(--c-text-4)" }}>
                  {entry.count} posłów
                </div>
              </div>

              {/* Value label above bar — absolutely positioned */}
              <div
                className="absolute font-mono tabular-nums text-[10px]"
                style={{
                  bottom: barPx + 6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "var(--c-text-5)",
                  opacity: isHovered ? 0 : 1,
                  transition: "opacity 0.1s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>

              {/* Bar */}
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: barPx,
                  background: color,
                  opacity: hovered && !isHovered ? 0.3 : 0.9,
                  transition: "height 0.5s cubic-bezier(.4,0,.2,1), opacity 0.15s",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis logos */}
      <div className="flex items-start gap-2 md:gap-3 mt-2">
        {sorted.map((entry) => {
          const logo = CLUB_LOGOS[entry.club_id];
          const color = CLUB_COLORS[entry.club_id] ?? "#4b5563";
          return (
            <div key={entry.club_id} className="flex-1 min-w-0 flex justify-center">
              {logo ? (
                <span
                  className="flex items-center justify-center rounded-sm bg-white w-full"
                  style={{ height: 40, padding: "5px 6px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt={entry.club_id} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </span>
              ) : (
                <span
                  className="text-[10px] font-bold uppercase tracking-wide text-center leading-tight w-full flex items-center justify-center"
                  style={{ color, height: 40 }}
                >
                  {entry.club_id}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
