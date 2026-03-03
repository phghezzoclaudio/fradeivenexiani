"use client";

import { useEffect, useRef } from "react";

export default function LeafletMap() {

  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null); 

  useEffect(() => {

    if (!mapRef.current) return;

    
    if (leafletMapRef.current) return;

    let L: any;

    async function init() {

      L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!).setView(
        [45.437, 12.335],
        13
      );

      leafletMapRef.current = map; 

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap" }
      ).addTo(map);

      const shapes = await fetch("/api/gtfs/shapes.geojson")
        .then(r => r.json());

      L.geoJSON(shapes, {
        style: {
          color: "#0066cc",
          weight: 5
        }
      }).addTo(map);

      const stops = await fetch("/api/gtfs/stops.geojson")
        .then(r => r.json());

      L.geoJSON(stops, {
        pointToLayer: (_: any, latlng: any) =>
          L.circleMarker(latlng, {
            radius: 4,
            color: "#000",
            fillColor: "#fff",
            fillOpacity: 1
          }),
        onEachFeature: (feature: any, layer: any) => {
          layer.bindPopup(
            `<b>${feature.properties.stop_name}</b>`
          );
        }
      }).addTo(map);

    }

    init();

  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: "100vh", width: "100%" }}
    />
  );
}