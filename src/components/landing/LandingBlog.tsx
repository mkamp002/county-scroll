import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const posts = [
  {
    title: "How we built a real-time lead scoring pipeline using Florida county docket data",
    excerpt: "From raw public records to qualified leads in under 4 seconds. A deep dive into the ML pipeline, webhook triggers, and scoring model.",
    readTime: "8 min",
    date: "Feb 2025",
  },
  {
    title: "Make.com vs n8n: which wins for high-volume AI automation workflows",
    excerpt: "We've deployed 120+ workflows across both platforms. Here's the honest breakdown on reliability, cost, and edge cases.",
    readTime: "6 min",
    date: "Jan 2025",
  },
  {
    title: "Why we use Supabase as the backbone of every client automation system",
    excerpt: "PostgreSQL, real-time subscriptions, edge functions, and row-level security — the stack that replaced three separate tools.",
    readTime: "5 min",
    date: "Jan 2025",
  },
];

export function LandingBlog() {
  return (
    <section className="py-32 relative bg-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5 text-center">
            The Lab / System Logs
          </motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-14 text-center leading-[1.15]">
            The Lab
          </motion.h2>

          <motion.div variants={child} className="grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-lg border border-border/60 bg-card/40 p-6 flex flex-col justify-between glow-card group cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-display font-semibold leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/40 font-mono">
                  <span>{post.date} · {post.readTime}</span>
                  <span className="text-primary/70 group-hover:text-primary transition-colors">READ →</span>
                </div>
              </article>
            ))}
          </motion.div>

          <motion.div variants={child} className="text-center mt-8">
            <span className="text-sm text-primary/80 hover:text-primary font-mono transition-colors cursor-pointer">
              See all posts in The Lab →
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
