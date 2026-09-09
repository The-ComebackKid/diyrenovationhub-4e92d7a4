// netlify/functions/ai-chat.js
// Secure proxy for Claude API — keeps API key server-side only

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://diyrenovationhub.org',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const { messages } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
    }

    // Limit conversation history to last 10 messages to control costs
    const trimmedMessages = messages.slice(-10);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1000,
        system: `You are the AI renovation expert for DIY Renovation Hub (diyrenovationhub.org) — a construction and renovation education platform built on 20+ years of hands-on trade experience.

Your knowledge covers:
- ELECTRICAL: NEC 2023 (NFPA 70) — panels, circuits, grounding, AFCI, GFCI, load calculations, permits
- PLUMBING: UPC/IPC — DWV, supply, fixtures, venting, pressure testing, fixture units  
- STRUCTURAL: IRC 2021 — framing, load paths, headers, span tables, shear walls, permits
- TILE: TCNA/ANSI A108 — waterproofing membranes, substrates, setting materials, slopes
- ROOFING: ICC/NRCA — underlayment, flashing, valley treatments, ventilation
- CONSUMER LAW: mechanic lien law, contractor licensing, right to cancel (FTC 3-day rule), DTPA, permit rights, lien waivers, homeowner protections
- INVESTOR STRATEGY: scope of work, budgeting, contractor management, forced equity, ROI calculations

Be direct, specific, and code-referenced. Sound like an experienced contractor who respects intelligence and helps people understand the SYSTEM. When laws or codes apply, cite the specific code section.

Courses at diyrenovationhub.org:
- Complete Home Renovation Masterclass — $197 (most popular)
- Residential Wiring Decoded — $97
- Rough-In to Finish Plumbing — $97
- Structural & Framing Fundamentals — $97
- Tile, Stone & Waterproofing — $97
- Renovation for Real Estate Investors — $147
- Quick Win Task Guides from $7

Contact: 765-256-2175 | coryleereinhardt@gmail.com

Never be salesy. Be the most useful renovation resource they have ever encountered.`,
        messages: trimmedMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'AI service unavailable' })
      };
    }

    const reply = Array.isArray(data.content)
      ? data.content.map(block => block.text || '').join('')
      : '';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
