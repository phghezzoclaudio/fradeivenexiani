import { NextResponse } from "next/server";

export async function GET() {

  const res = await fetch(
    "https://dati.venezia.it/sites/default/files/dataset/actv_realtime.json"
  );

  const data = await res.json();

  return NextResponse.json(data);
}
