"use client";

import { useState, useEffect } from "react";

export default function StopsSearch({ onRoute }: any) {

  const [stops, setStops] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {

    fetch("/api/stops")
      .then(r => r.json())
      .then(setStops);

  }, []);

  async function search() {

    const fromStop =
      stops.find((s:any)=>s.stop_name===from);

    const toStop =
      stops.find((s:any)=>s.stop_name===to);

    if (!fromStop || !toStop) return;

    const res =
      await fetch(
        `/api/route-search?from=${fromStop.stop_id}&to=${toStop.stop_id}`
      );

    const data = await res.json();

    onRoute(data);

  }

  return (
    <div className="space-y-2">

      <input
        placeholder="Partenza"
        className="w-full border p-2 rounded"
        value={from}
        onChange={e=>setFrom(e.target.value)}
      />

      <input
        placeholder="Destinazione"
        className="w-full border p-2 rounded"
        value={to}
        onChange={e=>setTo(e.target.value)}
      />

      <button
        onClick={search}
        className="bg-venice-red text-white px-4 py-2 rounded"
      >
        Cerca
      </button>

    </div>
  );

}