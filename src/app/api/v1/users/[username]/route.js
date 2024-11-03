"use server";

import { NextResponse } from "next/server";
import { setUser } from "/lib/backend/auth";
import { verifySession } from "/lib/backend/auth";

export async function PUT(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value
    const body = await request.json();
    
    if (await verifySession(username, sessionId)) {
        await setUser(username, body);

        return NextResponse.json({ status: "success", result: body });
    }
    return NextResponse.json({ status: "failed", message: "Authentication failed" });
}