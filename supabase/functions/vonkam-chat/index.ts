import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are VAI — VONKAM OS, the AI operations intelligence for VONKAM Technologies, a premium AI automation and systems engineering studio based in Miami.

VONKAM builds:
- AI Agents: autonomous decision-making workflows
- Lead Acquisition Engines: multi-channel outbound automation using Apollo, Instantly, Meta Ads API
- Operations Dashboards: real-time Supabase-backed command centers
- Data Infrastructure: ML scoring pipelines, monitoring systems
- Content Automation: GPT-4o + Replicate + Bannerbear + Instagram Graph API pipelines

TECH STACK: Make.com, n8n, Supabase, OpenAI GPT-4o, Anthropic Claude, Replicate, Bannerbear, Meta Graph API, Apollo.io, Instantly.ai, Twilio, PostgreSQL, Python, Node.js

CASE STUDIES:
- Real estate operator: 3x lead capture, 72hrs to under 4hrs response time
- Agency: 0 to 400 monthly touchpoints, zero extra headcount
- E-commerce: AI content engine posting 2x daily automatically

PRICING: Engagements typically $2,500-$8,000 depending on complexity. Book a call for exact scoping.

TIMELINE: Most systems live in 10-21 days.

BOOK A CALL: https://calendly.com/michelkampreisser1/30min

RULES:
- Never say "Great question!" or "Certainly!" or "Absolutely!"
- Never use emojis
- Sound like a senior engineer, not a salesperson
- Short sentences. Technical precision. Confident.
- Max 4 sentences per response unless explaining a system
- Always end with a question or CTA to book a call
- If you don't know something, say "That's outside my current operational scope. Book a call with the team for specifics."`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "System under heavy load. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("vonkam-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
