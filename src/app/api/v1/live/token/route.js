import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from "next/server";

const createToken = async (room = "quickstart-room", name = "quickstart-username") => {
    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY, {
        identity: name,
        ttl: '10m',
    });
    at.addGrant({ roomJoin: true, room: room });

    return await at.toJwt();
};

export async function GET(request) {
    const query = new URLSearchParams(new URL(request.url).search);
    const room = query.get("room") || "quickstart-room";
    const name = query.get("name") || "quickstart-username";

    return NextResponse.json({ token: await createToken(room, name) });
}