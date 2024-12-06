"use client";

import { useEffect, useState } from "react";
import { getLiveToken, getUserData } from "/lib/frontend/api";
import { Room } from "livekit-client";

export default function Page() {
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getUserData().then(r => {
            if (r.status !== "success") return;
            r = r.user;
            getLiveToken(r.username, r.username).then(data => {
                if (!room) {
                    const r = new Room();
                    r.connect(process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL, data.token).then(() => {
                        r.localParticipant.setCameraEnabled(true);
                        r.localParticipant.setMicrophoneEnabled(true);
                        setRoom(r);
                    });
                }
            });
        });

        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, []);

    return <div>
        <div className="p-4">
            <h1 className="text-3xl">Live Test</h1>
            <p>This page is used to test the live feature of the development server.</p>
            <p>When you make changes to this file, the server should automatically reload the page.</p>
            <p>Try changing the text below to see the changes in real time.</p>
            <p className="text-lg">Hello, world!</p>
        </div>
    </div>;
}