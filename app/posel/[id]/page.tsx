import { getData } from "@/lib/data";
import { notFound } from "next/navigation";
import { MemberDetailsClient } from "./MemberDetailsClient";

interface Props {
  params: Promise<{ id: string }>;
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
