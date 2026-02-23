"use client";

import { useEffect, useState } from "react";

interface Stop {
  id: string;
  name: string;
}

interface Props {
  onSearch: (from: string, to: string) => void;
}

export default function TransportSearch({ onSearch }: Props) {
  const [stops, setStops] = useState<Stop[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    fetch("/api/stops")
      .then(res => res.json())
      .then(data => setStops(data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl">

      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full p-4 rounded-xl border mb-4"
      >
        <option value="">Seleziona partenza</option>
        {stops.map((stop) => (
          <option key={stop.id} value={stop.id}>
            {stop.name}
          </option>
        ))}
      </select>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-4 rounded-xl border mb-4"
      >
        <option value="">Seleziona arrivo</option>
        {stops.map((stop) => (
          <option key={stop.id} value={stop.id}>
            {stop.name}
          </option>
        ))}
      </select>

      <button
        disabled={!from || !to}
        onClick={() => onSearch(from, to)}
        className="w-full bg-[var(--rosso-veneziano)] text-white py-4 rounded-2xl font-semibold disabled:opacity-50"
      >
        Cerca percorso
      </button>
    </div>
  );
}