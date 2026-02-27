import path from "path";
import Papa from "papaparse";
import AdmZip from "adm-zip";

let cache: any = null;

export function loadGTFS() {

  if (cache) return cache;

  const zipPath = path.join(
    process.cwd(),
    "data/gtfs/actv__nav.zip"
  );

  const zip = new AdmZip(zipPath);

  function load(file: string) {

    const entry = zip.getEntry(file);

    if (!entry)
      throw new Error(`${file} missing in zip`);

    const txt = entry.getData().toString("utf8");

    return Papa.parse(txt, {
      header: true,
      skipEmptyLines: true,
    }).data;

  }

  cache = {
    stops: load("stops.txt"),
    stopTimes: load("stop_times.txt"),
    trips: load("trips.txt"),
    shapes: load("shapes.txt"),
  };

  return cache;

}