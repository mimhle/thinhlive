'use client';

import { useEffect, useState } from 'react';
import Gallery from '@/app/(main)/Gallery';
import Stat from './Stat';
import Avatar from '@/app/(main)/Avatar';
import CoverPhoto from '@/app/(main)/CoverPhoto';
import ActionButton from '@/app/(main)/actionButton';
import { getUserData, getLiveRooms, setUserData } from '/lib/frontend/api';
import useAlert from '@/app/Alert';

export default function Profile({ id }) {
    const [recommendations, setRecommendations] = useState([]);
    const [buttonState, setButtonState] = useState({
        type: 'live',
        str: 'Live',
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [viewer, setViewer] = useState(null);
    const { contextHolder, alert } = useAlert();
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchLiveRooms = async () => {
            const data = await getLiveRooms();

            if (data.status !== 'success') return;

            let rooms = data.result.map((room) => ({
                title: room.title,
                username: room.username,
                thumbnail: room.thumbnail,
                link: `/watch/${room.username}`,
                runtime: new Date().valueOf() - room.created_at,
                live: room.live,
            }));

            const filteredRooms = rooms.filter(
                (room) => room.username === viewer?.username
            );

            const newData = filteredRooms.length > 0 ? [...filteredRooms] : [];

            while (newData.length < 8) {
                let title = null;
                let username = null;
                let thumbnail = null;
                let link = null;
                let runtime = null;
                let live = null;

                newData.push({
                    title,
                    username,
                    thumbnail,
                    link,
                    runtime,
                    live,
                });
            }

            setRecommendations(newData);
        };

        fetchLiveRooms();
    }, [id && viewer?.username]);

    useEffect(() => {
        fetchUserData();
    }, [id]);

    useEffect(() => {
        if (viewer) {
            const followersList = removeId(viewer.followers);
            const followingList = removeId(viewer.following);
            setFollowers(followersList);
            setFollowing(followingList);
        }
    }, [viewer]);

    useEffect(() => {
        if (currentUser && viewer) {
            if (currentUser.username === viewer.username) {
                setButtonState({ type: 'live', str: 'Live' });
            } else if (currentUser.following?.includes(viewer.username)) {
                setButtonState({ type: 'follow', str: 'Unfollow' });
            } else {
                setButtonState({ type: 'notFollow', str: 'Follow' });
            }
        } else {
            setButtonState({ type: 'live', str: 'Live' });
        }
    }, [currentUser]);

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

    const removeId = (list) => {
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
            const r = await getUserData(id);
            if (r.status === 'success') {
                setViewer(r.user);
            }

            const user = await getUserData();
            if (user.status === 'success') {
                setCurrentUser(user.user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleClick = async (type) => {
        if (type === 'notFollow') {
            setButtonState({ type: 'follow', str: 'Unfollow' });
            await setUserData(currentUser.username, {
                following: addArray(currentUser.following, viewer.username),
            });
            await setUserData(viewer.username, {
                followers: addArray(viewer.followers, currentUser.username),
            });
            alert({
                children: 'You have followed ' + viewer.username,
                type: 'success',
            });
        } else if (type === 'follow') {
            setButtonState({ type: 'notFollow', str: 'Follow' });
            await setUserData(currentUser.username, {
                following: removeArray(currentUser.following, viewer.username),
            });
            await setUserData(viewer.username, {
                followers: removeArray(viewer.followers, currentUser.username),
            });
            alert({
                children: 'You have unfollowed ' + viewer.username,
                type: 'error',
            });
        }

        fetchUserData();
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
                                <Avatar src={viewer?.avatar} />
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="text-4xl pt-8">
                                    {viewer?.username}
                                </div>
                                <div>
                                    <ActionButton
                                        str={buttonState.str}
                                        type={buttonState.type}
                                        event={handleClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 ">
                    <Stat followers={followers} following={following} />
                </div>
                <div>
                    <Gallery items={[...recommendations]} />
                </div>
            </div>
        </div>
    );
}
