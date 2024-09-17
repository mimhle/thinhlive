"use client";

import Link from "next/link";
import { signIn } from "/lib/api";
import { useState } from "react";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        signIn(username, password).then(res => {
            console.log(res);
        });
    };

    return <div className="h-full flex flex-col justify-center min-h-screen">
        <div className="card bg-base-200 w-1/3 m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <input placeholder="Username" className="input input-bordered" value={username} onChange={e => setUsername(e.target.value)}/>
                <input placeholder="Password" type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="btn btn-primary" onClick={submit}>Sign in</button>
                <div className="flex flex-row justify-between">
                    <Link className="link" href="#">Forgot password?</Link>
                    <Link className="link" href={"/signup"}>Don&apos;t have an account?</Link>
                </div>
                <div className="divider">OR</div>
                <button className="btn btn-ghost">Continue as guest</button>
            </div>
        </div>
    </div>;
}