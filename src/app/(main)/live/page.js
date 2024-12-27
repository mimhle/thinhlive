"use client";
import {
    VideoCameraIcon,
    VideoCameraSlashIcon,
    ChatBubbleLeftEllipsisIcon
} from "@heroicons/react/24/outline";
import {
    PhoneXMarkIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    TvIcon,
    Cog8ToothIcon
} from "@heroicons/react/24/solid";
import {endLive, getLiveToken, getUserData, goLive, setLiveData, uploadMedia} from "/lib/frontend/api";
import {Room, RoomEvent} from "livekit-client";
import {useEffect, useRef, useState} from "react";
import {LiveKitRoom, useChat, useLocalParticipant, useRoomContext} from "@livekit/components-react";
import {Chat} from "@/app/(main)/watch/[id]/Watch";

function Preview({ username }) {
    const localParticipant = useLocalParticipant();
    const parentElement = useRef(null);
    const video = useRef(null);
    const loaded = useRef(false);

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
        parentElement.current?.replaceChildren(element);
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

        localParticipant.localParticipant.on(RoomEvent.LocalTrackPublished, handleTrackSubscribed);

        return () => {
            video.current = null;
        }
    }, []);

    return <div className="h-4/5 w-full" ref={parentElement}></div>;
}

function CameraButton() {
    const [camera, setCamera] = useState(false);
    const localParticipant = useLocalParticipant();
    const [bgCamera, setBgCamera] = useState(false);
    const toggleCamera = () => {
        setBgCamera(!bgCamera);
        setCamera(() => !camera);
        if (camera) localParticipant.localParticipant.setScreenShareEnabled(false).then(() => {
            localParticipant.localParticipant.setCameraEnabled(camera);
        });
        else localParticipant.localParticipant.setCameraEnabled(camera);
    };

    return <div
        className="flex ml-4 mr-4 w-12 h-12 rounded-full justify-center items-center">
        {bgCamera && camera ? (
            <div className="flex  w-full h-full rounded-full bg-white border-red-500 justify-center items-center">
            <VideoCameraIcon className="size-6 text-black" onClick={toggleCamera}/>
            </div>
        ) : (
        <div className="flex  w-full h-full rounded-full bg-zinc-900 hover:bg-black border-red-500 justify-center items-center">
        <VideoCameraSlashIcon className="size-6" onClick={toggleCamera}/>
        </div>
        )
        
    }
    </div>;
}

function AudioButton() {
    const localParticipant = useLocalParticipant();
    const [volume, setVolume] = useState(false);

    const toggleVolume = () => {
        setVolume(!volume);
        localParticipant.localParticipant.setMicrophoneEnabled(volume);
    };

    return <div
        role="button" onClick={toggleVolume}>

        {volume ? (
            <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-white justify-center items-center">
                <SpeakerWaveIcon className="size-6 text-black"/>
            </div>)
            :
            (<div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-zinc-900 hover:bg-black justify-center items-center">
                <SpeakerXMarkIcon className="size-6"/>
            </div>
            )
        }
    </div>;
}

function ScreenButton() {
    const [screen, setScreen] = useState(false);
    const localParticipant = useLocalParticipant();

    function toggleScreen() {
        setScreen(() => !screen);
        if (screen) localParticipant.localParticipant.setCameraEnabled(false).then(() => {
            localParticipant.localParticipant.setScreenShareEnabled(screen);
        });
        else localParticipant.localParticipant.setScreenShareEnabled(screen);
    }

    return <div
        
        role="button" onClick={toggleScreen}>
        {
            screen ? (
            <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-zinc-900 hover:bg-black justify-center items-center">
            <TvIcon className="size-6 text-white"/>
            </div>
            )
             : (
             <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-white justify-center items-center">
                <TvIcon className="size-6 text-black"/>
             </div>
             )
            
        }
    </div>;
}

export default function Page() {
    const loaded = useRef(false);
    const [liveId, setLiveId] = useState(null);
    const username = useRef("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        getUserData().then(r => {
            if (r.status !== "success") return;
            r = r.user;
            if (r.anon) return;
            username.current = r.username;
            getLiveToken(r.username, r.username).then(data => {
                setToken(data.token);
                goLive().then(r => {
                    if (r.status !== "success") return;
                    setLiveId(r.result.liveId);
                });
            });
        });
    }, []);
    const [showpopup, setShowpopup] = useState(true);
    const [title, setTitle] = useState('');
    const togglePopup = () => {
        setShowpopup(!showpopup);
        if (title === '') setTitle('No Title');
    };

    useEffect(() => {
        setLiveData(username.current, { title: title }).then(r => r);
    }, [title]);
    return (
        <LiveKitRoom serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL} token={token} connect={!!token}>
        <div className="h-screen w-screen overflow-x-hidden">
            {/*<div className="header flex pt-3 h-19 bg-gray-900">*/}
            {/*    <div className="flex ml-5">*/}
            {/*        <label className="swap text-5xl mb-3 mr-2">*/}
            {/*            <div className="swap-off">🥶</div>*/}
            {/*        </label>*/}
            {/*        <div>*/}
            {/*            <h2 className="text-2xl font-bold">THINHK4</h2>*/}
            {/*            <p className="text-1xl">let&apos;s play</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex flex-row h-full w-full">
                <div className="bg-gray-400 w-3/4 h-full flex flex-col">
                    <Preview username={username}/>
                    <div className="h-full bg-stone-950">
                        <div className="bg-gray-800 h-full w-full rounded-[7px] ">
                            <div className="flex justify-between h-10">
                                <p className="text-bold text-3xl ml-5">{title}</p>
                            </div>
                            <div className="border-t border-gray-400 mt-1 flex justify-center relative">
                                <div className="flex mt-4 ">
                                    <div className=" hover:scale-110 transition duration-200 ">
                                    <CameraButton/>
                                    </div>
                                    <div className="hover:scale-110 transition duration-200">
                                    <AudioButton/>
                                    </div>
                                    
                                
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full justify-center items-center hover:scale-110 transition duration-200">
                                        <ScreenButton/>
                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center hover:scale-110 transition duration-200"
                                        role="button"
                                        onClick={() => {
                                            endLive(username.current).then(r => {
                                                console.log(r);
                                                window.location.href = "/";
                                            });
                                        }}>
                                        <div className="flex w-full h-full hover:bg-red-700 rounded-full justify-center items-center hover:scale-110 transition duration-200">
                                        <PhoneXMarkIcon className="size-6 "/>
                                        </div>
                                        

                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-zinc-900 hover:bg-black justify-center items-center hover:scale-110 transition duration-200"
                                        role="button" onClick={togglePopup}>
                                        <Cog8ToothIcon className="size-6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex bg-gray-500 w-1/4 h-full">
                    <div className="w-full ">
                        {/*<div className=" flex w-full shadow-lg border-b border-gray-300 pb-2 mb-4 ">*/}
                        {/*    <h2 className=" text-lg text-black p-2 ">Stream Chat</h2>*/}
                        {/*    <ChatBubbleLeftEllipsisIcon className="size-8 mt-2 text-black"/>*/}
                        {/*</div>*/}
                        {/*<div className="flex flex-col h-80 overflow-y-auto mb-4">*/}

                        {/*</div>*/}
                        <Chat></Chat>
                    </div>
                </div>
            </div>
            {/* Phần Setting */}
            {
                showpopup && (<div className="fixed z-10 inset-0">
                    <div
                        className="flex items-center  justify-center min-h-screen bg-gray-900 bg-opacity-75 transition-all">

                        <div
                            className="flex flex-col items-center justify-between bg-white p-3 rounded w-2/5 border border-fuchsia-900">
                            <span className="text-4xl uppercase font-medium text-purple-700 tracking-wider">setting</span>
                            <input
                                onFocus={e => e.target.select()}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title"
                                className="input mt-1 input-bordered input-sm w-full max-w-xs"/>
                            <button onClick={togglePopup} className="bg-red-500 text-white py-1 px-10 mt-2 rounded">OK
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </div>
        </LiveKitRoom>
    );
}