import { getGTFSIndex } from "./index";

export function buildShapePath(
  shapeId: string
) {

  const { shapes } =
    getGTFSIndex();

  return shapes

    .filter(
      (s: any) =>
        s.shape_id === shapeId
    )

    .sort(
      (a: any, b: any) =>
        Number(a.shape_pt_sequence)
        -
        Number(b.shape_pt_sequence)
    )

    .map(
      (s: any) => ({

        lat:
          Number(
            s.shape_pt_lat
          ),

        lon:
          Number(
            s.shape_pt_lon
          )

      })
    );

}
