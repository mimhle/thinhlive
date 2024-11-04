"use client";

import {useEffect, useState} from "react";
import {uploadMedia, setUserData, getUserData} from "/lib/frontend/api";
import Avatar from "@/app/(main)/Avatar";
import CoverPhoto from "@/app/(main)/CoverPhoto";

export default function Setting() {
    const [data, setData] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);


    useEffect(() => {
        getUserData().then(r => {
            if (r.status === "success") {
                setData(r.user);
            }
        });
    }, []);

    if (!data) {
        return <div
            className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center p-20">
        </div>
    }

    const avatarUpdate = () => {
        if (avatarFile) {
            uploadMedia(avatarFile).then(r => {
                if (r.status === "success") {
                    setUserData(data.username, {avatar: r.result.url}).then(result => {
                        console.log(result);
                        window.location.reload();
                    });
                }
            });
        } else {
            alert("Please select a file for the profile picture.");
        }
    }

    const coverPhotoUpdate = () => {
        if (coverPhotoFile) {
            uploadMedia(coverPhotoFile).then(r => {
                if (r.status === "success") {
                    setUserData(data.username, {coverphoto: r.result.url}).then(result => {
                        console.log(result);
                        window.location.reload();
                    });
                }
            });
        } else {
            alert("Please select a file for the profile picture.");
        }
    }

    return <div
        className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex flex-col gap-4 py-20 px-40">
        <div className="w-full h-fit bg-white/5 rounded-2xl">
            <div className="p-10 flex flex-col gap-8">
                <div className="flex justify-between">
                    <span className="font-extrabold text-2xl">Profile Picture</span>
                    <button className="btn btn-success" onClick={avatarUpdate}>Update profile Picture</button>
                </div>
                <div className="flex flex-row gap-8 items-center w-full h-fit">
                    <div className="w-48">
                        <Avatar/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            type="file"
                            className="file-input file-input-ghost w-full max-w-xs"
                            accept="image/*"
                            onChange={e => setAvatarFile(e.target.files[0])}
                        />
                        <span className="text-white/50 mx-5">Must be JPG, PNG, JPEG and smaller 25MB</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-fit bg-white/5 rounded-2xl">
            <div className="p-10 flex flex-col gap-8">
                <div className="flex justify-between">
                    <span className="font-extrabold text-2xl">Cover Picture</span>
                    <button className="btn btn-success" onClick={coverPhotoUpdate}>Update Cover Picture</button>
                </div>
                <div className="flex flex-col gap-8 w-full h-fit">
                    <CoverPhoto/>
                    <div className="flex flex-col gap-2">
                        <input
                            type="file"
                            className="file-input file-input-ghost w-full max-w-xs"
                            accept="image/*"
                            onChange={e => {setCoverPhotoFile(e.target.files[0])}}
                        />
                        <span className="text-white/50 mx-5">Must be JPG, PNG, JPEG and smaller 25MB</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}