"use server";

import { NextResponse } from "next/server";
import { createUser, generateSession } from "/lib/auth";

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
