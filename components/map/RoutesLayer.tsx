"use client";

import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

type RoutesLayerProps = {
  selectedRoute: string | null;
};

export default function RoutesLayer({
  selectedRoute
}: RoutesLayerProps) {

  const [shapes, setShapes] = useState<any>(null);

  useEffect(() => {

    fetch("/api/gtfs/shapes.geojson")
      .then(async res => {
        if (!res.ok) throw new Error("Errore API shapes");
        return res.json();
      })
      .then(setShapes)
      .catch(console.error);

  }, []);

  if (!shapes) return null;

  const features = selectedRoute
    ? shapes.features.filter(
        (f: any) => f.properties.route_id === selectedRoute
      )
    : shapes.features;

  return (
    <GeoJSON
      data={{
        type: "FeatureCollection",
        features
      } as any}
      style={{
        color: "#0066cc",
        weight: 4
      }}
    />
  );
}