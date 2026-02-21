"use client";

import { useEffect, useState } from "react";

interface Props {
  path: { lat: number; lon: number }[];
}

export default function VaporettoMapClient({ path }: Props) {
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);

  useEffect(() => {
    async function loadLeaflet() {
      const L = await import("react-leaflet");
      await import("leaflet/dist/leaflet.css");
      setLeafletComponents(L);
    }

    loadLeaflet();
  }, []);

  if (!LeafletComponents) {
    return <div className="h-[500px] flex items-center justify-center">Caricamento mappa...</div>;
  }

  const { MapContainer, TileLayer, Polyline } = LeafletComponents;

  const positions = path.map(p => [p.lat, p.lon] as [number, number]);

  return (
    <MapContainer
      center={[45.4371, 12.3326]}
      zoom={14}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {positions.length > 0 && (
        <Polyline positions={positions} />
      )}
    </MapContainer>
  );
}