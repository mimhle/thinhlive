"use server";

import { NextResponse } from "next/server";
import { createUser, generateSession, getUser, verifySession } from "/lib/backend/auth";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;
    if (await createUser(username, password)) {
        const sessionId = await generateSession(username);
        const response = NextResponse.json({ status: "success", message: "Account created" });
        response.cookies.set("session_id", sessionId);
        response.cookies.set("username", username);
        return response;
    }
    return NextResponse.json({ status: "failed", message: "Failed to create account" });
}

export async function GET(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value
    
    if (await verifySession(username, sessionId)) {
        const user = await getUser(username);

        const response = NextResponse.json({ status: "success", user: user });
        return response;
    }
    return NextResponse.json({ status: "failed", message: "Authentication failed" });
}

