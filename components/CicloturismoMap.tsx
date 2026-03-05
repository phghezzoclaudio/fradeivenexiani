"use client"

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { useEffect, useState } from "react"
import routes from "@/data/Cycleroutes.json"
import { useRouter } from "next/navigation"
import { FeatureCollection } from "geojson"

type GeoRoute={
 slug:string
 geojson:FeatureCollection
}

export default function CicloturismoMap(){

 const [geoRoutes,setGeoRoutes] = useState<GeoRoute[]>([])
 const router = useRouter()

 useEffect(()=>{

  async function loadRoutes(){

   try{

    const loaded = await Promise.all(

     routes.map(async(route)=>{

      const res = await fetch(`/Cycleroutes/${route.slug}.geojson`)

      if(!res.ok){
       throw new Error(`Errore caricamento ${route.slug}`)
      }

      const data = await res.json()

      return{
       slug:route.slug,
       geojson:data
      }

     })

    )

    setGeoRoutes(loaded)

   }catch(err){
    console.error("Errore caricamento percorsi",err)
   }

  }

  loadRoutes()

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

   {geoRoutes.map(route=>(

    <GeoJSON
     key={route.slug}
     data={route.geojson}
     style={{
      color:"#e11d48",
      weight:4
     }}
     eventHandlers={{
      click:()=>router.push(`/cicloturismo/${route.slug}`)
     }}
     onEachFeature={(feature,layer)=>{
      if(feature.properties?.name){
       layer.bindPopup(feature.properties.name)
      }
     }}
    />

   ))}

  </MapContainer>

 )

}