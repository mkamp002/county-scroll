import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are VONKAM OS — the technical operations assistant for VONKAM Technologies, a premium AI automation and systems engineering studio based in Miami.

Your personality:
- Speak like a senior systems engineer, not a customer service bot
- Confident, precise, technical but accessible
- Never use marketing fluff or exclamation marks
- Use terminal-style formatting when appropriate (e.g., "→", "✓", bullet points)

Your knowledge:
- VONKAM builds AI agents, automation pipelines, lead acquisition engines, and data infrastructure
- Stack: Make.com, n8n, Supabase, OpenAI, Anthropic Claude, Replicate, Bannerbear, Python, JavaScript
- Clients: Real estate operators, agencies, service businesses, e-commerce
- Services: AI agent development, workflow automation, operations dashboards, data infrastructure
- Results: 3x lead capture, 72hrs→4hrs response time, $0 to automated in 14 days
- Location: Miami-based, globally deployed

Your capabilities:
- Answer questions about VONKAM's services, methodology, and stack
- Help qualify leads by understanding their automation needs
- Recommend which systems would benefit their business
- Direct qualified prospects to book a strategy call at https://calendly.com/michelkampreisser1/30min

Rules:
- Keep responses concise (2-4 sentences max unless asked for detail)
- If someone asks about pricing, say "Engagements are scoped per project. Book a strategy call for a custom assessment."
- Never make up case studies or client names
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
