'use client';

import { useEffect, useState } from 'react';
import Gallery from '@/app/(main)/Gallery';
import Stat from './Stat';
import Avatar from '@/app/(main)/Avatar';
import CoverPhoto from '@/app/(main)/CoverPhoto';
import ActionButton from '@/app/(main)/ActionButton';
import { getUserData, getLiveRooms, setUserData } from '/lib/frontend/api';
import useAlert from '@/app/Alert';

export default function Profile({ id }) {
    const [recommendations, setRecommendations] = useState([]);
    const [buttonState, setButtonState] = useState({
        type: 'live',
        str: 'Live',
    });
    const [authUser, setAuthUser] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    const { contextHolder, alert } = useAlert();

    useEffect(() => {
        fetchUserData();
    }, [id]);

    useEffect(() => {
        if (authUser && profileUser) {
            if (authUser.username === profileUser.username) {
                setButtonState({ type: 'live', str: 'Live' });
            } else if (authUser.following?.includes(profileUser.username)) {
                setButtonState({ type: 'follow', str: 'Following' });
            } else {
                setButtonState({ type: 'notFollow', str: 'Follow' });
            }
        } else {
            setButtonState({ type: 'live', str: 'Live' });
        }
    }, [authUser, profileUser]);

    const addArray = (array, value) => {
        if (!Array.isArray(array)) {
            const oldArray = array;
            array = oldArray != null ? [oldArray] : [];
            array.push(value);
        } else if (array.length === 0) {
            array.push(value);
        } else {
            if (!array.includes(value)) {
                array.push(value);
            }
        }

        return array;
    };

    const removeArray = (array, value) => {
        if (!Array.isArray(array)) {
            return [];
        }
        if (array.includes(value)) {
            array.splice(array.indexOf(value), 1);
        }

        return array;
    };

    const arrayObjToArray = (list) => {
        if (!list || !Array.isArray(list)) {
            return [];
        }

        return list.map((item) => {
            if (item.username) {
                return item.username;
            }
            return item;
        });
    };

    const fetchUserData = async () => {
        try {
            const [authResponse, profileResponse] = await Promise.all([
                getUserData(),
                id ? getUserData(id) : null,
            ]);

            if (authResponse?.status === 'success') {
                const user = {
                    ...authResponse.user,
                    followers: arrayObjToArray(authResponse.user.followers),
                };
                setAuthUser(user);
            }

            if (profileResponse?.status === 'success') {
                const profile = {
                    ...profileResponse.user,
                    followers: arrayObjToArray(profileResponse.user.followers),
                };
                setProfileUser(profile);
                setRecommendations(profile.lives.map((room) => ({
                    title: room.title,
                    username: room.username,
                    thumbnail: room.thumbnail,
                    link: room.live ? `/watch/${room.username}` : null,
                    runtime: (room.endedAt || room.ended_at || new Date().valueOf()) - room.created_at,
                    live: room.live,
                })));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const syncFollowStatus = async () => {
            if (!authUser || !profileUser) return;

            const response = await getUserData(authUser.username);
            if (response.status !== 'success') return;

            const isFollowing = authUser.following?.includes(
                profileUser.username
            );
            const shouldFollow = profileUser.followers?.includes(
                authUser.username
            );

            if (authUser.following !== response.user.following) {
                const res = await setUserData(authUser.username, {
                    following: authUser.following,
                });

                if (res.status === 'success') {
                    if (isFollowing && !shouldFollow) {
                        await updateProfileFollowers('add');
                    } else if (!isFollowing && shouldFollow) {
                        await updateProfileFollowers('remove');
                    }
                }
            }
        };

        const updateProfileFollowers = async (type) => {
            if (!profileUser) return;

            let updatedFollowers = [];
            if (type === 'add') {
                updatedFollowers = addArray(
                    profileUser.followers,
                    authUser.username
                );
            } else if (type === 'remove') {
                updatedFollowers = removeArray(
                    profileUser.followers,
                    authUser.username
                );
            }

            const followersResponse = await setUserData(profileUser.username, {
                followers: updatedFollowers,
            });

            if (followersResponse.status === 'success') {
                setProfileUser((prev) => ({
                    ...prev,
                    followers: arrayObjToArray(
                        followersResponse.result.followers
                    ),
                }));
            }
        };

        syncFollowStatus();
    }, [authUser, profileUser]);

    const handleClickBtn = (type) => {
        if (type === 'notFollow') {
            const updatedFollowing = addArray(
                authUser.following,
                profileUser.username
            );
            setAuthUser((prev) => ({
                ...prev,
                following: updatedFollowing,
            }));

            alert({
                children: 'You have followed ' + profileUser.username,
                type: 'success',
            });
        } else if (type === 'follow') {
            const updatedFollowing = removeArray(
                authUser.following,
                profileUser.username
            );
            setAuthUser((prev) => ({
                ...prev,
                following: updatedFollowing,
            }));

            alert({
                children: 'You have unfollowed ' + profileUser.username,
                type: 'error',
            });
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center">
            {contextHolder}
            <div className="bg-neutral w-4/5 h-fit flex flex-col drop-shadow-2xl">
                <div className="w-full h-fit">
                    <CoverPhoto />
                    <div className="w-full px-4 -translate-y-1/3">
                        <div className="flex flex-row items-center gap-4">
                            <div className="w-40">
                                <Avatar src={profileUser?.avatar} />
                            </div>
                            <div className="flex justify-between w-full pt-8 pr-8">
                                <div className="text-4xl">
                                    {profileUser?.username}
                                </div>
                                <div>
                                <ActionButton
                                        str={buttonState.str}
                                        type={buttonState.type}
                                        event={handleClickBtn}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 ">
                    <Stat
                        followers={profileUser?.followers || []}
                        following={profileUser?.following || []}
                        authUser={authUser}
                        setAuthUser={setAuthUser}
                    />
                </div>
                <div>
                    <Gallery items={[...recommendations]} />
                </div>
            </div>
        </div>
    );
}
