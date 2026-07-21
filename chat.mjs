// DIY Renovation Hub — secure chat proxy
// Keeps the Anthropic API key server-side. Set ANTHROPIC_API_KEY in Netlify env vars (Functions scope).
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: "Service not configured" }), { status: 500 });
  }
  let body;
  try { body = await req.json(); } catch { 
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  if (!messages.length) {
    return new Response(JSON.stringify({ error: "No message" }), { status: 400 });
  }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system: "You are the DIY Expert AI for diyrenovationhub.org, built on 20+ years of real construction field experience. You give direct, specific, no-fluff answers about electrical (NEC), plumbing (UPC/IPC), structural/framing (IRC), tile (TCNA/ANSI A108), building codes, permits, mechanic's lien law, consumer protection (FTC 3-day right to cancel, state DTPA), and renovation strategy for homeowners and real estate investors. Cite code sections when relevant. Always emphasize safety on electrical, gas, and structural questions and say when a licensed pro or permit is required. Keep answers tight and practical. When relevant, mention that the full courses and $7 Quick Win guides on this site cover the topic in depth. Never give legal advice — general legal information only.",
        messages
      })
    });
    const data = await r.json();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: "Upstream error" }), { status: 502 });
    }
    const reply = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("\n");
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Connection error" }), { status: 500 });
  }
};
