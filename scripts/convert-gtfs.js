const fs = require("fs");
const unzipper = require("unzipper");
const csv = require("csv-parser");

const zipPath = "./actv_nav.zip";
const extractPath = "./gtfs";
const outputPath = "./data";

async function extractZip() {
  if (fs.existsSync(extractPath)) {
    fs.rmSync(extractPath, { recursive: true, force: true });
  }
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

  fs.writeFileSync(`${outputPath}/stops.geojson`, JSON.stringify(geojson));
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

  fs.writeFileSync(`${outputPath}/routes.geojson`, JSON.stringify(geojson));
}

async function convertShapes() {
  const shapes = await parseCSV("shapes.txt");
  const trips = await parseCSV("trips.txt");

  // shape_id → route_id
  const shapeRouteMap = {};
  trips.forEach(trip => {
    if (!shapeRouteMap[trip.shape_id]) {
      shapeRouteMap[trip.shape_id] = trip.route_id;
    }
  });

  const grouped = {};

  shapes.forEach(row => {
    if (!grouped[row.shape_id]) {
      grouped[row.shape_id] = [];
    }

    grouped[row.shape_id].push({
      lon: parseFloat(row.shape_pt_lon),
      lat: parseFloat(row.shape_pt_lat),
      seq: parseInt(row.shape_pt_sequence)
    });
  });

  const features = Object.keys(grouped).map(shape_id => {
    const ordered = grouped[shape_id]
      .sort((a, b) => a.seq - b.seq);

    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: ordered.map(p => [p.lon, p.lat])
      },
      properties: {
        shape_id,
        route_id: shapeRouteMap[shape_id] || null
      }
    };
  });

  fs.writeFileSync(
    `${outputPath}/shapes.geojson`,
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
  const calendarDates = fs.existsSync(`${extractPath}/calendar_dates.txt`)
    ? await parseCSV("calendar_dates.txt")
    : [];

  const today = new Date();
  const yyyymmdd = today.toISOString().slice(0,10).replace(/-/g,"");
  const weekday = today.getDay();

  const validServices = new Set();

  calendar.forEach(row => {

    if (yyyymmdd < row.start_date || yyyymmdd > row.end_date)
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

    if (days[weekday] === "1") {
      validServices.add(row.service_id);
    }

  });

  calendarDates.forEach(row => {
    if (row.date === yyyymmdd) {
      if (row.exception_type === "1")
        validServices.add(row.service_id);
      if (row.exception_type === "2")
        validServices.delete(row.service_id);
    }
  });

  const validTrips = new Set();
  trips.forEach(trip => {
    if (validServices.has(trip.service_id)) {
      validTrips.add(trip.trip_id);
    }
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
    `${outputPath}/today_stop_times.json`,
    JSON.stringify(result)
  );
}

async function convertFeedInfo() {
  if (!fs.existsSync(`${extractPath}/feed_info.txt`)) return;

  const feedInfo = await parseCSV("feed_info.txt");

  fs.writeFileSync(
    `${outputPath}/feed_info.json`,
    JSON.stringify(feedInfo[0])
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

  console.log("Converting shapes...");
  await convertShapes();

  console.log("Converting today's stop times...");
  await convertTodayStopTimes();

  console.log("Converting feed info...");
  await convertFeedInfo();

  console.log("✅ All done.");
}

run();