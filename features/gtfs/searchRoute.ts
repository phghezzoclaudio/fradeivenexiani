import { getGTFSIndex } from "./index";
import type { StopTime } from "./types";

export function findRoute(fromStopId: string, toStopId: string) {

  const {
    stopTimesByTrip,
    tripsById,
    routesById
  } = getGTFSIndex();

  for (const [tripId, stopTimes] of stopTimesByTrip.entries()) {

    const fromIndex = stopTimes.findIndex(
      (st: StopTime) => st.stop_id === fromStopId
    );

    if (fromIndex === -1) continue;

    const toIndex = stopTimes.findIndex(
      (st: StopTime) => st.stop_id === toStopId
    );

    if (toIndex === -1) continue;

    if (fromIndex >= toIndex) continue;

    const trip = tripsById.get(tripId);

    if (!trip) continue;

    const route = routesById.get(trip.route_id);

    return {

      tripId,

      route,

      stopTimes: stopTimes.slice(
        fromIndex,
        toIndex + 1
      )

    };

  }

  return null;

}