"use client";

import Link from "next/link";
import { signIn, signUp } from "/lib/frontend/api";
import { useState } from "react";
import Button from "@/app/Button";
import useAlert from "@/app/Alert";
import Password from "@/app/Password";
import { randomString } from "/lib/frontend/utils";

export default function Page() {
    const { contextHolder, alert } = useAlert();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e, load, finish) => {
        e.preventDefault();
        load();
        signIn(username, password).then(res => {
            if (res.status === "success") {
                window.location.href = "/";
            } else {
                finish();
                alert({
                    children: res.message,
                    type: "error"
                });
            }

        });
    };

    const submitAnon = (e, load, finish) => {
        e.preventDefault();
        load();
        signUp(`Anon_${randomString(4)}`, randomString(32), true).then(res => {
            if (res.status === "success") {
                window.location.href = "/";
            } else {
                finish();
                alert({
                    children: res.message,
                    type: "error"
                });
            }
        });
    };


    return <div className="h-full flex flex-col justify-center min-h-screen w-screen">
        {contextHolder}
        <div className="card bg-base-200 ~w-[20rem]/[30rem] m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign in to continue</h1>
                <input placeholder="Username" className="input input-bordered" value={username} onChange={e => setUsername(e.target.value)} />
                <Password placeholder="Password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} />
                <Button className="btn btn-primary" onClick={submit}>Sign in</Button>
                <div className="flex flex-row flex-wrap justify-between gap-1">
                    <Link className="link" href="#"></Link>
                    <Link className="link" href={"/signup"}>Don&apos;t have an account?</Link>
                </div>
                <div className="divider">OR</div>
                <Button className="btn btn-ghost" onClick={submitAnon}>Continue as guest</Button>
            </div>
        </div>
    </div>;
}