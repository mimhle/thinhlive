"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'


export default function Password({ className, ...rest }) {
    const [showPassword, setShowPassword] = useState("false");

    return (
        <div className="relative w-full">
            <input className={`!w-full ${className}`} type={showPassword ? "password" : "text"} {...rest} />
            <div className="absolute flex justify-center items-center w-6 top-3 right-3" role="button" onClick={() => {
                setShowPassword(!showPassword)
            }}>
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
        </div>
    )

}