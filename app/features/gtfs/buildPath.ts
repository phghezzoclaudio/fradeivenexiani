import { getGTFSIndex } from "./index";
import { getStopCoords } from "./geo";

export function buildTripPath(tripId: string) {
  const { tripsById } = getGTFSIndex();
  const trip = tripsById.get(tripId);
  if (!trip) return [];

  return trip
    .map(st => getStopCoords(st.stop_id))
    .filter(Boolean);
}