import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

interface Metric {
  value: number;
  suffix: string;
  label: string;
  color: "primary" | "green";
}

const metrics: Metric[] = [
  { value: 120, suffix: "+", label: "Workflows Deployed", color: "primary" },
  { value: 8400, suffix: "+", label: "Leads Processed / Month", color: "green" },
  { value: 94, suffix: "%", label: "Avg Response Reduction", color: "primary" },
  { value: 12000, suffix: "+", label: "Hours Automated", color: "green" },
  { value: 14, suffix: "", label: "Active Client Systems", color: "primary" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatted = display >= 1000 ? display.toLocaleString() : display;

  return (
    <span ref={ref} className={color === "green" ? "text-emerald-400" : "text-primary"}>
      {formatted}{suffix}
    </span>
  );
}

export function LandingMetrics() {
  return (
    <section className="py-32 relative bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={child} className="flex items-center gap-3 justify-center mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase">
              Systems Online
            </p>
          </motion.div>

          <motion.div
            variants={child}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="relative rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm p-6 text-center group"
              >
                <div className="absolute top-3 right-3 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
                    style={{ backgroundColor: m.color === "green" ? "rgb(52 211 153)" : "hsl(25 85% 50%)" }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ backgroundColor: m.color === "green" ? "rgb(52 211 153)" : "hsl(25 85% 50%)" }} />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-2">
                  <AnimatedCounter value={m.value} suffix={m.suffix} color={m.color} />
                </div>
                <div className="text-[10px] text-muted-foreground/60 tracking-[0.12em] uppercase font-mono">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p variants={child} className="text-center text-[10px] text-muted-foreground/30 font-mono mt-6 tracking-wider">
            Last sync: just now
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
