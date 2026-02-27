import { loadGTFS } from "./parser";
import type { Stop, StopTime } from "./types";

let cache: any = null;

export function getGTFSIndex() {

  if (cache) return cache;

  const data = loadGTFS();

  const stops = data.stops as Stop[];
  const stopTimes = data.stopTimes as StopTime[];

  const stopsById = new Map(
    stops.map(s => [s.stop_id, s])
  );

  const stopTimesByTrip = new Map<string, StopTime[]>();

  for (const st of stopTimes) {

    if (!stopTimesByTrip.has(st.trip_id)) {
      stopTimesByTrip.set(st.trip_id, []);
    }

    stopTimesByTrip.get(st.trip_id)!.push(st);

  }

  cache = {

    stops,
    stopsById,
    stopTimesByTrip

  };

  console.log(
    "GTFS loaded:",
    stops.length,
    "stops",
    stopTimesByTrip.size,
    "trips"
  );

  return cache;

}