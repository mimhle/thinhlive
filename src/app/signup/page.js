import Link from "next/link";

export default function Page() {
    return <div className="h-full flex flex-col justify-center min-h-screen">
        <div className="card bg-base-200 w-1/3 m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <input placeholder="Email" className="input input-bordered"/>
                <input placeholder="Password" type="password" className="input input-bordered"/>
                <input placeholder="Confirm password" type="password" className="input input-bordered"/>
                <button className="btn btn-primary">Create account</button>
                <div className="flex flex-row justify-end">
                    <Link className="link" href={"/signin"}>Already have an account?</Link>
                </div>
            </div>
        </div>
    </div>;
}