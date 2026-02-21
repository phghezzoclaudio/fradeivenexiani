import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stops: [
      { lat: 45.437, lon: 12.335 },
      { lat: 45.438, lon: 12.340 },
      { lat: 45.440, lon: 12.345 },
    ],
  });
}

