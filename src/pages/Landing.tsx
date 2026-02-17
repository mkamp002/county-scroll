import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Workflow, Database, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const useCases = [
  {
    title: "Real Estate Intelligence Systems",
    description: "Automated lead scoring, docket monitoring, and property data enrichment pipelines for real estate operators.",
  },
  {
    title: "Lead Generation Engines",
    description: "Multi-channel outbound systems that qualify, route, and nurture leads without manual intervention.",
  },
  {
    title: "Internal Ops Automation",
    description: "End-to-end workflow automation connecting your CRM, databases, communication tools, and reporting layers.",
  },
  {
    title: "Data Extraction & Monitoring",
    description: "Structured scraping, event-driven alerts, and real-time dashboards for competitive and market intelligence.",
  },
  {
    title: "Custom AI Tools for Teams",
    description: "Purpose-built AI assistants trained on your data, integrated into your existing tools and workflows.",
  },
];

const steps = [
  { num: "01", label: "Diagnose" },
  { num: "02", label: "Architect" },
  { num: "03", label: "Build" },
  { num: "04", label: "Deploy" },
  { num: "05", label: "Optimize" },
];

export default function Landing() {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight text-foreground">VONKAM</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#systems" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Systems</a>
            <a href="#cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Use Cases</a>
            <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Process</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <Button asChild size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Link to="/app">Login</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 pt-32 pb-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 mb-10"
            >
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Automation Systems Lab</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8"
            >
              Automation Infrastructure
              <br />
              <span className="text-muted-foreground">for Operators</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
            >
              We design AI systems, workflow engines, and data pipelines that eliminate manual work and unlock scale.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-sm font-medium px-8 h-12">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm font-medium px-8 h-12 border-border text-foreground hover:bg-secondary">
                <a href="#systems">View Systems</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
      </section>

      {/* What We Build */}
      <section id="systems" className="py-32 bg-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">What We Build</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Core Systems</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI Agents",
                description: "Custom AI assistants that automate research, lead qualification, notifications, and internal workflows.",
              },
              {
                icon: Workflow,
                title: "Workflow Automation",
                description: "Custom integrations between APIs, CRMs, databases, and tools like Supabase, Make, Twilio, Selenium.",
              },
              {
                icon: Database,
                title: "Data Infrastructure",
                description: "Structured pipelines, dashboards, event logs, and intelligence layers for real-time decision making.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors duration-300"
              >
                <item.icon className="h-6 w-6 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="cases" className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Applications</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Use Cases</h2>
          </motion.div>

          <div className="max-w-2xl space-y-0">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-b border-border"
              >
                <button
                  onClick={() => setExpandedCase(expandedCase === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-lg font-medium tracking-tight group-hover:text-primary transition-colors">
                    {uc.title}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      expandedCase === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedCase === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-muted-foreground pb-6 leading-relaxed"
                  >
                    {uc.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 bg-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">How We Work</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Process</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <span className="text-3xl font-semibold text-primary/40 block mb-3">{step.num}</span>
                <span className="text-base font-medium tracking-tight">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">About</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">VONKAM</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                VONKAM is a systems lab focused on building automation architecture for high-leverage operators. We combine engineering, AI, and infrastructure thinking to eliminate friction inside businesses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-section border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">
              Ready to remove manual work
              <br />
              <span className="text-muted-foreground">from your business?</span>
            </h2>
            <Button size="lg" className="text-sm font-medium px-8 h-12">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-sm font-semibold tracking-tight">VONKAM</span>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="mailto:hello@vonkam.com" className="hover:text-foreground transition-colors">hello@vonkam.com</a>
            </div>
            <p className="text-xs text-muted-foreground">&copy; 2025 VONKAM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
