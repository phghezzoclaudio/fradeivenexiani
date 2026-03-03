"use client";

import { useEffect, useState } from "react";

type RouteSelectorProps = {
  selectedRoute: string | null;
  onSelectRoute: (route: string | null) => void;
};

export default function RouteSelector({
  selectedRoute,
  onSelectRoute
}: RouteSelectorProps) {

  const [routes, setRoutes] = useState<any>(null);

  useEffect(() => {

    fetch("/api/gtfs/routes.geojson")
      .then(async res => {
        if (!res.ok) throw new Error("Errore API routes");
        return res.json();
      })
      .then(setRoutes)
      .catch(console.error);

  }, []);

  if (!routes) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "white",
        padding: 10,
        zIndex: 1000,
        borderRadius: 8,
        maxHeight: 400,
        overflowY: "auto"
      }}
    >

      <div
        style={{
          cursor: "pointer",
          marginBottom: 6,
          fontWeight: selectedRoute === null ? "bold" : "normal"
        }}
        onClick={() => onSelectRoute(null)}
      >
        Tutte le linee
      </div>

      {routes.features.map((route: any) => {

        const id = route.properties.route_id;

        return (
          <div
            key={id}
            onClick={() => onSelectRoute(id)}
            style={{
              cursor: "pointer",
              padding: 4,
              fontWeight: selectedRoute === id ? "bold" : "normal"
            }}
          >
            Linea {route.properties.route_short_name}
          </div>
        );

      })}

    </div>
  );
}