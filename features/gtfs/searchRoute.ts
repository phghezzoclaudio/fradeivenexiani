import { getGTFSIndex, getRomeNow, timeToSeconds } from "./index";
import { getValidServiceIds } from "./calendar";

export async function findDirectRoute(from: string, to: string) {
  const {
    stopsById,
    tripsById,
    trips,
    routes,
    calendar,
    calendarDates,
  } = await getGTFSIndex();

  const validServices = getValidServiceIds(calendar, calendarDates);
  const nowSeconds =
    getRomeNow().hour * 3600 +
    getRomeNow().minute * 60 +
    getRomeNow().second;

  const fromStops: string[] = [];
  const toStops: string[] = [];

  stopsById.forEach((stop: any) => {
    if (stop.stop_name.toLowerCase().includes(from.toLowerCase()))
      fromStops.push(stop.stop_id);
    if (stop.stop_name.toLowerCase().includes(to.toLowerCase()))
      toStops.push(stop.stop_id);
  });

  const results: any[] = [];

  for (const [tripId, stopTimes] of tripsById.entries()) {
    const trip = trips.find((t: any) => t.trip_id === tripId);
    if (!trip || !validServices.has(trip.service_id)) continue;

    const ordered = stopTimes
      .slice()
      .sort((a: any, b: any) => a.stop_sequence - b.stop_sequence);

    const fromIndex = ordered.findIndex((s: any) =>
      fromStops.includes(s.stop_id)
    );
    const toIndex = ordered.findIndex((s: any) =>
      toStops.includes(s.stop_id)
    );

    if (fromIndex === -1 || toIndex === -1) continue;

    // gestione circolare (wrap)
    if (fromIndex > toIndex) continue;

    const departure = ordered[fromIndex].departure_time;
    const arrival = ordered[toIndex].arrival_time;

    const depSec = timeToSeconds(departure);
    if (depSec < nowSeconds) continue;

    const route = routes.find((r: any) => r.route_id === trip.route_id);

    results.push({
      line: route?.route_short_name,
      departure,
      arrival,
      duration: Math.floor(
        (timeToSeconds(arrival) - depSec) / 60
      ),
    });
  }

  results.sort(
    (a, b) => timeToSeconds(a.departure) - timeToSeconds(b.departure)
  );

  return results[0] || null;
}