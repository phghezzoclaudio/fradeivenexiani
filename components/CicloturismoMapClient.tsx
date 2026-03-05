"use client"

import { useEffect, useState } from "react"
import {
 MapContainer,
 TileLayer,
 GeoJSON,
 useMap
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import type { FeatureCollection } from "geojson"


/* zoom automatico */
function FitBounds({
 geojson
}:{
 geojson: FeatureCollection
}){

 const map = useMap()

 useEffect(()=>{

  if(!geojson?.features?.length) return

  import("leaflet").then((L)=>{

   const layer = L.geoJSON(geojson)
   const bounds = layer.getBounds()

   if(bounds.isValid()){
    map.fitBounds(bounds,{
     padding:[60,60]
    })
   }

  })

 },[geojson,map])

 return null
}


export default function CicloturismoMapClient(){

 if (typeof window === "undefined") return null

 const [cycleRoutes,setCycleRoutes] =
  useState<FeatureCollection[]>([])

 const [actv,setActv] =
  useState<FeatureCollection | null>(null)


 /* ciclabili */
 useEffect(()=>{

  const files=[
   "laguna-nord",
   "E05-Isole-di-Venezia-venezia-chioggia"
  ]

  Promise.all(

   files.map(name=>
    fetch(`/Cycleroutes/${name}.geojson`)
     .then(r=>r.json())
   )

  ).then(setCycleRoutes)

 },[])


 /* linee actv */
 useEffect(()=>{

  fetch("/api/routes-data")
   .then(r=>r.json())
   .then(data=>{

    setActv(data.shapes)

   })

 },[])


 if(!actv) return null


 /* filtro linee actv */
 const allowed = new Set(["11","17"])


 const filteredActv: FeatureCollection = {
  type: "FeatureCollection",
  features: actv.features.filter(
   (f:any)=>
    allowed.has(
     f.properties?.route_short_name
    )
  )
 }


 return(

  <MapContainer
   center={[45.437,12.335]}
   zoom={12}
   style={{
    height:"70vh",
    width:"100%"
   }}
  >

   <TileLayer
    attribution="© OpenStreetMap"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />


   {/* ciclabili */}
   {cycleRoutes.map((route,i)=>(

    <GeoJSON
     key={i}
     data={route}
     style={{
      color:"#e63946",
      weight:5,
      dashArray:"6 4"
     }}
    />

   ))}


   {/* actv */}
   <GeoJSON
    data={filteredActv}
    style={{
     color:"#0077b6",
     weight:4
    }}
   />


   {/* zoom automatico */}
   {cycleRoutes.length > 0 && (

    <FitBounds geojson={cycleRoutes[0]} />

   )}

  </MapContainer>

 )

}