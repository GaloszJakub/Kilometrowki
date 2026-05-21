import { getData } from "@/lib/data";
import { notFound } from "next/navigation";
import { MemberDetailsClient } from "./MemberDetailsClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { members } = getData();
  const member = members.find((m) => String(m.member_id) === id);

  if (!member) {
    return {
      title: "Poseł nie odnaleziony",
    };
  }

  const name = member.name;
  const club = member.club;
  const totalKmPln = member.km_total_all_years.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  });

  return {
    title: `${name} (${club}) - Wydatki na kilometrówki`,
    description: `Statystyki i szczegóły ryczałtu kilometrowego posła ${name} z klubu ${club} w X kadencji Sejmu RP. Łączna suma: ${totalKmPln}. Sprawdź szczegóły wydatków na przejazdy i taksówki.`,
    openGraph: {
      title: `${name} (${club}) - Kilometrówki i wydatki posła`,
      description: `Wydatki i statystyki ryczałtu kilometrowego posła ${name} (${club}) w X kadencji Sejmu. Łączna suma: ${totalKmPln}.`,
      type: "profile",
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" "),
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} (${club}) - Wydatki na kilometrówki`,
      description: `Statystyki ryczałtu kilometrowego posła ${name} z klubu ${club}. Łącznie: ${totalKmPln}.`,
    },
  };
}

export function generateStaticParams() {
  const { members } = getData();
  return members.map((m) => ({
    id: String(m.member_id),
  }));
}

export default async function MemberPage({ params }: Props) {
  const { id } = await params;
  const { members } = getData();
  const member = members.find((m) => String(m.member_id) === id);

  if (!member) {
    notFound();
  }

  return <MemberDetailsClient member={member} />;
}

