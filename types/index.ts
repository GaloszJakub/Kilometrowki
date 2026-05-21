export interface ExpenseItem {
  number: number;
  label: string;
  amount_pln: number;
}

export interface YearRecord {
  year: number;
  km_car_pln: number;
  km_taxi_pln: number;
  km_total_pln: number;
  total_pln: number;
  pdf_url: string;
  items: ExpenseItem[];
}

export interface MemberSummary {
  member_id: number;
  name: string;
  club: string;
  years: YearRecord[];
  km_total_all_years: number;
  km_car_all_years: number;
  km_taxi_all_years: number;
}

export interface ClubStat {
  club_id: string;
  avg: number;
  total: number;
  count: number;
}

export interface Stats {
  total_records: number;
  total_members_with_data: number;
  avg_mileage_pln: number;
  median_mileage_pln: number;
  max_mileage_pln: number;
  min_mileage_pln: number;
  total_sum_pln: number;
  by_club: ClubStat[];
}
