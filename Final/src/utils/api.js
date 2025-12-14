// src/utils/api.js
const API_BASE = "http://localhost:4000/api";

export async function fetchAstroResult(birthTime, birthLocation) {
  const res = await fetch(`${API_BASE}/natal-chart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ birthTime, birthLocation }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }

  return res.json();
}
