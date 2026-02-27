import { NextResponse } from "next/server";
import { getGTFSIndex } from "@/features/gtfs/index";
import type { Stop } from "@/features/gtfs/types";

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/"/g, "")
    .trim();
}

export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url);

  const query =
    normalize(
      searchParams.get("q") || ""
    );

  const { stops } =
    getGTFSIndex();

  if (!query)
    return NextResponse.json([]);

  const results =
    stops
      .filter((s: Stop) =>
        normalize(s.stop_name)
          .includes(query)
      )
      .slice(0, 10);

  return NextResponse.json(results);

}