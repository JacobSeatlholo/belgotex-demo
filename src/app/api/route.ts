import { NextResponse } from "next/server";

// Lightweight health-check endpoint for Vercel / monitoring.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "belgotex-demo",
    timestamp: new Date().toISOString(),
  });
}
