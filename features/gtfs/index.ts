import { loadGTFS } from "./parser";

let cachedIndex: any = null;

export function getGTFSIndex() {
  if (cachedIndex) return cachedIndex;

  console.log("⚡ Building GTFS index...");

  const { stops, trips, stop_times, routes } = loadGTFS();

  const stopsById = new Map();
  const tripsById = new Map();

  stops.forEach((s: any) => {
    stopsById.set(s.stop_id, s);
  });

  stop_times.forEach((st: any) => {
    if (!tripsById.has(st.trip_id)) {
      tripsById.set(st.trip_id, []);
    }
    tripsById.get(st.trip_id).push(st);
  });

  cachedIndex = {
    stopsById,
    tripsById,
    tripsRaw: trips,
    routesRaw: routes,
  };

  return cachedIndex;
}