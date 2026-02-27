import { loadGTFS } from "./parser";

import type {
  Stop,
  StopTime,
  Trip,
  Route,
  Shape
} from "./types";

let cached: any = null;

export function getGTFSIndex() {

  if (cached) return cached;

  const data = loadGTFS();

  const stops = data.stops as Stop[];
  const trips = data.trips as Trip[];
  const routes = data.routes as Route[];
  const stopTimes = data.stopTimes as StopTime[];
  const shapes = data.shapes as Shape[];

  /* ========================
     STOPS BY ID
  ======================== */

  const stopsById = new Map<string, Stop>();

  for (const stop of stops)
    stopsById.set(stop.stop_id, stop);

  /* ========================
     TRIPS BY ID
  ======================== */

  const tripsById = new Map<string, Trip>();

  for (const trip of trips)
    tripsById.set(trip.trip_id, trip);

  /* ========================
     ROUTES BY ID
  ======================== */

  const routesById = new Map<string, Route>();

  for (const route of routes)
    routesById.set(route.route_id, route);

  /* ========================
     STOP TIMES BY TRIP
  ======================== */

  const stopTimesByTrip = new Map<string, StopTime[]>();

  for (const st of stopTimes) {

    if (!stopTimesByTrip.has(st.trip_id))
      stopTimesByTrip.set(st.trip_id, []);

    stopTimesByTrip.get(st.trip_id)!.push(st);

  }

  for (const arr of stopTimesByTrip.values()) {

    arr.sort(
      (a, b) =>
        Number(a.stop_sequence) -
        Number(b.stop_sequence)
    );

  }

  /* ========================
     SHAPES BY ID
  ======================== */

  const shapesById = new Map<string, Shape[]>();

  for (const shape of shapes) {

    if (!shapesById.has(shape.shape_id))
      shapesById.set(shape.shape_id, []);

    shapesById.get(shape.shape_id)!.push(shape);

  }

  for (const arr of shapesById.values()) {

    arr.sort(
      (a, b) =>
        Number(a.shape_pt_sequence) -
        Number(b.shape_pt_sequence)
    );

  }

  /* ========================
     CACHE
  ======================== */

  cached = {

    stops,
    trips,
    routes,
    stopTimes,

    stopsById,
    tripsById,
    routesById,
    stopTimesByTrip,
    shapesById

  };

  console.log(
    "GTFS loaded:",
    stops.length,
    "stops",
    trips.length,
    "trips",
    routes.length,
    "routes"
  );

  return cached;

}