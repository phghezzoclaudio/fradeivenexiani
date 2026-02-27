import { getGTFSIndex } from "./index";
import type { StopTime } from "./types";

export function findDirectRoute(
  fromStopId: string,
  toStopId: string
) {

  const { stopTimes } = getGTFSIndex();

  if (!stopTimes || stopTimes.length === 0) {

    console.log("No stopTimes loaded");

    return null;

  }

  // raggruppa per trip_id
  const trips = new Map<string, StopTime[]>();

  stopTimes.forEach((st: StopTime) => {

    if (!trips.has(st.trip_id)) {

      trips.set(st.trip_id, []);

    }

    trips.get(st.trip_id)!.push(st);

  });

  // controlla ogni trip
  for (const [tripId, times] of trips.entries()) {

    const ordered = times.sort(
      (a, b) =>
        Number(a.stop_sequence)
        - Number(b.stop_sequence)
    );

    let fromIndex = -1;
    let toIndex = -1;

    ordered.forEach((t, index) => {

      if (t.stop_id === fromStopId)
        fromIndex = index;

      if (t.stop_id === toStopId)
        toIndex = index;

    });

    if (
      fromIndex !== -1 &&
      toIndex !== -1 &&
      fromIndex < toIndex
    ) {

      return {

        tripId,
        fromStopId,
        toStopId,
        stopsCount: toIndex - fromIndex,
        departure: ordered[fromIndex].departure_time,
        arrival: ordered[toIndex].arrival_time,

      };

    }

  }

  return null;

}