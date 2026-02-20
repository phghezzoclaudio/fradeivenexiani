"use client";

import { useEffect, useState } from "react";

export default function TideDashboard() {
  const [tides, setTides] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/maree");
      const data = await res.json();
      setTides(data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Prossime Maree</h2>
      {tides.map((tide, i) => (
        <div key={i}>
          {tide.time} — {tide.value} cm
        </div>
      ))}
    </div>
  );
}