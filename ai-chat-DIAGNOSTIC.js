// netlify/functions/ai-chat.js
// Secure proxy for Claude API — keeps API key server-side only
//
// DIAGNOSTIC BUILD: returns specific, readable error reasons (missing key,
// Anthropic status code, etc.) instead of a generic message, so the actual
// failure is visible without needing to read Netlify's function logs.
// Once the chat is confirmed working, this can be reverted to hide detail.

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
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'DIAG: ANTHROPIC_API_KEY is missing/undefined in this function\'s environment.' })
      };
    }

    const { messages } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
    }

    // Limit conversation history to last 10 messages to control costs
    const trimmedMessages = messages.slice(-10);

    let response;
    try {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
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
    } catch (fetchErr) {
      console.error('Network error calling Anthropic:', fetchErr);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'DIAG: network error reaching api.anthropic.com — ' + (fetchErr.message || String(fetchErr)) })
      };
    }

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Anthropic returned non-JSON:', rawText.slice(0, 500));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: `DIAG: Anthropic responded with status ${response.status} and non-JSON body: ${rawText.slice(0, 200)}` })
      };
    }

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      const msg = (data && data.error && data.error.message) ? data.error.message : JSON.stringify(data);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: `DIAG: Anthropic API returned ${response.status} (${data && data.error && data.error.type}): ${msg}` })
      };
    }

    const reply = Array.isArray(data.content)
      ? data.content.map(block => block.text || '').join('')
      : '';

    if (!reply) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'DIAG: Anthropic returned 200 OK but no usable text content. Raw: ' + JSON.stringify(data).slice(0, 300) })
      };
    }

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
      body: JSON.stringify({ error: 'DIAG: unhandled function error — ' + (err && err.message ? err.message : String(err)) })
    };
  }
};
