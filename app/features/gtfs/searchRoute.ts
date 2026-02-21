import { getGTFSIndex } from "./index";

function nowHHMMSS() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

export function findRouteWithTransfer(fromName: string, toName: string) {
  const { stopsByName, stopTimesByStop, tripsById } = getGTFSIndex();

  const fromStop = stopsByName.get(fromName.toLowerCase());
  const toStop = stopsByName.get(toName.toLowerCase());
  if (!fromStop || !toStop) return [];

  const now = nowHHMMSS();
  const departures = stopTimesByStop.get(fromStop.stop_id) || [];

  const results: any[] = [];

  for (const dep of departures) {
    if (dep.departure_time < now) continue;

    const tripStops = tripsById.get(dep.trip_id);
    if (!tripStops) continue;

    const startIndex = tripStops.findIndex(
      s => s.stop_id === fromStop.stop_id
    );

    for (let i = startIndex + 1; i < tripStops.length; i++) {
      const stop = tripStops[i];

      // diretto
      if (stop.stop_id === toStop.stop_id) {
        results.push({
          type: "direct",
          trip_id: dep.trip_id,
          departure: dep.departure_time,
          arrival: stop.arrival_time,
        });
        break;
      }
    }

    if (results.length >= 3) break;
  }

  return results;
}