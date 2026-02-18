import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
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
    <section id="cases" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">Applications</p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Use Cases</h2>
        </motion.div>

        <div className="max-w-2xl space-y-0">
          {cases.map((uc, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
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
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    expanded === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expanded === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-sm text-muted-foreground pb-6 leading-relaxed"
                >
                  {uc.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
