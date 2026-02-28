"use client";

import { useEffect, useState } from "react";

export default function RouteMap({ shape, stops }: any) {

  const [Leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {

    import("react-leaflet").then(setLeaflet);

  }, []);

  if (!Leaflet)
    return <div className="h-full flex items-center justify-center">
      Loading map...
    </div>;

  const {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup
  } = Leaflet;

  /* FIX: usa shape_pt_lat / shape_pt_lon */

  const path =
    shape?.map((p:any)=>[
      Number(p.shape_pt_lat),
      Number(p.shape_pt_lon)
    ]) || [];

  const center =
    path.length > 0
      ? path[0]
      : [45.437,12.332];

  return (

    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* LINEA */}

      {path.length > 0 && (

        <Polyline
          positions={path}
          color="blue"
          weight={5}
        />

      )}

      {/* FERMATE */}

      {stops?.map((stop:any)=>(
        <Marker
          key={stop.stop_id}
          position={[
            Number(stop.stop_lat),
            Number(stop.stop_lon)
          ]}
        >
          <Popup>
            {stop.stop_name}
          </Popup>
        </Marker>
      ))}

    </MapContainer>

  );

}