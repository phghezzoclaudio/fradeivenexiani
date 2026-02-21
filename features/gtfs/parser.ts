import path from "path";
import fs from "fs";
import Papa from "papaparse";
import AdmZip from "adm-zip";

let zipCache: AdmZip | null = null;

function getZip() {
  if (!zipCache) {
    const zipPath = path.join(process.cwd(), "data/gtfs/actv__nav.zip");
    zipCache = new AdmZip(zipPath);
  }
  return zipCache;
}

function loadCSVFromZip(fileName: string) {
  const zip = getZip();
  const entry = zip.getEntry(fileName);

  if (!entry) {
    throw new Error(`File ${fileName} not found inside GTFS zip`);
  }

  const content = entry.getData().toString("utf8");

  const parsed = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

export function loadGTFS() {
  return {
    stops: loadCSVFromZip("stops.txt"),
    routes: loadCSVFromZip("routes.txt"),
    trips: loadCSVFromZip("trips.txt"),
    stopTimes: loadCSVFromZip("stop_times.txt"),
    shapes: loadCSVFromZip("shapes.txt"),
  };
}