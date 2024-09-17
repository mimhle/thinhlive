"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "/lib/api";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        signUp(username, password).then(res => {
            console.log(res);
        });
    };


    return <div className="h-full flex flex-col justify-center min-h-screen">
        <div className="card bg-base-200 w-1/3 m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <input placeholder="Username" className="input input-bordered" value={username} onChange={e => setUsername(e.target.value)}/>
                <input placeholder="Password" type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)}/>
                <input placeholder="Confirm password" type="password" className="input input-bordered" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                <button className="btn btn-primary" onClick={submit}>Create account</button>
                <div className="flex flex-row justify-end">
                    <Link className="link" href={"/signin"}>Already have an account?</Link>
                </div>
            </div>
        </div>
    </div>;
}