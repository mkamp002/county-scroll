import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Chip {
  id: string;
  label: string;
  sublabel?: string;
}

interface ChipScrollerProps {
  chips: Chip[];
  selected?: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}

export function ChipScroller({ chips, selected, onSelect, ariaLabel }: ChipScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollRef.current?.contains(document.activeElement)) return;

      const currentIndex = chips.findIndex((c) => c.id === selected);
      let newIndex = currentIndex;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        newIndex = Math.max(0, currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        newIndex = Math.min(chips.length - 1, currentIndex + 1);
      }

      if (newIndex !== currentIndex) {
        onSelect(chips[newIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chips, selected, onSelect]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      role="tablist"
      aria-label={ariaLabel}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          role="tab"
          aria-selected={selected === chip.id}
          onClick={() => onSelect(chip.id)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
            selected === chip.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-background text-muted-foreground hover:bg-card hover:text-foreground border border-border"
          )}
        >
          <div className="flex flex-col items-start">
            <span>{chip.label}</span>
            {chip.sublabel && (
              <span className="text-xs opacity-75">{chip.sublabel}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
