"use client";

import { useEffect, useState } from "react";

/* ========================
   TYPES
======================== */

interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

interface PathPoint {
  lat: number;
  lon: number;
}

interface Props {
  path: PathPoint[];
  stops: Stop[];
}

/* ========================
   COMPONENT
======================== */

export default function VaporettoMapClient({
  path,
  stops
}: Props) {

  const [Leaflet, setLeaflet] = useState<any>(null);

  /* ========================
     LOAD LEAFLET CLIENT SIDE
  ======================== */

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
      <div className="h-[600px] flex items-center justify-center">
        Caricamento mappa...
      </div>
    );

  const {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup
  } = Leaflet;

  /* ========================
     ROUTE LINE
  ======================== */

  const positions =
    path?.map(p => [p.lat, p.lon]) || [];

  /* ========================
     RENDER
  ======================== */

  return (

    <MapContainer
      center={[45.4371, 12.3326]}
      zoom={14}
      style={{
        height: "600px",
        width: "100%"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* ROUTE LINE */}

      {positions.length > 0 && (

        <Polyline
          positions={positions}
          pathOptions={{
            color: "#0074D9",
            weight: 5
          }}
        />

      )}

      {/* ROUTE STOPS ONLY */}

      {stops?.map(stop => (

        <Marker
          key={stop.stop_id}
          position={[
            parseFloat(stop.stop_lat),
            parseFloat(stop.stop_lon)
          ]}
        >

          <Popup>

            <div>

              <b>
                {stop.stop_name.replace(/"/g, "")}
              </b>

              <br/>

              ID: {stop.stop_id}

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );

}