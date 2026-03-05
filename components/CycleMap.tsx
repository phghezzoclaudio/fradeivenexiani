"use client"

import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet"
import { useEffect, useState } from "react"
import * as turf from "@turf/turf"
import { FeatureCollection } from "geojson"

type Props={
 slug:string
}

export default function CycleMap({slug}:Props){

 const [route,setRoute] = useState<FeatureCollection | null>(null)
 const [position,setPosition] = useState<[number,number] | null>(null)

 useEffect(()=>{

  fetch(`/Cycleroutes/${slug}.geojson`)
   .then(r=>r.json())
   .then(setRoute)

 },[slug])

 useEffect(()=>{

  if(!navigator.geolocation) return

  const watch=navigator.geolocation.watchPosition(pos=>{

   setPosition([
    pos.coords.latitude,
    pos.coords.longitude
   ])

  })

  return ()=>navigator.geolocation.clearWatch(watch)

 },[])

 return(

  <MapContainer
   center={[45.44,12.33]}
   zoom={10}
   style={{height:"70vh",width:"100%"}}
  >

   <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   {route && <GeoJSON data={route}/>}

   {position && <Marker position={position}/>}

  </MapContainer>

 )

}