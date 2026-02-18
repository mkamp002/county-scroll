import { Bot, Workflow, Database } from "lucide-react";
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
    description: "Custom-built AI assistants that automate research, qualification, monitoring, and internal decision flows.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Integrated API systems connecting CRMs, databases, communications, and operational tools.",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    description: "Structured event pipelines, dashboards, and intelligence layers built for real-time visibility.",
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
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-bold tracking-tight">System Blocks</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {systems.map((item) => (
            <motion.div
              key={item.title}
              variants={child}
              className="group p-10 rounded-lg border border-border bg-card glow-card cursor-default text-center"
            >
              <item.icon className="h-5 w-5 text-primary mb-8 mx-auto" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
