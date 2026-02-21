import { getGTFSIndex } from "./index";
import { getStopCoords } from "./geo";
import type { StopTime } from "./types";

interface Point {
  lat: number;
  lon: number;
}

export function buildTripPath(tripId: string): Point[] {
  const { tripsById } = getGTFSIndex();
  const trip = tripsById.get(tripId);

  if (!trip) return [];

  const mapped: (Point | null)[] = trip.map((st: StopTime) =>
    getStopCoords(st.stop_id)
  );

  return mapped.filter(
    (p: Point | null): p is Point => p !== null
  );
}