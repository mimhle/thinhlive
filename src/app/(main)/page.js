"use client";

import { getCookieValue } from "/lib/utils";
import { useEffect, useState } from "react";
import { logOut } from "/lib/api";
import Carousel from "@/app/(main)/Carousel";
import Gallery from "@/app/(main)/Gallery";

export default function Home() {
    const [bannerImages, setBannerImages] = useState([
        "/banner1.png",
        "/banner2.png",
        "/banner3.png",
        "/banner4.png",
        "/banner5.png",
    ]);

    const [recommendations, setRecommendations] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
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
        <div className="flex flex-col h-screen w-screen gap-4 pb-20 overflow-x-scroll">
            <div className="bg-base-200 w-full">
                <Carousel images={bannerImages}/>
            </div>
            <Gallery items={[...recommendations, ...recommendations, ...recommendations, ...recommendations]}/>
            test: {username}
        </div>
    );
}
