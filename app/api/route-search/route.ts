import { NextResponse } from "next/server";
import { findRoute } from "@/features/gtfs/searchRoute";
import { getGTFSIndex } from "@/features/gtfs/index";
import type { StopTime } from "@/features/gtfs/types";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to)
    return NextResponse.json({
      error: "missing params"
    });

  const result = findRoute(from, to);

  if (!result)
    return NextResponse.json({
      error: "no route found"
    });

  const { stopsById } = getGTFSIndex();

  const stops = result.stopTimes.map((st: StopTime) => {

    const stop = stopsById.get(st.stop_id);

    return {

      stop_id: stop?.stop_id,
      stop_name: stop?.stop_name,
      lat: parseFloat(stop?.stop_lat || "0"),
      lon: parseFloat(stop?.stop_lon || "0"),
      arrival: st.arrival_time,
      departure: st.departure_time

    };

  });

  return NextResponse.json({

    route: result.route,
    tripId: result.tripId,
    stops

  });

}