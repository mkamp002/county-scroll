import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

interface DiagramNode {
  label: string;
  highlight?: boolean;
}

interface DiagramRow {
  nodes: DiagramNode[];
  branch?: {
    condition: string;
    paths: { label: string; target: string }[];
  };
}

function FlowDiagram({ title, caption, rows }: { title: string; caption: string; rows: DiagramRow[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/30 backdrop-blur-sm p-6 sm:p-8">
      <h3 className="text-sm font-display font-semibold mb-6 text-foreground">{title}</h3>
      <div className="flex flex-col items-center gap-0">
        {rows.map((row, ri) => (
          <div key={ri} className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-3">
              {row.nodes.map((node, ni) => (
                <div key={ni} className="flex items-center gap-3">
                  <div className={`px-4 py-2.5 rounded-md border text-xs font-mono ${
                    node.highlight
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/60 bg-card/60 text-muted-foreground"
                  }`}>
                    {node.label}
                  </div>
                  {ni < row.nodes.length - 1 && (
                    <div className="relative w-6 h-px bg-border/40">
                      <motion.div
                        className="absolute top-[-1px] h-[3px] w-[3px] rounded-full bg-primary"
                        animate={{ x: [0, 24] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {row.branch && (
              <div className="flex flex-col items-center mt-3">
                <div className="w-px h-4 bg-border/40" />
                <div className="text-[10px] text-primary/60 font-mono mb-2">{row.branch.condition}</div>
                <div className="flex gap-8">
                  {row.branch.paths.map((path, pi) => (
                    <div key={pi} className="flex flex-col items-center">
                      <div className="text-[9px] text-muted-foreground/40 font-mono mb-1">{path.label}</div>
                      <div className="w-px h-3 bg-border/40" />
                      <div className="px-3 py-2 rounded-md border border-border/40 bg-card/60 text-[10px] font-mono text-muted-foreground">
                        {path.target}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ri < rows.length - 1 && !row.branch && (
              <div className="relative w-px h-6 bg-border/40 my-1">
                <motion.div
                  className="absolute left-[-1px] w-[3px] h-[3px] rounded-full bg-primary"
                  animate={{ y: [0, 24] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground/30 font-mono text-center mt-6 tracking-wider">
        {caption}
      </p>
    </div>
  );
}

const diagram1: DiagramRow[] = [
  { nodes: [{ label: "County Records" }, { label: "Webhook" }, { label: "Supabase", highlight: true }, { label: "ML Scoring" }] },
  {
    nodes: [{ label: "Make.com Router", highlight: true }],
    branch: {
      condition: "SCORE > THRESHOLD",
      paths: [
        { label: "✓ Qualified", target: "CRM + Outreach" },
        { label: "✗ Unqualified", target: "Archive" },
      ],
    },
  },
];

const diagram2: DiagramRow[] = [
  { nodes: [{ label: "Supabase Trigger", highlight: true }] },
  { nodes: [{ label: "Make.com" }, { label: "GPT-4o (copy)" }] },
  { nodes: [{ label: "Replicate FLUX (image)" }, { label: "Bannerbear (design)" }] },
  { nodes: [{ label: "Instagram Graph API", highlight: true }] },
];

export function LandingArchitecture() {
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
            Architecture
          </motion.p>
          <motion.h2 variants={child} className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4 text-center leading-[1.15]">
            How Our Systems Are Wired
          </motion.h2>
          <motion.p variants={child} className="text-sm text-muted-foreground/60 text-center mb-14 max-w-lg mx-auto">
            Production architectures deployed for real operators. Not templates — engineered pipelines.
          </motion.p>

          <motion.div variants={child} className="grid md:grid-cols-2 gap-6">
            <FlowDiagram
              title="Real Estate Lead Pipeline"
              caption="Actual client system architecture"
              rows={diagram1}
            />
            <FlowDiagram
              title="Automated Content Engine"
              caption="Actual client system architecture"
              rows={diagram2}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}
