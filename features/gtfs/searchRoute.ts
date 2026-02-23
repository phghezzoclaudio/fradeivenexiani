import { getGTFSIndex, getRomeSecondsNow, timeToSeconds } from "./index";
import { getValidServiceIds } from "./calendar";

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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
  const nowSeconds = getRomeSecondsNow();

  const normalizedFrom = normalize(from);
  const normalizedTo = normalize(to);

  const fromStops: string[] = [];
  const toStops: string[] = [];

  stopsById.forEach((stop: any) => {
    const name = normalize(stop.stop_name);

    if (name.includes(normalizedFrom)) fromStops.push(stop.stop_id);
    if (name.includes(normalizedTo)) toStops.push(stop.stop_id);
  });

  if (fromStops.length === 0 || toStops.length === 0) {
    return null;
  }

  const results: any[] = [];

  for (const [tripId, stopTimes] of tripsById.entries()) {
    const trip = trips.find((t: any) => t.trip_id === tripId);
    if (!trip) continue;
    if (!validServices.has(trip.service_id)) continue;

    const ordered = stopTimes
      .slice()
      .sort(
        (a: any, b: any) =>
          Number(a.stop_sequence) - Number(b.stop_sequence)
      );

    let fromIndex = -1;
    let toIndex = -1;

    // CERCA ordine corretto nel trip
    for (let i = 0; i < ordered.length; i++) {
      if (fromStops.includes(ordered[i].stop_id)) {
        fromIndex = i;

        // dopo aver trovato partenza, cerco arrivo DOPO
        for (let j = i + 1; j < ordered.length; j++) {
          if (toStops.includes(ordered[j].stop_id)) {
            toIndex = j;
            break;
          }
        }

        break;
      }
    }

    if (fromIndex === -1 || toIndex === -1) continue;

    const departure = ordered[fromIndex].departure_time;
    const arrival = ordered[toIndex].arrival_time;

    const depSec = timeToSeconds(departure);
    let arrSec = timeToSeconds(arrival);

    if (arrSec < depSec) {
      arrSec += 24 * 3600;
    }

    const durationSec = arrSec - depSec;

    if (durationSec <= 0) continue;
    if (depSec < nowSeconds) continue;

    const route = routes.find(
      (r: any) => r.route_id === trip.route_id
    );

    results.push({
      line: route?.route_short_name || "",
      departure,
      arrival,
      duration: Math.floor(durationSec / 60),
    });
  }

  results.sort(
    (a, b) =>
      timeToSeconds(a.departure) -
      timeToSeconds(b.departure)
  );

  return results[0] || null;
}