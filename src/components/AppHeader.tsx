import { Search, Flame, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AppHeaderProps {
  onAiClick: () => void;
  onSearchChange: (value: string) => void;
}

export function AppHeader({ onAiClick, onSearchChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-section/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="font-heading text-lg font-bold">PROJECT VON</span>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search cases, owners, addresses..."
                className="pl-9 bg-card/50 border-border"
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search cases"
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onAiClick}
            className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
