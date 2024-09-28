import LogoutButton from "./LogoutButton";

export default function Nav({ userName }) {
    return <div className="bg-base-200 p-2 flex flex-col gap-4 justify-between ~/md:~w-12/20">
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
                <a className="btn btn-primary" href="/public">Home</a>
                <a className="btn btn-primary" href="/signin">Sign in</a>
                <a className="btn btn-primary" href="/signup">Sign up</a>
            </div>
        </div>
        <div>
            <div className="flex flex-col gap-4 tooltip" data-tip="Logout">
                <LogoutButton />
            </div>
        </div>
    </div>;
}