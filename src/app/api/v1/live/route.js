import { goLive, isLive } from "/lib/backend/live";
import { NextResponse } from "next/server";
import { verifySession } from "/lib/backend/auth";

export async function POST(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value;

    if (await verifySession(username, sessionId)) {
        const liveId = (await isLive(username)) || (await goLive(username));
        return NextResponse.json({ status: "success", result: { liveId } });
    }
    return NextResponse.json({ status: "failed", message: "Authentication failed" });
}