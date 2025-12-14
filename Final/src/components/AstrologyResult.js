// src/components/AstrologyResult.js
import React from "react";

function AstrologyResult({ result }) {
  if (!result) return null;


  const astrologyText = result.ai?.astrologyText ?? result.astrologyText ?? "";
  const psychologicalProfile =
    result.ai?.psychologicalProfile ?? result.psychologicalProfile ?? "";

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Astrology Results</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Natal Chart Interpretation</h3>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {astrologyText || "No astrology text available."}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Psychological profile</h3>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {psychologicalProfile || "No profile available."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AstrologyResult;
