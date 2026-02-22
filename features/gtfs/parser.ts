import fs from "fs";
import path from "path";
import csv from "csv-parser";

const GTFS_PATH = path.join(process.cwd(), "data/gtfs");

function loadCSV(file: string): Promise<any[]> {
  return new Promise((resolve) => {
    const results: any[] = [];
    fs.createReadStream(path.join(GTFS_PATH, file))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

export async function loadGTFS() {
  const [stops, trips, stopTimes, routes, calendar, calendarDates] =
    await Promise.all([
      loadCSV("stops.txt"),
      loadCSV("trips.txt"),
      loadCSV("stop_times.txt"),
      loadCSV("routes.txt"),
      loadCSV("calendar.txt"),
      loadCSV("calendar_dates.txt"),
    ]);

  return { stops, trips, stopTimes, routes, calendar, calendarDates };
}