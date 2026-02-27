import { NextResponse }
from "next/server";

import {
  findDirectRoute
}
from "@/features/gtfs/searchRoute";

export async function GET(
  req: Request
) {

  const { searchParams }
    = new URL(req.url);

  const from =
    searchParams.get("from");

  const to =
    searchParams.get("to");

  if (!from || !to)
    return NextResponse.json(
      null
    );

  const result =
    findDirectRoute(from,to);

  return NextResponse.json(
    result
  );

}