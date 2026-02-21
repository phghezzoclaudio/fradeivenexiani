import path from "path";
import Papa from "papaparse";
import AdmZip from "adm-zip";
import type { Stop, StopTime } from "./types";

let zipCache: AdmZip | null = null;

function getZip() {
  if (!zipCache) {
    const zipPath = path.join(process.cwd(), "data/gtfs/actv__nav.zip");
    zipCache = new AdmZip(zipPath);
  }
  return zipCache;
}

function loadCSVFromZip<T>(fileName: string): T[] {
  const zip = getZip();
  const entry = zip.getEntry(fileName);

  if (!entry) {
    throw new Error(`File ${fileName} not found inside GTFS zip`);
  }

  const content = entry.getData().toString("utf8");

  const parsed = Papa.parse<T>(content, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

export function loadGTFS() {
  return {
    stops: loadCSVFromZip<Stop>("stops.txt"),
    stopTimes: loadCSVFromZip<StopTime>("stop_times.txt"),
    trips: loadCSVFromZip<any>("trips.txt"),
    routes: loadCSVFromZip<any>("routes.txt"),
    shapes: loadCSVFromZip<any>("shapes.txt"),
  };
}