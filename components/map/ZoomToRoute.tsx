"use client";

import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

type ZoomToRouteProps = {
  selectedRoute: string | null;
};

export default function ZoomToRoute({
  selectedRoute
}: ZoomToRouteProps) {

  const map = useMap();
  const [shapes, setShapes] = useState<any>(null);

  // Carico shapes una sola volta
  useEffect(() => {

    fetch("/api/gtfs/shapes.geojson")
      .then(res => res.json())
      .then(setShapes)
      .catch(console.error);

  }, []);

  // Zoom quando cambia selectedRoute
  useEffect(() => {

    if (!selectedRoute || !shapes) return;

    const filtered = shapes.features.filter(
      (f: any) => f.properties.route_id === selectedRoute
    );

    if (filtered.length === 0) return;

    const layer = L.geoJSON({
      type: "FeatureCollection",
      features: filtered
    } as any);

    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }

  }, [selectedRoute, shapes]); // 👈 TOLTO map

  return null;
}