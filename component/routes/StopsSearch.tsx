"use client";

import { useState, useEffect } from "react";

interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

interface Props {
  onRoute: (route: any) => void;
}

export default function StopsSearch({ onRoute }: Props) {

  const [stops, setStops] = useState<Stop[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {

    fetch("/api/stops")
      .then(res => res.json())
      .then((data: Stop[]) => {
        setStops(data);
      });

  }, []);

  async function search() {

    const fromStop = stops.find(
      (s: Stop) =>
        s.stop_name.toLowerCase().includes(from.toLowerCase())
    );

    const toStop = stops.find(
      (s: Stop) =>
        s.stop_name.toLowerCase().includes(to.toLowerCase())
    );

    if (!fromStop || !toStop) {
      alert("Fermata non trovata");
      return;
    }

    const res = await fetch(
      `/api/route-search?from=${fromStop.stop_id}&to=${toStop.stop_id}`
    );

    const route = await res.json();

    onRoute(route);
  }

  return (
    <div className="space-y-3">

      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="Partenza (es. Rialto)"
        className="w-full border rounded px-3 py-2"
      />

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Destinazione (es. San Marco)"
        className="w-full border rounded px-3 py-2"
      />

      <button
        onClick={search}
        className="w-full bg-venice-red text-white py-2 rounded"
      >
        Cerca percorso
      </button>

    </div>
  );
}