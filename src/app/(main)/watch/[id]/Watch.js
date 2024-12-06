"use client";
import {
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    HeartIcon,
    EyeIcon
} from "@heroicons/react/24/outline";
import {HeartIcon as HeartFilled} from "@heroicons/react/24/solid";
import {useEffect, useRef, useState} from "react";
import { getLiveRoom, getLiveToken, getUserData } from "/lib/frontend/api";
import { useParams } from "next/navigation";
import {
    AudioTrack,
    LiveKitRoom,
    useTracks,
    VideoTrack
} from "@livekit/components-react";
import { Track } from "livekit-client";


function MediaRenderer({id}) {
    const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);
    const audioTracks = useTracks([Track.Source.Microphone]);

    return [...tracks.map((track, i) => {
        return <VideoTrack className="w-full h-full object-fill" trackRef={track} key={i} />;
    }), ...audioTracks.map((track, i) => {
        return <AudioTrack trackRef={track} key={i} />;
    })];
}

export default function Watch() {

    const [like, setLike] = useState(false);
    const [zoom, setZoom] = useState(false);
    const videoRef = useRef(null);
    const params = useParams();
    const { id } = params;
    const [token, setToken] = useState("");
    const [viewer, setViewer] = useState(0);

    const handleLike = () => {
        setLike(!like);
    };

    const handleZoom = () => {
        if (!zoom) {
            videoRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            console.log(e.target.value);
            e.target.value = '';
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            setZoom(isFullscreen);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        getUserData().then(r => {
            if (r.status !== "success") return;
            r = r.user;
            getLiveToken(id, r.username).then(data => {
                setToken(data.token);
            });
            getLiveRoom(id).then(data => {
                setViewer(data.numParticipants-1);
            });
        });

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
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
                            <MediaRenderer id={id}/>
                        </div>
                    </div>
                    <div
                        className="absolute top-0 w-full h-full rounded-xl flex flex-col justify-between items-center text-2xl p-2 bg-transparent z-[3]">
                        <div className="flex gap-2 w-fit h-8 ml-auto">
                            <div
                                className="flex items-center bg-black/50 text-white rounded-xl h-fit w-fit text-sm px-2">
                                <EyeIcon className="h-5 mr-2"/>
                                {viewer}
                            </div>
                            <div
                                className="flex items-center bg-red-500 text-white rounded-xl h-fit w-fit text-sm px-2">
                                LIVE
                            </div>
                        </div>
                        <div className=" w-full h-8 bottom-0 flex flex-row justify-between">
                            <div className="flex">
                                <div className="h-6">
                                    <div className="dropdown dropdown-top">
                                        <Cog6ToothIcon className="h-6 mx-2" role="button" tabIndex={0}/>
                                        <ul tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                            <li><a>720p</a></li>
                                            <li><a>480p</a></li>
                                            <li><a>360p</a></li>
                                            <li><a>240p</a></li>
                                        </ul>
                                    </div>
                                </div>
                                {zoom ?
                                    <ArrowsPointingInIcon className="h-6 mx-2" role="button" onClick={handleZoom}/> :
                                    <ArrowsPointingOutIcon className="h-6 mx-2" role="button" onClick={handleZoom}/> }
                            </div>
                            <div>
                                {like ? <HeartFilled className="h-6 mx-2 text-red-500" role="button" onClick={handleLike}/> :
                                    <HeartIcon className="h-6 mx-2" role="button" onClick={handleLike}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white/10 text-2xl flex p-4 rounded-xl h-1/5">
                    tittle
                </div>
            </div>
            <div className="w-1/3 h-full translate-x-2">
                <div className="flex w-full h-10 justify-between items-center bg-white/20 p-4 rounded-t-lg">
                    <span>Live chat</span>
                </div>
                <div className="bg-white/10 w-full h-5/6"></div>
                <div className="w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        <ChatBubbleLeftEllipsisIcon className="h-5"/>
                        <input type="text" className="grow" placeholder="Type a message..." onKeyDown={onKeyPressHandler}/>
                    </label>
                </div>
            </div>
        </div>
    </LiveKitRoom>;
}