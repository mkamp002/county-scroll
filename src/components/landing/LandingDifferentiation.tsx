import { motion } from "framer-motion";

export function LandingDifferentiation() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-8">
            We Don't Sell Tools.
            <br />
            <span className="text-muted-foreground">We Build Systems.</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-2xl leading-relaxed">
            VONKAM does not resell software. We engineer custom automation architecture tailored to the operator's business model.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
    </section>
  );
}
