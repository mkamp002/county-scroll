import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const credibility = ["AI Agents", "Data Pipelines", "Workflow Engines", "Internal Ops Automation"];

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-36 pb-24">
        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible">
          <motion.h1
            custom={0}
            variants={fade}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight mb-7"
          >
            Built Systems
            <br />
            <span className="text-muted-foreground">Don't Break.</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={fade}
            className="text-[17px] text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            VONKAM designs AI agents, automation engines, and data infrastructure that remove manual friction and unlock scalable operations.
          </motion.p>

          <motion.div custom={2} variants={fade} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-sm font-medium px-8 h-12 glow-button">
              Book Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
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

          <motion.div custom={3} variants={fade} className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {credibility.map((item) => (
              <span key={item} className="text-xs text-muted-foreground/70 tracking-wide uppercase">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
