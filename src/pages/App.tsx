import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ChipScroller } from "@/components/ChipScroller";
import { EventCard } from "@/components/EventCard";
import { CaseSheet } from "@/components/CaseSheet";
import { AiDrawer } from "@/components/AiDrawer";
import { mockGeo, mockCases } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  const [selectedCounty, setSelectedCounty] = useState("Miami-Dade");
  const [selectedZip, setSelectedZip] = useState("33147");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showAi, setShowAi] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-section">
      <AppHeader onAiClick={() => setShowAi(true)} onSearchChange={setSearchQuery} />

      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* County Selector */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">County</h2>
          <ChipScroller
            chips={countyChips}
            selected={selectedCounty}
            onSelect={setSelectedCounty}
            ariaLabel="Select county"
          />
        </div>

        {/* ZIP Selector */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">ZIP Code</h2>
          <ChipScroller
            chips={zipChips}
            selected={selectedZip}
            onSelect={setSelectedZip}
            ariaLabel="Select ZIP code"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="w-full justify-start bg-background border border-border">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="hot">Hot</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <div
              className="space-y-4"
              role="feed"
              aria-label="Case event feed"
              aria-live="polite"
            >
              {mockCases.map((caseItem) => (
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

          <TabsContent value="cases" className="mt-6">
            <div className="glass-card p-6">
              <p className="text-muted-foreground text-center">
                Cases table view coming soon
              </p>
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
        Viewing {selectedCounty} · {selectedZip} · {mockCases.length} cases
      </div>
    </div>
  );
}
