'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserData } from '/lib/frontend/api';
import { UserIcon } from '@heroicons/react/24/solid';

export default function Avatar({ src }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getUserData().then((r) => {
            if (r.status === 'success') {
                setData(r.user);
            }
        });
    }, []);

    if (!data) {
        return (
            <div className="ring-primary ring-offset-base-100 bg-black/50 rounded-full ring ring-offset-2 overflow-hidden aspect-square flex items-center justify-center">
                <div className="avatar placeholder rounded-full skeleton opacity-5 bg-white w-full h-full"></div>
            </div>
        );
    }

    return (
        <div className="relative ring-primary ring-offset-base-100 bg-black/50 rounded-full ring ring-offset-2 overflow-hidden aspect-square">
            {src ? (
                <Image
                    src={src}
                    alt="User avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            ) : data?.avatar ? (
                <Image
                    src={data.avatar}
                    alt="User avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            ) : (
                <div className="avatar placeholder flex items-center justify-center w-full h-full">
                    <div className="bg-gradient-to-br from-primary to-secondary text-neutral-content rounded-full flex items-center justify-center w-full h-full">
                        <UserIcon className="h-2/3" />
                    </div>
                </div>
            )}
        </div>
    );
}
