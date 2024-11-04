"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {getUserData} from "/lib/frontend/api";

export default function CoverPhoto({src}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getUserData().then(r => {
            if (r.status === "success") {
                setData(r.user);
            }
        })
    }, [])

    if (!data) {
        return (<div className="w-full h-96 skeleton opacity-5 bg-white flex items-center justify-center rounded-2xl">
        </div>)
    }

    return <div className="relative bg-black/50 flex items-center justify-center w-full h-96 rounded-2xl">
        {src ? (
            <Image
                src={src}
                alt="User cover photo"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
            />
        ) : (
            data?.coverphoto ? (
                <Image
                    src={data.coverphoto}
                    alt="User cover photo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                />
            ) : (
                <div className="w-full h-full bg-white opacity-5 flex items-center justify-center rounded-2xl">
                </div>
            )
        )}
    </div>
}