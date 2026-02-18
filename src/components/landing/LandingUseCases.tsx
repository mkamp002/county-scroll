import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const cases = [
  {
    type: "Real Estate Intelligence",
    title: "Real Estate Intelligence Systems",
    problem: "Operators manually tracking thousands of docket entries, missing high-intent leads buried in county records.",
    solution: "Event-driven pipeline ingesting county filings, scoring leads via ML models, and routing qualified prospects to acquisition teams in real-time.",
    outcome: "3x increase in qualified lead capture. Average response time reduced from 72 hours to under 4.",
  },
  {
    type: "Outbound Automation",
    title: "Automated Lead Acquisition Engines",
    problem: "Sales teams burning hours on manual outreach with no structured follow-up cadence or lead qualification layer.",
    solution: "Multi-channel outbound system with automated sequencing, intent-based scoring, and CRM-integrated routing logic.",
    outcome: "200% improvement in outbound conversion. Zero manual list management required.",
  },
  {
    type: "Operations Dashboard",
    title: "Operations Command Dashboards",
    problem: "Critical operational data scattered across spreadsheets, siloed tools, and disconnected reporting systems.",
    solution: "Centralized command layer aggregating live data feeds into unified dashboards with role-based access and alerting.",
    outcome: "Single source of truth across all operations. Decision latency cut by 80%.",
  },
  {
    type: "Data Monitoring",
    title: "Docket & Data Monitoring Systems",
    problem: "Competitive and legal intelligence gathered manually, causing delayed reactions to market-moving events.",
    solution: "Structured scraping infrastructure with event-driven alerts, automated data enrichment, and anomaly detection.",
    outcome: "Real-time awareness of 10k+ monitored entities. Zero missed critical events.",
  },
  {
    type: "Internal AI Tools",
    title: "AI Internal Assistants",
    problem: "Teams repeatedly answering the same questions, searching for internal knowledge, and context-switching between tools.",
    solution: "Purpose-built AI agents trained on proprietary data, embedded directly into existing workflows and decision processes.",
    outcome: "40% reduction in internal support requests. Instant access to institutional knowledge.",
  },
];

export function LandingUseCases() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="cases" className="py-48 relative grid-bg-subtle">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-24"
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">Use Cases</motion.p>
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-bold tracking-tight">Applications</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="space-y-3"
        >
          {cases.map((uc, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                variants={child}
                className={`border border-border rounded-lg transition-colors duration-300 ${isOpen ? "bg-card/80 border-primary/15" : "bg-card/30 hover:border-primary/10"}`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase w-[140px] shrink-0 hidden sm:block">
                      {uc.type}
                    </span>
                    <span className="text-base font-medium tracking-tight group-hover:text-primary transition-colors duration-300">
                      {uc.title}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1">
                        <div className="border-t border-border/50 pt-5 grid sm:grid-cols-3 gap-6">
                          {[
                            { label: "Problem", text: uc.problem },
                            { label: "What We Built", text: uc.solution },
                            { label: "Outcome", text: uc.outcome },
                          ].map((block, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 * j, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                              <p className="text-[10px] font-medium text-primary/60 tracking-[0.2em] uppercase mb-2">{block.label}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
