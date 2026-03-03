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

  const [shapes, setShapes] =
    useState<FeatureCollection | null>(null);

  const [stops, setStops] =
    useState<FeatureCollection | null>(null);

  const [routes, setRoutes] = useState<any[]>([]);
  const [todayStopTimes, setTodayStopTimes] =
    useState<Record<string, any[]>>({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/routes-data")
      .then(r => r.json())
      .then(data => {
        setShapes(data.shapes);
        setStops(data.stops);

        setRoutes(
          data.routes?.features
            ? data.routes.features.map(
                (f: any) => f.properties
              )
            : []
        );

        setTodayStopTimes(data.todayStopTimes || {});
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Caricamento mappa...
      </div>
    );
  }

  if (!shapes || !stops) return null;

  const filteredShapes: FeatureCollection = {
    type: "FeatureCollection",
    features: selectedRoute
      ? shapes.features.filter(
          (f: any) =>
            f.properties.route_id === selectedRoute
        )
      : shapes.features
  };

  const filteredStops: FeatureCollection = {
    type: "FeatureCollection",
    features: selectedRoute
      ? stops.features.filter(
          (f: any) =>
            f.properties.routes?.includes(selectedRoute)
        )
      : []
  };

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

        {/* LINEE */}
        <GeoJSON
          data={filteredShapes}
          style={(f: any) => ({
            color: `#${f.properties.route_color || "0066cc"}`,
            weight: selectedRoute ? 6 : 3,
            opacity:
              selectedRoute &&
              f.properties.route_id !== selectedRoute
                ? 0.15
                : 1
          })}
        />

        {/* FERMATE */}
        {selectedRoute && (
          <GeoJSON
            data={filteredStops}
            pointToLayer={(feature: any, latlng) =>
              L.circleMarker(latlng, { radius: 6 })
            }
            onEachFeature={(feature: any, layer) => {

              const schedule =
                todayStopTimes[
                  feature.properties.stop_id
                ] || [];

              const html = schedule
                .slice(0, 6)
                .map((s: any) => `
                  <div style="margin:4px 0;">
                    ${s.arrival}
                  </div>
                `)
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

        {selectedRoute && (
          <ZoomTo geojson={filteredShapes} />
        )}
      </MapContainer>
    </div>
  );
}