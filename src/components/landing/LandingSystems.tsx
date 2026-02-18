import { Bot, Workflow, Database } from "lucide-react";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const systems = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Custom-built AI assistants that automate research, qualification, monitoring, and internal decision flows.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Integrated API systems connecting CRMs, databases, communications, and operational tools.",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    description:
      "Structured event pipelines, dashboards, and intelligence layers built for real-time visibility.",
  },
];

export function LandingSystems() {
  return (
    <section id="systems" className="py-32 bg-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">Architecture</p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">System Blocks</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {systems.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
              className="group p-8 rounded-lg border border-border bg-card glow-card"
            >
              <item.icon className="h-5 w-5 text-primary mb-8" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
