"use client";

import { useEffect, useRef, useState } from "react";
import { endLive, getLiveToken, getUserData, goLive, setLiveData, uploadMedia } from "/lib/frontend/api";
import { Room, RoomEvent } from "livekit-client";

export default function Page() {
    const [room, setRoom] = useState(null);
    const video = useRef(null);
    const parentElement = useRef(null);
    const loaded = useRef(false);
    const [liveId, setLiveId] = useState(null);
    const username = useRef("");

    function updateThumbnail() {
        if (!video.current) return;
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256 * (video.current.videoHeight / video.current.videoWidth);
        canvas.getContext("2d").drawImage(video.current, 0, 0, 256, 256 * (video.current.videoHeight / video.current.videoWidth));

        canvas.toBlob(blob => {
            uploadMedia(blob).then(r => {
                if (r.status !== "success") return;
                const url = r.result.url;
                setLiveData(username.current, { thumbnail: url, title: `${username.current}'s stream` }).then(r => r);
            });
        });

        setInterval(updateThumbnail, 900000);
    }

    function handleTrackSubscribed(
        track,
    ) {
        const element = track.track.attach();
        parentElement.current?.appendChild(element);
        if (element.nodeName === "VIDEO") {
            video.current = element;
            setTimeout(() => {
                updateThumbnail();
            }, 1000);
        }
    }

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        getUserData().then(r => {
            if (r.status !== "success") return;
            r = r.user;
            if (r.anon) return;
            username.current = r.username;
            getLiveToken(r.username, r.username).then(data => {
                if (!room) {
                    const r = new Room();
                    r.connect(process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL, data.token).then(() => {
                        r.localParticipant.on(RoomEvent.LocalTrackPublished, handleTrackSubscribed);
                        r.localParticipant.setCameraEnabled(true);
                        r.localParticipant.setMicrophoneEnabled(true);
                        goLive().then(r => {
                            if (r.status !== "success") return;
                            setLiveId(r.result.liveId);
                        });
                        setRoom(r);
                    });
                }
            });
        });

        return () => {
            video.current = null;
            if (room) {
                room.disconnect();
                setLiveData(username.current, { live: false }).then(r => console.log(r));
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
            <button onClick={() => {
                endLive(username.current).then(r => {
                    console.log(r);
                    window.location.href = "/";
                });
            }}>End</button>
            <div ref={parentElement}></div>
        </div>
    </div>;
}