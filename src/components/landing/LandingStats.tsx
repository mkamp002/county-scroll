import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stats = [
  { value: "10+", label: "Automation Systems Deployed" },
  { value: "200k+", label: "Records Processed" },
  { value: "99%", label: "Workflow Reliability" },
  { value: "∞", label: "Multi-Tool API Integrations" },
];

export function LandingStats() {
  return (
    <section className="py-24 relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={child} className="space-y-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground block">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground/60 tracking-wide uppercase leading-tight block">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
