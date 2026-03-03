"use client";

import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "/boat.png",
  iconSize: [32, 32]
});

export default function RealtimeLayer() {

  const [vehicles, setVehicles] =
    useState<any[]>([]);

  useEffect(() => {

    const load = async () => {

      const res =
        await fetch("/api/realtime");

      const data = await res.json();

      setVehicles(data);
    };

    load();

    const interval =
      setInterval(load, 10000);

    return () => clearInterval(interval);

  }, []);

  return (
    <>
      {vehicles.map(v => (
        <Marker
          key={v.vehicle_id}
          position={[v.lat, v.lon]}
          icon={icon}
        >
          <Popup>
            Linea {v.route_id}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
