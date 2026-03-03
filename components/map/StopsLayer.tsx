"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function StopsLayer() {

  const [stops, setStops] = useState<any>(null);
  const [times, setTimes] = useState<any>(null);
  const [leaflet, setLeaflet] = useState<any>(null);

  // carico leaflet solo nel client
  useEffect(() => {
    import("leaflet").then(setLeaflet);
  }, []);

  useEffect(() => {

    fetch("/api/gtfs/stops.geojson")
      .then(res => res.json())
      .then(setStops);

    fetch("/api/gtfs/stop_times.json")
      .then(res => res.json())
      .then(setTimes);

  }, []);

  if (!stops || !times || !leaflet) return null;

  return (
    <GeoJSON
      data={stops}
      pointToLayer={(feature: any, latlng) =>
        leaflet.circleMarker(latlng, {
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