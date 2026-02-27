import { getGTFSIndex } from "./index";
import type { StopTime } from "./types";

export function findRoute(fromStopId: string, toStopId: string) {

  const { stopTimesByTrip, tripsById } = getGTFSIndex();

  for (const [tripId, stopTimes] of stopTimesByTrip.entries()) {

    const ordered = (stopTimes as StopTime[])
      .slice()
      .sort((a, b) =>
        Number(a.stop_sequence) - Number(b.stop_sequence)
      );

    const fromIndex = ordered.findIndex(
      s => s.stop_id === fromStopId
    );

    if (fromIndex === -1) continue;

    const toIndex = ordered.findIndex(
      s => s.stop_id === toStopId
    );

    if (toIndex === -1) continue;

    if (fromIndex >= toIndex) continue;

    const trip = tripsById.get(tripId);

    return {

      tripId,

      shapeId: trip?.shape_id,

      departure: ordered[fromIndex].departure_time,

      arrival: ordered[toIndex].arrival_time,

      stops: ordered.slice(fromIndex, toIndex + 1)

    };

  }

  return null;

}