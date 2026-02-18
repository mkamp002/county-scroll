import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingCTA() {
  return (
    <section className="py-44">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2
            variants={child}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-10 max-w-2xl mx-auto leading-[1.08]"
          >
            If your business depends on manual work,
            <br />
            <span className="text-muted-foreground">it's fragile.</span>
          </motion.h2>
          <motion.div variants={child}>
            <Button size="lg" className="text-sm font-medium px-8 h-12 glow-button mb-4">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.p variants={child} className="text-xs text-muted-foreground/60 tracking-wide">Private engagements only.</motion.p>
        </motion.div>
      </div>
    </section>
  );
}
