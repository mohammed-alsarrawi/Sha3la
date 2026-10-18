exports.chat = async (req, res) => {
  const { message, history } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const r = await fetch(`${process.env.AI_SERVICE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Key": process.env.AI_INTERNAL_KEY,
        "X-Auth-Token": req.cookies.token,
      },
      body: JSON.stringify({ message, history: history || [] }),
    });
    if (!r.ok) throw new Error(`AI service responded ${r.status}`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(502).json({ message: "Support assistant is unavailable right now" });
  }
};