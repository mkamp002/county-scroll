import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function LandingLeadMagnet() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.trim();
    
    if (!emailValue) return;

    // Validate email format
    if (!validateEmail(emailValue)) {
      setStatusMessage({ text: "› Invalid email format.", isError: true });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    console.log('Submitting email:', emailValue);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('submit-email-lead', {
        body: { email: emailValue, source: 'website' },
      });

      console.log('Edge function response:', data, fnError);

      setIsSubmitting(false);

      if (error) {
        console.error('Supabase insert failed:', error.message, error.details, error.hint);
        setStatusMessage({ text: "› Connection failed. Try again.", isError: true });
      } else {
        setStatusMessage({ text: "› Check your inbox!", isError: false });
        setEmail("");
        
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      }
    } catch (err) {
      console.error('Network error:', err);
      setIsSubmitting(false);
      setStatusMessage({ text: "› Connection failed. Try again.", isError: true });
    }
  };

  return (
    <section className="py-48 relative grid-bg-subtle">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-xl mx-auto"
        >
          <motion.div
            variants={child}
            className="rounded-xl border border-primary/15 bg-card/80 p-10 sm:p-14 text-center lead-magnet-card"
          >
            <p className="text-[11px] font-medium text-primary/70 tracking-[0.25em] uppercase mb-5">
              Free Resource
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4">
              Get the Automation Playbook
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
              The 5 systems every scaling operator should have running — free PDF delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 bg-background/50 border-border/60 text-sm h-11 ${
                  isSubmitting ? "animate-pulse border-orange-500" : ""
                }`}
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="h-11 px-6 text-sm font-medium glow-button shrink-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "[ SENDING... ]" : (
                  <>
                    Send It
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            {statusMessage && (
              <p 
                className={`mt-4 text-sm font-mono ${
                  statusMessage.isError ? "text-red-500" : "text-orange-500"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {statusMessage.text}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-separator" />
    </section>
  );
}