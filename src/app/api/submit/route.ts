import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In production, save to database or send notification email
    console.log("Submission received:", data);

    return NextResponse.json(
      { success: true, message: "Submission received. We will review it shortly." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid submission data." },
      { status: 400 }
    );
  }
}
