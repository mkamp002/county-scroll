import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const terminalLines = [
  "$ vonkam init --system automation",
  "→ scanning workflows...",
  "→ deploying agents...",
  "✓ system online.",
];

const marqueeItems = [
  "AI AGENTS",
  "DATA INFRASTRUCTURE",
  "WORKFLOW AUTOMATION",
  "SYSTEM ARCHITECTURE",
  "LEAD ENGINES",
  "REAL-TIME DASHBOARDS",
];

function TerminalTyping() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIndex >= terminalLines.length) { setDone(true); return; }
    const line = terminalLines[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIndex((l) => l + 1); setCharIndex(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, done]);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 text-left font-mono text-xs text-muted-foreground leading-relaxed">
      {terminalLines.map((line, li) => {
        if (li > lineIndex) return null;
        const text = li === lineIndex ? line.slice(0, charIndex) : line;
        const isActive = li === lineIndex && !done;
        return (
          <div key={li} className={li === terminalLines.length - 1 && li <= lineIndex ? "text-primary" : ""}>
            {text}
            {isActive && <span className="terminal-cursor" />}
          </div>
        );
      })}
    </div>
  );
}

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="w-full overflow-hidden border-t border-b border-border/40 py-4 mt-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-[11px] font-medium text-muted-foreground/40 tracking-[0.2em] uppercase font-mono">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.04] blur-[200px] pointer-events-none" />
      <Particles count={24} />

      <div className="max-w-[1000px] mx-auto px-6 pt-36 pb-12 relative z-10 flex-1 flex items-center">
        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible">
          <motion.p
            custom={0}
            variants={fade}
            className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-8"
          >
            Automation Infrastructure Lab
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            className="text-5xl sm:text-6xl lg:text-[80px] font-display font-bold leading-[1.0] tracking-tight mb-8"
          >
            Built Systems
            <br />
            <span className="text-muted-foreground">Don't Break.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            VONKAM engineers AI agents, automation pipelines, and data infrastructure for operators who are done doing things manually.
          </motion.p>

          <motion.div custom={3} variants={fade} className="mb-14">
            <TerminalTyping />
          </motion.div>

          <motion.div custom={4} variants={fade} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-sm font-medium px-8 h-12 glow-button" asChild>
              <a href="https://calendly.com/michelkampreisser1/30min" target="_blank" rel="noopener noreferrer">
                Book Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-sm font-medium px-8 h-12 border-border/60 text-foreground hover:bg-secondary"
              asChild
            >
              <a href="#systems">Explore Infrastructure</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full relative z-10">
        <Marquee />
      </div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
}
