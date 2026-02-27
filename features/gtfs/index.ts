import { loadGTFS } from "./parser";
import type { Stop, StopTime } from "./types";

let cache: any = null;

export function getGTFSIndex() {

  if (cache) return cache;

  const gtfs = loadGTFS();

  const stops = gtfs.stops as Stop[];
  const stopTimes = gtfs.stopTimes as StopTime[];

  const stopTimesByTrip = new Map<string, StopTime[]>();

  for (const st of stopTimes) {

    if (!stopTimesByTrip.has(st.trip_id)) {
      stopTimesByTrip.set(st.trip_id, []);
    }

    stopTimesByTrip.get(st.trip_id)!.push(st);

  }

  cache = {
    stops,
    stopTimesByTrip
  };

  console.log(
    "GTFS indexed:",
    stops.length,
    "stops",
    stopTimesByTrip.size,
    "trips"
  );

  return cache;

}