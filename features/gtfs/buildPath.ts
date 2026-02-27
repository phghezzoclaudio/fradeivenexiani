import { getGTFSIndex } from "./index";
import type { StopTime, Stop } from "./types";

interface Point {
  lat: number;
  lon: number;
}

export function buildTripPath(tripId: string): Point[] {

  const { stopTimesByTrip, stops } = getGTFSIndex();

  const times = stopTimesByTrip.get(tripId) as StopTime[] | undefined;

  if (!times) return [];

  return times
    .map((t: StopTime) => {

      const stop = stops.find(
        (s: Stop) => s.stop_id === t.stop_id
      );

      if (!stop) return null;

      return {
        lat: Number(stop.stop_lat),
        lon: Number(stop.stop_lon)
      };

    })
    .filter((p: Point | null): p is Point => p !== null);

}