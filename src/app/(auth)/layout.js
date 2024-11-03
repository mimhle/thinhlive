"use server";

import { cookies } from "next/headers";
import { verifySession } from "/lib/backend/auth";
import { redirect } from "next/navigation";

export default async function Nav({ children }) {
    const cookieStore = cookies();

    if (await verifySession(cookieStore.get("username")?.value, cookieStore.get("session_id")?.value)) {
        redirect("/");
    }

    return <div>
        {children}
    </div>;
}