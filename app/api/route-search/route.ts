import { NextResponse } from "next/server";
import { findRoute } from "@/features/gtfs/searchRoute";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to)
    return NextResponse.json({ error: "missing params" });

  const route = findRoute(from, to);

  if (!route)
    return NextResponse.json({ error: "no route found" });

  return NextResponse.json(route);

}