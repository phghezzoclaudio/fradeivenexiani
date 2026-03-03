"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ZoomTo({ geojson }: any) {
  const map = useMap();

  useEffect(() => {
    if (!geojson) return;
    const layer = L.geoJSON(geojson);
    map.fitBounds(layer.getBounds(), {
      padding: [40, 40]
    });
  }, [geojson, map]);

  return null;
}

export default function RoutesMap({
  selectedRoute
}: {
  selectedRoute: string | null;
}) {

  const [shapes, setShapes] = useState<any>(null);
  const [stops, setStops] = useState<any>(null);

  useEffect(() => {
    fetch("/api/gtfs/shapes.geojson")
      .then(r => r.json())
      .then(setShapes);

    fetch("/api/gtfs/stops.geojson")
      .then(r => r.json())
      .then(setStops);
  }, []);

  if (!shapes || !stops) return null;

  const filteredShapes = selectedRoute
    ? shapes.features.filter(
        (f: any) =>
          f.properties.route_id === selectedRoute
      )
    : shapes.features;

  const filteredStops = selectedRoute
    ? stops.features.filter(
        (f: any) =>
          f.properties.routes?.includes(selectedRoute)
      )
    : [];

  const geojson =
    selectedRoute
      ? { type: "FeatureCollection", features: filteredShapes }
      : null;

  return (
    <div style={{ flex: 1 }}>
      <MapContainer
        center={[45.437, 12.335]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={{
            type: "FeatureCollection",
            features: filteredShapes
          } as any}
          style={(f: any) => ({
            color: `#${f.properties.route_color || "0066cc"}`,
            weight: selectedRoute ? 6 : 3,
            opacity: selectedRoute &&
              f.properties.route_id !== selectedRoute
              ? 0.2
              : 1
          })}
        />

        {selectedRoute && (
          <GeoJSON
            data={{
              type: "FeatureCollection",
              features: filteredStops
            } as any}
            pointToLayer={(feature: any, latlng) =>
              L.circleMarker(latlng, { radius: 6 })
            }
            onEachFeature={(feature: any, layer) => {
              layer.bindPopup(`
                <b>${feature.properties.stop_name}</b>
              `);
            }}
          />
        )}

        {geojson && <ZoomTo geojson={geojson} />}
      </MapContainer>
    </div>
  );
}