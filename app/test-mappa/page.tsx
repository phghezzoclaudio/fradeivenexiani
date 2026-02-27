"use client";

import { useState } from "react";
import StopsAutocomplete from "@/component/routes/StopsAutocomplete";
import VaporettoMapClient from "@/component/map/VaporettoMapClient";

export default function TestMappa() {

  const [fromId, setFromId] = useState<string | null>(null);
  const [toId, setToId] = useState<string | null>(null);

  const [path, setPath] = useState<any[]>([]);
  const [stops, setStops] = useState<any[]>([]);

  async function searchRoute() {

    if (!fromId || !toId) return;

    console.log("Searching route:", fromId, toId);

    const res = await fetch(
      `/api/route-search?from=${fromId}&to=${toId}`
    );

    const data = await res.json();

    console.log("Route result:", data);

    setPath(data.path || []);
    setStops(data.stops || []);

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Cerca percorso vaporetto
      </h1>

      <div className="flex gap-4 mb-4">

        <StopsAutocomplete
          placeholder="Partenza"
          onChange={(id)=>setFromId(id)}
        />

        <StopsAutocomplete
          placeholder="Destinazione"
          onChange={(id)=>setToId(id)}
        />

        <button
          onClick={searchRoute}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cerca
        </button>

      </div>

      <VaporettoMapClient
        path={path}
        stops={stops}
      />

    </div>

  );

}