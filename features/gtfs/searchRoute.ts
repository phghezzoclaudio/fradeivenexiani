import { getGTFSIndex } from "./index";
import type { Stop, StopTime } from "./types";


/* ===============================
   NORMALIZZAZIONE NOMI FERMATE
   =============================== */

function normalize(name: string): string {

  return name
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/\b[a-z]\b/g, "")   // rimuove A B C D singole
    .replace(/\s+/g, " ")
    .trim();

}


/* ===============================
   TROVA FERMATA MIGLIORE
   =============================== */

function findStopByName(
  stops: Stop[],
  input: string
): Stop | null {

  const target = normalize(input);

  let bestMatch: Stop | null = null;
  let bestScore = 999;

  for (const stop of stops) {

    const stopNorm = normalize(stop.stop_name);

    // match perfetto
    if (stopNorm === target)
      return stop;

    // inizia con
    if (stopNorm.startsWith(target) && bestScore > 1) {

      bestScore = 1;
      bestMatch = stop;

    }

    // contiene
    if (stopNorm.includes(target) && bestScore > 2) {

      bestScore = 2;
      bestMatch = stop;

    }

  }

  return bestMatch;

}


/* ===============================
   TROVA PERCORSO DIRETTO
   =============================== */

export function findDirectRoute(
  fromName: string,
  toName: string
) {

  const { stops, stopTimesByTrip } = getGTFSIndex();

  if (!stops || stops.length === 0) {

    console.log("GTFS stops empty");
    return null;

  }

  const fromStop = findStopByName(stops, fromName);
  const toStop = findStopByName(stops, toName);

  if (!fromStop || !toStop) {

    console.log("Stop not found:", {
      fromName,
      toName
    });

    return null;

  }

  console.log("Resolved stops:", {
    from: fromStop.stop_name,
    to: toStop.stop_name
  });


  /* cerca trip valido */

  for (const [tripId, stopTimes] of stopTimesByTrip.entries()) {

    const fromIndex = stopTimes.findIndex(
      (t: StopTime) => t.stop_id === fromStop.stop_id
    );

    if (fromIndex === -1)
      continue;

    const toIndex = stopTimes.findIndex(
      (t: StopTime) => t.stop_id === toStop.stop_id
    );

    if (toIndex === -1)
      continue;

    if (fromIndex < toIndex) {

      console.log("Trip found:", tripId);

      return {

        tripId,

        fromStop: {
          id: fromStop.stop_id,
          name: fromStop.stop_name,
          lat: parseFloat(fromStop.stop_lat),
          lon: parseFloat(fromStop.stop_lon)
        },

        toStop: {
          id: toStop.stop_id,
          name: toStop.stop_name,
          lat: parseFloat(toStop.stop_lat),
          lon: parseFloat(toStop.stop_lon)
        }

      };

    }

  }

  console.log("No direct route found");

  return null;

}