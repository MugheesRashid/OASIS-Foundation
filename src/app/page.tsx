import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImpactBar } from "@/components/sections/ImpactBar";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Mission } from "@/components/sections/Mission";
import { Approach } from "@/components/sections/Approach";
import { Proof } from "@/components/sections/Proof";
import { Team } from "@/components/sections/Team";
import { Differentiators } from "@/components/sections/Differentiators";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { ReachMap } from "@/components/sections/ReachMap";
import { FAQ } from "@/components/sections/FAQ";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 w-screen">
        <Hero />
        <ImpactBar />
        <WhoWeAre />
        <Mission />
        <Approach />
        <Proof />
        <Team />
        <Differentiators />
        <GetInvolved />
        <ReachMap />
        <FAQ />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
