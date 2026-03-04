import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* cache server 1 ora */
export const revalidate = 3600;

function readJSON(base: string, file: string) {

  const filePath = path.join(base, file);

  if (!fs.existsSync(filePath)) {
    console.warn("File mancante:", file);
    return null;
  }

  return JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

}

export async function GET() {

  try {

    const base =
      path.join(process.cwd(), "public", "data");

    const shapes =
      readJSON(base, "shapes.geojson");

    const stops =
      readJSON(base, "stops.geojson");

    const routes =
      readJSON(base, "routes.geojson");

    const todayStopTimes =
      readJSON(base, "today_stop_times.json");

    const stopRoutes =
      readJSON(base, "stop_routes.json");

    const terminals =
      readJSON(base, "route_terminals.json");

    return NextResponse.json({
      shapes,
      stops,
      routes,
      todayStopTimes,
      stopRoutes,
      terminals
    });

  } catch (error: any) {

    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}