"use client"

import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet"
import { useEffect, useState } from "react"
import * as turf from "@turf/turf"
import { FeatureCollection } from "geojson"

type Props = {
 slug: string
}

export default function CycleMap({ slug }: Props){

 const [route,setRoute] = useState<FeatureCollection | null>(null)
 const [position,setPosition] = useState<[number,number] | null>(null)
 const [offRoute,setOffRoute] = useState(false)

 useEffect(()=>{

  fetch(`/routes/${slug}.geojson`)
   .then(r=>r.json())
   .then(setRoute)

 },[slug])

 useEffect(()=>{

  if(!navigator.geolocation) return

  const watch = navigator.geolocation.watchPosition(pos=>{

   const coords:[number,number] = [
    pos.coords.latitude,
    pos.coords.longitude
   ]

   setPosition(coords)

   if(route){

    const point = turf.point([
     coords[1],
     coords[0]
    ])

    const line = route.features[0]

    const snapped = turf.nearestPointOnLine(line as any, point)

    const distance = snapped.properties.dist * 1000

    setOffRoute(distance > 20)

   }

  })

  return ()=>navigator.geolocation.clearWatch(watch)

 },[route])

 return(

  <div>

   {offRoute && (
    <div style={{color:"red"}}>
     ⚠️ fuori percorso
    </div>
   )}

   <MapContainer
    center={[45.44,12.33]}
    zoom={11}
    style={{height:"500px"}}
   >

    <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {route && <GeoJSON data={route}/>}

    {position && <Marker position={position}/>}

   </MapContainer>

  </div>

 )
}