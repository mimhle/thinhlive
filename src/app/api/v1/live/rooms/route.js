import { RoomServiceClient } from 'livekit-server-sdk';
import { NextResponse } from "next/server";

const roomService = new RoomServiceClient(process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY);

export async function GET() {
    const rooms = await roomService.listRooms();

    return NextResponse.json(JSON.parse(JSON.stringify(rooms)));
}