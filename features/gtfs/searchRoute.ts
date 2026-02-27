import { getGTFSIndex } from "./index";
import type { Stop, StopTime } from "./types";

function normalize(name: string): string {

  return name
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/\s+[abcd]$/, "")
    .trim();

}

function findStop(
  stops: Stop[],
  input: string
): Stop | null {

  const target = normalize(input);

  return stops.find(
    (s: Stop) =>
      normalize(s.stop_name)
        .includes(target)
  ) || null;

}

export function findDirectRoute(
  fromName: string,
  toName: string
) {

  const {
    stops,
    stopTimesByTrip
  } = getGTFSIndex();

  const fromStop =
    findStop(stops, fromName);

  const toStop =
    findStop(stops, toName);

  if (!fromStop || !toStop)
    return null;

  for (const [
    tripId,
    times
  ] of stopTimesByTrip.entries()) {

    const stopTimes =
      times as StopTime[];

    const fromIndex =
      stopTimes.findIndex(
        (t: StopTime) =>
          t.stop_id ===
          fromStop.stop_id
      );

    const toIndex =
      stopTimes.findIndex(
        (t: StopTime) =>
          t.stop_id ===
          toStop.stop_id
      );

    if (
      fromIndex >= 0 &&
      toIndex > fromIndex
    ) {

      return {

        tripId,

        fromStop:
          fromStop.stop_name,

        toStop:
          toStop.stop_name,

        departure:
          stopTimes[fromIndex]
            .departure_time,

        arrival:
          stopTimes[toIndex]
            .arrival_time

      };

    }

  }

  return null;

}