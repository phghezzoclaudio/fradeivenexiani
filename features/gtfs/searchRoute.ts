import { getGTFSIndex } from "./index";
import type { StopTime } from "./types";

export function findDirectRoute(
  fromId: string,
  toId: string
) {

  const { stopTimesByTrip } = getGTFSIndex();

  for (const [tripId, times] of stopTimesByTrip.entries()) {

    const sorted = (times as StopTime[])
      .slice()
      .sort(
        (a: StopTime, b: StopTime) =>
          Number(a.stop_sequence) -
          Number(b.stop_sequence)
      );

    const fromIndex =
      sorted.findIndex(
        (t: StopTime) =>
          t.stop_id === fromId
      );

    if (fromIndex === -1)
      continue;

    const toIndex =
      sorted.findIndex(
        (t: StopTime) =>
          t.stop_id === toId
      );

    if (toIndex === -1)
      continue;

    if (fromIndex < toIndex) {

      return {
        tripId,
        fromStop: sorted[fromIndex],
        toStop: sorted[toIndex],
        path: sorted.slice(
          fromIndex,
          toIndex + 1
        )
      };

    }

  }

  return null;

}