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
    <section className="py-44 relative">
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
            We Don't Sell Tools.
            <br />
            <span className="text-muted-foreground">We Build Systems.</span>
          </motion.h2>
          <motion.p variants={child} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            VONKAM does not resell software. We engineer custom automation architecture tailored to the operator's business model.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
