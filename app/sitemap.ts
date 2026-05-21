import type { MetadataRoute } from "next";
import { getData } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kilometrowki.vercel.app";
  const { members } = getData();

  const memberEntries = members.map((m) => ({
    url: `${baseUrl}/posel/${m.member_id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...memberEntries,
  ];
}
