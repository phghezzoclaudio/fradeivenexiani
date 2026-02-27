import { loadGTFS } from "./parser";
import type { Stop, StopTime } from "./types";

let cache: {
  stops: Stop[];
  stopTimesByTrip: Map<string, StopTime[]>;
} | null = null;

export function getGTFSIndex() {

  if (cache)
    return cache;

  console.log("⚡ Building GTFS index...");

  const gtfs = loadGTFS();

  const stops = gtfs.stops as Stop[];
  const stopTimes = gtfs.stopTimes as StopTime[];

  const stopTimesByTrip = new Map<string, StopTime[]>();

  for (const st of stopTimes) {

    if (!stopTimesByTrip.has(st.trip_id))
      stopTimesByTrip.set(st.trip_id, []);

    stopTimesByTrip.get(st.trip_id)!.push(st);

  }

  // ordina per sequenza
  for (const trip of stopTimesByTrip.values()) {

    trip.sort(
      (a, b) =>
        Number(a.stop_sequence) -
        Number(b.stop_sequence)
    );

  }

  cache = {
    stops,
    stopTimesByTrip
  };

  return cache;

}