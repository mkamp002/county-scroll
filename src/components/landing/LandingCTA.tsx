import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function LandingCTA() {
  return (
    <section className="py-32 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-8 max-w-2xl mx-auto leading-[1.1]">
            If your business depends on manual work,
            <br />
            <span className="text-muted-foreground">it's fragile.</span>
          </h2>
          <Button size="lg" className="text-sm font-medium px-8 h-12 glow-button mb-4">
            Schedule Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-muted-foreground/60 tracking-wide">Private engagements only.</p>
        </motion.div>
      </div>
    </section>
  );
}
