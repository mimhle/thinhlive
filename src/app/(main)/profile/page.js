import { cookies } from "next/headers";
import Gallery from "@/app/(main)/Gallery";
import Stat from "./Stat";

export default function Profile() {
    const cookieStore = cookies();
    const recommendations = [
        {},
        {},
    ];
    return <div className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center">
        <div className="bg-neutral w-fit h-fit flex flex-col ">
            <div className="w-full h-fit gap-8">
                <div className="w-full h-fit">
                    <div className="artboard artboard-horizontal phone-6 h-fit">
                        <img src='https://res-console.cloudinary.com/dnqzspoci/thumbnails/v1/image/upload/v1730482243/YmFubmVyNF94b2JpYWM=/drilldown' />
                    </div>
                </div>
                <div className="w-full p-4">
                    <div className="flex flex-row items-center gap-4">
                        <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
                            <div className="avatar placeholder w-40">
                                <div className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-full rounded-full">
                                    <span className="text-6xl">{cookieStore.get("username")?.value.toUpperCase().slice(0, 2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-4xl pt-8">
                            {cookieStore.get("username")?.value}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <Stat />
            </div>
            <div>
                <Gallery items={[...recommendations, ...recommendations, ...recommendations, ...recommendations]} />
            </div>
        </div>
    </div>
}