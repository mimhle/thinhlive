'use client';

import React, { useEffect, useState } from 'react';
import { getUserData } from '/lib/frontend/api';
import Avatar from '@/app/(main)/Avatar';
import ActionButton from '@/app/(main)/ActionButton';

export default function UserListModal({
    data = [],
    type = '',
    onClose = () => {},
    href = '',
    enableBtn = false,
    authUser,
    setAuthUser,
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

    const handleAction = async (type, username) => {
        if (!authUser) return;

        try {
            if (type === 'notFollow') {
                setAuthUser((prev) => ({
                    ...prev,
                    following: [...prev.following, username],
                }));
            } else if (type === 'follow') {
                setAuthUser((prev) => ({
                    ...prev,
                    following: prev.following.filter((u) => u !== username),
                }));
            }
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };

    const isFollowing = (username) => {
        return authUser?.following?.includes(username);
    };

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white w-[40rem] rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                    {type}
                </h3>
                <ul className="divide-y divide-gray-200">
                    {Array.from(
                        { length: Math.max(data.length, 5) },
                        (_, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-6 justify-between py-5 hover:bg-gray-100 rounded-lg transition duration-300 shadow-sm hover:shadow-md"
                                onClick={() =>
                                    data[index] &&
                                    handleClick(href + data[index])
                                }
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 ml-5">
                                        {data[index] ? (
                                            <Avatar
                                                src={avatars[data[index]]}
                                            />
                                        ) : (
                                            <div className="bg-gray-200 w-full h-full"></div>
                                        )}
                                    </div>
                                    <span className="text-lg font-medium text-gray-700">
                                        {data[index] || ''}
                                    </span>
                                </div>
                                {enableBtn &&
                                    data[index] &&
                                    data[index] !== authUser?.username && (
                                        <div
                                            className="min-w-[120px] flex justify-end h-1.5"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ActionButton
                                                type={
                                                    isFollowing(data[index])
                                                        ? 'follow'
                                                        : 'notFollow'
                                                }
                                                str={
                                                    isFollowing(data[index])
                                                        ? 'Following'
                                                        : 'Follow'
                                                }
                                                event={() =>
                                                    handleAction(
                                                        isFollowing(data[index])
                                                            ? 'follow'
                                                            : 'notFollow',
                                                        data[index]
                                                    )
                                                }
                                                className="scale-75 transform-gpu"
                                            />
                                        </div>
                                    )}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}
