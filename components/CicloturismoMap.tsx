"use client"

import { useEffect, useState, useMemo } from "react"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import type { FeatureCollection } from "geojson"

function FitBounds({ geojson }: { geojson: FeatureCollection }) {
  const map = useMap()

  useEffect(() => {
    if (!geojson?.features?.length) return

    const layer = L.geoJSON(geojson)
    const bounds = layer.getBounds()

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60] })
    }
  }, [geojson, map])

  return null
}

export default function CicloturismoMap() {

  const [cycleRoutes, setCycleRoutes] = useState<FeatureCollection[]>([])

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
          .catch(() => null)
      )
    ).then((routes) => {
      const validRoutes = routes.filter(Boolean) as FeatureCollection[]
      setCycleRoutes(validRoutes)
    })

  }, [])

  const allFeatures = useMemo<FeatureCollection>(() => ({
    type: "FeatureCollection",
    features: cycleRoutes.flatMap(route => route.features)
  }), [cycleRoutes])

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

            const type = feature?.properties?.type

            let icon = "📍"

            if (type === "start") icon = "🚴"
            if (type === "end") icon = "🏁"

            return L.marker(latlng, {
              icon: L.divIcon({
                html: icon,
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

            const name = feature?.properties?.name
            const segment = feature?.properties?.segment

            let icon = "🚴"
            let text = "Tratto ciclabile"

            if (segment === "walk") {
              icon = "🚶"
              text = "Tratto bici a mano"
            }

            layer.bindPopup(`
              <strong>${name || "Percorso ciclabile"}</strong><br/>
              ${icon} ${text}
            `)

          }}

        />

      ))}

      {cycleRoutes.length > 0 && (
        <FitBounds geojson={allFeatures} />
      )}

    </MapContainer>
  )
}