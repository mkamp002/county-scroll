import { motion } from "framer-motion";

export function LandingSLA() {
  return (
    <section className="py-8 bg-card/30 border-y border-border/30">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground/60 font-mono text-center"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            All client systems monitored 24/7
          </span>
          <span className="hidden sm:inline text-border/40">·</span>
          <span>Critical issues resolved in &lt;4 hours</span>
          <span className="hidden sm:inline text-border/40">·</span>
          <span>99.7% uptime across active deployments</span>
        </motion.div>
      </div>
    </section>
  );
}
