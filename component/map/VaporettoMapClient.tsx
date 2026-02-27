"use client";

import { useEffect, useState } from "react";

interface Stop {
  stop_id: string;
  stop_name: string;
  lat: number;
  lon: number;
}

interface Props {

  path: {
    lat: number;
    lon: number;
  }[];

  stops?: Stop[];

  lineName?: string;

}

export default function VaporettoMapClient({
  path,
  stops = [],
  lineName = "?"
}: Props) {

  const [Leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {

    async function load() {

      const L = await import("react-leaflet");

      await import("leaflet/dist/leaflet.css");

      setLeaflet(L);

    }

    load();

  }, []);

  if (!Leaflet)
    return (
      <div className="h-[500px] flex items-center justify-center">
        Caricamento mappa vaporetto...
      </div>
    );

  const {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
    CircleMarker
  } = Leaflet;

  const positions =
    path.map(p => [p.lat, p.lon]);

  return (

    <MapContainer
      center={[45.4371, 12.3326]}
      zoom={14}
      style={{
        height: "500px",
        width: "100%"
      }}
    >

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* linea vaporetto */}
      {positions.length > 0 && (

        <Polyline
          positions={positions}
          pathOptions={{
            color: "#ef4444",
            weight: 5
          }}
        />

      )}

      {/* fermate */}
      {stops.map(stop => (

        <CircleMarker
          key={stop.stop_id}
          center={[stop.lat, stop.lon]}
          radius={6}
          pathOptions={{
            color: "#1d4ed8",
            fillColor: "#3b82f6",
            fillOpacity: 1
          }}
        >

          <Popup>

            <div>

              <div className="font-bold">
                {stop.stop_name}
              </div>

              <div className="text-sm">
                Linea: {lineName}
              </div>

            </div>

          </Popup>

        </CircleMarker>

      ))}

    </MapContainer>

  );

}