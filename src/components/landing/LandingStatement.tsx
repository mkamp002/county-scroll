import { motion } from "framer-motion";

export function LandingStatement() {
  return (
    <section className="py-32 sm:py-40 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-8">
            Most businesses operate manually.
            <br />
            <span className="text-primary">We engineer leverage.</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-2xl leading-relaxed">
            We build backend systems that eliminate repetitive work, centralize intelligence, and give operators full control over their workflows.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
