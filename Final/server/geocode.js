// server/geocode.js
require("dotenv").config();


async function geocodeLocation({ country, state, city, zipCode }) {
  const queryParts = [city, state, zipCode, country].filter(Boolean).join(", ");

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    queryParts
  )}&key=${process.env.OPENCAGE_API_KEY}&limit=1`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Geocoding failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("No coordinates found for this location");
  }

  const { lat, lng } = data.results[0].geometry;

  return { lat, lon: lng };
}

module.exports = { geocodeLocation };
