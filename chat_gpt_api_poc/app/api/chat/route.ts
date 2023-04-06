import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: process.env.CHAT_GPT_API_KEY });
}
