'use client';

import React, { useEffect, useState } from 'react';
import { getUserData } from '/lib/frontend/api';
import Avatar from '@/app/(main)/Avatar';

export default function UserListModal({
    data = [],
    type = '',
    onClose = () => {},
    href = '',
}) {
    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarPromises = data.map(async (username) => {
                try {
                    const r = await getUserData(username);
                    if (r.status === 'success') {
                        return { [username]: r.user.avatar };
                    }
                } catch (error) {
                    console.error('Error fetching avatar:', error);
                }
                return { [username]: null };
            });

            const avatarResults = await Promise.all(avatarPromises);
            const avatarMap = avatarResults.reduce(
                (acc, curr) => ({ ...acc, ...curr }),
                {}
            );
            setAvatars(avatarMap);
        };

        fetchAvatars();
    }, [data]);

    const handleClick = (href) => {
        if (href === '') return;
        window.location.href = href;
    };

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white w-96 rounded-lg shadow-lg p-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-4">
                    {type}
                </h3>
                <ul>
                    {data.map((username) => (
                        <li
                            key={username}
                            className="border-b py-2 flex items-center gap-4"
                            onClick={() => handleClick(href + username)}
                        >
                            <div className="w-10 h-10">
                                <Avatar src={avatars[username]} />
                            </div>
                            <span className="text-md font-medium text-gray-700">
                                {username}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
