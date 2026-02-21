import fs from "fs";
import path from "path";
import Papa from "papaparse";

function loadCSV(file: string) {
  const filePath = path.join(process.cwd(), "data/gtfs", file);
  const content = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data as any[];
}

export function loadGTFS() {
  const stops = loadCSV("stops.txt");
  const stopTimes = loadCSV("stop_times.txt");

  return { stops, stopTimes };
}