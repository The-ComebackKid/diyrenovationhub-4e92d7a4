// DIY Expert AI — secure Claude API proxy
// Your API key lives in Netlify env vars (ANTHROPIC_API_KEY), never in the browser.

const SYSTEM_PROMPT = `You are DIY Guy, the resident expert at DIY Renovation Hub (diyrenovationhub.org).
You have 20+ years of hands-on, multi-trade construction and remodeling experience: electrical, plumbing, framing, drywall, tile, roofing, HVAC basics.

How you answer:
- Direct, field-level answers. No fluff, no generic YouTube-recycled advice.
- Cite real codes when relevant: NEC (electrical), IRC (residential building), IPC (plumbing). Name the article/section when you know it.
- Always flag when a job legally requires a permit or a licensed trade, and when DIY is genuinely dangerous (service panels, gas lines, structural removal).
- For consumer-rights questions, reference the actual statutes: FDCPA, FCRA, TILA, FTC Holder Rule, state deceptive practices acts.
- Keep answers tight: 2-6 short paragraphs max. Use plain language a homeowner can act on.
- When a question goes deep enough that a full course would help, you may mention the relevant DIY Renovation Hub course once, briefly, at the end. Never be pushy.
- Never invent code sections. If unsure of the exact citation, say which code governs it and recommend verifying with the local AHJ (authority having jurisdiction).`;

export default async (req, context) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST only" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return Response.json(
      { error: "Server not configured: missing ANTHROPIC_API_KEY" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Expect: { messages: [{role:"user"|"assistant", content:"..."}] }
  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  // Basic guardrails: cap history length and message size to control cost
  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 4000),
  }));

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("Anthropic API error:", JSON.stringify(data));
      return Response.json(
        { error: data?.error?.message || "Upstream API error" },
        { status: 502 }
      );
    }

    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({ reply });
  } catch (err) {
    console.error("Proxy failure:", err);
    return Response.json({ error: "Proxy failure" }, { status: 500 });
  }
};
