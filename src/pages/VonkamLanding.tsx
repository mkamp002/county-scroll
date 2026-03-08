import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, BarChart3, Database, ChevronDown } from "lucide-react";
import VonkamOS from "@/components/VonkamOS";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const { ref, visible } = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ─── Section wrapper with fade-in ─── */
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const { ref, visible } = useInView(0.08);
  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Terminal typing ─── */
const terminalLines = [
  "$ vonkam init --system automation",
  "→ scanning workflows...",
  "→ deploying agents...",
  "✓ system online.",
];

function TerminalTyping() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIndex >= terminalLines.length) { setDone(true); return; }
    const line = terminalLines[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIndex((l) => l + 1); setCharIndex(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, done]);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-[#1E1E1E] bg-[#111] p-5 text-left font-mono text-xs text-[#888] leading-relaxed">
      {terminalLines.map((line, li) => {
        if (li > lineIndex) return null;
        const text = li === lineIndex ? line.slice(0, charIndex) : line;
        const isActive = li === lineIndex && !done;
        const isLast = li === terminalLines.length - 1 && li <= lineIndex;
        return (
          <div key={li} className={isLast ? "text-[#E8570A] font-bold" : ""}>
            {text}
            {isActive && <span className="terminal-cursor" />}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Marquee ─── */
const marqueeItems = ["AI AGENTS", "DATA INFRASTRUCTURE", "WORKFLOW AUTOMATION", "SYSTEM ARCHITECTURE", "LEAD ACQUISITION"];

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="w-full overflow-hidden border-t border-b border-[#1A1A1A] py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-[11px] font-medium text-[#888]/40 tracking-[0.2em] uppercase font-mono">{item}</span>
            <span className="w-1 h-1 rounded-full bg-[#E8570A]/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Use Case Accordion ─── */
function UseCaseRow({ industry, problem, built, outcome, defaultOpen = true }: {
  industry: string; problem: string; built: string; outcome: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#1E1E1E] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#111] transition-colors"
      >
        <span className="font-mono text-xs text-[#E8570A] tracking-[0.15em] uppercase font-bold">{industry}</span>
        <ChevronDown className={`h-4 w-4 text-[#888] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-[10px] font-mono text-[#888] tracking-[0.15em] uppercase mb-2">PROBLEM</p>
            <p className="text-sm text-[#ccc] leading-relaxed">{problem}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#888] tracking-[0.15em] uppercase mb-2">WHAT WE BUILT</p>
            <p className="text-sm text-[#ccc] leading-relaxed">{built}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#888] tracking-[0.15em] uppercase mb-2">OUTCOME</p>
            <p className="text-sm text-[#E8570A] font-bold leading-relaxed">{outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

const CALENDLY = "https://calendly.com/michelkampreisser1/30min";

const systems = [
  { icon: Bot, title: "AI Agents", desc: "Autonomous workflows that act, decide, and execute without human input." },
  { icon: Zap, title: "Lead Acquisition Engines", desc: "Multi-channel outbound on autopilot. Apollo, Meta Ads API, and cold infrastructure that never sleeps." },
  { icon: BarChart3, title: "Operations Dashboards", desc: "Real-time command centers built on Supabase. See everything. Control everything." },
  { icon: Database, title: "Data Infrastructure", desc: "Pipelines, ML scoring models, and monitoring systems that power every layer of your operation." },
];

const useCases = [
  {
    industry: "Real Estate Intelligence",
    problem: "Operators manually tracking thousands of docket entries, missing high-intent leads buried in county records.",
    built: "Event-driven pipeline ingesting county filings, scoring leads via ML models, routing qualified prospects to acquisition teams in real-time.",
    outcome: "3x increase in qualified lead capture. Response time reduced from 72 hours to under 4.",
  },
  {
    industry: "Outbound Automation",
    problem: "Sales teams spending 80% of time on manual prospecting with inconsistent follow-up.",
    built: "Automated lead acquisition engine across Apollo, LinkedIn, and Meta — with AI-personalized outreach sequences.",
    outcome: "0 to 400 monthly touchpoints. Zero additional headcount.",
  },
  {
    industry: "Operations Dashboard",
    problem: "No real-time visibility across campaigns, pipelines, and team performance.",
    built: "Supabase-backed command dashboard with live KPIs, automated alerts, and drill-down reporting.",
    outcome: "Full operational visibility. Decision time cut by 60%.",
  },
  {
    industry: "Content Automation",
    problem: "Manually creating and posting content across platforms daily — not scalable.",
    built: "GPT-4o + Replicate FLUX + Bannerbear + Instagram Graph API pipeline. Brief in → content out, auto-published.",
    outcome: "2x daily posts. Zero manual effort after setup.",
  },
];

const steps = [
  { n: "01", title: "Diagnose", desc: "Audit workflows & identify friction points." },
  { n: "02", title: "Architect", desc: "Design system structure & data flow." },
  { n: "03", title: "Build", desc: "Deploy automation, agents, and infrastructure." },
  { n: "04", title: "Integrate", desc: "Connect tools, APIs, and dashboards." },
  { n: "05", title: "Optimize", desc: "Continuously refine performance and leverage." },
];

const archNodes = ["Supabase", "Make.com", "GPT-4o", "CRM", "Instagram"];

export default function VonkamLanding() {
  const [email, setEmail] = useState("");

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-2xl">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between px-6 py-5">
          <span className="text-base font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
            VONKAM
          </span>
          <div className="hidden md:flex items-center gap-10">
            {["systems", "cases", "process", "about"].map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="text-[13px] text-[#888] hover:text-white transition-colors capitalize">
                {s === "cases" ? "Use Cases" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E8570A] text-white text-[13px] font-semibold px-5 py-2.5 rounded hover:bg-[#ff6b1a] transition-colors flex items-center gap-1.5"
            style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15)" }}
          >
            Book a Call <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(232,87,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,87,10,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#E8570A]/[0.04] blur-[200px] pointer-events-none" />

        <div className="max-w-[1000px] mx-auto px-6 pt-36 pb-12 relative z-10 flex-1 flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] font-medium text-[#E8570A]/70 tracking-[0.25em] uppercase mb-8 font-mono">
              Automation Infrastructure Lab
            </p>

            <h1 className="text-[52px] sm:text-6xl lg:text-[96px] font-bold leading-[1.15] tracking-tight mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
              Built Systems
              <br />
              <span className="text-[#333]">Don't Break.</span>
            </h1>

            <p className="text-lg text-[#888] max-w-[600px] mx-auto mb-12 leading-relaxed">
              VONKAM engineers AI agents, automation pipelines, and data infrastructure for operators who are done doing things manually.
            </p>

            <div className="mb-14">
              <TerminalTyping />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#E8570A] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#ff6b1a] transition-colors"
                style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15), 0 0 60px rgba(232,87,10,0.05)" }}
              >
                Book Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <button
                onClick={() => scrollTo("systems")}
                className="inline-flex items-center justify-center border border-[#333] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#111] transition-colors"
              >
                Explore Infrastructure
              </button>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10">
          <Marquee />
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <Section className="bg-[#111] py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#888] tracking-[0.2em] uppercase mb-10 text-center">
            Trusted by operators across real estate, agencies, and e-commerce
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
            {[
              { val: 3, suffix: "x", label: "Qualified Lead Capture" },
              { val: 94, suffix: "%", label: "Reduction in Manual Operations" },
              { val: 14, suffix: " days", label: "Average System Deployment" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#E8570A] mb-2">
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <p className="text-[11px] text-[#888] font-mono">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="grid md:grid-cols-3 gap-5 max-w-[900px] mx-auto">
            {[
              {
                quote: "VONKAM replaced three tools and two VAs with one system. It just runs.",
                name: "Carlos M.",
                role: "Real Estate Operator · Miami",
              },
              {
                quote: "We went from zero outbound to 400+ touchpoints/month in two weeks. No new hires.",
                name: "Sarah K.",
                role: "Agency Founder · NYC",
              },
              {
                quote: "The dashboard alone changed how we operate. We actually see what's happening now.",
                name: "David R.",
                role: "E-Commerce Director · Austin",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-6 flex flex-col"
              >
                <p className="text-sm text-[#CCC] leading-relaxed mb-5 flex-1">"{r.quote}"</p>
                <div>
                  <p className="text-xs font-bold text-white">{r.name}</p>
                  <p className="text-[10px] text-[#666] font-mono mt-0.5">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SYSTEMS ─── */}
      <Section id="systems" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">SYSTEMS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Infrastructure We Deploy
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {systems.map((s, i) => (
              <div
                key={i}
                className="bg-[#111] border border-[#1E1E1E] rounded-xl p-8 transition-all duration-300 hover:border-[#E8570A]/30 hover:shadow-[0_0_30px_rgba(232,87,10,0.06)]"
              >
                <s.icon className="h-6 w-6 text-[#E8570A] mb-4" />
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs text-[#E8570A] font-mono cursor-pointer hover:underline">Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── USE CASES ─── */}
      <Section id="cases" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">USE CASES</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Applications
          </h2>
          <div className="space-y-4">
            {useCases.map((uc, i) => (
              <UseCaseRow key={i} {...uc} />
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section id="process" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">PROCESS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Methodology
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-16">
            {steps.map((s, i) => (
              <div key={i} className="bg-[#111] border border-[#1E1E1E] rounded-lg p-6 text-center transition-all duration-300 hover:border-[#E8570A]/30">
                <span className="text-2xl font-bold text-[#E8570A] font-mono">{s.n}</span>
                <h3 className="text-sm font-bold mt-3 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[#888] mb-6">Ready to start? Book your diagnostic call.</p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#E8570A] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#ff6b1a] transition-colors"
              style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15)" }}
            >
              Book a Call <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>

      {/* ─── ROI CALCULATOR ─── */}
      <Section className="py-32" style={{ background: "#0D0D0D" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">ROI CALCULATOR</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
            What Manual Operations Are Costing You
          </h2>
          <ROICalculator />
        </div>
      </Section>

      {/* ─── LEAD MAGNET ─── */}
      <Section className="py-32">
        <div className="max-w-[480px] mx-auto px-6">
          <div
            className="border border-[#2A2A2A] rounded-xl p-12 text-center relative overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at center, rgba(232,87,10,0.06), #0A0A0A 70%)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Get the Automation Playbook
            </h2>
            <p className="text-sm text-[#888] mb-8 leading-relaxed">
              The 5 systems every scaling operator should have running — free PDF delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-[#111] border border-[#2A2A2A] rounded px-4 py-3 text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#E8570A]/50"
              />
              <button className="bg-[#E8570A] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[#ff6b1a] transition-colors whitespace-nowrap">
                Send It →
              </button>
            </div>
            <p className="text-[10px] text-[#888]/50 mt-4 font-mono">No spam. Operator-level content only.</p>
          </div>
        </div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section id="about" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">ABOUT</p>
            <h2 className="text-3xl font-bold mb-6 leading-[1.15]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Engineering-grade automation for serious operators.
            </h2>
            <p className="text-[#888] leading-relaxed mb-6">
              VONKAM is a Miami-based AI systems studio. We don't sell subscriptions or templates — we architect and deploy custom automation infrastructure that scales with your operation. Every system we build is production-grade, monitored, and optimized continuously.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-sm text-[#E8570A] font-mono hover:underline">
                Book a Call →
              </a>
              <a href="https://instagram.com/vonkamtech" target="_blank" rel="noopener noreferrer" className="text-sm text-[#888] font-mono hover:text-white transition-colors">
                @vonkamtech on Instagram
              </a>
            </div>
          </div>
          {/* Abstract architecture diagram */}
          <div className="bg-[#111] border border-[#1E1E1E] rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {archNodes.map((node, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="border border-[#E8570A]/40 rounded px-3 py-2 text-xs font-mono text-[#ccc]">
                    {node}
                  </div>
                  {i < archNodes.length - 1 && (
                    <span className="text-[#E8570A]/60 text-xs font-mono">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-[#888]/50 font-mono mt-6">
              Actual client system architecture
            </p>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#1A1A1A] bg-[#080808] py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div>
              <span className="text-base font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
                VONKAM
              </span>
              <p className="text-xs text-[#888] mt-1">© 2025 VONKAM Technologies. Miami, FL.</p>
            </div>
            <div className="flex items-center gap-8">
              {["systems", "cases", "process", "about"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-xs text-[#888] hover:text-white transition-colors capitalize"
                >
                  {s === "cases" ? "Use Cases" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E8570A] font-mono hover:underline">
                Book a Call →
              </a>
              <a href="https://instagram.com/vonkamtech" target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors">
                @vonkamtech
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-[#888]/30 font-mono tracking-wider">
            Built Systems Don't Break.
          </p>
        </div>
      </footer>

      {/* ─── CHATBOT ─── */}
      <VonkamOS />
    </div>
  );
}
