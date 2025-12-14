// server/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { calculateNatalChart } = require("./ephemeris");
const { generateAstroInterpretation } = require("./openai");
const { geocodeLocation } = require("./geocode");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/natal-chart", async (req, res) => {
  try {
    console.log("📩 /api/natal-chart body:", req.body);

    const { birthTime, birthLocation } = req.body;
    if (!birthTime || !birthLocation) {
      return res
        .status(400)
        .json({ error: "Missing birthTime or birthLocation" });
    }

    // 用 geocode 函数算出经纬度
    const { lat, lon } = await geocodeLocation(birthLocation);
    console.log("✅ Geocoded location:", { lat, lon });

    const chart = await calculateNatalChart(birthTime, { lat, lon });
    console.log("✅ Natal chart:", chart);

    const aiResult = await generateAstroInterpretation(chart);
    console.log("✅ AI result:", aiResult);

    res.json({
      chart,
      ai: aiResult,
    });
  } catch (err) {
    console.error("❌ ERROR in /api/natal-chart:", err);
    res.status(500).json({
      error: err.message || "Server error",
      stack: err.stack,
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
