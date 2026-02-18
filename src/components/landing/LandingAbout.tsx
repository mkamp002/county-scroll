import { motion } from "framer-motion";

export function LandingAbout() {
  return (
    <section id="about" className="py-32 bg-section">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">About</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">VONKAM</h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed">
              VONKAM is a systems lab focused on automation infrastructure for high-leverage businesses. We combine AI, workflow engineering, and data architecture to eliminate inefficiencies and create scalable foundations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
