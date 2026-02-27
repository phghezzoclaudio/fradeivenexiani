import { NextResponse } from "next/server";
import { getGTFSIndex } from "@/features/gtfs/index";

export async function GET() {

  const { routes } = getGTFSIndex();

  return NextResponse.json(routes);

}