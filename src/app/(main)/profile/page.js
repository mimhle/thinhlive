import { cookies } from "next/headers";
import Gallery from "@/app/(main)/Gallery";
import Stat from "./Stat";
import Avatar from "../Avatar";
import CoverPhoto from "@/app/(main)/CoverPhoto";

export default function Profile() {
    const cookieStore = cookies();
    const recommendations = [
        {},
        {},
    ];
    return <div className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center">
        <div className="bg-neutral w-4/5 h-fit flex flex-col drop-shadow-2xl">
            <div className="w-full h-fit">
                <CoverPhoto/>
                <div className="w-full px-4 -translate-y-1/3">
                    <div className="flex flex-row items-center gap-4">
                        <div className="w-40">
                            <Avatar />
                        </div>
                        <div className="text-4xl pt-8">
                            {cookieStore.get("username")?.value}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 ">
                <Stat />
            </div>
            <div>
                <Gallery items={[...recommendations, ...recommendations, ...recommendations, ...recommendations]} />
            </div>
        </div>
    </div>
}