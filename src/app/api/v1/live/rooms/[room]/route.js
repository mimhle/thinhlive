import { NextResponse } from "next/server";
import { getLive, isLive, setCurrentLiveData } from "/lib/backend/live";
import { verifySession } from "/lib/backend/auth";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY);

export async function GET(request) {
    const room = new URL(request.url).pathname.split('/').at(-1);
    return NextResponse.json({status: "success", result: await getLive(room)});
}

export async function POST(request) {
    const room = new URL(request.url).pathname.split('/').at(-1);
    const data = await request.json();
    if (!await isLive(room)) return NextResponse.json({status: "error", message: "Room is not live."});
    await setCurrentLiveData(room, data);
    return NextResponse.json({status: "success", result: await getLive(room)});
}

export async function DELETE(request) {
    const sessionId = request.cookies.get("session_id")?.value;
    const username = request.cookies.get("username")?.value;
    const room = new URL(request.url).pathname.split('/').at(-1);

    if (!await verifySession(username, sessionId) || room !== username) {
        return NextResponse.json({status: "error", message: "Authentication failed."});
    }

    if (!await isLive(room)) return NextResponse.json({status: "error", message: "Room is not live."});
    await setCurrentLiveData(room, {live: false});
    await roomService.deleteRoom(room);
    return NextResponse.json({status: "success"});
}