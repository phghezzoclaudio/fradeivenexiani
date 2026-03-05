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
      "E05-Isole-di-Venezia-venezia-chioggia"
    ]

    Promise.all(
      files.map(name =>
        fetch(`/Cycleroutes/${name}.geojson`)
          .then(r => r.json())
      )
    ).then(setCycleRoutes)

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
          style={{
            color: "#e63946",
            weight: 5
          }}
        />

      ))}

      {cycleRoutes.length > 0 && (
        <FitBounds geojson={cycleRoutes[0]} />
      )}

    </MapContainer>

  )
}