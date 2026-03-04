const https = require("https");
const fs = require("fs");
const unzipper = require("unzipper");
const csv = require("csv-parser");

const GTFS_URL =
"https://actv.avmspa.it/sites/default/files/attachments/opendata/navigazione/actv__nav.zip";

const ZIP_PATH = "./actv_nav.zip";
const EXTRACT_PATH = "./gtfs";
const OUTPUT_PATH = "./public/data";


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

  if (fs.existsSync(EXTRACT_PATH))
    fs.rmSync(EXTRACT_PATH, { recursive: true, force: true });

  return fs
    .createReadStream(ZIP_PATH)
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
  const trips = await parseCSV("trips.txt");
  const routes = await parseCSV("routes.txt");

  const routeMap = {};
  routes.forEach(r => {
    routeMap[r.route_id] = r;
  });

  const routeShapes = {};

  trips.forEach(trip => {

    if (!routeShapes[trip.route_id])
      routeShapes[trip.route_id] = new Set();

    routeShapes[trip.route_id].add(trip.shape_id);

  });

  const groupedShapes = {};

  shapes.forEach(row => {

    if (!groupedShapes[row.shape_id])
      groupedShapes[row.shape_id] = [];

    groupedShapes[row.shape_id].push({
      lon: parseFloat(row.shape_pt_lon),
      lat: parseFloat(row.shape_pt_lat),
      seq: parseInt(row.shape_pt_sequence)
    });

  });

  const features = [];

  Object.entries(routeShapes).forEach(
    ([route_id, shapeSet]) => {

      let bestShape = null;
      let maxPoints = 0;

      shapeSet.forEach(shape_id => {

        const pts = groupedShapes[shape_id];
        if (!pts) return;

        if (pts.length > maxPoints) {
          maxPoints = pts.length;
          bestShape = shape_id;
        }

      });

      if (!bestShape) return;

      const ordered =
        groupedShapes[bestShape]
        .sort((a,b) => a.seq - b.seq);

      const route = routeMap[route_id] || {};

      features.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: ordered.map(p => [
            p.lon,
            p.lat
          ])
        },
        properties: {
          route_id,
          route_short_name: route.route_short_name,
          route_color: route.route_color,
          shape_id: bestShape
        }
      });

    }
  );

  fs.writeFileSync(
    `${OUTPUT_PATH}/shapes.geojson`,
    JSON.stringify({
      type: "FeatureCollection",
      features
    })
  );

}


async function convertTodayStopTimes() {

  const stopTimes = await parseCSV("stop_times.txt");
  const trips = await parseCSV("trips.txt");
  const calendar = await parseCSV("calendar.txt");

  const today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Europe/Rome"
    })
  );

  const yyyymmdd =
    today.toISOString().slice(0,10).replace(/-/g,"");

  const weekday = today.getDay();

  const validServices = new Set();

  calendar.forEach(row => {

    if (yyyymmdd < row.start_date ||
        yyyymmdd > row.end_date)
      return;

    const days = [
      row.sunday,
      row.monday,
      row.tuesday,
      row.wednesday,
      row.thursday,
      row.friday,
      row.saturday
    ];

    if (days[weekday] === "1")
      validServices.add(row.service_id);

  });

  const validTrips = new Set();

  trips.forEach(trip => {

    if (validServices.has(trip.service_id))
      validTrips.add(trip.trip_id);

  });

  const result = {};

  stopTimes.forEach(st => {

    if (!validTrips.has(st.trip_id))
      return;

    if (!result[st.stop_id])
      result[st.stop_id] = [];

    result[st.stop_id].push({
      arrival: st.arrival_time,
      departure: st.departure_time,
      trip_id: st.trip_id
    });

  });

  fs.writeFileSync(
    `${OUTPUT_PATH}/today_stop_times.json`,
    JSON.stringify(result)
  );

}


async function convertStopRoutes() {

  const stopTimes = await parseCSV("stop_times.txt");
  const trips = await parseCSV("trips.txt");

  const tripRouteMap = {};

  trips.forEach(trip => {
    tripRouteMap[trip.trip_id] = trip.route_id;
  });

  const stopRoutes = {};

  stopTimes.forEach(st => {

    const route_id = tripRouteMap[st.trip_id];
    if (!route_id) return;

    if (!stopRoutes[st.stop_id])
      stopRoutes[st.stop_id] = new Set();

    stopRoutes[st.stop_id].add(route_id);

  });

  const result = {};

  Object.entries(stopRoutes).forEach(
    ([stop_id, routes]) => {
      result[stop_id] = Array.from(routes);
    }
  );

  fs.writeFileSync(
    `${OUTPUT_PATH}/stop_routes.json`,
    JSON.stringify(result)
  );

}


async function convertRouteTerminals() {

  const stopTimes = await parseCSV("stop_times.txt");
  const trips = await parseCSV("trips.txt");
  const stops = await parseCSV("stops.txt");

  const stopNames = {};

  stops.forEach(stop => {
    stopNames[stop.stop_id] = stop.stop_name;
  });

  const tripStops = {};

  stopTimes.forEach(st => {

    if (!tripStops[st.trip_id])
      tripStops[st.trip_id] = [];

    tripStops[st.trip_id].push({
      stop_id: st.stop_id,
      seq: parseInt(st.stop_sequence)
    });

  });

  const routeTrips = {};

  trips.forEach(trip => {

    if (!routeTrips[trip.route_id])
      routeTrips[trip.route_id] = [];

    routeTrips[trip.route_id].push(trip.trip_id);

  });

  const terminals = {};

  Object.entries(routeTrips).forEach(
    ([route_id, tripIds]) => {

      let bestTrip = null;
      let maxStops = 0;

      tripIds.forEach(trip_id => {

        const stops = tripStops[trip_id];
        if (!stops) return;

        if (stops.length > maxStops) {
          maxStops = stops.length;
          bestTrip = stops;
        }

      });

      if (!bestTrip) return;

      const ordered =
        bestTrip.sort((a,b)=>a.seq-b.seq);

      const first = ordered[0];
      const last = ordered[ordered.length-1];

      terminals[route_id] = {

        A:{
          stop_id:first.stop_id,
          name:stopNames[first.stop_id]
        },

        B:{
          stop_id:last.stop_id,
          name:stopNames[last.stop_id]
        }

      };

    }
  );

  fs.writeFileSync(
    `${OUTPUT_PATH}/route_terminals.json`,
    JSON.stringify(terminals)
  );

}


async function convertRouteStops() {

  const stopTimes = await parseCSV("stop_times.txt");
  const trips = await parseCSV("trips.txt");

  const tripRouteMap = {};

  trips.forEach(trip => {
    tripRouteMap[trip.trip_id] = trip.route_id;
  });

  const routeStops = {};

  stopTimes.forEach(st => {

    const route_id = tripRouteMap[st.trip_id];
    if (!route_id) return;

    if (!routeStops[route_id])
      routeStops[route_id] = [];

    routeStops[route_id].push({
      stop_id: st.stop_id,
      seq: parseInt(st.stop_sequence)
    });

  });

  Object.keys(routeStops).forEach(route_id => {

    routeStops[route_id].sort(
      (a,b)=>a.seq-b.seq
    );

  });

  fs.writeFileSync(
    `${OUTPUT_PATH}/route_stops.json`,
    JSON.stringify(routeStops)
  );

}


async function run() {

  if (!fs.existsSync("./public"))
    fs.mkdirSync("./public");

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
  await convertTodayStopTimes();
  await convertStopRoutes();
  await convertRouteTerminals();
  await convertRouteStops();

  console.log("✅ GTFS updated successfully");

}

run();