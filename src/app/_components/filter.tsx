"use client";

import { useState } from "react";

export function Filter() {
  const [filter, setFilter] = useState("");

  return (
    <input
      type="text"
      className="w-full max-w-md rounded bg-white px-4 py-2 text-black outline-none"
      placeholder="Cerca..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
