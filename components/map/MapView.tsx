"use client";

import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import RoutesLayer from "./RoutesLayer";
import StopsLayer from "./StopsLayer";
import RouteSelector from "./RouteSelector";
import ZoomToRoute from "./ZoomToRoute";

export default function MapView() {

  const [selectedRoute, setSelectedRoute] =
    useState<string | null>(null);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>

      <RouteSelector
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />

      <MapContainer
        center={[45.437, 12.335]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RoutesLayer selectedRoute={selectedRoute} />
        <StopsLayer />
        <ZoomToRoute selectedRoute={selectedRoute} />

      </MapContainer>
    </div>
  );
}