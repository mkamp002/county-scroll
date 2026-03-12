import { Search, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import vonkamLogo from "@/assets/vonkam-logo.png";

interface AppHeaderProps {
  onAiClick: () => void;
  onSearchChange: (value: string) => void;
}

export function AppHeader({ onAiClick, onSearchChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={vonkamLogo} alt="VONKAM" className="h-6 w-auto" />
            <span className="font-heading text-lg font-bold text-foreground">VONKAM</span>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search Properties, Contacts, Notes"
                className="pl-9 bg-background border-border"
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search cases"
              />
            </div>
          </div>

          <Button
            size="sm"
            onClick={onAiClick}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
