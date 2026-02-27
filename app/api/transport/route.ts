import { NextResponse } from "next/server";
import { findDirectRoute } from "@/features/gtfs/searchRoute";
import { buildTripPath } from "@/features/gtfs/buildPath";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to)
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    );

  const result = await findDirectRoute(from, to);

  if (!result)
    return NextResponse.json(
      { error: "Route not found" },
      { status: 404 }
    );

  const path = buildTripPath(result.tripId);

  return NextResponse.json({
    line: result.line,
    departure: result.departure,
    arrival: result.arrival,
    duration: result.duration,
    stops: result.stopsBetween,
    path
  });
}