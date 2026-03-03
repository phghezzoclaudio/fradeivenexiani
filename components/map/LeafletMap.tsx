"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import RouteSelector from "./RouteSelector";
import RoutesLayer from "./RoutesLayer";

import L from "leaflet";

export default function LeafletMap() {

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [stops, setStops] = useState<any>(null);

  useEffect(() => {
    fetch("/api/gtfs/stops.geojson")
      .then(res => res.json())
      .then(setStops)
      .catch(console.error);
  }, []);

  return (
    <div style={{ position: "relative" }}>

      <RouteSelector
        selectedRoute={selectedRoute}
        onSelectRouteAction={setSelectedRoute}
      />

      <MapContainer
        center={[45.437, 12.335]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* LINEE */}
        <RoutesLayer selectedRoute={selectedRoute} />

        {/* FERMATE */}
        {stops && (
          <GeoJSON
            data={stops}
            pointToLayer={(_, latlng) =>
              L.circleMarker(latlng, {
                radius: 4,
                color: "#000",
                fillColor: "#fff",
                fillOpacity: 1
              })
            }
            onEachFeature={(feature, layer) => {
              layer.bindPopup(
                `<b>${feature.properties.stop_name}</b>`
              );
            }}
          />
        )}

      </MapContainer>

    </div>
  );
}