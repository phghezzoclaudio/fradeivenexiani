import path from "path";
import AdmZip from "adm-zip";
import Papa from "papaparse";

let zipCache: AdmZip | null = null;

function getZip(): AdmZip {

  if (!zipCache) {

    const zipPath = path.join(
      process.cwd(),
      "data/gtfs/actv__nav.zip"
    );

    zipCache = new AdmZip(zipPath);

  }

  return zipCache;

}

function readCSV(file: string): any[] {

  const zip = getZip();

  const entry = zip.getEntry(file);

  if (!entry)
    throw new Error(`${file} missing`);

  const text =
    entry.getData().toString("utf8");

  const parsed = Papa.parse(text, {

    header: true,

    skipEmptyLines: true

  });

  return parsed.data;

}

export function loadGTFS() {

  return {

    stops:
      readCSV("stops.txt"),

    stopTimes:
      readCSV("stop_times.txt"),

    trips:
      readCSV("trips.txt"),

    shapes:
      readCSV("shapes.txt"),

    routes:
      readCSV("routes.txt")

  };

}