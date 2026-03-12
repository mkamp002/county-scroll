import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import vonkamLogo from "@/assets/vonkam-logo.png";

export function LandingNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-2xl">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <img src={vonkamLogo} alt="VONKAM" className="h-7 w-auto" />
          <span className="text-base font-semibold tracking-[0.15em] text-foreground uppercase">
            VONKAM
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#systems" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">
            Systems
          </a>
          <a href="#cases" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">
            Use Cases
          </a>
          <a href="#process" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">
            Process
          </a>
          <a href="#about" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">
            About
          </a>
        </div>
        <Button asChild size="sm" className="text-[13px] glow-button">
          <a href="https://calendly.com/michelkampreisser1/30min" target="_blank" rel="noopener noreferrer">
            Book a Call
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </nav>
  );
}
