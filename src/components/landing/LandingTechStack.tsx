import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const row1 = [
  "Make.com", "n8n", "Supabase", "OpenAI", "Anthropic Claude",
  "Replicate", "Bannerbear", "Airtable", "PostgreSQL", "Zapier",
];

const row2 = [
  "Google Ads API", "Meta Graph API", "Twilio", "Instantly.ai",
  "Apollo.io", "Webhooks", "REST APIs", "Python", "JavaScript", "Node.js",
];

function ScrollRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-md border border-border/40 bg-card/40 px-4 py-2.5 text-xs font-mono text-muted-foreground/70 hover:border-primary/30 hover:text-foreground transition-colors duration-300 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function LandingTechStack() {
  return (
    <section className="py-32 relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">
            Infrastructure
          </motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4 leading-[1.15]">
            Infrastructure We Deploy
          </motion.h2>
        </motion.div>
      </div>

      <div className="mt-12 max-w-full">
        <ScrollRow items={row1} direction="left" />
        <ScrollRow items={row2} direction="right" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mt-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm text-muted-foreground/60 font-mono"
        >
          We don't resell tools. We engineer systems.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
