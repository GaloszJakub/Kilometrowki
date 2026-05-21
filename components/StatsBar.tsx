import type { Stats } from "@/types";
import { fmtPln, fmtNum } from "@/lib/constants";

interface Props {
  stats: Stats;
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      className="px-5 py-4 last:border-r-0"
      style={{ borderRight: "1px solid var(--c-border)" }}
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
        <div className="text-[11px] mt-1" style={{ color: "var(--c-text-5)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function StatsBar({ stats }: Props) {
  return (
    <div style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4">
        <Stat
          label="Posłów w bazie"
          value={fmtNum(stats.total_members_with_data)}
          sub="Sejm X kadencji"
        />
        <Stat
          label="Suma wypłat"
          value={fmtPln(stats.total_sum_pln)}
          sub={`Średnio ${fmtPln(stats.avg_mileage_pln)} / poseł`}
        />
        <Stat
          label="Mediana"
          value={fmtPln(stats.median_mileage_pln)}
        />
        <Stat
          label="Najwięcej"
          value={fmtPln(stats.max_mileage_pln)}
         
        />
      </div>
    </div>
  );
}
