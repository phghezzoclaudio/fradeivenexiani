import { NextResponse } from "next/server";
import { findDirectRoute } from "@/features/gtfs/searchRoute";

export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url);

  const from =
    searchParams.get("from");

  const to =
    searchParams.get("to");

  if (!from || !to)
    return NextResponse.json(
      { error: "missing params" },
      { status: 400 }
    );

  const route =
    findDirectRoute(from, to);

  if (!route)
    return NextResponse.json(
      { error: "no route found" },
      { status: 404 }
    );

  return NextResponse.json(route);

}