"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

export default function StopsLayer() {

  const [stops, setStops] = useState<any>(null);
  const [times, setTimes] = useState<any>(null);

  useEffect(() => {

    fetch("/api/gtfs/stops.geojson")
      .then(async res => {
        if (!res.ok) throw new Error("Errore API stops");
        return res.json();
      })
      .then(setStops)
      .catch(console.error);

    fetch("/api/gtfs/stop_times.json")
      .then(async res => {
        if (!res.ok) throw new Error("Errore API stop_times");
        return res.json();
      })
      .then(setTimes)
      .catch(console.error);

  }, []);

  if (!stops || !times) return null;

  return (
    <GeoJSON
      data={stops}
      pointToLayer={(feature: any, latlng) =>
        L.circleMarker(latlng, {
          radius: 4,
          color: "#000",
          fillColor: "#fff",
          fillOpacity: 1
        })
      }
      onEachFeature={(feature: any, layer: any) => {

        const stopId = feature.properties.stop_id;
        const stopTimes = times[stopId] || [];

        const popup = stopTimes
          .slice(0, 5)
          .map((t: any) => t.departure)
          .join("<br>");

        layer.bindPopup(`
          <b>${feature.properties.stop_name}</b>
          <br>${popup}
        `);

      }}
    />
  );
}