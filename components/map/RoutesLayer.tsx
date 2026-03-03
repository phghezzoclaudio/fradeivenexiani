"use client";

import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection, LineString } from "geojson";

interface Props {
  selectedRoute: string | null;
}

export default function RoutesLayer({ selectedRoute }: Props) {
  const [data, setData] =
    useState<FeatureCollection<LineString> | null>(null);

  useEffect(() => {
    fetch("/api/gtfs/shapes.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        setData(geojson);
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  // 🔎 Filtra per linea selezionata
  const features = selectedRoute
    ? data.features.filter(
        (f: any) => f.properties?.route_id === selectedRoute
      )
    : data.features;

  return (
  <GeoJSON
    data={{
      type: "FeatureCollection",
      features: features
    } as any}
    style={(feature: any) => ({
      color:
        selectedRoute &&
        feature.properties?.route_id === selectedRoute
          ? "#e60000"
          : "#0066cc",
      weight:
        selectedRoute &&
        feature.properties?.route_id === selectedRoute
          ? 6
          : 3,
      opacity: 0.9,
    })}
    onEachFeature={(feature: any, layer) => {
      const name =
        feature.properties?.route_long_name ||
        feature.properties?.route_short_name ||
        feature.properties?.route_id;

      layer.bindPopup(`<b>Linea:</b> ${name}`);
    }}
  />
);
}