import { getGTFSIndex } from "./index";

export function buildStopsFromTrip(
  tripId: string
) {

  const {

    stopTimesByTrip,

    stopsById

  } = getGTFSIndex();

  const times =
    stopTimesByTrip.get(
      tripId
    );

  if (!times)
    return [];

  return times.map(
    (t: any) => {

      const stop =
        stopsById.get(
          t.stop_id
        );

      return {

        stop_id:
          stop.stop_id,

        stop_name:
          stop.stop_name,

        lat:
          Number(
            stop.stop_lat
          ),

        lon:
          Number(
            stop.stop_lon
          )

      };

    }
  );

}