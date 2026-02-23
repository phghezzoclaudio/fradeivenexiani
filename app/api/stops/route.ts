import { NextResponse } from "next/server";
import { getGTFSIndex } from "@/features/gtfs/index";

export async function GET() {
  const { stops } = await getGTFSIndex();

  const filtered = stops
    .filter((s: any) => s.stop_name && !s.stop_name.includes("Deposito"))
    .map((s: any) => ({
      id: s.stop_id,
      name: s.stop_name,
    }));

  return NextResponse.json(filtered);
}