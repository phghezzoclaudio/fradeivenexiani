const fs = require("fs");
const unzipper = require("unzipper");
const csv = require("csv-parser");

const zipPath = "./actv:__nav.zip";
const extractPath = "./gtfs";
const outputPath = "./data";

async function extractZip() {
  await fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();
}

function parseCSV(file) {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(`${extractPath}/${file}`)
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => resolve(results));
  });
}

async function convertStops() {
  const stops = await parseCSV("stops.txt");

  const geojson = {
    type: "FeatureCollection",
    features: stops.map(stop => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(stop.stop_lon),
          parseFloat(stop.stop_lat)
        ]
      },
      properties: stop
    }))
  };

  fs.writeFileSync(
    `${outputPath}/stops.geojson`,
    JSON.stringify(geojson)
  );
}

async function convertRoutes() {
  const routes = await parseCSV("routes.txt");

  const geojson = {
    type: "FeatureCollection",
    features: routes.map(route => ({
      type: "Feature",
      geometry: null,
      properties: route
    }))
  };

  fs.writeFileSync(
    `${outputPath}/routes.geojson`,
    JSON.stringify(geojson)
  );
}

async function convertStopTimes() {
  const stopTimes = await parseCSV("stop_times.txt");

  const result = {};

  stopTimes.forEach(st => {
    if (!result[st.stop_id]) result[st.stop_id] = [];

    result[st.stop_id].push({
      arrival: st.arrival_time,
      departure: st.departure_time,
      trip_id: st.trip_id
    });
  });

  fs.writeFileSync(
    `${outputPath}/stop_times.json`,
    JSON.stringify(result)
  );
}

async function run() {

  if (!fs.existsSync(outputPath))
    fs.mkdirSync(outputPath);

  console.log("Extracting...");
  await extractZip();

  console.log("Converting stops...");
  await convertStops();

  console.log("Converting routes...");
  await convertRoutes();

  console.log("Converting stop_times...");
  await convertStopTimes();

  console.log("Done.");
}

run()