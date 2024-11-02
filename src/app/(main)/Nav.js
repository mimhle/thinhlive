import LogoutButton from "./LogoutButton";
import { CogIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Nav({ userName }) {
    return <div className="bg-base-100 p-2 flex flex-col gap-4 justify-between ~/md:~w-12/20 max-h-screen">
        <div className="flex flex-col gap-4">
            <div className="avatar placeholder">
                <div
                    className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-full rounded-full">
                    <span className="text-xl">LOGO</span>
                </div>
            </div>
            <div className="avatar placeholder">
                <div
                    className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-full rounded-full">
                    <span className="text-3xl">{userName?.toUpperCase().slice(0, 2)}</span>
                </div>
            </div>
        </div>
        <div>
            <div className="flex flex-col gap-4">
                <a className="btn bg-base-100 p-0" href="/">
                    <HomeIcon className="size-8" />
                </a>
                <a className="btn bg-base-100 p-0" href="/profile">
                    <UserIcon className="size-8" />
                </a>
                <a className="btn bg-base-100 p-0" href="/">
                    <CogIcon className="size-8" />
                </a>
            </div>
        </div>
        <div>
            <div className="flex flex-col gap-4 tooltip" data-tip="Logout">
                <LogoutButton />
            </div>
        </div>
    </div>;
}