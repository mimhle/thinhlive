import { deleteSession, verifySession } from "/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value;
    if (await verifySession(username, sessionId)) {
        await deleteSession(username, sessionId);
        const response = NextResponse.json({ status: "success", message: "Logged out" });
        response.cookies.set("session_id", "", { expires: new Date(0) });
        response.cookies.set("username", "", { expires: new Date(0) });
        return response;
    }
    return NextResponse.json({ status: "failed", message: "Failed to log out" });
}