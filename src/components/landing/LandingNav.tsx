import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LandingNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-2xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <span className="text-base font-semibold tracking-[0.15em] text-foreground uppercase">
          VONKAM
        </span>
        <div className="hidden md:flex items-center gap-10">
          <a href="#systems" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Systems
          </a>
          <a href="#cases" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Use Cases
          </a>
          <a href="#process" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Process
          </a>
          <a href="#about" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </div>
        <Button asChild size="sm" variant="outline" className="border-border/60 text-foreground hover:bg-secondary text-[13px]">
          <Link to="/app">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
