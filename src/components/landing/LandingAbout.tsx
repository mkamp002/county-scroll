import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingAbout() {
  return (
    <section id="about" className="py-44 bg-section relative">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={child} className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-5">About</motion.p>
          <motion.h2 variants={child} className="text-5xl sm:text-6xl font-bold tracking-tight mb-10">VONKAM</motion.h2>
          <motion.p variants={child} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            VONKAM is a systems lab focused on automation infrastructure for high-leverage businesses. We combine AI, workflow engineering, and data architecture to eliminate inefficiencies and create scalable foundations.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
