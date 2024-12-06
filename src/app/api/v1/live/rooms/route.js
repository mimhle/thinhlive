import { NextResponse } from "next/server";
import { roomService } from "/lib/backend/livekitRoomService";

export async function GET(request) {
    const room = new URL(request.url).pathname.split('/').at(-1);
    const rooms = await roomService.listRooms();

    return NextResponse.json(JSON.parse(JSON.stringify(rooms)));
}