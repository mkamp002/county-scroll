import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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

  async function handleClick() {
    const emailValue = email.trim();
    if (!emailValue) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('https://tznxiotpvakpxkuihpwe.supabase.co/rest/v1/email_leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bnhpb3RwdmFrcHhrdWlocHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTY5NzgsImV4cCI6MjA1NjA5Mjk3OH0.QB8UPL14rxG2LgMdZAdI4iDKcsGGoKZfmjV_jDzHLxg',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bnhpb3RwdmFrcHhrdWlocHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTY5NzgsImV4cCI6MjA1NjA5Mjk3OH0.QB8UPL14rxG2LgMdZAdI4iDKcsGGoKZfmjV_jDzHLxg',
        },
        body: JSON.stringify({ email: emailValue, source: 'website' }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Submit failed:', res.status, errText);
        setStatusMessage({ text: "› Connection failed. Try again.", isError: true });
      } else {
        console.log('Email submitted successfully');
        setStatusMessage({ text: "Check your inbox!", isError: false });
        setEmail("");
        setTimeout(() => setStatusMessage(null), 5000);
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatusMessage({ text: "› Connection failed. Try again.", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 bg-background/50 border-border/60 text-sm h-11 ${
                  isSubmitting ? "animate-pulse border-orange-500" : ""
                }`}
                disabled={isSubmitting}
              />
              <Button
                type="button"
                onClick={handleClick}
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
            </div>
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
