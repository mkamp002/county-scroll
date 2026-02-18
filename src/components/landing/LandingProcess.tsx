import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
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
    <section id="process" className="py-36 bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.p variants={child} className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">Methodology</motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-semibold tracking-tight">Process</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-center"
        >
          {steps.map((step) => (
            <motion.div key={step.num} variants={child}>
              <span className="text-2xl font-semibold text-primary/30 block mb-3">{step.num}</span>
              <span className="text-base font-medium tracking-tight block mb-2">{step.label}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{step.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
