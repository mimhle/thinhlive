"use server";

import { NextResponse } from "next/server";
import { createUser } from "/lib/auth";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;
    if (await createUser(username, password)) {
        return NextResponse.json({ status: "success", message: "Account created" });
    }
    return NextResponse.json({ status: "failed", message: "Failed to create account" });
}
