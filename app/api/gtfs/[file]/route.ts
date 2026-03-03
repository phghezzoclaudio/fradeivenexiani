import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {

  const { file } = await params; 

  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    file
  );

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "File non trovato" },
      { status: 404 }
    );
  }

  const content = fs.readFileSync(filePath);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "application/json"
    }
  });

}