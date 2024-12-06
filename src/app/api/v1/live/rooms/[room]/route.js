import { RoomServiceClient } from 'livekit-server-sdk';
import { NextResponse } from "next/server";

export async function GET(request) {
    const roomService = new RoomServiceClient(process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY);
    const room = new URL(request.url).pathname.split('/').at(-1);
    const rooms = await roomService.listRooms();

    return NextResponse.json(JSON.parse(JSON.stringify(rooms.find(r => r.name === room) || {})));
}