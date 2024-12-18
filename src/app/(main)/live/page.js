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
import {useState} from "react";
import {Room, RoomEvent} from "livekit-client";
import {useEffect, useRef} from "react";

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
    const [showpopup, setShowpopup] = useState(true);
    const [camera, setCamera] = useState(false);
    const [title, setTitle] = useState('');
    const [volumn, setVolumn] = useState(false);
    const toggleCamera = () => {
        setCamera(!camera);
    };
    const togglevolumn = () => {
        setVolumn(!volumn);
    };
    const togglePopup = () => {
        setShowpopup(!showpopup);
        if (title === '') setTitle('No Title');
    };
    return (
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
                    <div className="h-4/5 w-full" ref={parentElement}></div>
                    <div className="h-full bg-stone-950">
                        <div className="bg-gray-800 h-full w-full rounded-[7px] ">
                            <div className="flex justify-between h-10">
                                <p className="text-bold text-3xl ml-5">{title}</p>
                            </div>
                            <div className="border-t border-gray-400 mt-1 flex justify-center">
                                <div className="flex mt-4">
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        {camera ? (
                                            <VideoCameraIcon className="size-6" onClick={toggleCamera}/>
                                        ) : (<VideoCameraSlashIcon className="size-6" onClick={toggleCamera}/>
                                        )}
                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center"
                                        role="button" onClick={togglevolumn}>

                                        {volumn ? (
                                                <SpeakerWaveIcon className="size-6"/>)
                                            :
                                            (<SpeakerXMarkIcon className="size-6"/>)
                                        }
                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center"
                                        role="button"
                                        onClick={() => {
                                            endLive(username.current).then(r => {
                                                console.log(r);
                                                window.location.href = "/";
                                            });
                                        }}>
                                        <PhoneXMarkIcon className="size-6"/>

                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center"
                                        role="button">
                                        <TvIcon className="size-6"/>
                                    </div>
                                    <div
                                        className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center"
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
                        <div className=" flex w-full shadow-lg border-b border-gray-300 pb-2 mb-4 ">
                            <h2 className=" text-lg text-black p-2 ">Stream Chat</h2>
                            <ChatBubbleLeftEllipsisIcon className="size-8 mt-2 text-black"/>
                        </div>
                        <div className="flex flex-col h-80 overflow-y-auto mb-4">

                        </div>
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
    );
}