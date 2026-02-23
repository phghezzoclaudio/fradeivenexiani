import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";

const ZIP_PATH = path.resolve(
  process.cwd(),
  "data",
  "gtfs",
  "actv__nav.zip"
);

console.log("ZIP PATH:", ZIP_PATH);
console.log("ZIP EXISTS:", fs.existsSync(ZIP_PATH));

function parseCSV(text: string) {
  const lines = text.split("\n").filter(Boolean);
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};

    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim();
    });

    return obj;
  });
}

export async function loadGTFS() {
  const zip = new AdmZip(ZIP_PATH);

  const files = {
    stops: "stops.txt",
    trips: "trips.txt",
    stopTimes: "stop_times.txt",
    routes: "routes.txt",
    calendar: "calendar.txt",
    calendarDates: "calendar_dates.txt",
  };

  const data: any = {};

  for (const key in files) {
    const entry = zip.getEntry(files[key as keyof typeof files]);

    if (!entry) {
      console.error("Missing file in zip:", files[key as keyof typeof files]);
      data[key] = [];
      continue;
    }

    const content = entry.getData().toString("utf8");
    data[key] = parseCSV(content);
  }

  return data;
}