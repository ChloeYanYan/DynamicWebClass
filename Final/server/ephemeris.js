// server/ephemeris.js
const path = require("path");

// 动态 import ESM Module
async function loadSwe() {
  const mod = await import("swisseph-wasm");
  return mod.default; 
}

let swe = null;

// 创建实例 + 初始化 wasm
async function initSwe() {
  if (!swe) {
    const SwissEph = await loadSwe();
    swe = new SwissEph();
    await swe.initSwissEph(); 
  }
  return swe;
}

// 行星 ID
const PLANETS = [
  { id: 0, name: "sun" },
  { id: 1, name: "moon" },
  { id: 2, name: "mercury" },
  { id: 3, name: "venus" },
  { id: 4, name: "mars" },
  { id: 5, name: "jupiter" },
  { id: 6, name: "saturn" },
  { id: 7, name: "uranus" },
  { id: 8, name: "neptune" },
  { id: 9, name: "pluto" },
];

const SEFLG_SWIEPH = 2;

// 转儒略日
function toJulianDay(swe, { year, month, day, hour, minute }) {
  const ut = Number(hour) + Number(minute) / 60;
  return swe.julday(year, month, day, ut);
}

async function calculateNatalChart(birthTime, birthLocation) {
  console.log("➡️  calculateNatalChart input:", birthTime, birthLocation);

  swe = await initSwe();

  const jd = toJulianDay(swe, birthTime);

  const planets = {};
  for (const planet of PLANETS) {
    const result = swe.calc_ut(jd, planet.id, SEFLG_SWIEPH);

    planets[planet.name] = {
      longitude: result[0], // array: [lon, lat, dist, ...]
      latitude: result[1],
      distance: result[2],
    };
  }

  const chart = {
    julianDay: jd,
    location: birthLocation,
    planets,
  };

  console.log("✅ calculateNatalChart output:", chart);
  return chart;
}

module.exports = {
  calculateNatalChart,
};
