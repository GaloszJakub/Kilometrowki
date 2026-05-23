import type { Stats } from "@/types";
import { fmtPln, fmtNum } from "@/lib/constants";

interface Props {
  stats: Stats;
  year: string;
}

function Stat({ label, value, sub, className }: { label: string; value: string; sub?: string; className?: string }) {
  return (
    <div
      className={`px-5 py-4 border-r border-[var(--c-border)] last:border-r-0 ${className ?? ""}`}
    >
      <div
        className="text-[10px] uppercase tracking-[0.18em]"
        style={{ color: "var(--c-text-4)" }}
      >
        {label}
      </div>
      <div
        className="font-display font-bold leading-[1.02] mt-1 whitespace-nowrap tabular-nums"
        style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "var(--c-text-1)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[11px] mt-1 font-medium" style={{ color: "var(--c-text-5)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function StatsBar({ stats, year }: Props) {
  const getDaysInYear = (y: number) => {
    return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 366 : 365;
  };
  const totalDays = year === "all" ? (366 + 365) : getDaysInYear(parseInt(year));
  const dailyTotalCombined = totalDays > 0 ? stats.total_sum_pln / totalDays : 0;

  return (
    <div style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-5">
        <Stat
          label="Posłów w bazie"
          value={fmtNum(stats.total_members_with_data)}
          sub="Sejm X kadencji"
        />
        <Stat
          label="Suma wypłat"
          value={fmtPln(stats.total_sum_pln)}
          sub={`Śr. ${fmtPln(stats.avg_mileage_pln)}/poseł`}
        />
        <Stat
          label="Mediana"
          value={fmtPln(stats.median_mileage_pln)}
          sub="Na posła łącznie"
        />
        <Stat
          label="Maksymalny ryczałt"
          value={fmtPln(stats.max_mileage_pln)}
          sub="Najwyższy roczny wydatek"
        />
        <Stat
          label="Średnio na dzień"
          value={fmtPln(dailyTotalCombined)}
          sub="Suma wszystkich posłów"
          className="col-span-2 md:col-span-1"
        />
      </div>
    </div>
  );
}
