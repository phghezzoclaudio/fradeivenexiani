"use client";

import { useEffect, useState } from "react";
import VaporettoMapClient from "@/component/map/VaporettoMapClient";

export default function RoutesPage() {

  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {

    fetch("/api/routes")
      .then(res => res.json())
      .then(setRoutes);

  }, []);

  useEffect(() => {

    if (!selectedRoute) return;

    fetch(`/api/route-shape?routeId=${selectedRoute}`)
      .then(res => res.json())
      .then(setMapData);

  }, [selectedRoute]);

  return (

    <div className="flex h-screen">

      {/* sidebar */}

      <div className="w-80 border-r overflow-y-auto">

        <h2 className="p-4 font-bold text-lg">
          Linee Vaporetto
        </h2>

        {routes.map(route => (

          <div
            key={route.route_id}
            className="p-3 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedRoute(route.route_id)}
          >
            Linea {route.route_short_name}
          </div>

        ))}

      </div>

      {/* map */}

      <div className="flex-1">

        {mapData && (

          <VaporettoMapClient

            path={mapData.path}

            stops={mapData.stops}

          />

        )}

      </div>

    </div>

  );

}