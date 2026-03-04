"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection } from "geojson";


/* prossimi passaggi */
function getUpcomingTimes(times: any[], limit = 6) {

  const now = new Date();

  const currentSeconds =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();

  return times
    .map(t => {

      const parts = t.arrival.split(":");

      const seconds =
        parseInt(parts[0]) * 3600 +
        parseInt(parts[1]) * 60 +
        parseInt(parts[2]);

      const diff = seconds - currentSeconds;

      return {
        ...t,
        seconds,
        minutes: Math.floor(diff / 60)
      };

    })
    .filter(t => t.seconds >= currentSeconds)
    .sort((a, b) => a.seconds - b.seconds)
    .slice(0, limit);
}


/* zoom automatico */
function ZoomTo({ geojson }: { geojson: FeatureCollection }) {

  const map = useMap();

  useEffect(() => {

    if (!geojson?.features?.length) return;

    const layer = L.geoJSON(geojson);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [80, 80] });
    }

  }, [geojson, map]);

  return null;
}


export default function RoutesMap({
  selectedRoute
}: {
  selectedRoute: string | null;
  selectedTerminal: string | null;
}) {

  const [shapes, setShapes] =
    useState<FeatureCollection | null>(null);

  const [stops, setStops] =
    useState<FeatureCollection | null>(null);

  const [todayStopTimes, setTodayStopTimes] =
    useState<Record<string, any[]>>({});

  const [stopRoutes, setStopRoutes] =
    useState<Record<string, string[]>>({});


  useEffect(() => {

    fetch("/api/routes-data")
      .then(r => r.json())
      .then(data => {

        setShapes(data.shapes);
        setStops(data.stops);
        setTodayStopTimes(data.todayStopTimes);
        setStopRoutes(data.stopRoutes);

      })
      .catch(err =>
        console.error("Errore caricamento dati:", err)
      );

  }, []);


  if (!shapes || !stops) return null;


  const routeIds =
    shapes.features
      .filter(
        (f: any) =>
          f.properties?.route_short_name === selectedRoute
      )
      .map((f: any) => f.properties?.route_id);


  const filteredShapes: FeatureCollection = {
    type: "FeatureCollection",
    features: shapes.features.filter(
      (f: any) =>
        routeIds.includes(f.properties?.route_id)
    )
  };


  const filteredStops: FeatureCollection = {
    type: "FeatureCollection",
    features: stops.features.filter((f: any) => {

      if (!selectedRoute) return false;

      const routes =
        stopRoutes[f.properties?.stop_id];

      if (!routes) return false;

      return routes.some((r: string) =>
        routeIds.includes(r)
      );

    })
  };


  return (

    <div style={{ flex: 1 }}>

      <MapContainer
        center={[45.437, 12.335]}
        zoom={13}
        style={{
          height: "100%",
          width: "100%"
        }}
      >

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* LINEA */}
        {selectedRoute &&
          filteredShapes.features.length > 0 && (

          <GeoJSON
            data={filteredShapes}
            style={(f: any) => ({
              color: `#${f.properties?.route_color || "0066cc"}`,
              weight: 6
            })}
          />

        )}


        {/* FERMATE */}
        {selectedRoute &&
          filteredStops.features.length > 0 && (

          <GeoJSON
            data={filteredStops}
            pointToLayer={(feature: any, latlng) =>
              L.circleMarker(latlng, {
                radius: 7,
                fillColor: "#fff",
                color: "#000",
                weight: 2,
                fillOpacity: 1
              })
            }
            onEachFeature={(feature: any, layer) => {

              const rawTimes =
                todayStopTimes[
                  feature.properties?.stop_id
                ] || [];

              const schedule =
                getUpcomingTimes(rawTimes);

              const html = schedule
                .map((s: any) => {

                  const min =
                    s.minutes <= 0
                      ? "in arrivo"
                      : `${s.minutes} min`;

                  return `
                    <div style="
                      display:flex;
                      justify-content:space-between;
                      font-size:12px
                    ">
                      <span>${s.arrival}</span>
                      <span><b>${min}</b></span>
                    </div>
                  `;
                })
                .join("");

              layer.bindPopup(`
                <div style="min-width:160px">

                  <div style="
                    font-weight:700;
                    font-size:14px;
                    margin-bottom:6px
                  ">
                    ${feature.properties?.stop_name}
                  </div>

                  ${html || "Nessun passaggio"}

                </div>
              `);

            }}
          />

        )}


        {/* ZOOM */}
        {selectedRoute &&
          filteredShapes.features.length > 0 && (
          <ZoomTo geojson={filteredShapes} />
        )}

      </MapContainer>

    </div>

  );

}