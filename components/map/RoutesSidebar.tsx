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
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/gtfs/routes.geojson")
      .then(res => res.json())
      .then(data => {
        const sorted = data.features
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

  const filtered = routes.filter(r =>
    r.route_short_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: 300,
      borderRight: "1px solid #ddd",
      padding: 20,
      overflowY: "auto"
    }}>
      <h2>Linee</h2>

      <input
        placeholder="Cerca linea..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 15
        }}
      />

      <button
        onClick={() => onSelectRoute(null)}
        style={{
          display: "block",
          marginBottom: 10,
          fontWeight: !selectedRoute ? "bold" : "normal"
        }}
      >
        Tutte le linee
      </button>

      {filtered.map(route => (
        <div
          key={route.route_id}
          onClick={() => onSelectRoute(route.route_id)}
          style={{
            padding: "6px 0",
            cursor: "pointer",
            fontWeight:
              selectedRoute === route.route_id
                ? "bold"
                : "normal"
          }}
        >
          <span style={{
            background: `#${route.route_color || "ccc"}`,
            color: "#fff",
            padding: "2px 6px",
            borderRadius: 4,
            marginRight: 8
          }}>
            {route.route_short_name}
          </span>
          {route.route_long_name}
        </div>
      ))}
    </div>
  );
}