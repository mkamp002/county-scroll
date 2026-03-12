import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, BarChart3, Database, Layers, ChevronDown, Plus, Minus, Check, Menu, X } from "lucide-react";
import VonkamOS from "@/components/VonkamOS";
import { Particles } from "@/components/landing/Particles";

/* ─── Constants ─── */
const CALENDLY = "https://calendly.com/michelkampreisser1/30min";
const mono = "'JetBrains Mono', monospace";
const syne = "'Syne', sans-serif";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold, rootMargin: "100px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Stagger fade section wrapper ─── */
function Section({ children, id, className = "", style }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useInView(0.05);
  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ─── StaggerChild — individual items delayed ─── */
function StaggerChild({ children, index = 0, visible, className = "" }: { children: React.ReactNode; index?: number; visible: boolean; className?: string }) {
  return (
    <div
      className={`transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      {children}
    </div>
  );
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

/* ─── AnimVal (smooth ROI counter) ─── */
function AnimVal({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = to;
    if (from === to) return;
    const dur = 300;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setDisplay(Math.round(from + (to - from) * t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
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
const marqueeItems = ["AI AGENTS", "DATA INFRASTRUCTURE", "WORKFLOW AUTOMATION", "SYSTEM ARCHITECTURE", "LEAD ACQUISITION", "REAL-TIME DASHBOARDS"];
function Marquee() {
  const tripled = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="w-full overflow-hidden border-t border-b border-[#1A1A1A] py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-[11px] font-medium text-[#888]/40 tracking-[0.2em] uppercase font-mono">{item}</span>
            <span className="w-1 h-1 rounded-full bg-[#E8570A]/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Industry ticker ─── */
const industryTags = ["REAL ESTATE", "AGENCIES", "E-COMMERCE", "SAAS", "PROFESSIONAL SERVICES"];
function IndustryTicker() {
  const doubled = [...industryTags, ...industryTags, ...industryTags];
  return (
    <div className="w-full overflow-hidden py-3 mb-8 max-w-full">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tag, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-[10px] font-mono text-[#E8570A]/50 tracking-[0.2em]">{tag}</span>
            <span className="w-1 h-1 rounded-full bg-[#E8570A]/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Use Case Accordion ─── */
const useCaseFlows: Record<string, string[]> = {
  "Real Estate Intelligence": ["County Records", "Webhook", "Supabase", "ML Score", "CRM", "Outreach"],
  "Outbound Automation": ["Apollo", "Intent Score", "Sequencer", "Email/SMS", "CRM", "Dashboard"],
  "Operations Dashboard": ["Data Sources", "ETL Pipeline", "Supabase", "Dashboard", "Alerts", "Reports"],
  "Content Automation": ["Brief", "GPT-4o", "Replicate", "Bannerbear", "Meta API", "Analytics"],
};

function UseCaseRow({ industry, problem, built, outcome, outcomeNumber, defaultOpen = false }: {
  industry: string; problem: string; built: string; outcome: string; outcomeNumber: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const flow = useCaseFlows[industry] || [];
  return (
    <div className="border border-[#1E1E1E] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#111] transition-colors active:scale-[0.99]"
      >
        <span className="font-mono text-xs text-[#E8570A] tracking-[0.15em] uppercase font-bold">{industry}</span>
        <ChevronDown className={`h-4 w-4 text-[#888] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
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
              <p className="text-3xl font-bold text-[#E8570A] mb-1" style={{ fontFamily: syne }}>{outcomeNumber}</p>
              <p className="text-xs text-[#888]">{outcome}</p>
            </div>
          </div>
          {/* Flow diagram */}
          {flow.length > 0 && (
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-4 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {flow.map((node, ni) => (
                  <div key={ni} className="flex items-center gap-2">
                    <div className="border border-[#E8570A]/40 rounded px-3 py-1.5 text-[10px] font-mono text-[#ccc] whitespace-nowrap">
                      {node}
                    </div>
                    {ni < flow.length - 1 && <span className="text-[#E8570A]/60 text-xs font-mono">→</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Tech Stack Marquee ─── */
const techRow1 = ["Make.com", "Supabase", "OpenAI", "Replicate", "Bannerbear", "Meta API", "Apollo.io", "Instantly.ai"];
const techRow2 = ["n8n", "PostgreSQL", "Python", "Node.js", "Twilio", "Claude AI", "Airtable", "Webhooks"];

function TechMarquee({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {tripled.map((item, i) => (
           <div key={i} className="flex items-center border border-[#1E1E1E] rounded px-4 py-2.5 bg-[#111] shrink-0">
             <span className="text-[11px] font-mono text-[#888] tracking-wider">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── ROI Calculator ─── */
const INDUSTRY_INSIGHTS: Record<string, string> = {
  "Real Estate": "Real estate operators using our lead intelligence systems recover 94% of manual prospecting time.",
  "Marketing Agency": "Agencies on our outbound engine average 400+ monthly touchpoints with zero added headcount.",
  "E-commerce": "E-commerce brands using our content pipelines post 2x daily across platforms with no manual effort.",
  "SaaS / Tech": "SaaS teams using our ops dashboards cut reporting time by 60% and eliminate weekly manual data pulls.",
  "Professional Services": "Service businesses automate 80% of their follow-up and lead qualification within 14 days of deployment.",
  "Other": "Most operations automate 70-80% of manual tasks within the first 30 days of deployment.",
};
const INDUSTRIES = ["Real Estate", "Marketing Agency", "E-commerce", "SaaS / Tech", "Professional Services", "Other"];

function ROICalculator() {
  const [teamSize, setTeamSize] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [industry, setIndustry] = useState("Real Estate");

  const monthlyCost = teamSize * hourlyRate * hoursPerWeek * 4.33;
  const hoursRecovered = Math.round(hoursPerWeek * teamSize * 0.8);
  const monthlySavings = monthlyCost * 0.8;
  const roi = Math.round(((monthlySavings * 12 - 5000) / 5000) * 100);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* INPUTS */}
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: mono, color: "#E8570A" }}>HOW MANY PEOPLE DO THIS MANUALLY</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setTeamSize(Math.max(1, teamSize - 1))} className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] hover:border-[#E8570A] transition-colors active:scale-95 bg-[#111]">
              <Minus className="h-4 w-4 text-[#E8570A]" />
            </button>
            <span className="text-2xl font-bold w-12 text-center" style={{ fontFamily: syne }}>{teamSize}</span>
            <button onClick={() => setTeamSize(Math.min(50, teamSize + 1))} className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] hover:border-[#E8570A] transition-colors active:scale-95 bg-[#111]">
              <Plus className="h-4 w-4 text-[#E8570A]" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: mono, color: "#E8570A" }}>AVERAGE HOURLY RATE PER PERSON (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8570A] text-sm" style={{ fontFamily: mono }}>$</span>
            <input type="number" min={10} max={500} value={hourlyRate} onChange={(e) => setHourlyRate(Math.max(10, Math.min(500, Number(e.target.value) || 10)))}
              className="w-full pl-8 pr-4 py-3 text-sm text-white border-b-2 border-[#2A2A2A] focus:border-[#E8570A] outline-none transition-colors bg-[#111]" style={{ fontFamily: mono }} />
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: mono, color: "#E8570A" }}>
            HOURS SPENT ON MANUAL TASKS PER WEEK <span className="text-white ml-2">{hoursPerWeek}h</span>
          </label>
          <input type="range" min={1} max={80} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer roi-slider"
            style={{ background: `linear-gradient(to right, #E8570A ${((hoursPerWeek - 1) / 79) * 100}%, #2A2A2A ${((hoursPerWeek - 1) / 79) * 100}%)` }} />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: mono, color: "#E8570A" }}>YOUR INDUSTRY</label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 text-sm text-white border-b-2 border-[#2A2A2A] focus:border-[#E8570A] outline-none transition-colors appearance-none cursor-pointer bg-[#111]" style={{ fontFamily: mono }}>
            {INDUSTRIES.map((ind) => (<option key={ind} value={ind} style={{ background: "#111" }}>{ind}</option>))}
          </select>
        </div>
      </div>

      {/* RESULTS */}
      <div className="space-y-4">
        <div className="border border-[#2A2A2A] p-6 rounded-lg" style={{ background: "#1A0A0A" }}>
          <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: syne }}><AnimVal value={Math.round(monthlyCost)} prefix="$" /><span className="text-base font-normal text-[#888]"> / month</span></p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#888]" style={{ fontFamily: mono }}>CURRENT MONTHLY COST</p>
        </div>
        <div className="border border-[#2A2A2A] p-8 rounded-lg relative overflow-hidden" style={{ background: "#111" }}>
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #E8570A, transparent 70%)" }} />
          <div className="relative">
            <p className="text-5xl font-bold text-[#E8570A] mb-1" style={{ fontFamily: syne }}><AnimVal value={Math.round(monthlySavings)} prefix="$" /><span className="text-lg font-normal text-[#888]"> / month saved</span></p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#888]" style={{ fontFamily: mono }}>MONTHLY SAVINGS WITH VONKAM</p>
          </div>
        </div>
        <div className="border border-[#2A2A2A] p-6 rounded-lg bg-[#111]">
          <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: syne }}><AnimVal value={hoursRecovered} /><span className="text-base font-normal text-[#888]"> hrs/week recovered</span></p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#888]" style={{ fontFamily: mono }}>HOURS RECOVERED PER WEEK</p>
        </div>
        <div className="border border-[#2A2A2A] p-6 rounded-lg bg-[#111]">
          <p className="text-3xl font-bold text-[#E8570A] mb-1" style={{ fontFamily: syne }}><AnimVal value={roi} suffix="%" /></p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#888]" style={{ fontFamily: mono }}>RETURN ON AUTOMATION INVESTMENT</p>
        </div>
        <div className="border border-[#2A2A2A] p-6 rounded-lg text-center bg-[#111]">
          <p className="text-sm text-[#888] mb-4" style={{ fontFamily: mono }}>
            Your operation is leaving <span className="text-[#E8570A] font-bold">${Math.round(monthlySavings).toLocaleString()}</span> on the table every month.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center py-4 text-sm font-bold tracking-wider text-white bg-[#E8570A] hover:bg-[#ff6b1a] transition-all hover:shadow-[0_0_20px_rgba(232,87,10,0.3)] active:scale-[0.97]"
            style={{ fontFamily: mono }}>
            Get Your Free System Audit →
          </a>
        </div>
        <p className="text-xs text-[#666] leading-relaxed" style={{ fontFamily: mono }}>{INDUSTRY_INSIGHTS[industry]}</p>
      </div>
    </div>
  );
}

/* ─── Nav with scroll spy + mobile menu ─── */
function Nav({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["systems", "cases", "techstack", "process", "about"];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) { setActiveSection(s); return; }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "systems", label: "Systems" },
    { id: "cases", label: "Use Cases" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-2xl border-[#1A1A1A]" : "bg-transparent border-transparent"}`}>
      <div className="max-w-[1000px] mx-auto flex items-center justify-between px-6 py-5">
        <span className="text-base font-bold tracking-[0.15em] uppercase" style={{ fontFamily: syne }}>VONKAM</span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className={`text-[13px] transition-colors ${activeSection === link.id ? "text-[#E8570A]" : "text-[#888] hover:text-white"}`}>
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center bg-[#E8570A] text-white text-[13px] font-semibold px-5 py-2.5 rounded hover:bg-[#ff6b1a] transition-colors active:scale-95"
            style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15)" }}>
            Book a Call <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[#0A0A0A]/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 animate-fade-in">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => { scrollTo(link.id); setMobileOpen(false); }}
              className={`text-xl ${activeSection === link.id ? "text-[#E8570A]" : "text-[#888]"}`} style={{ fontFamily: syne }}>
              {link.label}
            </button>
          ))}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="bg-[#E8570A] text-white text-sm font-semibold px-8 py-3 rounded mt-4 active:scale-95 transition-transform">
            Book a Call <ArrowRight className="inline ml-1 h-4 w-4" />
          </a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const systems = [
  { icon: Bot, title: "AI Agents", desc: "Autonomous workflows that act, decide, and execute without human input." },
  { icon: Zap, title: "Lead Acquisition Engines", desc: "Multi-channel outbound on autopilot. Apollo, Meta Ads API, and cold infrastructure that never sleeps." },
  { icon: BarChart3, title: "Operations Dashboards", desc: "Real-time command centers built on Supabase. See everything. Control everything." },
  { icon: Database, title: "Data Infrastructure", desc: "Pipelines, ML scoring models, and monitoring systems that power every layer of your operation." },
];

const useCases = [
  { industry: "Real Estate Intelligence", problem: "Operators manually tracking thousands of docket entries, missing high-intent leads buried in county records.", built: "Event-driven pipeline ingesting county filings, scoring leads via ML models, routing qualified prospects to acquisition teams in real-time.", outcome: "increase in qualified lead capture", outcomeNumber: "3x" },
  { industry: "Outbound Automation", problem: "Sales teams spending 80% of time on manual prospecting with inconsistent follow-up.", built: "Automated lead acquisition engine across Apollo, LinkedIn, and Meta — with AI-personalized outreach sequences.", outcome: "monthly touchpoints. Zero additional headcount.", outcomeNumber: "400+" },
  { industry: "Operations Dashboard", problem: "No real-time visibility across campaigns, pipelines, and team performance.", built: "Supabase-backed command dashboard with live KPIs, automated alerts, and drill-down reporting.", outcome: "decision time cut", outcomeNumber: "60%" },
  { industry: "Content Automation", problem: "Manually creating and posting content across platforms daily — not scalable.", built: "GPT-4o + Replicate FLUX + Bannerbear + Instagram Graph API pipeline. Brief in → content out, auto-published.", outcome: "daily posts. Zero manual effort after setup.", outcomeNumber: "2x" },
];

const steps = [
  { n: "01", title: "Diagnose", desc: "Audit workflows & identify friction points.", time: "Day 1-2" },
  { n: "02", title: "Architect", desc: "Design system structure & data flow.", time: "Day 2-3" },
  { n: "03", title: "Build", desc: "Deploy automation, agents, and infrastructure.", time: "Day 3-10" },
  { n: "04", title: "Integrate", desc: "Connect tools, APIs, and dashboards.", time: "Day 10-14" },
  { n: "05", title: "Optimize", desc: "Continuously refine performance and leverage.", time: "Day 14+" },
];

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const systemsRef = useRef<HTMLDivElement>(null);

  const handleLeadSubmit = useCallback(async () => {
    console.log("button clicked");
    const emailValue = email.trim();
    if (!emailValue) return;

    setLeadStatus("loading");

    try {
      const { error } = await supabase
        .from("email_leads" as any)
        .insert({ email: emailValue, source: "website" });

      if (!error) {
        setLeadStatus("success");
        setEmail("");
      } else {
        console.error("Error:", error);
        setLeadStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setLeadStatus("error");
    }
  }, [email]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // For staggered systems cards
  const { ref: systemsInViewRef, visible: systemsVisible } = useInView(0.1);
  const { ref: stepsInViewRef, visible: stepsVisible } = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased custom-scrollbar" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      <Nav scrollTo={scrollTo} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(232,87,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,87,10,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#E8570A]/[0.04] blur-[200px] pointer-events-none" />
        <Particles count={7} />

        <div className="max-w-[1000px] mx-auto px-6 pt-36 pb-12 relative z-10 flex-1 flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.6 }}
              className="text-[11px] font-medium text-[#E8570A]/70 tracking-[0.25em] uppercase mb-8 font-mono">
              Automation Infrastructure Lab
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[48px] sm:text-6xl lg:text-[96px] font-bold leading-[1.1] tracking-tight mb-4" style={{ fontFamily: syne }}>
              Built Systems
              <br />
              <span className="text-[#333]">Don't Break.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.6 }}
              className="text-sm sm:text-base text-[#888] tracking-wide mb-10 font-mono">
              Engineered for scale. Deployed globally. Zero manual operations.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.6 }} className="mb-12">
              <TerminalTyping />
            </motion.div>

            {/* Stat strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-mono text-[#888] mb-12">
              <span>3x Lead Capture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8570A]/60" />
              <span>94% Manual Ops Eliminated</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8570A]/60" />
              <span>14 Day Deployment</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8570A]/60" />
              <span>400+ Monthly Touchpoints</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#E8570A] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#ff6b1a] transition-colors active:scale-95"
                style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15), 0 0 60px rgba(232,87,10,0.05)" }}>
                Book Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <button onClick={() => scrollTo("systems")}
                className="inline-flex items-center justify-center border border-[#333] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#111] transition-colors active:scale-95">
                Explore Infrastructure
              </button>
            </motion.div>
          </div>
        </div>

        <div className="w-full relative z-10"><Marquee /></div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <Section className="bg-[#111] py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <IndustryTicker />
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
            {[
              { val: 3, suffix: "x", label: "Qualified Lead Capture" },
              { val: 94, suffix: "%", label: "Reduction in Manual Ops" },
              { val: 14, suffix: " days", label: "Average Deployment" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#E8570A] mb-2" style={{ fontFamily: syne }}>
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <p className="text-[11px] text-[#888] font-mono">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Featured testimonial */}
          <div className="max-w-[700px] mx-auto bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-8">
            <p className="text-sm text-[#CCC] leading-relaxed mb-6">
              "VONKAM built us a lead pipeline that runs completely on its own. We went from manually checking county records every day to getting qualified leads routed directly into our CRM."
            </p>
            <div>
              <p className="text-xs font-bold text-white">— Real Estate Operator</p>
              <p className="text-[10px] text-[#666] font-mono mt-0.5">United States</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ SYSTEMS ═══ */}
      <Section id="systems" className="py-16 sm:py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">SYSTEMS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: syne }}>Infrastructure We Deploy</h2>
          <div ref={systemsInViewRef} className="grid md:grid-cols-2 gap-5 mb-5">
            {systems.map((s, i) => (
              <StaggerChild key={i} index={i} visible={systemsVisible}>
                <div className="bg-[#111] border border-[#1E1E1E] rounded-xl p-8 transition-all duration-300 hover:border-[#E8570A]/30 hover:shadow-[0_0_30px_rgba(232,87,10,0.06)] h-full">
                  <s.icon className="h-6 w-6 text-[#E8570A] mb-4" />
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: syne }}>{s.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </div>
          {/* 5th card — full width */}
          <StaggerChild index={4} visible={systemsVisible}>
            <div className="bg-[#111] border border-[#1E1E1E] rounded-xl p-8 transition-all duration-300 hover:border-[#E8570A]/30 hover:shadow-[0_0_30px_rgba(232,87,10,0.06)]">
              <Layers className="h-6 w-6 text-[#E8570A] mb-4" />
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: syne }}>Custom System Architecture</h3>
              <p className="text-sm text-[#888] leading-relaxed mb-4">Every operation is different. We scope, design, and deploy systems built exactly for your stack and workflow.</p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E8570A] font-mono hover:underline">Describe your operation →</a>
            </div>
          </StaggerChild>
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section id="cases" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">USE CASES</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: syne }}>Applications</h2>
          <div className="space-y-4">
            {useCases.map((uc, i) => (
              <UseCaseRow key={i} {...uc} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TECH STACK ═══ */}
      <Section id="techstack" className="py-16 sm:py-32 bg-[#080808]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">INFRASTRUCTURE</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: syne }}>Our Stack</h2>
          <TechMarquee items={techRow1} direction="left" />
          <TechMarquee items={techRow2} direction="right" />
          <p className="text-center text-xs text-[#888]/60 font-mono mt-8 tracking-wider">
            We don't resell tools. We engineer systems.
          </p>
        </div>
      </Section>

      {/* ═══ PROCESS ═══ */}
      <Section id="process" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">PROCESS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: syne }}>Methodology</h2>

          {/* Desktop: horizontal with connecting line */}
          <div ref={stepsInViewRef} className="hidden sm:block mb-16">
            <div className="relative">
              <div className="absolute top-[18px] left-[10%] right-[10%] h-px overflow-hidden">
                <div className={`h-full bg-[#E8570A]/40 transition-all duration-[1.5s] ease-out ${stepsVisible ? "w-full" : "w-0"}`} />
              </div>
              <div className="grid grid-cols-5 gap-4">
                {steps.map((s, i) => (
                  <StaggerChild key={i} index={i} visible={stepsVisible} className="text-center relative">
                    <div className="w-9 h-9 rounded-full border border-[#E8570A]/40 bg-[#0A0A0A] flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-[10px] font-mono text-[#E8570A] font-bold">{s.n}</span>
                    </div>
                    <h3 className="text-sm font-bold mb-1" style={{ fontFamily: syne }}>{s.title}</h3>
                    <p className="text-xs text-[#888] leading-relaxed mb-2">{s.desc}</p>
                    <p className="text-[10px] font-mono text-[#E8570A]/60">{s.time}</p>
                  </StaggerChild>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="sm:hidden mb-16 overflow-visible" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            {steps.map((s, i) => (
              <div key={i} className="mb-10 last:mb-0">
                <span className="block text-[11px] text-[#E8570A] mb-1" style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px" }}>{s.n}</span>
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: syne }}>{s.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
                <p className="text-[10px] font-mono text-[#E8570A]/60 mt-1">{s.time}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[#888] mb-6">Ready to start? Book your diagnostic call.</p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center bg-[#E8570A] text-white text-sm font-medium px-8 h-12 rounded hover:bg-[#ff6b1a] transition-colors active:scale-95"
              style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15)" }}>
              Book a Call <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>

      {/* ═══ ROI CALCULATOR ═══ */}
      <Section className="py-32" style={{ background: "#0D0D0D" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">ROI CALCULATOR</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14 leading-[1.15]" style={{ fontFamily: syne }}>What Manual Operations Are Costing You</h2>
          <ROICalculator />
        </div>
      </Section>

      {/* ═══ LEAD MAGNET ═══ */}
      <Section className="py-32">
        <div className="max-w-[480px] mx-auto px-6">
          <div className="border border-[#2A2A2A] rounded-xl p-12 text-center relative overflow-hidden"
            style={{ background: "radial-gradient(ellipse at center, rgba(232,87,10,0.06), #0A0A0A 70%)" }}>
            <h2 className="text-2xl font-bold mb-4 leading-[1.15]" style={{ fontFamily: syne }}>Get the Automation Playbook</h2>
            <p className="text-sm text-[#888] mb-8 leading-relaxed">The 5 systems every scaling operator should have running — free PDF delivered to your inbox.</p>
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (leadStatus !== "idle") setLeadStatus("idle");
                }}
                placeholder="your@email.com"
                disabled={leadStatus === "loading"}
                className="flex-1 bg-[#111] border border-[#2A2A2A] rounded px-4 py-3 text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#E8570A]/50 disabled:opacity-70"
              />
              <button
                onClick={handleLeadSubmit}
                disabled={leadStatus === "loading"}
                className="bg-[#E8570A] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[#ff6b1a] transition-colors whitespace-nowrap active:scale-95 disabled:opacity-70"
              >
                {leadStatus === "loading" ? "Sending..." : "Send It →"}
              </button>
            </div>
            {leadStatus === "success" && <p className="text-[11px] text-[#E8570A] font-mono mb-3">Check your inbox!</p>}
            {leadStatus === "error" && <p className="text-[11px] text-red-400 font-mono mb-3">Something went wrong. Try again.</p>}
            <p className="text-[10px] text-[#888]/50 font-mono mb-6">No spam. Operator-level content only.</p>

            {/* VAI alternative */}
            <div className="border-t border-[#1E1E1E] pt-6">
              <p className="text-xs text-[#888] mb-3 font-mono">Not ready for a PDF?</p>
              <button onClick={() => {
                // Trigger VonkamOS open via custom event
                const btn = document.querySelector('.vai-btn') as HTMLButtonElement;
                if (btn) btn.click();
              }}
                className="text-xs text-[#E8570A] font-mono font-bold hover:underline">
                Ask VAI directly →
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ ABOUT ═══ */}
      <Section id="about" className="py-32">
        <div className="max-w-[1000px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#E8570A] tracking-[0.2em] uppercase mb-4">ABOUT</p>
            <h2 className="text-3xl font-bold mb-6 leading-[1.15]" style={{ fontFamily: syne }}>
              Engineering-grade automation for serious operators.
            </h2>
            <p className="text-[#888] leading-relaxed mb-8">
              VONKAM is an AI systems studio. We don't sell subscriptions or templates — we architect and deploy custom automation infrastructure that scales with your operation.
            </p>

            {/* Credibility lines */}
            <div className="space-y-3 mb-8">
              {[
                "Production-grade systems, not templates",
                "Global team, always-on infrastructure",
                "Every system monitored and optimized post-deployment",
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#E8570A] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#ccc]">{line}</span>
                </div>
              ))}
            </div>

            {/* Accepting clients indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[11px] font-mono text-[#888] tracking-wider">We're currently accepting new clients</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-sm text-[#E8570A] font-mono hover:underline">Book a Call →</a>
              <a href="https://instagram.com/vonkamtech" target="_blank" rel="noopener noreferrer" className="text-sm text-[#888] font-mono hover:text-white transition-colors">@vonkamtech on Instagram</a>
            </div>
          </div>

          {/* Architecture diagram */}
          <div className="bg-[#111] border border-[#1E1E1E] rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {["Supabase", "Make.com", "GPT-4o", "CRM", "Instagram"].map((node, i, arr) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="border border-[#E8570A]/40 rounded px-3 py-2 text-xs font-mono text-[#ccc]">{node}</div>
                  {i < arr.length - 1 && <span className="text-[#E8570A]/60 text-xs font-mono">→</span>}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-[#888]/50 font-mono mt-6">Actual client system architecture</p>
          </div>
        </div>
      </Section>

      {/* ═══ PRE-FOOTER BANNER ═══ */}
      <section className="py-24 bg-[#080808] border-t border-[#1A1A1A]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-[1.15]" style={{ fontFamily: syne }}>
            Your competition is already automating.
          </h2>
          <p className="text-sm text-[#888] mb-10 leading-relaxed max-w-md mx-auto">
            The only question is whether you are building the infrastructure or falling behind it.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center bg-[#E8570A] text-white text-sm font-medium px-10 h-12 rounded hover:bg-[#ff6b1a] transition-colors active:scale-95"
            style={{ boxShadow: "0 0 20px rgba(232,87,10,0.15), 0 0 60px rgba(232,87,10,0.05)" }}>
            Book a Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#1A1A1A] bg-[#080808] py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div>
              <span className="text-base font-bold tracking-[0.15em] uppercase" style={{ fontFamily: syne }}>VONKAM</span>
              <p className="text-xs text-[#888] mt-1">© 2025 VONKAM Technologies.</p>
            </div>
            <div className="flex items-center gap-8">
              {["systems", "cases", "process", "about"].map((s) => (
                <button key={s} onClick={() => scrollTo(s)} className="text-xs text-[#888] hover:text-white transition-colors capitalize">
                  {s === "cases" ? "Use Cases" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E8570A] font-mono hover:underline">Book a Call →</a>
              <a href="https://instagram.com/vonkamtech" target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors">@vonkamtech</a>
            </div>
          </div>
          <p className="text-center text-xs text-[#888]/30 font-mono tracking-wider">Built Systems Don't Break.</p>
        </div>
      </footer>

      {/* ═══ CHATBOT ═══ */}
      <VonkamOS />
    </div>
  );
}