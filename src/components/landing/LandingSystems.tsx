import { Bot, Crosshair, LayoutDashboard, Database } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const systems = [
  {
    icon: Bot,
    title: "AI Agents",
    description: "Autonomous workflows that research, qualify, monitor, and act — without human input.",
    link: "#cases",
  },
  {
    icon: Crosshair,
    title: "Lead Acquisition Engines",
    description: "Multi-channel outbound systems with automated sequencing, scoring, and CRM routing.",
    link: "#cases",
  },
  {
    icon: LayoutDashboard,
    title: "Operations Dashboards",
    description: "Real-time command centers aggregating live data with role-based access and alerting.",
    link: "#cases",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    description: "Structured pipelines, scoring models, and monitoring layers for real-time visibility.",
    link: "#cases",
  },
];

export function LandingSystems() {
  return (
    <section id="systems" className="py-48 bg-section relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-24"
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">Systems</motion.p>
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-display font-bold tracking-tight">What We Build</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {systems.map((item) => (
            <motion.a
              key={item.title}
              href={item.link}
              variants={child}
              className="group system-card cursor-pointer text-left flex flex-col"
            >
              <item.icon className="h-5 w-5 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.description}</p>
              <span className="text-xs font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
                Learn more →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
