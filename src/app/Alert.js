"use client";

import { useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { randomString } from "/lib/utils";
import { XCircleIcon } from "@heroicons/react/24/outline";

function Alert({ children, type = "", onClose, className }) {
    const types = {
        "error": "alert-error",
        "info": "alert-info",
        "success": "alert-success",
        "warning": "alert-warning"
    };

    return <div className={`alert ${types?.[type] || ""} flex flex-row justify-between w-auto m-1 mx-3`}>
        <div className={className}>
            {children}
        </div>
        <div>
            <XCircleIcon className="size-6" onClick={onClose} />
        </div>
    </div>;
}

function Item({ children, onClick }) {
    const isPresent = useIsPresent();
    const animations = {
        style: {
            position: isPresent ? "static" : "absolute"
        },
        initial: { x: "10vw", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 900, damping: 40 }
    };

    return (
        <motion.div {...animations} layout onClick={onClick}>
            {children}
        </motion.div>
    );
}


export default function useAlert() {
    const [alerts, setAlerts] = useState([]);
    const maxAlerts = 5;

    const alert = (config) => {
        const _id = randomString(10);
        if (alerts.length >= maxAlerts) {
            onClose(alerts[alerts.length - 1]._id)
            setAlerts(prev => [{ ...config, _id: _id }, ...prev]);
        } else {
            setAlerts(prev => [{ ...config, _id: _id }, ...prev]);
        }

        setTimeout(() => {
            onClose(_id)
        }, 3000);
    }

    const onClose = (id) => {
        setAlerts(prev => prev.filter((item) => item._id !== id));
    };

    return {
        contextHolder: <div className="absolute top-0 right-0 flex flex-col gap-0 w-80 h-fit">
            <AnimatePresence mode="popLayout">
                {alerts.map((alert) => {
                    return <Item key={alert._id}>
                        <Alert {...alert} onClose={() => onClose(alert._id)}></Alert>
                    </Item>
                })}
            </AnimatePresence>
        </div>, alert
    };
}