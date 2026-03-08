import { LandingHero } from "@/components/landing/LandingHero";
import { LandingSocialProof } from "@/components/landing/LandingSocialProof";
import { LandingStatement } from "@/components/landing/LandingStatement";
import { LandingSystems } from "@/components/landing/LandingSystems";
import { LandingMetrics } from "@/components/landing/LandingMetrics";
import { LandingTechStack } from "@/components/landing/LandingTechStack";
import { LandingArchitecture } from "@/components/landing/LandingArchitecture";
import { LandingUseCases } from "@/components/landing/LandingUseCases";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingSLA } from "@/components/landing/LandingSLA";
import { LandingGitHub } from "@/components/landing/LandingGitHub";
import { LandingBlog } from "@/components/landing/LandingBlog";
import { LandingDifferentiation } from "@/components/landing/LandingDifferentiation";
import { LandingCaseStudy } from "@/components/landing/LandingCaseStudy";
import { LandingLeadMagnet } from "@/components/landing/LandingLeadMagnet";
import { LandingPartners } from "@/components/landing/LandingPartners";
import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { VonkamChat } from "@/components/VonkamChat";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <LandingHero />
      <LandingSocialProof />
      <LandingMetrics />
      <LandingStatement />
      <LandingSystems />
      <LandingTechStack />
      <LandingArchitecture />
      <LandingUseCases />
      <LandingProcess />
      <LandingSLA />
      <LandingDifferentiation />
      <LandingGitHub />
      <LandingBlog />
      <LandingCaseStudy />
      <LandingLeadMagnet />
      <LandingPartners />
      <LandingAbout />
      <LandingCTA />
      <LandingFooter />
      <VonkamChat />
    </div>
  );
}
