import { getData } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { PageClient } from "@/components/PageClient";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { members, statsByYear } = getData();

  return (
    <div className="min-h-screen">
      <Hero />
      <PageClient members={members} statsByYear={statsByYear} />
      <Footer />
    </div>
  );
}
