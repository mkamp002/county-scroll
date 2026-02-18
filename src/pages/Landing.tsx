import { LandingHero } from "@/components/landing/LandingHero";
import { LandingStats } from "@/components/landing/LandingStats";
import { LandingStatement } from "@/components/landing/LandingStatement";
import { LandingSystems } from "@/components/landing/LandingSystems";
import { LandingUseCases } from "@/components/landing/LandingUseCases";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingDifferentiation } from "@/components/landing/LandingDifferentiation";
import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingStatement />
      <LandingSystems />
      <LandingUseCases />
      <LandingProcess />
      <LandingDifferentiation />
      <LandingAbout />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
