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
import type { FeatureCollection } from "geojson";

function ZoomTo({ geojson }: { geojson: FeatureCollection }) {

  const map = useMap();

  useEffect(() => {

    const layer = L.geoJSON(geojson);

    map.fitBounds(layer.getBounds(), {
      padding: [80, 80]
    });

  }, [geojson, map]);

  return null;
}

export default function RoutesMap({
  selectedRoute
}: {
  selectedRoute: string | null;
}) {

  const [shapes, setShapes] =
    useState<FeatureCollection | null>(null);

  const [stops, setStops] =
    useState<FeatureCollection | null>(null);

  const [todayStopTimes, setTodayStopTimes] =
    useState<Record<string, any[]>>({});

  const [stopRoutes, setStopRoutes] =
    useState<Record<string, string[]>>({});

  useEffect(() => {

    fetch("/api/routes-data")
      .then(r => r.json())
      .then(data => {

        setShapes(data.shapes);
        setStops(data.stops);
        setTodayStopTimes(data.todayStopTimes);
        setStopRoutes(data.stopRoutes);

      });

  }, []);

  if (!shapes || !stops) return null;

  // 🔵 percorso linea
  const filteredShapes: FeatureCollection = {
    type: "FeatureCollection",
    features: shapes.features.filter(
      (f: any) =>
        selectedRoute &&
        f.properties.route_id === selectedRoute
    )
  };

  // 🔵 fermate della linea
  const filteredStops: FeatureCollection = {
    type: "FeatureCollection",
    features: stops.features.filter((f: any) => {

      if (!selectedRoute) return false;

      const routes =
        stopRoutes[f.properties.stop_id];

      return routes?.includes(selectedRoute);

    })
  };

  return (
    <div style={{ flex: 1 }}>

      <MapContainer
        center={[45.437, 12.335]}
        zoom={13}
        style={{
          height: "100%",
          width: "100%"
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* LINEA */}
        {selectedRoute && (
          <GeoJSON
            data={filteredShapes}
            style={(f: any) => ({
              color: `#${f.properties.route_color || "0066cc"}`,
              weight: 6
            })}
          />
        )}

        {/* FERMATE */}
        {selectedRoute && (
          <GeoJSON
            data={filteredStops}
            pointToLayer={(feature: any, latlng) =>
              L.circleMarker(latlng, {
                radius: 6,
                fillColor: "#fff",
                color: "#000",
                weight: 2,
                fillOpacity: 1
              })
            }
            onEachFeature={(feature: any, layer) => {

              const schedule =
                todayStopTimes[
                  feature.properties.stop_id
                ] || [];

              const html = schedule
                .slice(0, 6)
                .map((s: any) =>
                  `<div>${s.arrival}</div>`
                )
                .join("");

              layer.bindPopup(`
                <div>
                  <h4>${feature.properties.stop_name}</h4>
                  ${html || "Nessun orario disponibile"}
                </div>
              `);

            }}
          />
        )}

        {/* ZOOM */}
        {selectedRoute && (
          <ZoomTo geojson={filteredShapes} />
        )}

      </MapContainer>

    </div>
  );
}