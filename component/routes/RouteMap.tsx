"use client";

import { useEffect, useState } from "react";

export default function RouteMap({ route }: any) {

  const [Leaflet, setLeaflet] = useState<any>(null);

  useEffect(()=>{

    import("react-leaflet").then(setLeaflet);

  },[]);

  if (!Leaflet)
    return <div>Loading map...</div>;

  const {
    MapContainer,
    TileLayer,
    Polyline,
    Marker
  } = Leaflet;

  const path =
    route?.path?.map(
      (p:any)=>[p.lat,p.lon]
    ) || [];

  return (

    <MapContainer
      center={[45.437,12.332]}
      zoom={14}
      className="h-full w-full"
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {path.length>0 && (
        <Polyline positions={path}/>
      )}

    </MapContainer>

  );

}