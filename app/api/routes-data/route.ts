import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// cache 1 ora (migliora performance)
export const revalidate = 3600;

export async function GET() {

  try {

    const base = path.join(
      process.cwd(),
      "public",
      "data"
    );

    const shapes = JSON.parse(
      fs.readFileSync(
        path.join(base, "shapes.geojson"),
        "utf8"
      )
    );

    const stops = JSON.parse(
      fs.readFileSync(
        path.join(base, "stops.geojson"),
        "utf8"
      )
    );

    const routes = JSON.parse(
      fs.readFileSync(
        path.join(base, "routes.geojson"),
        "utf8"
      )
    );

    const todayStopTimes = JSON.parse(
      fs.readFileSync(
        path.join(base, "today_stop_times.json"),
        "utf8"
      )
    );

    const stopRoutes = JSON.parse(
      fs.readFileSync(
        path.join(base, "stop_routes.json"),
        "utf8"
      )
    );

    return NextResponse.json({
      shapes,
      stops,
      routes,
      todayStopTimes,
      stopRoutes
    });

  } catch (error: any) {

    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}
