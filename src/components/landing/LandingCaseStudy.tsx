import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingCaseStudy() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("Case study sent to your inbox.");
      setName("");
      setEmail("");
      setCompany("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-32 relative">
      <div className="max-w-[600px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div
            variants={child}
            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-8 sm:p-10 lead-magnet-card"
          >
            <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-4">
              Case Study
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mb-3 leading-[1.15]">
              Get the full system breakdown
            </h2>
            <p className="text-sm text-muted-foreground/70 mb-8 leading-relaxed">
              Download our Real Estate Intelligence System case study — architecture, stack, and results.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/60 border-border/40 h-11 text-sm"
                required
                maxLength={100}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/60 border-border/40 h-11 text-sm"
                required
                maxLength={255}
              />
              <Input
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-background/60 border-border/40 h-11 text-sm"
                maxLength={100}
              />
              <Button type="submit" className="w-full h-11 glow-button text-sm mt-2" disabled={loading}>
                {loading ? "Sending..." : "Download Case Study"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
