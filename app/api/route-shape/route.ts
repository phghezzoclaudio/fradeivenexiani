import { getGTFSIndex } from "@/features/gtfs";

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);
    const routeId = searchParams.get("route_id");

    if (!routeId)
      return Response.json([]);

    const gtfs = await getGTFSIndex();

    const trip = gtfs.trips.find(
      (t: any) => t.route_id === routeId
    );

    if (!trip)
      return Response.json([]);

    const shapePoints = gtfs.shapes
      .filter((s: any) => s.shape_id === trip.shape_id)
      .sort(
        (a: any, b: any) =>
          Number(a.shape_pt_sequence) -
          Number(b.shape_pt_sequence)
      );

    return Response.json(shapePoints);

  } catch (err) {

    console.error(err);
    return Response.json([]);

  }

}
