"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Button from "@/app/Button";
import { logOut } from "/lib/api";

export default function LogoutButton({ className, onClick }) {
    const logout = (_, load) => {
        load();
        logOut().then(res => {
            if (res.status === "success") {
                window.location.reload();
            }
        });
    };

    return <Button className="btn" onClick={logout}>
        <ArrowLeftStartOnRectangleIcon className="size-8" />
    </Button>;
}