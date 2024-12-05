"use client";
import {XMarkIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, HeartIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Watch(){
    return<div className="w-full h-screen p-10">
        <div className="relative w-ful h-full flex">
            <div className="flex flex-col gap-2 w-2/3">
                <div className="absolute rounded-xl w-2/3 h-4/5 flex items-center justify-center bg-white/10 z-[2]">video here</div>
                <div className="h-4/5 rounded-xl flex flex-col justify-between items-center text-2xl p-2 bg-transparent z-[3]">
                    <div className="flex gap-2 w-fit h-8 ml-auto">
                        <div className="flex items-center bg-black/50 text-white rounded-xl h-fit w-fit text-sm px-2">
                            <EyeIcon className="h-5 mr-2"/>
                            123
                        </div>
                        <div className="flex items-center bg-red-500 text-white rounded-xl h-fit w-fit text-sm px-2">
                            LIVE
                        </div>
                    </div>
                    <div className=" w-full h-8 bottom-0 flex flex-row justify-between">
                        <div className="flex">
                            <Cog6ToothIcon className="h-6 mx-2" role="button"/>
                            <ArrowsPointingOutIcon className="h-6 mx-2" role="button"/>
                        </div>
                        <div>
                            <HeartIcon className="h-6 mx-2"  role="button"/>
                        </div>
                    </div>
                </div>
                <div className="bg-white/10 text-2xl flex justify-center items-center rounded-xl h-1/5">
                    tittle
                </div>
            </div>
            <div className="w-1/3 h-full translate-x-2">
                <div className="flex w-full h-10 justify-between items-center bg-white/20 p-4 rounded-t-lg">
                    <span>Live chat</span>
                    <XMarkIcon className="h-6" role="button" />
                </div>
                <div className="bg-white/10 w-full h-4/5"></div>
                <div className="w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        <ChatBubbleLeftEllipsisIcon className="h-5"/>
                        <input type="text" className="grow" placeholder="Chat"/>
                    </label>
                </div>
            </div>
        </div>
    </div>
}