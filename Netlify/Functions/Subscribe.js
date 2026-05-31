exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const { email, firstName, lastName, interest } = JSON.parse(event.body || "{}");
  if (!email) return { statusCode: 400, body: JSON.stringify({ error: "Email required" }) };
  const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
  const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
  try {
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`, "revision": "2024-02-15" },
      body: JSON.stringify({ data: { type: "profile", attributes: { email, first_name: firstName || "", last_name: lastName || "", properties: { interested_in: interest || "General", source: "DIYRenovationHub" } } } })
    });let profileId;
    if (profileRes.status === 201) {
      const profileData = await profileRes.json();
      profileId = profileData.data.id;
    } else if (profileRes.status === 409) {
      const conflictData = await profileRes.json();
      profileId = conflictData.errors?.[0]?.mereturn { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Subscribe error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
