"use client";

import { useEffect, useState } from "react";
import { getUserData } from "/lib/frontend/api";

export default function Avatar({ }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getUserData().then(r => {
            if (r.status === "success") {
                setData(r.user);
            }
        });
    }, []);

    if (!data) {
        return <div className="ring-primary ring-offset-base-100 w-full rounded-full ring ring-offset-2 overflow-hidden">
            <div className="avatar placeholder w-full">
                <div className="w-full rounded-full skeleton opacity-5 bg-white">
                    <span></span>
                </div>
            </div>
        </div>;
    }
    return <div className="ring-primary ring-offset-base-100 w-full rounded-full ring ring-offset-2 overflow-hidden">
        {data?.avatar ? <img src={data.avatar}></img> :
            <div className="avatar placeholder w-full">
                <div className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-full rounded-full">
                    <span className="text-4xl">{data.username.slice(0, 2).toUpperCase()}</span>
                </div>
            </div>
        }
    </div>
}