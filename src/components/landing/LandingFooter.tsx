import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import vonkamLogo from "@/assets/vonkam-logo.png";

export function LandingFooter() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-2.5">
            <img src={vonkamLogo} alt="VONKAM" className="h-7 w-auto" />
            <span className="text-base font-semibold tracking-[0.15em] uppercase">VONKAM</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#systems" className="hover:text-foreground transition-colors duration-300">Systems</a>
            <a href="#cases" className="hover:text-foreground transition-colors duration-300">Use Cases</a>
            <a href="#process" className="hover:text-foreground transition-colors duration-300">Process</a>
            <a href="#about" className="hover:text-foreground transition-colors duration-300">About</a>
          </div>
          <Button asChild size="sm" className="text-[13px] glow-button">
            <a href="https://calendly.com/michelkampreisser1/30min" target="_blank" rel="noopener noreferrer">
              Book a Call
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <a
            href="https://instagram.com/vonkamtech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            @vonkamtech
          </a>
          <p className="text-xs text-muted-foreground/50">&copy; 2025 VONKAM Technologies</p>
        </div>
      </div>
    </footer>
  );
}
