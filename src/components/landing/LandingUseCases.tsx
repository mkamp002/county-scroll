import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const cases = [
  {
    title: "Real Estate Intelligence Systems",
    description: "Automated lead scoring, docket monitoring, and property data enrichment pipelines for real estate operators.",
  },
  {
    title: "Automated Lead Acquisition Engines",
    description: "Multi-channel outbound systems that qualify, route, and nurture leads without manual intervention.",
  },
  {
    title: "Operations Command Dashboards",
    description: "Centralized real-time dashboards connecting all operational data into a single command layer.",
  },
  {
    title: "Docket & Data Monitoring Systems",
    description: "Event-driven alerts, structured scraping, and automated monitoring for competitive and legal intelligence.",
  },
  {
    title: "AI Internal Assistants",
    description: "Purpose-built AI tools trained on your data, integrated into your existing workflows and decision processes.",
  },
];

export function LandingUseCases() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="cases" className="py-36">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.p variants={child} className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">Applications</motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-semibold tracking-tight">Use Cases</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-2xl mx-auto space-y-0"
        >
          {cases.map((uc, i) => (
            <motion.div
              key={i}
              variants={child}
              className="border-b border-border"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-base font-medium tracking-tight group-hover:text-primary transition-colors duration-300">
                  {uc.title}
                </span>
                <ChevronRight
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                    expanded === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expanded === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-sm text-muted-foreground pb-6 leading-relaxed"
                >
                  {uc.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
