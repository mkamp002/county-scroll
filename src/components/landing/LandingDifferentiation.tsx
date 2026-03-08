import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingDifferentiation() {
  return (
    <section className="py-48 relative grid-bg-subtle">
      <div className="absolute inset-0 radial-glow-top pointer-events-none" />
      <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-8">
            Differentiation
          </motion.p>
          <motion.h2
            variants={child}
            className="text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.15] tracking-tight mb-10"
          >
            We Don't Sell Tools.
            <br />
            <span className="text-muted-foreground">We Build Systems.</span>
          </motion.h2>
          <motion.p variants={child} className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            VONKAM does not resell software. We engineer custom automation architecture tailored to the operator's business model.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
