"use client";

import { useEffect, useState } from "react";

interface Props {
  selectedRoute: string | null;
  onSelectRoute: (id: string | null) => void;
}

export default function RoutesSidebar({
  selectedRoute,
  onSelectRoute
}: Props) {

  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {

    fetch("/api/routes-data")
      .then(r => r.json())
      .then(data => {

        if (!data?.routes?.features) return;

        const routes =
          data.routes.features.map(
            (f: any) => f.properties
          );

        // rimuove duplicati
        const uniqueRoutes = Array.from(
          new Map(
            routes
              .filter((r: any) => r.route_short_name)
              .map((r: any) => [
                r.route_short_name,
                r
              ])
          ).values()
        );

        // ordina numericamente
        uniqueRoutes.sort((a: any, b: any) =>
          a.route_short_name.localeCompare(
            b.route_short_name,
            undefined,
            { numeric: true }
          )
        );

        setRoutes(uniqueRoutes);

      })
      .catch(err =>
        console.error("Errore routes:", err)
      );

  }, []);

  return (
    <div
      style={{
        width: 120,
        background: "#f8f9fa",
        borderRight: "1px solid #ddd",
        padding: 10,
        overflowY: "auto"
      }}
    >

      {routes.map(route => {

        const color =
          route.route_color
            ? `#${route.route_color}`
            : "#666";

        const active =
          selectedRoute === route.route_short_name;

        return (

          <div
            key={route.route_short_name}
            onClick={() => {

              // forza aggiornamento linea
              if (selectedRoute === route.route_short_name) {
                onSelectRoute(null);
                setTimeout(() =>
                  onSelectRoute(route.route_short_name),
                  50
                );
              } else {
                onSelectRoute(route.route_short_name);
              }

            }}
            style={{
              textAlign: "center",
              padding: "8px 0",
              marginBottom: 8,
              cursor: "pointer",
              borderRadius: 6,
              fontWeight: 700,
              border: `2px solid ${color}`,
              background: active ? color : "#fff",
              color: active ? "#fff" : color,
              transition: "all 0.2s"
            }}
          >
            {route.route_short_name}
          </div>

        );

      })}

    </div>
  );
}