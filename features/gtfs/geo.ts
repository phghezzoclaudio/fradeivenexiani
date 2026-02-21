import { getGTFSIndex } from "./index";

export function getStopCoords(stopId: string) {
  const { stopsById } = getGTFSIndex();
  const stop = stopsById.get(stopId);

  if (!stop) return null;

  return {
    lat: Number(stop.stop_lat),
    lon: Number(stop.stop_lon),
  };
}