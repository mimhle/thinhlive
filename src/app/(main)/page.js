"use client";

import { getCookieValue } from "/lib/utils";
import { useEffect, useState } from "react";
import { logOut } from "/lib/api";
import Button from "@/app/Button";
import Carousel from "@/app/(main)/Carousel";

export default function Home() {
    const [bannerImages, setBannerImages] = useState([
        "/banner1.png",
        "/banner2.png",
        "/banner3.png",
        "/banner4.png",
        "/banner5.png",
    ]);

    const [username, setUsername] = useState("");

    const logout = (_, load) => {
        load();
        logOut().then(res => {
            if (res.status === "success") {
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        setUsername(getCookieValue("username"));
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-screen gap-16 pb-20">
            <div className="bg-base-200 w-full">
                <Carousel images={bannerImages} />
            </div>
            test: {username}
        </div>
    );
}
