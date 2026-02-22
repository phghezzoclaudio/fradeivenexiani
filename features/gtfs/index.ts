import { DateTime } from "luxon";
import { loadGTFS } from "./parser";

let cache: any = null;

export async function getGTFSIndex() {
  if (cache) return cache;

  const data = await loadGTFS();

  const stopsById = new Map();
  const tripsById = new Map();
  const tripsByRoute = new Map();

  data.stops.forEach((s: any) => stopsById.set(s.stop_id, s));

  data.stopTimes.forEach((st: any) => {
    if (!tripsById.has(st.trip_id)) tripsById.set(st.trip_id, []);
    tripsById.get(st.trip_id).push(st);
  });

  data.trips.forEach((trip: any) => {
    if (!tripsByRoute.has(trip.route_id))
      tripsByRoute.set(trip.route_id, []);
    tripsByRoute.get(trip.route_id).push(trip);
  });

  cache = {
    ...data,
    stopsById,
    tripsById,
    tripsByRoute,
  };

  return cache;
}

export function getRomeNow() {
  return DateTime.now().setZone("Europe/Rome");
}

export function timeToSeconds(t: string) {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}