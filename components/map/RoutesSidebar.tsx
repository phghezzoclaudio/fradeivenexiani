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

        const sorted =
          data.routes.features
            .map((f: any) => f.properties)
            .sort((a: any, b: any) =>
              a.route_short_name.localeCompare(
                b.route_short_name,
                undefined,
                { numeric: true }
              )
            );

        setRoutes(sorted);

      });

  }, []);

  return (
    <div style={{
      width: 120,
      borderRight: "1px solid #ddd",
      padding: 10,
      overflowY: "auto"
    }}>

      {routes.map(route => (

        <div
          key={route.route_id}
          onClick={() =>
            onSelectRoute(route.route_id)
          }
          style={{
            textAlign: "center",
            padding: "6px 0",
            marginBottom: 4,
            cursor: "pointer",
            background:
              selectedRoute === route.route_id
                ? "#eee"
                : "transparent",
            borderRadius: 4,
            fontWeight: 600
          }}
        >
          {route.route_short_name}
        </div>

      ))}

    </div>
  );
}