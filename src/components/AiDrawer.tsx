import { useState } from "react";
import { X, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface AiDrawerProps {
  onClose: () => void;
}

const presets = [
  {
    id: "opener",
    label: "20-sec Opener",
    prompt: "Draft a 20-sec opener for {{owner_1}} at {{address}} referencing {{latest_event_desc}}.",
  },
  {
    id: "sms",
    label: "First Touch SMS",
    prompt: "3 compliant first-touch SMS under 160 chars.",
  },
  {
    id: "brief",
    label: "Brief VA",
    prompt: "Brief a VA: status, latest event, suggested next action.",
  },
];

export function AiDrawer({ onClose }: AiDrawerProps) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Mock AI response
    setTimeout(() => {
      setResult(
        `Hi {{owner_1}}, this is [Your Name] from [Company]. I noticed your property at {{address}} has a recent foreclosure filing. I specialize in helping homeowners explore their options before it's too late. Can we talk for just 2 minutes? I may be able to help.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-drawer-title"
    >
      <div
        className="fixed right-0 top-0 h-full w-full max-w-xl bg-background border-l border-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 id="ai-drawer-title" className="font-heading text-2xl font-bold">
                AI Assistant
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close AI assistant"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Quick Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset(preset.prompt)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="ai-prompt"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Your Prompt
              </label>
              <Textarea
                id="ai-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you need..."
                className="min-h-[120px] bg-background border-border"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="w-full gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate"}
            </Button>

            {result && (
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold">Result</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    aria-label="Copy result"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-verified" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
