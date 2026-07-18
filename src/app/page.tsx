"use client"

import { useState, useEffect } from "react";
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
import { Preloader } from "@/components/layout/Preloader";

export default function Home() {
    const [ready, setReady] = useState(false);
     useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Header />
      <main id="main" className="flex-1 w-screen">
        <Hero start={ready} />
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
