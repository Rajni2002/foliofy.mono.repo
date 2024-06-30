import apiConfig from "@/config/api-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tokenRes = await fetch(
      apiConfig.endpoints.spotify.lyrics_access_token,
      {
        cache: "no-store",
      }
    );
    const res = await tokenRes.json();
    return NextResponse.json({ ...res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
