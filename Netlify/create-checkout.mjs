// netlify/functions/create-checkout.js
// Creates a Stripe Checkout session for course purchases

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Course catalog — update prices here when needed
const COURSES = {
  "masterclass": {
    name: "Complete Home Renovation Masterclass",
    description: "12 modules. Every trade, every system, every code. End-to-end renovation education.",
    price: 19700, // in cents = $197.00
    mode: "payment"
  },
  "electrical": {
    name: "Residential Wiring Decoded",
    description: "NEC code basics, panel reads, circuit planning, AFCI/GFCI requirements.",
    price: 9700,
    mode: "payment"
  },
  "plumbing": {
    name: "Rough-In to Finish Plumbing",
    description: "Water supply, DWV systems, fixture installs, code setbacks, pressure testing.",
    price: 9700,
    mode: "payment"
  },
  "structural": {
    name: "Structural & Framing Fundamentals",
    description: "Headers, load paths, LVL beams, joist spans, shear walls — the structural backbone.",
    price: 9700,
    mode: "payment"
  },
  "tile": {
    name: "Tile, Stone & Waterproofing",
    description: "TCNA methods, membrane systems, substrate requirements, ANSI standards.",
    price: 9700,
    mode: "payment"
  },
  "investor": {
    name: "Renovation for Real Estate Investors",
    description: "Scope, budget, manage contractors, pull permits, force equity.",
    price: 14700,
    mode: "payment"
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { courseId, email } = JSON.parse(event.body || "{}");
  const course = COURSES[courseId];

  if (!course) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid course ID" }) };
  }

  const SITE_URL = process.env.SITE_URL || "https://diyrenovationhub.org";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: course.mode,
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
              description: course.description,
              metadata: { courseId }
            },
            unit_amount: course.price
          },
          quantity: 1
        }
      ],
      success_url: `${SITE_URL}/success.html?course=${courseId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/#services`,
      metadata: { courseId, source: "DIYRenovationHub" },
      // Automatically collect billing address for tax purposes
      billing_address_collection: "auto",
      // Allow promo codes
      allow_promotion_codes: true
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url, sessionId: session.id })
    };

  } catch (err) {
    console.error("Stripe error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create checkout session", detail: err.message })
    };
  }
};
