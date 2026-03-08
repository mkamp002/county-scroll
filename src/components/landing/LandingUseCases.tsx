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
    type: "Real Estate",
    title: "Real Estate Intelligence Systems",
    problem: "Operators manually tracking thousands of docket entries, missing high-intent leads buried in county records.",
    solution: "Event-driven pipeline ingesting county filings, scoring leads via ML models, and routing qualified prospects to acquisition teams in real-time.",
    outcome: "3x increase in qualified lead capture",
  },
  {
    type: "Outbound",
    title: "Automated Lead Acquisition Engines",
    problem: "Sales teams burning hours on manual outreach with no structured follow-up cadence or lead qualification layer.",
    solution: "Multi-channel outbound system with automated sequencing, intent-based scoring, and CRM-integrated routing logic.",
    outcome: "200% improvement in outbound conversion",
  },
  {
    type: "Operations",
    title: "Operations Command Dashboards",
    problem: "Critical operational data scattered across spreadsheets, siloed tools, and disconnected reporting systems.",
    solution: "Centralized command layer aggregating live data feeds into unified dashboards with role-based access and alerting.",
    outcome: "Decision latency cut by 80%",
  },
  {
    type: "Monitoring",
    title: "Docket & Data Monitoring Systems",
    problem: "Competitive and legal intelligence gathered manually, causing delayed reactions to market-moving events.",
    solution: "Structured scraping infrastructure with event-driven alerts, automated data enrichment, and anomaly detection.",
    outcome: "Zero missed critical events across 10k+ entities",
  },
  {
    type: "Internal AI",
    title: "AI Internal Assistants",
    problem: "Teams repeatedly answering the same questions, searching for internal knowledge, and context-switching between tools.",
    solution: "Purpose-built AI agents trained on proprietary data, embedded directly into existing workflows and decision processes.",
    outcome: "40% reduction in internal support requests",
  },
];

export function LandingUseCases() {
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
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-display font-bold tracking-tight">Applications</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="space-y-3"
        >
          {cases.map((uc, i) => (
            <motion.div
              key={i}
              variants={child}
              className="border border-border rounded-lg bg-card/80 border-primary/15"
            >
              <div className="px-6 py-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase w-[100px] shrink-0 hidden sm:block font-mono">
                    {uc.type}
                  </span>
                  <span className="text-base font-semibold tracking-tight">
                    {uc.title}
                  </span>
                </div>

                <div className="border-t border-border/50 pt-5 grid sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground/60 tracking-[0.2em] uppercase mb-2">Problem</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground/60 tracking-[0.2em] uppercase mb-2">What We Built</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.solution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground/60 tracking-[0.2em] uppercase mb-2">Outcome</p>
                    <p className="text-sm font-semibold text-primary leading-relaxed">{uc.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
