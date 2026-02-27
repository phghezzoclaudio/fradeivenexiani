import { NextResponse } from "next/server";
import { getGTFSIndex } from "@/features/gtfs/index";
import { buildShapePath } from "@/features/gtfs/buildShapePath";
import { buildStopsFromTrip } from "@/features/gtfs/buildStopsFromTrip";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const routeId =
    searchParams.get("routeId");

  const { trips } = getGTFSIndex();

  const trip =
    trips.find(
      (t: any) =>
        t.route_id === routeId
    );

  if (!trip)
    return NextResponse.json(null);

  return NextResponse.json({

    path:
      buildShapePath(trip.shape_id),

    stops:
      buildStopsFromTrip(trip.trip_id)

  });

}