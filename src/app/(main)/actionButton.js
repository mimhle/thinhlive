'use client';

import {
    VideoCameraIcon,
    PlusCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline';

export default function ActionButton({ str = '', type = '', event }) {
    const icons = {
        live: VideoCameraIcon,
        notFollow: PlusCircleIcon,
        follow: MinusCircleIcon,
    };

    const Icon = icons[type] || icons.live;

    return (
        <div className="w-full h-full">
            <a
                className="btn btn-success bg-gradient-to-l from-primary to-secondary via-50% w-fit mt-10 flex text-xl text-white"
                onClick={(e) => {
                    if (type !== 'live') {
                        e.preventDefault();
                    }
                    event(type);
                }}
                href={type === 'live' ? '/live' : undefined}
            >
                <Icon className="h-6" />
                {str}
            </a>
        </div>
    );
}
