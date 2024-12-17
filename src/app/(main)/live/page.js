"use client"
import { redirect } from "next/navigation";
import Avatar from "../Avatar";

import { useState } from "react";
export default function page() {
    const [showpopup, setShowpopup] = useState(true);
    const [camera, setCamera] = useState(false);
    const[title,setTitle] = useState('');
    const toggleCamera = () => {
        setCamera(!camera);
    }
    const togglePopup = () => {
        setShowpopup(!showpopup);
    }
    return (
        <div className="container h-screen overflow-y-hidden">
            <div className="header flex pt-3 h-19 bg-gray-900">
                <div className="flex ml-5">
                    <label className="swap text-5xl mb-3 mr-2">
                        <div className="swap-off">🥶</div>
                    </label>
                    <div>
                        <h2 className="text-2xl font-bold">THINHK4</h2>
                        <p className="text-1xl">let's play</p>
                    </div>
                </div>

            </div>
            <div className="flex h-full ">

                <div className="bg-gray-400 w-3/4">
                    <div className="h-2/3 bg-gray-600 w-full">stream màn hình</div>

                    <div className="h-1/3 bg-stone-950 flex justify-center">
                        <div className="bg-gray-800 m-2 p-1 w-full h-3/4 rounded-[7px] ">
                            <div className="flex justify-between">
                                <p className="text-bold mt-1 ">{title}</p>   

                            </div>

                            <div className="border-t border-gray-400 mt-1 flex justify-center">
                                <div className="flex mt-4">
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        {camera ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={toggleCamera}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={toggleCamera}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
                                        </svg>
                                        )}
                                    </div>
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        <label className="swap">
                                            {/* this hidden checkbox controls the state */}
                                            <input type="checkbox" />

                                            {/* volume on icon */}
                                            <svg
                                                className="swap-on fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="30"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                            </svg>

                                            {/* volume off icon */}
                                            <svg
                                                className="swap-off fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="30"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M15.22 3.22a.75.75 0 0 1 1.06 0L18 4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L19.06 6l1.72 1.72a.75.75 0 0 1-1.06 1.06L18 7.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L16.94 6l-1.72-1.72a.75.75 0 0 1 0-1.06ZM1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                        </svg>

                                    </div>
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clipRule="evenodd" />
                                        </svg>

                                    </div>
                                    <div className="flex ml-4 mr-4 w-12 h-12 rounded-full bg-red-500 justify-center items-center">
                                        <svg onClick={togglePopup} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </div>

                                </div>



                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex bg-gray-500 w-1/4">
                    <div className="w-full ">
                        <div className=" flex w-full shadow-lg border-b border-gray-300 pb-2 mb-4 ">
                            <h2 className=" text-lg text-black p-2 ">Stream Chat</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-3 stroke-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                        </div>
                        <div className="flex flex-col h-80 overflow-y-auto mb-4">
                            chat chat chat chat
                        </div>

                    </div>
                </div>
            </div>
            {/* Phần Setting */}
            {
                showpopup && (<div className="fixed z-10 inset-0">
                    <div className="flex items-center  justify-center min-h-screen bg-gray-900 bg-opacity-75 transition-all">

                        <div className="flex flex-col items-center justify-between bg-white p-3 rounded w-2/5 border border-fuchsia-900">
                            <h3 className="text-4xl uppercase font-medium text-purple-700 tracking-wider">setting</h3>
                            <input
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                type="text"
                                placeholder="Title"
                                className="input mt-1 input-bordered input-sm w-full max-w-xs" />                            
                            <button onClick={togglePopup} className="bg-red-500 text-white py-1 px-10 mt-2 rounded">OK</button>
                        </div>
                    </div>
                </div>)
            }

        </div>
    );
}