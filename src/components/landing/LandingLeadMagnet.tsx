import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function LandingLeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleClick() {
    console.log('button clicked');
    const val = email.trim();
    if (!val) return;
    setStatus("loading");
    try {
      const res = await fetch("https://yupktcbwimoxltamtsnj.supabase.co/rest/v1/email_leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cGt0Y2J3aW1veGx0YW10c25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjgwODEsImV4cCI6MjA4Mjk0NDA4MX0.QB8UPL14rxG2LgMdZAdI4iDKcsGGoKZfmjV_jDzHLxg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cGt0Y2J3aW1veGx0YW10c25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjgwODEsImV4cCI6MjA4Mjk0NDA4MX0.QB8UPL14rxG2LgMdZAdI4iDKcsGGoKZfmjV_jDzHLxg",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: val, source: "website" }),
      });
      if (res.ok || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        const err = await res.text();
        console.error("Error:", res.status, err);
        setStatus("error");
      }
    } catch (e) {
      console.error("Network error:", e);
      setStatus("error");
    }
  }

  return (
    <section className="py-48 relative">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Get the Automation Playbook</h2>
        <p className="text-muted-foreground mb-8">
          The 5 systems every scaling operator should have running — free PDF delivered to your inbox.
        </p>
        <div className="flex gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border bg-background text-sm"
            disabled={status === "loading"}
          />
          <button
            onClick={handleClick}
            disabled={status === "loading"}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium"
          >
            {status === "loading" ? "Sending..." : "Send It →"}
          </button>
        </div>
        {status === "success" && <p className="mt-4 text-orange-500">Check your inbox!</p>}
        {status === "error" && <p className="mt-4 text-red-500">Something went wrong. Try again.</p>}
      </div>
    </section>
  );
}
