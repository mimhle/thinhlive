import { verifyUser } from "/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;
    if (await verifyUser(username, password)) {
        return NextResponse.json({ status: "success", message: "Sign in successful" });
    }
    return NextResponse.json({ status: "failed", message: "Failed to sign in" });
}