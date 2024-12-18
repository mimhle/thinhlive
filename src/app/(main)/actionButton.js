'use client';

import {
    VideoCameraIcon,
    PlusCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline';

export default function ActionButton({
    str = '',
    type = '',
    event,
    className = '',
}) {
    const icons = {
        live: VideoCameraIcon,
        notFollow: PlusCircleIcon,
        follow: MinusCircleIcon,
    };

    const Icon = icons[type] || icons.live;

    return (
        <div className={`flex items-center justify-center h-full ${className}`}>
            <a
                className="btn btn-success bg-gradient-to-l from-primary to-secondary via-50% flex items-center gap-2 px-10 py-1 text-white rounded-lg"
                onClick={(e) => {
                    if (type !== 'live') {
                        e.preventDefault();
                    }
                    event(type);
                }}
                href={type === 'live' ? '/live' : undefined}
            >
                <Icon className="h-10 w-10" />
                <span className="text-lg font-medium">{str}</span>
            </a>
        </div>
    );
}
