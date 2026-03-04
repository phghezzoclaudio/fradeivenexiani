"use client";

import { useEffect, useState } from "react";

interface Props {
  selectedRoute: string | null;
  selectedTerminal: string | null;
  onSelectRoute: (route: string | null) => void;
  onSelectTerminal: (terminal: string | null) => void;
}

/* prossimi passaggi */
function getUpcomingTimes(times: any[], limit = 3) {

  const now = new Date();

  const currentSeconds =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();

  return times
    .map(t => {

      const parts = t.arrival.split(":");

      const seconds =
        parseInt(parts[0]) * 3600 +
        parseInt(parts[1]) * 60 +
        parseInt(parts[2]);

      return { ...t, seconds };

    })
    .filter(t => t.seconds >= currentSeconds)
    .sort((a,b)=>a.seconds-b.seconds)
    .slice(0,limit);

}

/* minuti percorrenza linea */
function getRouteDuration(
  stopA:string,
  stopB:string,
  stopTimes:Record<string,any[]>
){

  const timesA = stopTimes[stopA] || [];
  const timesB = stopTimes[stopB] || [];

  for(const a of timesA){

    const match =
      timesB.find(
        (b:any)=>b.trip_id === a.trip_id
      );

    if(match){

      const toSec=(t:string)=>{

        const p=t.split(":");

        return (
          parseInt(p[0])*3600+
          parseInt(p[1])*60+
          parseInt(p[2])
        );

      };

      const diff =
        toSec(match.arrival) -
        toSec(a.departure);

      return Math.round(diff/60);

    }

  }

  return null;

}

export default function RoutesSidebar({
  selectedRoute,
  selectedTerminal,
  onSelectRoute,
  onSelectTerminal
}: Props) {

  const [routes,setRoutes] = useState<any[]>([]);
  const [terminals,setTerminals] = useState<any>({});
  const [todayStopTimes,setTodayStopTimes] =
    useState<Record<string,any[]>>({});
  const [routeStops,setRouteStops] =
    useState<Record<string,any[]>>({});

  useEffect(()=>{

    fetch("/api/routes-data")
      .then(r=>r.json())
      .then(data=>{

        if(!data?.routes?.features) return;

        const routes =
          data.routes.features.map(
            (f:any)=>f.properties
          );

        const uniqueRoutes = Array.from(
          new Map(
            routes
              .filter((r:any)=>r.route_short_name)
              .map((r:any)=>[
                r.route_short_name,
                r
              ])
          ).values()
        );

        uniqueRoutes.sort((a:any,b:any)=>
          a.route_short_name.localeCompare(
            b.route_short_name,
            undefined,
            {numeric:true}
          )
        );

        setRoutes(uniqueRoutes);
        setTerminals(data.terminals || {});
        setTodayStopTimes(data.todayStopTimes || {});
        setRouteStops(data.routeStops || {});

      });

  },[]);


  return (

    <div
      style={{
        width:240,
        background:"#fff",
        borderRight:"1px solid #e5e5e5",
        padding:12,
        overflowY:"auto"
      }}
    >

      <div
        style={{
          fontWeight:700,
          marginBottom:14,
          fontSize:16
        }}
      >
        Linee Navigazione
      </div>

      {routes.map(route=>{

        const color =
          route.route_color
            ? `#${route.route_color}`
            : "#666";

        const active =
          selectedRoute === route.route_short_name;

        const routeTerminals =
          terminals[route.route_id];

        /* minuti percorrenza */
        const duration =
          routeTerminals
            ? getRouteDuration(
                routeTerminals.A?.stop_id,
                routeTerminals.B?.stop_id,
                todayStopTimes
              )
            : null;

        /* numero fermate */
        const stopsCount =
          routeStops[route.route_id]
            ? routeStops[route.route_id].length
            : null;

        return (

          <div key={route.route_short_name}>

            {/* LINEA */}
            <div
              onClick={()=>{

                if(selectedRoute === route.route_short_name){
                  onSelectRoute(null);
                  onSelectTerminal(null);
                }else{
                  onSelectRoute(route.route_short_name);
                  onSelectTerminal(null);
                }

              }}
              style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                padding:"8px 0",
                marginBottom:4,
                cursor:"pointer",
                borderRadius:8,
                fontWeight:700,
                border:`2px solid ${color}`,
                background:active ? color : "#fff",
                color:active ? "#fff" : color,
                fontSize:14
              }}
            >
              {route.route_short_name}
            </div>

            {/* MINUTI + FERMATE */}
            {(duration || stopsCount) && (

              <div
                style={{
                  fontSize:11,
                  color:"#666",
                  textAlign:"center",
                  marginBottom:6
                }}
              >
                {duration && `⏱ ${duration} min`}
                {duration && stopsCount && " • "}
                {stopsCount && `🚏 ${stopsCount} fermate`}
              </div>

            )}


            {/* DIREZIONI */}
            {active && routeTerminals && (

              <div
                style={{
                  marginBottom:16,
                  paddingLeft:10,
                  borderLeft:"3px solid #ddd"
                }}
              >

                {/* TERMINAL A */}
                <div
                  onClick={()=>onSelectTerminal("A")}
                  style={{
                    cursor:"pointer",
                    fontSize:13,
                    padding:"4px 0",
                    fontWeight:
                      selectedTerminal === "A"
                        ? 700
                        : 400
                  }}
                >
                  → {routeTerminals.A?.name}

                  <div style={{fontSize:11,color:"#666"}}>

                    {getUpcomingTimes(
                      todayStopTimes[
                        routeTerminals.A?.stop_id
                      ] || []
                    ).map((t:any)=>(
                      <div key={t.arrival}>
                        {t.arrival}
                      </div>
                    ))}

                  </div>

                </div>


                {/* TERMINAL B */}
                <div
                  onClick={()=>onSelectTerminal("B")}
                  style={{
                    cursor:"pointer",
                    fontSize:13,
                    padding:"4px 0",
                    fontWeight:
                      selectedTerminal === "B"
                        ? 700
                        : 400
                  }}
                >
                  → {routeTerminals.B?.name}

                  <div style={{fontSize:11,color:"#666"}}>

                    {getUpcomingTimes(
                      todayStopTimes[
                        routeTerminals.B?.stop_id
                      ] || []
                    ).map((t:any)=>(
                      <div key={t.arrival}>
                        {t.arrival}
                      </div>
                    ))}

                  </div>

                </div>

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}