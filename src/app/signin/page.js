import Link from "next/link";

export default function Page() {
    return <div className="h-full flex flex-col justify-center min-h-screen">
        <div className="card bg-base-200 w-1/3 m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign in</h1>
                <input placeholder="Email" className="input input-bordered"/>
                <input placeholder="Password" type="password" className="input input-bordered"/>
                <button className="btn btn-primary">Sign in</button>
                <div className="flex flex-row justify-between">
                    <Link className="link" href="#">Forgot password?</Link>
                    <Link className="link" href={"/signup"}>Don&apos;t have an account?</Link>
                </div>
                <div className="divider">OR</div>
                <button className="btn btn-ghost">Continue as guest</button>
            </div>
        </div>
    </div>;
}