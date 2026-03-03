const https = require("https");
const fs = require("fs");
const unzipper = require("unzipper");
const csv = require("csv-parser");

const GTFS_URL =
"https://actv.avmspa.it/sites/default/files/attachments/opendata/navigazione/actv__nav.zip ";

const ZIP_PATH = "./actv_nav.zip";
const EXTRACT_PATH = "./gtfs";
const OUTPUT_PATH = "./data";

function downloadGTFS() {

  return new Promise((resolve, reject) => {

    const file = fs.createWriteStream(ZIP_PATH);

    https.get(GTFS_URL, response => {

      response.pipe(file);

      file.on("finish", () => {
        file.close(resolve);
      });

    }).on("error", reject);

  });

}

function extractZip() {

  return fs.createReadStream(ZIP_PATH)
    .pipe(unzipper.Extract({ path: EXTRACT_PATH }))
    .promise();

}

function parseCSV(file) {

  return new Promise(resolve => {

    const results = [];

    fs.createReadStream(`${EXTRACT_PATH}/${file}`)
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
    `${OUTPUT_PATH}/stops.geojson`,
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
    `${OUTPUT_PATH}/routes.geojson`,
    JSON.stringify(geojson)
  );

}

async function convertShapes() {

  const shapes = await parseCSV("shapes.txt");

  const grouped = {};

  shapes.forEach(shape => {

    if (!grouped[shape.shape_id])
      grouped[shape.shape_id] = [];

    grouped[shape.shape_id].push([
      parseFloat(shape.shape_lon),
      parseFloat(shape.shape_lat)
    ]);

  });

  const geojson = {
    type: "FeatureCollection",
    features: Object.entries(grouped).map(
      ([id, coords]) => ({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords
        },
        properties: { shape_id: id }
      })
    )
  };

  fs.writeFileSync(
    `${OUTPUT_PATH}/shapes.geojson`,
    JSON.stringify(geojson)
  );

}

async function convertStopTimes() {

  const stopTimes = await parseCSV("stop_times.txt");

  const result = {};

  stopTimes.forEach(st => {

    if (!result[st.stop_id])
      result[st.stop_id] = [];

    result[st.stop_id].push({
      arrival: st.arrival_time,
      departure: st.departure_time,
      trip_id: st.trip_id
    });

  });

  fs.writeFileSync(
    `${OUTPUT_PATH}/stop_times.json`,
    JSON.stringify(result)
  );

}

async function run() {

  if (!fs.existsSync(OUTPUT_PATH))
    fs.mkdirSync(OUTPUT_PATH);

  console.log("Downloading GTFS...");
  await downloadGTFS();

  console.log("Extracting...");
  await extractZip();

  console.log("Converting...");
  await convertStops();
  await convertRoutes();
  await convertShapes();
  await convertStopTimes();

  console.log("GTFS updated successfully");

}

run();