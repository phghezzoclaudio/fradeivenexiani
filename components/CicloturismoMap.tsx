"use client"

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { useEffect, useState } from "react"
import routes from "@/data/Cycleroutes.json"
import { useRouter } from "next/navigation"

export default function CicloturismoMap(){

 const [geoRoutes,setGeoRoutes] = useState<any[]>([])
 const router = useRouter()

 useEffect(()=>{

  async function loadRoutes(){

   const loaded = await Promise.all(

    routes.map(async (route)=>{

     const res = await fetch(`/Cycleroutes/${route.slug}.geojson`)
     const data = await res.json()

     return {
      slug: route.slug,
      geojson: data
     }

    })

   )

   setGeoRoutes(loaded)

  }

  loadRoutes()

 },[])

 return(

  <MapContainer
   center={[45.44,12.33]}
   zoom={10}
   style={{height:"600px"}}
  >

   <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   {geoRoutes.map(route => (

    <GeoJSON
     key={route.slug}
     data={route.geojson}
     eventHandlers={{
      click: () => router.push(`/cicloturismo/${route.slug}`)
     }}
     style={{
      color:"#e11d48",
      weight:4
     }}
    />

   ))}

  </MapContainer>

 )

}