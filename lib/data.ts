import { readFileSync } from "fs";
import path from "path";
import type { MemberSummary, ClubStat, Stats } from "@/types";

interface RawItem {
  number: number;
  label: string;
  amount_pln: number;
}

interface RawRecord {
  report_id: number;
  member: { id: number; first_name: string; last_name: string; club: string };
  report_year: number;
  total_pln: number;
  pdf_url: string;
  items: RawItem[];
}

interface RawData {
  count_reports: number;
  records: RawRecord[];
}

function median(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  return n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
}

export function getData(): { members: MemberSummary[]; statsByYear: Record<string, Stats> } {
  const raw: RawData = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "sprawozdania.json"), "utf-8")
  );

  const byMember = new Map<number, RawRecord[]>();
  for (const rec of raw.records) {
    const arr = byMember.get(rec.member.id) ?? [];
    arr.push(rec);
    byMember.set(rec.member.id, arr);
  }

  const members: MemberSummary[] = [];

  for (const [, recs] of byMember) {
    const info = recs[0].member;
    const years = recs
      .map((rec) => {
        const itemMap = new Map(rec.items.map((i) => [i.number, i]));
        const item9 = itemMap.get(9);
        const item10 = itemMap.get(10);
        const km_car_pln = item9 && item9.label.toLowerCase().includes("przejazd") ? item9.amount_pln : 0;
        const km_taxi_pln = item10 && item10.label.toLowerCase().includes("przejazd") ? item10.amount_pln : 0;
        return {
          year: rec.report_year,
          km_car_pln,
          km_taxi_pln,
          km_total_pln: km_car_pln + km_taxi_pln,
          total_pln: rec.total_pln,
          pdf_url: rec.pdf_url,
        };
      })
      .sort((a, b) => a.year - b.year);

    const km_car_all_years = years.reduce((s, y) => s + y.km_car_pln, 0);
    const km_taxi_all_years = years.reduce((s, y) => s + y.km_taxi_pln, 0);

    members.push({
      member_id: info.id,
      name: `${info.first_name} ${info.last_name}`,
      club: info.club,
      years,
      km_total_all_years: km_car_all_years + km_taxi_all_years,
      km_car_all_years,
      km_taxi_all_years,
    });
  }

  members.sort((a, b) => b.km_total_all_years - a.km_total_all_years);

  function computeStats(entries: { club: string; value: number }[], totalRecords: number): Stats {
    const sorted = entries.map((e) => e.value).sort((a, b) => a - b);
    const sum = sorted.reduce((s, v) => s + v, 0);
    const byClubMap = new Map<string, number[]>();
    for (const e of entries) {
      const arr = byClubMap.get(e.club) ?? [];
      arr.push(e.value);
      byClubMap.set(e.club, arr);
    }
    const by_club: ClubStat[] = Array.from(byClubMap.entries()).map(([club_id, vals]) => ({
      club_id,
      count: vals.length,
      total: vals.reduce((s, v) => s + v, 0),
      avg: vals.reduce((s, v) => s + v, 0) / vals.length,
    }));
    return {
      total_records: totalRecords,
      total_members_with_data: entries.length,
      avg_mileage_pln: entries.length ? sum / entries.length : 0,
      median_mileage_pln: median(sorted),
      max_mileage_pln: sorted[sorted.length - 1] ?? 0,
      min_mileage_pln: sorted[0] ?? 0,
      total_sum_pln: sum,
      by_club,
    };
  }

  const allYears = Array.from(new Set(raw.records.map((r) => r.report_year))).sort();

  const statsByYear: Record<string, Stats> = {
    all: computeStats(
      members.map((m) => ({ club: m.club, value: m.km_total_all_years })),
      raw.count_reports
    ),
  };

  for (const yr of allYears) {
    const entries = members.flatMap((m) => {
      const y = m.years.find((y) => y.year === yr);
      return y ? [{ club: m.club, value: y.km_total_pln }] : [];
    });
    statsByYear[String(yr)] = computeStats(entries, raw.records.filter((r) => r.report_year === yr).length);
  }

  return { members, statsByYear };
}
