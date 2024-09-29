"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default function Carousel({ images }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrent(prev => prev + newDirection);
    };

    useEffect(() => {
        // setInterval(() => {
        //     setCurrent(prev => prev === images.length - 1 ? 0 : prev + 1);
        // }, 5000);
    }, []);

    return <div className="w-full ~h-44/72 overflow-hidden">
        <AnimatePresence>
            <motion.img
                key={current}
                src={images[current]}
                className="w-full h-full object-cover object-center"
                custom={-direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                    }
                }}
            />
        </AnimatePresence>
    </div>;
}