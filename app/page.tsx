import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TechStack } from "@/components/sections/TechStack";
import { Why } from "@/components/sections/Why";
import { CareersBanner } from "@/components/sections/CareersBanner";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesBento />
      <Process />
      <SelectedWork />
      <TechStack />
      <Why />
      <CareersBanner />
      <FinalCTA />
    </>
  );
}
