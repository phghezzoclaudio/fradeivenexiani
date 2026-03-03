"use client";

import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

type ZoomToRouteProps = {
  selectedRoute: string | null;
};

export default function ZoomToRoute({
  selectedRoute
}: ZoomToRouteProps) {

  const map = useMap();
  const [shapes, setShapes] = useState<any>(null);
  const [leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then(setLeaflet);
  }, []);

  useEffect(() => {
    fetch("/api/gtfs/shapes.geojson")
      .then(res => res.json())
      .then(setShapes);
  }, []);

  useEffect(() => {

    if (!selectedRoute || !shapes || !leaflet) return;

    const filtered = shapes.features.filter(
      (f: any) => f.properties.route_id === selectedRoute
    );

    if (filtered.length === 0) return;

    const layer = leaflet.geoJSON({
      type: "FeatureCollection",
      features: filtered
    });

    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }

  }, [selectedRoute, shapes, leaflet]);

  return null;
}