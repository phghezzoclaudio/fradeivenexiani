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

        const routes =
          data.routes.features.map(
            (f: any) => f.properties
          );

        // deduplicazione per numero linea
        const uniqueRoutes = Array.from(
          new Map(
            routes.map((r: any) => [
              r.route_short_name,
              r
            ])
          ).values()
        );

        // ordinamento numerico
        uniqueRoutes.sort((a: any, b: any) =>
          a.route_short_name.localeCompare(
            b.route_short_name,
            undefined,
            { numeric: true }
          )
        );

        setRoutes(uniqueRoutes);

      });

  }, []);

  return (
    <div
      style={{
        width: 120,
        borderRight: "1px solid #ddd",
        padding: 10,
        overflowY: "auto"
      }}
    >

      {routes.map(route => {

        const color =
          route.route_color
            ? `#${route.route_color}`
            : "#888";

        const active =
          selectedRoute === route.route_short_name;

        return (

          <div
            key={route.route_short_name}
            onClick={() =>
              onSelectRoute(route.route_short_name)
            }
            style={{
              textAlign: "center",
              padding: "6px 0",
              marginBottom: 6,
              cursor: "pointer",
              borderRadius: 4,
              fontWeight: 600,
              border: `2px solid ${color}`,
              background: active ? color : "transparent",
              color: active ? "#fff" : "#000"
            }}
          >
            {route.route_short_name}
          </div>

        );

      })}

    </div>
  );
}