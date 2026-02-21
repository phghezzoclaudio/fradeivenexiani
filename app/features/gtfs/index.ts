import { loadGTFS } from "./parser";
import type { Stop, StopTime } from "./types";

let cache: any = null;

export function getGTFSIndex() {
  if (cache) return cache;

  console.log("⚡ Building GTFS index...");

  const { stops, stopTimes } = loadGTFS();

  // stop_name → stop
  const stopsByName = new Map<string, Stop>();
  const stopsById = new Map<string, Stop>();

  for (const s of stops) {
    stopsByName.set(s.stop_name.toLowerCase(), s);
    stopsById.set(s.stop_id, s);
  }

  // stop_id → stopTimes[]
  const stopTimesByStop = new Map<string, StopTime[]>();
  const tripsById = new Map<string, StopTime[]>();

  for (const st of stopTimes) {
    // per stop
    if (!stopTimesByStop.has(st.stop_id)) {
      stopTimesByStop.set(st.stop_id, []);
    }
    stopTimesByStop.get(st.stop_id)!.push(st);

    // per trip
    if (!tripsById.has(st.trip_id)) {
      tripsById.set(st.trip_id, []);
    }
    tripsById.get(st.trip_id)!.push(st);
  }

  // ordina le trip
  for (const arr of tripsById.values()) {
    arr.sort(
      (a, b) => Number(a.stop_sequence) - Number(b.stop_sequence)
    );
  }

  cache = { stopsByName, stopsById, stopTimesByStop, tripsById };
  return cache;
}