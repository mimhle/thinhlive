'use client';

import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import LogoutButton from './LogoutButton';
import { CogIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { getUserData } from '/lib/frontend/api';

export default function Nav({ userName }) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        getUserData().then((r) => {
            if (r.status === 'success') {
                setAvatar(r.user.avatar);
            }
        });
    }, []);

    return (
        <div className="bg-base-100 p-2 flex flex-col gap-4 justify-between ~/md:~w-12/20 max-h-screen">
            <div className="flex flex-col gap-4">
                <div className="avatar placeholder">
                    <div className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-full rounded-full">
                        <span className="text-xl">LOGO</span>
                    </div>
                </div>
                <Avatar src={avatar} />
            </div>
            <div>
                <div className="flex flex-col gap-4">
                    <a className="btn bg-base-100 p-0" href="/">
                        <HomeIcon className="size-8" />
                    </a>
                    <a
                        className="btn bg-base-100 p-0"
                        href={`/profile/${userName}`}
                    >
                        <UserIcon className="size-8" />
                    </a>
                    <a className="btn bg-base-100 p-0" href="/setting">
                        <CogIcon className="size-8" />
                    </a>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-4 tooltip" data-tip="Logout">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
