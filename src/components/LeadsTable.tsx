import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/Badge";
import { Phone, Mail, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/mockData";

interface Lead {
  id: string;
  case_number: string;
  filing_date: string;
  status: LeadStatus;
  doc_type: string;
  owner_1: string;
  situs_address: string;
  lead_score: number;
  phones_verified: number;
  phones_total: number;
  emails_verified: number;
  emails_total: number;
  amount_owed: number;
  next_action: string;
  last_touch: string | null;
}

interface LeadsTableProps {
  leads: Lead[];
  onSelectLead: (id: string) => void;
  sortField: string;
  sortDir: "asc" | "desc";
  onSort: (field: string) => void;
}

const statusBadgeVariant: Record<LeadStatus, "verified" | "invalid" | "unknown" | "hot" | "clerk"> = {
  Active: "clerk",
  Hot: "hot",
  Signed: "verified",
  "Loan Mod": "unknown",
  Closed: "unknown",
};

function SortIcon({ field, sortField, sortDir }: { field: string; sortField: string; sortDir: "asc" | "desc" }) {
  if (field !== sortField) return null;
  return sortDir === "asc" ? (
    <ChevronUp className="h-4 w-4 inline ml-1" />
  ) : (
    <ChevronDown className="h-4 w-4 inline ml-1" />
  );
}

export function LeadsTable({ leads, onSelectLead, sortField, sortDir, onSort }: LeadsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                onClick={() => onSort("lead_score")}
              >
                Score <SortIcon field="lead_score" sortField={sortField} sortDir={sortDir} />
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                onClick={() => onSort("case_number")}
              >
                Case # <SortIcon field="case_number" sortField={sortField} sortDir={sortDir} />
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                onClick={() => onSort("filing_date")}
              >
                Filed <SortIcon field="filing_date" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Doc Type
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                onClick={() => onSort("owner_1")}
              >
                Owner <SortIcon field="owner_1" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Address
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                onClick={() => onSort("amount_owed")}
              >
                Amount <SortIcon field="amount_owed" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Phones
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Emails
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Next Action
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Last Touch
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-muted/20 cursor-pointer transition-colors"
                onClick={() => onSelectLead(lead.id)}
              >
                <td className="px-4 py-4">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      lead.lead_score >= 8
                        ? "bg-primary/20 text-primary"
                        : lead.lead_score >= 6
                        ? "bg-amber-500/20 text-amber-600"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {lead.lead_score}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-mono text-foreground">{lead.case_number}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {format(new Date(lead.filing_date), "MM/dd/yy")}
                </td>
                <td className="px-4 py-4">
                  <Badge variant={statusBadgeVariant[lead.status]}>{lead.status}</Badge>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{lead.doc_type}</td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{lead.owner_1}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                  {lead.situs_address}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">
                  {formatCurrency(lead.amount_owed)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-verified">{lead.phones_verified}</span>
                    <span className="text-muted-foreground">/ {lead.phones_total}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-verified">{lead.emails_verified}</span>
                    <span className="text-muted-foreground">/ {lead.emails_total}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-primary font-medium">{lead.next_action}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {lead.last_touch
                    ? formatDistanceToNow(new Date(lead.last_touch), { addSuffix: true })
                    : "—"}
                </td>
                <td className="px-4 py-4">
                  <button
                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                    aria-label="View lead details"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead.id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
