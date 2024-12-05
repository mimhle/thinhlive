import { RoomServiceClient } from 'livekit-server-sdk';

const roomService = new RoomServiceClient(process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY);

export async function getLiveRooms() {
    const rooms = await roomService.listRooms();

    return JSON.parse(JSON.stringify(rooms));
}