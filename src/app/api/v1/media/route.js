"use server";

import { NextResponse } from "next/server";
import { verifySession } from "/lib/auth";
import { upload } from "/lib/media";

export async function POST(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value
    const media = (await request.json()).media;
    
    if (await verifySession(username, sessionId)) {
        return NextResponse.json({ status: "success", result: await upload(media) });
    }
    return NextResponse.json({ status: "failed", message: "Authentication failed" });
}