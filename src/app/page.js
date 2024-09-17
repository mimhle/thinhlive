"use client";

import { getCookieValue } from "/lib/utils";
import { useEffect, useState } from "react";
import { logOut } from "/lib/api";
import Button from "@/app/Button";

export default function Home() {
    const [username, setUsername] = useState("");

    const logout = (_, load, finish) => {
        load();
        logOut().then(res => {
            if (res.status === "success") {
                finish();
                window.location.reload();
            }
        });
    }

    useEffect(() => {
        setUsername(getCookieValue("username"));
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            test: {username}
            <div>
                <Button className="btn btn-error" onClick={logout}>Log out</Button>
            </div>
        </div>
    );
}
