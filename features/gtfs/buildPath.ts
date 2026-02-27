import { getGTFSIndex } from "./index";
import { getStopCoords } from "./geo";
import type { StopTime } from "./types";

export interface Point {
  lat: number;
  lon: number;
}

export async function buildTripPath(
  tripId: string
): Promise<Point[]> {

  const index = await getGTFSIndex();

  const trip = index.tripsById.get(tripId);

  if (!trip) return [];

  return trip
    .sort(
      (a: StopTime, b: StopTime) =>
        Number(a.stop_sequence) - Number(b.stop_sequence)
    )
    .map((st: StopTime) =>
      getStopCoords(st.stop_id)
    )
    .filter(
      (p: Point | null): p is Point => p !== null
    );
}