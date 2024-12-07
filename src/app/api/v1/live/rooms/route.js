import { NextResponse } from "next/server";
import { getLives } from "/lib/backend/live";

export async function GET() {
    return NextResponse.json({ status: "success", result: await getLives()});
}

export const fetchCache = 'force-no-store'