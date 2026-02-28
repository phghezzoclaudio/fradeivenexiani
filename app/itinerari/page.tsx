"use client";

import { useEffect, useState } from "react";
import VaporettoMapClient from "@/component/map/VaporettoMapClient";

interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

interface PathPoint {
  lat: number;
  lon: number;
}

export default function ItinerariPage() {

  const [path, setPath] = useState<PathPoint[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {

    async function load() {

      const res = await fetch("/api/route");

      const data = await res.json();

      setPath(data.path || []);
      setStops(data.stops || []);

    }

    load();

  }, []);

  return (

    <div>

      <h1 className="text-2xl font-bold mb-4">
        Mappa Vaporetto
      </h1>

      <VaporettoMapClient
        path={path}
        stops={stops}
      />

    </div>

  );

}