import { getGTFSIndex } from "./index";

interface Result {
  tripId: string;
  routeId: string;
  stopsBetween: any[];
  duration: number;
}

export function findDirectRoute(fromName: string, toName: string): Result | null {
  const { stopsById, tripsById, tripsRaw, routesRaw } = getGTFSIndex();

  const fromStops: string[] = [];
  const toStops: string[] = [];

  stopsById.forEach((stop: any) => {
    if (stop.stop_name.toLowerCase().includes(fromName.toLowerCase())) {
      fromStops.push(stop.stop_id);
    }
    if (stop.stop_name.toLowerCase().includes(toName.toLowerCase())) {
      toStops.push(stop.stop_id);
    }
  });

  for (const [tripId, stopTimes] of tripsById.entries()) {
    const ordered = stopTimes.sort(
      (a: any, b: any) => Number(a.stop_sequence) - Number(b.stop_sequence)
    );

    const fromIndex = ordered.findIndex((s: any) =>
      fromStops.includes(s.stop_id)
    );

    const toIndex = ordered.findIndex((s: any) =>
      toStops.includes(s.stop_id)
    );

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      const segment = ordered.slice(fromIndex, toIndex + 1);

      const trip = tripsRaw.find((t: any) => t.trip_id === tripId);
      const route = routesRaw.find((r: any) => r.route_id === trip.route_id);

      const duration =
        timeToMinutes(segment[segment.length - 1].arrival_time) -
        timeToMinutes(segment[0].departure_time);

      return {
        tripId,
        routeId: route?.route_short_name || "N/D",
        stopsBetween: segment,
        duration,
      };
    }
  }

  return null;
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}