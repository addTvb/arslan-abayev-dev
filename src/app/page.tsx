import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <div className="site-shell flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <Work />
        <Approach />
        <Stack />
        <Contact />
      </main>
    </div>
  );
}
