"use client";

import { useEffect, useState } from "react";

interface Props {
  selectedRoute: string | null;
  selectedTerminal: string | null;
  onSelectRoute: (route: string) => void;
  onSelectTerminal: (terminal: string) => void;
}

export default function RoutesSidebar({
  selectedRoute,
  selectedTerminal,
  onSelectRoute,
  onSelectTerminal
}: Props) {

  const [routes, setRoutes] = useState<any[]>([]);
  const [terminals, setTerminals] = useState<any>({});

  useEffect(() => {

    fetch("/api/routes-data")
      .then(r => r.json())
      .then(data => {

        if (!data?.routes?.features) return;

        const routes =
          data.routes.features.map(
            (f: any) => f.properties
          );

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

        uniqueRoutes.sort((a: any, b: any) =>
          a.route_short_name.localeCompare(
            b.route_short_name,
            undefined,
            { numeric: true }
          )
        );

        setRoutes(uniqueRoutes);
        setTerminals(data.terminals || {});

      });

  }, []);

  return (

    <div
      style={{
        width: 200,
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
          selectedRoute === route.route_id;

        const routeTerminals =
          terminals[route.route_id];

        return (

          <div key={route.route_id}>

            {/* linea */}
            <div
              onClick={() =>
                onSelectRoute(route.route_id)
              }
              style={{
                textAlign: "center",
                padding: "8px 0",
                marginBottom: 6,
                cursor: "pointer",
                borderRadius: 6,
                fontWeight: 700,
                border: `2px solid ${color}`,
                background: active ? color : "#fff",
                color: active ? "#fff" : color
              }}
            >
              {route.route_short_name}
            </div>

            {/* direzioni */}
            {active && routeTerminals && (

              <div
                style={{
                  marginBottom: 12,
                  paddingLeft: 10,
                  fontSize: 13
                }}
              >

                <div
                  style={{
                    cursor: "pointer",
                    marginBottom: 4,
                    fontWeight:
                      selectedTerminal === "A"
                        ? 700
                        : 400
                  }}
                  onClick={() =>
                    onSelectTerminal("A")
                  }
                >
                  → {routeTerminals.A.name}
                </div>

                <div
                  style={{
                    cursor: "pointer",
                    fontWeight:
                      selectedTerminal === "B"
                        ? 700
                        : 400
                  }}
                  onClick={() =>
                    onSelectTerminal("B")
                  }
                >
                  → {routeTerminals.B.name}
                </div>

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}