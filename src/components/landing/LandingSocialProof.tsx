import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stats = [
  { value: "3x", label: "Lead Capture" },
  { value: "72hrs → 4hrs", label: "Response Time" },
  { value: "$0 → Auto", label: "In 14 Days" },
];

export function LandingSocialProof() {
  return (
    <section className="py-24 bg-section relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={child} className="text-sm text-muted-foreground mb-12">
            Trusted by operators across real estate, agencies, and e-commerce
          </motion.p>

          {/* Client logo placeholders */}
          <motion.div variants={child} className="flex flex-wrap justify-center gap-8 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[140px] h-[48px] rounded-md border border-border/40 bg-card/30 flex items-center justify-center"
              >
                <span className="text-[10px] text-muted-foreground/30 tracking-[0.15em] uppercase font-mono">
                  Client Logo
                </span>
              </div>
            ))}
          </motion.div>

          {/* Stat strip */}
          <motion.div
            variants={child}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-primary block tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 tracking-[0.15em] uppercase block mt-1">
                    {stat.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-border/40 ml-8" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
