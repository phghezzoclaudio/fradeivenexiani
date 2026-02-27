import { NextResponse } from "next/server";
import { findDirectRoute } from "@/features/gtfs/searchRoute";
import { buildTripPath } from "@/features/gtfs/buildPath";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to)
    return NextResponse.json({ error: "missing params" });

  const route = findDirectRoute(from, to);

  if (!route)
    return NextResponse.json({ error: "no route found" });

  const path = buildTripPath(route.tripId);

  return NextResponse.json({

    tripId: route.tripId,
    fromStop: route.fromStop,
    toStop: route.toStop,
    path // ← QUESTO È CRITICO

  });

}