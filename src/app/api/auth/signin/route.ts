import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // External backend call
    const res = await fetch(
      "https://vehiclerentaslsystem.vercel.app/api/v1/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err: Error | unknown) {
    const message = err instanceof Error ? err.message : "Login failed";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
