import { getGTFSIndex } from "./index";
import type { StopTime } from "./types";

export function buildTripPath(tripId: string) {

  const { stopTimesByTrip, stopsById } = getGTFSIndex();

  const times = stopTimesByTrip.get(tripId);

  if (!times) return [];

  return (times as StopTime[])
    .map(st => {

      const stop = stopsById.get(st.stop_id);

      if (!stop) return null;

      return {
        lat: parseFloat(stop.stop_lat),
        lon: parseFloat(stop.stop_lon)
      };

    })
    .filter(Boolean);

}