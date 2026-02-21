"use client";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Point {
  lat: number;
  lon: number;
}

interface Props {
  stops: Point[];
  path: Point[];
}

export default function VaporettoMap({ stops, path }: Props) {
  const center = stops[0] || { lat: 45.437, lon: 12.335 };

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stops.map((s, i) => (
          <Marker key={i} position={[s.lat, s.lon]} />
        ))}

        <Polyline
          positions={path.map(p => [p.lat, p.lon])}
          pathOptions={{ color: "#9E1B32", weight: 4 }}
        />
      </MapContainer>
    </div>
  );
}