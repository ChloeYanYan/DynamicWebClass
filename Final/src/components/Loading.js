// src/components/Loading.js
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
      <span className="ml-3 text-sm text-gray-600">Generating...</span>
    </div>
  );
}

export default Loading;
