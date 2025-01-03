"use client";
import {
    ChatBubbleLeftEllipsisIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    EyeIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import {getLiveRoom, getLiveToken, getUserData} from "/lib/frontend/api";
import {useParams} from "next/navigation";
import {
    AudioTrack,
    LiveKitRoom,
    useTracks,
    VideoTrack,
    useChat, useRoomContext,
} from "@livekit/components-react";
import {RoomEvent, Track} from "livekit-client";
import {secondsToHms} from "/lib/frontend/utils";
import Avatar from "@/app/(main)/Avatar";


function MediaRenderer() {
    const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);
    const audioTracks = useTracks([Track.Source.Microphone, Track.Source.ScreenShareAudio]);

    return [...tracks.map((track, i) => {
        return <VideoTrack className="w-full h-full object-fill" trackRef={track} key={i}/>;
    }), ...audioTracks.map((track, i) => {
        return <AudioTrack trackRef={track} key={-i}/>;
    })];
}

export function Chat({ placeholder = "", anon = false }) {
    const { send, chatMessages } = useChat();
    const messageBox = useRef(null);
    const room = useRoomContext();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        room.on(RoomEvent.Connected, () => {
            setDisabled(false);
        });
        room.on(RoomEvent.Disconnected, () => {
            setDisabled(true);
        });
    }, [room]);

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) return;
            send(e.target.value);
            e.target.value = '';
            messageBox.current?.lastElementChild?.scrollIntoView?.({ behavior: 'smooth', block: 'end' });
        }
    };

    return <>
        <div className="flex w-full h-10 justify-between items-center bg-white/20 p-4 rounded-t-lg">
            <span>Live chat</span>
        </div>
        <div className="bg-white/10 w-full h-5/6 overflow-x-scroll" ref={messageBox}>
            {chatMessages.map((msg, i) => {
                return <div className="w-full p-2" key={i}>
                    <div className="flex gap-2">
                        <a className="text-white font-bold"
                           href={`/profile/${msg.from.identity}`}>{msg.from.identity}:</a>
                        <span className="text-white">{msg.message}</span>
                    </div>
                </div>;
            })}
        </div>
        <div className="w-full">
            <label className="input input-bordered flex items-center gap-2">
                <ChatBubbleLeftEllipsisIcon className="h-5"/>
                <input type="text" className="grow" placeholder={placeholder ? placeholder : "Type a message..."}
                       onKeyDown={onKeyPressHandler} disabled={disabled || anon}/>
            </label>
        </div>
    </>;
}

export function ViewerCount() {
    const room = useRoomContext();
    const [viewer, setViewer] = useState(0);
    let loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        room.on(RoomEvent.Connected, () => {
            setViewer(room.remoteParticipants.size);
        });
        room.on(RoomEvent.ParticipantConnected, () => {
            setViewer(room.remoteParticipants.size);
        });
        room.on(RoomEvent.ParticipantDisconnected, () => {
            setViewer(room.remoteParticipants.size);
        });
        loaded.current = true;
    }, [room]);

    return <div
        className="flex items-center bg-black/50 text-white rounded-xl h-fit w-fit text-sm px-2">
        <EyeIcon className="h-5 mr-2"/>
        {viewer}
    </div>;
}

export function LiveLength() {
    const room = useRoomContext();
    const [time, setTime] = useState(null);
    let loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        room.on(RoomEvent.Connected, () => {
            const startTime = new Date(Number(room.roomInfo.creationTime)).valueOf();
            setInterval(() => {
                setTime(Math.round((new Date().valueOf() / 1000) - startTime));
            }, 1000);
        });
        loaded.current = true;
    }, [room]);

    return <div className="flex items-center bg-black/50 text-white rounded-xl h-fit w-fit text-sm px-2">
        <ClockIcon className="h-5 mr-1"/>
        {secondsToHms(time)}
    </div>;
}

export function Watch() {

    const [zoom, setZoom] = useState(false);
    const videoRef = useRef(null);
    const params = useParams();
    const { id } = params;
    const [token, setToken] = useState("");
    const [anon, setAnon] = useState(false);
    const [title, setTitle] = useState("Title");
    const [avatar, setAvatar] = useState();


    const handleZoom = () => {
        if (!zoom) {
            videoRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            setZoom(isFullscreen);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        getUserData().then(r => {
            if (r.status !== "success") return;
            r = r.user;
            setAnon(r.anon);
            getLiveToken(id, r.username).then(data => {
                setToken(data.token);
            });
            getLiveRoom(id).then(data => {
                if (data.status !== "success") return;
                setTitle(data.result.title);
            });
        });

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        getUserData(id).then(data => {
            setAvatar(data.user.avatar);
        });
    }, []);

    return <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
        className="w-full h-screen p-10"
    >
        <div className="w-ful h-full flex">
            <div className="flex flex-col gap-2 w-2/3">
                <div className="relative h-full" ref={videoRef}>
                    <div
                        className="rounded-xl w-full h-full flex items-center justify-center bg-white/10 z-[2]">
                        <div className="w-full h-full !rounded-xl overflow-hidden">
                            <MediaRenderer/>
                        </div>
                    </div>
                    <div
                        className="absolute top-0 w-full h-full rounded-xl flex flex-col justify-between items-center text-2xl p-2 bg-transparent z-[3]">
                        <div className="flex gap-2 w-fit h-8 ml-auto">
                            <LiveLength/>
                            <ViewerCount/>
                            <div
                                className="flex items-center bg-red-500 text-white rounded-xl h-fit w-fit text-sm px-2">
                                LIVE
                            </div>
                        </div>
                        <div className=" w-full h-8 bottom-0">
                            <div className="flex">
                                {zoom ?
                                    <ArrowsPointingInIcon className="h-6 mx-2" role="button" onClick={handleZoom}/> :
                                    <ArrowsPointingOutIcon className="h-6 mx-2" role="button" onClick={handleZoom}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white/10 text-2xl flex flex-col p-4 rounded-xl h-1/5 gap-4">
                    <div className="font-extrabold flex gap-4">
                        <div className="w-10">
                            <Avatar src={avatar}/>
                        </div>
                        <div className="flex">
                            <a className="mt-2 flex" href={`/profile/${id}`}>
                                {id}
                            </a>
                        </div>
                    </div>
                    <div>
                        {title}
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-full translate-x-2">
                <Chat placeholder={anon ? "Login to chat" : ""} anon={anon}/>
            </div>
        </div>
    </LiveKitRoom>;
}