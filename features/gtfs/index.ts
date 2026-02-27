import { loadGTFS } from "./parser";

let cache: any = null;

export function getGTFSIndex() {

  if (cache)
    return cache;

  const {

    stops,

    stopTimes,

    trips,

    shapes,

    routes

  } = loadGTFS();

  const stopsById =
    new Map();

  stops.forEach(
    (s: any) =>
      stopsById.set(
        s.stop_id,
        s
      )
  );

  const stopTimesByTrip =
    new Map();

  stopTimes.forEach(
    (st: any) => {

      if (
        !stopTimesByTrip.has(
          st.trip_id
        )
      )

        stopTimesByTrip.set(
          st.trip_id,
          []
        );

      stopTimesByTrip
        .get(st.trip_id)
        .push(st);

    }
  );

  cache = {

    stops,

    trips,

    shapes,

    routes,

    stopsById,

    stopTimesByTrip

  };

  console.log(
    "GTFS loaded:",
    stops.length,
    "stops"
  );

  return cache;

}