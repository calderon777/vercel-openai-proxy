export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)  // <--- use full body
    });

    const data = await completion.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "OpenAI request failed", details: err.message });
  }
}
