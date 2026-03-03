"use client";

import { useEffect, useRef, useState } from "react";

export default function LeafletMap() {

  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {

    if (!mapRef.current) return;

    let map: any;
    let L: any;

    async function init() {

      L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      map = L.map(mapRef.current!).setView(
        [45.437, 12.335],
        13
      );

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap" }
      ).addTo(map);

      const routes = await fetch("/api/gtfs/routes.geojson").then(r => r.json());
      const shapes = await fetch("/api/gtfs/shapes.geojson").then(r => r.json());
      const stops = await fetch("/api/gtfs/stops.geojson").then(r => r.json());

      // Disegno linee con colore route
      shapes.features.forEach((shape: any) => {

        const route = routes.features.find(
          (r: any) => r.properties.route_id === shape.properties.route_id
        );

        const color = route?.properties.route_color
          ? "#" + route.properties.route_color
          : "#0066cc";

        L.geoJSON(shape, {
          style: {
            color,
            weight: 5
          }
        }).addTo(map);

      });

      // Fermate
      L.geoJSON(stops, {
        pointToLayer: (_: any, latlng: any) =>
          L.circleMarker(latlng, {
            radius: 4,
            color: "#000",
            fillColor: "#fff",
            fillOpacity: 1
          }),
        onEachFeature: (feature: any, layer: any) => {
          layer.bindPopup(`<b>${feature.properties.stop_name}</b>`);
        }
      }).addTo(map);

    }

    init();

    return () => {
      if (map) map.remove();
    };

  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: "100vh", width: "100%" }}
    />
  );
}