import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingStatement() {
  return (
    <section className="py-44 sm:py-52 relative">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2
            variants={child}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-10"
          >
            Most businesses operate manually.
            <br />
            <span className="text-primary">We engineer leverage.</span>
          </motion.h2>
          <motion.p variants={child} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build backend systems that eliminate repetitive work, centralize intelligence, and give operators full control over their workflows.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
