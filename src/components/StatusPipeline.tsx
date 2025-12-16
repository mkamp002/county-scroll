import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/mockData";

interface StatusPipelineProps {
  selected: LeadStatus | "All";
  onSelect: (status: LeadStatus | "All") => void;
  counts: Record<LeadStatus | "All", number>;
}

const statuses: (LeadStatus | "All")[] = ["All", "Active", "Hot", "Signed", "Loan Mod", "Closed"];

const statusColors: Record<LeadStatus | "All", string> = {
  All: "bg-muted text-foreground",
  Active: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  Hot: "bg-primary/10 text-primary border-primary/30",
  Signed: "bg-verified/10 text-verified border-verified/30",
  "Loan Mod": "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Closed: "bg-muted text-muted-foreground border-muted",
};

export function StatusPipeline({ selected, onSelect, counts }: StatusPipelineProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Lead status filter">
      {statuses.map((status) => (
        <button
          key={status}
          role="tab"
          aria-selected={selected === status}
          onClick={() => onSelect(status)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
            selected === status
              ? cn(statusColors[status], "ring-2 ring-offset-2 ring-primary/20")
              : "bg-background border-border text-muted-foreground hover:border-primary/30"
          )}
        >
          {status}
          <span className="ml-2 text-xs opacity-70">({counts[status]})</span>
        </button>
      ))}
    </div>
  );
}
