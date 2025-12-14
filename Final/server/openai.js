// server/openai.js
const OpenAI = require("openai");

// .env
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * chart: 来自 ephemeris.js 的星盘数据
 * 返回 { astrologyText, psychologicalProfile }
 */
async function generateAstroInterpretation(chart) {
  const prompt = `
You are an experienced Western astrologer and psychologist.
Given the following simplified natal chart data (planets and positions),
1) write a clear, friendly natal chart interpretation (max 600 words)
2) then write a short psychological profile (max 300 words).

Return in JSON with two keys: "astrologyText" and "psychologicalProfile".
Here is the chart data:
${JSON.stringify(chart, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert astrologer and psychologist.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;

  let parsed;

  if (typeof content === "string") {
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      parsed = {
        astrologyText: content,
        psychologicalProfile: "",
      };
    }
  } else if (typeof content === "object" && content !== null) {
    parsed = content;
  } else {
    parsed = {
      astrologyText: "",
      psychologicalProfile: "",
    };
  }

  return parsed;
}

module.exports = {
  generateAstroInterpretation,
};
