import { LandingHero } from "@/components/landing/LandingHero";
import { LandingSocialProof } from "@/components/landing/LandingSocialProof";
import { LandingStatement } from "@/components/landing/LandingStatement";
import { LandingSystems } from "@/components/landing/LandingSystems";
import { LandingUseCases } from "@/components/landing/LandingUseCases";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingDifferentiation } from "@/components/landing/LandingDifferentiation";
import { LandingLeadMagnet } from "@/components/landing/LandingLeadMagnet";
import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <LandingHero />
      <LandingSocialProof />
      <LandingStatement />
      <LandingSystems />
      <LandingUseCases />
      <LandingProcess />
      <LandingDifferentiation />
      <LandingLeadMagnet />
      <LandingAbout />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
