
"use client";

import { useEffect, useState } from "react";
import { uploadMedia, setUserData, getUserData } from "/lib/frontend/api";
import Avatar from "@/app/(main)/Avatar";

export default function Setting() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getUserData().then(r => {
            if (r.status === "success") {
                setData(r.user);
            }
        });
    }, []);

    if (!data) {
        return <></>;
    }
    return <div className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center p-20">
        <div className="w-full h-fit bg-white/5 rounded-2xl">
            <div className="p-10 flex flex-col gap-8">
                <span className="font-extrabold text-2xl">Profile Picture</span>
                <div className="flex gap-8 items-center w-full h-fit">
                    <div className="h-32">
                        <Avatar/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            type="file"
                            className="file-input file-input-ghost w-full max-w-xs"
                            accept="image/*"
                            onChange={e => {
                                uploadMedia(e.target.files[0]).then(r => {
                                    if (r.status === "success") {
                                        setUserData(data.username, {avatar: r.result.url}).then(result => {
                                            console.log(result);
                                            location.reload();
                                        });
                                    }
                                });
                            }}
                        />
                        <span className="text-white/50 mx-5">Must be JPG, PNG, JPEG</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}