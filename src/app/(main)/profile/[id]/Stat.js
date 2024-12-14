import { useState } from 'react';
import UserListModal from '@/app/(main)/UserListModal';

export default function Stat({ followers = [], following = [] }) {
    const [showList, setShowList] = useState(false);
    const [listType, setListType] = useState('');

    const handleClick = (type) => {
        setListType(type);
        setShowList(true);
    };

    return (
        <div>
            <div className="stats shadow">
                <div className="stat" onClick={() => handleClick('followers')}>
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Followers</div>
                    <div className="stat-value text-secondary">
                        {followers.length}
                    </div>
                </div>

                <div className="stat" onClick={() => handleClick('following')}>
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                        </svg>
                    </div>
                    <div className="stat-title">Following</div>
                    <div className="stat-value text-secondary">
                        {following.length}
                    </div>
                </div>
            </div>

            {showList && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-black"
                            onClick={() => setShowList(false)}
                        >
                            &times;
                        </button>
                        <UserListModal
                            data={
                                listType === 'followers' ? followers : following
                            }
                            type={listType}
                            onClose={() => setShowList(false)}
                            href="/profile/"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
