"use client";

import { useState } from "react";

export default function Button({ className, onClick, children, ...rest }) {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);
    };

    const finish = () => {
        setLoading(false);
    };

    const error = () => {};

    const handleClick = (e) => {
        onClick?.(e, load, finish, error);
    };

    return <button className={`${className} ${loading ? "!pointer-events-none" : ""}`} onClick={handleClick} {...rest}>
        {loading ? <span className="loading loading-dots loading-md"></span> : children}
    </button>;
}