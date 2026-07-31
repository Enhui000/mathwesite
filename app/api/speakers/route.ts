import { NextResponse } from "next/server";
import { getSpeakers, speakerStorageMode } from "../../server/speaker-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const speakers = await getSpeakers();
  return NextResponse.json(
    { speakers, storage: speakerStorageMode() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
