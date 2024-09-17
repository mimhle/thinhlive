"use server";

import { NextResponse } from "next/server";
import clientPromise from "/lib/mongodb";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("main");
        const movies = await db
            .collection("users")
            .find({})
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}