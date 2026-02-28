"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

/* carica la mappa solo lato client */
const RouteMap = dynamic(
  () => import("@/component/routes/RouteMap"),
  { ssr: false }
);

/* tipi */

interface Route {
  route_id: string;
  route_short_name: string;
  route_long_name?: string;
  route_color?: string;
}

interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

interface ShapePoint {
  shape_pt_lat: string;
  shape_pt_lon: string;
}

export default function LineeNavigazionePage() {

  /* state */

  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [shape, setShape] = useState<ShapePoint[]>([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD ROUTES
  ========================= */

  useEffect(() => {

    async function loadRoutes() {

      try {

        const res = await fetch("/api/route");
        const data: Route[] = await res.json();

        setRoutes(data);

        if (data.length > 0) {
          setSelectedRoute(data[0]);
        }

      } catch (err) {

        console.error("Errore caricamento routes:", err);

      }

    }

    loadRoutes();

  }, []);

  /* =========================
     LOAD STOPS + SHAPE
  ========================= */

  useEffect(() => {

    if (!selectedRoute) return;

    const routeId = selectedRoute.route_id;

    async function loadRouteData() {

      try {

        setLoading(true);

        const stopsRes = await fetch(
          `/api/stops?route_id=${routeId}`
        );

        const shapeRes = await fetch(
          `/api/route-shape?route_id=${routeId}`
        );

        const stopsData: Stop[] = await stopsRes.json();
        const shapeData: ShapePoint[] = await shapeRes.json();

        setStops(stopsData);
        setShape(shapeData);

      } catch (err) {

        console.error("Errore caricamento route:", err);

      }

      setLoading(false);

    }

    loadRouteData();

  }, [selectedRoute]);

  /* =========================
     REMOVE DUPLICATE STOPS
  ========================= */

  const uniqueStops = useMemo(() => {

    const map = new Map<string, Stop>();

    for (const stop of stops) {

      if (stop.stop_id && !map.has(stop.stop_id)) {
        map.set(stop.stop_id, stop);
      }

    }

    return Array.from(map.values());

  }, [stops]);

  /* =========================
     UI
  ========================= */

  return (

    <div className="flex h-screen">

      {/* SIDEBAR LINEE */}

      <div className="w-64 bg-zinc-900 text-white overflow-y-auto">

        <div className="p-4 font-bold border-b border-zinc-700">
          Linee Navigazione
        </div>

        {routes.map((route) => {

          const active =
            selectedRoute &&
            route.route_id === selectedRoute.route_id;

          return (

            <div
              key={route.route_id}
              onClick={() => setSelectedRoute(route)}
              className={`p-3 cursor-pointer hover:bg-zinc-800 flex items-center gap-3
              ${active ? "bg-zinc-800" : ""}`}
            >

              <div
                className="w-10 h-10 flex items-center justify-center rounded font-bold"
                style={{
                  backgroundColor:
                    route.route_color
                      ? `#${route.route_color}`
                      : "#2563eb"
                }}
              >
                {route.route_short_name}
              </div>

              <div className="text-sm">
                {route.route_long_name}
              </div>

            </div>

          );

        })}

      </div>


      {/* COLONNA FERMATE */}

      <div className="w-80 border-r overflow-y-auto">

        <div className="p-4 font-bold border-b">

          {selectedRoute
            ? `Fermate linea ${selectedRoute.route_short_name}`
            : "Caricamento..."}

        </div>

        {loading && (
          <div className="p-4 text-gray-500">
            Caricamento fermate...
          </div>
        )}

        {!loading && uniqueStops.map((stop) => (

          <div
            key={stop.stop_id}
            className="p-3 border-b hover:bg-gray-100"
          >
            {stop.stop_name}
          </div>

        ))}

      </div>


      {/* MAPPA */}

      <div className="flex-1">

        {selectedRoute && (

          <RouteMap
            stops={uniqueStops}
            shape={shape}
          />

        )}

      </div>

    </div>

  );

}