import { generateSession, verifyUser } from "/lib/backend/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;
    if (await verifyUser(username, password)) {
        const sessionId = await generateSession(username);
        if (sessionId) {
            const response = NextResponse.json({ status: "success", message: "Sign in successful", session_id: sessionId });
            response.cookies.set("session_id", sessionId);
            response.cookies.set("username", username);
            return response;
        }
    }
    return NextResponse.json({ status: "failed", message: "Failed to sign in" });
}

export const fetchCache = 'force-no-store'