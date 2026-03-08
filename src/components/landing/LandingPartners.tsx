import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const badges = [
  { name: "Make.com Certified Partner", issuer: "Make", year: "2024" },
  { name: "OpenAI API Developer", issuer: "OpenAI", year: "2024" },
  { name: "Anthropic Claude Integration Partner", issuer: "Anthropic", year: "2025" },
  { name: "Meta Business Partner", issuer: "Meta", year: "2024" },
];

export function LandingPartners() {
  return (
    <section className="py-32 relative bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">
            Certifications
          </motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-14 leading-[1.15]">
            Verified Expertise
          </motion.h2>

          <motion.div variants={child} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div
                key={b.name}
                className="rounded-lg border border-border/60 bg-card/40 p-5 text-center glow-card"
              >
                <Shield className="h-6 w-6 text-primary/60 mx-auto mb-3" />
                <h3 className="text-xs font-display font-semibold mb-1 leading-snug">{b.name}</h3>
                <p className="text-[10px] text-muted-foreground/40 font-mono">
                  {b.issuer} · {b.year}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.p variants={child} className="text-xs text-muted-foreground/30 font-mono mt-8">
            Official partner listings available on request
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
