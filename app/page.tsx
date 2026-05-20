import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Marketplace } from "@/components/sections/Marketplace";
import { Credits } from "@/components/sections/Credits";
import { Playground } from "@/components/sections/Playground";
import { Bento } from "@/components/sections/Bento";
import { Reviews } from "@/components/sections/Reviews";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Marketplace />
      <Credits />
      <Playground />
      <Bento />
      <Reviews />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
