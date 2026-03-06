"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { FeatureCollection } from "geojson"

function FitBounds({ geojson }: { geojson: FeatureCollection }) {
  const map = useMap()

  useEffect(() => {
    if (!geojson?.features?.length) return

    import("leaflet").then((L) => {
      const layer = L.geoJSON(geojson)
      const bounds = layer.getBounds()

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [60, 60] })
      }
    })
  }, [geojson, map])

  return null
}

export default function CicloturismoMap() {
  const [cycleRoutes, setCycleRoutes] =
    useState<FeatureCollection[]>([])

  useEffect(() => {

    const files = [
      "laguna-nord",
      "Venezia-Mestre",
      "E05-Isole-di-Venezia-venezia-chioggia",
      "Mestre-forti-boschi-e-laguna"
    ]

    Promise.all(
      files.map(name =>
        fetch(`/Cycleroutes/${name}.geojson`)
          .then(r => r.json())
      )
    ).then((routes) => {
      setCycleRoutes(routes)
    })

  }, [])

  return (

    <MapContainer
      center={[45.437, 12.335]}
      zoom={12}
      style={{ height: "70vh", width: "100%" }}
    >

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cycleRoutes.map((route, i) => (

        <GeoJSON
          key={i}
          data={route}

          pointToLayer={(feature, latlng) => {

            const L = require("leaflet")

            return L.marker(latlng, {
              icon: L.divIcon({
                html: "📍",
                className: "",
                iconSize: [20, 20]
              })
            })

          }}

          style={(feature) => {

            const segment = feature?.properties?.segment

            if (segment === "walk") {
              return {
                color: "#61f481",
                weight: 5,
                dashArray: "6,6"
              }
            }

            return {
              color: "#f07326",
              weight: 5
            }

          }}

          onEachFeature={(feature, layer) => {

            const segment = feature?.properties?.segment

            const label =
              segment === "walk"
                ? "🚶 Tratto bici a mano"
                : "🚴 Tratto ciclabile"

            layer.bindPopup(label)

          }}

        />

      ))}

      {cycleRoutes.length > 0 && (
        <FitBounds geojson={cycleRoutes[0]} />
      )}

    </MapContainer>
  )
}