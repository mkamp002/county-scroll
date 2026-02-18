import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
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
    <section id="process" className="py-32 bg-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">Methodology</p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Process</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
            >
              <span className="text-2xl font-semibold text-primary/30 block mb-3">{step.num}</span>
              <span className="text-base font-medium tracking-tight block mb-2">{step.label}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{step.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
