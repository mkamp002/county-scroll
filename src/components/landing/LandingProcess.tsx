import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const steps = [
  { num: "01", label: "Diagnose", desc: "Audit workflows & identify friction points." },
  { num: "02", label: "Architect", desc: "Design system structure & data flow." },
  { num: "03", label: "Build", desc: "Deploy automation, agents, and infrastructure." },
  { num: "04", label: "Integrate", desc: "Connect tools, APIs, and dashboards." },
  { num: "05", label: "Optimize", desc: "Continuously refine performance and leverage." },
];

export function LandingProcess() {
  return (
    <section id="process" className="py-48 bg-section relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-24"
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">Process</motion.p>
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-display font-bold tracking-tight">Methodology</motion.h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="hidden md:block mb-20"
        >
          {/* Timeline line */}
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-px bg-border" />
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step) => (
                <motion.div key={step.num} variants={child} className="relative pt-10 text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-primary/30 bg-background flex items-center justify-center">
                    <span className="text-[10px] font-mono text-primary font-medium">{step.num}</span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight mb-2">{step.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[140px] mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="md:hidden mb-20"
        >
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            {steps.map((step) => (
              <motion.div key={step.num} variants={child} className="relative mb-10 last:mb-0">
                <div className="absolute -left-6 top-0 w-8 h-8 rounded-full border border-primary/30 bg-background flex items-center justify-center">
                  <span className="text-[10px] font-mono text-primary font-medium">{step.num}</span>
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={child} className="text-sm text-muted-foreground mb-6">
            Start with a free diagnostic
          </motion.p>
          <motion.div variants={child}>
            <Button size="lg" className="text-sm font-medium px-8 h-12 glow-button" asChild>
              <a href="https://calendly.com/michelkampreisser1/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
