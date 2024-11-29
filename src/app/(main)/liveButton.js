"use client";

import {VideoCameraIcon} from "@heroicons/react/24/outline";

export  default  function LiveButton() {
    return <div className="w-full h-full">
        <a
            className="btn btn-success bg-gradient-to-l from-primary to-secondary via-50% w-fit mt-10 flex text-xl text-white"
            href="/live"
        >
            <VideoCameraIcon className="h-6"/>

            Live
        </a>
    </div>
}