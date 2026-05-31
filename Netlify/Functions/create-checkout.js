const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const COURSES = {
  "masterclass": { name: "Complete Home Renovation Masterclass", price: 19700, mode: "payment" },
  "electrical": { name: "Residential Wiring Decoded", price: 9700, mode: "payment" },
  "plumbing": { name: "Rough-In to Finish Plumbing", price: 9700, mode: "payment" },
  "structural": { name: "Structural & Framing Fundamentals", price: 9700, mode: "payment" },
  "tile": { name: "Tile, Stone & Waterproofing", price: 9700, mode: "payment" },
  "investor": { name: "Renovation for Real Estate Investors", price: 14700, mode: "payment" }
};exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const { courseId, email } = JSON.parse(event.body || "{}");
  const course = COURSES[courseId];
  if (!course) return { statusCode: 400, body: JSON.stringify({ error: "Invalid course ID" }) };
  const SITE_URL = process.env.SITE_URL || "https://diyrenovationhub.org";
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"]return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error("Stripe error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to create checkout session" }) };
  }
};
