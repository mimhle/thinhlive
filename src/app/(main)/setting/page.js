
"use client";

import { useEffect, useState } from "react";
import { uploadMedia, setUserData, getUserData } from "/lib/api";

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
    return <div className="flex justify-center items-center h-screen w-screen">
        <input
            type="file"
            className="file-input file-input-bordered file-input-success w-full max-w-xs" 
            accept="image/*"
            onChange={e => {
                uploadMedia(e.target.files[0]).then(r => {
                    if (r.status === "success") {
                        setUserData(data.username, {avatar: r.result.url}).then(result => {
                            console.log(result);
                        });
                    }
                });
            }}
            />
    </div>
}