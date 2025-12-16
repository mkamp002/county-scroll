import { useState, useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ChipScroller } from "@/components/ChipScroller";
import { EventCard } from "@/components/EventCard";
import { CaseSheet } from "@/components/CaseSheet";
import { AiDrawer } from "@/components/AiDrawer";
import { StatusPipeline } from "@/components/StatusPipeline";
import { LeadsTable } from "@/components/LeadsTable";
import { mockGeo, mockCases, LeadStatus } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  const [selectedCounty, setSelectedCounty] = useState("Miami-Dade");
  const [selectedZip, setSelectedZip] = useState("33147");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showAi, setShowAi] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [sortField, setSortField] = useState("lead_score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const currentCountyData = mockGeo.counties.find((c) => c.name === selectedCounty);
  const zipChips =
    currentCountyData?.zips.map((z) => ({
      id: z.zip,
      label: z.zip,
      sublabel: `${z.cases_count} cases`,
    })) || [];

  const countyChips = mockGeo.counties.map((c) => ({
    id: c.name,
    label: c.name,
    sublabel: undefined,
  }));

  // Filter and sort cases
  const filteredCases = useMemo(() => {
    let cases = [...mockCases];

    // Filter by status
    if (statusFilter !== "All") {
      cases = cases.filter((c) => c.status === statusFilter);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cases = cases.filter(
        (c) =>
          c.owner_1.toLowerCase().includes(q) ||
          c.situs_address.toLowerCase().includes(q) ||
          c.case_number.toLowerCase().includes(q)
      );
    }

    // Sort
    cases.sort((a, b) => {
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

    return cases;
  }, [statusFilter, searchQuery, sortField, sortDir]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const counts: Record<LeadStatus | "All", number> = {
      All: mockCases.length,
      Active: 0,
      Hot: 0,
      Signed: 0,
      "Loan Mod": 0,
      Closed: 0,
    };
    mockCases.forEach((c) => {
      counts[c.status]++;
    });
    return counts;
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  return (
    <div className="min-h-screen bg-section">
      <AppHeader onAiClick={() => setShowAi(true)} onSearchChange={setSearchQuery} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* County & ZIP Selectors */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">County</h2>
            <ChipScroller
              chips={countyChips}
              selected={selectedCounty}
              onSelect={setSelectedCounty}
              ariaLabel="Select county"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">ZIP Code</h2>
            <ChipScroller
              chips={zipChips}
              selected={selectedZip}
              onSelect={setSelectedZip}
              ariaLabel="Select ZIP code"
            />
          </div>
        </div>

        {/* Status Pipeline */}
        <StatusPipeline
          selected={statusFilter}
          onSelect={setStatusFilter}
          counts={statusCounts}
        />

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full justify-start bg-background border border-border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="hot">Hot Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <LeadsTable
              leads={filteredCases}
              onSelectLead={setSelectedCase}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </TabsContent>

          <TabsContent value="feed" className="mt-6">
            <div
              className="space-y-4"
              role="feed"
              aria-label="Case event feed"
              aria-live="polite"
            >
              {filteredCases.map((caseItem) => (
                <EventCard
                  key={caseItem.id}
                  title={caseItem.latest_event_desc}
                  timeAgo={caseItem.latest_event_at}
                  owner={caseItem.owner_1}
                  address={caseItem.situs_address}
                  isHot={caseItem.lead_score >= 7}
                  phonesVerified={caseItem.phones_verified}
                  phonesTotal={caseItem.phones_total}
                  isClerkVerified={true}
                  onClick={() => setSelectedCase(caseItem.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hot" className="mt-6">
            <div className="space-y-4">
              {mockCases
                .filter((c) => c.lead_score >= 7)
                .map((caseItem) => (
                  <EventCard
                    key={caseItem.id}
                    title={caseItem.latest_event_desc}
                    timeAgo={caseItem.latest_event_at}
                    owner={caseItem.owner_1}
                    address={caseItem.situs_address}
                    isHot={true}
                    phonesVerified={caseItem.phones_verified}
                    phonesTotal={caseItem.phones_total}
                    isClerkVerified={true}
                    onClick={() => setSelectedCase(caseItem.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Case Sheet Drawer */}
      {selectedCase && (
        <CaseSheet caseId={selectedCase} onClose={() => setSelectedCase(null)} />
      )}

      {/* AI Drawer */}
      {showAi && <AiDrawer onClose={() => setShowAi(false)} />}

      {/* Accessibility live region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Viewing {selectedCounty} · {selectedZip} · {filteredCases.length} cases
      </div>
    </div>
  );
}
