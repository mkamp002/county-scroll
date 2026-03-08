import { motion } from "framer-motion";
import { Star, GitFork } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const repos = [
  {
    name: "vonkam/lead-scoring-engine",
    desc: "ML lead scoring pipeline for real estate operators. Supabase + Python.",
    lang: "Python",
    langColor: "#3572A5",
    stars: 47,
    forks: 12,
    updated: "2 days ago",
  },
  {
    name: "vonkam/automation-starter-kit",
    desc: "Make.com scenario templates for service businesses. Plug and deploy.",
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 83,
    forks: 24,
    updated: "5 days ago",
  },
  {
    name: "vonkam/ai-agent-framework",
    desc: "Modular AI agent architecture using Claude + Supabase. Production-ready.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 124,
    forks: 31,
    updated: "1 day ago",
  },
];

export function LandingGitHub() {
  return (
    <section className="py-32 relative">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.p variants={child} className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5 text-center">
            Open Source
          </motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-14 text-center leading-[1.15]">
            Open Infrastructure
          </motion.h2>

          <motion.div variants={child} className="grid md:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.name}
                className="rounded-lg border border-border/60 bg-card/40 p-5 flex flex-col justify-between glow-card"
              >
                <div>
                  <h3 className="text-sm font-mono text-primary font-medium mb-2">{repo.name}</h3>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">{repo.desc}</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks}
                  </span>
                  <span className="ml-auto">Updated {repo.updated}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={child} className="text-center mt-8">
            <a
              href="https://github.com/vonkam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary/80 hover:text-primary font-mono transition-colors"
            >
              View all repos on GitHub →
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
